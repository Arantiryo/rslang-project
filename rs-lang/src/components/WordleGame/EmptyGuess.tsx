import { cellStyle, wordLength } from "./WordleGame";

export function EmptyGuess() {
  return (
    <div className="flex items-start gap-1">
      {Array.from({ length: wordLength }).map((__, i) => {
        return (
          <div key={i} className={cellStyle}>
            {""}
          </div>
        );
      })}
    </div>
  );
}
