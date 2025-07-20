import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      {/* Step indicators */}
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <div className="flex items-center gap-2" key={item.id}>
            {/* Step button */}
            <div className="flex flex-col items-center">
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border ${
                  step === item.id
                    ? "border-warning text-warning-content bg-warning"
                    : "border-base-300 bg-base-200 text-base-content/60"
                } ${step > item.id ? "bg-warning text-warning-content" : ""}`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-base-100" />
                ) : (
                  item.id
                )}
              </button>
            </div>

            {/* Connecting line (skip after last step) */}
            {index !== steps.length - 1 && (
              <div
                className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed ${
                  step > item.id ? "border-warning" : "border-base-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step titles */}
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div
            className="flex min-w-[130px] flex-col items-center gap-y-2"
            key={item.id}
          >
            <p
              className={`text-sm ${
                step >= item.id ? "text-base-content" : "text-base-content/50"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}
