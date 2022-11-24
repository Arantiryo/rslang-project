import { useAppSelector } from "../../../app/hooks";
import resultsPseudoElem1 from "../../../assets/svg/results-tracking__presudo-elem-1.svg";
import resultsPseudoElem2 from "../../../assets/svg/results-tracking__presudo-elem-2.svg";
import resultsPseudoCircle from "../../../assets/svg/results-tracking__pseudo.svg";
import {
  GameAudioCall,
  GameSprint,
} from "../../../components/GameCard/GameCard";
import ResultsTrackingCard from "../../../components/ResultsCard/ResultsCard";

export default function ResultsTracking() {
  const gameResults = useAppSelector((state) => state.latestResultReducer);

  return (
    <div className="promo-section relative w-full xxl:flex xxl:flex-row-reverse xxl:justify-evenly xxl:py-20">
      <div className="pl-20 md:pl-40">
        <img
          className="absolute hidden xxl:block xxl:top-[-10px] xxl:right-[-60px]"
          src={resultsPseudoElem2}
          alt="pseudo element"
        />
        <div className="sm:w-2/3">
          <h2 className="text-lg sm:text-2xl lg:text-6xl leading-5 text-emerald-600 font-bold tracking-wider mb-5">
            Отслеживание результатов
          </h2>
          <p className="text-xs sm:text-sm lg:text-xl leading-5 text-white tracking-wider">
            Вне зависимости от того, играете ли вы или тренируете слова -
            статистика по изученным словам обновляется и всегда доступна в
            настройках.
          </p>
        </div>
        <img
          className="ml-auto relative top-[-10px] pb-2 mb-10 sm:right-[250px] sm:top-[40px] sm:w-1/6 md:right-[350px]"
          src={resultsPseudoElem1}
          alt="pseudo element"
        />
      </div>
      <div className="relative ml-auto w-3/4 max-w-[520px] flex items-baseline justify-end pb-10 sm:top-[-50px] md:right-[50px]">
        <div className="relative top-[40px] left-[80px] z-10 xs:top-[60px] lg:top-[80px]">
          {gameResults.gameName === "audiocall" ? (
            <GameAudioCall />
          ) : (
            <GameSprint />
          )}
        </div>
        <div className="relative z-10 lg:bottom-[10px] lg:left-[20px] ">
          <ResultsTrackingCard />
        </div>
        <img
          className="absolute w-5/6 h-5/6 bottom-[-10px] left-[20px] sm:bottom-[-50px] sm:left-[90px] xxl:bottom-[-5px]"
          src={resultsPseudoCircle}
          alt="pseudo element"
        />
      </div>
    </div>
  );
}
