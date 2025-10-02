import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../Cart.css"; 
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    if (!user) return;
    const res = await api.get(`/cart/${user.id}`);
    setCartItems(res.data);
  };

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${user.id}/${id}`);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;


