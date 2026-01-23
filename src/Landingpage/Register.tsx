// src/pages/register.tsx
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, } from "lucide-react";
import { MdLocationPin, MdOutlinePhone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface FormErrors {
  name?: string;
  phonenumber?: string;
  email?: string;
  location?: string;
  password?: string;
}

interface FormData {
  name: string;
  phonenumber: string;
  email: string;
  location: string;
  password: string;
}

const Register: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
  });

  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

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

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phonenumber.trim())
      newErrors.phonenumber = "Phone number is required";

    if (!formData.location.trim())
      newErrors.location = "Location is required";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------- Form Submit -------------------
  const onSubmit = async () => {
    if (!validate()) return;

    const success = await handleSignup(
      formData.name,
      formData.email,
      formData.password,
      formData.phonenumber,
      formData.location
    );

    if (success) {
      navigate("/otp", { state: { email: formData.email } });
    }
  };

  // ------------------- UI -------------------
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[800px] min-h-[500px] shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section (Invite to Login) */}
        <div className="w-full lg:w-1/2 bg-primaryColor-100 text-white flex flex-col items-center justify-center p-6 sm:p-10">
         
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="mb-6 text-center text-sm sm:text-base">
            To keep connected with us please login with your personal info
          </p>
          <Link
            to="/login"
            className="px-6 sm:px-8 py-2 rounded-full border border-white hover:bg-white hover:text-blue-600 transition text-sm sm:text-base"
          >
            Sign In
          </Link>
        </div>

        {/* Right Section (Register Form) */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 sm:p-10">
          {error && (
            <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-3">
            {/* Name */}
            <div className="flex flex-col">
              <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                <User className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                  value={formData.location}
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
                  value={formData.phonenumber}
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

            {/* Email */}
            <div className="flex flex-col">
              <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor-100 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
