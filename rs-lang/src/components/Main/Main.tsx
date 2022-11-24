import { ReactChild, ReactFragment } from "react";

export default function Main(props: {
  children: ReactChild | ReactFragment;
  className?: string;
  transparentBg?: boolean;
}) {
  return (
    <main
      className={`${props.className ? props.className : ""} home ${
        props.transparentBg ? "" : "bg-gray-800"
      }  overflow-hidden`}
    >
      <div className="px-5 h-full max-w-7xl mx-auto xxl:px-0">
        {props.children}
      </div>
    </main>
  );
}
