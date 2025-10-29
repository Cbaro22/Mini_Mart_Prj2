import User from '../modules/userModule.js';
import { sendForgotPasswordEmail, sendResetPasswordEmail } from '../Utils/emailServices.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcrypt'
import  jwt  from  'jsonwebtoken'

//  Register new user
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id, user.role);

  return { user, token };
};

//  Login user
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken(user._id, user.role);
  return { user, token };
};

//  Get all users (admin only)
export const getUsers = async () => {
  return await User.find().select('-password');
};

//  Get single user
export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

//  Update user (self or admin)
export const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id);
  if (!user) throw new Error('User not found');

  Object.assign(user, data);
  if (data.password) user.markModified('password');
  await user.save();
  return user;
};

//  Delete user
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return { message: 'User deleted successfully' };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  const resetLink = `${process.env.BASE_URL}/api/auth/reset-password/${token}`;

  await sendForgotPasswordEmail(user.email, { name: user.name, resetLink });

  return { message: "Password reset email sent successfully" };
};

export const resetPasswordService = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    await sendResetPasswordEmail(user.email, { name: user.name });

    return { message: "Password reset successful" };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};