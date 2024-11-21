import React, { useState, useEffect } from "react";
import { connectedWords } from "./../data"; // Assuming connectedWords is imported from data.js
import AttemptsDisplay from "./AttemptsDisplay"; // Assuming this is a custom component for displaying attempts

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
  const [statusMessage, setStatusMessage] = useState(""); // Initially empty to hide the message
  const [winCount, setWinCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Track if game is started
  const [isFirstGame, setIsFirstGame] = useState(true); // Track if it's the first game

  const getNumberOfTiles = () => {
    if (itemCount === 4) return 8;
    if (itemCount === 6) return 12;
    if (itemCount === 8) return 16;
    if (itemCount === 10) return 20;
    if (itemCount === 12) return 44;
    return 20;
  };

  useEffect(() => {
    const fetchWords = () => {
      const availableGroups = connectedWords.get(groupSize) || [];
      const shuffledGroups = shuffleArray(availableGroups);
      let selectedWords = [];

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

    if (gameStarted) {
      setWords(fetchWords());
      setSelected([]);
      setStatusMessage(""); // Reset status message to empty on game reset
    }
  }, [groupSize, itemCount, resetKey, gameStarted]);

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
            selected.includes(word) ? { ...word, status: "correct" } : word // Change status to 'correct' after the match
          )
        );
        setTimeout(() => {
          setWords((prev) =>
            prev.filter((word) => !selected.includes(word)) // Remove matched words from display
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
    const isGameCompleted = words.every((word) => word.status === "correct");

    if (isGameCompleted) {
      setStatusMessage("🎉 Congratulations! You Win! 🎉");
      setWinCount((prevCount) => prevCount + 1); // Increment win count
    } else if (attempts >= maxAttempts) {
      setStatusMessage("😢 Game Over! You Lose! 😢");

      // Automatically reload the page if the user loses
      setTimeout(() => {
        window.location.reload(); // Page reload
      }, 1500); // Wait 1.5 seconds before reload to show the "Game Over" message
    }
  }, [words, attempts, maxAttempts]);

  const handleReset = () => {
    setAttempts(0);
    setResetKey((prev) => prev + 1);
    setStatusMessage(""); // Status message is cleared only after reset and game start
    setGameStarted(false); // Reset game started flag
    setIsFirstGame(false); // Mark that the game is no longer the first game after reset
  };

  const handleStartGame = () => {
    setGameStarted(true); // Set game as started
    setStatusMessage(""); // Clear the status message when starting a new game
  };

  return (
    <div className="items-center h-screen justify-center flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4">
        Connect group of {groupSize} words by clicking on related words
      </h1>

      {/* Only display the message if the game is over or win */}
      {gameStarted && (
        <div
          className={`text-2xl font-bold text-center mb-6 ${
            statusMessage ? "block text-red-600" : "hidden"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <div
        className="flex flex-wrap justify-center"
        style={{
          maxWidth: `${columns * 500}px`, // Dynamic max width based on columns
          gap: "8px",
          margin: "0 auto",
        }}
      >
        {words.map((word, index) => (
          <button
            key={index}
            className={`p-2 border rounded shadow text-center transition duration-300 ease-in-out ${
              word.status === "correct"
                ? "bg-green-500 text-white opacity-0 invisible" // Fade out the tile
                : word.status === "incorrect"
                ? "bg-red-500 text-white"
                : word.status === "correctPending"
                ? "bg-green-500 text-white opacity-100"
                : selected.includes(word)
                ? "bg-blue-500 text-white"
                : "bg-orange-500 text-white"
            }`}
            style={{
              flex: `0 1 calc(100% / ${columns} - 10px)`, // Dynamic columns
              minWidth: "160px",
              height: "40px",
              transition: "opacity 1.5s ease, visibility 1.5s ease", // Smooth fade-out effect
            }}
            onClick={() => handleSelection(word)}
          >
            {word.word}
          </button>
        ))}
      </div>

      <div className="flex justify-center m-2 flex-col">
        <AttemptsDisplay attempts={attempts} maxAttempts={maxAttempts} />
        <button
          onClick={gameStarted ? handleReset : handleStartGame}
          className={`px-4 py-2 mb-2 text-white rounded-lg shadow-lg transition-colors duration-300 ${
            gameStarted || !isFirstGame
              ? "bg-red-600 hover:bg-red-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {gameStarted ? "Reset Game" : isFirstGame ? "Start Game" : "Start Game"}
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
