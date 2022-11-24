import { GameStat, OptionalStat, State, UserStats } from "../../interfaces/app";
import { updateStatsIfNeeded } from "../../utils/Statistics";
import { getUserStat, updateUserStat } from "../../utils/WebClients";

type UpdateStatsProps = {
  userInfo: State;
  userStats: UserStats;
  updateLocalStats: (newStats: UserStats) => void;
  isCorrect: boolean;
};

export const updateWordleStats = async ({
  userInfo,
  userStats,
  updateLocalStats,
  isCorrect,
}: UpdateStatsProps) => {
  const userIsLoggedIn = userInfo.userId !== "";

  userIsLoggedIn && (await updateStatsIfNeeded(userInfo.userId, userInfo.token));

  const currentStats: UserStats = userIsLoggedIn
    ? await getUserStat(userInfo.userId, userInfo.token)
    : userStats;

  const wordleStats = currentStats && currentStats.optional.games.wordle;
  const currentOptional = currentStats.optional;

  const calcCorrectAnswerPercent = (right: number, wrong: number) => {
    return Math.floor((right / (right + wrong)) * 100) || 0;
  };

  // if player won, add 1 point to total score; if lost, remove 1 point
  const increase = isCorrect ? 1 : 0;
  const reverseIncrease = isCorrect ? 0 : 1;

  const gameStat: GameStat = {
    longestStreak: 0,
    learnedWords: wordleStats.learnedWords + increase,
    rightAnswers: wordleStats.rightAnswers + increase,
    wrongAnswers: wordleStats.wrongAnswers + reverseIncrease,
    correctAnswersPercent: calcCorrectAnswerPercent(
      wordleStats.rightAnswers + increase,
      wordleStats.wrongAnswers + reverseIncrease
    ),
  };

  const optional: OptionalStat = {
    totalRightAnswers: currentOptional.totalRightAnswers + increase,
    totalWrongAnswers: currentOptional.totalWrongAnswers + reverseIncrease,
    totalCorrectAnswersPercent: calcCorrectAnswerPercent(
      currentOptional.totalRightAnswers + increase,
      currentOptional.totalWrongAnswers + reverseIncrease
    ),
    date: JSON.stringify(new Date()),
    games: {
      spirit: currentOptional.games.spirit,
      audiocall: currentOptional.games.audiocall,
      wordle: gameStat,
    },
  };

  const newStats: UserStats = {
    learnedWords: currentStats ? currentStats.learnedWords + increase : increase,
    optional,
  };

  userIsLoggedIn
    ? updateUserStat(userInfo.userId, userInfo.token, newStats)
    : updateLocalStats(newStats);
};
