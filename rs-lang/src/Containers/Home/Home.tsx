import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import Benefits from "./Benefits/Benefits";
import MiniGames from "./Mini-games/MiniGames";
import ResultsTracking from "./ResultsTracking/ResultsTracking";
import Welcome from "./Welcome/Welcome";

export default function Home() {
  return (
    <>
      <div className="bg-gray-800 w-full">
        <Header />
      </div>
      <Main>
        <Welcome />
        <Benefits />
        <MiniGames />
        <ResultsTracking />
      </Main>
      <div className="bg-gray-900 w-full">
        <Footer />
      </div>
    </>
  );
}
