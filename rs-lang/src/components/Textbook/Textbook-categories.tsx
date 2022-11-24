import { useAppSelector } from "../../app/hooks";
import { CountActionKind } from "./Textbook";
import { caterogriesList, colors } from "./Textbook-data";

type Params = {
  categoryIndex: number;
  onClickCategory: (index: number) => void;
  resetPageIndex: (index: { type: CountActionKind; jump?: number }) => void;
};

export default function TextbookCategories({
  categoryIndex,
  onClickCategory,
  resetPageIndex,
}: Params) {
  const userInfo = useAppSelector((state) => state.loginReducer);

  return (
    <div
      className="
      flex flex-col gap-3
      lg:flex-row"
    >
      <div>
        <div className="text-base font-bold tracking-wider text-green-700">
          Учебник
        </div>
        <div className="text-sm text-indigo-400">Уровень сложности</div>
      </div>
      <ul className="flex gap-2 overflow-x-auto text-xs">
        {caterogriesList.map((obj, index) => {
          return index !== caterogriesList.length - 1 ? (
            <li
              className={`flex relative min-w-max rounded bg-gray-700 border-gray-700 items-center 
                justify-between gap-3 p-2 border cursor-pointer h-12 overflow-hidden xxl:w-32
                ${
                  index === categoryIndex
                    ? `${colors[categoryIndex].bg} text-white `
                    : "opacity-40"
                }`}
              key={index}
              onClick={() => {
                resetPageIndex({ type: CountActionKind.RESET, jump: 0 });
                onClickCategory(index);
              }}
            >
              <div>
                <div>{obj.name}</div>
                <div>{obj.title}</div>
              </div>
              <div className="relative z-10">{obj.level}</div>
              <div
                className={`absolute rounded-full -right-6 -bottom-1 w-14 h-14 z-0 ${`${
                  index === categoryIndex
                    ? "bg-gray-700 bg-gray-900"
                    : `${colors[index].bg} `
                }`}`}
              ></div>
            </li>
          ) : (
            userInfo.userId && (
              <li
                className={`flex relative min-w-max rounded bg-gray-700 border-gray-700 items-center 
                justify-between gap-3 p-2 border cursor-pointer h-12 overflow-hidden xxl:w-32
                ${
                  index === categoryIndex
                    ? `${colors[categoryIndex].bg} text-white `
                    : "opacity-40"
                }`}
                key={index}
                onClick={() => {
                  resetPageIndex({ type: CountActionKind.RESET, jump: 0 });
                  onClickCategory(index);
                }}
              >
                <div>
                  <div>{obj.name}</div>
                  <div>{obj.title}</div>
                </div>
                <div className="relative z-10">C</div>
                <div
                  className={`absolute rounded-full -right-6 -bottom-1 w-14 h-14 z-0 ${`${
                    index === categoryIndex
                      ? "bg-gray-700 bg-gray-900"
                      : `${colors[index].bg} `
                  }`}`}
                ></div>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
