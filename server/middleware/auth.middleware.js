import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) =>{
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        console.log("token ",token);
        if(!token){
            return res.status(401).json({
                error: "Please login to access this resource"
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