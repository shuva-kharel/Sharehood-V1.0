import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut, Settings, User, Plus, Package } from "lucide-react";
import { ChevronDownIcon, AddIcon, ViewIcon, StarIcon } from "@chakra-ui/icons"; // Chakra UI icons
import { THEMES } from "../constants";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [requestDropdownOpen, setRequestDropdownOpen] = useState(false); // State for product request dropdown
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const requestDropdownRef = useRef(null); // Ref for the Product Request dropdown
  const requestButtonRef = useRef(null); // Ref for the Product Request button

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleRequestDropdown = () => {
    setRequestDropdownOpen(!requestDropdownOpen); // Toggle the state for product request dropdown
  };

  // Click outside handler for profile dropdown
  useEffect(() => {
    const handleClickOutsideProfile = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close Profile dropdown
      }
    };

    document.addEventListener("click", handleClickOutsideProfile);

    return () => {
      document.removeEventListener("click", handleClickOutsideProfile);
    };
  }, []);

  // Click outside handler for product request dropdown
  useEffect(() => {
    const handleClickOutsideRequest = (event) => {
      if (
        requestDropdownRef.current &&
        !requestDropdownRef.current.contains(event.target) &&
        !requestButtonRef.current.contains(event.target)
      ) {
        setRequestDropdownOpen(false); // Close Product Request dropdown
      }
    };

    document.addEventListener("click", handleClickOutsideRequest);

    return () => {
      document.removeEventListener("click", handleClickOutsideRequest);
    };
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <header className={`bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ${theme}`}>
      <div className="container mx-auto px-2 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Title section */}
          <div className="flex items-center gap-4 flex-grow">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className={`text-xl font-bold bg-clip-text text-transparent ${theme === 'dark' ? 'from-green-500 to-lime-400' : 'from-green-400 to-lime-500'} bg-gradient-to-r`}>
                Sharehood
              </h1>
            </Link>
          </div>


          {/* Right-aligned buttons */}
          <div className="flex items-center gap-2">
            <Link to="/create" className="btn btn-sm gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
            </Link>

            {/* Product Request Dropdown */}
            <div className="relative" ref={requestButtonRef}>
              <button
                className="btn btn-sm flex gap-2 items-center"
                onClick={toggleRequestDropdown}
              >
                <ViewIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Product Requests</span>
                <ChevronDownIcon className="w-4 h-4" />
              </button>
              {requestDropdownOpen && (
                <div
                  ref={requestDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-all"
                >
                  <Link to="/my-product-request" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <StarIcon className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">My Requests</span>
                  </Link>
                  <Link to="/create-product-request" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <AddIcon className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">Create Request</span>
                  </Link>
                  <Link to="/product-request" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <ViewIcon className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">All Requests</span>
                  </Link>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            {authUser ? (
              <div className="relative" ref={buttonRef}>
                <button
                  className="btn btn-sm flex gap-2 items-center"
                  onClick={toggleDropdown}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">{authUser?.fullName}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-all"
                  >
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="size-5 mr-2" />
                      <span className="hidden sm:inline">My Profile</span>
                    </Link>
                    <Link to="/my-products" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Package className="size-5 mr-2" />
                      <span className="hidden sm:inline">My Products</span>
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="size-5 mr-2" />
                      <span className="hidden sm:inline">Settings</span>
                    </Link>
                    <button
                      className="w-full flex items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logout}
                    >
                      <LogOut className="size-5 mr-2" />
                      <span className="hidden sm:inline">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-sm gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
