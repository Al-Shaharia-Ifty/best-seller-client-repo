import React from "react";

const PrimaryButton = ({ children }) => {
  return (
    <div className="btn border-0 bg-gradient-to-l from-blue-900 to-purple-900">
      {children}
    </div>
  );
};

export default PrimaryButton;
