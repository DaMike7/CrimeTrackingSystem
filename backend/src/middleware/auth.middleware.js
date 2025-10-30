import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if (!token){
            return res.status(400).json({message:"User Not logged in!"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400)({message:"User Not Unauthorized"})
        }

        const user = await User.findById(decoded.user_id).select("-password")

        req.user = user
        next()
    } catch (error) {
        console.log("Error in Middleware!",error.message)
        return res.status(500).json({mesaage:'Internal server error'})

    }

}

export const protectAdminRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if (!token){
            return res.status(400).json({message:"User Not logged in!"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400)({message:"User Not Unauthorized"})
        }

        const user = await User.findById(decoded.user_id).select("-password")
        if (user.userType !== 'superuser') {
            return res.status(403).json({ message: "Unauthorized access" });
          }

        req.user = user
        next()
    } catch (error) {
        console.log("Error in Middleware!",error.message)
        return res.status(500).json({mesaage:'Internal server error'})

    }

}