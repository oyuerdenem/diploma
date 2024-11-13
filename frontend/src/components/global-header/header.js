import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const GlobalHeader = () => {
  const location = useLocation();
  const daysOfWeek = [
    "Ням",
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
  ];

  const formatDate = (date) => {
    const dayOfWeek = daysOfWeek[date.getDay()];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${dayOfWeek}, ${year} он ${month} сар ${day}`;
  };
  const currentDate = formatDate(new Date());

  const route = location.pathname;
  const getTitle = () => {
    switch (route) {
      case "/dashboard":
        return "Үзүүлэлт";
      case "/settings":
        return "Тохиргоо";
      case "/orders":
        return "Захиалга";
      case "/menus":
        return "Меню";
      default:
        return "Хуудас";
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-14">
      <h2 className="text-xl text-gray-700 font-lighter">{getTitle()}</h2>
      <div className="flex items-center space-x-2 text-xs font-extralight text-gray-700">
        <IoTimeOutline size={20} className="text-gray-500" />
        <p>{currentDate}</p>
      </div>
    </div>
  );
};

export default GlobalHeader;
