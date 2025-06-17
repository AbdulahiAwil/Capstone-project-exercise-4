import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect =  async (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1]

    console.log("Token info", token)
    console.log("req.header.authorization", req.headers.authorization)

    if (!token) return res.status(401).json({
        message: "Not token provided"
    })

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded', decode)
        req.user = await User.findById(decode.id).select('-password');
        next()
        
    } catch (err) {
        console.log('Error waa maaxay',err)
        res.status(401).json({
            message: "invalid or expire token"
        })
    }
    
}