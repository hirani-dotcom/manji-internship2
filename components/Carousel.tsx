"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Carousel({ slides }: { slides: React.ReactNode[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        centerInsufficientSlides={true}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          840: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10" // extra bottom padding for pagination dots
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={index}>
            <div className="h-90 w-50 flex items-center justify-center bg-gray-200 rounded shadow">
              {slideContent}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}