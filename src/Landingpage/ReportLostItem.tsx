import React, { useState } from "react";
import homei from "../assets/images/lostitempage.jpg";
import { Upload } from "lucide-react";
import ReUsableInput from "../ReusableComponents/ReUsableInput";
import ReUsableSelect from "../ReusableComponents/ReUsableSelect";

interface FormData {
  title: string;
  dateFound: string;
  category: string;
  timeFound: string;
  brand: string;
  image: File | null;
  recepiet: File |null;
  additionalInfo: string;
  addressType: string;
  state: string;
  cityTown: string;
  serialNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const ReportLostItem: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
    email: "",
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
      image: file,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "title",
      "dateFound",
      "category",
      "timeFound",
      "firstName",
      "lastName",
      "email",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        setSubmitMessage(
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const submitToDatabase = async (data: FormData): Promise<boolean> => {
    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          submitData.append(key, value);
        } else if (key !== "image") {
          submitData.append(key, value as string);
        }
      });

      // Simulate API call - replace with your actual API endpoint
      const response = await fetch("/api/found-items", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      return false;
    }
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
        setSubmitMessage(
          "Found item reported successfully! We'll help connect it with its owner."
        );
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
          email: "",
        });
      } else {
        setSubmitMessage(
          "There was an error submitting your report. Please try again."
        );
      }
    } catch (error) {
      setSubmitMessage(
        "There was an error submitting your report. Please try again."
      );
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
              LostItem Information
            </h2>
            <p className="text-gray-600 mb-8 text-sm lg:text-base">
              Please be descriptive when reporting your lost or stolen device.
              The more details you provide, the easier it will be to assist you.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-7">
              {/* Title */}
              <ReUsableInput
                type="text"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title Of Item Found"
              />

              {/* Date Item Found */}

              <ReUsableInput
                label="Date Found"
                placeholder="Date Found"
                type="date"
                name="dateFound"
                value={formData.dateFound}
                onChange={handleInputChange}
              />
              {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}

              {/* Category */}

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

              {/* Time Found */}

              <ReUsableInput
                label="Time Found"
                placeholder="Time Found"
                type="time"
                name="timeFound"
                value={formData.timeFound}
                onChange={handleInputChange}
              />
              {/* <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}

              {/* Brand */}

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
                    onChange={handleFileChange}
                    accept="image/*"
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
              </div>

              <ReUsableInput
                label="Brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Search Brand"
              />
              {/* Additional Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Additional Information"
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

              {/* State */}

              <ReUsableSelect
                label="District"
                name="District"
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

              {/* City/Town */}

              <ReUsableInput
                label="Province"
                type="text"
                name="Province"
                value={formData.cityTown}
                onChange={handleInputChange}
                placeholder="Please enter the Province"
              />

              {/* serialNumber */}

              <ReUsableInput
                label="Zip code"
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleInputChange}
                placeholder="Zip code"
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
              Your contact information is kept private and only shared if a
              match is found with your permission.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* First Name */}

              <ReUsableInput
                label="FirstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />

              {/* Last Name */}

              <ReUsableInput
                label="LastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />

              {/* Phone Number */}

              <ReUsableInput
                label="PhoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />

              <ReUsableInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
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
                : "bg-recepiet-100 hover:bg-blue-400 hover:shadow-lg"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Lost Items"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportLostItem;
