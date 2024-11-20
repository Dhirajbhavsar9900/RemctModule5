import React from "react";

const ConfigPanel = ({ groupSize, setGroupSize, itemCount, setItemCount, columns, setColumns }) => (
    <div className="absolute top-4 right-4 bg-gray-800 text-white p-4 rounded shadow flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-2">Config</h2>
      <div className="flex items-center justify-between">
        <label className="mr-2">Group Size: {groupSize}</label>
        <input
          type="range"
          min="2"
          max="4"
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="mr-2">Item Count: {itemCount}</label>
        <input
          type="range"
          min="4"
          max="12"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="mr-2">Columns: {columns}</label>
        <input
          type="range"
          min="2"
          max="4"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
  
export default ConfigPanel;
