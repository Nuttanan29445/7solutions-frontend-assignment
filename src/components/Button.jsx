import React from "react";

const Button = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="py-1.5 w-48 font-semibold flex items-center justify-center border-2 border-gray-200 hover:bg-gray-300"
    >
      {children}
    </button>
  );
};

export default Button;
