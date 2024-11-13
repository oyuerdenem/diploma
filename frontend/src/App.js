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

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";
  const userType = window.localStorage.getItem("userType");

  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    WebSocketService.connect();

    WebSocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message from server:", data);

      // setMessages((prevMessages) => [...prevMessages, data]);
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
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </>
        )}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {userType === "staff" && (
            <>
              <Route path="/" element={<OrderPage />} />
              <Route path="/user" element={<OrderPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/menus" element={<MenuPage />} />
              <Route path="/orders" element={<OrderPage />} />
            </>
          )}
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

      {/* <div>
        <h3>WebSocket Messages:</h3>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div> */}
    </Router>
  );
}

export default App;
