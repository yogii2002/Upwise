import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Commercial & Business",
  "Technology & Engineering",
  "Arts & Humanities",
  "Geography & Earth Studies",
  "Medical & Health Sciences",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    if (result.length > 0) {
      setCourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);
    }
  };

  return (
    <div>
      {/* Explore more section */}
      <div>
        <div className="text-4xl font-semibold text-center my-10 text-base-content">
          <p className="text-center text-base-content/70 text-lg font-semibold mt-1">
            Learning knows no walls <HighlightText text={"our courses"} /> brings the world to your screen.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-base-200 text-base-content p-1 rounded-full font-medium shadow-md">
        {tabsName.map((ele, index) => {
          const isActive = currentTab === ele;
          return (
            <div
              key={index}
              onClick={() => setMyCards(ele)}
              className={`text-[16px] flex items-center gap-2 px-7 py-[7px] rounded-full cursor-pointer transition-all duration-200
                ${isActive 
                  ? "bg-primary text-primary-content font-semibold shadow-lg" 
                  : "hover:bg-base-300 hover:text-base-content/90 text-base-content/70"
                }`}
            >
              {ele}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block lg:h-[200px]" />

      {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-1/2 text-base-content lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
