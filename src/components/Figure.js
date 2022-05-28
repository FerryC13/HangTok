import React from "react";
import WrongLetters from "./WrongLetters";

const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length;

  return (
    <svg
      height="250"
      width="200"
      class="figure-container"
      transform="translate(150,0)"
    >
      {/* <!-- Rod --> */}
      <line x1="100" y1="20" x2="180" y2="20" />
      <line x1="100" y1="20" x2="100" y2="50" />
      <line x1="180" y1="20" x2="180" y2="230" />
      <line x1="150" y1="230" x2="200" y2="230" />

      {/* <!-- Head --> */}
      {errors > 0 && <circle cx="100" cy="70" r="20" />}
      {/* <!-- Body --> */}
      {errors > 1 && <line x1="100" y1="90" x2="100" y2="150" />}
      {/* <!-- Arms --> */}
      {errors > 2 && <line x1="100" y1="120" x2="80" y2="100" />}
      {errors > 3 && <line x1="100" y1="120" x2="120" y2="100" />}
      {/* <!-- Legs --> */}
      {errors > 4 && <line x1="100" y1="150" x2="80" y2="180" />}
      {errors > 5 && <line x1="100" y1="150" x2="120" y2="180" />}
    </svg>
  );
};

export default Figure;
