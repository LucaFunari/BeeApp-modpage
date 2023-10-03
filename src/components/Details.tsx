import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry } from "../../Types";
import { useObservationsList } from "../api/Queries";
import DetailsLoading from "./GuiElements/DetailsLoading";
import LoadingSpinner from "./GuiElements/LoadingSpinner";

function Details() {
  const { entryID } = useParams();

  const { data: entriesList, isLoading } = useObservationsList(() => {
    return;
  });

  const [currentEntry, setCurrentEntry] = useState<Entry>();

  useEffect(() => {
    if (entriesList && entriesList.data) {
      setCurrentEntry(
        entriesList.data.find((one: Entry) => one.uid.toString() === entryID)
      );
    }
  }, [entriesList, setCurrentEntry, entryID]);

  const [tagInput, setTagInput] = useState<string>();
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // const handleSceneMod = (entry: Entry, approved: boolean) => {
  //   setLoadingState(true);
  //   setApproved({ id: entry.id, approved: approved });
  //   setTimeout(() => {
  //     const newQueryData = queryClient.setQueryData(["useEntries"], {
  //       ...entriesList,
  //       data: entriesList?.data.filter(
  //         (entry: Entry) => entry.id !== currentEntry?.id
  //       ),
  //     });
  //     //
  //     //API CALL
  //     //

  //     navigate("../" + newQueryData?.data[0].id);

  //     setLoadingState(false);
  //     setApproved({ id: "-1", approved: true });
  //   }, 2000);
  // };

  return (
    <div className="relative flex flex-col gap-5 items-center justify-center w-full">
      {isLoading && <DetailsLoading />}
      {currentEntry && (
        <>
          <div className="font-semibold">
            Osservazione{" "}
            <span className="bg-black px-2 py-2 text-xl rounded-xl text-slate-50 ">
              {currentEntry.uid}
            </span>
          </div>
          <div
            className="
            flex flex-col items-center h-96 
            w-full bg-black bg-opacity-5 
            dark:bg-opacity-5 dark:bg-slate-50
            "
          >
            <img
              src={currentEntry.image}
              loading="lazy"
              alt="Entry Image"
              className="rounded-md max-h-96 object-cover"
            ></img>
          </div>
          <pre className="select-all ">{currentEntry.image}</pre>
          <div className=" w-9/12 inline-block text-center h-fit leading-9">
            {currentEntry.tags.map((tag) => (
              <span
                className="bg-blue-600 px-3 py-1.5 text-sm text-slate-200 rounded-full select-none w-fit uppercase"
                key={tag}
              >
                {tag}{" "}
                <button
                  // onClick={() =>
                  //   queryClient.setQueryData(["useEntries"], {
                  //     ...entriesList,
                  //     data: entriesList?.data.map((entry: Entry) =>
                  //       entry.id === currentEntry.id
                  //         ? {
                  //             ...entry,
                  //             tags: entry.tags.filter((tg) => tg !== tag),
                  //           }
                  //         : entry
                  //     ),
                  //   })
                  // }
                  className="font-black opacity-40 hover:opacity-90"
                >
                  ✖
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Aggiungi tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     queryClient.setQueryData(["useEntries"], {
              //       ...entriesList,
              //       data: entriesList?.data.map((entry: Entry) =>
              //         entry.id === currentEntry.id
              //           ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //             //@ts-ignore
              //             { ...entry, tags: [...entry.tags, e.target.value] }
              //           : entry
              //       ),
              //     });
              //     setTagInput("");
              //   }
              // }}
              className="
              text-sm  w-24 opacity-50 text-center
              bg-transparent focus:outline-none
              focus:underline focus:opacity-100
              "
            />
          </div>
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Categoria
            </label>

            <p>{currentEntry.type}</p>

            {/* <span className="underline">
              {currentEntry.category === 0
                ? "BeeHotel"
                : currentEntry.category === 1
                ? "Fioriture"
                : "Impollinatori"}
            </span> */}
          </div>
          <textarea
            rows={4}
            readOnly
            className="
            resize-none w-4/5 block p-2.5 text-sm text-gray-900
          bg-gray-50 rounded-lg border border-gray-300 overflow-y-auto
            dark:bg-white-50 dark:bg-opacity-10 dark:text-white
            focus:outline-none focus:border-blue-500"
            value={currentEntry.description}
            // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            //   queryClient.setQueryData(["useEntries"], {
            //     ...entriesList,
            //     data: entriesList?.data.map((entry: Entry) =>
            //       entry.id === currentEntry.id
            //         ? { ...entry, text: e.target.value }
            //         : entry
            //     ),
            //   })
            // }
          ></textarea>

          <fieldset className="flex gap-20 p-3 relative">
            <button
              className="
              transition-all text-white-500  font-semibold  py-2 px-4
              border border-slate-950 rounded dark:border-slate-50 
            hover:border-green-500 hover:bg-green-500 hover:text-white 
            active:bg-green-400 active:dark:bg-green-300 
              active:drop-shadow-[0_0px_10px_rgba(134,239,172,0.2)] relative
            disabled:bg-slate-600 disabled:opacity-50 disabled:border-slate-600
              "
              disabled={loadingState}
            >
              Approva
              {loadingState && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                  <LoadingSpinner />
                </div>
              )}
            </button>

            <button
              className="
              transition-all text-white-500  font-semibold  py-2 px-4
              border border-slate-950 dark:border-white hover:border-red-500 
              hover:bg-red-500 hover:text-white rounded active:bg-red-400 
              active:dark:bg-red-300 active:drop-shadow-[0_0px_10px_rgba(252,165,165,0.2)]
              relative disabled:bg-slate-600 disabled:opacity-50 disabled:border-slate-600
              "
              disabled={loadingState}
            >
              Rifiuta
              {loadingState && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                  <LoadingSpinner />
                </div>
              )}
            </button>
          </fieldset>
        </>
      )}
    </div>
  );
}
export default Details;
