import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GameStat, OptionalStat, State, UserStats } from "../../interfaces/app";
import IWord from "../../interfaces/IWord";
import { updateStatsIfNeeded } from "../../utils/Statistics";
import { updateUserStats } from "../../utils/StatisticsSlice";
import { getUserStat, getWords, updateUserStat } from "../../utils/WebClients";
import { DangerAlert } from "../Alerts/Alerts";
import { generateRandomIndexes, shuffle } from "./AudiocallGame";
import Countdown from "./Countdown";
import { updateResult } from "./latestResultSlice";
import Question, { AnswerType, QuestionType } from "./Question";

type GamePageProps = {
  categoryIndex: number;
  onGameEnd: () => void;
};

export default function GamePage({ categoryIndex, onGameEnd }: GamePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.loginReducer);
  const userStats = useAppSelector((state) => state.statsReducer);

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const saveAnswer = (newAnswer: AnswerType) => setAnswers([...answers, newAnswer]);

  const updateLocalStats = (newStats: UserStats) => dispatch(updateUserStats(newStats));

  const loadNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      dispatch(updateResult({ questions, answers, gameName: "audiocall" }));
      updateStats({ userInfo, userStats, questions, answers, updateLocalStats });
      onGameEnd();
    }
  };

  useEffect(() => {
    const t = setTimeout(() => questions.length > 0 && setIsLoading(false), 3000);
    return () => clearTimeout(t);
  }, [questions]);

  useEffect(() => {
    const getData = async (categoryIndex: number) => {
      const page = parseInt(params?.page) || Math.floor(Math.random() * 30);
      const category = parseInt(params?.category) || categoryIndex;
      const words = await getWords(page, category);

      try {
        setQuestions(createQuestions(words));
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    };

    getData(categoryIndex);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isError ? (
        <DangerAlert
          title="Упс!"
          text="Что-то пошло не так. Пожалуйста, попробуйте перезайти в игру."
        />
      ) : isLoading ? (
        <Countdown />
      ) : (
        <Question
          questionData={questions[questionIndex]}
          saveAnswer={saveAnswer}
          loadNextQuestion={loadNextQuestion}
        />
      )}
    </div>
  );
}

const createQuestions = (words: IWord[]) => {
  if (words.length === 0) {
    throw new Error("No words to create questions from!");
  }

  const numberOfQuestions = words.length;
  const shuffled = shuffle(words);

  const questions: QuestionType[] = shuffled.map((word, idx) => {
    const options = [
      word,
      ...generateRandomIndexes(numberOfQuestions, idx).map((randomIndex) => shuffled[randomIndex]),
    ];
    return { word, options };
  });
  return questions;
};

export const getLongestStreak = (answers: AnswerType[]) => {
  return answers.reduce<Record<string, number>>(
    (acc, val) => {
      if (val.isCorrect) {
        acc.current += 1;
      } else {
        acc.longest = acc.longest >= acc.current ? acc.longest : acc.current;
        acc.current = 0;
      }

      return acc;
    },
    { longest: 0, current: 0 }
  );
};

export type UpdateStatsProps = {
  userInfo: State;
  userStats: UserStats;
  questions: QuestionType[];
  answers: AnswerType[];
  updateLocalStats: (newStats: UserStats) => void;
};

const updateStats = async ({
  userInfo,
  userStats,
  questions,
  answers,
  updateLocalStats,
}: UpdateStatsProps) => {
  const rightAnswers = answers.filter((a) => a.isCorrect).length;
  const wrongAnswers = questions.length - rightAnswers;
  const learnedWords = answers.length;
  const { longest } = getLongestStreak(answers);

  const userIsLoggedIn = userInfo.userId !== "";

  userIsLoggedIn && (await updateStatsIfNeeded(userInfo.userId, userInfo.token));

  const currentStats: UserStats = userIsLoggedIn
    ? await getUserStat(userInfo.userId, userInfo.token)
    : userStats;

  const audiocallStats = currentStats && currentStats.optional.games.audiocall;
  const currentOptional = currentStats.optional;

  const calcCorrectAnswerPercent = (currentRight: number, currentWrong: number) => {
    return (
      Math.floor(
        ((currentRight + rightAnswers) /
          (currentRight + rightAnswers + currentWrong + wrongAnswers)) *
          100
      ) || 0
    );
  };

  const gameStat: GameStat = {
    longestStreak: audiocallStats.longestStreak >= longest ? audiocallStats.longestStreak : longest,
    learnedWords: audiocallStats.learnedWords + learnedWords,
    rightAnswers: audiocallStats.rightAnswers + rightAnswers,
    wrongAnswers: audiocallStats.wrongAnswers + wrongAnswers,
    correctAnswersPercent: calcCorrectAnswerPercent(
      audiocallStats.rightAnswers,
      audiocallStats.wrongAnswers
    ),
  };

  const optional: OptionalStat = {
    totalRightAnswers: currentOptional.totalRightAnswers + rightAnswers,
    totalWrongAnswers: currentOptional.totalWrongAnswers + wrongAnswers,
    totalCorrectAnswersPercent: calcCorrectAnswerPercent(
      currentOptional.totalRightAnswers,
      currentOptional.totalWrongAnswers
    ),
    date: new Date().toString(),
    games: {
      spirit: currentOptional.games.spirit,
      audiocall: gameStat,
      wordle: currentOptional.games.wordle,
    },
  };

  const newStats: UserStats = {
    learnedWords: currentStats.learnedWords + learnedWords,
    optional,
  };

  userIsLoggedIn
    ? updateUserStat(userInfo.userId, userInfo.token, newStats)
    : updateLocalStats(newStats);
};
