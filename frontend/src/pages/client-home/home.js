import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import logo from "./../../components/assets/sidebar-logo.png";
import background from "./../../components/assets/home-background.png";
import LanguageIcon from "@mui/icons-material/Language";
import { BsCupHot, BsBasket } from "react-icons/bs";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate(); 
  useEffect(() => {
    if (clicked) {
      console.log("clicked");
      setClicked(false);
      navigate("/menu");
    }
  }, [clicked, navigate]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="relative w-full h-52 bg-white rounded-b-[100px] border border-gray-200 z-10 flex justify-between p-2 shadow-2xl"
        style={{
          boxShadow: "0px 0px 200px 200px rgba(255, 255, 255, 0.25)",
        }}
      >
        <div className="flex m-2">
          <LanguageIcon fontSize="small" className="text-gray-600" />
          <span className="ml-1 font-light text-sm">MN</span>
        </div>
        <img src={logo} alt="Sidebar Logo" className="w-48" />
        <div className="flex m-2 invisible">
          <LanguageIcon fontSize="small" className="text-gray-600" />
          <span className="ml-1 font-light text-sm">MN</span>
        </div>
      </div>

      <div className="relative flex items-center justify-around h-96 z-10 p-10 mt-auto space-x-6">
        <button
          onClick={() => setClicked(true)}
          className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-xl flex-col hover:bg-white hover:scale-105 transition-colors"
        >
          <BsCupHot size={30} />
          <p className="mt-2 text-sm">ЭНД ИДЭХ</p>
        </button>
        <button
          onClick={() => setClicked(true)}
          className="w-28 h-28 bg-yellow-500 flex items-center justify-center rounded-xl flex-col hover:bg-yellow-400 hover:scale-105 transition-colors"
        >
          <BsBasket size={30} />
          <p className="mt-2 text-sm">АВЧ ЯВАХ</p>
        </button>
      </div>
    </div>
  );
}
