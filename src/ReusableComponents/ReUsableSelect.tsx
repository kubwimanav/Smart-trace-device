import React from "react";

interface SelectProps {
  label?: string;
  name: string;
  value: string | number;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode; // pass <option> here
}

const ReUsableSelect: React.FC<SelectProps> = ({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
  children,
}) => {
  return (
    <div className="mb-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2.5 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none
          ${
            error
              ? "border-red-500 ring-red-200"
              : "border-primaryBoderColor ring-blue-200"
          }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ReUsableSelect;
