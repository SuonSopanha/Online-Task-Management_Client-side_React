import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds((totalSeconds) => totalSeconds + 1);
      }, 1000);
    } else if (!isActive && totalSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, totalSeconds]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTotalSeconds(0);
    setIsActive(false);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div className="flex flex-row justify-center p-2 rounded-lg space-x-2 border-2 border-gray-600 items-center bg-gray-700 text-white">
      <div className="flex flex-row space-x-2 items-center justify-center">
        <button
          onClick={handleReset}
          style={{ border: "none"}}
          className="rounded-md p-1 bg-violet-600"
        >
          <FaRedo size={16} />
        </button>
        <button

          onClick={handleStartStop}
          style={{ border: "none"}}
          className="rounded-md p-1 bg-green-600"
        >
          {isActive ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>
      </div>
      <h2>{formatTime(totalSeconds)}</h2>
    </div>
  );
};

export default Timer;
