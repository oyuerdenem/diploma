import React from "react";
import Sidebar from "./../sidebar/sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-[#FFCB43] bg-opacity-5 ml-16">{children}</div>
    </div>
  );
};

export default MainLayout;
