import React, { useEffect } from "react";
import { FiBell, FiCheckCircle, FiSmile } from "react-icons/fi";
import OrderCard from "../../components/reusable/order-card";
import OrderItem from "../../components/reusable/order-item";
import OrderPayItem from "../../components/reusable/order-pay-item";
import SearchInput from "../../components/reusable/search-input";
import OrderFoodItem from "../../components/reusable/order-food-item";
import { motion } from "framer-motion";

const Dashboard = () => {
  useEffect(() => {
    console.log("Dashboard");
  }, []);
  const orderCards = [
    {
      title: "Шинэ захиалга",
      count: 25,
      description: "*Захиалга бүрд шинэчлэгдэнэ.",
      bgColor: "#086A69",
      textColor: "#FFFFFF",
      icon: FiBell,
      iconBgColor: "white",
    },
    {
      title: "Нийт захиалга",
      count: 109,
      description: "+2.5% үр ашигтай",
      bgColor: "white",
      textColor: "gray-700",
      icon: FiCheckCircle,
      iconBgColor: "#086A69",
    },
    {
      title: "Хүлээлгийн тоо",
      count: 7,
      description: "+2.2% үр ашигтай",
      bgColor: "white",
      textColor: "gray-700",
      icon: FiSmile,
      iconBgColor: "#FFCB43",
    },
  ];

  const orders = [
    {
      orderId: "A1",
      phoneNumber: "88186513",
      productCount: 5,
      status: "Completed",
    },
    {
      orderId: "A2",
      phoneNumber: "88186514",
      productCount: 3,
      status: "Ready",
    },
    {
      orderId: "A3",
      phoneNumber: "88186515",
      productCount: 8,
      status: "Ready",
    },
    {
      orderId: "A1",
      phoneNumber: "88186513",
      productCount: 5,
      status: "Ready",
    },
    {
      orderId: "A2",
      phoneNumber: "88186514",
      productCount: 3,
      status: "Inprogress",
    },
    {
      orderId: "A3",
      phoneNumber: "88186515",
      productCount: 8,
      status: "Ready",
    },
    {
      orderId: "A1",
      phoneNumber: "88186513",
      productCount: 5,
      status: "Ready",
    },
    {
      orderId: "A2",
      phoneNumber: "88186514",
      productCount: 3,
      status: "Ready",
    },
    {
      orderId: "A3",
      phoneNumber: "88186515",
      productCount: 8,
      status: "Ready",
    },
  ];

  const orderFoods = [
    {
      orderNumber: 1,
      productImage: "./../../components/assets/home-background.png",
      productName: "Шарсан үхрийн мах",
      orderCount: 80,
    },
    {
      orderNumber: 2,
      productImage: "path_to_image",
      productName: "Шарсан тахианы мах",
      orderCount: 75,
    },
    {
      orderNumber: 3,
      productImage: "path_to_image",
      productName: "Бууз",
      orderCount: 60,
    },
    {
      orderNumber: 1,
      productImage: "./../../components/assets/home-background.png",
      productName: "Шарсан үхрийн мах",
      orderCount: 80,
    },
    {
      orderNumber: 2,
      productImage: "path_to_image",
      productName: "Шарсан тахианы мах",
      orderCount: 75,
    },
    {
      orderNumber: 3,
      productImage: "path_to_image",
      productName: "Бууз",
      orderCount: 60,
    },
    {
      orderNumber: 1,
      productImage: "./../../components/assets/home-background.png",
      productName: "Шарсан үхрийн мах",
      orderCount: 80,
    },
    {
      orderNumber: 2,
      productImage: "path_to_image",
      productName: "Шарсан тахианы мах",
      orderCount: 75,
    },
    {
      orderNumber: 3,
      productImage: "path_to_image",
      productName: "Бууз",
      orderCount: 60,
    },
    {
      orderNumber: 1,
      productImage: "./../../components/assets/home-background.png",
      productName: "Шарсан үхрийн мах",
      orderCount: 80,
    },
  ];

  const paymentItems = [
    { orderId: "B1", phoneNumber: "88186513", productCount: 5, isPayed: false },
    { orderId: "B2", phoneNumber: "88186514", productCount: 3, isPayed: true },
    { orderId: "B3", phoneNumber: "88186515", productCount: 8, isPayed: false },
    { orderId: "B1", phoneNumber: "88186513", productCount: 5, isPayed: false },
    { orderId: "B2", phoneNumber: "88186514", productCount: 3, isPayed: true },
    { orderId: "B3", phoneNumber: "88186515", productCount: 8, isPayed: false },
    { orderId: "B1", phoneNumber: "88186513", productCount: 5, isPayed: false },
    { orderId: "B2", phoneNumber: "88186514", productCount: 3, isPayed: true },
    { orderId: "B3", phoneNumber: "88186515", productCount: 8, isPayed: false },
  ];

  return (
    <motion.div
      className="flex flex-col lg:flex-row w-full p-4 space-y-4 lg:space-y-0 lg:space-x-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full lg:w-2/3 space-y-4 overflow-hidden">
        <div className="w-full flex flex-wrap justify-between gap-4">
          {orderCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OrderCard
                title={card.title}
                count={card.count}
                description={card.description}
                bgColor={card.bgColor}
                textColor={card.textColor}
                icon={card.icon}
                iconBgColor={card.iconBgColor}
              />
            </motion.div>
          ))}
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
          <div className="w-full lg:w-2/4 p-4 bg-white rounded-md overflow-hidden border border-gray-200">
            <p className="text-md font-medium mb-2">Захиалгууд</p>
            <SearchInput />
            <div className="h-72 lg:h-[320px] overflow-y-auto space-y-1">
              {orders.map((order, index) => (
                <OrderItem
                  key={index}
                  orderId={order.orderId}
                  phoneNumber={order.phoneNumber}
                  productCount={order.productCount}
                  status={order.status}
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-2/4 p-4 bg-white rounded-md border border-gray-200 overflow-hidden">
            <p className="text-md font-medium mb-2">Захиалгын төлбөрүүд</p>
            <SearchInput />
            <div className="h-72 lg:h-[320px] overflow-y-auto space-y-1">
              {paymentItems.map((item, index) => (
                <OrderPayItem
                  key={index}
                  orderId={item.orderId}
                  phoneNumber={item.phoneNumber}
                  productCount={item.productCount}
                  isPayed={item.isPayed}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 h-full overflow-hidden ml-auto space-y-4">
        <div className="p-4 bg-white rounded-md border border-gray-200">
          <div className="flex justify-between mb-2">
            <p className="text-md">Хамгийн их захиалагдсан</p>
            <div className="text-white bg-yellow-400 p-2 rounded-md">
              <FiSmile size={20} />
            </div>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {orderFoods.map((order, index) => (
              <OrderFoodItem
                key={index}
                orderNumber={index + 1}
                productImage={order.productImage}
                productName={order.productName}
                orderCount={order.orderCount}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
