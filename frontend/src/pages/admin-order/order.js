import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "../../components/reusable/search-input";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import OrderSummary from "../../components/reusable/order-summary.tsx";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const handleRefresh = () => {
    window.location.reload();
  };
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
    return `${dayOfWeek}, ${month}-р сарын ${day}, ${year}`;
  };  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/orders", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const result = response.data.data.map((data) => {
          const date = new Date(data.orderDate);
          const time = date.getHours() + " цаг " + String(date.getMinutes()).padStart(2, '0') + " мин " + String(date.getSeconds()).padStart(2, '0') + " сек";
          
          return {
            id: data._id,
            status: data.status,
            date: date, 
            total: data.totalAmount,
            option: data.option,
            time: time,
          };
        });        

        setOrders(result);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      }
    };

    fetchOrders();
  }, []);

  const orderChunks = Array.isArray(orders)
    ? orders.reduce(
        (acc, _, i) =>
          i % 4 === 0 ? acc.push(orders.slice(i, i + 4)) && acc : acc,
        []
      )
    : [];

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
            {/* <button className="h-8 px-4 w-auto ml-3 border rounded-lg flex justify-center items-center text-gray-700 bg-white hover:shadow">
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
            </button> */}
          </div>
        </motion.div>

        <div className="flex space-x-5 justify-end items-center ml-4 pr-3">
          {/* <SearchInput /> */}
          <button onClick={handleRefresh} className="bg-yellow-400 flex justify-center items-center h-8 w-8 rounded-full text-gray-700 hover:text-black">
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
          {Array.isArray(orders) &&
            orders
              .reduce(
                (acc, _, i) =>
                  i % 4 === 0 ? acc.push(orders.slice(i, i + 4)) && acc : acc,
                []
              )
              .map((orderRow, rowIndex) => (
                <div key={rowIndex} className="flex mb-4 space-x-8">
                  {orderRow.map((order, index) => (
                    <OrderSummary
                      id={order.id}
                      status={order.status}
                      date={formatDate(order.date)}
                      option={order.option}
                      total={order.total}
                      time={order.time} 
                    />
                  ))}
                </div>
              ))}
        </div>
      </motion.div>
    </div>
  );
}
