import { MdKeyboardArrowRight } from "react-icons/md";
import { useHistory } from "react-router-dom";
import pseudoElem1 from "../../../assets/svg/minigames__pseudo-1.svg";
import pseudoZip from "../../../assets/svg/minigames__pseudo-zip.svg";
import { GameAudioCall, GameSprint, GameWordle } from "../../../components/GameCard/GameCard";
import LoaderButton from "../../../components/LoaderButton/LoaderButton";

export default function MiniGames() {
  const history = useHistory();

  const handleToGames = () => {
    history.push("/games");
  };

  return (
    <div className="minigames-section relative w-full sm:w-2/3 xxl:w-full xxl:flex xxl:py-20">
      <div className="xxl:w-1/3">
        <img
          className="absolute hidden xxl:block xxl:top-[-120px] xxl:left-[-160px]"
          src={pseudoElem1}
          alt="pseudo element"
        />
        <h3 className="text-xs sm:text-sm lg:text-xl leading-3 text-blue-400 tracking-widest mb-1">
          Каталог мини-игр
        </h3>
        <h2 className="text-lg sm:text-2xl lg:text-6xl leading-5 text-emerald-600 font-bold tracking-wider mb-5">
          Разнообразные игры для обучения
        </h2>
        <p className="text-xs sm:text-sm lg:text-xl leading-5 text-white mb-2">
          Проведите время с пользой, закрепите и обновите ваши лингвистические навыки с помощью игр,
          которые не дадут заскучать и сохранят мотивацию к изучению английского языка.
        </p>
        <LoaderButton
          type="button"
          onClick={handleToGames}
          className="minigames__btn_begin relative w-18 h-7 xs:w-24 xs:h-9 text-sm lg:w-32 lg:h-14 lg:text-lg 
        bg-emerald-700 hover:bg-emerald-600 transition-colors text-white px-1 mb-5"
          isLoading={false}
          disabled={false}
        >
          <span className="flex items-center justify-around">
            Начать <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
          </span>
        </LoaderButton>
      </div>
      <div
        className="pt-10 relative flex flex-col items-center 
        sm:bottom-[50px] sm:left-[200px] md:left-[250px] lg:left-[320px] xl:left-[420px] xxl:top-[120px] xxl:left-[220px]"
      >
        <img
          className="absolute hidden xs:block xs:top-[80px] xs:left-[20px] sm:top-[120px] sm:left-[-20px] 
            lg:top-[120px] lg:left-[120px] xxl:left-[-120px]"
          src={pseudoZip}
          alt="pseudo element"
        />
        <div className="rotate-12 relative">
          <GameSprint />
        </div>
        <div className="rotate-12 relative top-[-30px]">
          <GameAudioCall />
        </div>
        <div className="rotate-12 relative top-[-60px]">
          <GameWordle />
        </div>
      </div>
    </div>
  );
}
