import React, { useEffect, useState } from "react";
import { connectedWords } from "./../data";

const GameBoard = ({ groupSize, itemCount, columns, attempts, setAttempts }) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [gameStatus, setGameStatus] = useState(""); // Track game status (win, lose)
  const [isGameOver, setIsGameOver] = useState(false); // Track if game is over

  useEffect(() => {
    const fetchWords = () => {
      const availableGroups = connectedWords.get(groupSize) || [];
      const shuffledGroups = shuffleArray(availableGroups);
      let selectedWords = [];

      for (let group of shuffledGroups) {
        if (selectedWords.length + groupSize <= itemCount) {
          selectedWords.push(
            ...group.map((word) => ({
              word,
              group: availableGroups.indexOf(group) + 1, // Group ID is based on index of group
              status: "neutral",
            }))
          );
        }
        if (selectedWords.length >= itemCount) break;
      }

      return shuffleArray(selectedWords);
    };

    // Reset game when groupSize, itemCount, or resetKey changes
    setWords(fetchWords());
    setSelected([]);
    setGameStatus(""); // Reset game status
    setIsGameOver(false); // Reset game over flag
  }, [groupSize, itemCount, resetKey]);

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

      setSelected([]);
      setAttempts((prevAttempts) => prevAttempts + 1); // Safe state update with functional form
    }
  }, [selected]);

  useEffect(() => {
    const allCorrect = words.every((word) => word.status === "correctPending");

    if (allCorrect) {
      setGameStatus("win");
      setIsGameOver(true); // Game ends with a win
    }
  }, [words]);

  const handleReset = () => {
    setAttempts(0);
    setResetKey((prev) => prev + 1);
    setIsGameOver(false); // Reset game over flag
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

      {/* Conditional rendering for win/lose message */}
      {isGameOver ? (
        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold text-green-500">
            {gameStatus === "win" ? "You Win!" : "You Lose!"}
          </h2>
        </div>
      ) : (
        <div className="mt-4 text-center">
          <h2 className="text-3xl font-bold text-red-500">Game In Progress...</h2>
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

      <p className="text-center mt-2">Attempts: {attempts}</p>
    </div>
  );
};

export default GameBoard;
