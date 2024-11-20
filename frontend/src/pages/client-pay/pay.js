import React from "react";
import { useNavigate } from "react-router-dom";
import { MdClear, MdRefresh } from "react-icons/md";
import bankcardimg from "./../../components/assets/bankcard.png";
import couponimg from "./../../components/assets/coupon.png";
import qpayimg from "./../../components/assets/qpay.jpg";
import socialpayimg from "./../../components/assets/socialpay.png";
import { useLocation } from "react-router-dom";
import FormatTotal from "../../components/formatter/format-total.tsx";

export default function PayPage() {
  const location = useLocation();
  const { total, items } = location.state || {};

  const navItems = [
    { label: "QPay", img: qpayimg },
    { label: "Social Pay", img: socialpayimg },
    { label: "Банкны карт", img: bankcardimg },
    { label: "Бэлгийн карт", img: couponimg },
  ];

  const handlePayment = () => {
    console.log(location.state)
    console.log('payment received')
  }

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu', { state: { total: total, items: items } }); 
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      <nav className="w-full h-14 flex justify-between items-center p-4">
        <MdClear size={25} onClick={handleGoBack}/>
        <div className="text-lg font-light">#150594</div>
        <MdRefresh size={25} />
      </nav>
      <div className="w-full bg-[#1E1E1E] text-white flex-grow p-5 flex flex-col items-center">
        <p className="text-center mb-4 font-light">Төлбөрийн хэрэгсэл сонгоно уу.</p>
        <div className="grid grid-cols-3 gap-6 font-light">
          {navItems.map((item) => (
            <button className="flex flex-col justify-center items-center bg-white w-[90px] h-[90px] rounded-md" onClick={handlePayment}>
              <img src={item.img} alt={item.label} className="w-11" />
              <p className="text-xs mt-1 text-gray-700">{item.label}</p>
            </button>
          ))}
        </div>
        <div className="w-full h-auto p-2 mt-4">
          <div className="bg-white h-full rounded-md text-gray-700 text-sm font-light">
            <div className="flex justify-between items-center px-5 py-4">
              <p>Захиалгын нийт дүн</p>
              <p className="font-medium"><FormatTotal value={total}/></p>
            </div>
            <hr className="mx-5"/>
            <div className="flex justify-between items-center px-5 py-4">
              <p>Хямдрал</p>
              <p className="font-medium">0%</p>
            </div>
            <hr className="mx-5"/>
            {/* <div className="flex justify-between items-center px-5 py-4">
              <p>Нийт дүн</p>
              <p className="font-medium">46,800mnt</p>
            </div> */}
            <hr className="mx-5"/>
            <div className="flex justify-between items-center px-5 py-4">
              <p>Төлсөн дүн</p>
              <p className="font-medium"><FormatTotal value={0}/></p>
            </div>
            <hr className="mx-5"/>
            <div className="flex justify-between items-center px-5 py-4">
              <p>Төлөх дүн</p>
              <p className="font-medium"><FormatTotal value={total}/></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
