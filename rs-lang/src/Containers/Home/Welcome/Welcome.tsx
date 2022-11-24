import { MdKeyboardArrowRight } from "react-icons/md";
import LoaderButton from "../../../components/LoaderButton/LoaderButton";
import welcomeImage from "../../../assets/svg/welcome__img.svg";
import welcomePseudoElem1 from "../../../assets/svg/welcome__pseudo-elem-1.svg";
import welcomePseudoElem2 from "../../../assets/svg/welcome__pseudo-elem-2.svg";
import welcomePseudoElem4 from "../../../assets/svg/welcome__pseudo-elem-4.svg";
import welcomePseudoElem5 from "../../../assets/svg/welcome__pseudo-elem-5.svg";
import welcomePseudoElem6 from "../../../assets/svg/welcome__pseudo-elem-6.svg";
import { useHistory } from "react-router-dom";

export default function Welcome() {
  const history = useHistory();

  const handleToTextbook = () => {
    history.push("/textbook");
  };

  return (
    <div className="promo-section relative w-full">
      <img
        className="relative hidden lg:block lg:left-[400px]"
        src={welcomePseudoElem6}
        alt="pseudo element"
      />
      <img
        className="absolute hidden xxl:block xxl:top-[10px] xxl:right-[-120px]"
        src={welcomePseudoElem1}
        alt="pseudo element"
      />
      <img
        className="absolute hidden xxl:block xxl:top-[-10px] xxl:left-[-80px]"
        src={welcomePseudoElem4}
        alt="pseudo element"
      />
      <img
        className="absolute hidden xxl:block xxl:bottom-[120px] xxl:right-[220px]"
        src={welcomePseudoElem5}
        alt="pseudo element"
      />
      <div className="sm:w-2/3 lg:w-[60%]">
        <h2 className="text-xs sm:text-sm lg:text-xl leading-3 text-blue-400 tracking-widest lg:tracking-[4px] mb-1">
          Изучение английского языка
        </h2>
        <h1
          className="text-lg sm:text-2xl lg:text-6xl leading-5 lg:leading-[75px] 
        text-emerald-600 font-bold tracking-wider mb-5"
        >
          Учите новые слова каждый день
        </h1>
        <p className="text-xs sm:text-sm lg:text-xl leading-5 text-white tracking-wider">
          Увлекательные игры для тренировки слов и метод интервального повторения для запоминания
          слов
        </p>
      </div>
      <div className="relative flex items-start justify-between md:mb-10 lg:mb-0">
        <LoaderButton
          type="button"
          onClick={handleToTextbook}
          className="welcome__btn_begin relative top-5 w-18 h-7 xs:w-24 xs:h-9 lg:w-32 lg:h-14 
          bg-emerald-700 hover:bg-emerald-600 transition-colors text-white text-sm lg:text-lg px-1"
        >
          <span className="flex items-center justify-around">
            Начать <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
          </span>
        </LoaderButton>
        <img
          className="relative xs:w-60 sm:w-72 sm:bottom-[100px] md:w-80 lg:w-[620px] lg:bottom-[300px]"
          src={welcomeImage}
          alt="welcome"
        />
      </div>
      <img
        className="relative bottom-10 left-[-10px] sm:absolute sm:w-[200px] lg:w-[250px] 
        sm:bottom-[50px] sm:left-[100px] md:left-[210px] lg:left-[80px] lg:bottom-[200px]"
        src={welcomePseudoElem2}
        alt="pseudo element"
      />
    </div>
  );
}
