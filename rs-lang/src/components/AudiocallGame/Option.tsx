import IWord from "../../interfaces/IWord";
import { AnswerType } from "./Question";

type OptionProps = {
  word: IWord;
  answer: AnswerType | null;
  idx: number;
  onClick: () => void;
};

export const optionStyles = `w-[120px] h-[40px] xs:w-[180px] xs:h-[50px] bg-black-rgba 
  flex items-center justify-center cursor-pointer
  border border-white rounded-[56px]
  hover:border-yellow-500 transition-colors`;
export const optionTextStyles =
  "text-white uppercase text-[12px] leading-[14px] xs:text-[14px] xs:leading-[16px] tracking-wider";

export default function Option({ word, answer, idx, onClick }: OptionProps) {
  const isCorrect = answer && answer.correctAnswer.id === word.id;
  const isWrong = answer?.isCorrect === false && answer.givenAnswer.id === word.id;

  return (
    <div
      className={`${optionStyles} ${isCorrect && "bg-emerald-400"} ${isWrong && "bg-red-400"}`}
      onClick={onClick}
    >
      <span
        className={`${optionTextStyles} text-center select-none`}
      >{`${idx} ${word.wordTranslate}`}</span>
    </div>
  );
}
