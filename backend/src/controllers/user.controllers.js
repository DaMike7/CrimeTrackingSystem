import User from "../models/user.models.js";
import Buddyship from "../models/buddies.models.js";
import cloudinary from "../lib/cloudinary.js";


export const saveVerifiedUser = async(req,res) =>{
    if (!req.body) {
        return res.status(400).json({ message: "Missing request body" });
      }

    const {dob , verified , first_name , last_name , country , city} = req.body
    const userId = req.user._id

    try {
        console.log('Updating....')
        if (!dob || !country || !verified || !city || !first_name || !last_name ) {
            return res.status(400).json({'message': "Blank Credentials !"})
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { dob , first_name , last_name , country ,city , verified : true },
            {new : true},

        )

        console.log('Updated User Successfully!')

        return res.status(200).json({
            success : true,
            message : "Verified Sucessfully!",
            user : updatedUser,
        })

    } catch (error) {
        console.log('Encountered Error',error.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const showAllUsers = async (req, res) => {
    try {
        console.log('processing..')
        const adminId = req.user._id;
        const { page = 1, limit = 20 } = req.query;
        
        const users = await User.find({ 
            _id: { $ne: adminId } 
        })
        .select('email first_name last_name phone_number nickname dob country ip_address city profile_picture verified userType createdAt')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
        
        const totalUsers = await User.countDocuments({ _id: { $ne: adminId } });
        
        console.log('Fetched users successfully!')
        res.status(200).json({
            success: true,
            users,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                hasNext: page < Math.ceil(totalUsers / limit),
                hasPrev: page > 1
            },
            message:'Fetched users successfully',
        });
        
    } catch (error) {
        console.log("Error in getting users :", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};