import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../Common/IconBtn";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center overflow-auto bg-base-100 bg-opacity-40 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-3xl rounded-lg border border-base-content/30 bg-base-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-base-300 p-5">
          <p className="text-xl font-semibold text-base-content">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            aria-label="Close review modal"
            className="text-2xl text-base-content hover:text-error transition-colors"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="aspect-square w-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-base-content">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-base-content opacity-70">
                Posting Publicly
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#fbbf24" 
            />
            <div className="flex w-11/12 flex-col space-y-2 mt-4">
              <label
                className="text-sm text-base-content"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-error">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="textarea textarea-bordered textarea-md w-full resize-none min-h-[130px]"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-error">
                  Please Add Your Experience
                </span>
              )}
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="btn btn-outline btn-sm text-base-content"
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
