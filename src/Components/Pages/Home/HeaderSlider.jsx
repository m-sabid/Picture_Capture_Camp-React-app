import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import LazyLoad from "react-lazy-load";

const HeaderSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);

  const url =
    "https://api.unsplash.com/search/photos?page=1&query=photography&orientation=landscape&client_id=MbE1XMj7pdRElJnfBN5e6QwLAPi9WegETpvvo5W92_Y";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSliderImages(data.results);
      });
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[90vh] z-10"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <LazyLoad once>
              <img
                src={image?.urls?.small}
                alt={`Slider ${index + 1}`}
                className="w-full h-[100vh] object-cover object-center"
              />
            </LazyLoad>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl uppercase">{image?.alt_description}</h2>
              <p className="text-md">{image?.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HeaderSlider;
