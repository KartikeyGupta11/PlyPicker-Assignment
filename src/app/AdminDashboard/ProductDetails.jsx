"use client"
import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ProductDetails = ({product, onBack, onUpdateProduct}) => {
    const [editable, setEditable] = useState(false);
    const [editedProduct, setEditedProduct] = useState({...product});
    const [crop, setCrop] = useState({ aspect: 1, x: 0, y: 0, width: 50, height: 50 });
    const [croppedImageUrl, setCroppedImageUrl] = useState("");
    // const [imageFile, setImageFile] = useState(null);
    const [imageRef, setImageRef] = useState(null);

    const handleEditToggle = async() =>{
        if(editable){
            const updatedProduct = { ...editedProduct, EditCount: product.EditCount + 1 };
            if(croppedImageUrl){
                updatedProduct.image = croppedImageUrl;
            }
            await onUpdateProduct(product.id, updatedProduct);
        }
        setEditable(!editable);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedProduct((prev) => ({...prev, [name]: value}));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (event) => {
                setEditedProduct((prev) => ({
                    ...prev, image: event.target.result
                }));
                // setImageFile(file);
                setCrop({ aspect: 1})
            };
            reader.readAsDataURL(file);
        }
    }

    const onImageLoaded = (image) => {
        setImageRef(image);
        return false;
    };

    const onCropComplete = (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = getCroppedImg(imageRef, crop);
            setCroppedImageUrl(croppedImageUrl);
        }
    };

    const onCropChange = (newCrop) => {
        setCrop(newCrop);
    };

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return canvas.toDataURL('image/png');
    };

    const handleCropImage = () => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = getCroppedImg(imageRef, crop);
            setCroppedImageUrl(croppedImageUrl);
            setEditedProduct((prev) => ({ ...prev, image: croppedUrl }));
        }
    };

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

                        <div>
                            <input type="file" accept="image/*" onChange={handleImageChange}></input>
                            {/* {
                                editedProduct.image && (
                                    <>
                                        <ReactCrop src={editedProduct.image} crop={crop} onImageLoaded={onImageLoaded} onComplete={onCropComplete} onChange={onCropChange}></ReactCrop>

                                        <button onClick={handleCropImage} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
                                            Crop Image
                                        </button>
                                    </>
                                )
                            } */}
                        </div>

                        <button onClick={handleEditToggle} className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md">
                            Save
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