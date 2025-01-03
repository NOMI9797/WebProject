import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const filters = {
  colors: ["All", "Black", "Blue", "Pink"],
  priceRanges: ["All", "Under 1000", "1000-3000", "3000+"],
};

const initialProducts = [
  {
    id: 1,
    name: "Super Cropped Zipper in Fleece",
    price: 2190,
    originalPrice: 4490,
    colors: "Black",
    fit: "Regular Fit",
    image: "/denim.jpeg", // Replace with actual image URLs
    isOnSale: true,
    discount: "51%",
  },
  {
    id: 2,
    name: "Super Cropped Zipper in Fleece",
    price: 2190,
    originalPrice: 4490,
    colors: "Blue",
    fit: "Regular Fit",
    image: "/jacket.webp", // Replace with actual image URLs
    isOnSale: true,
    discount: "51%",
  },
  {
    id: 3,
    name: "Mock Neck Quarter Zipper",
    price: 2190,
    originalPrice: 4490,
    colors: "Pink",
    fit: "Relaxed Fit",
    image: "/men.webp", // Replace with actual image URLs
    isOnSale: true,
    discount: "51%",
  },
  {
    id: 4,
    name: "Claw Clip",
    price: 490,
    originalPrice: 990,
    colors: "Blue",
    fit: "",
    image: "/women.jpeg", // Replace with actual image URLs
    isOnSale: true,
    discount: "50%",
  },
];

const SalesPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  // Simulate API Call
  useEffect(() => {
    // Simulate fetching products
    setTimeout(() => setProducts(initialProducts), 1000);
  }, []);

  // Filter Products
  useEffect(() => {
    let filtered = products;

    // Filter by color
    if (selectedColor !== "All") {
      filtered = filtered.filter((product) =>
        product.colors.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    // Filter by price range
    if (selectedPrice !== "All") {
      filtered = filtered.filter((product) => {
        if (selectedPrice === "Under 1000") return product.price < 1000;
        if (selectedPrice === "1000-3000")
          return product.price >= 1000 && product.price <= 3000;
        if (selectedPrice === "3000+") return product.price > 3000;
        return true;
      });
    }

    setFilteredProducts(filtered);
  }, [selectedColor, selectedPrice, products]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Page Heading */}
      <div className="py-8 px-8 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">Women - Winter Sale</h1>
      </div>
      {/* Filters Section */}
      <div className="flex justify-between items-center py-4 px-8 bg-white shadow">
        <div className="flex space-x-4">
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
          >
            {filters.colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-red-500"
          >
            {filters.priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            {/* Sales Tag */}
            {product.isOnSale && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
                -{product.discount}
              </div>
            )}

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
                  <span className="text-lg font-bold text-gray-800">PKR {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      PKR {product.originalPrice}
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

export default SalesPage;
