import React from "react";

const Alert = ({ msg }) => {
  return (
    <div className="mb-3 bg-red-500 py-2 px-3 text-white uppercase font-bold">
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
