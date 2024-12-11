import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCircle, FiEdit } from "react-icons/fi";
import { MdSort } from "react-icons/md";
import SearchInput from "../../components/reusable/search-input";
import EditCuisineModal from "./menu-edit/menu-edit";
import { io } from "socket.io-client";

export default function Menu() {
  const [editableCuisine, setEditableCuisine] = useState(null);
  // const [updatedCuisine, setUpdatedCuisine] = useState({
  //   name: "",
  //   description: "",
  //   available: true,
  // });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]);


  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("cuisineUpdated", (updatedCuisineData) => {
      setCuisines((prevCuisines) =>
        prevCuisines.map((cuisine) =>
          cuisine.id === updatedCuisineData.id
            ? { ...cuisine, ...updatedCuisineData }
            : cuisine
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/menuitem/menu"
        );
        // console.log({ response });
        const cuisineData = response.data.data.map((cuisine) => ({
          id: cuisine._id,
          name: cuisine.cuisineName,
          description: cuisine.cuisineDesc,
          available: cuisine.status,
          stock: cuisine.stockNumber,
          price: cuisine.price / 1000 + "к",
        }));
        setCuisines(cuisineData);
      } catch (error) {
        console.error("Error fetching cuisine data:", error);
      }
    };

    fetchCuisines();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "№",
        id: "serialNumber",
        Cell: ({ row }) => row.index + 1,
      },
      { Header: "Бүтээгдэхүүн", accessor: "name" },
      { Header: "Нэмэлт тайлбар", accessor: "description" },
      { Header: "Үнэ", accessor: "price" },
      { Header: "Нөөц", accessor: "stock" },
      {
        Header: "Нөөцтэй эсэх",
        accessor: "available",
        Cell: ({ value }) => (value ? "Available" : "Not Available"),
      },
      {
        Header: "Үйлдэл",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className={`text-white rounded-full ${
                row.original.available ? "bg-[#086A69]" : "bg-yellow-400"
              }`}
              onClick={() => {
                toggleAvailability(row.original.id);
                // console.log(row.original);
              }}
              aria-label="Toggle availability"
            >
              {row.original.available ? (
                <FiCheckCircle size={20} />
              ) : (
                <FiCircle size={20} />
              )}
            </button>
            <button
              className="text-gray-400 hover:text-gray-700"
              onClick={() => openEditModal(row.original)}
              aria-label="Edit"
            >
              <FiEdit size={14} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: cuisines,
    });

  const toggleAvailability = (id) => {
    setCuisines((prevCuisines) =>
      prevCuisines.map((cuisine) =>
        cuisine.id === id
          ? { ...cuisine, available: !cuisine.available }
          : cuisine
      )
    );
  };

  const openEditModal = (cuisine) => {
    setEditableCuisine(cuisine);
    // setUpdatedCuisine({ ...cuisine });
    setIsModalOpen(true);
  };

  const handleUpdateCuisine = (updatedCuisine) => {
    // console.log({updatedCuisine});
    // const updatedData = cuisines.map((cuisine) =>
    //   cuisine.id === updatedCuisine.id ? updatedCuisine : cuisine
    // );
    // setCuisines(updatedData);
    setIsModalOpen(false);
  };

  const handleSort = () => {
    setCuisines((prevCuisines) =>
      [...prevCuisines].sort((a, b) => a.available - b.available)
    );
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-4">
        <p className="font-light text-lg">Бүтээгдэхүүний мэдээлэл</p>
        <div className="flex justify-end">
          <SearchInput />
          <div className="flex justify-center items-center">
            <button
              className="h-6 w-6 ml-3 bg-[#086A69] rounded-full flex justify-center items-center text-white hover:bg-[#086A69]"
              onClick={handleSort}
              aria-label="Sort Products"
            >
              <MdSort size={12} />
            </button>
          </div>
        </div>
      </div>

      <table
        {...getTableProps()}
        className="min-w-full table-auto border-collapse mt-4 text-sm font-light text-gray-700 bg-white border rounded-lg"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-b px-4 py-2 text-left font-medium bg-[#086A69] text-white"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <motion.tr
                {...row.getRowProps()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="hover:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border-b px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </motion.tr>
            );
          })}
        </tbody>
      </table>

      <EditCuisineModal
        isModalOpen={isModalOpen}
        editableCuisine={editableCuisine}
        onUpdateCuisine={handleUpdateCuisine}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
