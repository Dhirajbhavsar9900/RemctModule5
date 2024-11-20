import React from "react";

const WordCard = ({ word, onClick }) => {
  const getColor = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-500 text-white";
      case "incorrect":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <button
      className={`p-4 rounded shadow text-center cursor-pointer transition duration-200 ${getColor(
        word.status
      )}`}
      onClick={() => onClick(word)}
    >
      {word.id}
    </button>
  );
};

export default WordCard;
