import React, { useState, useEffect } from "react";

type Props = {
  children: JSX.Element;
  waitBeforeShow?: number;
};

function Delayed({ children, waitBeforeShow = 600 }: Props) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(t);
  }, [waitBeforeShow]);

  return isShown ? children : <></>;
}

export default Delayed;
