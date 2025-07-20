import React from "react"
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// Swiper modules
import { FreeMode, Pagination } from "swiper/modules"
// Components
import Course_Card from "./Course_Card"

function Course_Slider({ Courses }) {
  return (
    <div className="w-full">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-h-[30rem] px-4"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-lg text-base-content mt-6">
          No Courses Found
        </p>
      )}
    </div>
  )
}

export default Course_Slider
