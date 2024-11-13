import React from "react";
import SearchInput from "../../components/reusable/search-input";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import OrderSummary from "../../components/reusable/order-summary";

export default function Order() {
  const orderData = [
    {
      tableNumber: "A1",
      orderId: 123,
      orderDate: "2024-11-13",
      orderTime: "14:30",
      items: [
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
        { name: "Pizza", count: 2, price: 20.0 },
      ],
      total: 40.0,
    },
    {
      tableNumber: "A2",
      orderId: 124,
      orderDate: "2024-11-13",
      orderTime: "14:45",
      items: [{ name: "Burger", count: 1, price: 10.0 }],
      total: 10.0,
    },
    {
      tableNumber: "A3",
      orderId: 125,
      orderDate: "2024-11-13",
      orderTime: "15:00",
      items: [{ name: "Pasta", count: 3, price: 12.0 }],
      total: 36.0,
    },
    {
      tableNumber: "A4",
      orderId: 126,
      orderDate: "2024-11-13",
      orderTime: "15:15",
      items: [{ name: "Pizza", count: 2, price: 20.0 }],
      total: 40.0,
    },
    {
      tableNumber: "A4",
      orderId: 126,
      orderDate: "2024-11-13",
      orderTime: "15:15",
      items: [{ name: "Pizza", count: 2, price: 20.0 }],
      total: 40.0,
    },
    {
      tableNumber: "A4",
      orderId: 126,
      orderDate: "2024-11-13",
      orderTime: "15:15",
      items: [{ name: "Pizza", count: 2, price: 20.0 }],
      total: 40.0,
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex space-x-4 text-xs">
            <button className="h-8 px-4 w-auto ml-3 bg-[#086A69] border rounded-lg flex justify-center items-center text-white hover:bg-[#086A69] hover:shadow">
              Бүх
            </button>
            <button className="h-8 px-4 w-auto ml-3 border rounded-lg flex justify-center items-center text-gray-700 bg-white hover:shadow">
              Хийгдэж буй
            </button>
            <button className="h-8 px-4 w-auto ml-3 bg-white border rounded-lg flex justify-center items-center text-gray-700 hover:shadow">
              Хийгдсэн
            </button>
            <button className="h-8 px-4 w-auto ml-3 border rounded-lg flex justify-center items-center text-gray-700 bg-white hover:shadow">
              Ширээгээр
            </button>
            <button className="h-8 px-4 w-auto ml-3 bg-white border rounded-lg flex justify-center items-center text-gray-700 hover:shadow">
              Захиалгаар
            </button>
          </div>
        </motion.div>

        <div className="flex space-x-5 justify-end items-center ml-4 pr-3">
          <SearchInput />
          <button className="bg-yellow-400 flex justify-center items-center h-8 w-8 rounded-full text-gray-700 hover:text-black">
            <FiRefreshCcw size={14} />
          </button>
        </div>
      </div>
      <motion.div
  className="w-full flex mb-4 space-x-8 overflow-x-auto max-h-[75vh]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <div className="w-full flex flex-col mb-4 px-3">
    {orderData
      .reduce(
        (acc, _, i) =>
          i % 4 === 0 ? acc.push(orderData.slice(i, i + 4)) && acc : acc,
        []
      )
      .map((orderRow, rowIndex) => (
        <div key={rowIndex} className="flex mb-4 space-x-8">
          {orderRow.map((order, index) => (
            <OrderSummary
              key={index}
              tableNumber={order.tableNumber}
              orderId={order.orderId}
              orderDate={order.orderDate}
              orderTime={order.orderTime}
              items={order.items}
              total={order.total}
            />
          ))}
        </div>
      ))}
  </div>
</motion.div>

    </div>
  );
}
