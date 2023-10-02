import React from "react";
import { useNavigate } from "react-router-dom";
import { Entry } from "../../Types";

function ScrollableListElement({ entry }: { entry: Entry }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* <div className="absolute  w-full h-full flex justify-center items-center bg-green-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
        Approvata ✔
      </div> */}
      <div
        className="max-w-10  
        select-none 
        cursor-pointer 
        h-20
        flex
        flex-col
        justify-center
      hover:bg-slate-950 
      hover:dark:bg-slate-50
        hover:dark:bg-opacity-10
        hover:bg-opacity-10 
        transition    
        px-5
        relative
        active:bg-opacity-20
        active:dark:bg-opacity-20
      
        text-sm
        sm:text-lg



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
    </div>
  );
}

export default ScrollableListElement;
