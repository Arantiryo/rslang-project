import React from "react";
import { BsArrowRepeat } from "react-icons/bs";
// import "./LoaderButton.css";

export default function LoaderButton({
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`btn btn_type_loader ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children}
    </button>
  );
}
