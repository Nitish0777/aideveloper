import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js";

export const createUserController = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {email,password} = req.body;
        const user = await userService.createUser(email,password);
        const token = await user.generateJWT();
        return res.status(201).json({user, token,message:"User created successfully"});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}

export const loginUserController = async (req,res) => {
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select("+password");
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = await user.generateJWT();
        return res.status(200).json({user,token,message:"User logged in successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}