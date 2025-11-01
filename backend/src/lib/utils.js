import jwt from "jsonwebtoken"

export const GenerateToken = (user, res) => {
    const token = jwt.sign({
        user_id: user.id, 
        email: user.email, 
        full_name: user.full_name,
    }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })

    res.cookie("jwt",token,{
        maxAge : 30*24*60*60*1000,
        httpOnly:true,
        sameSite:true,
        secure : process.env.NODE_ENV !== "live",
    })

    return token;
}