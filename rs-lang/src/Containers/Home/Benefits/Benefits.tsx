import onlineAccessIcon from "../../../assets/svg/benefits__online-access.svg";
import spaceRepetition from "../../../assets/svg/benefits__space-repetition.svg";
import education from "../../../assets/svg/benefits__education.svg";

export default function Benefits() {
  return (
    <div className="benefits-section relative w-full sm:flex sm:items-baseline sm:justify-between sm:gap-8 md:mb-6 lg:mt-[-60px]">
      <BenefitsCard
        className="benefits-section sm:w-1/3"
        icon={onlineAccessIcon}
        heading="Онлайн доступ"
        text="В отличие от оффлайн курсов наши игры и тренировки доступны всегда.
          Занимайтесь в удобное для вас время"
      />
      <BenefitsCard
        className="card__spaced-repetition sm:w-1/3"
        icon={spaceRepetition}
        heading="Интервальные повторения"
        text="В приложении используется метод интервальных повторений, который является эффективным в изучении новых языков."
      />
      <BenefitsCard
        className="card__education sm:w-1/3"
        icon={education}
        heading="Обучение"
        text="Изучение английского языка без платных подписок и ограничений"
      />
    </div>
  );
}

type BenefitsCardProps = {
  className: string;
  icon: string;
  heading: string;
  text: string;
};

function BenefitsCard(props: BenefitsCardProps) {
  return (
    <div
      className={
        props.className + " flex flex-col items-center justify-between mb-10"
      }
    >
      <img className="mb-3 lg:w-[84px]" src={props.icon} alt="online access " />
      <h3 className="mb-2 text-base lg:text-3xl text-center leading-5 font-medium text-white">
        {props.heading}
      </h3>
      <p className="text-xs leading-5 lg:text-lg lg:leading-7 text-center text-white">
        {props.text}
      </p>
    </div>
  );
}
