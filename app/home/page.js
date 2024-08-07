"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeliveryContent } from "../component/DeliveryContent";
import SearchArea from "../component/SearchArea";

import BottomNav from "../component/BottomNav";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const LoadingAnimation = () => {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fafafa]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-950"></div>
      </div>
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://192.168.196.238:2000/api/users/current",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg || "An error occurred. Please try again.";
        setError(errorMessage);
        console.error("Error details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const TopView = () => {
    return (
      <div className="flex justify-between ">
        <div>
          <p className="text-[23px] capitalize  line-clamp-1 ">
            {" "}
            Hello, {user?.username}
          </p>
          <p className="text-sm  "> What you want to eat today ?</p>
        </div>
        <div>
          <div className=" border-2 border-[#00695c]  rounded-full p-1">
            <img
              src={user?.image}
              alt="Profile"
              className="w-[45px] h-[45px]  rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <LoadingAnimation />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="h-screen w-full overflow-y-auto bg-[#fafafa] text-black ">
      <div className="p-3">
        <TopView />
        <SearchArea />
        <DeliveryContent />
      </div>{" "}
      <BottomNav />
    </div>
  );
};

export default UserProfile;
