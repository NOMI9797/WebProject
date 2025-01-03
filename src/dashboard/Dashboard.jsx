import React, { useState, useEffect } from "react";
import db from "../appwrite/Services/dbServices";
import storageServices from "../appwrite/Services/storageServices";
import { ID } from "appwrite";
import ProductCard from '../components/ProductCard';

const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState("List Products");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Fetch products
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
                console.log("img url =", fileUrl);
                product.imageUrl = fileUrl;

                console.log("after img url =", product.imageUrl);

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

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({ ...newProduct, image: file });
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    let file;
    try {
      if (newProduct.image) {
        const fileId = ID.unique();
        await storageServices.images.createFile(newProduct.image, fileId);
        file=fileId
      }

      // Create product document with only allowed attributes
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        imageID:file
      };

      const response = await db.products.create(productData);

      if (response) {
        setProducts([...products, response]);
        setNewProduct({ name: "", price: "", category: "", image: null });
        alert("Product added successfully!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error adding product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-center py-6">Dashboard</h2>
        <ul className="space-y-4 p-6">
          <li
            className={`cursor-pointer px-4 py-2 rounded-md ${
              selectedFeature === "Add Product" ? "bg-red-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedFeature("Add Product")}
          >
            Add Product
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-md ${
              selectedFeature === "List Products" ? "bg-red-500 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedFeature("List Products")}
          >
            List Products
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">
        {selectedFeature === "Add Product" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
            </form>
          </div>
        )}

        {selectedFeature === "List Products" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.$id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-4 py-2 bg-gray-200 rounded-md ${
                  currentPage === 1 ? "cursor-not-allowed" : "hover:bg-gray-300"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 bg-gray-200 rounded-md ${
                  currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
