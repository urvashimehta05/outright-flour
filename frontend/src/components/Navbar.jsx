import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">Outright Store</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/cart">Cart</Link>
              <button className="logout" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
