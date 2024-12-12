import React, { useEffect, useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
import { BsCupHot, BsHeart, BsHouseDoor, BsGift } from "react-icons/bs";
// import { IoIosNotificationsOutline } from "react-icons/io";
import ButtonComponent from "../../components/buttons/client-button.tsx";
import axios from "axios";
import { IoTrashBin } from "react-icons/io5";
import OrderButton from "../../components/buttons/client-order-button.tsx";
import { useNavigate } from "react-router-dom";
import FormatTotal from "../../components/formatter/format-total.tsx";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedNav, setSelectedNav] = useState('Meal');
  const [openModal, setOpenModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const navItems = [
    { icon: <BsHouseDoor size={20} />, label: "СҮШИ" },
    { icon: <BsHeart size={20} />, label: "Тааламжит" },
    { icon: <BsCupHot size={20} />, label: "Уух зүйл" },
    { icon: <BsGift size={20} />, label: "Нэмэлт" },
  ];

  const handleButtonClick = (clickedItem) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.label === clickedItem.label
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
    setSelectedItems((prevItems) =>
      prevItems.includes(clickedItem.id)
        ? prevItems
        : [...prevItems, clickedItem.id]
    );
  };

  const handleClearCount = (itemToClear) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.label === itemToClear.label ? { ...item, count: 0 } : item
    );
    setMenuItems(updatedMenuItems);
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item !== itemToClear.id)
    );
  };

  const handleAllClear = () => {
    setMenuItems(menuItems.map((item) => ({ ...item, count: 0 })));
    setSelectedItems([]);
  };

  const handleOrderBtn = () => {
    setOpenModal(!openModal);
  };

  const handleOrderBtnOther = () => {
    setOpenModal(false);
  };

  const handleNavBtnClick = (item) => {
    switch (item.label) {
      case "СҮШИ":
        setSelectedNav('Meal');
        break;
      case "Тааламжит":
        setSelectedNav('');
        break;
      case "Уух зүйл":
        setSelectedNav('Drink');
        break;
      case "Нэмэлт":
        setSelectedNav('Additional');
        break;
      default:
        setSelectedNav('Meal');
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

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/menuitem/menu"
        );
        const menuItemData = response.data.data.map((cuisine) => ({
          id: cuisine.cuisineId,
          background: "home-background.png",
          value: cuisine.price,
          description: cuisine.cuisineDesc,
          label: cuisine.cuisineName,
          category: cuisine.category.categoryId,
          categoryName: cuisine.category.name,
          count: 0,
        }));
        setMenuItems(menuItemData);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      }
    };

    fetchCuisines();
  }, []);

  const [selectedItemsDetails, setSelectedItemsDetails] = useState([]);

  useEffect(() => {
    let filteredDetails = menuItems.filter((item) =>
        selectedItems.includes(item.id)
      );
  
    setSelectedItemsDetails(filteredDetails);
  
  }, [selectedItems, menuItems]);
  

  const handlePayment = () => {
    navigate("/payment", {
      state: { total: total, items: selectedItemsDetails },
    });
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <nav className="w-full h-14 flex justify-center items-center p-4">
        {/* <RxHamburgerMenu size={25} /> */}
        <div className="text-lg">ҮНДСЭН ЦЭС</div>
        {/* <IoIosNotificationsOutline size={30} /> */}
      </nav>

      <div
        className="w-full bg-[#1E1E1E] text-white flex-grow"
        onClick={handleOrderBtnOther}
      >
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
              (item) => selectedNav === 0 || item.categoryName === selectedNav
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
      <div
        className={`absolute flex flex-col justify-center items-center bottom-0 w-full ${
          openModal
            ? "bg-white rounded-t-2xl"
            : "bg-gradient-to-t from-gray-600 to-transparent"
        } overflow-hidden`}
      >
        {openModal && (
          <div className="bg-white p-4 w-full flex flex-col justify-center items-center">
            <h2 className="text-center uppercase text-sm">
              Таны захиалсан бүтээгдэхүүн
            </h2>
            <p className="text-center mb-4 text-xs font-light">
              Их дэлгүүр салбар
            </p>
            {selectedItemsDetails.map((item) => (
              <OrderButton
                key={item.id}
                label={item.label}
                desc={item.description}
                count={item.count}
                value={item.value}
              />
            ))}
            <div className="w-full px-3 mt-2">
              <div className="flex justify-between items-center px-2 w-full py-2 bg-gray-100 text-sm">
                <IoTrashBin
                  size={14}
                  onClick={handleAllClear}
                  className="text-gray-500"
                />
                <p>
                  Нийт дүн: <FormatTotal value={total} />
                </p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            if (selectedItemsDetails.length === 0) {
              handleOrderBtn();
            } else {
              handlePayment();
            }
          }}
          className={`mx-2 mb-5 bg-[#FFCB43] text-sm rounded-md py-2 px-5 w-80 uppercase ${
            openModal ? "" : "hidden"
          }`}
        >
          {selectedItemsDetails.length !== 0 ? (
            <p>Үргэлжлүүлэх</p>
          ) : (
            <p>Захиалах</p>
          )}
        </button>
        <button
          onClick={handleOrderBtn}
          className={`mx-2 mb-5 bg-[#FFCB43] text-sm rounded-md py-2 px-5 w-80 uppercase ${
            openModal ? "hidden" : ""
          }`}
        >
          Захиалах: (<FormatTotal value={total} />)
        </button>
      </div>
    </div>
  );
}
