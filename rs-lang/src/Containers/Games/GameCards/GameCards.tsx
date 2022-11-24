import {
  GameAudioCall,
  GameSprint,
  GameWordle,
} from "../../../components/GameCard/GameCard";
import pseudo1 from "../../../assets/svg/games__pseudo1.svg";
import pseudo2 from "../../../assets/svg/games__pseudo2.svg";

export default function GameCards({ className }: { className: string }) {
  return (
    <div className={`${className} relative flex gap-3 flex-wrap`}>
      <img
        className="absolute hidden md:block md:top-[220px] md:right-[220px]"
        src={pseudo1}
        alt="pseudo element"
      />
      <img
        className="absolute hidden md:block md:top-[350px] md:right-[390px]"
        src={pseudo2}
        alt="pseudo element"
      />
      <div className="relative">
        <GameSprint />
      </div>
      <div className="relative">
        <GameAudioCall />
      </div>
      <div className="relative">
        <GameWordle />
      </div>
    </div>
  );
}
