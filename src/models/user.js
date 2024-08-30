import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:['admin', 'teamMember'],
        required:true
    },

    requestsCount:{
        type:Number,
        default:0
    },

    acceptCount:{
        type:Number,
        default:0
    },

    rejectCount:{
        type:Number,
        default:0
    }
})

const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;