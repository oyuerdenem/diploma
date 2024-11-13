import { FiSearch } from "react-icons/fi";

const SearchInput = () => (
  <div className="my-4 relative">
    <input
      type="text"
      placeholder="Хайх"
      className="w-full px-4 py-2 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#086A69] text-xs"
    />
    <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600" size={18} />
  </div>
);

export default SearchInput;
