import React from "react";
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

const Sidebar = () => {
  const Menus = [
    { title: "Dashboard", icon: <MdOutlineDashboard size={23} /> },
    { title: "Menu", icon: <MdMenuBook size={23} /> },
    { title: "Orders", icon: <MdOutlineContentPaste size={23} /> },
    { title: "Staffs", icon: <MdOutlineSupervisedUserCircle size={23} /> },
    { title: "Settings", icon: <MdOutlineSettings size={23} /> },
  ];

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/logout/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Logout successful:', data.message);
        localStorage.removeItem('token'); 
        window.location.href = "/login"; 
      } else {
        console.error('Logout failed:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };
  

  const handleClick = (title) => {
    switch (title) {
      case "Logout":
        console.log("Logout clicked");
        logout();
        break;
      case "User":
        console.log("Dashboard clicked");
        // Additional actions for Dashboard can go here
        break;
      case "Dashboard":
        console.log("Dashboard clicked");
        // Additional actions for Dashboard can go here
        break;
      case "Menu":
        console.log("Menu clicked");
        // Additional actions for Menu can go here
        break;
      case "Orders":
        console.log("Orders clicked");
        // Additional actions for Orders can go here
        break;
      case "Staffs":
        console.log("Staffs clicked");
        // Additional actions for Staffs can go here
        break;
      case "Settings":
        console.log("Settings clicked");
        // Additional actions for Settings can go here
        break;
      default:
        console.log("No matching page");
        break;
    }
  };

  return (
    <div className="bg-white h-full fixed top-0 left-0 duration-300 z-10 w-16 shadow-md">
      <div className="pt-6 flex flex-col justify-center items-center">
        <img
          src={logo}
          alt="Sidebar Logo"
          className="w-16 mb-6 mt-2"
          onClick={() => handleClick("Dashboard")}
        />

        <div className="w-full">
          {Menus.map((Menu, index) => (
            <div
              key={index}
              className={`w-16 flex items-center justify-center mb-1 p-3 cursor-pointer transition duration-200 text-gray-500 hover:text-gray-700`}
              onClick={() => handleClick(Menu.title)} // Update the clicked page
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#086A69] hover:bg-opacity-10 transition duration-200">
                {Menu.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full mt-40">
          <div className="w-18 flex items-center justify-center mb-1 p-2 cursor-pointer rounded-md text-gray-500 hover:text-gray-700">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-md transition duration-200"
              onClick={() => handleClick("User")}
            >
              <CgProfile size={23} />
            </div>
          </div>
          <div className="w-18 flex items-center justify-center mb-1 p-2 cursor-pointer rounded-md text-gray-500 hover:text-gray-700">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-md transition duration-200"
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
