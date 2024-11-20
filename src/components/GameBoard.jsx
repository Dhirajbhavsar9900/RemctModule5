import React, { useEffect, useState } from "react";
import { connectedWords } from "./../data";
import AttemptsDisplay from "./AttemptsDisplay"; // Import the AttemptsDisplay component

const GameBoard = ({ groupSize, itemCount, columns, attempts, setAttempts }) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [gameStatus, setGameStatus] = useState(""); // Initially, no game status
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Fetch words when game configuration changes
    const fetchWords = () => {
      const availableGroups = connectedWords.get(groupSize) || [];
      const shuffledGroups = shuffleArray(availableGroups);
      let selectedWords = [];

      for (let group of shuffledGroups) {
        if (selectedWords.length + groupSize <= itemCount) {
          selectedWords.push(
            ...group.map((word) => ({
              word,
              group: availableGroups.indexOf(group) + 1,
              status: "neutral",
            }))
          );
        }
        if (selectedWords.length >= itemCount) break;
      }

      return shuffleArray(selectedWords);
    };

    setWords(fetchWords());
    setSelected([]); // Reset selected words
    setGameStatus(""); // Reset game status on new game
    setIsGameOver(false); // Set game over to false when resetting the game
  }, [groupSize, itemCount, resetKey]); // Trigger effect when groupSize, itemCount, or resetKey changes

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleSelection = (selectedWord) => {
    if (selected.length < groupSize && !selected.includes(selectedWord)) {
      setSelected((prevSelected) => [...prevSelected, selectedWord]);
    }
  };

  useEffect(() => {
    if (selected.length === groupSize) {
      const isMatch = selected.every((word) => word.group === selected[0].group);

      if (isMatch) {
        setWords((prev) =>
          prev.map((word) =>
            selected.includes(word) ? { ...word, status: "correctPending" } : word
          )
        );

        setTimeout(() => {
          setWords((prev) =>
            prev.filter((word) => !selected.includes(word))
          );
        }, 1500);
      } else {
        setWords((prev) =>
          prev.map((word) =>
            selected.includes(word) ? { ...word, status: "incorrect" } : word
          )
        );

        setTimeout(() => {
          setWords((prev) =>
            prev.map((word) =>
              selected.includes(word) ? { ...word, status: "neutral" } : word
            )
          );
        }, 2000);
      }

      setSelected([]); // Reset selected words after each selection
      setAttempts((prevAttempts) => prevAttempts + 1);
    }
  }, [selected]);

  useEffect(() => {
    // Check if the game is over
    const allCorrect = words.every((word) => word.status === "correctPending");
  
    if (allCorrect) {
      setGameStatus("win"); // Player wins
      setIsGameOver(true); // End the game
    } else if (attempts >= 10 && !isGameOver) { // Player loses after 10 attempts
      setGameStatus("loss");
      setIsGameOver(true); // End the game
    }
  }, [words, attempts, isGameOver]); // Add isGameOver to prevent multiple updates
  

  const handleReset = () => {
    setAttempts(0);
    setResetKey((prev) => prev + 1); // Increment reset key to trigger game reset
    setIsGameOver(false); // Set game over to false when resetting the game
    setGameStatus(""); // Reset game status to empty
  };

  return (
    <div className="items-center h-screen justify-center flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4">
        Connect group of {groupSize} words by clicking on related words
      </h1>
      <div
        className="flex flex-wrap justify-center"
        style={{
          maxWidth: `${columns * 500}px`,
          gap: "8px",
          margin: "0 auto",
          transition: "all 1.5s ease",
        }}
      >
        {words.map((word, index) => (
          <button
            key={index}
            className={`p-2 border rounded shadow text-center transition duration-200 ${
              word.status === "correct"
                ? "bg-green-500 text-white"
                : word.status === "incorrect"
                ? "bg-red-500 text-white"
                : word.status === "correctPending"
                ? "bg-green-500 text-white opacity-100 transition-opacity duration-1500"
                : selected.includes(word)
                ? "bg-blue-500 text-white"
                : "bg-pink-700 text-white"
            }`}
            style={{
              flex: `0 1 calc(100% / ${columns} - 10px)`,
              minWidth: "160px",
              height: "40px",
              opacity: word.status === "correctPending" ? 0 : 1,
              visibility: word.status === "correctPending" ? "hidden" : "visible",
              transition: "opacity 1.5s ease, visibility 1.5s ease",
            }}
            onClick={() => handleSelection(word)}
          >
            {word.word}
          </button>
        ))}
      </div>

      {/* Show result only after game is over */}
      {isGameOver && (
        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold text-red-500">
            {gameStatus === "win" ? "You Win!" : "You Lose!"}
          </h2>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Reset
        </button>
      </div>

      {/* Pass the attempts to the AttemptsDisplay component */}
      <AttemptsDisplay attempts={attempts} />
    </div>
  );
};

export default GameBoard;
