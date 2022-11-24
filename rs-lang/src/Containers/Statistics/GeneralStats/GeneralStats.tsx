import pseudo1 from "../../../assets/svg/statistics__pseudo1.svg";

type GeneralStatsProps = {
  totalWordsLearned: number;
  totalRightAnswersPercent: number;
};

export default function GeneralStats({
  totalWordsLearned,
  totalRightAnswersPercent,
}: GeneralStatsProps) {
  return (
    <div
      className={`relative flex justify-center gap-4 flex-wrap
        lg:justify-start`}
    >
      <img
        className="absolute hidden lg:block lg:top-[40px] lg:right-[50px]"
        src={pseudo1}
        alt="pseudo element"
      />
      <div className="flex justify-center xl:justify-end gap-[15px] md:gap-[75px] w-[70%] pt-5">
        <div className="flex flex-col items-center">
          <span className="text-white font-extrabold text-[48px] leading-[54px] md:text-[72px] md:leading-[84px]">
            {totalWordsLearned}
          </span>
          <span className="text-white text-[24px] leading-[28px] text-center">слов изучено</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-extrabold text-[48px] leading-[54px] md:text-[72px] md:leading-[84px]">
            {`${totalRightAnswersPercent}%`}
          </span>
          <span className="text-white text-[24px] leading-[28px] text-center">
            правильных ответов
          </span>
        </div>
      </div>
    </div>
  );
}
