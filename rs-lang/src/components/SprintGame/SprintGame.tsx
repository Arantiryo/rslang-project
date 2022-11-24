import { useState } from "react";
import GamePage from "./GamePage";
import ResultPage from "./ResultPage";
import StartPage from "./StartPage";

type GameStatusType = "prep" | "running" | "result";

export default function SprintGame() {
  const [gameStatus, setGameStatus] = useState<GameStatusType>("prep");
  const [categoryIndex, setCategoryIndex] = useState(0);

  const chooseCategory = (index: number) => setCategoryIndex(index);
  const startGame = () => setGameStatus("running");
  const finishGame = () => setGameStatus("result");

  return (
    <>
      {gameStatus === "prep" && (
        <StartPage
          categoryIndex={categoryIndex}
          onClickCategory={chooseCategory}
          onGameBegin={startGame}
        />
      )}
      {gameStatus === "running" && (
        <GamePage categoryIndex={categoryIndex} onGameEnd={finishGame} />
      )}
      {gameStatus === "result" && <ResultPage />}
    </>
  )
}