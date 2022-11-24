import { useEffect, useState } from "react";
import { cellStyle, GuessType } from "./WordleGame";

const cellCorrect = "bg-emerald-500";
const cellPresent = "bg-yellow-500";

type SubmittedGuessType = {
  guess: GuessType;
  word: string;
  wordCharMap: Record<string, number>;
};

export function SubmittedGuess({
  guess,
  word,
  wordCharMap,
}: SubmittedGuessType) {
  const [transitionValue, setTransitionValue] = useState("rotateX(0deg)");

  useEffect(() => {
    setTransitionValue("rotateX(90deg)");
    const t = setTimeout(() => setTransitionValue("rotateX(0deg)"), 0);
    return () => clearTimeout(t);
  }, []);

  const charMap = { ...wordCharMap };
  word.split("").forEach((char, i) => {
    if (word[i] === guess[i]) {
      charMap[char] -= 1;
    }
  });

  return (
    <div className="flex items-start gap-1">
      {guess.map((char, i) => {
        const isCorrect = char === word[i];
        const transitionDelay = `${i * 100}ms`;
        let isPresent = false;

        if (!isCorrect && charMap[char]) {
          isPresent = true;
          charMap[char] -= 1;
        }

        return (
          <div
            key={i}
            style={{
              transform: transitionValue,
              transitionDelay: transitionDelay,
              transitionDuration: "500ms",
            }}
            className={`${cellStyle} 
              ${
                isCorrect
                  ? cellCorrect
                  : isPresent
                  ? cellPresent
                  : "bg-gray-800"
              }`}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}
