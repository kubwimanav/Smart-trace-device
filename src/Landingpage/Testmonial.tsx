import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, EffectCoverflow } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote} from "lucide-react";
import "swiper/swiper.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I thought I would never see my laptop again after it was stolen on the bus. Thanks to the Lost and Find Tracker System, I registered it quickly, and within two weeks, someone who found it contacted me through the platform",
    name: "Jean Claude",
    role: "University Student",
    company: "University of Rwanda",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "When I lost my phone, I felt like my whole business was gone because all my contacts and MoMoPay records were inside. The tracker system helped me recover it safely, and I was amazed at how easy it was to use. ",
    name: "Aline Uwimana",
    role: "Small Business Owner",
    company: "Kigali Market",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "As a teacher, losing my educational materials was devastating. The Lost and Find system not only helped me recover my tablet but also connected me with honest people in our community. ",
    name: "Pierre Niyonzima",
    role: "High School Teacher",
    company: "Green Hills Academy",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "I was skeptical at first, but this platform really works! Lost my headphones at a café and got them back within 3 days. The notification system is brilliant and the community is so helpful. Highly recommended!",
    name: "Grace Mukamana",
    role: "Software Developer",
    company: "Tech Hub Rwanda",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "What impressed me most was how quickly the system worked. I registered my lost wallet and received a call the same day. The finder was directed through the platform and I got everything back intact.",
    name: "Samuel Habimana",
    role: "Business Consultant",
    company: "Kigali Business Center",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
];



const TestimonialCard: React.FC<Testimonial> = ({ quote, name, role, avatar,company }) => (
  <div className="group">
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-16 translate-x-16 transition-all duration-500 group-hover:scale-150 group-hover:rotate-45"></div>
      
      {/* Quote icon */}
      <div className="relative z-10">
        <Quote className="w-5 h-5 text-blue-500 mb-4 opacity-60" />
        
        {/* Star rating */}
        {/* <StarRating rating={rating} /> */}
        
        {/* Quote text */}
        <p className="text-gray-700 text-md leading-relaxed mb-6 flex-1 relative z-10 font-small">
          "{quote}"
        </p>
        
        {/* Author info */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-full object-cover ring-4 ring-white shadow-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-medium">{name}</h4>
            <p className="text-[#3A7196] text-sm font-medium">{role}</p>
            {company && (
              <p className="text-gray-500 text-xs">{company}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    </div>
  </div>
);

const TestimonialComponent: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br bg-[#f0f9ff] py-20 sm:py-20 lg:py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/30 to-pink-200/30 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-medium  mb-3 text-[#3A7196]    ">
            What Our Users Say
          </h1>
          <p className="text-md text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it—hear from real people who've successfully recovered their lost items
          </p>
        </div>

        {/* Enhanced Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y, EffectCoverflow]}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet-custom',
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true 
            }}
            a11y={{ enabled: true }}
            loop={true}
            centeredSlides={false}
            grabCursor={true}
            className="!pb-16"
            effect="slide"
            speed={800}
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx} className="!h-auto">
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#3A7196] hover:border-[#3A7196] hover:shadow-xl transition-all duration-300 group -translate-x-6">
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
          
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#3A7196] hover:border-[#3A7196] hover:shadow-xl transition-all duration-300 group translate-x-6">
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
      
      <style >{`
        .swiper-pagination-bullet-custom {
          width: 12px !important;
          height: 12px !important;
          background: #d1d5db !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: linear-gradient(135deg, #3A7196, #3A7196) !important;
          transform: scale(1.2) !important;
        }
        
        .swiper-pagination-bullet-custom:hover {
          transform: scale(1.1) !important;
          background: #9ca3af !important;
        }
        
        .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-slide {
          transition: transform 0.3s ease;
        }
        
        .swiper-slide-active {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default TestimonialComponent;