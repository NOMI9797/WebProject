import React from "react";
import Header from "../components/Header";

const products = [
  {
    id: 1,
    name: "Super Cropped Zipper in Fleece",
    price: "PKR 2,190",
    originalPrice: "PKR 4,490",
    colors: "2 Colors",
    fit: "Regular Fit",
    image: "/denim.jpeg", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Super Cropped Zipper in Fleece",
    price: "PKR 2,190",
    originalPrice: "PKR 4,490",
    colors: "2 Colors",
    fit: "Regular Fit",
    image: "/jacket.webp", // Replace with actual image URLs
  },
  {
    id: 3,
    name: "Mock Neck Quarter Zipper",
    price: "PKR 2,190",
    originalPrice: "PKR 4,490",
    colors: "1 Color",
    fit: "Relaxed Fit",
    image: "/men.webp", // Replace with actual image URLs
  },
  {
    id: 4,
    name: "Claw Clip",
    price: "PKR 490",
    originalPrice: "PKR 990",
    colors: "1 Color",
    fit: "",
    image: "/women.jpeg", // Replace with actual image URLs
  },
];

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Page Heading */}
      <div className="py-8 px-8 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">Women - Winter Sale</h1>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            {/* Product Details */}
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{product.colors}</p>
              <p className="text-sm text-gray-600">{product.fit}</p>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
