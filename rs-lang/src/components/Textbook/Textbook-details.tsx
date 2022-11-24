import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import IWord from "../../interfaces/IWord";
import { createUserWord, deleteUserWord, getObjURL } from "../../utils/WebClients";

type Params = {
  wordIndex: number;
  list: IWord[];
  forceUpdate: () => void;
  resetWordId: (index: number) => void;
};

export default function TextbookDetails({ wordIndex, list, forceUpdate, resetWordId }: Params) {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const [status, setStatus] = useState("Loading");
  const [img, setImg] = useState("");
  const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    if (list.length !== 0) {
      const imgFileName = list[wordIndex] ? list[wordIndex].image : '';
      const audioFileName = list[wordIndex] ? list[wordIndex].audio : '';
      if (imgFileName) {
        getObjURL(imgFileName).then((imgObj) => {
          setStatus("Success");
          setImg(imgObj);
        });
        getObjURL(audioFileName).then((audioURL) => {
          setAudioURL(audioURL);
        });
      }
    }
  }, [wordIndex, list]);

  const setWordStatus = (type: string) => {
    const userId = userInfo.userId;
    const token = userInfo.token;
    const wordId = list[wordIndex]._id || '';
    const word = { difficulty: type, optional: {} };

    createUserWord({ userId, wordId, word, token }).then(() => {
      forceUpdate();
    });

  }

  const handlePlayAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  }

  const removeWordStatus = () => {
    const userId = userInfo.userId;
    const wordId = list[wordIndex]._id || '';
    const token = userInfo.token;
    deleteUserWord({ userId, wordId, token }).then(() => {
      resetWordId(0);
      forceUpdate();
    });
  }

  const renderButtons = () => {
    switch (list[wordIndex] ? list[wordIndex].userWord?.difficulty : '') {
      case 'learned': return (
        <button
          className="
          flex items-center relative border 
          rounded-full h-7 p-2 mt-4 border-green-400 bg-green-900
          hover:opacity-80
          "
          onClick={() => removeWordStatus()}>
          <span className="flex gap-1 items-center justify-between">
            <AiOutlineMinus />убрать из изуч.
          </span>
        </button>
      )
      case 'hard': return (
        <button
          className="
          flex items-center relative border 
          border-pink-400 bg-pink-900 rounded-full h-7 p-2 mt-4
          hover:opacity-80
          "
          onClick={() => removeWordStatus()}>
          <span className="flex gap-1 items-center justify-between">
            <AiOutlineMinus />убрать из сложн.
          </span>
        </button>
      )
      default:
        return (
          <div className="flex flex-wrap items-center gap-1 mt-4">
            <button
              className="
              flex items-center relative border 
              rounded-full h-7 p-2 border-pink-400 bg-pink-900
              hover:opacity-80
              "
              onClick={() => setWordStatus('hard')}>
              <span className="flex truncate gap-1 items-center justify-between">
                <AiOutlinePlus />сложн. слова
              </span>

            </button>
            <button
              className="
              flex items-center relative 
              border rounded-full h-7 p-2 border-green-400 bg-green-900
              hover:opacity-80
              "
              onClick={() => setWordStatus('learned')}>
              <span className="flex gap-1 items-center justify-between">
                <AiOutlinePlus />изучено
              </span>
            </button>
          </div>
        );
    }
  }

  return (
    <div>
      {status === "Loading" && (
        <div className="border border-gray-700 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="w-60 flex-1 space-y-6 py-1">
              <div className="h-48 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-2 bg-slate-700 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "Success" && list.length !== 0 && (
        <div
          className="max-w-xs border rounded border-gray-700 bg-gray-700 p-3
          md:w-72
        "
        >
          <div>
            <div className="relative h-44 before:shadow-3xl before:shadow-zinc-900/90 before:absolute before:inset-0">
              <img
                className="max-w-full w-full h-full max-h-full object-cover"
                src={img}
                alt="word"
              />

              <div className="flex flex-col">
                <div className="z-10 relative left-2 bottom-7">
                  <BsFillVolumeUpFill className="cursor-pointer text-xl hover:opacity-80" onClick={handlePlayAudio} />
                </div>
                <div>
                  <div className="flex truncate gap-2 absolute bottom-7 right-2">
                    <span>{(list[wordIndex]) ? list[wordIndex].transcription : ''}</span>
                    <span>{list[wordIndex] ? list[wordIndex].word : ''}</span>
                  </div>
                  <div className="relative text-right right-2 bottom-12 truncate pl-4">
                    {(list[wordIndex]) ? list[wordIndex].wordTranslate : ''}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div>
            <div className="my-2">Значение</div>
            <div
              className="my-1 text-slate-300"
              dangerouslySetInnerHTML={{ __html: list[wordIndex] ? list[wordIndex].textMeaning : '' }}
            ></div>
            <div className="my-1 text-sky-300">
              {(list[wordIndex]) ? list[wordIndex].textMeaningTranslate : ''}
            </div>
          </div>
          <div>
            <div className="my-2">Пример</div>
            <div
              className="my-1 text-slate-300"
              dangerouslySetInnerHTML={{ __html: list[wordIndex] ? list[wordIndex].textExample : '' }}
            ></div>
            <div className="my-1 text-sky-300">
              {(list[wordIndex]) ? list[wordIndex].textExampleTranslate : ''}
            </div>
          </div>

          {userInfo.userId !== '' && renderButtons()}
        </div>
      )}
    </div>
  );
}
