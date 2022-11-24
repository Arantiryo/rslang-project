import { GrMail } from "react-icons/gr";
import { GrGithub } from "react-icons/gr";

import imgMulteng from "../../assets/images/team__multeng.png";
import imgKondratio from "../../assets/images/team__kondratio.png";
import imgArantiryo from "../../assets/images/team__arantiryo.png";

type CardProps = {
  picture: string;
  title: string;
  name: string;
  email: string;
  github: string;
  description: string;
};

export function TeamMemberCard({
  description,
  email,
  github,
  name,
  picture,
  title,
}: CardProps) {
  return (
    <div
      className={`relative w-[250px] h-[390px] p-[20px]
      bg-gray-700 rounded-md`}
    >
      <img
        className="block rounded-md w-[210px] h-[190px] mb-2 justify-self-center"
        src={picture}
        alt="card"
      />
      <p
        className={`text-emerald-400 font-medium text-[12px] leading-[14px] mb-[10px]`}
      >
        {title}
      </p>
      <h4
        className={`text-white font-semibold tracking-[1px] text-[18px] leading-[21px] mb-[6px]`}
      >
        {name}
      </h4>
      <p
        className={`relative text-white font-medium text-[12px] leading-[14px]`}
      >
        <GrMail className="relative inline-block top-[-1px]" /> {email}
      </p>
      <p
        className={`text-white font-medium text-[12px] leading-[14px] mb-[18px]`}
      >
        <GrGithub className="relative inline-block top-[-1px]" /> {github}
      </p>
      <p className={`text-white font-medium text-[12px] leading-[14px]`}>
        {description}
      </p>
    </div>
  );
}

export function CardMulteng() {
  return (
    <TeamMemberCard
      picture={imgMulteng}
      title="Mentor"
      name="Владимир Кормаков"
      email="vladimir_kormakov@epam.com"
      github="multeng"
      description="Менторство. Участие в митингах. Ответы на возникающие вопросы. Помощь в поиске решений поставленных задач."
    />
  );
}
export function CardKondratio() {
  return (
    <TeamMemberCard
      picture={imgKondratio}
      title="Front-end developer / Web designer"
      name="Илья Иванов"
      email="konhote@gmail.com"
      github="kondratio"
      description="Предложение способов решений поставленных задач. Помощь другим разработчикам."
    />
  );
}
export function CardArantiryo() {
  return (
    <TeamMemberCard
      picture={imgArantiryo}
      title="Front-end developer"
      name="Иван Ценилов"
      email="ivantsenilov@gmail.com"
      github="arantiryo"
      description="Предложение способов решений поставленных задач. Помощь другим разработчикам."
    />
  );
}
