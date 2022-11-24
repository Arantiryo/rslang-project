import { useCallback, useReducer, useState } from "react";
import "../../App.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import TextbookCategories from "./Textbook-categories";
import TextbookDetails from "./Textbook-details";
import TextbookPagination from "./Textbook-pagination";
import TextbookWords from "./Textbook-words";
import { updateTextbookInfo } from "./TextbookSlice";

export enum CountActionKind {
  INCREACE = "INCREACE",
  DECREASE = "DECREASE",
  SPECIFIC = "SPECIFIC",
  RESET = "RESET",
}

interface ICountAction {
  type: CountActionKind;
  jump?: number;
}

export default function Textbook() {
  //const userInfo = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  const textbookInfo = useAppSelector((state) => state.textbookReducer);

  const [categoryIndex, setCategoryIndex] = useState(textbookInfo.group);
  const [wordIndex, setWordIndex] = useState(textbookInfo.word);
  const [totalCounts, setTotalCounts] = useState(0);
  const words: IWord[] = [];
  const [list, setList] = useState(words);

  const reducer = (count: number, action: ICountAction) => {
    switch (action.type) {
      case CountActionKind.INCREACE:
        if (categoryIndex < 6) {
          const curPage = Math.min(count + 1, 29);
          dispatch(
            updateTextbookInfo({
              group: categoryIndex,
              word: wordIndex,
              page: curPage,
            })
          );
          return curPage;
        } else {
          const curPage = Math.min(count + 1, Math.floor(totalCounts / 20));
          dispatch(
            updateTextbookInfo({
              group: categoryIndex,
              word: wordIndex,
              page: curPage,
            })
          );
          return curPage;
        }
      case CountActionKind.DECREASE:
        dispatch(
          updateTextbookInfo({
            group: categoryIndex,
            word: wordIndex,
            page: Math.max(count - 1, 0),
          })
        );
        return Math.max(count - 1, 0);
      case CountActionKind.SPECIFIC:
        dispatch(
          updateTextbookInfo({
            group: categoryIndex,
            word: wordIndex,
            page: action.jump || 0,
          })
        );
        return action.jump || 0;
      case CountActionKind.RESET:
        dispatch(
          updateTextbookInfo({ group: categoryIndex, word: wordIndex, page: 0 })
        );
        return 0;
      default:
        throw new Error();
    }
  };

  const [page, dispatchPage] = useReducer(reducer, textbookInfo.page);

  const chooseCategory = (index: number) => {
    dispatch(updateTextbookInfo({ group: index, word: wordIndex, page: page }));
    setWordIndex(0);
    setCategoryIndex(index);
  };
  const chooseWord = (index: number) => {
    dispatch(
      updateTextbookInfo({ group: categoryIndex, word: index, page: page })
    );
    setWordIndex(index);
  };
  const updateTotalCounts = useCallback(
    (index: number) => setTotalCounts(index),
    []
  );
  const resetWordId = useCallback((index: number) => setWordIndex(index), []);
  const saveList = useCallback((data: IWord[]) => setList(data), []);

  const [force, forceUpdate] = useReducer((x) => x + 1, 0);

  //console.log(userInfo.token);
  //console.log(userInfo.userId);

  return (
    <div className="flex grow items-center textbook bg-gray-800 text-white">
      <div className="container mx-auto max-w-screen-xl p-2">
        <section className="flex flex-col gap-2">
          <TextbookCategories
            categoryIndex={categoryIndex}
            onClickCategory={chooseCategory}
            resetPageIndex={dispatchPage}
          />
          <div
            className="flex flex-col gap-2 font-size: text-sm 
            md:flex-row
            lg:h-64 
          "
          >
            <TextbookWords
              page={page}
              list={list}
              force={force}
              saveList={saveList}
              categoryIndex={categoryIndex}
              wordIndex={wordIndex}
              onClickWord={chooseWord}
              updateTotalCounts={updateTotalCounts}
            />
            <TextbookDetails
              list={list}
              wordIndex={wordIndex}
              forceUpdate={forceUpdate}
              resetWordId={resetWordId}
            />
          </div>
          <div className="flex items-center justify-center">
            <TextbookPagination
              list={list}
              categoryIndex={categoryIndex}
              page={page}
              onClickPage={dispatchPage}
              resetWordId={resetWordId}
              totalCounts={totalCounts}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
