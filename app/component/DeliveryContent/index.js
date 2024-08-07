"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRouter } from "next/navigation";

const TopView = () => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.196.238:2000/api/burger/all"
        );
        setFoodData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching burgers:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % foodData.length);
      setRandomNumber(generateRandomNumber());
    }, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [foodData.length]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const currentItem = foodData[currentIndex];

  return (
    <div style={{ overflowX: "auto" }}>
      <div key={currentItem._id}>
        <div
          className="border-2 p-2 rounded-[14px] mt-3  text-white h-[170px]"
          style={{
            backgroundImage: `url('${currentItem.image.replace(/\\/g, "/")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <div className="bg-[#fafafa] w-[40%] p-2 rounded-md shadow  mt-[95px]">
            <p className="   text-[#212121]">{randomNumber} bonuses</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <p className=" ">Novelties of the week</p>
        <p className=" text-[#2e8172]">See all</p>
      </div>
    </div>
  );
};

const FoodArray = () => {
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomIndexes, setRandomIndexes] = useState([]); // State to store random indexes
  const router = useRouter();

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.196.238:2000/api/burger/all"
        );
        setFoodData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching burgers:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  useEffect(() => {
    // Generate random indexes for each item in foodData
    const indexes = foodData.map((_, index) => index);
    shuffleArray(indexes);
    setRandomIndexes(indexes);
  }, [foodData]);

  const handleClick = (id) => {
    localStorage.setItem("id", id);
    router.push(`/AboutFood/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className="mt-[70px]   flex flex-wrap justify-between gap-y-[70px]"
      style={{ maxWidth: "100%" }}>
      {randomIndexes.map((index) => (
        <div
          key={foodData[index]._id}
          className="bg-white hover:shadow-xl shadow-md mb-3 shadow-gray-400 p-3 justify-center items-center"
          style={{ flex: "0 0 calc(50% - 1rem)", cursor: "pointer" }}
          onClick={() => handleClick(foodData[index]._id)}>
          <img
            src={foodData[index].image.replace(/\\/g, "/")}
            alt={foodData[index].name}
            className="w-[100px] h-[100px] justify-center mx-auto object-cover rounded-full shadow-lg"
            style={{ marginTop: "-60px" }}
          />
          <div>
            <div>
              <p className="font-medium text-[#212121] line-clamp-1 mt-9">
                {foodData[index].name}
              </p>
              <p className="font-light text-[#212121] line-clamp-1">
                Available
              </p>
            </div>
            <div className="flex justify-between">
              <p className="mb-3 font-medium text-[#212121] line-clamp-1 mt-11">
                ${foodData[index].price}.00
              </p>
              <AddCircleIcon
                style={{ fontSize: 40 }}
                className="font-medium text-[#2e8172] mt-9"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const DeliveryContent = () => {
  return (
    <div className="mt-1 ">
      <TopView />
      <FoodArray />
      <div className="mt-[51px]" />
    </div>
  );
};

export default DeliveryContent;
