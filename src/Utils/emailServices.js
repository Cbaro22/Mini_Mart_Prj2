import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter ready ');
  }
});

// Helper: render EJS template and send
const sendEmail = async (to, subject, templateName, data) => {
  try {
    const templatePath = path.join(__dirname, `../templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
      from: `"Mini Mart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(` Email send failed: ${error.message}`);
  }
};


//  Signup Email
export const sendSignupEmail = async (user) => {
  await sendEmail(
    user.email,
    'Welcome to Mini Mart!',
    'signup',
    
    { name: user.name }
  );
};

// Forgot Password
export const sendForgotPasswordEmail = async (user, resetToken) => {
  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail(
    user.email,
    'Reset Your Mini Mart Password',
    'forgotPassword',
    { name: user.name, resetURL }
  );
};

//  Reset Password Success
export const sendResetPasswordEmail = async (user) => {
  await sendEmail(
    user.email,
    'Password Reset Successful',
    'resetPassword',
    { name: user.name }
  );
};

//  Product Order Confirmation
export const sendOrderEmail = async (user, order) => {
  await sendEmail(
    user.email,
    'Order Confirmation - Mini Mart',
    'orderConfirmation',
    { name: user.name, order }
  );
};


export const sendOrderCancelledEmail = async (user, order) => {
  await sendEmail(
    user.email,
    'Order Cancelled - Mini Mart',
    'orderCancelled',
    { name: user.name, order }
  );
};
