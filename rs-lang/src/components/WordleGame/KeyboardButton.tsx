import { IoBackspaceOutline } from "react-icons/io5";

type KeyboardButtonProps = {
  letter: string;
  onClick: ({ key }: { key: string }) => void;
  bgColor?: string;
};

export function KeyboardButton({
  letter,
  onClick,
  bgColor = "",
}: KeyboardButtonProps) {
  const key = letter;
  return (
    <button
      onClick={() => onClick({ key })}
      className={`xs:h-[60px] xs:min-w-[43px] p-[8px] xs:p-[14px] text-white text-[12px] xs:text-[16px] font-medium rounded-md cursor-pointer 
      hover:bg-gray-400 uppercase select-none flex items-center justify-center grow xs:grow-0
        transition-colors duration-300 ${bgColor ? bgColor : "bg-gray-500"}`}
    >
      {letter !== "Backspace" ? (
        letter
      ) : (
        <span className="text-[16px] xs:text-[24px]">
          <IoBackspaceOutline />
        </span>
      )}
    </button>
  );
}
