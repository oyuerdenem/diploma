import React, { useEffect } from "react";
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
import DashboardPage from "./pages/admin-dashboard/dashboard-page";
import MenuPage from "./pages/admin-menu/menu-page";
import WebSocketService from "./services/websocket-service";
import PayPage from "./pages/client-pay/pay";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");
  useEffect(() => {
    WebSocketService.connect();

    WebSocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);
    };

    return () => {
      WebSocketService.close();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/payment" element={<PayPage />} />
          </>
        )}
        {userType === "staff" && <Route path="/dashboard" element={<DashboardPage />} />}

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/payment" element={<PayPage />} />
            <>
              <Route path="/" element={<OrderPage />} />
              <Route path="/user" element={<OrderPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/menus" element={<MenuPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </>
          {userType === "admin" && (
            <>
              <Route path="/user" element={<OrderPage />} />
              <Route path="/dashboard" element={<OrderPage />} />
              <Route path="/menus" element={<OrderPage />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/staffs" element={<OrderPage />} />
              <Route path="/settings" element={<OrderPage />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
