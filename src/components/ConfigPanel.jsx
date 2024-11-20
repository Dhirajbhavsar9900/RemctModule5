import React, { useState } from "react";
import Draggable from "react-draggable";

const ConfigPanel = ({ groupSize, setGroupSize, itemCount, setItemCount, columns, setColumns }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to track if the panel is expanded
  const [isSliderActive, setIsSliderActive] = useState(false); // State to track slider interaction

  // Toggle expand/collapse
  const togglePanel = () => setIsExpanded((prevState) => !prevState);

  // Handle slider interaction start
  const handleSliderStart = () => {
    setIsSliderActive(true);
  };

  // Handle slider interaction end
  const handleSliderEnd = () => {
    setIsSliderActive(false);
  };

  return (
    <Draggable
      bounds="parent" // Limits the movement to the parent element's bounds
      disabled={isExpanded} // Disable dragging when the panel is expanded
      onStart={() => !isSliderActive} // Prevent dragging while slider is active
    >
      <div className="absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col gap-4 transition-all duration-500 ease-in-out cursor-grab hover:cursor-grabbing">
        {/* Config Toggle Button */}
        <button
          onClick={togglePanel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-xl focus:outline-none transition-all duration-300 text-sm font-medium"
        >
          {isExpanded ? "Collapse Config" : "Expand Config"}
        </button>
        {/* Expanded Config Panel */}
        {isExpanded && (
          <div className="flex flex-col gap-4 mt-4 transition-all duration-500 ease-in-out transform opacity-100">
            {/* Group Size */}
            <div className="flex flex-col">
              <label htmlFor="small-range" className="block mb-2 text-sm font-medium text-gray-300">Group Size: {groupSize}</label>
              <input
                id="small-range"
                type="range"
                min="2"
                max="4"
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            {/* Item Count */}
            <div className="flex flex-col">
              <label htmlFor="medium-range" className="block mb-2 text-sm font-medium text-gray-300">Item Count: {itemCount}</label>
              <input
                id="medium-range"
                type="range"
                min="4"
                max="12"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            {/* Columns */}
            <div className="flex flex-col">
              <label htmlFor="large-range" className="block mb-2 text-sm font-medium text-gray-300">Columns: {columns}</label>
              <input
                id="large-range"
                type="range"
                min="2"
                max="4"
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-full h-[3px] bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ConfigPanel;
