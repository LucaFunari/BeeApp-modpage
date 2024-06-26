import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entry } from "../../Types";
import {
  UseEntryConfirm,
  useApprovedList,
  useObservationsList,
} from "../api/Queries";
import DetailsLoading from "./GuiElements/DetailsLoading";
import { useQueryClient } from "@tanstack/react-query";
import DetailsImage from "./DetailsImage";

function Details() {
  const { entryID } = useParams();
  const queryClient = useQueryClient();

  const {
    data: entriesList,
    isLoading,
    refetch,
  } = useObservationsList(() => {
    return;
  });

  const { data: approvedList, isLoading: isLoadingApprovedList } =
    useApprovedList();

  const mergedList: Entry[] | undefined = React.useMemo(() => {
    if (entriesList?.data && approvedList?.data?.items) {
      return [...entriesList.data, ...approvedList.data.items];
    } else if (entriesList?.data) {
      return [...entriesList.data];
    }
  }, [entriesList, approvedList]);

  const [currentEntry, setCurrentEntry] = React.useState<Entry>();
  const { mutateAsync, isLoading: isMutating } = UseEntryConfirm();

  const navigate = useNavigate();

  const date = React.useMemo(() => {
    if (currentEntry?.timestamp) {
      const date = new Date(currentEntry?.timestamp);
      return date;
    }
  }, [currentEntry?.timestamp]);

  React.useEffect(() => {
    if (mergedList) {
      setCurrentEntry(mergedList.find((one: Entry) => one.uid === entryID));
      if (!mergedList.find((one: Entry) => one.uid === entryID)) {
        navigate("../" + mergedList[0].uid || "../");
      }
    }
  }, [mergedList, navigate, setCurrentEntry, entryID]);

  return (
    <div className="w-full h-full  flex flex-col items-center">
      <h2 className="opacity-75  select-none font-bold text-2xl p-2  mt-0 ">
        {currentEntry && currentEntry.approvato ? "Approvata" : "In attesa"}
      </h2>
      <div className="relative inline-flex flex-col gap-5  items-center grow justify-center w-full">
        {isLoading || (isLoadingApprovedList && <DetailsLoading />)}
        {currentEntry && (
          <>
            <div className="w-full relative flex items-center justify-center">
              {date && (
                <div className="absolute left-0 text-sm">
                  <pre className="opacity-50">
                    {date.toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </pre>
                </div>
              )}
              <div className="font-semibold">
                Osservazione
                <span className="bg-black px-2 py-2 text-md rounded-md text-slate-50 ">
                  {currentEntry.uid}
                </span>
              </div>
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
            <div className="flex flex-row flex-wrap gap-3 max-w-5xl overflow-x-auto">
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
            {!currentEntry.approvato && (
              <fieldset className="flex gap-20 p-3 relative">
                <button
                  disabled={
                    isMutating || currentEntry.approving === true || false
                  }
                  onClick={() => {
                    mutateAsync(
                      { confirm: true, entryID: currentEntry.uid },
                      {
                        onSuccess: () => {
                          refetch();
                          if (mergedList && mergedList[0])
                            navigate("../" + mergedList[0].uid);
                          else navigate("../");
                        },
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
          active:bg-green-400 active:dark:bg-green-300
            disabled:opacity-20
          disabled:bg-slate-50
          disabled:text-slate-950
          disabled:border-slate-50
            disabled:cursor-wait
          "
                >
                  Approva
                </button>

                <button
                  disabled={
                    isMutating || currentEntry.approving === true || false
                  }
                  onClick={
                    () => {
                      mutateAsync(
                        { confirm: false, entryID: currentEntry.uid },
                        {
                          onSuccess: () => {
                            refetch();
                            if (entriesList?.data[0])
                              navigate("../" + entriesList?.data[0].uid);
                            else navigate("../");
                          },
                        }
                      );

                      queryClient.setQueriesData(
                        ["useEntries"],
                        (previousEntries) =>
                          previousEntries
                            ? {
                                ...previousEntries,
                                // @ts-expect-error aaa
                                data: previousEntries.data.map((ent) =>
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
            active:bg-red-400 active:dark:bg-red-300
            disabled:opacity-20
            disabled:bg-slate-50
            disabled:text-slate-950
            disabled:border-slate-50
              disabled:cursor-wait
            "
                >
                  Rifiuta
                </button>
              </fieldset>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Details;
