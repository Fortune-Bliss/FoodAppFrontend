// Login.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/login",
        { username, password }
      );
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      setError(
        error.response?.data?.msg || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="shadow-lg bg-white p-5 rounded-sm h-[400px] w-[400px]">
          <p className="mt-5 text-center font-medium text-[23px] text-[#212121]">
            Login
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block mb-2 text-[13px] text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-300 dark:focus:border-gray-300"
                placeholder="steve_curry"
                required
              />
            </div>
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-[13px] text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <FontAwesomeIcon
                  className="mt-7"
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 cursor-pointer text-white text-sm mt-5 rounded p-3 text-center hover:bg-gray-500">
              Login
            </button>
          </form>
          <div className="mt-3 items-center justify-center flex gap-2">
            <p className="text-sm font-extralight">Don't have an account?</p>
            <a href="/signup" className="text-sm font-normal text-gray-600">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
