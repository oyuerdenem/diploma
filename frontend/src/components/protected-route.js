import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const token = window.localStorage.getItem("token");
  return (isLoggedIn && token) ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
