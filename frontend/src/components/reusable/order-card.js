// OrderCard.jsx
import React from 'react';
import { FiBell } from 'react-icons/fi';

const OrderCard = ({ 
  title, 
  count, 
  description, 
  bgColor = '#086A69', 
  textColor = '#FFFFFF', 
  icon: Icon = FiBell, 
  iconBgColor = '#FFFFFF' 
}) => (
  <div 
    className="h-28 min-w-[230px] max-w-[500px] rounded-md p-4 flex flex-col justify-between border border-gray-200" 
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-md">{title}</p>
        <div className="font-medium text-2xl mt-1">
          <p>{count}</p>
        </div>
      </div>
      <div className="rounded-md p-2" style={{ backgroundColor: iconBgColor }}>
        <Icon size={20} color={bgColor} />
      </div>
    </div>
    <div className="text-xs font-light">
      <p>{description}</p>
    </div>
  </div>
);

export default OrderCard;
