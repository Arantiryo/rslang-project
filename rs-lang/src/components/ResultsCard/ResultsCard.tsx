import { useState } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdRepeat } from "react-icons/md";
import { useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import { getObjURL } from "../../utils/WebClients";
import LoaderButton from "../LoaderButton/LoaderButton";
import Extra from "./Extra";
import Results from "./Results";

export type ResultDataType = {
  title: string;
  value: number;
  color: string;
};

const colors = {
  correct: "#047857",
  incorrect: "#DC2626",
};

type MenuTabsType = "results" | "extra";

export default function ResultsTrackingCard({
  size = "ml-auto max-w-[280px] max-h-[330px]",
  font = "text-[8px] leading-[10px] xs:text-sm md:text-[16px]",
  contentSize = "max-w-[160px] max-h-[160px]",
  buttonSize = "w-14 h-4 xs:w-20 xs:h-6",
  showExtra = false,
}) {
  const [tab, setTab] = useState<MenuTabsType>("results");
  const showResultsTab = () => setTab("results");
  const showExtraTab = () => setTab("extra");
  const history = useHistory();
  const location = useLocation();

  const gameResults = useAppSelector((state) => state.latestResultReducer);
  const { questions, answers } = gameResults;
  const numCorrect = answers.filter((a) => a.isCorrect).length;
  const numIncorrect = questions.length - numCorrect;

  const playAudio = (answer: IWord) => {
    getObjURL(answer.audio).then((audioURL) => {
      const audio = new Audio(audioURL);
      audio.play();
    });
  };

  const handleToTextbook = () => {
    history.push("/textbook");
  };

  const handleReplayGame = () => {
    if (location.pathname === `/games/${gameResults.gameName}`) {
      history.go(0);
    } else {
      history.push(`/games/${gameResults.gameName}`);
    }
  };

  const data: ResultDataType[] = [
    { title: "Correct", value: numCorrect, color: colors.correct },
    { title: "Incorrect", value: numIncorrect, color: colors.incorrect },
  ];
  const resultLabel =
    Math.floor((data[0].value / (data[0].value + data[1].value)) * 100) || 0;

  return (
    <div className={`results-card w-full bg-gray-700 p-4 lg:p-5 ${size}`}>
      <ul className="list-none flex items-center justify-evenly gap-2 xs:mb-4">
        <li
          className={`${tab === "results" && "text-yellow-500 underline"
            } text-white font-medium ${font} underline-offset-4 cursor-pointer`}
          onClick={showResultsTab}
        >
          Результаты
        </li>
        {showExtra && (
          <li
            className={`${tab === "extra" && "text-yellow-500 underline"
              } text-white ${font} underline-offset-4 cursor-pointer`}
            onClick={showExtraTab}
          >
            Подробнее
          </li>
        )}
      </ul>
      {tab === "results" && (
        <Results
          data={data}
          resultLabel={resultLabel}
          contentSize={contentSize}
        />
      )}
      {tab === "extra" && (
        <Extra onClick={playAudio} answers={gameResults.answers} />
      )}
      <div className="flex items-center justify-evenly">
        <LoaderButton
          type="button"
          onClick={handleReplayGame}
          className={`results__btn_retry ${buttonSize} md:w-[110px] md:h-[36px] 
            bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mr-2`}
        >
          <span
            className={`flex items-center justify-around ${font} xs:text-xs md:text-[14px]`}
          >
            Повторить <MdRepeat className={`${font} md:text-[14px]`} />
          </span>
        </LoaderButton>
        <LoaderButton
          type="button"
          onClick={handleToTextbook}
          className={`results__btn_retry ${buttonSize} md:w-[110px] md:h-[36px]
            bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1`}
        >
          <span
            className={`flex items-center justify-around ${font} xs:text-xs md:text-[14px]`}
          >
            Учебник{" "}
            <IoReturnUpBackOutline className={`${font} md:text-[14px]`} />
          </span>
        </LoaderButton>
      </div>
    </div>
  );
}
