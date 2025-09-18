import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Backpack } from "lucide-react";
import { MdLocationPin, MdOutlinePhone } from "react-icons/md";
import { Link } from 'react-router-dom';

interface FormErrors {
  username?: string;
  phonenumber?: string;
  email?: string;
  location?: string;
  password?: string;
}

interface FormData {
  username?: string;
  phonenumber?: string;
  email?: string;
  location?: string;
  password?: string;
}

interface LoginResponse {
  token?: string;
  message?: string;
  user?: {
    role?: string;
    user_type?: string;
  };
}

interface SignupResponse {
  message?: string;
}

const LandingAuth: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeForm, setActiveForm] = useState<"login" | "signup">("signup");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
  });
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setError("");
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (activeForm === "signup") {
      if (!formData.username?.trim()) {
        newErrors.username = "Username is required";
      }
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email format is invalid";
      }
      if (!formData.phonenumber?.trim()) {
        newErrors.phonenumber = "Phone number is required";
      }
      if (!formData.location?.trim()) {
        newErrors.location = "Location is required";
      }
  
      if (!formData.password?.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    } else {
      // Login validation
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email format is invalid";
      }
      if (!formData.password?.trim()) {
        newErrors.password = "Password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigateBasedOnRole = (userRole: string) => {
    // Navigation logic based on user role
    switch (userRole?.toLowerCase()) {
      case "admin":
        window.location.href = "/admin/dashboard";
        break;
      case "manager":
        window.location.href = "/manager/dashboard";
        break;
      case "user":
      case "client":
        window.location.href = "/admin";
        break;
      case "driver":
        window.location.href = "/driver/dashboard";
        break;
      default:
        window.location.href = "/dashboard";
        break;
    }
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://smart-trace-device-backend.onrender.com/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data: LoginResponse = await response.json();

      if (response.ok) {
        // Store token if provided
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        setFormData({
          email: "",
          password: "",
          
        });

        // Navigate based on user role
        const userRole = data.user?.role || data.user?.user_type || "user";
        setTimeout(() => {
          navigateBasedOnRole(userRole);
        }, 1000);
      } else {
        const errorMessage =
          data.message || "Login failed. Please check your credentials.";
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (): Promise<void> => {
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://smart-trace-device-backend.onrender.com/api/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phonenumber: formData.phonenumber,
            location: formData.location,
          }),
        }
      );

      const data: SignupResponse = await response.json();

      if (response.ok) {
        // Switch to login form after successful signup
        setActiveForm("login");
        setFormData({
          username: "",
          email: "",
          password: "",
          location: "",
          phonenumber: "",
        });
        setErrors({});
        setError("");
        console.log("Signup successful! Please login.");
      } else {
        const errorMessage = data.message || "Signup failed. Please try again.";
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = (formType: "login" | "signup"): void => {
    setActiveForm(formType);
    setFormData({
      username: "",
      email: "",
      password: "",
      location: "",
      phonenumber: "",
    });
    setErrors({});
    setError("");
    setShowPassword(false);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row w-full max-w-[800px] min-h-[500px] shadow-lg rounded-2xl overflow-hidden">
          {/* Left Section - Dynamic Content */}
          {activeForm === "signup" ? (
            <div className="w-full lg:w-1/2 bg-primaryColor-100 text-white flex flex-col items-center justify-center p-6 sm:p-10">
              <Link to={"/"} className=" flex">
                <Backpack className="text-red-300" />
                <p>Back</p>
              </Link>
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

          {/* Right Section - Dynamic Content */}
          <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 sm:p-10">
            {activeForm === "signup" ? (
              <>
                <h2 className="text-lg sm:text-xl font-medium text-PrimaryColor-100 mb-4 text-center">
                  Create Account
                </h2>

                {/* Social Icons */}
                <div className="flex justify-center space-x-4 sm:space-x-6 mb-3">
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 text-black hover:bg-gray-100 transition"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 text-primaryColor-100 hover:bg-blue-50 transition"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>

                {error && (
                  <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 rounded-md">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username || ""}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="w-full outline-none text-sm sm:text-base"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 rounded-md">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full outline-none text-sm sm:text-base"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 rounded-md">
                      <MdLocationPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleInputChange}
                        placeholder="Location"
                        className="w-full outline-none text-sm sm:text-base"
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 rounded-md">
                      <MdOutlinePhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type="tel"
                        name="phonenumber"
                        value={formData.phonenumber || ""}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full outline-none text-sm sm:text-base"
                      />
                    </div>
                    {errors.phonenumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phonenumber}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 rounded-md">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password || ""}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full outline-none text-sm sm:text-base"
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="px-6 sm:px-8 py-2 rounded-full border border-primaryColor-100 hover:bg-PrimaryColor-100 hover:bg-primaryColor-100 hover:text-white text-primaryColor-100 text-primaryColor-100 w-full sm:w-1/2 mx-auto transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => toggleForm("login")}
                    className="text-primaryColor-100 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl font-medium text-blue-600 mb-6 text-center">
                  Sign In Into Your Account
                </h2>

                {/* Social Icons */}
                <div className="flex justify-center space-x-4 sm:space-x-6 mb-6">
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 text-black hover:bg-gray-100 transition"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full border border-gray-300 text-primaryColor-100 hover:bg-blue-50 transition"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>

                <p className="mb-4 text-xs sm:text-sm text-gray-600 text-center">
                  or use your email account
                </p>

                {error && (
                  <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="w-full flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 sm:p-3 rounded-md">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full outline-none text-sm sm:text-base"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center border-[1.4px] border-primaryColor-100 p-2 sm:p-3 rounded-md">
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password || ""}
                        onChange={handleInputChange}
                        placeholder="Password"
                        className="w-full outline-none text-sm sm:text-base"
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="px-6 sm:px-8 py-2 rounded-full border border-primaryColor-100 hover:bg-primaryColor-100 hover:text-white text-primaryColor-100 w-full sm:w-1/2 mx-auto transition text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => toggleForm("signup")}
                    className="text-primaryColor-100 hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingAuth;
