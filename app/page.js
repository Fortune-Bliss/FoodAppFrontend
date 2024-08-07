"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="bg-[#fafafa] h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center ">
        <Image
          src="/welcome/food2.png"
          alt="Welcome illustration showing food"
          width={400}
          height={250}
          className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
        />
      </div>
      <h1 className="text-2xl font-bold mt-2 text-gray-900 ">
        Savor Every Bite
      </h1>
      <p className="text-sm text-center text-gray-600 mb-4 ">
        Discover delicious recipes and culinary tips tailored just for you.
      </p>
      <div className="space-y-4  mt-7  ">
        <button
          onClick={handleSignUp}
          className="w-[280px] p-3 rounded-lg justify-center flex bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg shadow-lg hover:opacity-90 transition duration-300 ease-in-out">
          Get Started
        </button>
        <button
          onClick={handleLogin}
          className="w-[280px] p-3 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold text-lg shadow-md hover:bg-gray-100 transition duration-300 ease-in-out">
          Sign In
        </button>
        <div className="mt-5" />
      </div>
    </div>
  );
};

export default Home;
