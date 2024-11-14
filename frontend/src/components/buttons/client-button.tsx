import React from 'react';

interface ButtonComponentProps {
  background: string;
  value: string;
  label: string;
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ background, value, label, onClick }) => {
  return (
    <div className="flex items-center justify-center w-[36] h-full">
      <button
        className="w-36 h-36 rounded-md overflow-hidden relative flex flex-col items-center justify-center bg-black hover:shadow-lg border-[0.3px] border-white focus:outline-none"
        onClick={onClick}
      >
        <img
          src={"./../assets/" + background}
          alt="Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-between text-white text-lg font-semibold">
          <p className="text-sm font-extralight p-2 text-end">{value}</p>
          <p className="text-sm font-extralight text-start p-2">{label}</p>
        </div>
      </button>
    </div>
  );
}

export default ButtonComponent;
