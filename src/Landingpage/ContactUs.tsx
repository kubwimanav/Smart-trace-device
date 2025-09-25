import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { PiOfficeChair } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import ReUsableInput from "../ReusableComponents/ReUsableInput";

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactUs: React.FC<FormErrors> = () => {
  const [errors, setErrors] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [formdata, SetFormdata] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validate = () => {
    const newerrors: FormErrors = {};
    if (!formdata.first_name) {
      newerrors.first_name = "First Name is required";
    }
    if (!formdata.last_name) {
      newerrors.last_name = "Second Name is required";
    }
    if (!formdata.email) {
      newerrors.email = "email is required";
    }
    if (!formdata.subject) {
      newerrors.subject = "subject is required";
    }
    if (!formdata.message) {
      newerrors.message = "message is required";
    }
    setErrors(newerrors);
    return Object.keys(newerrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    SetFormdata({ ...formdata, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://smart-trace-device-backend.onrender.com/api/devices/contact/",     {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );

      if (response.ok) {
        SetFormdata({
          first_name: "",
          last_name: "",
          email: "",
          subject: "",
          message: "",
        });
        toast.success("message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
    
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Section - Get In Touch */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-medium  my-6 text-primaryColor-100 ">
                Get In Touch
              </h1>
              <p className="text-gray-600 leading-relaxed">
                We are always ready to to help you and <br /> answer your
                question We are always ready to to help you and answer your
                question
              </p>
            </div>

            {/* Head Office */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <div className=" text-gray-600">
                  <PiOfficeChair />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-normal text-gray-900 mb-2">
                  Head Office
                </h3>
                <p className="text-gray-600">RWANDA, Kigali, Kicukiro</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-normal text-gray-900 mb-2">
                  Location
                </h3>
                <p className="text-gray-600">
                  24J3+R22, KK 15 Rd,
                  <br />
                  Kigali
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-[#f0f9ff] rounded-3xl  p-9">
            <h1 className="text-3xl font-medium mb-5  text-primaryColor-100">
              Leave Your Message
            </h1>

            <div className="space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ReUsableInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={formdata.first_name}
                  onChange={handleChange}
                  error={errors.first_name}
                />
                <ReUsableInput
                  type="text"
                  placeholder="Second Name"
                  name="last_name"
                  value={formdata.last_name}
                  onChange={handleChange}
                  error={errors.last_name}
                />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ReUsableInput
                  type="email"
                  placeholder="email"
                  name="email"
                  value={formdata.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <ReUsableInput
                  type="text"
                  placeholder="subject"
                  name="subject"
                  value={formdata.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
              </div>

              {/* message Field */}
              <div className=" flex flex-col gap-2">
                <textarea
                  placeholder="message"
                  name="message"
                  value={formdata.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 border-[1.4px] border-primaryBoderColor rounded-md text-sm text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 "
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">{errors.message}</span>
                )}
              </div>
              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-13 py-3 border-[1.4px] border-primaryBoderColor rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default ContactUs;
