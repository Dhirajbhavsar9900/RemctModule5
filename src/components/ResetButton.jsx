import React from "react";

const ResetButton = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Reset Game
    </button>
  );
};

export default ResetButton;
