import { useTimer } from 'use-timer';

export default function Countdown(props: {
  onGameBegin: () => void;
}) {
  const { time } = useTimer({
    initialTime: 4,
    endTime: 0,
    timerType: 'DECREMENTAL',
    autostart: true,
    onTimeOver: () => props.onGameBegin(),
  })
  return (
    <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-blue-500 bg-black-rgba rounded-full self-center">
      <span className="text-white text-[64px] leading-[75px]">{time}</span>
    </div>
  );
}