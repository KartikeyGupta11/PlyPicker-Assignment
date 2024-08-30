import dbConnect from "@/database/config";
import Product from '@/models/product';


dbConnect();

export const GET = async() => {
    try {
        const products = await Product.find({});
        return new Response(JSON.stringify(products),{
            status:200,
            headers:{
                'Content-type':'application/json',
            },
        })
    } catch (error) {
        console.log("Error! While Fetching Products:", error.message);
        return new Response({status:500});
    }
}