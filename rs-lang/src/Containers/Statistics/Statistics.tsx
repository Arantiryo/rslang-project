import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import GeneralStats from "./GeneralStats/GeneralStats";
import GameStatsCards from "./GameStatsCards/GameStatsCards";
import AllTimeStats from "./AllTimeStats/AllTimeStats";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { getUserStat } from "../../utils/WebClients";
import { UserStats } from "../../interfaces/app";
import { defaultGameStat } from "../../utils/Statistics";

export default function Statistics() {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const userStats = useAppSelector((state) => state.statsReducer);
  const userIsLoggedIn = userInfo.userId !== "";
  const [statistics, setStatistics] = useState<UserStats>();

  useEffect(() => {
    const getStats = async () => {
      const stats = userIsLoggedIn ? await getUserStat(userInfo.userId, userInfo.token) : userStats;
      setStatistics(stats);
    };

    getStats();
  }, [userInfo]);

  const defaultGames = {
    spirit: defaultGameStat,
    audiocall: defaultGameStat,
    wordle: defaultGameStat,
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <div className="bg-gray-800 grow-[2]">
        <Main className="h-full">
          <div className="mb-2">
            <h2 className="text-2xl font-bold tracking-wider text-emerald-700">Статистика</h2>
            <p className="text-base text-indigo-400">Статистика за сегодня</p>
          </div>
          <GeneralStats
            totalWordsLearned={statistics?.learnedWords || 0}
            totalRightAnswersPercent={statistics?.optional.totalCorrectAnswersPercent || 0}
          />
          <GameStatsCards
            className="pt-[40px] mb-[40px]"
            games={statistics?.optional.games || defaultGames}
          />
          <p className="text-base text-indigo-400">Статистика за все время</p>
          <AllTimeStats />
        </Main>
      </div>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </div>
  );
}
