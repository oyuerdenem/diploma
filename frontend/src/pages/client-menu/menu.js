import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCupHot, BsHeart, BsHouseDoor, BsGift } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import ButtonComponent from "../../components/buttons/client-button.tsx";

export default function Menu() {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  }
  return (
    <div className="relative w-full h-full flex flex-col">
      <nav className="w-full h-14 flex justify-between items-center p-4">
        <RxHamburgerMenu size={25} />
        <div className="text-lg">ҮНДСЭН ЦЭС</div>
        <IoIosNotificationsOutline size={30} />
      </nav>

      <div className="w-full bg-[#1E1E1E] text-white flex-grow">
        <nav className="w-full h-16 flex justify-around items-center py-4 my-2">
          <button className="flex flex-col justify-center items-center h-12 w-12">
            <BsHouseDoor size={20} />
            <div className="text-xs font-extralight mt-1">СҮШИ</div>
          </button>
          <button className="flex flex-col justify-center items-center h-12 w-12">
            <BsHeart size={20} />
            <div className="text-xs font-extralight mt-1">Тааламжит</div>
          </button>
          <button className="flex flex-col justify-center items-center h-12 w-12">
            <BsCupHot size={20} />
            <div className="text-xs font-extralight mt-1">Уух зүйл</div>
          </button>
          <button className="flex flex-col justify-center items-center h-12 w-12">
            <BsGift size={20} />
            <div className="text-xs font-extralight mt-1">Нэмэлт</div>
          </button>
        </nav>

        <div className="scrollable grid grid-cols-2 verflow-auto gap-8 justify-center">
          <ButtonComponent
            background="home-background.png" // Replace with your actual image path
            value="20.9k"
            label="NIGIRI"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
