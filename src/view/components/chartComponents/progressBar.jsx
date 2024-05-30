import React from "react";

const ProgressBar = ({ title, percentage, color }) => {
  const colorMap = {
    primary: "rgba(54, 162, 235, 1)",
    success: "rgba(75, 192, 192, 1)",
    warning: "rgba(255, 205, 86, 1)",
    danger: "rgba(255, 99, 132, 1)",
    notstart: "rgba(153, 102, 255, 1)",
    progress: "rgba(255, 159, 64, 1)"
  };

  const colorStyle = colorMap[color] || colorMap.primary;

  return (
    <div className="mb-4 mx-10">
      <div className="flex justify-between mb-1">
        <span className={`text-xs font-normal dark:text-white`} style={{ color: colorStyle }}>
          {title}
        </span>
        <span className={`text-xs font-normal dark:text-white`} style={{ color: colorStyle }}>
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1dark:bg-gray-700">
        <div
          className="h-1 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: colorStyle }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
