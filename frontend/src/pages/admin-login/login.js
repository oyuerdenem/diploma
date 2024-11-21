import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import background from "./../../components/assets/sidebar-logo.png";
import SimpleAlert from "../../utils/alert/alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setSuccess("Амжилттай нэвтэрлээ, түр хүлээнэ үү.");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("userType", data.userType);
          window.localStorage.setItem("branchId", data.branchId);
          window.localStorage.setItem("loggedIn", true);
          setTimeout(() => {
            // navigate(data.userType === "staff" ? "/dashboard" : "/home");
            navigate("/orders");
          }, 2000);
        } else {
          setError("Нэвтрэх нэр, нууц үг буруу байна. Дахин оролдоно уу.");
        }
      })
      .catch(() => setError("Алдаа гарлаа, дахин оролдоно уу."));
  }

  return (
    <motion.div
      className="auth-wrapper flex flex-col md:flex-row h-screen items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-1/4 flex justify-center">
        <motion.img
          src={background}
          alt="Background"
          className="max-w-[80%] min-w-[50%] h-full object-cover rounded-lg md:rounded-none"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <motion.div
        className="auth-inner w-full md:w-1/4 bg-white p-12"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-light mb-6 text-center">Нэвтрэх</h3>

          {(success || error) && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-1/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SimpleAlert
                message={success || error}
                severity={success ? "success" : "error"}
              />
            </motion.div>
          )}

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 text-xs">
              Нэвтрэх нэр
            </label>
            <motion.input
              type="text"
              className="form-control w-full px-3 py-3 border border-gray-300 rounded-lg text-xs font-light text-gray-600 focus:outline-none focus:ring focus:ring-yellow-200"
              placeholder="Хэрэглэгчийн нэр"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-gray-700 text-xs">Нууц үг</label>
            <motion.input
              type="password"
              className="form-control w-full px-3 py-3 border border-gray-300 rounded-lg text-xs font-light text-gray-600 focus:outline-none focus:ring focus:ring-yellow-200"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </div>

          <div className="d-grid">
            <motion.button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-400 text-gray-700 text-xs font-light rounded-lg hover:bg-yellow-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Нэвтрэх
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
