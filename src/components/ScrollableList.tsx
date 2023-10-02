import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollableListElement from "./ScrollableListElement";
import { useEntries } from "../api/Queries";
import { Entry } from "../../Types";
import ListSkeleton from "./GuiElements/ListSkeleton";

function ScrollableList() {
  const navigate = useNavigate();

  const errorFN = () => {
    navigate("../login");
  };
  const { data: entriesList, isLoading } = useEntries(errorFN);

  useLayoutEffect(() => {
    if (entriesList) navigate(entriesList[0].id.toString());
  }, [entriesList, navigate]);

  return (
    <div className="flex flex-col rounded-tl-xl w-60 lg:w-96 border border-slate-950 border-opacity-60 dark:border-slate-50 dark:border-opacity-40">
      <div className="px-3 py-2 font-light ">Osservazioni</div>
      <div className="block max-h-full overflow-y-auto  relative">
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
          <div className="bg-slate-950 bg-opacity-5 dark:bg-slate-50 dark:bg-opacity-5">
            {entriesList.map((entry: Entry) => (
              <ScrollableListElement entry={entry} key={entry.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrollableList;
