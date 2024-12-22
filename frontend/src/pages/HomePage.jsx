import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/HomeProductCard";
import Seachbar from "../components/SearchBar";
import productsData from "../data/products";  // Import the products data

const HomePage = () => {
  const [products, setProducts] = useState(productsData); // Initialize with imported data
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to filter products by location
  const filterLocation = (location) => {
    setSelectedLocation(location);

    // If "All Locations" is selected, show all products
    if (location === "All Locations") {
      setProducts(productsData);  // Show all products
    } else {
      // Otherwise, filter products by the selected location
      const filteredProducts = productsData.filter(
        (product) => product.address === location
      );
      setProducts(filteredProducts);
    }
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="h-screen bg-base-200 overflow-y-auto">
      <div className="pt-20">
        <Seachbar />
      </div>
      <div className="flex items-center justify-center pt-2 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl">
          <div className="flex flex-col h-full rounded-lg overflow-hidden p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-center mb-8">
              Items for Rent
            </h1>

            {/* Location Dropdown */}
            <div className="relative mb-6">
              <button
                ref={buttonRef}
                className="btn btn-sm"
                onClick={toggleDropdown}
              >
                Location: {selectedLocation}
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg w-48 p-2"
                >
                  <a
                    href="#"
                    onClick={() => filterLocation("All Locations")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Locations
                  </a>
                  <a
                    href="#"
                    onClick={() => filterLocation("Patan")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Patan
                  </a>
                  <a
                    href="#"
                    onClick={() => filterLocation("Maitidevi")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Maitidevi
                  </a>
                  <a
                    href="#"
                    onClick={() => filterLocation("Bhaktapur")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Bhaktapur
                  </a>
                  <a
                    href="#"
                    onClick={() => filterLocation("Lalitpur")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Lalitpur
                  </a>
                </div>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-xl text-center font-semibold text-gray-500">
                No products found{" "}
                <Link to="/create" className="text-blue-500 hover:underline">
                  Create a product
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
