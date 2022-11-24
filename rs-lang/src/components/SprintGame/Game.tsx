import { useCallback, useEffect, useState } from 'react';
import { MdAccessTimeFilled, MdArrowLeft, MdArrowRight, MdCheck, MdClear, MdFavoriteBorder, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { useTimer } from 'use-timer';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import correctSound from '../../assets/sound/correct.mp3';
import wrongSound from '../../assets/sound/wrong.mp3';
import { GameStat, OptionalStat, UserStats } from '../../interfaces/app';
import { updateStatsIfNeeded } from '../../utils/Statistics';
import { updateUserStats } from '../../utils/StatisticsSlice';
import { getUserStat, updateUserStat } from '../../utils/WebClients';
import { getLongestStreak, UpdateStatsProps } from '../AudiocallGame/GamePage';
import { updateResult } from '../AudiocallGame/latestResultSlice';
import { AnswerType, QuestionType } from '../AudiocallGame/Question';

export default function Question(props: {
  onGameEnd: () => void,
  questions: QuestionType[],
}) {
  const { time } = useTimer({
    initialTime: 30, endTime: 0, timerType: 'DECREMENTAL', autostart: true,
    onTimeOver: () => {
      dispatch(updateResult({ questions: props.questions, answers, gameName: "sprint" }));
      updateStats({ userInfo, userStats, questions: props.questions, answers, updateLocalStats });
      props.onGameEnd()
    },
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, true);
    return () => { document.removeEventListener("keydown", handleKeyPress, true) };
  });

  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [sound, setSound] = useState(true);
  const [tries, setTries] = useState(4);
  const [combo, setCombo] = useState(0);
  const [boost, setBoost] = useState(1);
  const [score, setScore] = useState(0);

  const userInfo = useAppSelector((state) => state.loginReducer);
  const userStats = useAppSelector((state) => state.statsReducer);

  const toggleSound = () => (sound === true) ? setSound(false) : setSound(true);
  const playAudio = (status: boolean) => (status === true) ? new Audio(correctSound).play() : new Audio(wrongSound).play();
  const updateLocalStats = useCallback((newStats: UserStats) => dispatch(updateUserStats(newStats)), [dispatch]);

  const loadNextQuestion = useCallback((status: boolean, lastAnswerObj: AnswerType) => {
    const restTries = (status === true) ? tries : tries - 1;
    if (questionIndex < props.questions.length - 1 && restTries > 0) {
      setQuestionIndex(questionIndex + 1)
    } else {
      props.onGameEnd();
      dispatch(updateResult({ questions: props.questions, answers: [...answers, lastAnswerObj], gameName: "sprint" }));
      updateStats({ userInfo, userStats, questions: props.questions, answers, updateLocalStats });
    }
  }, [props, questionIndex, tries, answers, dispatch, updateLocalStats, userInfo, userStats]);

  const updatePanel = useCallback((status: boolean) => {
    switch (status) {
      case true:
        setCombo(combo + 1);
        setBoost(boost * 2);
        setScore(10 * boost + score);
        break;
      case false:
        setTries(tries - 1)
        setCombo(0);
        setBoost(1);
        break;
      default: break;
    }
  }, [boost, combo, score, setTries, tries]);

  const saveAnswer = useCallback((newAnswer: AnswerType) => setAnswers([...answers, newAnswer]), [answers]);

  const checkAnswer = useCallback((optIndex: number) => {
    const wordObj = props.questions[questionIndex];
    const status = (wordObj.word.wordTranslate === wordObj.options[optIndex].wordTranslate) ? true : false;

    const answerObj: AnswerType = {
      correctAnswer: props.questions[questionIndex].word,
      givenAnswer: props.questions[questionIndex].options[optIndex],
      isCorrect: props.questions[questionIndex].word.id === props.questions[questionIndex].options[optIndex].id
    }

    saveAnswer(answerObj);

    if (sound) playAudio(status);
    updatePanel(status);
    loadNextQuestion(status, answerObj);
  }, [loadNextQuestion, props.questions, questionIndex, sound, updatePanel, saveAnswer]);

  const handleKeyPress = useCallback(event => {
    const { key } = event;
    if (key === 'ArrowLeft') checkAnswer(0);
    if (key === 'ArrowRight') checkAnswer(1);
  }, [checkAnswer]);

  return <>
    <div className='flex items-center justify-between'>
      <div className='flex gap-2 bg-gray-900 bg-opacity-75 p-4 border-dashed border'>
        {[...Array(tries)].map((_, i) => <div className='text-lg sm:text-2xl' key={i}><MdFavoriteBorder className='fill-red-700' /></div>)}
      </div>
      <div className='bg-gray-900 bg-opacity-75 p-4 border-dashed border cursor-pointer' onClick={toggleSound}>
        {sound === true && <MdVolumeUp className='text-lg sm:text-2xl fill-white' >on</MdVolumeUp>}
        {sound === false && <MdVolumeOff className='text-lg sm:text-2xl fill-white'>off</MdVolumeOff>}
      </div>
    </div>
    <div className='flex flex-col items-center gap-3'>
      <div className='bg-gray-900 bg-opacity-75 border-dashed border p-2 sm:p-4 text-white text-xl'><span>{questionIndex + 1}</span>/{props.questions.length}</div>
      <div className='inline-flex gap-2 bg-gray-900 bg-opacity-75 flex-col justify-center items-center p-4 border-dashed border'>
        <div><MdAccessTimeFilled className='fill-white text-4xl sm:text-7xl' /></div>
        <div className='text-xl sm:text-4xl text-white'>{time}</div>
      </div>
      <div className='flex flex-col items-center justify-center gap-2 xs:flex-row'>
        <div className='border-2 p-2 px-4 rounded-full bg-gray-900 bg-opacity-75 text-white'>Умножение <MdClear className='inline-flex' />
          <span>{boost}</span> + <span>10</span>
        </div>
        <div className='border-2 p-2 px-4 rounded-full bg-green-500 text-white'>Очки: <span>{score}</span></div>
      </div>
      <div className='flex justify-center items-center relative bg-gray-900 bg-opacity-75 border border-dashed w-24 h-16 sm:w-32 sm:h-24'>
        <div className='absolute right-2 top-2'>
          <div className='inline-flex items-center justify-center bg-yellow-400 rounded-full w-5 h-5 sm:w-6 sm:h-6 text-sm sm:text'>{combo}</div>
        </div>
        <MdCheck className='fill-white text-5xl sm:text-7xl p-2' />
      </div>
      <div className='flex justify-center gap-4 items-center border py-2 px-5 sm:py-4 sm:px-10 bg-gray-900 bg-opacity-75'>
        <span className='text-yellow-400 text-lg sm:text-4xl'>{props.questions[questionIndex].word.word}</span>
        <span className='text-white'>это</span>
        <span className='text-yellow-400 text-lg sm:text-4xl'>{props.questions[questionIndex].options[0].wordTranslate}</span>
        <span className='text-white'>?</span>
      </div>
      <div className='flex text-white'>
        <button onClick={() => checkAnswer(0)} className='text-center bg-green-600 border rounded-l-full w-32 py-2 hover:bg-green-500'>
          <MdArrowLeft className='inline-flex text-xl' />верно
        </button>
        <button onClick={() => checkAnswer(1)} className='text-center bg-red-700 border rounded-r-full w-32 py-2 hover:bg-red-600'>
          неверно<MdArrowRight className='inline-flex text-xl' />
        </button>
      </div>
    </div>
  </>
}


export const updateStats = async ({
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

  const sprintStats = currentStats && currentStats.optional.games.spirit;
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
    longestStreak: sprintStats.longestStreak >= longest ? sprintStats.longestStreak : longest,
    learnedWords: sprintStats.learnedWords + learnedWords,
    rightAnswers: sprintStats.rightAnswers + rightAnswers,
    wrongAnswers: sprintStats.wrongAnswers + wrongAnswers,
    correctAnswersPercent: calcCorrectAnswerPercent(
      sprintStats.rightAnswers,
      sprintStats.wrongAnswers
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
      spirit: gameStat,
      audiocall: currentOptional.games.spirit,
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
