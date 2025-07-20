import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../Common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    if (currentSectionIndx === -1) return;
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]?.subSection.findIndex(
      (data) => data._id === subSectionId
    );
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]?._id;

    setActiveStatus(courseSectionData[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r  ">
      <div className="mx-5 flex flex-col items-start justify-between gap-4 border-b  py-5 text-lg font-bold text-base-content">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="btn btn-circle btn-sm   hover:scale-90 transition-transform"
            title="Back"
            type="button"
          >
            <IoIosArrowBack size={24} />
          </button>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onClick={() => setReviewModal(true)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-semibold">{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold ">
            {completedLectures?.length} / {totalNoOfLectures} Lectures Completed
          </p>
        </div>
      </div>

      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            key={index}
            className="mt-2 cursor-pointer text-sm text-base-content"
          >
            {/* Section header */}
            <div
              className={`flex flex-row justify-between  px-5 py-4 ${
                activeStatus === course._id ? "rounded-t-md" : ""
              }`}
              onClick={() => setActiveStatus(course._id)}
            >
              <div className="w-[70%] font-semibold">{course.sectionName}</div>
              <div className="flex items-center gap-3">
                <BsChevronDown
                  className={`transition-transform duration-500 ${
                    activeStatus === course._id ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
            </div>

            {/* Subsections */}
            {activeStatus === course._id && (
              <div className="rounded-b-md border border-t-0  transition-[height] duration-500 ease-in-out">
                {course.subSection.map((topic, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                    className={`flex cursor-pointer items-center gap-3 px-5 py-2 ${
                      videoBarActive === topic._id
                        ? " font-semibold "
                        : ""
                    } rounded-md`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      readOnly
                      className="checkbox checkbox-sm"
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
