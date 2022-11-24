import { useEffect, useState } from "react";
import IWord from "../../interfaces/IWord";
import shuffle from "../../utils/shuffle";
import { getWords } from "../../utils/WebClients";
import { QuestionType } from "../AudiocallGame/Question";
import Countdown from "./Countdown";
import Game from "./Game";

export default function GamePage(props: {
  categoryIndex: number,
  onGameEnd: () => void,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const onGameBegin = () => setIsLoading(false);

  useEffect(() => {
    const page = Math.floor(Math.random() * 30);
    getWords(page, props.categoryIndex).then((list: IWord[]) => {
      const LENGTH = 2;
      const MIN = 0;
      const MAX = list.length - 1;

      const data: QuestionType[] = list.map(obj => {
        const options = new Set([obj]);

        while (options.size < LENGTH) {
          let randomIndex = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
          options.add(list[randomIndex]);
        }

        return {
          word: obj,
          options: shuffle(Array.from(options))
        }
      })

      setQuestions(data);
    });
  }, [props.categoryIndex]);

  return (
    <div className="h-full flex flex-col justify-center gap-2">
      {isLoading ? (
        <Countdown onGameBegin={onGameBegin} />
      ) : (
        <Game questions={questions} onGameEnd={props.onGameEnd} />
      )}
    </div>
  );
}