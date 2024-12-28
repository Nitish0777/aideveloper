import projectModel from "../models/project.model.js";
import User from "../models/user.model.js";
import {
  addUsersToProject,
  createProject,
  getAllProjectsByUserId,
} from "../services/project.service.js";
import { validationResult } from "express-validator";

export const createProjects = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    const userId = user._id;
    const newProject = await createProject({ name, userId });

    return res.status(201).json(newProject);
  } catch (error) {
    console.error(`Error in Creating Projects `, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const loggedInUser = req.user.email;
    const user = await User.findOne({ email: loggedInUser });
    const userId = user._id;
    const projects = await getAllProjectsByUserId({ userId });
    return res.status(200).json(projects);
  } catch (error) {
    console.error(`Error in Getting All Projects `, error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId, users } = req.body;
    const loggedInUser = await User.findOne({ email: req.user.email });
    const project = await addUsersToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });
    return res.status(200).json({
      project,
    });
  } catch (error) {
    console.error(`Error in Adding User to Project `, error);
    res.status(400).json({ message: "Internal server error" });
  }
};
