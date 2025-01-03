import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import db from "../appwrite/Services/dbServices";
import storageServices from "../appwrite/Services/storageServices";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await db.products.list();
      if (response && response.documents) {
        const productsWithImages = await Promise.all(
          response.documents.map(async (product) => {
            if (product.imageID) {
              try {
                const fileUrl = await storageServices.images.getFileView(product.imageID);
                product.imageUrl = fileUrl;
              } catch (error) {
                console.error("Error fetching product image:", error);
                product.imageUrl = "/path/to/fallback/image.jpg";
              }
            }
            return product;
          })
        );
        setProducts(productsWithImages);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="py-8 px-8 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
          {products.map((product) => (
            <ProductCard key={product.$id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[300px]">
          <span className="text-gray-600 text-xl">Loading....</span>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
