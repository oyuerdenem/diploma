import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EditCuisineModal = ({
  isModalOpen,
  editableCuisine,
  onUpdateCuisine,
  onClose,
}) => {
  const [updatedCuisine, setUpdatedCuisine] = useState([])
  
  useEffect(() => {
    setUpdatedCuisine({
      name: editableCuisine?.name || "",
      description: editableCuisine?.description || "",
      available: editableCuisine?.available || false,
      stock: editableCuisine?.stock || "",
      price: editableCuisine?.price || "",
    });
  }, [editableCuisine]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedCuisine({
      ...updatedCuisine,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateCuisine = () => {
    if (onUpdateCuisine) {
      onUpdateCuisine(updatedCuisine);
    }
  };

  return (
    isModalOpen &&
    editableCuisine && (
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
          className="bg-white p-6 rounded-lg w-96 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-5 text-gray-500 hover:text-gray-700"
          >
            <span className="text-xl">&times;</span>
          </button>

          <h2 className="mb-6">Бүтээгдэхүүний мэдээлэл засах</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-xs font-light">
                Бүтээгдэхүүний нэр
              </label>
              <input
                type="text"
                name="name"
                value={updatedCuisine.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 mt-1 text-xs font-medium rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-xs font-light">
                Тайлбар
              </label>
              <textarea
                name="description"
                value={updatedCuisine.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 mt-1 text-xs font-medium rounded"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-xs font-light">
                Үнэ (MNT)
              </label>
              <input
                type="text"
                name="price"
                value={updatedCuisine.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 mt-1 text-xs font-medium rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stock" className="block text-xs font-light">
                Стокын тоо
              </label>
              <input
                type="number"
                name="stock"
                value={updatedCuisine.stock}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (value.length <= 4 && !isNaN(value))) {
                    handleInputChange(e, value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") {
                    e.preventDefault();
                  }
                }}
                className="w-full p-2 border border-gray-300 mt-1 text-xs font-medium rounded"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="available"
                checked={updatedCuisine.available}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="available" className="text-xs font-medium">
                Зарагдах эсэх
              </label>
            </div>

            <button
              type="button"
              onClick={handleUpdateCuisine}
              className="bg-[#086A69] mt-2 text-white px-4 py-3 rounded-md text-xs font-light w-full"
            >
              Хадгалах
            </button>
          </form>
        </motion.div>
      </motion.div>
    )
  );
};

export default EditCuisineModal;
