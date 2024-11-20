import React from "react";

type FormatTotalProps = {
  value: number | string; 
};

const FormatTotal: React.FC<FormatTotalProps> = ({ value }) => {
  const numericValue = Number(value);

  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  }).format(numericValue);

  return <span>{formattedValue}₮</span>;
};

export default FormatTotal;
