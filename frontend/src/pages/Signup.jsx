import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import '../Signup.css';
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/signup", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="Signup-form">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input"/><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input"/><br/><br/>
        <button type="submit" className="btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
