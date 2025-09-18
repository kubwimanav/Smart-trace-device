import React from "react";

const TestimonialComponent: React.FC = () => {
  return (
    <div className="w-full bg-primaryColor-500 py-16 sm:py-20 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl  font-normal text-gray-900 mb-5">
            Testimonials
          </h1>

            <p className="text-size-md text-gray-700 mb-12">
              Don't Take Our Word For Our Word For It Trust Our Customers
            </p>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                I thought I would never see my laptop again after it was stolen
                on the bus. Thanks to the Lost and Find Tracker System, I
                registered it quickly, and within two weeks, someone who found
                it contacted me through the platform. This system saved my
                academic work.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Jean Claude"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Jean Claude</h4>
                  <p className="text-gray-600 text-sm">University Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                When I lost my phone, I felt like my whole business was gone
                because all my contacts and MoMoPay records were inside. The
                tracker system helped me recover it safely, and I was amazed at
                how easy it was to use. Now I encourage all my friends to
                register their devices
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Aline"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Aline</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Partially visible */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 lg:block hidden">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">
                I thought I would never see my laptop again after it was stolen
                on the bus. Thanks to the Lost and Find Tracker System, I
                registered it quickly, and within two weeks, someone who found
                it contacted me through the platform. This system saved my
                academic work.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Pierre"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Pierre</h4>
                  <p className="text-gray-600 text-sm">Teacher</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center space-x-3 mt-12 sm:mt-16">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialComponent;
