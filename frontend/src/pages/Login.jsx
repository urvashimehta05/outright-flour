import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import '../Login.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div style={{ padding: "20px" }} className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" /><br/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input" /><br/><br/>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
