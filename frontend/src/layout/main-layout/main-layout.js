import React from "react";
import Sidebar from "./../sidebar/sidebar";
import GlobalHeader from "../../components/global-header/header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-[#FFCB43] bg-opacity-5 ml-16 px-8 py-2">
        <GlobalHeader/>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
