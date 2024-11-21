import React, { useState } from "react";
import Draggable from "react-draggable";

const ConfigPanel = ({
  groupSize,
  setGroupSize,
  itemCount,
  setItemCount,
  columns,
  setColumns,
  setMaxAttempts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSliderActive, setIsSliderActive] = useState(false);

  const togglePanel = () => setIsExpanded((prevState) => !prevState);

  const handleSliderStart = () => {
    setIsSliderActive(true);
  };

  const handleSliderEnd = () => {
    setIsSliderActive(false);
  };

  // Update maxAttempts based on itemCount dynamically
  const handleItemCountChange = (value) => {
    setItemCount(value);
    if (value === 4) setMaxAttempts(1);
    else if (value === 6) setMaxAttempts(3);
    else if (value === 8) setMaxAttempts(4);
    else if (value === 10) setMaxAttempts(5);
    else if (value === 12) setMaxAttempts(6);
  };

  return (
    <Draggable
      bounds="parent"
      disabled={isExpanded}
      onStart={() => setIsSliderActive(true)}
      onStop={() => setIsSliderActive(false)}
    >
      <div
        className={`absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col gap-4 cursor-grab ${
          isSliderActive ? "transition-none" : "transition-all duration-500 ease-in-out"
        }`}
      >
        <button
          onClick={togglePanel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl focus:outline-none transition-all duration-300 text-sm font-medium"
        >
          {isExpanded ? "Collapse Config" : "Expand Config"}
        </button>
        {isExpanded && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Group Size: {groupSize}
              </label>
              <input
                type="range"
                min="2"
                max="4"
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Item Count: {itemCount}
              </label>
              <input
                type="range"
                min="4"
                max="12"
                step="2"
                value={itemCount}
                onChange={(e) => handleItemCountChange(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Columns: {columns}
              </label>
              <input
                type="range"
                min="2"
                max="4"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ConfigPanel;
