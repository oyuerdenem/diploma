import React from "react";
import { FiArrowRight } from "react-icons/fi";

const OrderPayItem = ({ orderId, phoneNumber, productCount, isPayed }) => (
  <div className="flex items-center p-2 border-b border-gray-200 font-light text-sm">
    <div className="bg-[#086A69] text-white font-light text-sm rounded-md p-2 flex items-center justify-center w-10 h-10">
      <p>{orderId}</p>
    </div>
    <div className="ml-4 flex-1">
      <p>{phoneNumber}</p>
      <p className="text-xs">{productCount} бүтээгдэхүүн</p>
    </div>
    <div className="ml-auto text-right flex w-20 h-7">
      {isPayed ? (
        <button
          disabled
          className="bg-yellow-500 bg-opacity-10 text-gray-700 text-xs rounded-full p-2 flex-1 flex items-center justify-center"
        >
          <p>Төлөгдсөн</p>
        </button>
      ) : (
        <button className="bg-yellow-400 text-gray-700 text-xs rounded-full p-2 flex-1 flex items-center justify-center">
          <p>Төлөх</p>
          <FiArrowRight size={13} className="text-gray-700 ml-1" />
        </button>
      )}
    </div>
  </div>
);

export default OrderPayItem;
