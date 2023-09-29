import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollableListElement from "./ScrollableListElement";
import { useEntries } from "../api/Queries";
import { Entry } from "../../Types";
import ListSkeleton from "./GuiElements/ListSkeleton";

function ScrollableList() {
  const { data: entriesList, isLoading } = useEntries();

  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (entriesList) navigate(entriesList[0].id.toString());
  }, []);

  return (
    <div className="bg-slate-950 dark:bg-slate-50 dark:bg-opacity-10 bg-opacity-10 rounded-xl w-96 block   overflow-y-auto  relative">
      {isLoading && (
        <>
          <div className="absolute top-1/2 left-1/2 animate-pulse text-2xl text-slate-400 -translate-x-1/2 -translate-y-1/2">
            Caricamento
          </div>

          <div className="blur-sm opacity-40">
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
          </div>
        </>
      )}
      {entriesList && (
        <div>
          <p className="sticky top-0 p-2  bg-gray-100 dark:bg-slate-950 text-sm font-light  flex justify-center gap-1 z-50">
            <span className="font-semibold">{entriesList.length}</span>{" "}
            Osservazion
            {entriesList.length === 1 ? "e" : "i"} in attesa di approvazione
          </p>

          {entriesList.map((entry: Entry) => (
            <ScrollableListElement entry={entry} key={entry.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScrollableList;
