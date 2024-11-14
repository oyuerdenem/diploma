import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCupHot, BsHeart, BsHouseDoor, BsGift } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import ButtonComponent from "../../components/buttons/client-button.tsx";

export default function Menu() {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  const navItems = [
    { icon: <BsHouseDoor size={20} />, label: "СҮШИ" },
    { icon: <BsHeart size={20} />, label: "Тааламжит" },
    { icon: <BsCupHot size={20} />, label: "Уух зүйл" },
    { icon: <BsGift size={20} />, label: "Нэмэлт" },
  ];

  const buttonItems = [
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
    { background: "home-background.png", value: "20.9k", label: "NIGIRI" },
  ];

  return (
    <div className="relative w-full h-screen flex flex-col">
      <nav className="w-full h-14 flex justify-between items-center p-4">
        <RxHamburgerMenu size={25} />
        <div className="text-lg">ҮНДСЭН ЦЭС</div>
        <IoIosNotificationsOutline size={30} />
      </nav>

      <div className="w-full bg-[#1E1E1E] text-white flex-grow">
        <nav className="w-full h-16 flex justify-around items-center py-4 my-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="flex flex-col justify-center items-center h-12 w-12"
            >
              {item.icon}
              <div className="text-xs font-extralight mt-1">{item.label}</div>
            </button>
          ))}
        </nav>

        <div className="px-5 grid grid-cols-2 gap-y-5 justify-center overflow-y-scroll max-h-[560px]">
          {buttonItems.map((item, index) => (
            <ButtonComponent
              key={index}
              background={item.background}
              value={item.value}
              label={item.label}
              onClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
