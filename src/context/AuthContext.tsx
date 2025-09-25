// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Confirm, Notify } from "notiflix";

interface User {
  role?: string;
  user_type?: string;
  // add other fields you return from backend
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleSignup: (
    name: string,
    email: string,
    password: string,
    phonenumber: string,
    location: string
  ) => Promise<boolean>;
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  resendOtp: (email: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthContextType {
  verifyOtp: (email: string, code: string) => Promise<boolean>;
  resendOtp: (email: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prefer .env, fallback to production URL

  // Updated AuthContext.tsx - just the login and logout functions

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://smart-trace-device-backend.onrender.com/api/auth/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.message || "Login failed. Please check credentials."
        );

      if (data.access) {
        // Store the access token from the response
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("email", email);
      
      }

      // Optionally store refresh token too
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }
      console.log(data);

      setUser(data.user || null);

      const userRole: string = (
        data.user?.role ||
        data.user?.user_type ||
        "user"
      ).toLowerCase();
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/userdash");
      }

      return true;
    } catch (e: any) {
      setError(e?.message || "Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Logout ----------------

  // ---------------- Signup ----------------
  const handleSignup = async (
    name: string,
    email: string,
    password: string,
    phonenumber: string,
    location: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://smart-trace-device-backend.onrender.com/api/auth/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            phonenumber,
            location,
          }),
        }
      );
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Signup failed. Please try again.");

      // success: let the UI redirect to /otp
      return true;
    } catch (e: any) {
      setError(e?.message || "Network error. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Verify OTP ----------------
  const verifyOtp = async (email: string, code: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://smart-trace-device-backend.onrender.com/api/auth/verify-email/",
        {
          email,
          code,
        }
      );
      setLoading(false);
      console.log(res);

      return true; // verification succeeded
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Verification failed");
      return false;
    }
  };

  // ---------------- Resend OTP ----------------
  // If your backend uses a different path, change it here.
  const resendOtp = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "https://smart-trace-device-backend.onrender.com/api/auth/resend-code/",
        {
          email,
        }
      );
      console.log(res);

      setLoading(false);
      return true; // code resent successfully
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to resend code");
      return false;
    }
  };

  // ---------------- Logout ----------------
const logout = () => {
  Confirm.show(
    "Confirm Logout",
    "Are you sure you want to logout?",
    "Yes",
    "Cancel",
    () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      setUser(null);
      Notify.success("Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    () => {
      Notify.info("Logout cancelled");
    }
  );
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleSignup,
        verifyOtp,
        resendOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
