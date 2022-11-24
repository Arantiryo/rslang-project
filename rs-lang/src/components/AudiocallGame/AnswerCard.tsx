import IWord from "../../interfaces/IWord";
import audioSvg from "../../assets/svg/audio.svg";

type AnswerCardProps = {
  word: IWord;
  img: string;
  onClick: () => void;
};

export default function AnswerCard({ word, img, onClick }: AnswerCardProps) {
  return (
    <div
      className="w-[260px] h-[220px] xs:w-[360px] xs:h-[280px] flex items-center justify-center
      bg-black-rgba border-2 border-dashed border-white"
    >
      <figure>
        <img
          className="w-[240px] h-[160px] xs:w-[280px] xs:h-[190px] mb-3"
          src={img}
          alt="answer"
        />
        <figcaption className="flex items-center justify-center">
          <span className="text-white uppercase text-[24px] leading-7 tracking-wider">
            {word.word}
          </span>
          <img
            className="inline-block w-[22px] h-[18px] cursor-pointer ml-2"
            onClick={onClick}
            src={audioSvg}
            alt="play audio"
          />
        </figcaption>
      </figure>
    </div>
  );
}
