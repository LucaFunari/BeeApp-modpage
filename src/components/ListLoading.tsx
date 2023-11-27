import React from "react";
import ListSkeleton from "./GuiElements/ListSkeleton";

const count = new Array(22);

function ListLoading() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 animate-pulse text-2xl text-slate-400 -translate-x-1/2 -translate-y-1/2">
        Caricamento
      </div>

      <div className="blur-sm opacity-40 h-full overflow-hidden">
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </>
  );
}

export default ListLoading;
