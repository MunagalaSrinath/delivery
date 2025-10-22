import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  // --- STYLES (identical to Register Page for consistency) ---
  const enhancedStyles = `
    .form-container {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-group input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.15);
      outline: none;
    }

    .form-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06);
    }
    
    .form-switch-link {
        text-align: center;
        margin-top: 1.5rem;
        color: #4a5568;
    }

    .form-switch-link a {
        color: var(--primary-color);
        font-weight: 600;
        text-decoration: none;
    }

    .form-switch-link a:hover {
        text-decoration: underline;
    }
  `;

  return (
    <>
      <style>{enhancedStyles}</style>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login to Your Account</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
        <p className="form-switch-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
