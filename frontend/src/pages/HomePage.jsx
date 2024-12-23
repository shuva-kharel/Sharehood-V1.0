import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/HomeProductCard";
import useProductStore from '../store/useProductStore'; // Import the store

const HomePage = () => {
  const { fetchProducts, filteredProducts, products } = useProductStore(); // Destructure filteredProducts from the store

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchTerm, setSearchTerm] = useState(""); // Search term for location
  const [productSearchTerm, setProductSearchTerm] = useState(""); // Search term for products

  const locations = ["Kathmandu", "Patan", "Maitidevi", "Bhaktapur", "Lalitpur"];

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null); // Ref for the location search input field
  const productInputRef = useRef(null); // Ref for the product search input field

  useEffect(() => {
    fetchProducts(); // Fetch all products when the page loads
  }, [fetchProducts]);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to filter products by location
  const filterLocation = (location) => {
    setSelectedLocation(location);

    // If "All Locations" is selected, show all products
    if (location === "All Locations") {
      fetchProducts(); // Fetch all products again
    } else {
      fetchProducts(location); // Filter products by the selected location
    }
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Filter locations based on search term
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit to two locations to show
  const limitedLocations = filteredLocations.slice(0, 2);

  // Filter products based on product search term
  const filteredProductsByName = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target) &&
      !inputRef.current.contains(event.target) // Add condition to close dropdown if input is clicked outside
    ) {
      setDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  // Attach and clean up the click event listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen bg-base-200 overflow-y-auto">
      <div className="pt-20">
        <div className="mb-2 relative flex justify-center items-center w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search products by name..."
            className="p-2 border rounded-md w-full mb-2"
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)} // Update productSearchTerm state
          />
        </div>
      </div>
      <div className="flex items-center justify-center pt-2 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl">
          <div className="flex flex-col h-full rounded-lg overflow-hidden p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text text-center mb-8">
              Items for Rent
            </h1>

            {/* Location Dropdown */}
            <div className="relative mb-6 z-20">
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
                  className="absolute left-0 top-full mt-2 bg-white border rounded-lg shadow-lg w-48 p-2 z-30"
                >
                  {/* Location Search input */}
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search location..."
                    className="p-2 border rounded-md w-full mb-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
                  />

                  {/* "All Locations" option */}
                  <a
                    href="#"
                    onClick={() => filterLocation("All Locations")}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Locations
                  </a>

                  {/* Display limited locations */}
                  {limitedLocations.length > 0 ? (
                    limitedLocations.map((location) => (
                      <a
                        href="#"
                        key={location}
                        onClick={() => filterLocation(location)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {location}
                      </a>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No locations found</p>
                  )}
                </div>
              )}
            </div>

            {/* Product Search Input */}
            {/* Display filtered products */}
            {filteredProductsByName.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProductsByName.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p className="mb-2 text-xl text-center font-semibold text-gray-500" style={{ marginBottom: "500px" }}>
                No products found{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
