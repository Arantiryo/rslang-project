import imgSprint from "../../assets/images/card__sprint.png";
import imgAudioCall from "../../assets/images/card__audio-call.png";
import imgWordle from "../../assets/images/card__wordle.png";
import { BsCheckCircleFill, BsCheckLg, BsFillBarChartFill } from "react-icons/bs";
import { GameStat } from "../../interfaces/app";

type GameProps = {
  name: string;
  picture: string;
  stats: GameStat;
};

export function GameStatsCard({ name, picture, stats }: GameProps) {
  return (
    <div
      className={`relative flex items-center justify-start max-w-[280px] max-h-[130px] 
      bg-gray-700 rounded-md p-[10px] overflow-hidden
      `}
    >
      <div className={`overflow-hidden min-w-[170px] sm:h-full`}>
        <h4 className={`text-white font-semibold tracking-[1px] text-[18px] leading-[21px] mb-2`}>
          {name}
        </h4>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <BsCheckCircleFill /> {`Изучено ${stats.learnedWords} слов`}
          </span>
        </p>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <BsCheckLg /> {`Правильных ответов: ${stats.correctAnswersPercent}%`}
          </span>
        </p>
        <p className={`text-white font-medium text-[12px] leading-[14px] mb-2`}>
          <span className="flex gap-1">
            <span className="text-[14px]">
              <BsFillBarChartFill />
            </span>{" "}
            {`Самая длинная серия правильных ответов: ${stats.longestStreak}`}
          </span>
        </p>
      </div>
      <img
        className="relative inline-block max-w-1/3 w-[120px] h-[120px] rounded-full top-[30px] left-[20px]"
        src={picture}
        alt="card"
      />
    </div>
  );
}

export function GameStatsSprint({ stats }: { stats: GameStat }) {
  return <GameStatsCard name="Sprint" picture={imgSprint} stats={stats} />;
}
export function GameStatsAudioCall({ stats }: { stats: GameStat }) {
  return <GameStatsCard name="Audio call" picture={imgAudioCall} stats={stats} />;
}
export function GameStatsWordle({ stats }: { stats: GameStat }) {
  return <GameStatsCard name="Wordle" picture={imgWordle} stats={stats} />;
}
