import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineSettings,
  MdOutlineContentPaste,
  MdOutlineDashboard,
  MdMenuBook,
  MdOutlineSupervisedUserCircle,
  MdLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import logo from "./../../components/assets/sidebar-logo.png";
import SimpleAlert from "../../utils/alert/alert";

const Sidebar = () => {
  const navigate = useNavigate();
  const userType = window.localStorage.getItem("userType");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const Menus = [
    { title: "Dashboard", icon: <MdOutlineDashboard size={23} />, staff: true },
    { title: "Menu", icon: <MdMenuBook size={23} />, staff: true },
    { title: "Orders", icon: <MdOutlineContentPaste size={23} />, staff: true },
    {
      title: "Staffs",
      icon: <MdOutlineSupervisedUserCircle size={23} />,
      staff: false,
    },
    { title: "Settings", icon: <MdOutlineSettings size={23} />, staff: false },
  ];

  const logout = async () => {
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8000/api/logout/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Амжилттай системээс гарлаа.");
        // console.log("Logout successful:", data.message);
        localStorage.removeItem("token");
        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("userType");
        // console.log({ localStorage });
        navigate("/login");
      } else {
        console.error("Logout failed:", data.message);
        setError("Системээс гарах хүсэлт зөвшөөрөгдсөнгүй. Дахин оролдоно уу.");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
      setError("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  const handleClick = (title) => {
    switch (title) {
      case "Logout":
        logout();
        break;
      case "User":
        navigate("/user");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Menu":
        navigate("/menus");
        break;
      case "Orders":
        navigate("/orders");
        break;
      case "Staffs":
        navigate("/staffs");
        break;
      case "Settings":
        navigate("/settings");
        break;
      default:
        console.log("No matching page");
        break;
    }
  };

  return (
    <div className="bg-white h-full fixed top-0 left-0 w-16 shadow-md z-10 duration-300">
      <div className="pt-6 flex flex-col items-center">
        {(success || error) && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-1/3 z-50">
            <SimpleAlert
              message={success || error}
              severity={success ? "success" : "error"}
            />
          </div>
        )}

        <img
          src={logo}
          alt="Sidebar Logo"
          className="w-16 mb-6 mt-2 cursor-pointer"
          onClick={() => handleClick("Dashboard")}
        />

        <div className="flex flex-col items-center w-full">
          {Menus.map(
            (menu, index) =>
              menu.staff && (
                <div
                  key={index}
                  className="flex items-center justify-center w-16 p-3 mb-1 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
                  onClick={() => handleClick(menu.title)}
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-[#086A69] hover:bg-opacity-10 transition duration-200">
                    {menu.icon}
                  </div>
                </div>
              )
          )}
        </div>

        <div
          className={`flex flex-col items-center w-full ${
            userType === "staff" ? "mt-56" : "mt-40"
          }`}
        >
          <div className="flex items-center justify-center w-16 p-2 mb-1 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-md"
              onClick={() => handleClick("User")}
            >
              <CgProfile size={23} />
            </div>
          </div>
          <div className="flex items-center justify-center w-16 p-2 mb-1 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-md"
              onClick={() => handleClick("Logout")}
            >
              <MdLogout size={23} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
