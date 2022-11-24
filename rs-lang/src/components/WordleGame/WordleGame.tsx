import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserStats } from "../../interfaces/app";
import { updateUserStats } from "../../utils/StatisticsSlice";
import { getWordFromDictionary } from "../../utils/WebClients";
import Delayed from "../Delayed/Delayed";
import LoaderButton from "../LoaderButton/LoaderButton";
import { CurrentGuess } from "./CurrentGuess";
import { EmptyGuess } from "./EmptyGuess";
import { Keyboard } from "./Keyboard";
import { SubmittedGuess } from "./SubmittedGuess";
import { updateWordleStats } from "./WordleStats";

export type GuessType = string[];

export const maxGuesses = 6;
export const wordLength = 5;

export const cellStyle =
  "w-[50px] h-[50px] xs:w-[60px] xs:h-[60px] flex items-center justify-center text-white text-[32px] uppercase select-none border border-gray-40";

const getWordCharCount = (word: string) =>
  word.split("").reduce<Record<string, number>>((acc, val) => {
    if (acc.hasOwnProperty(val)) {
      acc[val] += 1;
    } else {
      acc[val] = 1;
    }
    return acc;
  }, {});

export default function WordleGame({ word = "hello" }) {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [statsUpdated, setStatsUpdated] = useState(false);
  const [guess, setGuess] = useState<GuessType>([]);
  const [submittedGuesses, setSubmittedGuesses] = useState<GuessType[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [noSuchWord, setNoSuchWord] = useState(false);

  const userInfo = useAppSelector((state) => state.loginReducer);
  const userStats = useAppSelector((state) => state.statsReducer);
  const updateLocalStats = (newStats: UserStats) => dispatch(updateUserStats(newStats));

  const [usedChars, setUsedChars] = useState<Record<string, string>>({});

  const wordCharMap = getWordCharCount(word);
  const isFinished = submittedGuesses.length === maxGuesses && !isCorrect;

  // update stats after the game just once
  if (isFinished && !statsUpdated) {
    updateWordleStats({ userInfo, userStats, updateLocalStats, isCorrect });
    setStatsUpdated(true);
  }

  const showNoSuchWordWarning = () => {
    setNoSuchWord(true);
    setTimeout(() => setNoSuchWord(false), 3000);
  };

  const setChars = useCallback(
    (guess: GuessType, word: string) => {
      let tempChars = { ...usedChars };

      guess.forEach((char, i) => {
        const isCorrect = char === word[i];
        const isPresent = !isCorrect && word.includes(char);

        const charStatus = isCorrect ? "correct" : isPresent ? "present" : "missing";

        if (tempChars.hasOwnProperty(char)) {
          if (isCorrect || (isPresent && tempChars[char] !== "correct"))
            tempChars[char] = charStatus;
        } else {
          tempChars[char] = charStatus;
        }
      });

      setUsedChars(tempChars);
    },
    [usedChars]
  );

  const handleKeyDown = useCallback(
    ({ key }: { key: string }) => {
      if (isCorrect) return;

      const isChar = /^[a-z]$/.test(key);
      const isBackspace = key === "Backspace";
      const isSubmit = key === "Enter";
      const isGuessFinished = guess.length === wordLength;

      const submitGuess = () => {
        setSubmittedGuesses((prev) => [...prev, guess]);
        setGuess([]);
        setChars(guess, word);
        if (guess.join("") === word) setIsCorrect(true);
      };

      if (isBackspace) {
        setGuess((prev) => {
          const temp = [...prev];
          temp.pop();
          return temp;
        });
      } else if (isChar && !isGuessFinished) {
        setGuess((prev) => [...prev, key]);
      } else if (isGuessFinished && isSubmit && submittedGuesses.length < maxGuesses) {
        getWordFromDictionary(guess.join(""))
          .then((res) => {
            if (res?.title === "No Definitions Found") {
              showNoSuchWordWarning();
            } else {
              submitGuess();
            }
          })
          .catch((err) => {
            console.log(err);
            // skip the word check if there's a problem w/ the dictionary API or the network
            submitGuess();
          });
      }
    },
    [guess, submittedGuesses, word, isCorrect, setChars]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleReplayGame = () => {
    history.go(0);
  };

  return (
    <div className="relative h-full flex flex-col items-center pt-6">
      {noSuchWord && (
        <div className="absolute bg-black-rgba p-[2px] top-[-5px] text-white text-[16px]">
          Слова нет в словаре
        </div>
      )}
      <div className="max-w-[350px] max-h-[420px] flex flex-col gap-1 pb-5">
        {submittedGuesses.map((guess, i) => (
          <SubmittedGuess key={i} guess={guess} word={word} wordCharMap={wordCharMap} />
        ))}
        {!isCorrect && submittedGuesses.length < maxGuesses && (
          <CurrentGuess currentGuess={guess} />
        )}
        {Array.from({
          length: maxGuesses - submittedGuesses.length - (isCorrect ? 0 : 1),
        }).map((_, i) => (
          <EmptyGuess key={i} />
        ))}
      </div>
      {isFinished && (
        <Delayed>
          <span className="text-white text-[16px]">
            Ваши попытки закончились. Удачи в следующий раз!
          </span>
        </Delayed>
      )}
      {isCorrect && (
        <Delayed>
          <span className="text-white text-[16px]">Успех!</span>
        </Delayed>
      )}
      {(isFinished || isCorrect) && (
        <Delayed>
          <LoaderButton
            className="mt-2 w-[92px] h-[40px] text-base
              bg-emerald-600 hover:bg-emerald-500 transition-colors text-white"
            onClick={handleReplayGame}
          >
            Повторить
          </LoaderButton>
        </Delayed>
      )}
      <Keyboard onClick={handleKeyDown} usedChars={usedChars} />
    </div>
  );
}
