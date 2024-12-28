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
