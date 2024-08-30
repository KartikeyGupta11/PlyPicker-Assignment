import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    }
})

const Product = mongoose.models.product || mongoose.model('product', productSchema);
export default Product;