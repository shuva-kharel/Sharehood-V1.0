import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchQuery);
    setSearchQuery("");  // Clear search field after submit
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for items..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full p-2 pr-10 border-none rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearchSubmit}
        className="absolute right-0 bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
