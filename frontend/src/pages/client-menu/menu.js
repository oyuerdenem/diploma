import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsCupHot, BsHeart, BsHouseDoor, BsGift } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import ButtonComponent from "../../components/buttons/client-button.tsx";
import axios from "axios";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedNav, setSelectedNav] = useState(0);

  const handleButtonClick = (clickedItem) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.label === clickedItem.label
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const handleClearCount = (itemToClear) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.label === itemToClear.label ? { ...item, count: 0 } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const handleNavBtnClick = (item) => {
    switch (item.label) {
      case "СҮШИ":
        setSelectedNav(2);
        break;
      case "Тааламжит":
        setSelectedNav(4);
        break;
      case "Уух зүйл":
        setSelectedNav(1);
        break;
      case "Нэмэлт":
        setSelectedNav(3);
        break;
      default:
        setSelectedNav(2);
        break;
    }
  };

  useEffect(() => {
    const newTotal = menuItems.reduce(
      (sum, item) => sum + item.count * item.value,
      0
    );
    setTotal(newTotal);
  }, [menuItems]);

  const formatTotal = (value) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
      }).format(value) + "₮"
    );
  };

  const navItems = [
    { icon: <BsHouseDoor size={20} />, label: "СҮШИ" },
    { icon: <BsHeart size={20} />, label: "Тааламжит" },
    { icon: <BsCupHot size={20} />, label: "Уух зүйл" },
    { icon: <BsGift size={20} />, label: "Нэмэлт" },
  ];

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/menuitem/menu"
        );
        const menuItemData = response.data.data.map((cuisine) => ({
          background: "home-background.png",
          value: cuisine.price,
          description: cuisine.cuisineName,
          label: cuisine.cuisineName,
          category: cuisine.category.categoryId,
          count: 0,
        }));
        setMenuItems(menuItemData);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      }
    };

    fetchCuisines();
  }, []);

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
              onClick={() => handleNavBtnClick(item)}
              className="flex flex-col justify-center items-center h-12 w-12"
            >
              {item.icon}
              <div className="text-xs font-extralight mt-1">{item.label}</div>
            </button>
          ))}
        </nav>

        <div className="px-5 grid grid-cols-2 gap-y-5 justify-center overflow-y-scroll max-h-[540px] pb-5">
          {menuItems
            .filter(
              (item) => selectedNav === 0 || item.category === selectedNav
            )
            .map((item, index) => (
              <ButtonComponent
                key={index}
                background={item.background}
                value={item.value}
                label={item.label}
                count={item.count}
                onClick={() => handleButtonClick(item)}
                onClear={() => handleClearCount(item)}
              />
            ))}
        </div>
      </div>
      <div className="absolute flex justify-center items-center h-20 bottom-0 w-full bg-gradient-to-t from-gray-600 to-transparent">
        <button className="m-2 bg-[#FFCB43] text-sm rounded-md py-2 px-5 w-80 uppercase">
          Захиалах: ({formatTotal(total)})
        </button>
      </div>
    </div>
  );
}
