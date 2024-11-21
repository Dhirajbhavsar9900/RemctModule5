import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ConfigPanel from "./components/ConfigPanel";
import AttemptsDisplay from "./components/AttemptsDisplay";
import ResetButton from "./components/ResetButton";

const App = () => {
  const [groupSize, setGroupSize] = useState(2);
  const [itemCount, setItemCount] = useState(16);
  const [columns, setColumns] = useState(4);
  const [attempts, setAttempts] = useState(0);
  const [reset, setReset] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(5); // Add state for maxAttempts

  return (
    <div className="relative min-h-screen bg-white">
      <ConfigPanel
        groupSize={groupSize}
        setGroupSize={setGroupSize}
        itemCount={itemCount}
        setItemCount={setItemCount}
        columns={columns}
        setColumns={setColumns}
        setMaxAttempts={setMaxAttempts} // Pass setMaxAttempts here
      />
      <GameBoard
        groupSize={groupSize}
        itemCount={itemCount}
        columns={columns}
        attempts={attempts}
        setAttempts={setAttempts}
        reset={reset}
        maxAttempts={maxAttempts} // Pass maxAttempts to GameBoard
      />
    </div>
  );
};

export default App;
