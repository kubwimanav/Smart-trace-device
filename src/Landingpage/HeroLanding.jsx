import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { books } from "../data/books";

const HeroLanding: React.FC = () => {
  return (
    <section  id="/" className="relative w-full bg-[#F3F2EC] ">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 5000 }}
        navigation={{ clickable: true }}
        loop={true}
        className="w-full h-[500px] md:h-[600px]"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center px-10 pt-[5rem] font-sans">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-10">
              <div className="text-center md:text-left max-w-lg">
                <h2 className="text-4xl md:text-3xl font-bold text-gray-800 font-sans">{book.title}</h2>
                <p className="mt-2 text-lg text-gray-600 font-semibold">{book.author}</p>
                <p className="mt-4 text-gray-600">{book.description}</p>
                <button className="mt-6 px-6 py-3 border border-yellow-800 text-yellow-800 font-semibold rounded-lg   transition duration-300">
                  {book.buttonText} →
                </button>
              </div>

              <div className="w-[7rem] md:w-80">
                <img src={book.image} alt={book.title} className="w-full h-auto object-cover shadow-lg" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            width: 30px; /* Smaller size */
            height: 30px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-in-out;
          }

          .swiper-button-prev::after, .swiper-button-next::after {
            font-size: 16px; /* Smaller arrow */
            color: #74642F; /* Matches text color */
            font-weight: bold;
          }

          .swiper-button-prev:hover, .swiper-button-next:hover {
            background: rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </section>
  );
};

export default HeroLanding;