import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import { getUserHardWords, getUserWords, getWords } from "../../utils/WebClients";
import { colors } from './Textbook-data';

type Params = {
  categoryIndex: number,
  wordIndex: number,
  onClickWord: (index: number) => void,
  saveList: (data: IWord[]) => void,
  updateTotalCounts: (index: number) => void,
  list: IWord[],
  page: number,
  force: number,
}

export default function TextbookWords({ categoryIndex, wordIndex, onClickWord, saveList, list, page, force, updateTotalCounts }: Params) {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const [status, setStatus] = useState('Loading');

  useEffect(() => {
    if (userInfo.userId === "") {
      getWords(page, categoryIndex).then((list: IWord[]) => {
        setStatus('Success');
        saveList(list);
      });
    } else {
      if (categoryIndex < 6) {
        getUserWords(userInfo.userId, page, categoryIndex, userInfo.token).then((obj) => {
          setStatus('Success');
          saveList(obj[0].paginatedResults);
        })
      } else {
        getUserHardWords(userInfo.userId, page, userInfo.token).then((obj) => {
          setStatus('Success');
          saveList(obj[0].paginatedResults);
          updateTotalCounts(obj[0].totalCount[0] ? obj[0].totalCount[0].count : 0);
        })
      }
    }
  }, [categoryIndex, saveList, page, userInfo, force, updateTotalCounts])

  return (
    <div className="
      flex grow flex-wrap items-center h-52 gap-1 overflow-y-auto scroll-behavior 
      md:h-full
      lg:w-4/6 lg:h-min
    ">
      {status === 'Loading' && <div className="flex grow">
        <div className="grow shadow rounded-md w-full mx-auto">
          <div className="
          animate-pulse
          flex grow flex-wrap items-center h-52 gap-1 overflow-y-auto scroll-behavior
          md:h-full
          lg:lg:h-min"
          >
            {
              [...Array(20)].map((_, i) => {
                return (<div key={i} className="
                  bg-gray-700 border border-gray-700 w-24 max-w-xs rounded p-6
                  xs:w-32
                  md:grow
                  lg:basis-2/12 lg:min-w-0"
                >
                </div>)
              })
            }
          </div>
        </div>
      </div>}
      {status === 'Success' && list.length !== 0 && list.map((obj, index) =>
        <div
          className={
            `    
            active:border-cyan-800 active:border-solid active:border hover:opacity-70
            ${(list[index].userWord?.difficulty === 'learned') ? 'bg-green-900 border-dashed border-2 border-green-600' : ''}
            ${(list[index].userWord?.difficulty === 'hard') ? 'bg-pink-900 border-dashed border-2 border-pink-600' : ''}
            ${index === wordIndex ? `${colors[categoryIndex].bg} text-white` : ''}
              cursor-pointer bg-gray-700 border border-gray-700 w-24 max-w-xs rounded p-2
              xs:w-32
              md:grow md:max-w-[24%]
              lg:basis-2/12 lg:min-w-0 lg:max-w-[19.7%]
            `
          }
          key={index}
          onClick={() => onClickWord(index)}
        >
          <div className="truncate">{obj.word}</div>
          <div className="truncate">{obj.wordTranslate}</div>
        </div>
      )}
      {status === 'Success' && list.length === 0 &&
        <div >
          <div className="w-32">Слова отсутствуют на странице</div>
        </div>
      }
    </div>
  );
}