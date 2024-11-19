import { useState, useEffect } from "react";
import axios from "axios";

const FetchCuisines = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/menuitem/menu");
        const menuItemData = response.data.data.map((cuisine) => ({
          background: "home-background.png",
          value: cuisine.price,
          description: cuisine.cuisineName,
          label: cuisine.cuisineName,
        }));
        setMenuItems(menuItemData);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      }
    };

    fetchCuisines();
  }, []);

  return menuItems;
};

export default FetchCuisines;
