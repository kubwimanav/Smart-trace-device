import React, { useState } from "react";
import homei from "../assets/images/home.jpg";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import ReUsableInput from "../ReusableComponents/ReUsableInput";
import ReUsableSelect from "../ReusableComponents/ReUsableSelect";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      device_image: file,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "name",
      "category",
      "description",
      "founderEmail",
      "location",
      "lastName",
      "firstName",
      "phoneNumber",
      "name",
      "serialnumber",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setSubmitMessage(
          `Please fill in the ${field
            .replace(/_/g, " ")
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.founderEmail)) {
      setSubmitMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const submitToDatabase = async (data: FormData): Promise<boolean> => {
    // Static form - no actual submission
    console.log("Form data (static - not submitted):", data);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitToDatabase(formData);

      if (success) {
        toast.success("Form completed (static mode - not actually submitted)");
        // Reset form
        setFormData({
          name: "",
          category: "",
          description: "",
          serialnumber: "",
          founderEmail: "",
          location: "",
          phoneNumber: "",
          deviceimage: null,
          firstName: "",
          lastName: "",
           address: "",
           province: "",
          district: "",
        });
      } else {
        toast.error("Static form - no actual submission performed");
      }
    } catch (error) {
      toast.info("Static form - no submission functionality");
    } finally {
      setIsSubmitting(false);
    }
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
      </div>

      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Submit Message */}
        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-md ${
              submitMessage.includes("successfully")
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {submitMessage}
          </div>
        )}

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
              <ReUsableInput
                type="text"
                label="Device Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name of the device found"
              />

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

              {/* Color */}

              {/* Serial Number */}
              <ReUsableInput
                label="Serial Number (if visible)"
                type="text"
                name="serial_number"
                value={formData.serialnumber}
                onChange={handleInputChange}
                placeholder="Serial number or IMEI"
              />
              <ReUsableInput
                label="Location Found"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where did you find this device?"
              />

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
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Location */}

              {/* Description */}
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the device and circumstances"
                  rows={5}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical"
                />
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
              <ReUsableSelect
                label="Address"
                name="category"
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

              {/* State */}

              <ReUsableSelect
                label="District"
                name="lcation"
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

              {/* City/Town */}

              <ReUsableInput
                label="Province"
                type="text"
                name="location"
                value={formData.province}
                onChange={handleInputChange}
                placeholder="Please select City/Town"
              />
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

              <ReUsableInput
                label="FirstName"
                type="text"
                name="name"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />

              {/* Last Name */}

              <ReUsableInput
                label="LastName"
                type="text"
                name="name"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />

              {/* Phone Number */}

              <ReUsableInput
                label="PhoneNumber"
                type="tel"
                name="phone_number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />

              <ReUsableInput
                label="Email"
                type="email"
                name="contact_email"
                value={formData.founderEmail}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-md text-white font-medium transition-all ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primaryColor-100 hover:bg-blue-300 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Found Items"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportFoundItem;
