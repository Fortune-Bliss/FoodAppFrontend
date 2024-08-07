"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); // State for address
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null); // State for image file
  const router = useRouter();
  const fileInputRef = useRef(null); // Ref for file input

  // Retrieve saved username from local storage
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set file object directly
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("address", address); // Append the address
    if (image) {
      formData.append("image", image); // Append the image file directly
    }

    try {
      const response = await axios.post(
        "http://192.168.196.238:2000/api/users/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username); // Save username to local storage
      router.push("/home");
      console.log("Response:", response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#f9fafb] min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Your Account
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex flex-col items-center mb-6">
          <div
            onClick={handleImageClick}
            className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden cursor-pointer mb-4">
            {image ? (
              <img
                src={URL.createObjectURL(image)} // Create object URL for preview
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-500 text-center">Upload Image</p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="steve_curry"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1234 Main St, Apt 101"
            required
          />
        </div>
        <div className="relative mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}>
            <FontAwesomeIcon
              className="mt-6"
              icon={showPassword ? faEyeSlash : faEye}
            />
          </button>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200">
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
