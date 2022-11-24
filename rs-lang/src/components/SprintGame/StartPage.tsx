import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import LoaderButton from "../LoaderButton/LoaderButton";
import { categoriesList } from "./SprintGame-data";

const dashedBorder = "border-dashed border-2 border-blue-500";

export default function StartPage(props: {
  categoryIndex: number,
  onClickCategory: (index: number) => void,
  onGameBegin: () => void,
}) {
  return (
    <div className="h-full flex flex-col justify-center">
      <div
        className={`mx-auto bg-black-rgba w-full max-w-[880px] h-[200px] xs:h-[350px] mb-10 p-4 ${dashedBorder}`}
      >
        <p className="text-yellow-500">Перевод на скорость</p>
        <div className="pt-[20px] xs:pt-[100px] text-base font-medium">
          <h2 className="text-white text-center text-[34px] leading-[34px] xs:text-[54px] xs:leading-[54px] font-bold mb-5">
            Sprint
          </h2>
          <h4 className="text-white text-center text-base leading-[19px] tracking-widest font-bold">
            Тренировака Sprint - тренировка на скорость. Попробуй угадать как можно больше слов за 30 секунд.
          </h4>
        </div>
      </div>
      <CategorySelection
        categoryIndex={props.categoryIndex}
        onClickCategory={props.onClickCategory}
        onGameBegin={props.onGameBegin}
      />
    </div>
  );
}

function CategorySelection(props: {
  categoryIndex: number,
  onClickCategory: (index: number) => void,
  onGameBegin: () => void,
}) {
  return (
    <div
      className={`mx-auto flex flex-col items-center gap-[25px] bg-black-rgba w-full max-w-[880px] h-[200px] mb-2 p-4 ${dashedBorder}`}
    >
      <p className="text-white font-bold text-[18px] leading-[21px]">
        Выберите уровень
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-[10px]">
        {categoriesList.map((obj, index) => {
          const level = (
            <li
              key={index}
              className={`rounded-full cursor-pointer flex items-center justify-center h-[30px] w-[30px] xs:h-[50px] xs:w-[50px] text-base 
              text-white font-semibold border-2 ${obj.color
                } hover:translate-y-[-5px] transition
                ${index === props.categoryIndex &&
                "border-emerald-600 text-emerald-600"
                }`}
              onClick={() => props.onClickCategory(index)}
            >
              {obj.level}
            </li>
          );
          return level;
        })}
      </ul>
      <LoaderButton
        type="button"
        className="audiocall__btn_begin relative w-[110px] h-[37px] font-semibold rounded-[4px]
          bg-blue-500 hover:bg-blue-400 transition-colors text-white text-[16px] leading-[17px]"
        onClick={props.onGameBegin}
      >
        <span className="pl-2 flex items-center justify-center">
          Начать <MdKeyboardArrowRight className="text-lg lg:text-3xl" />
        </span>
      </LoaderButton>
    </div>
  );
}