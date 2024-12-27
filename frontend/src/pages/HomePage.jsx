import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/HomeProductCard";
import useProductStore from '../store/useProductStore';
import { useThemeStore } from "../store/useThemeStore";
import { themeMapping } from "../constants/themeMapping";
import {  } from "@chakra-ui/icons";

const HomePage = () => {
  const { fetchProducts, filteredProducts, products } = useProductStore();
  const { theme } = useThemeStore();
  const currentTheme = themeMapping[theme] || themeMapping['light'];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchTerm, setSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");

  const locations = ["Kathmandu", "Patan", "Maitidevi", "Bhaktapur", "Lalitpur"];

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const productInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const filterLocation = (location) => {
    setSelectedLocation(location);

    if (location === "All Locations") {
      fetchProducts();
    } else {
      fetchProducts(location);
    }
    setDropdownOpen(false);
  };

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedLocations = filteredLocations.slice(0, 4);

  const filteredProductsByName = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) &&
      !inputRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`h-screen overflow-y-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : theme === 'light' ? 'bg-white text-black' : ''}`}>
      <div className={`pt-20`}>
        <div className={`mb-2 relative flex justify-center items-center w-full max-w-md mx-auto`}>
          <input
            type="text"
            placeholder="Search products by name..."
            className={`p-2 border rounded-md w-full mb-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-200 text-black'}`}
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
          /> 
        </div>
      </div>
      <div className="flex items-center justify-center pt-2 px-4">
        <div className={`bg-base-100 rounded-lg shadow-cl w-full max-w-6xl ${theme === 'dark' ? 'from-green-500 to-lime-400' : 'from-green-400 to-lime-500'}`}>
          <div className="flex flex-col h-full rounded-lg overflow-hidden p-6" >
            <h1 className={`text-3xl font-bold bg-gradient-to-r  text-transparent bg-clip-text text-center mb-8`}>
              Items for Rent
            </h1>

            <div className="relative mb-6 z-20">
              <button
                ref={buttonRef}
                className={`btn btn-sm transition duration-200 ease-in-out transform ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-base-100 text-black hover:bg-gray-200'}`}
                onClick={toggleDropdown}
              >
                Location: {selectedLocation}
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute left-0 top-full mt-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300 rounded-lg shadow-lg w-48 p-2 z-30`}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search location..."
                    className={`p-2 border border-gray-300 rounded-md w-full mb-2 ${theme === 'dark' ? 'bg-gray-700 text-white focus:bg-gray-600' : 'bg-base-200 text-black focus:bg-white'} focus:outline-none`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
            
                  <a
                    href="#"
                    onClick={() => filterLocation("All Locations")}
                    className={`block px-4 py-2 rounded-md transition duration-200 ease-in-out ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    All Locations
                  </a>
              
                  {limitedLocations.length > 0 ? (
                    limitedLocations.map((location) => (
                      <a
                        href="#"
                        key={location}
                        onClick={() => filterLocation(location)}
                        className={`block px-4 py-2 rounded-md transition duration-200 ease-in-out ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        {location}
                      </a>
                    ))
                  ) : (
                    <p className="text-gray-500">No locations found</p>
                  )}
                </div>
              )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProductsByName.length === 0 ? (
                <p className="col-span-full text-center">No products found</p>
              ) : (
                filteredProductsByName.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
