import React, { useState } from "react";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";

const BottomNav = () => {
  const [selectedOption, setSelectedOption] = useState("home");

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="fixed bottom-0 w-full bg-[#212121]   p-4  rounded-tr-[20px] rounded-tl-[20px] ">
      <div className="flex justify-between gap-3">
        <div className="cursor-pointer" onClick={() => handleSelection("home")}>
          <OutdoorGrillIcon
            style={{
              fontSize: 25,
              color: selectedOption === "home" ? "#2e8172" : "#f5f5f5",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleSelection("videos")}>
          <VideoLibraryIcon
            style={{
              fontSize: 25,
              color: selectedOption === "videos" ? "#2e8172" : "#f5f5f5",
              fontWeight: "bold",
            }}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleSelection("questions")}>
          <QuestionAnswerIcon
            style={{
              fontSize: 25,

              color: selectedOption === "questions" ? "#2e8172" : "#f5f5f5",
              fontWeight: "bold",
              backgroundColor:
                selectedOption === "questions" ? "#212121" : "#212121",
            }}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleSelection("ManageAccounts")}>
          <ManageAccountsIcon
            style={{
              fontSize: 25,
              color:
                selectedOption === "ManageAccounts" ? "#2e8172" : "#f5f5f5",
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
