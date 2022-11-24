import { ResultDataType } from "./ResultsCard";
import { PieChart } from "react-minimal-pie-chart";

type ResultsProps = {
  data: ResultDataType[];
  resultLabel: number;
  contentSize: string;
};

export default function Results({
  data,
  resultLabel,
  contentSize,
}: ResultsProps) {
  return (
    <div className="max-h-[310px]">
      <PieChart
        className={`py-2 mx-auto w-full h-full ${contentSize} xs:py-1 xs:mb-4`}
        lineWidth={35}
        paddingAngle={1}
        label={() => `${resultLabel}%`}
        labelStyle={{
          fontSize: "16px",
          fontWeight: "500",
          fontFamily: "sans-serif",
          fill: "#ffffff",
        }}
        labelPosition={0}
        data={data}
      />
    </div>
  );
}
