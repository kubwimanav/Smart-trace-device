import React from "react";
import homei from "../assets/images/lostitempage.jpg";
import { Upload } from "lucide-react";
import ReUsableInput from "../ReusableComponents/ReUsableInput";
import ReUsableSelect from "../ReusableComponents/ReUsableSelect";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  dateFound: string;
  category: string;
  timeFound: string;
  brand: string;
  image: File | null;
  recepiet?: File | null;
  additionalInfo: string;
  addressType: string;
  state: string;
  cityTown: string;
  serialNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // email: string;
}

interface FormErrors {
  title?: string;
  dateFound?: string;
  category?: string;
  timeFound?: string;
  brand?: string;
  image?: string;
  recepiet?: string;
  additionalInfo?: string;
  addressType?: string;
  state?: string;
  cityTown?: string;
  serialNumber?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  // email: string;
}

const ReportLostItem: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    dateFound: "",
    category: "",
    timeFound: "",
    brand: "",
    image: null,
    recepiet: null,
    additionalInfo: "",
    addressType: "",
    state: "",
    cityTown: "",
    serialNumber: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    // email: "",
  });
  const [errors, setErrors] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(false);

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

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "FirstName Is Required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "LastName Is Required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "PhoneNumber Is Required";
    }
    if (!formData.dateFound) {
      newErrors.dateFound = "DateFound Is Required";
    }
    if (!formData.addressType) {
      newErrors.addressType = "Address Is Required";
    }
    if (!formData.additionalInfo) {
      newErrors.additionalInfo = "Additional Info Is Required";
    }
    if (!formData.category) {
      newErrors.category = "Select Any Category";
    }
    if (!formData.brand) {
      newErrors.brand = "Brand Is Required";
    }
    if (!formData.title) {
      newErrors.title = "Title Is Required";
    }
    if (!formData.timeFound) {
      newErrors.timeFound = "TimeFound Is Required";
    }
    if (!formData.cityTown) {
      newErrors.cityTown = "Province Is Required";
    }
    if (!formData.state) {
      newErrors.state = "District Is Required";
    }
    if (!formData.image) {
      newErrors.image = "Device Image Is Required";
    }
    if (!formData.serialNumber) {
      newErrors.serialNumber = "Serial Number Is Required";
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   newErrors.email="Please enter a valid email address.";
    // }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://smart-trace-device-backend.onrender.com/api/devices/lost/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
       // Reset form
        setFormData({
          title: "",
          dateFound: "",
          category: "",
          timeFound: "",
          brand: "",
          image: null,
          recepiet: null,
          additionalInfo: "",
          addressType: "",
          state: "",
          cityTown: "",
          serialNumber: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          // email: "",
        });

        toast.success("Lost item reported successfully!");
      } else {
      
        toast.error(
           "Failed to report lost item. Please try again."
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev:any) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="h-screen flex flex-col items-center justify-center gap-10 py-20 px-4 md:px-16 lg:px-60 text-center text-white bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${homei})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="  text-white grid gap-5  ">
          <h1 className=" font-bold text-size-2xl">
            Report your Lost Device. Help Us Stop Theft.
          </h1>
          <p className=" text-size-md">
            Reporting your lost or stolen device helps protect everyone by
            making it harder to resell and easier for a finder to return it to
            you.
          </p>{" "}
        </div>
      </div>

      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Found Item Information Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              LostItem Information
            </h2>
            <p className="text-gray-600 mb-8 text-sm lg:text-base">
              Please be descriptive when reporting your lost or stolen device.
              The more details you provide, the easier it will be to assist you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-7">
              {/* Title */}
              <div>
                <ReUsableInput
                  type="text"
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title Of Item Found"
                />
                {errors && <p className=" text-sm text-red-400">{errors.title}</p>
                }
              </div>

              {/* Date Item Found */}
              <div>
                <ReUsableInput
                  label="Date Found"
                  placeholder="Date Found"
                  type="date"
                  name="dateFound"
                  value={formData.dateFound}
                  onChange={handleInputChange}
                />
                {errors && 
                  <p className=" text-sm text-red-400">{errors.dateFound}</p>
                }
              </div>

              {/* Category */}
              <div>
                <ReUsableSelect
                  label="Choose Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Electronic Category</option>
                  <option value="phones">Phones</option>
                  <option value="laptops">Laptops</option>
                  <option value="tablets">Tablets</option>
                  <option value="cameras">Cameras</option>
                  <option value="audio">
                    Audio Devices (Headphones, Speakers)
                  </option>
                  <option value="accessories">
                    Accessories (Chargers, Cables, etc.)
                  </option>
                  <option value="other">Other Electronics</option>
                </ReUsableSelect>
                {errors && 
                  <p className=" text-sm text-red-400">{errors.category}</p>
                }
              </div>

              {/* Time Found */}
              <div>
                <ReUsableInput
                  label="Time Found"
                  placeholder="Time Found"
                  type="time"
                  name="timeFound"
                  value={formData.timeFound}
                  onChange={handleInputChange}
                />
                {errors&& 
                  <p className=" text-sm text-red-400">{errors.timeFound}</p>
                }
              </div>

              {/* Upload Receipt */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Receipt/Proof of Ownership
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-12 lg:p-16 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs mb-2">
                    {formData.recepiet
                      ? formData.recepiet.name
                      : "Upload Proof of Ownership(eg:invoice,Receipt,etc.)"}
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData((prev) => ({
                        ...prev,
                        recepiet: file,
                      }));
                    }}
                    accept="application/pdf,image/*"
                    className="hidden"
                    id="recepiet-upload"
                  />
                  <label
                    htmlFor="recepiet-upload"
                    className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Upload Image */}
              <div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Device Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-12 lg:p-16 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-xs mb-2">
                      {formData.image
                        ? formData.image.name
                        : "Upload Device Image"}
                    </p>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFormData((prev) => ({
                          ...prev,
                          image: file,
                        }));
                      }}
                      accept="application/pdf,image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                    >
                      Choose File
                    </label>
                  </div>
                  {errors&& 
                    <p className=" text-sm text-red-400">{errors.image}</p>
                  }
                </div>
              </div>

              <div>
                <ReUsableInput
                  label="Brand"
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Search Brand"
                />
                {errors&& 
                  <p className=" text-sm text-red-400">{errors.brand}</p>
                }
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <div>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Additional Information"
                    rows={5}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
                  />
                  {errors&& 
                    <p className=" text-sm text-red-400">
                      {errors.additionalInfo}
                    </p>
                  }
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
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                >
                  <option value="">Where did you lose your device?</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="school">School</option>
                  <option value="park">Park</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other">Other</option>
                </ReUsableSelect>
                {errors&& 
                  <p className=" text-sm text-red-400">{errors.addressType}</p>
                }
              </div>

              {/* State */}
              <div>
                <ReUsableSelect
                  label="District"
                  name="state"
                  value={formData.state}
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
                {errors&& 
                  <p className=" text-sm text-red-400">{errors.state}</p>
                }
              </div>

              {/* City/Town */}
              <div>
                <ReUsableInput
                  label="Province"
                  type="text"
                  name="cityTown"
                  value={formData.cityTown}
                  onChange={handleInputChange}
                  placeholder="Please enter the Province"
                />

                {errors&& 
                  <p className=" text-sm text-red-400">{errors.cityTown}</p>
                }
              </div>
              {/* serialNumber */}
              <div>
                <ReUsableInput
                  label="SerialNumber"
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleInputChange}
                  placeholder="SerialNumber"
                />

                {errors&&
                  <p className=" text-sm text-red-400">{errors.serialNumber}</p>
                }
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
              Your contact information is kept private and only shared if a
              match is found with your permission.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* First Name */}
              <div>
                <ReUsableInput
                  label="FirstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                {errors && 
                  <p className=" text-sm text-red-400">{errors.firstName}</p>
                }
              </div>
              {/* Last Name */}
              <div>
                <ReUsableInput
                  label="LastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
                {errors && 
                  <p className=" text-sm text-red-400">{errors.lastName}</p>
                }
              </div>

              {/* Phone Number */}
              <div>
                <ReUsableInput
                  label="PhoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                />
                {errors && 
                  <p className=" text-sm text-red-400">{errors.phoneNumber}</p>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-3 rounded-md text-white font-medium transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primaryColor-100 hover:bg-blue-400 hover:shadow-lg"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Lost Items"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportLostItem;
