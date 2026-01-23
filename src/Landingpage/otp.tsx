import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Mail, ShieldCheck, RefreshCw, Clock, Backpack } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const OTP_LENGTH = 6;

const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

const OtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const rawEmail = useMemo<string>(() => {
    const stateEmail = (location.state as { email?: string } | null)?.email;
    return (stateEmail || params.get("email") || "").trim();
  }, [location.state, params]);

  const initialEmail = useMemo(() => rawEmail.toLowerCase(), [rawEmail]);

  const { verifyOtp, resendOtp, loading, error } = useAuth();

  // Email state (editable)
  const [emailInput, setEmailInput] = useState<string>(initialEmail);
  const emailValid = useMemo(() => isValidEmail(emailInput), [emailInput]);

  // OTP state
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [localError, setLocalError] = useState<string>("");

  // resend timer
  const [seconds, setSeconds] = useState<number>(60);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  // inputs refs
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Autofocus first OTP box on mount
  useEffect(() => {
    const t = setTimeout(() => inputsRef.current[0]?.focus(), 60);
    return () => clearTimeout(t);
  }, []);

  const focusIndex = (idx: number) => inputsRef.current[idx]?.focus();

  const handleChange = (idx: number, val: string) => {
    setLocalError("");
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned) {
      setDigits((prev) => {
        const copy = [...prev];
        copy[idx] = "";
        return copy;
      });
      return;
    }
    if (cleaned.length > 1) {
      setDigits((prev) => {
        const copy = [...prev];
        let i = idx;
        for (const ch of cleaned.split("").slice(0, OTP_LENGTH - idx)) {
          copy[i] = ch;
          i++;
        }
        return copy;
      });
      focusIndex(Math.min(idx + cleaned.length, OTP_LENGTH - 1));
      return;
    }
    setDigits((prev) => {
      const copy = [...prev];
      copy[idx] = cleaned;
      return copy;
    });
    if (idx < OTP_LENGTH - 1) focusIndex(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      setDigits((prev) => {
        const copy = [...prev];
        copy[idx - 1] = "";
        return copy;
      });
      focusIndex(idx - 1);
    }
    if (e.key === "ArrowLeft" && idx > 0) focusIndex(idx - 1);
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) focusIndex(idx + 1);
    if (e.key === "Enter") onSubmit();
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    setDigits((prev) => {
      const copy = [...prev];
      let i = idx;
      for (const ch of pasted.split("").slice(0, OTP_LENGTH - idx)) {
        copy[i] = ch;
        i++;
      }
      return copy;
    });
    focusIndex(Math.min(idx + pasted.length, OTP_LENGTH - 1));
  };

  const code = useMemo(() => digits.join(""), [digits]);

  const onSubmit = async () => {
    const email = emailInput.trim().toLowerCase();
    if (!isValidEmail(email)) {
      setLocalError("Enter a valid email to verify.");
      return;
    }
    if (code.length !== OTP_LENGTH) {
      setLocalError(`Enter the ${OTP_LENGTH}-digit code.`);
      return;
    }
    const ok = await verifyOtp(email, code);
    if (ok) navigate("/login", { state: { email } });
  };

  const onResend = async () => {
    const email = emailInput.trim().toLowerCase();
    if (!isValidEmail(email)) {
      setLocalError("Enter a valid email to resend the code.");
      return;
    }
    const ok = await resendOtp(email);
    if (ok) setSeconds(60);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-[800px] min-h-[500px] shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 bg-primaryColor-100 text-white flex flex-col items-center justify-center p-6 sm:p-10">
          <Link
            to="/"
            className="flex items-center gap-2 self-start text-white/90 hover:text-white mb-6"
          >
            <Backpack className="text-red-300" />
            <span>Back</span>
          </Link>
          <ShieldCheck className="mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
            Verify Your Email
          </h2>
          <p className="mb-6 text-center text-sm sm:text-base">
            We sent a 6-digit code to your email to keep your account secure.
          </p>
          <div className="flex items-center gap-2 text-white/90">
            <Mail size={16} />
            <span className="truncate max-w-[220px]">
              {emailInput || "your@email.com"}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 sm:p-10">
          {(error || localError) && (
            <div className="w-full mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {localError || error}
            </div>
          )}

          <div className="w-full flex flex-col items-center gap-6">
            {/* Email input */}
            <div className="w-full max-w-sm">
              <label className="block text-xs text-gray-600 mb-1">Email</label>
              <div className="flex items-center border border-primaryColor-100 p-2 rounded-md">
                <Mail className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => {
                    setLocalError("");
                    setEmailInput(e.target.value.toLowerCase());
                  }}
                  placeholder="Enter your email"
                  className="w-full outline-none text-sm"
                />
              </div>
              {!emailValid && emailInput.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Enter a valid email.
                </p>
              )}
            </div>

            {/* OTP Inputs */}
            <div className="flex gap-2 sm:gap-3">
              {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={(e) => handlePaste(i, e)}
                  aria-label={`OTP digit ${i + 1}`}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg border border-primaryColor-100 rounded-md outline-none focus:ring-2 focus:ring-primaryColor-100"
                />
              ))}
            </div>

            {/* Verify */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading || !emailValid}
              className="px-6 py-2 rounded-full border border-primaryColor-100 hover:bg-primaryColor-100 hover:text-white text-primaryColor-100 w-full sm:w-1/2 mx-auto transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            {/* Resend */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock size={14} />
                {seconds > 0 ? (
                  <span>Resend available in {seconds}s</span>
                ) : (
                  <span>You can resend the code now</span>
                )}
              </div>
              <button
                type="button"
                onClick={onResend}
                disabled={seconds > 0 || loading || !emailValid}
                className="inline-flex items-center gap-2 text-primaryColor-100 hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <RefreshCw size={14} />
                Resend code
              </button>
            </div>

            {/* Go to Login */}
            <p className="mt-2 text-xs text-gray-600 text-center">
              Already verified?{" "}
              <Link
                to="/login"
                state={{ email: emailInput }}
                className="text-primaryColor-100 hover:underline"
              >
                Go to Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
