import projectModel from "../models/project.model.js";
import User from "../models/user.model.js";
import { createProject } from "../services/project.service.js";
import { validationResult } from "express-validator";

export const createProjects = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name} = req.body;
        const userEmail = req.user.email;
        const user = await User.findOne({email: userEmail});
        const userId = user._id;
        const newProject = await createProject({name, userId});

        return res.status(201).json(newProject);
    } catch (error) {
        console.error(`Error in Creating Projects `,error);
        res.status(500).json({message: "Internal server error"});
    }
};