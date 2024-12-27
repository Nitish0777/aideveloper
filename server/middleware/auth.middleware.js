import jwt from 'jsonwebtoken';
import redisClient from '../services/redis.service.js';
export const authUser = async (req, res, next) =>{
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        console.log("token ",token);
        if(!token){
            return res.status(401).json({
                error: "Please login to access this resource"
            })
        }
        const isBlacklisted = await redisClient.get(token);
        if(isBlacklisted){
            res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Unauthorized"
        })
    }
}