import React from "react";
interface InputFieldProps {
  label: string;
  name: string;
  value: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  options?: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-white">{label}</label>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 bg-gray-800 text-white border rounded"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="p-2 bg-gray-800 text-white border border-indigo-600 rounded-lg"
        />
      )}
    </div>
  );
};

export default InputField;
