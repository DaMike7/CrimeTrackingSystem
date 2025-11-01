import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true
        },

        full_name:{
            type:String,
            required:true,
            trim: true
        },

        username:{
            type:String,
            required:true,
            unique:true,
            trim: true
        },

        phone_number:{
            type:String,
            required:true,
            unique:true
        },

        password:{
            type:String,
            required:true,
            minLength:8,
            select: false
        },

        profile_picture:{
            type:String,
            default:""
        },

        userType: {
            type: String,
            enum: ['officer', 'admin'],
            default: 'officer',
            required: true
        },

        // ADDITIONAL FIELDS FOR OFFICERS
        badge_number: {
            type: String,
            unique: true,
            sparse: true,
            required: function() {
                return this.userType === 'officer';
            }
        },

        rank: {
            type: String,
            enum: ['Officer', 'Detective', 'Sergeant', 'Lieutenant', 'Captain', 'Chief'],
            required: function() {
                return this.userType === 'officer';
            }
        },

        department: {
            type: String,
            required: function() {
                return this.userType === 'officer';
            }
        },

        // STATUS & PERMISSIONS
        isActive: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: function() {
                return this.userType === 'officer';
            }
        },

        lastLogin: {
            type: Date,
            default: null
        }
    },
    {timestamps:true},
)

// Index for faster queries
userSchema.index({ userType: 1 });

const User = mongoose.model("User", userSchema);

export default User;