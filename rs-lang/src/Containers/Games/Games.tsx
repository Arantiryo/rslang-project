import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import GameCards from "./GameCards/GameCards";

export default function Games() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <div className="bg-gray-800 grow-[2]">
        <Main className="h-full">
          <div>
            <h2 className="text-2xl font-bold tracking-wider text-emerald-700 mb-6">
              Игры
            </h2>
          </div>
          <GameCards className="pt-15" />
        </Main>
      </div>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </div>
  );
}
