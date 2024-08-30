"use client"
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard"; 
import ProductDetails from "./ProductDetails";

const TeamMemberDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async() => {
      try{
        const resp = await fetch('api/products/fetchProducts');

        if(!resp.ok){
          throw new Error('Network response is not Ok...')
        }

        const data = await resp.json();
        setProducts(data);
      } catch(error){
        console.error(error);
        setError('Failed to load products...');
      } finally{
        setLoading(false)
      }
    }

    fetchProducts();
  },[])

  const viewProductDetails = (product) => {
    setSelectedProduct(product);
  }

  const goBackToProducts = () => {
    setSelectedProduct(null);
  }

  return(
    <div>
      <NavBar/>
      
      <div className="container mx-auto p-4">
        {loading && <p>Loading products...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!selectedProduct ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={viewProductDetails}
                />
              ))}
            </div>
          </div>
        ) : (
          <ProductDetails
            product={selectedProduct}
            onBack={goBackToProducts}
          />
        )}
      </div>
    </div>
  )
}

export default TeamMemberDashboard;