import React from "react";
import { FiCheckCircle, FiClock, FiCheckSquare } from "react-icons/fi";

const OrderItem = ({ orderId, phoneNumber, productCount, status }) => {
  // Define different icons and background colors based on status
  let icon;
  let bgColor;
  let textColor;
  let statusText;

  switch (status) {
    case "Completed":
      icon = <FiCheckCircle size={10} />;
      bgColor = "bg-black bg-opacity-10";
      textColor = "text-gray-700";
      statusText = "Completed";
      break;
    case "Inprogress":
      icon = <FiClock size={10} />;
      bgColor = "bg-yellow-400 bg-opacity-30";
      textColor = "text-gray-700";
      statusText = "In Progress";
      break;
    case "Ready":
      icon = <FiCheckSquare size={10} />;
      bgColor = "bg-[#086A69] bg-opacity-20";
      textColor = "text-gray-700";
      statusText = "Ready";
      break;
    default:
      icon = <FiCheckCircle size={10} />;
      bgColor = "bg-gray-300";
      textColor = "text-gray-700";
      statusText = "Unknown";
  }

  return (
    <div className="flex items-center p-2 border-b border-gray-200 font-light  text-sm">
      <div className="bg-[#086A69] text-white font-light  text-sm rounded-md p-2 flex items-center justify-center w-10 h-10">
        <p>{orderId}</p>
      </div>
      <div className="ml-4 flex-1 font-light  text-sm">
        <p>{phoneNumber}</p>
        <p className="text-xs">{productCount} бүтээгдэхүүн</p>
      </div>
      <div className="ml-auto text-right">
        <div className={`flex items-center justify-center space-x-2 ${bgColor} ${textColor} rounded-md p-2`}>
          {icon}
          <p className="ml-1 text-xs">{statusText}</p>
        </div>
        <p className="text-xs text-gray-500">Ready to serve</p>
      </div>
    </div>
  );
};

export default OrderItem;
