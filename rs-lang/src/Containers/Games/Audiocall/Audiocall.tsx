import AudiocallGame from "../../../components/AudiocallGame/AudiocallGame";
import Header from "../../../components/Header/Header";
import Main from "../../../components/Main/Main";

export default function Audiocall() {
  return (
    <div className="h-screen flex flex-col bg-audiocall bg-cover bg-no-repeat">
      <div className="w-full">
        <Header isGameHeader={true} />
      </div>
      <div className={`grow-[2]`}>
        <Main className="h-full" transparentBg={true}>
          <AudiocallGame />
        </Main>
      </div>
    </div>
  );
}
