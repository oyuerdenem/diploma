import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { FiCheckCircle, FiCircle, FiEdit } from "react-icons/fi";
import { MdSort } from "react-icons/md";
import SearchInput from "../../components/reusable/search-input";

export default function Menu() {
  const [editableCuisine, setEditableCuisine] = useState(null);
  const [updatedCuisine, setUpdatedCuisine] = useState({
    name: "",
    description: "",
    available: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cuisines");
        console.log({ response });
        const cuisineData = response.data.data.map((cuisine) => ({
          id: cuisine._id,
          name: cuisine.name,
          description: cuisine.description,
          available: cuisine.status,
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
              onClick={() => {toggleAvailability(row.original.id) 
                console.log(row.original)}}
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
    setUpdatedCuisine({ ...cuisine });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableCuisine(null);
  };

  const handleUpdateCuisine = () => {
    setCuisines((prevCuisines) =>
      prevCuisines.map((cuisine) =>
        cuisine.id === editableCuisine.id
          ? { ...cuisine, ...updatedCuisine }
          : cuisine
      )
    );
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCuisine((prevState) => ({ ...prevState, [name]: value }));
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

      {isModalOpen && editableCuisine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-light text-md"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-6 rounded-lg w-96"
          >
            <h2>Бүтээгдэхүүний мэдээлэл засах</h2>
            <input
              type="text"
              name="name"
              value={updatedCuisine.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 mt-1 text-xs font-medium"
            />
            <button
              onClick={handleUpdateCuisine}
              className="bg-[#086A69] text-white px-4 py-2 rounded-md text-xs font-light"
            >
              Хадгалах
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
