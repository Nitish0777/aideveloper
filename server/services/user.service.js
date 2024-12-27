import userModel from "../models/user.model";

export const createUser = async (email,password) => {
    if(!email || !password){
        throw new Error("Email and password are required");
    }

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        throw new Error("Email already exists");
    }

    const hashedPassword = await userModel.hashedPassword(password);

    const user = await userModel.create({
        email,
        password:hashedPassword,
    })

    return user;
}