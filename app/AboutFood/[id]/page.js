"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

const AboutFoodPage = () => {
  const router = useRouter();
  const id = localStorage.getItem("id");
  const [foodItem, setFoodItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(
          `http://192.168.196.238:2000/api/burger/${id}`
        );
        setFoodItem(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching food item:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchFoodItem();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="bg-[#212121] text-white h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fafafa] text-black p-4">Error: {error.message}</div>
    );
  }

  if (!foodItem) {
    return (
      <div className="bg-[#fafafa] text-black p-4">Food item not found!</div>
    );
  }

  const TopIcon = () => {
    const handleBack = () => {
      router.back();
    };

    return (
      <div
        className="bg-white text-black h-[300px] relative"
        style={{
          backgroundImage: `url('${foodItem.image.replace(/\\/g, "/")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute top-3 left-3 flex items-center justify-between w-full px-3">
          <div
            className="bg-[#fafafa] w-[40px] h-[40px] flex items-center justify-center cursor-pointer hover:opacity-80 rounded-full"
            onClick={handleBack}>
            <ArrowBackIosNewIcon style={{ fontSize: 18 }} />
          </div>
          <p className="text-[#212121] font-bold bg-[#fafafa] rounded px-4 py-1 text-lg absolute left-1/2 transform -translate-x-1/2">
            Details
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 ">
          <h1 className="text-white text-3xl font-bold">{foodItem.name}</h1>
          <p className="text-white text-lg">${foodItem.price}.00</p>
        </div>
      </div>
    );
  };

  const DemoMedia = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
      const container = document.getElementById("demoMediaContainer");
      if (container) {
        const scrollAmount = 200;
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
        setScrollPosition(container.scrollLeft - scrollAmount);
      }
    };

    const scrollRight = () => {
      const container = document.getElementById("demoMediaContainer");
      if (container) {
        const scrollAmount = 200;
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
        setScrollPosition(container.scrollLeft + scrollAmount);
      }
    };

    return (
      <div className="text-black p-3">
        <p className="font-medium">Similar dishes</p>
        <div className="relative overflow-hidden">
          <div
            id="demoMediaContainer"
            className="flex gap-3 overflow-x-auto p-3">
            {foodItem.demoMedia.map((media) => (
              <img
                key={media._id}
                src={media.url.replace(/\\/g, "/")}
                alt="Demo Image"
                className="rounded-lg w-[120px] h-[120px] object-cover"
              />
            ))}
          </div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer md:hidden"
            onClick={scrollLeft}>
            <ArrowBackIcon />
          </div>
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer md:hidden"
            onClick={scrollRight}>
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    );
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const Description = () => {
    const truncatedText = foodItem.description.slice(0, 200); // Truncate to 200 characters

    return (
      <div className="p-3">
        <div>
          <p className="font-bold">Description</p>
          <p
            className={`font-medium ${
              showFullDescription ? "line-clamp-none" : "line-clamp-6"
            }`}>
            {showFullDescription ? foodItem.description : truncatedText}
            {!showFullDescription && (
              <span
                className="text-red-500 cursor-pointer"
                onClick={toggleDescription}>
                ...Read more
              </span>
            )}
          </p>
        </div>
      </div>
    );
  };

  const BottomNav = () => {
    return (
      <div className="w-full p-3 mt-3 flex justify-center">
        <div className="flex space-x-2 w-full max-w-[600px]">
          <button className="bg-red-500 flex-1 p-4 text-[#fafafa] font-medium rounded-lg">
            Read preparations
          </button>
          <button className="bg-red-500 flex-1 p-4 text-[#fafafa] font-medium rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#fafafa] overflow-x-hidden text-black">
      <TopIcon />
      <DemoMedia />
      <Description />
      <BottomNav />
    </div>
  );
};

export default AboutFoodPage;
