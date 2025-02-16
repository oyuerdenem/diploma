import React, { useEffect, useState } from "react";
import axios from "axios";
// import SearchInput from "../../components/reusable/search-input";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import OrderSummary from "../../components/reusable/order-summary.tsx";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(3);
  const [changed, setChanged] = useState(false);
  // const refreshInterval = 10000;
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
  const id = window.localStorage.getItem("branchId");

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      const response = await axios.get(
        `http://localhost:8000/api/orders/${id}`, // Ensure `id` is defined
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add 'Bearer' if needed
          },
        }
      );
  
      const result = response.data.data.map((data) => {
        const date = new Date(data.orderDate);
        const time = `${date.getHours()} цаг ${String(date.getMinutes()).padStart(2, "0")} мин ${String(date.getSeconds()).padStart(2, "0")} сек`;
  
        return {
          id: data._id,
          realTime: data.orderDate,
          status: data.status,
          date: date,
          total: data.totalAmount,
          option: data.option,
          time: time,
        };
      });
  
      setOrders(result);
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  };
  
  const fetchCompletedOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/orders/completed/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response) {
        if (response.data.success) {
          const result = response.data.data.map((data) => {
            const date = new Date(data.orderDate);
            const time =
              date.getHours() +
              " цаг " +
              String(date.getMinutes()).padStart(2, "0") +
              " мин " +
              String(date.getSeconds()).padStart(2, "0") +
              " сек";

            return {
              id: data._id,
              realTime: data.orderDate,
              status: data.status,
              date: date,
              total: data.totalAmount,
              option: data.option,
              time: time,
            };
          });
          setOrders(result);
        } else {
          setOrders([]);
        }
      } else {
        console.error("Failed fetching cuisine data.");
      }
    } catch (error) {
      console.error("Error fetching cuisine data:", error);
    }
  };

  const fetchUncompletedOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/orders/uncompleted/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log({ response });
      if (response) {
        if (response.data.success) {
          const result = response.data.data.map((data) => {
            const date = new Date(data.orderDate);
            const time =
              date.getHours() +
              " цаг " +
              String(date.getMinutes()).padStart(2, "0") +
              " мин " +
              String(date.getSeconds()).padStart(2, "0") +
              " сек";

            return {
              id: data._id,
              realTime: data.orderDate,
              status: data.status,
              date: date,
              total: data.totalAmount,
              option: data.option,
              time: time,
            };
          });
          setOrders(result);
        } else {
          setOrders([]);
        }
      } else {
        console.error("Failed fetching cuisine data.");
      }
    } catch (error) {
      console.error("Error fetching cuisine data:", error);
    }
  };

  useEffect(() => {
    if (currentFilter) {
      console.log({ currentFilter });
      switch (currentFilter) {
        case 1:
          fetchAllOrders();
          break;
        case 2:
          fetchCompletedOrders();
          break;
        default:
          fetchUncompletedOrders();
          break;
      }
    }
  }, [currentFilter]);

  useEffect(() => {
    console.log({ orders });
  }, [orders]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentFilter) {
  //       console.log({ currentFilter });
  //       switch (currentFilter) {
  //         case 1:
  //           fetchOrdersByOrder();
  //           break;
  //         case 2:
  //           fetchOrdersByTable();
  //           break;
  //         default:
  //           fetchOrdersByOrder();
  //           break;
  //       }
  //     }
  //   }, refreshInterval);

  //   return () => clearInterval(interval);
  // }, [currentFilter]);

  const handleButton = (filter) => {
    setCurrentFilter(filter);
  };

  useEffect(() => {
    console.log({ changed });
    if (changed) {
      const filter = currentFilter;
      setCurrentFilter(filter);
    }
  }, [changed]);

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex space-x-4 text-xs">
            <button
              className={`h-8 px-4 w-auto ml-3  ${
                currentFilter === 1
                  ? "bg-[#086A69] text-white"
                  : "bg-white text-gray-700"
              } border rounded-lg flex justify-center items-center  hover:shadow`}
              onClick={() => {
                handleButton(1);
              }}
            >
              Бүх
            </button>
            <button
              className={`h-8 px-4 w-auto ml-3  ${
                currentFilter === 3
                  ? "bg-[#086A69] text-white"
                  : "bg-white text-gray-700"
              } border rounded-lg flex justify-center items-center  hover:shadow`}
              onClick={() => {
                handleButton(3);
              }}
            >
              Хүлээгдэж буй
            </button>
            <button
              className={`h-8 px-4 w-auto ml-3  ${
                currentFilter === 2
                  ? "bg-[#086A69] text-white"
                  : "bg-white text-gray-700"
              } border rounded-lg flex justify-center items-center  hover:shadow`}
              onClick={() => {
                handleButton(2);
              }}
            >
              Хүргэгдсэн
            </button>
          </div>
        </motion.div>

        <div className="flex space-x-5 justify-end items-center ml-4 pr-3">
          <button
            onClick={handleRefresh}
            className="bg-yellow-400 flex justify-center items-center h-8 w-8 rounded-full text-gray-700 hover:text-black"
          >
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
          {Array.isArray(orders) && orders.length > 0 ? (
            orders
              .sort((a, b) => {
                const dateTimeA = new Date(`${a.realTime}`);
                const dateTimeB = new Date(`${b.realTime}`);
                return dateTimeB - dateTimeA;
                return dateTimeB - dateTimeA;
              })
              .reduce(
                (acc, _, i) =>
                  i % 3 === 0 ? acc.push(orders.slice(i, i + 3)) && acc : acc,
                []
              )
              .map((orderRow, rowIndex) => (
                <div key={rowIndex} className="flex mb-4 space-x-8">
                  {orderRow.map((order, index) => (
                    <OrderSummary
                      key={order.id}
                      id={order.id}
                      status={order.status}
                      date={formatDate(order.date)}
                      option={order.option}
                      total={order.total}
                      time={order.time}
                      changed={changed}
                      setChanged={setChanged}
                    />
                  ))}
                </div>
              ))
          ) : (
            <div className="flex justify-center items-center w-full h-full mt-2 text-sm font-light">
              <p>Өнөөдрийн захиалга олдсонгүй.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
