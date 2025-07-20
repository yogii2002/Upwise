import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`}>
      <div className="card w-full bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-300">
        <figure className={`overflow-hidden rounded-t-xl ${Height}`}>
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body px-4 py-3 text-base-content">
          <h2 className="card-title text-lg">{course?.courseName}</h2>
          <p className="text-sm text-base-content/70">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-warning font-semibold">
              {avgReviewCount || 0}
            </span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-sm text-base-content/60">
              ({course?.ratingAndReviews?.length} Ratings)
            </span>
          </div>
          <p className="text-md font-bold text-base-content">
            ₹{course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
