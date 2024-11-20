import React, { useState } from "react";
import Draggable from "react-draggable"; // Import the Draggable component

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
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Group Size: {groupSize}</label>
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
                className="w-48 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Item Count */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Item Count: {itemCount}</label>
              <input
                type="range"
                min="4"
                max="12"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                onMouseDown={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchStart={handleSliderStart}
                onTouchEnd={handleSliderEnd}
                className="w-48 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Columns */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Columns: {columns}</label>
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
                className="w-48 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default ConfigPanel;
