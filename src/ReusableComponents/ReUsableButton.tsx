import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ReUsableButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full font-normal  sm:w-auto px-7 sm:px-5 py-3 text-white bg-[#000002]  border-1 border-primaryColor-50   rounded-md hover:bg-gray-100 hover:text-primaryColor-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white "
    >
      {label}
    </button>
  );
};

export default ReUsableButton;
