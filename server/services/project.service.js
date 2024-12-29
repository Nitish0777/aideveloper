import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!userId) {
      throw new Error("User is required");
    }

    try {
      const project = await projectModel.create({ name, users: [userId] });
      return project;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Project name already exists");
      }
      throw new Error("Internal server error");
    }
    return project;
  } catch (error) {
    console.error(`Error in Creating Projects `, error);
    throw new Error("Internal server error");
  }
};

export const getAllProjectsByUserId = async ({ userId }) => {
  try {
    if (!userId) {
      throw new Error("User is required");
    }
    const projects = await projectModel.find({ users: userId });
    return projects;
  } catch (error) {
    console.error(`Error in Getting All Projects `, error);
    throw new Error("Internal server error");
  }
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  try {
    if (!projectId) {
      throw new Error("Project ID is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid ProjectId");
    }
    if (!users) {
      throw new Error("Users are required");
    }
    if (
      !Array.isArray(users) ||
      users.some((userId) => !mongoose.Types.ObjectId.isValid(userId))
    ) {
      throw new Error("Invalid userId(s) in users array");
    }
    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });
    if (!project) {
      throw new Error("User is not belong to this project");
    }
    const updatedProject = await projectModel.findByIdAndUpdate(
      {
        _id: projectId,
      },
      {
        $addToSet: {
          users: {
            $each: users,
          },
        },
      },
      {
        new: true,
      }
    );

    return updatedProject;
  } catch (error) {
    console.error(`Error in Adding User to Project `, error);
    throw new Error("Internal server error");
  }
};

export const getUsersByProjectId = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid ProjectId");
  }
  try {
    const project = await projectModel.findOne({ _id: projectId }).populate('users');
    console.log(project);
    return project;
  } catch (error) {
    console.error(`Error in Getting Users by ProjectId `, error);
    throw new Error("Internal server error");
  }
};