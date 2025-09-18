
import React from "react";

interface InputProps {
  label?: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReUsableInput: React.FC<InputProps> = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  error,
  onChange,
}) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-3 py-3 border-[1.4px] border-primaryBoderColor rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
 
      />
      {error && <p className="text-red-500 text-xs ">{error}</p>}
    </div>
  );
};

export default ReUsableInput;
