import audioSvg from "../../assets/svg/audio.svg";

type AudioButtonProps = {
  onClick: () => void;
};

export default function AudioButton({ onClick }: AudioButtonProps) {
  return (
    <div className="w-[360px] h-[280px] flex items-center justify-center">
      <div
        className="w-[150px] h-[150px] flex items-center justify-center border-2 border-red-500 border-dashed bg-black-rgba 
        rounded-full cursor-pointer"
        onClick={onClick}
      >
        <img className="w-[70px] h-[58px]" src={audioSvg} alt="play audio" />
      </div>
    </div>
  );
}
