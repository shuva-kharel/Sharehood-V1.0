import { useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import useProductRequestStore from "../store/useProductRequestStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom"; // For redirection to /chat and /create

const ProductRequestPage = () => {
  const { theme } = useThemeStore();
  const { authUser } = useAuthStore();
  const { fetchProductRequests, productRequests, isLoading, error } = useProductRequestStore();
  const navigate = useNavigate(); // To handle navigation

  useEffect(() => {
    const token = localStorage.getItem("token"); // Fetch the token from localStorage
    if (token) {
      fetchProductRequests(token); // Pass token to fetchProductRequests if it's available
    } else {
      console.log("No token found");
    }
  }, [fetchProductRequests]);

  const handleChatRedirect = () => {
    navigate("/chat"); // Redirects to /chat
  };

  const handleAddProductRedirect = () => {
    navigate("/create"); // Redirects to /create for adding a product
  };

  return (
    <div className={`h-screen overflow-y-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="pt-20">
        <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-500 to-cyan-400' : 'from-cyan-400 to-blue-500'} text-transparent bg-clip-text text-center mb-8`}>
          Product Requests from All Users
        </h1>
        
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : productRequests.length === 0 ? (
            <p>No product requests available.</p>
          ) : (
            productRequests.map((request) => (
              <div key={request._id} className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-700 to-gray-800' : 'from-white to-gray-100'} p-6 rounded-xl shadow-xl w-80`}>
                <div className="flex flex-col space-y-4">
                  <h3 className="font-bold text-xl">{request.productName}</h3>
                  <p className="text-lg">{request.message}</p>
                  {request.description && <p className="text-gray-500">{request.description}</p>}
                  <p className="text-sm text-gray-600">Posted by {authUser?.fullName}</p>

                  {/* Buttons for Chat and Add Product */}
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={handleChatRedirect}
                      className={`py-2 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-full hover:from-cyan-500 hover:to-blue-600 transition-all duration-300`}
                    >
                      Chat
                    </button>
                    <button
                      onClick={handleAddProductRedirect}
                      className={`py-2 px-6 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-full hover:from-green-500 hover:to-teal-600 transition-all duration-300`}
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRequestPage;
