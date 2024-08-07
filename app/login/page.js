"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.196.238:2000/api/users/login",
        {
          username,
          password,
        }
      );

      // Assuming successful login, redirect to home page
      router.push("/home");
      localStorage.setItem("token", response.data.token);
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
          Sign In
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-6">
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
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="steve_curry"
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
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
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
          Sign In
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
