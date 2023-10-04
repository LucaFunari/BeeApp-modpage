import React, { useState } from "react";

const Mapper = [...Array(50).keys()];

function Test() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="
    bg-blue-500
    flex
    flex-col
     
    "
      style={{ height: "800px", width: "400px" }}
    >
      <div
        className="bg-slate-50 bg-opacity-20 p-3 border-b border-white"
        onClick={() => setOpen(!open)}
      >
        pano
      </div>
      {open && (
        <div
          className="
      grid
      grid-cols-2
      gap-2
      p-4
      h-full
      overflow-y-auto
      "
        >
          {Mapper.map((elem) => (
            <div
              className="
          bg-teal-400
          border 
          border-solid 
          border-white
          w-full
        
          flex
          items-center
          justify-center
          hover:opacity-40
          
          "
              style={{ aspectRatio: "2/1" }}
            >
              {elem}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Test;
