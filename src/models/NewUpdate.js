import mongoose from "mongoose";

const newUpdateSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },

    price:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    productDescription:{
        type:String,
    },

    department:{
        type: String
    },

    id:{
        type:String,
        unique:true
    },

    EditCount:{
        type:Number,
        default:0
    },

    Status:{
        type:String,
        enum:['Pending','Approved','Declined'],
        default:'Pending'
    }
},{ timestamps: true })

const newUpdate = mongoose.models.newUpdate || mongoose.model('newUpdate', newUpdateSchema);
export default newUpdate;