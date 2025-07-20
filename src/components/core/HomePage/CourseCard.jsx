import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[360px] lg:w-1/3 cursor-pointer box-border h-[300px] rounded-md
        ${isActive ? "bg-base-100 shadow-lg " : "bg-base-200"}
        text-base-content
      `}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-2 border-dashed border-base-content/40 h-[80%] p-6 flex flex-col gap-3">
        <div className={`font-semibold text-lg ${isActive ? "text-base-content" : "text-base-content"}`}>
          {cardData?.heading}
        </div>

        <div className="text-base-content/70">
          {cardData?.description}
        </div>
      </div>

      <div
        className={`flex justify-between px-6 py-3 font-medium
          ${isActive ? "text-primary" : "text-base-content/70"}
        `}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{cardData?.lessionNumber} Lesson{cardData?.lessionNumber > 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
