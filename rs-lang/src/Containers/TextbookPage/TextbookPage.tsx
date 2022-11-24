import Footer from "../../components/Footer/Footer";
import { GameAudioCall, GameSprint, GameWordle } from "../../components/GameCard/GameCard";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Textbook from "../../components/Textbook/Textbook";

export default function TextbookPage() {

  return (
    <>
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <Main className="grow">
        <Textbook />
        <div>
          <div>
            <h2 className="text-white">Мини-игры</h2>
          </div>
          <div className="flex gap-4 flex-wrap max-w-screen-md">
            <div className="relative">
              <GameSprint />
            </div>
            <div className="relative">
              <GameAudioCall />
            </div>
            <div className="relative">
              <GameWordle />
            </div>
          </div>
        </div>
      </Main>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </>
  );
}
