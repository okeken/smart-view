import React from "react";
import { IElementProps } from "types";

interface IInputProps extends IElementProps {
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
  label: string;
  errors: any;
  disabled?: boolean;
  className?: string;
  register: any;
  currentValue?: string;
  list?: string;
  labelClassName?: string;
}

const Input = ({
  list = "",
  placeholder = "",
  type = "text",
  className = "",
  name,
  label,
  errors,
  disabled = false,
  register = () => {},
  currentValue = "",
  children,
  labelClassName = "",
  required = true,
  lowerCase = true,
}: IInputProps) => {
  const err = errors[name]?.type === "required" || !!errors[name]?.message;

  return (
    <div className={`relative ${disabled ? "" : ""}`}>
      {err ? (
        <span className="absolute right-0 text-sm text-red-500 capitalize label-text-alt">
          {errors[name]?.message}
        </span>
      ) : (
        currentValue && (
          <span className="absolute right-0 text-sm text-gray-500 capitalize label-text-alt">
            All good
          </span>
        )
      )}
      <label
        className={`  relative  ${
          err ? "" : ""
        } dark:text-white20 ${labelClassName}`}
        htmlFor={name}
      >
        {label}
        {!!required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        list={list}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        id={name}
        type={type}
        className={`
         my-4 mt-1 px-6 py-2 text-white60 rounded-md outline-none w-full border  border-white10 bg-transparent ${
           lowerCase ? "lowercase" : ""
         } ${
          err && type === "text"
            ? "focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500"
            : currentValue?.length > 0
            ? "border-green-500"
            : ""
        } 
          ${
            disabled
              ? "before:absolute before:w-full before:bg-transparent before:h-10 before:left-0          cursor-not-allowed"
              : ""
          }
          ${className} `}
        {...register(name)}
      />

      {children}
    </div>
  );
};

export default Input;
