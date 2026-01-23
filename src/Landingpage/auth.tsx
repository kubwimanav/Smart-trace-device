import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff} from "lucide-react";
import { MdLocationPin, MdOutlinePhone } from "react-icons/md";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context

interface FormErrors {
  name?: string;
  phonenumber?: string;
  email?: string;
  location?: string;
  password?: string;
}

interface FormData {
  name?: string;
  phonenumber?: string;
  email?: string;
  location?: string;
  password?: string;
}

const LandingAuth: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeForm, setActiveForm] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
  });

  const { handleLogin, handleSignup, loading, error } = useAuth();

  // ------------------- Input Change -------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ------------------- Validation -------------------
  const validate = () => {
    const newErrors: FormErrors = {};

    if (activeForm === "signup") {
      if (!formData.name?.trim()) newErrors.name = "Name is required";

      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.phonenumber?.trim())
        newErrors.phonenumber = "Phone number is required";

      if (!formData.location?.trim())
        newErrors.location = "Location is required";

      if (!formData.password?.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    } else {
      // Login form
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.password?.trim()) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------- Form Submit -------------------
const onSubmit = async () => {
  if (!validate()) return;

  if (activeForm === "login") {
    await handleLogin(formData.email!, formData.password!);
  } else {
    const success = await handleSignup(
      formData.name!,
      formData.email!,
      formData.password!,
      formData.phonenumber!,
      formData.location!
    );

    if (success) {
      setActiveForm("login"); // ✅ Switch UI to login
      setFormData({
        name: "",
        email: formData.email, // keep email prefilled for user
        password: "",
        phonenumber: "",
        location: "",
      });
    }
  }
};

  // ------------------- Toggle Form -------------------
  const toggleForm = (formType: "login" | "signup"): void => {
    setActiveForm(formType);
    setFormData({
      name: "",
      email: "",
      password: "",
      location: "",
      phonenumber: "",
    });
    setErrors({});
  };

  // ------------------- UI -------------------
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[800px] min-h-[500px] shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        {activeForm === "signup" ? (
          <div className="w-full lg:w-1/2 bg-primaryColor-100 text-white flex flex-col items-center justify-center p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
              Welcome Back!
            </h2>
            <p className="mb-6 text-center text-sm sm:text-base">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => toggleForm("login")}
              className="px-6 sm:px-8 py-2 rounded-full border border-white hover:bg-white hover:text-blue-600 transition text-sm sm:text-base"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 bg-primaryColor-100 text-white flex flex-col items-center justify-center p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-medium mb-2 text-center">
              Hello, Friend!
            </h2>
            <p className="mb-6 text-center text-sm sm:text-base">
              Fill up personal information and start journey with us
            </p>
            <button
              onClick={() => toggleForm("signup")}
              className="px-6 sm:px-8 py-2 rounded-full border border-white hover:bg-white hover:text-blue-600 transition text-sm sm:text-base"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 sm:p-10">
          {error && (
            <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-3">
            {activeForm === "signup" && (
              <>
                {/* Name */}
                <div className="flex flex-col">
                  <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full outline-none text-sm"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                    <MdLocationPin className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="w-full outline-none text-sm"
                    />
                  </div>
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                    <MdOutlinePhone className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                      type="tel"
                      name="phonenumber"
                      value={formData.phonenumber || ""}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full outline-none text-sm"
                    />
                  </div>
                  {errors.phonenumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phonenumber}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Email */}
            <div className="flex flex-col">
              <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full outline-none text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                <Lock className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-full border border-primaryColor-100 hover:bg-primaryColor-100 hover:text-white text-primaryColor-100 w-full sm:w-1/2 mx-auto transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? activeForm === "signup"
                  ? "Signing Up..."
                  : "Signing In..."
                : activeForm === "signup"
                ? "Sign Up"
                : "Sign In"}
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-600 text-center">
            {activeForm === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleForm("login")}
                  className="text-primaryColor-100 hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleForm("signup")}
                  className="text-primaryColor-100 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingAuth;
