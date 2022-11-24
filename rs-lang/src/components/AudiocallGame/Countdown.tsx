import { useEffect, useState } from "react";

export default function Countdown() {
  const time = 3;
  const [counter, setCounter] = useState(time);

  useEffect(() => {
    const t = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(t);
  }, [counter]);

  return (
    <div className="w-[150px] h-[150px] flex items-center justify-center border-2 border-red-500 bg-black-rgba rounded-full">
      <span className="text-white text-[64px] leading-[75px]">{counter}</span>
    </div>
  );
}
