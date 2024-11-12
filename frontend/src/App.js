import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import Home from "./pages/client-home/home";
import Menu from "./pages/client-menu/menu";
import Login from "./pages/admin-login/login";
import OrderPage from "./pages/admin-order/order-page";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </>
        )}
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {userType === "staff" && (
            <>
              <Route path="/orders" element={<OrderPage />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
