import dbConnect from "@/database/config";
import Product from "@/models/product";

dbConnect();

export const PUT = async(req,res) => {
    try {
        const {id, updatedProduct} = await req.json();
        const product = await Product.findOne({id});


        if(!product){
            return new Response(JSON.stringify({error:'Product Not Found'}),{status:400});
        }

        product.EditCount += 1;

        Object.assign(product, updatedProduct);
        const updatedProductData = await product.save();

        return new Response(JSON.stringify(updatedProductData),{status:200});
    } catch (error) {
        console.error("Error! While Updating Product",error);
        return new Response(JSON.stringify({error:"Internal Server Error"}), {status:500})
    }
}