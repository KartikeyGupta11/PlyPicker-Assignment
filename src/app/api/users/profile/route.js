import dbConnect from "@/database/config";
import User from "@/models/user";

dbConnect();

export const GET = async() => {
    try {
        const users = await User.find({});
        return new Response(JSON.stringify(users),{
            status:200,
            headers:{
                'Content-type':'application/json'
            }
        })
    } catch (error) {
        console.log("Error! While Fetching User Details:", error.message);
        return new Response({status:500});
    }
}