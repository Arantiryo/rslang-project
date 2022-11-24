import { KeyboardButton } from "./KeyboardButton";

type KeyboardProps = {
  onClick: ({ key }: { key: string }) => void;
  usedChars: Record<string, string>;
};

export function Keyboard({ onClick, usedChars }: KeyboardProps) {
  const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className="mt-auto mb-2 w-full xs:w-auto">
      {keys.map((row, i) => {
        return (
          <div
            key={i}
            className="mb-[2px] xs:mb-[5px] flex gap-[2px] xs:gap-[5px] justify-center w-full"
          >
            {i === 2 && (
              <KeyboardButton letter={"Enter"} key={-1} onClick={onClick} />
            )}
            {row.split("").map((key, idx) => {
              const isCorrect = usedChars[key] === "correct";
              const isPresent = usedChars[key] === "present";
              const isMissing = usedChars[key] === "missing";

              const bgColor = isCorrect
                ? "bg-emerald-600"
                : isPresent
                ? "bg-yellow-500"
                : isMissing
                ? "bg-gray-800"
                : "";

              return (
                <KeyboardButton
                  bgColor={bgColor}
                  letter={key}
                  key={idx}
                  onClick={onClick}
                />
              );
            })}
            {i === 2 && (
              <KeyboardButton letter={"Backspace"} key={8} onClick={onClick} />
            )}
          </div>
        );
      })}
    </div>
  );
}
