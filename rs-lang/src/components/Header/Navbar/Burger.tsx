import { useState } from "react";
import Nav from "./Nav";

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="w-8 h-8 fixed top-4 right-5 z-[60] hidden cursor-pointer mw:flex mw:justify-around mw:flex-col mw:flex-nowrap"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`w-8 h-1 rounded-lg origin-[1px] transition-all bg-white
            ${open ? "rotate-45" : "rotate-0"}`}
        />
        <div
          className={`w-8 h-1 rounded-lg origin-[1px] transition-all bg-white
            ${open ? "opacity-0" : "opacity-1"}`}
        />
        <div
          className={`w-8 h-1 rounded-lg origin-[1px] transition-all bg-white
            ${open ? "rotate-[-45deg]" : "rotate-0"}`}
        />
      </div>
      <Nav open={open} />
    </>
  );
};

export default Burger;
