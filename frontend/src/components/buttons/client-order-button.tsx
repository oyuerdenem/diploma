import React from "react";
import logo from "./../assets/home-background.png";
import FormatTotal from "../formatter/format-total";

interface OrderButtonProps {
  label: string;
  desc: string;
  count: number;
  value: number;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  label,
  desc,
  count,
  value,
}) => {
  return (
    <div className="flex justify-between w-full px-3 mb-2 text-sm">
      <div className="flex items-start w-4/5">
        <div className="relative flex items-center justify-center bg-white bg-opacity-15 w-14 h-14 overflow-hidden rounded-md">
          {/* <img
            alt={label}
            src={require(`./../assets/${label}.jpg`)}
            className="w-12 h-12 rounded-md flex-shrink-0"
          /> */}
          <div className="relative w-12 h-12 rounded-md flex-shrink-0">
          <img
            src={require(`./../assets/${label}.jpg`)}
            alt="Background"
            className="object-cover w-full h-full rounded-md"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-md"></div>{" "}
          {/* Black overlay */}
        </div>
          <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-light text-white opacity-90">
            {count}
          </p>
        </div>
        <div className="flex flex-col mx-2 w-3/4">
          <p className="truncate">{label}</p>
          <p className="text-xs font-light break-words">
            {desc.length > 50 ? `${desc.substring(0, 55)}...` : desc}
          </p>
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <FormatTotal value={value * count} />
      </div>
    </div>
  );
};

export default OrderButton;
