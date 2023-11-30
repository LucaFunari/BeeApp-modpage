import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry } from "../../Types";
import { UseEntryConfirm, useObservationsList } from "../api/Queries";
import DetailsLoading from "./GuiElements/DetailsLoading";
import { useQueryClient } from "@tanstack/react-query";
import DetailsImage from "./DetailsImage";

function Details() {
  const { entryID } = useParams();

  const queryClient = useQueryClient();

  const { data: entriesList, isLoading } = useObservationsList(() => {
    return;
  });

  const [currentEntry, setCurrentEntry] = useState<Entry>();
  const { mutateAsync } = UseEntryConfirm();

  const navigate = useNavigate();

  useEffect(() => {
    if (entriesList && entriesList.data) {
      setCurrentEntry(
        entriesList.data.find((one: Entry) => one.uid === entryID)
      );
    }
  }, [entriesList, setCurrentEntry, entryID]);

  return (
    <div className="relative flex flex-col gap-5 items-center justify-center w-full">
      {isLoading && <DetailsLoading />}
      {currentEntry && (
        <>
          <div className="font-semibold">
            Osservazione{" "}
            <span className="bg-black px-2 py-2 text-xl rounded-md text-slate-50 ">
              {currentEntry.uid}
            </span>
          </div>
          <div
            className="flex flex-col items-center
                      h-96 w-full bg-black
                      bg-opacity-5 dark:bg-opacity-5 
                    dark:bg-slate-50"
          >
            <DetailsImage imageUrl={currentEntry.image} />
            {/*
             */}
          </div>
          <div className="flex flex-row, gap-3">
            {currentEntry.tags.map((tag) => (
              <p
                className="bg-blue-600 px-3 py-1.5 text-sm text-slate-200 rounded-full select-none hover:bg-blue-500 uppercase"
                key={tag}
              >
                {tag}
              </p>
            ))}
          </div>
          <div>
            Categoria:{" "}
            <span className="font-semibold">{currentEntry.type}</span>
          </div>
          <textarea
            rows={4}
            className="
            resize-none w-4/5 block p-2.5 text-sm text-gray-900
          bg-gray-50 rounded-lg border border-gray-300 overflow-y-auto
            dark:bg-white-50 dark:bg-opacity-10 dark:text-white
            focus:outline-none focus:border-blue-500"
            readOnly
            value={currentEntry.description}
          ></textarea>

          <fieldset className="flex gap-20 p-3 relative">
            <button
              onClick={() => {
                mutateAsync(
                  { confirm: true, entryID: currentEntry.uid },
                  {
                    onSuccess: () => navigate("../"),
                  }
                );

                queryClient.setQueriesData(["useEntries"], (previousEntries) =>
                  previousEntries
                    ? {
                        ...previousEntries,
                        data: previousEntries.data.map((ent: any) =>
                          ent.uid === currentEntry.uid
                            ? { ...ent, approving: true }
                            : ent
                        ),
                      }
                    : undefined
                );
              }}
              className="
            transition-all text-white-500  font-semibold  py-2 px-4
            border border-slate-950 rounded dark:border-slate-50
        
          hover:border-green-500 hover:bg-green-500 hover:text-white 

          active:bg-green-400 active:dark:bg-green-300 "
            >
              Approva
            </button>

            <button
              onClick={
                () => {
                  mutateAsync(
                    { confirm: false, entryID: currentEntry.uid },
                    {
                      onSuccess: () => navigate("../"),
                    }
                  );

                  queryClient.setQueriesData(
                    ["useEntries"],
                    (previousEntries) =>
                      previousEntries
                        ? {
                            ...previousEntries,
                            data: previousEntries.data.map((ent: any) =>
                              ent.uid === currentEntry.uid
                                ? { ...ent, approving: false }
                                : ent
                            ),
                          }
                        : undefined
                  );
                }

                // mutateAsync({
                //   entryID: currentEntry.uid,
                //   confirm: false,
                // })
              }
              className="
            transition-all text-white-500  font-semibold  py-2 
            px-4 border border-slate-950 dark:border-white

          hover:border-red-500 hover:bg-red-500 hover:text-white rounded

            active:bg-red-400 active:dark:bg-red-300 "
            >
              Rifiuta
            </button>
          </fieldset>
        </>
      )}
    </div>
  );
}
export default Details;
