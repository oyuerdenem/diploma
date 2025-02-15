import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClear, MdRefresh } from "react-icons/md";
import bankcardimg from "./../../components/assets/bankcard.png";
import couponimg from "./../../components/assets/coupon.png";
import qpayimg from "./../../components/assets/qpay.jpg";
import socialpayimg from "./../../components/assets/socialpay.png";
import FormatTotal from "../../components/formatter/format-total";
import { LuCheckCircle } from "react-icons/lu";
import axios from "axios";

interface LocationState {
  total: number;
  items: any[];
}

export default function PayPage() {
  const location = useLocation();

  const qrId = "673f2f493e825cdba8633394";
  const branchId = "673b6eba4db9237d17ac9aec";
  const totalAmount = location.state.total;
  const option = window.localStorage.getItem("option");
  const [orderId, setOrderId] = useState("");
  let mainOrderId;

  const { total = 0, items = [] } = (location.state || {}) as LocationState;
  const [paid, setPaid] = useState(false);

  const navItems = [
    { label: "QPay", img: qpayimg },
    { label: "Social Pay", img: socialpayimg },
    { label: "Банкны карт", img: bankcardimg },
    { label: "Бэлгийн карт", img: couponimg },
  ];

  const handlePayment = () => {
    fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/orders`, {
        branchId: branchId,
        qrId: qrId,
        option: option,
        totalAmount: totalAmount,
      });
      const id = response.data.data._id;
      mainOrderId = id;
      setOrderId(id);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (orderId && items.length > 0) {
        try {
          const responses = await Promise.all(
            items.map(async (item) => {
              const response = await axios.post(
                `http://localhost:8000/api/orderitems`,
                {
                  orderId: orderId,
                  cuisineId: item.id,
                  quantity: item.count,
                  itemPrice: item.value,
                }
              );
              return response;
            })
          );
          console.log("All responses:", responses);
          setPaid(true);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      } else {
        console.log("No items to process or orderId is missing.");
      }
    };

    fetchData();
  }, [orderId, items]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home", { state: { total, items } });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <nav className="w-full h-14 flex justify-between items-center p-4">
        <MdClear size={25} onClick={handleGoBack} aria-label="Go back" />
        {paid ? (
          <div className="text-lg font-light">#{mainOrderId}</div>
        ) : (
          <div className="text-lg font-light">Төлбөр төлөх</div>
        )}
        <MdRefresh size={25} aria-label="Refresh" onClick={handleRefresh} />
      </nav>
      <div className="w-full bg-[#1E1E1E] text-white flex-grow p-5 flex flex-col items-center">
        {paid ? (
          <p className="text-center text-xl my-4 w-2/3 font-light uppercase">
            Төлбөр амжилттай төлөгдлөө.
          </p>
        ) : (
          <p className="text-center mb-4 font-light">
            Төлбөрийн хэрэгсэл сонгоно уу.
          </p>
        )}

        {paid ? (
          <LuCheckCircle size={80} strokeWidth={0.5} className="m-5" />
        ) : (
          <div className="grid grid-cols-3 gap-6 font-light">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="flex flex-col justify-center items-center bg-white w-[90px] h-[90px] rounded-md"
                onClick={handlePayment}
                aria-label={`Select ${item.label}`}
              >
                <img src={item.img} alt={item.label} className="w-11" />
                <p className="text-xs mt-1 text-gray-700">{item.label}</p>
              </button>
            ))}
          </div>
        )}

        <div className="w-full h-auto p-2 mt-4">
          <div className="bg-white h-full rounded-md text-gray-700 text-sm font-light">
            <div className="flex justify-between items-center px-5 py-4">
              <p>Захиалгын нийт дүн</p>
              <p className="font-medium">
                <FormatTotal value={total} />
              </p>
            </div>
            <hr className="mx-5" />
            <div className="flex justify-between items-center px-5 py-4">
              <p>Хямдрал</p>
              <p className="font-medium">0%</p>
            </div>
            <hr className="mx-5" />
            <div className="flex justify-between items-center px-5 py-4">
              <p>Төлсөн дүн</p>
              <p className="font-medium">
                <FormatTotal value={paid ? total : 0} />
              </p>
            </div>
            <hr className="mx-5" />
            <div className="flex justify-between items-center px-5 py-4">
              <p>Төлөх дүн</p>
              <p className="font-medium">
                <FormatTotal value={paid ? 0 : total} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
