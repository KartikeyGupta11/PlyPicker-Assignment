import dbConnect from "@/database/config";
import newUpdate from "@/models/NewUpdate";
import Product from "@/models/product";
// import User from "@/models/user";

dbConnect();

export const POST = async(req,res) => {
    try {
        const {productName, price, image, productDescription, department, id} = await req.json();
        const filter = {id};

        const newUpdateRequest = {
            productName,
            price,
            image,
            productDescription,
            department,
            Status:'Pending'
        }
        const updatedDocument = await newUpdate.findOneAndUpdate(filter,newUpdateRequest,{ new: true, upsert: true });

        return new Response(JSON.stringify(updatedDocument), {status:201})
    } catch (error) {
        console.error("Error! While creating new update:",error);
        return new Response(JSON.stringify({message: "Failed to create new update"}),{status:500});
    }
};

export const GET = async(req,res) => {
    try {
        const updates = await newUpdate.find();
        return new Response(JSON.stringify(updates), { status: 200 });
    } catch (error) {
        console.error("Error fetching updates:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch updates." }), { status: 500 });
    }
}

export const PUT = async(req,res) => {
    try {
        const {id, isApproved} = await req.json();
        // console.log("id:",id);
        // console.log("isApproved:",isApproved);

        const updateRequest = await newUpdate.findOne({id});
        console.log(updateRequest);
        const tobeUpdated = await Product.findOne({id});
        console.log(tobeUpdated)

        if(!updateRequest){
            return new Response(JSON.stringify({ message: "Update request not found." }), { status: 404 });
        }
        
        if(isApproved){
            updateRequest.Status = "Approved";
            updateRequest.EditCount += 1;

            tobeUpdated.productName = updateRequest.productName;
            tobeUpdated.productDescription = updateRequest.productDescription
            tobeUpdated.price = updateRequest.price
            tobeUpdated.department = updateRequest.department
            tobeUpdated.EditCount = updateRequest.EditCount

            await updateRequest.save();
            await tobeUpdated.save();
        }
        else{
            updateRequest.Status = "Declined";
            await updateRequest.save();
        }

        return new Response(JSON.stringify(updateRequest), { status: 200 });

        
    } catch (error) {
        console.error("Error updating update request:", error);
        return new Response(JSON.stringify({ message: "Failed to update update request." }), { status: 500 });
    }
};

export const DELETE = async (req, res) => {
  try {
    const { id } = await req.json();

    const updateRequest = await newUpdate.findByIdAndDelete(id);
    if (!updateRequest) {
      return new Response(JSON.stringify({ message: "Update request not found." }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Update request deleted successfully." }), { status: 200 });
  } catch (error) {
    console.error("Error deleting update request:", error);
    return new Response(JSON.stringify({ message: "Failed to delete update request." }), { status: 500 });
  }
};