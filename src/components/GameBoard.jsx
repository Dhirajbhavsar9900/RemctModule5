import React, { useEffect, useState } from "react";
import { connectedWords } from "./../data"; // Replace this with your words data source

const GameBoard = ({ groupSize, itemCount, columns, attempts, setAttempts }) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [resetKey, setResetKey] = useState(0); // Unique key to trigger reset

  useEffect(() => {
    const fetchWords = () => {
      const availableGroups = connectedWords.get(groupSize) || [];
      const shuffledGroups = shuffleArray(availableGroups); // Shuffle the groups randomly
      let selectedWords = [];

      // Add full groups until itemCount is reached
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

      return shuffleArray(selectedWords); // Shuffle the final words
    };

    setWords(fetchWords());
    setSelected([]); // Clear any selected words on reset
  }, [groupSize, itemCount, resetKey]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleSelection = (selectedWord) => {
    if (selected.length < groupSize && !selected.includes(selectedWord)) {
      setSelected([...selected, selectedWord]);
    }
  };

  useEffect(() => {
    if (selected.length === groupSize) {
      const isMatch = selected.every((word) => word.group === selected[0].group);

      if (isMatch) {
        // Mark words as correct and trigger animation
        setWords((prev) =>
          prev.map((word) =>
            selected.includes(word) ? { ...word, status: "correctPending" } : word
          )
        );

        // Set a timeout to mark words as removed after 1.5 seconds (animation time)
        setTimeout(() => {
          setWords((prev) =>
            prev.filter((word) => !selected.includes(word)) // Remove matched words after animation
          );
        }, 1500); // Animation time (1.5 seconds)
      } else {
        // Mark incorrect words for visual feedback
        setWords((prev) =>
          prev.map((word) =>
            selected.includes(word) ? { ...word, status: "incorrect" } : word
          )
        );

        // Reset the incorrect visual feedback after 1 second (reset to neutral state)
        setTimeout(() => {
          setWords((prev) =>
            prev.map((word) =>
              selected.includes(word) ? { ...word, status: "neutral" } : word
            )
          );
        }, 1000); // Reset time for incorrect selection
      }

      // Clear selection and increment attempts
      setSelected([]);
      setAttempts(attempts + 1);
    }
  }, [selected]);

  const handleReset = () => {
    setAttempts(0); // Reset attempts count
    setResetKey((prev) => prev + 1); // Trigger game board reinitialization
  };

  return (
    <div className="items-center justify-center flex flex-col">
      <h1 className="text-xl font-bold text-center mb-4">
        Connect group of {groupSize} words by clicking on related words
      </h1>
      {/* Word Buttons */}
      <div
        className="flex flex-wrap justify-center"
        style={{
          maxWidth: `${columns * 500}px`,
          gap: "8px", // Reduce the space between the buttons
          margin: "0 auto", // Centers the container
          transition: "all 1.5s ease", // Smooth transition for layout change
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
                : "bg-gray-200 text-black"
            }`}
            style={{
              flex: `0 1 calc(100% / ${columns} - 10px)`, // Adjust width calculation
              minWidth: "160px", // Ensure a minimum width for the buttons
              height: "40px", // Fix the height of the buttons to be uniform
              opacity: word.status === "correctPending" ? 0 : 1, // Use opacity for smooth fade-out effect
              visibility: word.status === "correctPending" ? "hidden" : "visible", // Hide after fade-out
              transition: "opacity 1.5s ease, visibility 1.5s ease", // Apply smooth visibility and opacity transition
            }}
            onClick={() => handleSelection(word)}
          >
            {word.word}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Reset
        </button>
      </div>

      {/* Attempts Counter */}
      <p className="text-center mt-2">Attempts: {attempts}</p>
    </div>
  );
};

export default GameBoard;
