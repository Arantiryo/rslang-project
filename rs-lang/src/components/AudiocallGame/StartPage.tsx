import { MdKeyboardArrowRight } from "react-icons/md";
import { useLocation } from "react-router-dom";
import LoaderButton from "../LoaderButton/LoaderButton";

export const categoriesList = [
  {
    name: "Beginner",
    level: "A1",
    color: "border-pink-400",
  },
  {
    name: "Easy",
    level: "A2",
    color: "border-yellow-500",
  },
  {
    name: "Normal",
    level: "B1",
    color: "border-emerald-400",
  },
  {
    name: "Medium",
    level: "B2",
    color: "border-blue-500",
  },
  {
    name: "Hard",
    level: "C1",
    color: "border-purple-500",
  },
  {
    name: "Monstrous",
    level: "C2",
    color: "border-red-500",
  },
];

const dashedBorder = "border-dashed border-2 border-red-500";

type GameStartProps = {
  categoryIndex: number;
  onSelectCategory: (index: number) => void;
  onGameBegin: () => void;
};

export default function StartPage({
  categoryIndex,
  onSelectCategory,
  onGameBegin,
}: GameStartProps) {
  const location = useLocation();

  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <div className="h-full flex flex-col justify-center">
      <div
        className={`mx-auto bg-black-rgba w-full max-w-[880px] h-[200px] xs:h-[350px] mb-10 p-4 ${dashedBorder}`}
      >
        <p className="text-yellow-500">Аудирование</p>
        <div className="pt-[20px] xs:pt-[100px] text-base font-medium">
          <h2 className="text-white text-center text-[34px] leading-[34px] xs:text-[54px] xs:leading-[54px] font-bold mb-5">
            Audio call
          </h2>
          <h4 className="text-white text-center text-base leading-[19px] tracking-widest font-bold">
            Тренировака Audio call улучшает твое восприятие речи на слух.
          </h4>
        </div>
      </div>
      {params?.category && params?.page ? (
        <StartFromTextbook onGameBegin={onGameBegin} />
      ) : (
        <CategorySelection
          categoryIndex={categoryIndex}
          onSelectCategory={onSelectCategory}
          onGameBegin={onGameBegin}
        />
      )}
    </div>
  );
}

type StartFromTextbookProps = {
  onGameBegin: () => void;
};

function StartFromTextbook({ onGameBegin }: StartFromTextbookProps) {
  return (
    <div
      className={`mx-auto flex flex-col items-center gap-[25px] bg-black-rgba w-full max-w-[880px] h-[130px] mb-2 p-4 ${dashedBorder}`}
    >
      <p className="text-white font-bold text-[18px] leading-[21px]">
        Игра начнется с текущими словами из словаря. Удачи!
      </p>
      <StartButton onGameBegin={onGameBegin} />
    </div>
  );
}

function CategorySelection({ categoryIndex, onSelectCategory, onGameBegin }: GameStartProps) {
  return (
    <div
      className={`mx-auto flex flex-col items-center gap-[25px] bg-black-rgba w-full max-w-[880px] h-[200px] mb-2 p-4 ${dashedBorder}`}
    >
      <p className="text-white font-bold text-[18px] leading-[21px]">Выберите уровень</p>
      <ul className="flex flex-wrap items-center justify-center gap-[10px]">
        {categoriesList.map((obj, index) => {
          const level = (
            <li
              key={index}
              className={`rounded-full cursor-pointer flex items-center justify-center h-[30px] w-[30px] xs:h-[50px] xs:w-[50px] text-base 
              text-white font-semibold border-2 ${obj.color} hover:translate-y-[-5px] transition
                ${index === categoryIndex && "border-emerald-600 text-emerald-600"}`}
              onClick={() => onSelectCategory(index)}
            >
              {obj.level}
            </li>
          );
          return level;
        })}
      </ul>
      <StartButton onGameBegin={onGameBegin} />
    </div>
  );
}

type StartButtonProps = {
  onGameBegin: () => void;
};

function StartButton({ onGameBegin }: StartButtonProps) {
  return (
    <LoaderButton
      type="button"
      className="audiocall__btn_begin relative w-[110px] h-[37px] font-semibold rounded-[4px]
      bg-red-500 hover:bg-red-400 transition-colors text-white text-[16px] leading-[17px]"
      onClick={onGameBegin}
    >
      <span className="pl-2 flex items-center justify-center">
        Начать <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
      </span>
    </LoaderButton>
  );
}
