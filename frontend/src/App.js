import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./components/login/login-component";
import ProtectedRoute from "./components/protected-route";
import Order from "./pages/order";
// import Sidebar from "./components/sidebar/sidebar";
import Home from "./pages/client-home/home";
import Menu from "./pages/client-menu/menu";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true"; // Ensure proper comparison
  const userType = window.localStorage.getItem("userType");
  
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* <Sidebar />/home */}
        <div className="flex-1 bg-gray-100">
          <Routes>
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
              </>
            )}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" />} />
              {userType === "staff" && (
                <>
                  <Route path="/orders" element={<Order />} />
                </>
              )}
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
