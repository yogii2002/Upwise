import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
        {/* Left side timeline list */}
        <div className="lg:w-2/5 flex flex-col gap-14 lg:gap-3">
          {TimeLine.map((ele, i) => (
            <div className="flex flex-col lg:gap-3" key={i}>
              <div className="flex gap-6 items-center">
                <div className="w-13 h-13 bg-base-100 rounded-full flex justify-center items-center shadow-md">
                  <img src={ele.Logo} alt={`${ele.Heading} logo`} />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-base-content">{ele.Heading}</h2>
                  <p className="text-base-content text-base">{ele.Description}</p>
                </div>
              </div>
              <div
                className={`hidden ${
                  TimeLine.length - 1 === i ? "hidden" : "lg:block"
                } h-14 border-r border-dotted border-base-content/30 w-[26px]`}
              />
            </div>
          ))}
        </div>

        {/* Right side image and stats */}
        <div className="relative w-fit h-fit shadow-lg shadow-primary/50 rounded-lg overflow-hidden">
          <div className="absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 bg-primary text-primary-content flex lg:flex-row flex-col uppercase py-5 gap-4 lg:gap-0 lg:py-10 rounded-lg">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-primary-content/50 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-primary-content text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-primary-content text-sm w-[75px]">
                Types of courses
              </h1>
            </div>
          </div>
          <img
            src={TimeLineImage}
            alt="Timeline illustration"
            className="object-cover h-[400px] lg:h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
