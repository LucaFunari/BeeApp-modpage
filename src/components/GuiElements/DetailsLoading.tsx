import React from "react";

function DetailsLoading() {
  return (
    <div className=" relative w-full h-full ">
      <div className="animate-pulse text-2xl text-slate-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Caricamento
      </div>
    </div>
  );
}

export default DetailsLoading;
