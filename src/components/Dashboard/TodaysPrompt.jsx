import React from "react";

function TodaysPrompt() {
  return (
    <div
      className={`p-4 lg:p-6 mx-4 lg:mx-6 mb-6 rounded-lg ${
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <h2 className="font-semibold mb-3">Today&apos;s Prompt</h2>
      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
        What are three things that happened today that made you smile?
      </p>
    </div>
  );
}

export default TodaysPrompt;
