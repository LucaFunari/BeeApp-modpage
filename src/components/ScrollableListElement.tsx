import React from "react";
import { useNavigate } from "react-router-dom";
import { Entry } from "../../Types";

function ScrollableListElement({ entry }: { entry: Entry }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="max-w-10  
        select-none 
        cursor-pointer 
        h-20
        flex
        flex-col
        justify-center
      hover:bg-slate-950 
        hover:bg-opacity-20 
        transition    
        px-5
        "
        onClick={() => navigate(entry.id.toString())}
      >
        <span>Observation {entry.id}</span>
        <span
          className="line-clamp-2
          text-sm
          opacity-70
          z-30
          "
        >
          {entry.text}
        </span>
      </div>
      <hr className="opacity-30" />
    </>
  );
}

export default ScrollableListElement;
