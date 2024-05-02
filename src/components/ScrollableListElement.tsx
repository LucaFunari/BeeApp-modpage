import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry } from "../../Types";
import { useQueryClient } from "@tanstack/react-query";

function ScrollableListElement({ entry }: { entry: Entry }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { entryID } = useParams();

  const currentEntryIsSelected = entryID === entry.uid;

  useEffect(() => {
    if (entry.approving || !entry.approving) {
      setTimeout(() => {
        queryClient.setQueriesData(["useEntries"], (previousEntries) =>
          previousEntries
            ? {
                ...previousEntries,
                data: previousEntries.data.map((ent) =>
                  ent.uid === entry.uid ? { ...ent, approving: undefined } : ent
                ),
              }
            : undefined
        );
      }, 2000);
    }
  }, [entry, queryClient]);

  const timeStamp = React.useMemo(() => {
    const date = new Date(entry.timestamp);
    const now = Date.now();
    const nowDate = new Date(now);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return nowDate - date;
  }, [entry]);

  return (
    <button
      disabled={currentEntryIsSelected}
      className={`
    w-full
    relative flex enabled:hover:bg-slate-950 
  
disabled:bg-neutral-400  
dark:disabled:bg-neutral-500

    text-left
      enabled:hover:dark:bg-slate-50
      enabled:hover:dark:bg-opacity-10
      enabled:hover:bg-opacity-10 
      transition    
      enabled:active:bg-opacity-20
      enabled:active:dark:bg-opacity-20

      overflow-clip
      `}
    >
      {/* <div className="absolute  w-full h-full flex justify-center items-center bg-green-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
        Approvata ✔
      </div> */}
      {entry.approving === true && (
        <div className="absolute  w-full h-full flex justify-center items-center bg-green-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
          Approvata ✔
        </div>
      )}
      {entry.approving === false && (
        <div className="absolute  w-full h-full flex justify-center items-center bg-red-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
          Rifiutata X
        </div>
      )}

      <div
        className={`

        select-none 
        cursor-pointer 
        h-20
        flex
        flex-col
        justify-center
        px-5
        relative
      grow


      overflow-hidden
      text-xs
        sm:text-lg
        
      `}
        onClick={() => {
          if (!currentEntryIsSelected) {
            navigate(entry.uid);
          }
        }}
      >
        <span className="truncate">
          Osservazione {entry.approvato && "Approvata"}
        </span>
        <span
          className="
          truncate
          text-sm
          opacity-70
          z-30
          overflow-hidden
         "
        >
          {entry.description}
        </span>
      </div>
    </div>
  );
}

export default ScrollableListElement;

const dateCalc = (timeStamp: number) => {
  if (Math.floor(timeStamp / 1000 / 60) < 60)
    return Math.floor(timeStamp / 1000 / 60) + "m";
  else if (Math.floor(timeStamp / 1000 / 60 / 60) < 24)
    return Math.floor(timeStamp / 1000 / 60 / 60) + "h";
  else return Math.floor(timeStamp / 1000 / 60 / 60 / 24) + "g";
};
