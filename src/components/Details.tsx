import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry } from "../../Types";
import { useEntries } from "../api/Queries";
import DetailsLoading from "./GuiElements/DetailsLoading";

function Details() {
  const { entryID } = useParams();

  const { data: entriesList, isLoading } = useEntries();

  const [currentEntry, setCurrentEntry] = useState<Entry>();

  useEffect(() => {
    console.log("CFRIBIO");
    if (entriesList) {
      setCurrentEntry(
        entriesList.find((one: Entry) => one.id.toString() === entryID)
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
            <span className="bg-black px-2 py-2 text-xl rounded-xl text-slate-50 ">
              {currentEntry.id}
            </span>
          </div>
          <div
            className="flex flex-col items-center
                      h-96 w-full bg-black
                      bg-opacity-5 dark:bg-opacity-5 
                    dark:bg-slate-50"
          >
            <img
              src={currentEntry.image}
              loading="lazy"
              alt="Entry Image"
              className="rounded-md max-h-96 object-cover"
            ></img>
          </div>
          <pre className="select-all ">{currentEntry.image}</pre>
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
            <span className="underline">
              {currentEntry.category === 0
                ? "BeeHotel"
                : currentEntry.category === 1
                ? "Fioriture"
                : "Impollinatori"}
            </span>
          </div>
          <textarea
            rows={4}
            className="
            resize-none w-4/5 block p-2.5 text-sm text-gray-900
          bg-gray-50 rounded-lg border border-gray-300 overflow-y-auto
            dark:bg-white-50 dark:bg-opacity-10 dark:text-white
            focus:outline-none focus:border-blue-500"
            readOnly
            value={currentEntry.text}
          ></textarea>

          <fieldset className="flex gap-20 p-3 relative">
            <button
              className="
            transition-all text-white-500  font-semibold  py-2 px-4
            border border-slate-950 rounded dark:border-slate-50
        
          hover:border-green-500 hover:bg-green-500 hover:text-white 

          active:bg-green-400 active:dark:bg-green-300 active:drop-shadow-[0_0px_10px_rgba(134,239,172,0.2)]"
            >
              Approva
            </button>

            <button
              className="
            transition-all text-white-500  font-semibold  py-2 
            px-4 border border-slate-950 dark:border-white

          hover:border-red-500 hover:bg-red-500 hover:text-white rounded

            active:bg-red-400 active:dark:bg-red-300 active:drop-shadow-[0_0px_10px_rgba(252,165,165,0.2)]"
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
