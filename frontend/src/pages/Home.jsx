import React, { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import '../Home.css';
const Home = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addToCart = async (product) => {
    if (!user) return alert("Login to add to cart");
    await api.post("/cart", { ...product, userId: user.id });
    alert(`${product.name} added to cart`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
     <div className="card-layout">
      {products.map((p) => (
        <div className="design">
       <ProductCard key={p.id} product={p} addToCart={addToCart} />
        <br></br>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Home;
