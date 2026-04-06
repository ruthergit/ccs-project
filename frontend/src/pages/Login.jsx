import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import "./Login.css";
import { BASE } from "../api/index.js";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* auto-dismiss toast */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      setToast(`Welcome back, ${data.user.name}!`);
      setTimeout(() => login(data.token, data.user), 600);
    } catch {
      setError("Cannot connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Theme toggle */}
      <button
        className="login-theme-btn"
        onClick={() => setDarkMode((d) => !d)}
        title="Toggle theme"
      >
        {darkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      </button>

      {/* Toast */}
      {toast && <div className="login-toast">{toast}</div>}

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo-wrap">
          <div className="login-logo-ring">
            <img src="/ccs.png" alt="CCS" className="login-logo-img" />
          </div>
          <div className="login-shield">
            <FaShieldAlt size={14} />
          </div>
        </div>

        <h1 className="login-title">CCS Profiling System</h1>
        <p className="login-subtitle">Admin Access Only</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="login-field">
            <label htmlFor="email">Email Address</label>
            <div className="login-input-wrap">
              <FaEnvelope className="login-input-icon" />
              <input
                id="email"
                type="email"
                placeholder="admin@ccs.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <FaLock className="login-input-icon" />
              <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPass((s) => !s)}
                tabIndex={-1}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="login-spinner" /> : "Sign In"}
          </button>
        </form>

        <p className="login-hint">
          <FaShieldAlt size={11} /> Restricted to authorized administrators only
        </p>
      </div>
    </div>
  );
}
