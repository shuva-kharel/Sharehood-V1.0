import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/HomeProductCard";
import useProductStore from '../store/useProductStore';
import { useThemeStore } from "../store/useThemeStore";

const HomePage = () => {
  const { fetchProducts, filteredProducts, products } = useProductStore();
  const { theme, setTheme } = useThemeStore();

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

  const limitedLocations = filteredLocations.slice(0, 2);

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
      <div className="pt-20">
        <div className="mb-2 relative flex justify-center items-center w-full max-w-md mx-auto">
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
        <div className={`bg-base-100 rounded-lg shadow-cl w-full max-w-6xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col h-full rounded-lg overflow-hidden p-6">
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-500 to-cyan-400' : 'from-cyan-400 to-blue-500'} text-transparent bg-clip-text text-center mb-8`}>
              Items for Rent
            </h1>

            <div className="relative mb-6 z-20">
              <button
                ref={buttonRef}
                className={`btn btn-sm ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-base-200 text-black'}`}
                onClick={toggleDropdown}
              >
                Location: {selectedLocation}
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`absolute left-0 top-full mt-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} border rounded-lg shadow-lg w-48 p-2 z-30`}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search location..."
                    className={`p-2 border rounded-md w-full mb-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-base-200 text-black'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <a
                    href="#"
                    onClick={() => filterLocation("All Locations")}
                    className={`block px-4 py-2 hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
                  >
                    All Locations
                  </a>

                  {limitedLocations.length > 0 ? (
                    limitedLocations.map((location) => (
                      <a
                        href="#"
                        key={location}
                        onClick={() => filterLocation(location)}
                        className={`block px-4 py-2 hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
                      >
                        {location}
                      </a>
                    ))
                  ) : (
                    <p>No locations found</p>
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

            <div className="fixed bottom-8 right-8 z-50">
              <Link
                to="/create"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white rounded-full p-4 shadow-lg"
              >
                +
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
