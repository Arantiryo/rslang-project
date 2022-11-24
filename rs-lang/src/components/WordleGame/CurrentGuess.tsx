import { useEffect, useState } from "react";
import { cellStyle, GuessType, wordLength } from "./WordleGame";

export function CurrentGuess({ currentGuess }: { currentGuess: GuessType }) {
  const [scaleClass, setScaleClass] = useState("scale-110");

  useEffect(() => {
    setScaleClass("scale-110");
    const t = setTimeout(() => setScaleClass("scale-100"), 100);
    return () => clearTimeout(t);
  }, [currentGuess]);

  return (
    <div className="flex items-start gap-1">
      {Array.from({ length: wordLength }).map((__, i) => {
        return (
          <div
            key={i}
            className={`${cellStyle} ${
              i === currentGuess.length - 1 ? scaleClass : ""
            } transition-all duration-100`}
          >
            {currentGuess[i] || ""}
          </div>
        );
      })}
    </div>
  );
}
