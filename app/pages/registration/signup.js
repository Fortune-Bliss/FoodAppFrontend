"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/register",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      router.push("/");
      console.log("Response:", response.data);
      setData(response.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "An error occurred. Please try again.";
      setError(errorMessage);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg bg-white p-10 text-black rounded-sm w-">
        <p className="text-center font-medium text-2xl text-gray-800">
          Sign Up
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div className="mt-8">
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-light text-gray-800 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5"
              placeholder="steve_curry"
              required
            />
          </div>
          <div className="mt-3 relative">
            <label
              htmlFor="password"
              className="block text-sm font-light text-gray-800 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
              aria-label={showPassword ? "Hide password" : "Show password"}>
              <FontAwesomeIcon
                className="mt-7"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="w-full bg-gray-600 text-white text-sm mt-5 rounded p-3 text-center hover:bg-gray-500">
            Sign Up
          </button>
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <p className="text-sm font-light text-gray-800">
            Already have an account?
          </p>
          <a href="/login" className="text-sm font-medium text-gray-600">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
