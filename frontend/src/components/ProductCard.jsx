import React from "react";
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="flour-type">
      <div className="card-layout">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <h3>₹{product.price}</h3>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;