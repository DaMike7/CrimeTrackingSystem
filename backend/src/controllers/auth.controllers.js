import { GenerateToken } from "../lib/utils.js"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


//SIGNUP
export const signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing request body" });
      }

    const {email, full_name, username, phone_number, password} = req.body
    
    try {
        console.log('Processing ...')
        if (!email || !full_name|| ! username || !phone_number || !password) {
            return res.status(400).json({message: "Some Fields Were Left Blank!"})
        }
        console.log('Validating ...')

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({message: "Password must be atleast 8 characters"})
        }

        // Check if email already exists
        const userEmail = await User.findOne({email})
        if (userEmail) return res.status(400).json({message: "Email already exists"})

        // Check if nickname already exists  
        const lowerUsername = username.toLowerCase()
        const userName = await User.findOne({ username:lowerUsername})
        if (userName) return res.status(400).json({message: "Username already exists"})

        // Check if phone number already exists
        const userPhoneNumber = await User.findOne({phone_number})
        if (userPhoneNumber) return res.status(400).json({message: "Phone number already exists"})

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user
        const newUser = new User({
            email,
            full_name,
            phone_number,
            password: hashedPassword,
            username : lowerUsername,
            userType : 'admin',
        })

        if (newUser) {
            GenerateToken(newUser, res)
            await newUser.save()

            console.log('Created new user !')
            res.status(200).json({
                success:true,
                _id: newUser._id,
                full_name : newUser.full_name,
                profile_picture: newUser.profile_picture,
                userType,
                message: "Success!",
            })
        } else {
            res.status(400).json({message: "Invalid credentials"})
        }
    } catch (error) {
        console.log("Error during signup", error.message);
        res.status(500).json({message: "Internal server error"});
    }
}


//LOGOUT
export const logout = (req,res) =>{
    try{
        console.log('processing\nLoging User Out')
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})

    } catch (error) {
        console.log("Error in Logout controller!",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

//LOGIN
export const login = async (req,res) =>{
    if (!req.body) {
        return res.status(400).json({ message: "Missing request body" });
      }

    const {email,password} = req.body
    try{
        console.log('processing')
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:"User not found"})
        }

        const isPwdCorrect = await bcrypt.compare(password,user.password)
        if (!isPwdCorrect){
            return res.status(400).json({message:"Incorrect Password!"})
        }
        GenerateToken(user,res)
        res.status(200).json({success:true,_id:user._id,full_name:user.full_name,email:user.email,username:user.username,profile_picture:user.profile_picture,message:"Login successfull"})

    } catch (error){
        console.log("Error in the Login controller ",error.message)
        res.status(500).json({message:"Internal server error"})

    }
}

export const updateProfile = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing request body" });
    }
    
    try {
        console.log('Updating profile picture ....')
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required!" });
        }

        // Upload to EC_profilepictures folder in Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "ctrack_profiles",
            resource_type: "auto",
            public_id: `user-${userId}-${Date.now()}`
        });

        console.log("User ID:", req.user?._id);
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profile_picture: uploadResponse.secure_url },
            { new: true }
        );

        console.log('Updated!\n',updatedUser)
        
        return res.status(200).json({
            success: true,
            user: updatedUser,
            imageUrl: uploadResponse.secure_url
        });

    } catch (error) {
        console.log("Error in updateProfile handler:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const checkAuth = (req,res) =>{
    try{
        console.log('checking...')
        res.status(200).json(req.user);

    } catch (error) {
        console.log("Error in the controller ",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}