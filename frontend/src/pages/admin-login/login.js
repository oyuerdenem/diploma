import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./../../components/assets/sidebar-logo.png";
import SimpleAlert from "../../components/alert/alert";

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
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userType", data.userType);
          window.localStorage.setItem("loggedIn", true);

          setTimeout(() => {
            navigate(data.userType === "staff" ? "/orders" : "/home");
          }, 2000);
        } else {
          setError("Нэвтрэх нэр, нууц үг буруу байна. Дахин оролдоно уу.");
        }
      })
      .catch(() => setError("Алдаа гарлаа, дахин оролдоно уу."));
  }

  return (
    <div className="auth-wrapper flex flex-col md:flex-row h-screen items-center justify-center bg-white">
      <div className="w-full md:w-1/4 flex justify-center">
        <img
          src={background}
          alt="Background"
          className="max-w-[80%] min-w-[50%] h-full object-cover rounded-lg md:rounded-none"
        />
      </div>
      <div className="auth-inner w-full md:w-1/4 bg-white p-12">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-light mb-6 text-center">Нэвтрэх</h3>

          {/* Display either Success or Error Alert */}
          {(success || error) && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-1/3">
              <SimpleAlert message={success || error} severity={success ? "success" : "error"} />
            </div>
          )}

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 text-xs">
              Нэвтрэх нэр
            </label>
            <input
              type="text"
              className="form-control w-full px-3 py-3 border border-gray-300 rounded-lg text-xs font-light text-gray-600 focus:outline-none focus:ring focus:ring-yellow-200"
              placeholder="Хэрэглэгчийн нэр"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-7">
            <label className="block mb-2 text-gray-700 text-xs">Нууц үг</label>
            <input
              type="password"
              className="form-control w-full px-3 py-3 border border-gray-300 rounded-lg text-xs font-light text-gray-600 focus:outline-none focus:ring focus:ring-yellow-200"
              placeholder="Нууц үг"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-400 text-gray-700 text-xs font-light rounded-lg hover:bg-yellow-500"
            >
              Нэвтрэх
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
