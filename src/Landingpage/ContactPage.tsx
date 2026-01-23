import React from "react";
import "react-toastify/dist/ReactToastify.css";
import home from '../assets/images/lostitempage.jpg'
import ContactUs from "./ContactUs";
interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactPage: React.FC<FormErrors> = () => {

  return (
  <>
    <div
        className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] flex flex-col items-center justify-center gap-10 px-4 md:px-16 lg:px-60 text-center text-white overflow-hidden"
        style={{
          background: `linear-gradient(rgba(41, 108, 181, 0.65), rgba(2, 17, 32, 0.84)), url(${home})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
      <div className="relative z-10 font-medium text-[20px] sm:text-[25px] text-white leading-tight mb-3 sm:mb-3">
        <div className="text-white grid gap-5">
          <p className=" font-normal  mt-2 text-3xl leading-snug drop-shadow-md">Contact Us</p>
          <p className="font-light text-lg ">
            Have questions about our Smart Trace Device system? Reach out to our
            team using the information below or send us a message.
          </p>
        </div>
      </div>
      

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#f5f5f5"
            ></path>
          </svg>
        </div>
    </div>
    

      {/* Google Map - Full width */}
      <div className="w-full h-96 overflow-hidden mb-0">
        <iframe
          className="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00658865!3d40.71277585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sCity%20Hall%20Park!5e0!3m2!1sen!2sus!4v1593177301753!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
      <ContactUs />
    </>
  );
}

export default ContactPage;
