import IWord from "../../interfaces/IWord";
import { AnswerType } from "../AudiocallGame/Question";
import audioSvg from "../../assets/svg/audio.svg";

type ExtraProps = {
  answers: AnswerType[];
  onClick: (answer: IWord) => void;
};

export default function Extra({ answers, onClick }: ExtraProps) {
  return (
    <div className={`flex items-center justify-center text-center py-2`}>
      <ul className={`max-w-[800px] w-full`}>
        {answers.map((answer, idx) => {
          const li = (
            <li key={idx} className="flex items-center justify-evenly">
              <img
                className="inline-block w-[22px] h-[18px] cursor-pointer mx-1"
                onClick={() => onClick(answer.correctAnswer)}
                src={audioSvg}
                alt="play audio"
              />
              <span className="text-white w-full text-[12px] hidden xs:text-[16px] xs:inline-block">
                {answer.correctAnswer.word}
              </span>
              <span className="text-white w-full">
                {answer.correctAnswer.wordTranslate}
              </span>
              <span className="text-white w-full shrink-[2]">
                {answer.isCorrect ? "✔️" : "❌"}
              </span>
            </li>
          );
          return li;
        })}
      </ul>
    </div>
  );
}
