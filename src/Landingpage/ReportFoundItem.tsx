import React, { useState } from "react";
import homei from "../assets/images/home.jpg";
import { Upload } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import ReUsableInput from "../ReusableComponents/ReUsableInput";
import ReUsableSelect from "../ReusableComponents/ReUsableSelect";

interface FormErrors {
  name?: string;
  category?: string;
  description?: string;
  serialnumber?: string;
  founderEmail?: string;
  location?: string;
  phoneNumber?: string;
  lastName?: string;
  firstName?: string;
  address?: string;
  province?: string;
  district?: string;
  deviceimage?: string;
}
interface FormData {
  name: string;
  category: string;
  description: string;
  serialnumber: string;
  founderEmail: string;
  location: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  address: string;
  province: string;
  district: string;
  deviceimage: File | null;
}

const ReportFoundItem: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    description: "",
    serialnumber: "",
    founderEmail: "",
    location: "",
    phoneNumber: "",
    firstName: "",
    address: "",
    province: "",
    district: "",
    lastName: "",
    deviceimage: null,
  });

 
   const [errors, setErrors] = React.useState<any>({});
   const [isLoading, setIsLoading] = React.useState(false);

 
   const validate = () => {
     const newerrors: FormErrors = {};
     
     if (!formData.name) {
       newerrors.name = "Name is required";
     }
     if (!formData.category) {
       newerrors.category = "Select Any Category";
     }
     if (!formData.founderEmail) {
       newerrors.founderEmail = "Founder Email is required";
     }
     if (!formData.address) {
       newerrors.address= "Address is required";
     }
     if (!formData.description) {
       newerrors.description = "Description is required";
     }
     if (!formData.deviceimage) {
       newerrors.deviceimage = "DeviceImage is required";
     }
     if (!formData.firstName) {
       newerrors.firstName = "FirstName is required";
     }
     if (!formData.lastName) {
       newerrors.lastName = "LastName is required";
     }
     if (!formData.district) {
       newerrors.district = "District is required";
     }
     if (!formData.location) {
       newerrors.location = "Location is required";
     }
     if (!formData.phoneNumber) {
       newerrors.phoneNumber = "PhoneNumber is required";
     }
      if (!formData.serialnumber) {
        newerrors.serialnumber = "SerialNumber is required";
     }
       if (!formData.province) {
         newerrors.province = "Province is required";
       }
     setErrors(newerrors);
     return Object.keys(newerrors).length === 0;
  };
    const handleInputChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Clear error when user starts typing
      setErrors((prev:any) => ({
        ...prev,
        [name]: "",
      }));
    };
 
   const handleChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
     setErrors({ ...errors, [e.target.name]: "" });
   };
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

 const data = new window.FormData();

    data.append("name", formData.name)
    data.append("category", formData.category) 
    data.append("description", formData.description)
    data.append("serialnumber", formData.serialnumber)
    data.append("foundEmail", formData.founderEmail)
    data.append("location", formData.location)
    data.append("phoneNumber", formData.phoneNumber);
    data.append("firstName", formData.firstName);
    data.append("address", formData.address);
    data.append("province", formData.province);
    data.append("district", formData.district);
    data.append("lastName", formData.lastName);
    if (formData.deviceimage) {
   data.append("deviceimage", formData.deviceimage);
   }
    try {
      const response = await fetch(
        "https://smart-trace-device-backend.onrender.com/api/devices/found/",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          category: "",
          description: "",
          serialnumber: "",
          founderEmail: "",
          location: "",
          phoneNumber: "",
          firstName: "",
          address: "",
          province: "",
          district: "",
          lastName: "",
          deviceimage: null,
        });
        toast.success("FoundItem Created successfully!");
      } else {
        toast.error("Failed to Create FoundItem. Please try again.");
      }
    } catch (error) {
      console.error("Error for creating item:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <div
        className="h-screen flex flex-col items-center justify-center gap-10 py-20 px-4 md:px-16 lg:px-60 text-center text-white bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {" "}
        <div className="  text-white  grid gap-5  ">
          <h1 className=" font-bold text-size-2xl">
            Found a Device? Do the Right Thing.{" "}
          </h1>
          <p className=" text-size-md">
            You've taken the first step to reuniting a lost device with its
            rightful owner. Use our secure database to check if the device has
            been reported lost or stolen.
          </p>{" "}
        </div>
      </div> */}
      <div
        className="relative h-[70vh] md:h-[75vh] lg:h-[80vh] flex flex-col items-center justify-center gap-10 px-4 md:px-16 lg:px-60 text-center text-white overflow-hidden"
        style={{
          background: `linear-gradient(rgba(41, 108, 181, 0.65), rgba(2, 17, 32, 0.84)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"></div>
        <div className="relative z-10 font-medium text-[20px] sm:text-[25px] text-white leading-tight mb-3 sm:mb-3">
          <div className="text-white grid gap-5">
          <p className=" font-normal  mt-2 text-3xl leading-snug drop-shadow-md">
              Found a Device? Do the Right Thing.{" "}
            </p>
            <p className="text-lg md:text-xl">
              You've taken the first step to reuniting a lost device with its
              rightful owner. Use our secure database to check if the device has
              been reported lost or stolen.
            </p>{" "}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Submit Message */}

        {/* Found Item Information Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Found Item Information
            </h2>
            <p className="text-gray-600 mb-8 text-sm lg:text-base">
              The more information you share when reporting a found device, the
              faster we can help return it to its rightful owner!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-7">
              {/* Name */}
              <div>
                <ReUsableInput
                  type="text"
                  label="Device Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name of the device found"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              <div>
                {/* Category */}
                <ReUsableSelect
                  label="Choose Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Electronic Category</option>
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Camera">Camera</option>
                  <option value="Audio Device">Audio Device</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Other">Other Electronics</option>
                </ReUsableSelect>
                {errors && (
                  <p className=" text-sm text-red-400">{errors.category}</p>
                )}
              </div>

              {/* Serial Number */}
              <div>
                <ReUsableInput
                  label="Serial Number (if visible)"
                  type="text"
                  name="serialnumber"
                  value={formData.serialnumber}
                  onChange={handleChange}
                  placeholder="Serial number or IMEI"
                />

                {errors && (
                  <p className=" text-sm text-red-400">{errors.serialnumber}</p>
                )}
              </div>
              <div>
                <ReUsableInput
                  label="Location Found"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where did you find this device?"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.location}</p>
                )}
              </div>

              {/* Upload Image */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image of the device
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-12 lg:p-16 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs mb-2">
                    {formData.deviceimage
                      ? formData.deviceimage.name
                      : "No file chosen"}
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData((prev) => ({
                        ...prev,
                        deviceimage: file,
                      }));
                    }}
                    accept="application/pdf,image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 text-sm hover:text-blue-800"
                  >
                    Choose File
                  </label>
                  <div>
                    {errors && (
                      <p className=" text-sm text-red-400">
                        {errors.deviceimage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of the device and circumstances"
                    rows={5}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
                  />
                  {errors && (
                    <p className=" text-sm text-red-400">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Information Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Location Information
            </h2>
            <p className="text-gray-600 mb-8 text-sm lg:text-base">
              Please be descriptive when reporting found, the more information
              you give us the better chance when we
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Address */}
              <div>
                <ReUsableSelect
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                >
                  <option value="">Where did you find the device?</option>
                  <option value="Market">Market</option>
                  <option value="work">Work</option>
                  <option value="school">School</option>
                  <option value="park">Park</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="publicTransport">Public Transport</option>
                  <option value="other">Other</option>
                </ReUsableSelect>
                {errors && (
                  <p className=" text-sm text-red-400">{errors.address}</p>
                )}
              </div>
              {/* State */}
              <div>
                <ReUsableSelect
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                >
                  <option value="">Please select the District</option>
                  <option value="ca">Kicukiro</option>
                  <option value="ny">Nyarugenge</option>
                  <option value="tx">Gasabo</option>
                  <option value="fl">Bugesera</option>
                  <option value="il">Kamonyi</option>
                  <option value="pa">Rwamagana</option>
                  <option value="ca">Kayonza</option>
                  <option value="ny">Ngoma</option>
                  <option value="tx">Kirehe</option>
                  <option value="fl">Rusizi</option>
                  <option value="il">Rubavu</option>
                  <option value="pa">Musanze</option>
                </ReUsableSelect>
                {errors && (
                  <p className=" text-sm text-red-400">{errors.district}</p>
                )}
              </div>

              {/* City/Town */}
              <div>
                <ReUsableInput
                  label="Province"
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Please select City/Town"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.province}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-8 text-sm lg:text-base">
              Providing your details is optional but helps us facilitate the
              return. We will not share your information publicly
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* First Name */}
              <div>
                <ReUsableInput
                  label="FirstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <ReUsableInput
                  label="LastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.lastName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <ReUsableInput
                  label="PhoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <ReUsableInput
                  label="Email"
                  type="email"
                  name="founderEmail"
                  value={formData.founderEmail}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors && (
                  <p className=" text-sm text-red-400">{errors.founderEmail}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 rounded-md text-white font-medium transition-all bg-primaryColor-100 hover:bg-blue-300 hover:shadow-lg"
          >
            {isLoading ? "Submitting..." : "Submit Found Items"}
          </button>
        </div>
      </form>
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
    </div>
  );
};

export default ReportFoundItem;
