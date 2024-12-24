import { useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";
import useProductRequestStore from "../store/useProductRequestStore";
import { useAuthStore } from "../store/useAuthStore";

const MyProductRequestPage = () => {
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const { fetchMyProductRequests, myProductRequests, isLoading, error, updateProductRequest, deleteProductRequest } = useProductRequestStore();

  const [editRequest, setEditRequest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // To show success or error messages
  const [popupType, setPopupType] = useState(""); // 'success' or 'error'

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchMyProductRequests(userId);
    } else {
      console.log("User not logged in.");
    }
  }, [fetchMyProductRequests, userId]);

  const handleUpdateRequest = async (e) => {
    e.preventDefault();

    const updatedRequest = {
      productName: newProductName,
      message: newMessage,
      description: newDescription,
      status: "fulfilled",
    };

    const response = await updateProductRequest(editRequest._id, updatedRequest);
    if (response.success) {
      setPopupMessage("Request updated successfully!");
      setPopupType("success");
      setIsEditing(false);
      fetchMyProductRequests(userId);
    } else {
      setPopupMessage(response.message);
      setPopupType("error");
    }
  };

  const handleEdit = (request) => {
    setEditRequest(request);
    setNewProductName(request.productName);
    setNewMessage(request.message);
    setNewDescription(request.description);
    setIsEditing(true);
  };

  const handleDelete = async (requestId) => {
    const response = await deleteProductRequest(requestId);
    if (response.success) {
      setPopupMessage("Request deleted successfully!");
      setPopupType("success");
      fetchMyProductRequests(userId);
    } else {
      setPopupMessage(response.message);
      setPopupType("error");
    }
  };

  return (
    <div className={`h-screen overflow-y-auto ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="pt-20">
        <h1
          className={`text-3xl font-bold bg-gradient-to-r ${theme === "dark" ? "from-blue-500 to-cyan-400" : "from-cyan-400 to-blue-500"} text-transparent bg-clip-text text-center mb-8`}
        >
          My Product Requests
        </h1>

        <div className="flex flex-wrap justify-center gap-8 px-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : myProductRequests.length === 0 ? (
            <p>No product requests available.</p>
          ) : (
            myProductRequests.map((request) => (
              <div
                key={request._id}
                className={`bg-gradient-to-r ${theme === "dark" ? "from-gray-700 to-gray-800" : "from-white to-gray-100"} p-6 rounded-xl shadow-xl w-80`}
              >
                <div className="flex flex-col space-y-4">
                  <o className="font-bold text-xl">{request.productName}</o>
                  <p className="text-l">{request.message}</p>
                  {request.description && <p className="text-gray-500">{request.description}</p>}
                  <p className="text-sm text-gray-600">Posted by {authUser?.fullName}</p>

                  <div className="flex space-x-4 mt-4">
                    <button
                      className={`btn ${theme === "dark" ? "bg-blue-500 text-white" : "bg-blue-200 text-black"} rounded-full px-4 py-2`}
                      onClick={() => handleEdit(request)}
                    >
                      Edit
                    </button>
                    <button
                      className={`btn ${theme === "dark" ? "bg-red-500 text-white" : "bg-red-200 text-black"} rounded-full px-4 py-2`}
                      onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editing Form */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Edit Product Request</h2>
            <form onSubmit={handleUpdateRequest}>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-lg font-medium mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="productName"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="p-3 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="p-3 border rounded-md w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-lg font-medium mb-2">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="p-3 border rounded-md w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-500 hover:to-blue-600"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setIsEditing(false)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Popup Messages */}
      {popupMessage && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-72 p-4 rounded-lg text-white shadow-lg ${
            popupType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MyProductRequestPage;
