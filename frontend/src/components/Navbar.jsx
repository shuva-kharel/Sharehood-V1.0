import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut, Settings, User, Plus, Package } from "lucide-react";
import { THEMES } from "../constants";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  return (
    <header className={`bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg ${theme}`}>
      <div className="container mx-auto px-2 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Title section, use negative margin to push it left */}
          <div className="flex items-center gap-4 flex-grow -ml-20">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">Sharehood</h1>
            </Link>
          </div>

          {/* Right-aligned buttons, adjusted with positive margin to ensure space */}
          <div className="flex items-center gap-2" style={{ marginRight: "-100px" }}>
            <Link to="/create" className="btn btn-sm gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
            </Link>

            {authUser ? (
              <div className="relative" ref={buttonRef}>
                <button
                  className="btn btn-sm flex gap-2 items-center"
                  onClick={toggleDropdown}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">{authUser?.fullName}</span>
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
