import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    const token = await user.generateJWT();
    delete user._doc.password;
    return res
      .status(201)
      .json({ user, token, message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await user.generateJWT();
    delete user._doc.password;
    return res
      .status(200)
      .json({ user, token, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const profileUserController = async (req, res) => {
  try {
    console.log(req.user);
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });
    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};