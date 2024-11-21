import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ButtonComponentProps {
  background: string;
  value: string;
  label: string;
  count: number;
  onClick: () => void;
  onClear: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  background,
  value,
  label,
  count,
  onClick,
  onClear,
}) => {
  return (
    <div className="flex items-center justify-center w-[36] h-full">
      <button
        className={`w-36 h-36 rounded-md overflow-hidden relative flex flex-col items-center justify-center bg-black hover:shadow-lg border-[0.3px] border-white focus:outline-none ${
          count === 0 ? "bg-opacity-30 bg-white" : ""
        }`}
        onClick={onClick}
      >
        <div className="relative w-full h-full">
          <img
            src={require(`./../assets/${label}.jpg`)}
            alt="Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Black overlay */}
        </div>

        <div className="absolute inset-0 flex flex-col justify-between text-white text-lg font-semibold">
          <p className="text-sm font-extralight p-2 text-start">
            {(Number(value) / 1000).toFixed(1)}к
          </p>
          <div
            className={`${
              count === 0 ? "hidden" : ""
            } flex justify-center items-center w-full h-full`}
          >
            <p className="text-4xl font-light">{count}</p>
          </div>
          <p className="text-sm font-extralight text-start p-2 uppercase">
            {label}
          </p>
          <button
            className={`absolute top-1 right-1 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none ${
              count === 0 ? "hidden" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
      </button>
    </div>
  );
};

export default ButtonComponent;
