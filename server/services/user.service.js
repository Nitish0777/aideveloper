import userModel from "../models/user.model.js";

export const createUser = async (email,password) => {
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password:hashedPassword,
    })

    return user;
}

export const getAllUsers = async ({userId}) => {
    try {
        const users = await userModel.find({
            _id:{$ne:userId}
        });
        return users;
    } catch (error) {
        console.error(`Error in Getting All Users `, error);
        throw new Error("Internal server error");
    }
};