import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-20 items-center px-4 lg:px-0">
        <div className="lg:w-1/2">
          <img
            src={Instructor}
            alt="Instructor teaching"
            // Using a subtle DaisyUI shadow and rounded corners for better theme fit
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-10">
          <h1 className="lg:w-1/2 text-4xl font-semibold text-base-content">
            Become an
            <HighlightText text={" instructor"} />
          </h1>

          <p className="font-medium text-base-content text-justify w-11/12 sm:w-9/12">
            Instructors from around the world teach millions of students on Upwise.
            We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection;
