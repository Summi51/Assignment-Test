import React, { useState } from "react";
import api from "../services/api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./Auth.css";

// Inline logo fallback (file was missing in repo)
const Logo = () => (
  <div className="auth-logo" aria-hidden style={{display:'flex',alignItems:'center',gap:8}}>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" ry="3"></rect>
      <path d="M7 12h10M7 16h6"></path>
    </svg>
    <strong>Crafty Haven</strong>
  </div>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      setMessage("Login successful!");
      
      // Navigate after a small delay to show success message
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Logo />
        
        <h2 className="auth-heading">Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          
          <div className="auth-input-group">
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="auth-input-icon">
              <MailIcon />
            </div>
          </div>

          <div className="auth-input-group">
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="auth-input-icon">
              <LockIcon />
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-checkbox-label">
              <input type="checkbox" className="auth-checkbox" />
              Remember me
            </label>
            <a href="#" className="auth-link">Forgot password?</a>
          </div>

          {message && (
            <p className={`auth-message ${message === "Login successful!" ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <RouterLink to="/signup" className="auth-link">
            Register
          </RouterLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
