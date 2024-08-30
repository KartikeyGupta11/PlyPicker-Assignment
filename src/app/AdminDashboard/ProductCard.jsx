const ProductCard = ({product, onViewDetails}) => {

    // console.log("productCard: ",product);

    return(
        <div className='border p-4 rounded-md shadow-md'>
            <img src={product.image} alt={product.productName} className='w-full h-48 object-cover rounded-md'></img>
            <h3 className='mt-4 text-lg font-semibold'>{product.productName}</h3>

            <button onClick={() => onViewDetails(product)} className='mt-2 bg-blue-500 text-white py-1 px-4 rounded-md'>
                View Details
            </button>
        </div>
    );
}

export default ProductCard;