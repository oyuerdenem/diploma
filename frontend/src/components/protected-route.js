import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
