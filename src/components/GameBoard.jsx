import React, { useState, useEffect } from "react";
import { connectedWords } from "./../data";
import AttemptsDisplay from "./AttemptsDisplay";

const GameBoard = ({
  groupSize,
  itemCount,
  columns,
  attempts,
  setAttempts,
  maxAttempts,
  setMaxAttempts,
}) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [statusMessage, setStatusMessage] = useState(""); // To show Win/Lose message

  // Update the number of words based on the groupSize
  const getNumberOfTiles = () => {
    if (groupSize === 2) return 8; // 2-group size, 8 tiles
    if (groupSize === 3) return 12; // 3-group size, 12 tiles
    if (groupSize === 4) return 16; // 4-group size, 16 tiles
    return 20; // Default number of tiles for other group sizes
  };

  useEffect(() => {
    const fetchWords = () => {
      const availableGroups = connectedWords.get(groupSize) || [];
      const shuffledGroups = shuffleArray(availableGroups);
      let selectedWords = [];

      // Adjust the number of tiles based on group size
      const requiredTiles = getNumberOfTiles();
      let count = 0;

      for (let group of shuffledGroups) {
        if (selectedWords.length < requiredTiles) {
          selectedWords.push(
            ...group.map((word) => ({
              word,
              group: availableGroups.indexOf(group) + 1,
              status: "neutral",
            }))
          );
          count += group.length;
        }
        if (selectedWords.length >= requiredTiles) break;
      }

      return shuffleArray(selectedWords);
    };

    setWords(fetchWords());
    setSelected([]);
    setStatusMessage(""); // Reset status message on game reset
  }, [groupSize, itemCount, resetKey]);

  useEffect(() => {
    setAttempts(0); // Reset attempts when itemCount, groupSize, or columns change
  }, [itemCount, groupSize, columns, setAttempts]);

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

        setAttempts((prevAttempts) => prevAttempts + 1);
      }

      setSelected([]);
    }
  }, [selected]);

  useEffect(() => {
    if (words.length === 0) {
      setStatusMessage("🎉 Congratulations! You Win! 🎉");
    } else if (attempts >= maxAttempts) {
      setStatusMessage("😢 Game Over! You Lose! 😢");
    }
  }, [words, attempts, maxAttempts]);

  const handleReset = () => {
    setAttempts(0);
    setResetKey((prev) => prev + 1);
    setStatusMessage(""); // Clear the status message on reset
  };

  return (
    <div className="items-center h-screen justify-center flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4">
        Connect group of {groupSize} words by clicking on related words
      </h1>

      {statusMessage && (
        <div className="text-2xl font-bold text-center mb-6 text-red-600">
          {statusMessage}
        </div>
      )}

      <div
        className="flex flex-wrap justify-center"
        style={{
          maxWidth: `${columns * 500}px`,
          gap: "8px",
          margin: "0 auto",
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
                : "bg-orange-500 text-white"
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

      <div className="mt-8">
        <AttemptsDisplay attempts={attempts} maxAttempts={maxAttempts} />
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
  