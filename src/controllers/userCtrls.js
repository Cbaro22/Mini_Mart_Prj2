import { validationResult } from 'express-validator';
import * as userService from '../Services/userServices.js'
import { sendSignupEmail } from '../Utils/emailServices.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
    const { user, token } = await userService.registerUser(req.body);
    await sendSignupEmail({email:user.email, name:user.name})
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token});
  } catch (err) {
    res.status(400).json({ message: err.message });
  
}};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { user, token } = await userService.loginUser(req.body);
    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
  
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await userService.forgotPasswordService(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const response = await userService.resetPasswordService(token, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};