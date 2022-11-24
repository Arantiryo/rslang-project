import pseudo1 from "../../../assets/svg/team__pseudo-elem-1.svg";
import {
  CardArantiryo,
  CardKondratio,
  CardMulteng,
} from "../../../components/TeamMemberCard/TeamMemberCard";

export default function GameCards({ className }: { className: string }) {
  return (
    <div
      className={`${className} relative flex justify-center gap-4 flex-wrap
        lg:justify-start`}
    >
      <img
        className="absolute hidden md:block md:top-[-70px] md:right-[20px]"
        src={pseudo1}
        alt="pseudo element"
      />
      <div className="relative">
        <CardMulteng />
      </div>
      <div className="relative">
        <CardKondratio />
      </div>
      <div className="relative">
        <CardArantiryo />
      </div>
    </div>
  );
}
