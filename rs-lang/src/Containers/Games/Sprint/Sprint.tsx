import Header from "../../../components/Header/Header";
import Main from "../../../components/Main/Main";
import SprintGame from "../../../components/SprintGame/SprintGame";

export default function Audiocall() {
  return (
    <div className="h-screen flex flex-col bg-sprint bg-cover bg-no-repeat">
      <div className="w-full">
        <Header isGameHeader={true} />
      </div>
      <div className={`grow-[2]`}>
        <Main className="h-full" transparentBg={true}>
          <SprintGame />
        </Main>
      </div>
    </div>
  );
}
