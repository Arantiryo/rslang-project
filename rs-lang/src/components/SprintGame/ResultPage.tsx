import ResultsTrackingCard from "../ResultsCard/ResultsCard";

export default function ResultPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <ResultsTrackingCard
        size="max-w-[500px] rounded-lg"
        font="text-sm xs:text-[16px]"
        buttonSize="w-20 h-6 xs:w-[110px] xs:h-[36px]"
        contentSize="max-w-[160px] max-h-[160px] xs:max-w-[260px] xs:max-h-[260px]"
        showExtra={true}
      />
    </div>
  );
}
