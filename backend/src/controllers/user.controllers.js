import User from "../models/user.models.js";

export const showAllUsers = async (req, res) => {
    try {
        console.log('processing..')
        const adminId = req.user._id;
        const { page = 1, limit = 20 } = req.query;
        
        const users = await User.find({ 
            _id: { $ne: adminId } 
        })
        .select('email full_name phone_number username profile_picture userType createdBy createdAt badge_number rank department')
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