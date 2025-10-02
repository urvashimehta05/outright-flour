import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;

