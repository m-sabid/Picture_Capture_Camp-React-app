import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { FaQuestion, FaQuoteLeft } from "react-icons/fa";

SwiperCore.use([Pagination, Autoplay]);

const UserReview = () => {
    const reviews = [
        {
          id: 1,
          name: "John Doe",
          review:
            "I'm an aspiring photographer and this course helped me learn the fundamentals of photography. The instructor was knowledgeable and provided practical tips.",
        },
        {
          id: 2,
          name: "Jane Smith",
          review:
            "As a professional photographer, I highly recommend this course to anyone looking to improve their skills. The content is comprehensive and the examples are inspiring.",
        },
        {
          id: 3,
          name: "Michael Johnson",
          review:
            "The photography course exceeded my expectations. The instructor's teaching style made complex concepts easy to understand. I can now capture stunning photos!",
        },
        {
          id: 4,
          name: "Emily Davis",
          review:
            "I've taken multiple photography courses, but this one stands out. The hands-on assignments and feedback helped me grow as a photographer. Truly worth it!",
        },
        {
          id: 5,
          name: "David Thompson",
          review:
            "This photography course is a game-changer. I learned advanced techniques that took my photography to the next level. Highly recommended for enthusiasts and professionals.",
        },
      ];

  return (
    <div className="relative h-[60vh] flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          className="object-cover w-full h-full"
          src="https://img.freepik.com/free-photo/film-strips-near-cameras-cassettes_23-2147852297.jpg"
          alt="Background"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 to-gray-500 opacity-70"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="mx-auto w-3/4 sm:w-1/2">
            <h2 className="text-2xl bg-pra">USER REVIEWS</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-transparent px-6 py-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl border-b-2 w-fit font-bold mb-4">{review.name}</h2>
                  <p className="text-gray-800"> <FaQuoteLeft /> {review.review}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
