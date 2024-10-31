"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      loop={true}
      speed={1500}
      autoplay={{ delay: 1500 }}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slider"
    >
      <SwiperSlide>
        <img src="/images/Banner02.webp" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Banner04.webp" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/Banner05.webp" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
