import React from 'react';

const ProductCard = ({ product }) => (
  <div key={product.$id} className="bg-white shadow rounded-lg p-4">
    <img
      src={product.imageUrl || "/path/to/fallback/image.jpg"}
      alt={product.name}
      className="w-full h-40 object-cover rounded-md"
      onError={(e) => {
        e.target.src = "/path/to/fallback/image.jpg";
      }}
    />
    <h3 className="text-lg font-medium mt-4">{product.name}</h3>
    <p className="text-sm text-gray-600">{product.category}</p>
    <p className="text-sm text-gray-600 font-bold">PKR {product.price}</p>
  </div>
);

export default ProductCard; 