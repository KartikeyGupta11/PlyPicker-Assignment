"use client"
import { useState } from "react";
// import User from "@/models/user";

const ProductDetails = ({product,onBack}) => {
    const [editable, setEditable] = useState(false);
    const [editedProduct, setEditedProduct] = useState({...product});

    const handleEditToggle = () =>{
        setEditable(!editable);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedProduct((prev) => ({...prev, [name]: value}));
    };

    const handleSubmitUpdateRequest = async () =>{
        try {
            const resp = await fetch('api/products/makeRequests',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(editedProduct)
            });

            if(!resp.ok) throw new Error('Failed to submit update request');
            alert('Update request submitted successfully!')
            setEditable(false)
        } catch (error) {
            console.error(error);
            console.log("Error while submit update requests")
        }
    }

  return (
    <div className="p-4">
        <button onClick={onBack} className="mb-4 bg-gray-500 text-white px-4 rounded-md">
            Back
        </button>

        <div className="border p-4 rounded-md shadow-md">
            {
                editable ? (
                    <div>
                        <input type="text" name="productName" value={editedProduct.productName} onChange={handleInputChange} className="w-full p-2 border rounded-md"></input>

                        <textarea name="productDescription" value={editedProduct.productDescription} onChange={handleInputChange} className="w-full p-2 mt-2 border rounded-md"></textarea>

                        <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} className="w-full p-2 mt-2 border rounded-md"></input>

                        <input type="text" name="department" value={editedProduct.department} onChange={handleInputChange} className="w-full p-2 mt-2 border rounded-md"></input>

                        <button onClick={handleSubmitUpdateRequest} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
                            Submit Update Review
                        </button>
                    </div>
                ) : (
                    <div>
                        <img src={product.image} alt={product.productName} className="w-full h-48 object-cover rounded-md"></img>

                        <h2 className="mt-4 text-2xl font-semibold">{product.productName}</h2>

                        <p className="mt-2">{product.productDescription}</p>
                        <p className="mt-2 font-bold">${product.price}</p>
                        <p className="mt-2 font-bold">{product.department}</p>
                        <button onClick={handleEditToggle} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                            Edit
                        </button>
                    </div>
                )
            }
        </div>
    </div>
  )
}
export default ProductDetails