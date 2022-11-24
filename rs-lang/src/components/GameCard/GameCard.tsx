import { Link } from "react-router-dom";
import imgAudioCall from "../../assets/images/card__audio-call.png";
import imgSprint from "../../assets/images/card__sprint.png";
import imgWordle from "../../assets/images/card__wordle.png";

type GameProps = {
  gameType: string;
  name: string;
  description: string;
  picture: string;
};

export function GameCard({ gameType, name, description, picture }: GameProps) {
  return (
    <div
      className={`relative flex items-center justify-between max-w-[300px] max-h-[80px] sm:max-h-[120px] aspect-[5/2] 
      bg-gray-700 rounded-md w-[170px] xs:w-[210px] sm:w-[300px] gap-1 p-2 sm:gap-2
      hover:scale-110 hover:translate-y-[-30px] transition duration-500 ease-in-out`}
    >
      <div className={`overflow-hidden grow-2 sm:h-full`}>
        <p
          className={`text-yellow-500 font-medium text-[8px] leading-[10px] sm:text-[12px] sm:leading-[15px] sm:mb-2`}
        >
          {gameType}
        </p>
        <h4
          className={`text-white font-semibold tracking-[1px] text-[10px] leading-[11px] sm:text-[16px] sm:leading-[19px] sm:mb-2`}
        >
          {name}
        </h4>
        <p
          className={`text-white font-medium text-[8px] leading-[10px] sm:text-[11px] sm:leading-[13px]`}
        >
          {description}
        </p>
      </div>
      <img
        className="block rounded-md w-full h-full grow"
        src={picture}
        alt="card"
      />
    </div>
  );
}

export function GameSprint() {
  return (
    <Link to="/games/sprint">
      <GameCard
        gameType="Перевод на скорость"
        name="Sprint"
        description="Как можно быстрее определи верный перевод слова перед тобой или нет."
        picture={imgSprint}
      />
    </Link>
  );
}
export function GameAudioCall() {
  return (
    <Link to="/games/audiocall">
      <GameCard
        gameType="Аудирование"
        name="Audio call"
        description="Улучшает восприятие английской речи на слух."
        picture={imgAudioCall}
      />
    </Link>
  );
}
export function GameWordle() {
  return (
    <Link to="/games/wordle">
      <GameCard
        gameType="Угадай слово"
        name="Wordle"
        description="Угадай слово из пяти букв. Улучшает словарный запас."
        picture={imgWordle}
      />
    </Link>
  );
}
