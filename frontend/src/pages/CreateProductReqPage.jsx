import React, { useState } from "react";
import { useProductRequestStore } from "../store/useProductRequestStore"; // Adjust the path to the store
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

const CreateProductRequest = () => {
  const { createProductRequest } = useProductRequestStore((state) => state); // Import the createProductRequest action
  const [newRequest, setNewRequest] = useState({
    productName: "",
    message: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // State for showing the success message

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      setError("You must be logged in to create a product request.");
      return;
    }

    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    // Attach userId to the newRequest object
    const requestWithUserId = { ...newRequest, userId };

    // Call the createProductRequest function from the store
    const response = await createProductRequest(requestWithUserId, token);

    if (response.success) {
      setSuccess(response.message);
      setShowSuccess(true); // Show success message
      setNewRequest({ productName: "", message: "", description: "" }); // Clear the form after submission

      // Hide success message and redirect after 2 seconds
      setTimeout(() => {
        setShowSuccess(false); // Hide success message
        navigate("/"); // Redirect to home page
      }, 2000);
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-white text-black">
      <div className="pt-20 flex justify-center items-center">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-md p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Create Product Request
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium mb-2">Product Name:</label>
              <input
                type="text"
                value={newRequest.productName}
                onChange={(e) => setNewRequest({ ...newRequest, productName: e.target.value })}
                className="p-3 border rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Message:</label>
              <textarea
                value={newRequest.message}
                onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
                className="p-3 border rounded-md w-full"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Description:</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                className="p-3 border rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-md hover:from-cyan-500 hover:to-blue-600"
            >
              Submit Request
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>

      {/* Success message at the bottom */}
      {showSuccess && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white py-2 text-center">
          <p>Success! Your request has been submitted.</p>
        </div>
      )}
    </div>
  );
};

export default CreateProductRequest;
