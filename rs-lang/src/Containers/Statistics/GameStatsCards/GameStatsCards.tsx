import {
  GameStatsAudioCall,
  GameStatsSprint,
  GameStatsWordle,
} from "../../../components/GameStatsCard/GameStatsCard";
import { GameStat } from "../../../interfaces/app";
import { defaultGameStat } from "../../../utils/Statistics";

type GameStatsCardsProps = {
  className: string;
  games: {
    spirit: GameStat;
    audiocall: GameStat;
    wordle: GameStat;
  };
};

export default function GameStatsCards({ className, games }: GameStatsCardsProps) {
  return (
    <div className={`${className} relative flex justify-center md:justify-start gap-3 flex-wrap`}>
      <div className="relative">
        <GameStatsSprint stats={games.spirit || defaultGameStat} />
      </div>
      <div className="relative">
        <GameStatsAudioCall stats={games.audiocall || defaultGameStat} />
      </div>
      <div className="relative">
        <GameStatsWordle stats={games.wordle || defaultGameStat} />
      </div>
    </div>
  );
}
