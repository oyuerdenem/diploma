import { FaHome, FaUtensils, FaBox, FaUsers, FaCog } from "react-icons/fa";
import logo from "./../assets/sidebar-logo.png";
const Sidebar = () => {
  const Menus = [
    { title: "Dashboard", icon: <FaHome /> },
    { title: "Menu", icon: <FaUtensils /> },
    { title: "Orders", icon: <FaBox /> },
    { title: "Staffs", icon: <FaUsers /> },
    { title: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className={`bg-white h-full fixed top-0 left-0 duration-300 z-10`}>
      <div className="pt-6">
        <img src={logo} alt="Sidebar Logo" className="w-16"/>
        <div className="w-full">
          {Menus.map((Menu, index) => (
            <div
              key={index}
              className={`w-16 flex items-center justify-center gap-x-4 mb-5 p-3 cursor-pointer rounded-md text-red-400`}
            >
              {Menu.icon}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
