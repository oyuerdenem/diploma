import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/login-component";
import ProtectedRoute from "./components/protected-route";
import Order from "./pages/order";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true"; // Ensure proper comparison
  const userType = window.localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Unauthorized routes */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            {/* Redirect to home if logged in */}
            <Route path="/login" element={<Navigate to="/" />} />
            {userType === "staff" ? (
              <>
                <Route path="/orders" element={<Order />} />
              </>
            ) : null}
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
