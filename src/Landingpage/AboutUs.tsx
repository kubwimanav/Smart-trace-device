
import { LuBadgeCheck } from "react-icons/lu";
import ChatGPT from "../assets/images/cotton.jpeg";
import ServiceCard from "../ReusableComponents/ServiceCard";
import { FaMobileAlt } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import homei from '../assets/images/home.jpg'
import mission from "../assets/images/mission.png";
import ReUsableButton from "../ReusableComponents/ReUsableButton";
import ContactUs from "./ContactUs";
import TestimonialComponent from "./Testmonial";
import { useGetProductsQuery } from "../Api/item";
import { Link } from "react-router-dom";

export default function About() {
  const { data } = useGetProductsQuery();
  console.log('hhhhhhhhhnnnnn',data);
  

  return (
    <div>
      <div
        className="h-screen flex flex-col items-center justify-center gap-10 px-4 md:px-16 lg:px-60 text-center text-white"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" font-medium text-[20px] sm:text-[25px]  text-white leading-tight mb-3 sm:mb-3">
          Connect Lost Gadgets With Their Rightful Owners
          <p className=" font-normal text-[15px] sm:text-[20px] mt-3">
            A safer way to report, find, and verify electronic devices.
          </p>
        </div>
        {/* Button container */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link to="/reportlostitem">
            <ReUsableButton label="Submit Lost Items" />
          </Link>
          <Link to={"/reportfounditem"}>
            <ReUsableButton label="Submit Found Items" />
          </Link>
        </div>
      </div>
      {data?.map((item: any) => (
        <div>
          <p className=""> {item.firstName}</p>
          <img src={item.deviceimage} />
        </div>
      ))}
      {/* Device Recovery Section */}
      <div className="bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-7 items-center">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1 space-y-4">
              <h1 className="text-2xl font-normal text-gray-900 ">
                Stop Fraud, Reunite Device And Build Trust
              </h1>

              <p className="text-size-md sm:text-size-md text-gray-600 leading-relaxed max-w-xl">
                Digitalization has enabled our recovery platform to harness the
                power of data matching. By collecting and analyzing device
                information, we can successfully reunite owners with their lost
                electronics while preventing the sale of stolen device
              </p>

              <button className="bg-primaryColor-100 hover:bg-primaryColor-400 hover:text-primaryColor-100 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Read More
              </button>
            </div>

            {/* Right side - Image and Stats */}
            <div className="order-1 lg:order-2 ">
              {/* Delivery person image */}
              <div className="lg:mb-0">
                <img
                  src={ChatGPT}
                  className="w-full max-w-sm mx-auto lg:max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[#769EB81A] py-15 px-4 sm:py-15 sm:px-6 lg:py-15 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h1 className="text-center text-2xl font-normal text-gray-900 mb-10">
            Our Services
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <ServiceCard
              icon={<BsBook />}
              title="Report lost devices"
              description="Quickly register your lost electronic device with essential details. Our System immediately begins scanning for matched with found items in our database."
            />
            <ServiceCard
              icon={<FaMobileAlt />}
              title="Register Found Items"
              description="Found an electronic device? Report it through our simple form. We'll automatically check against our database of lost devices and notify owners if matched."
            />
            <ServiceCard
              icon={<LuBadgeCheck />}
              title="Verify Before Purchase"
              description="Planning to buy a used device? Check its status in our secure database first to ensure you're not purchasing stolen propert."
            />
          </div>
        </div>
      </div>

      {/* Why We Exist Section */}
      <div className="bg-white py-16 px-4 sm:py-15 sm:px-6 lg:py-15 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h1 className="text-center text-2xl font-normal text-gray-900 mb-1 sm:mb-1 lg:mb-1">
            WHY WE EXIST &amp;&amp; WHAT WE AIM FOR
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Image and Stats */}
            <div className="">
              <img src={mission} alt="" />
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Our Mission */}
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide a secure, reliable, and accessible digital platform
                  that helps Rwandans track, recover, and verify electronic
                  devices, reducing theft, protecting consumers, and building
                  trust in the second-hand electronics market.
                </p>
              </div>

              {/* Our Goals */}
              <div>
                <h3 className="text-xl font-medium  text-gray-900 mb-6">
                  Our Goals
                </h3>
                <div className="space-y-4">
                  {/* Goal 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Enhance Consumer Protection
                      </h4>
                    </div>
                  </div>

                  {/* Goal 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Reduce Theft and Black-Market Activity
                      </h4>
                    </div>
                  </div>

                  {/* Goal 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="20"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        Promote Rwanda's Digital Transformation
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discover More Button */}
              <div className="pt-4">
                <button className="bg-primaryColor-100 hover:bg-primaryColor-400 hover:text-primaryColor-100 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialComponent />
      <ContactUs />
    </div>
  );
}