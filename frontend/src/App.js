import LoginRegister from './components/login-register/LoginRegister';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const userType = window.localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        {/* <Navbar isLoggedIn={isLoggedIn} userType={userType} /> */}

        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType != "Admin" ? (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<UserDetails />} />
                <Route path="/products" element={<Product />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminHome />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
