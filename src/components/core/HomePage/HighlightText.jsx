import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-primary via-primary-focus to-secondary text-transparent bg-clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
