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

  return (
    <div className="relative min-h-screen bg-white">
      <ConfigPanel
        groupSize={groupSize}
        setGroupSize={setGroupSize}
        itemCount={itemCount}
        setItemCount={setItemCount}
        columns={columns}
        setColumns={setColumns}
      />
      <GameBoard
        groupSize={groupSize}
        itemCount={itemCount}
        columns={columns}
        attempts={attempts}
        setAttempts={setAttempts}
        reset={reset}
      />
    </div>
  );
};

export default App;
