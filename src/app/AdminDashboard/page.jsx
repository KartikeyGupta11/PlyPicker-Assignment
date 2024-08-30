"use client"
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ProductCard from "./ProductCard"; 
import ProductDetails from "./ProductDetails";

const AdminDashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

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

  const updateProduct = async(id, updatedProduct) => {
    try {
      const resp = await fetch('api/products/updateProducts',{
        method: 'PUT',
        headers:{
          'Content-type':'application/json',
        },

        body:JSON.stringify({id, updatedProduct})
      });

      if(!resp.ok){
        throw new Error('Failed to update Product');
      }

      const updatedProductData = await resp.json();
      setProducts((prevProducts) => prevProducts.map((product) => product.id === id ? updatedProductData : product))

      if(selectedProduct && selectedProduct.id === id){
        setSelectedProduct(updatedProductData)
      }
    } catch (error) {
      console.error(error.message);
      setError('Failed to update Product');
    }
  }

  return(
    <div>
      <NavBar notifications={notifications}/>
      
      <div className="container mx-auto p-4">
        {loading && <p>Loading products...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {
          selectedProduct ? (
            <ProductDetails product={selectedProduct} onBack={goBackToProducts} onUpdateProduct={updateProduct}/>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {

                products.map((product) => (
               
                  <ProductCard key={product.id} product={product} onViewDetails={viewProductDetails}/>
                )
                )
              }
            </div>
          ) 
        }
      </div>
    </div>
  )
}

export default AdminDashboard;