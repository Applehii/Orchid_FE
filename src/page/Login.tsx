import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { login, registerUser } from "../service/authService";
import type { UserCreationRequest } from "../service/authService";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/Background.jpeg";
import "../styles/Login.css";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth();
  const [formType, setFormType] = useState<"login" | "register" | "forgot">(
    "login"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    accountName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (formType === "login") {
        const result = await login(formData.email, formData.password);
        // Giả sử API trả về tên user ở result.accountName
        setAuthLogin(result?.accountName || formData.email);
        navigate("/");
      } else if (formType === "register") {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        const userData: UserCreationRequest = {
          email: formData.email,
          password: formData.password,
          accountName: formData.accountName,
        };
        await registerUser(userData);
        setFormType("login");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const inputVariants = {
    focus: { scale: 1.02 },
  };

  return (
    <div className="login-page">
      <div
        className="login-bg-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="login-logo"
          src={
            "https://www.miltonandking.com/wp-content/uploads/2019/03/Wallpaper-Linz-Orchid-Stone-1-1100x1320.jpg"
          }
          alt="Orchid Shop Logo"
        />

        <AnimatePresence mode="wait">
          <motion.form
            className="login-form"
            key={formType}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            {error && <div className="error-message">{error}</div>}

            {formType === "register" && (
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaUser />
                </div>
                <motion.input
                  className="login-form-input"
                  type="text"
                  name="accountName"
                  placeholder="Account Name"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
            )}

            <div className="login-input-group">
              <div className="login-input-icon">
                <FaEnvelope />
              </div>
              <motion.input
                className="login-form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>

            {formType !== "forgot" && (
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaLock />
                </div>
                <motion.input
                  className="login-form-input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
            )}

            {formType === "register" && (
              <div className="login-input-group">
                <div className="login-input-icon">
                  <FaLock />
                </div>
                <motion.input
                  className="login-form-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
            )}

            <motion.button
              className="btn-login"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : formType === "login"
                ? "Login"
                : formType === "register"
                ? "Register"
                : "Reset Password"}
            </motion.button>

            {formType === "login" && (
              <>
                <motion.p
                  className="login-link"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setFormType("register")}
                >
                  Don't have an account? Register
                </motion.p>
                <motion.p
                  className="login-link"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setFormType("forgot")}
                >
                  Forgot Password?
                </motion.p>
              </>
            )}

            {formType !== "login" && (
              <motion.p
                className="login-link"
                whileHover={{ scale: 1.05 }}
                onClick={() => setFormType("login")}
              >
                Back to Login
              </motion.p>
            )}
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
