import * as React from "react";
import { useNavigate } from "react-router-dom";
import ScrollableListElement from "./ScrollableListElement";
import { useApprovedList, useObservationsList } from "../api/Queries";
import { Entry } from "../../Types";
import ListLoading from "./ListLoading";

function ScrollableList(props: { showingApproved: boolean }) {
  const navigate = useNavigate();

  const { showingApproved } = props;

  const errorFN = () => {
    navigate("../login");
  };
  const { data: entriesList, isLoading } = useObservationsList(errorFN);
  const { data: approvedList, isLoading: approvedListIsLoading } =
    useApprovedList();

  React.useEffect(() => {
    console.debug(showingApproved);

    if (!showingApproved) {
      console.debug(entriesList?.data[0]);
    } else console.debug(approvedList?.data?.items[0]);
  }, [showingApproved, entriesList, approvedList]);

  const once = React.useRef(true);

  const [oldest, setOldest] = React.useState<boolean>(true);

  const loadingEntries = isLoading || approvedListIsLoading;

  return (
    <div className="flex flex-col w-60 lg:w-96 border border-solid border-slate-950 border-opacity-60 dark:border-slate-50 dark:border-opacity-40">
      <div className="px-3 py-2 font-light ">Osservazioni</div>

      <div
        className="px-3 py-2 text-sm select-none cursor-pointer"
        onClick={() => setOldest(!oldest)}
      >
        Ordina per: <b>{oldest ? "Vecchio ↓" : "Nuovo ↑"}</b>
      </div>
      <div className="block max-h-full overflow-y-auto  relative">
        {loadingEntries && <ListLoading />}

        {!showingApproved ? (
          <>
            {entriesList && entriesList.data && (
              <>
                <div className="bg-slate-950 bg-opacity-5 dark:bg-slate-50 dark:bg-opacity-5 divide-y divide-solid">
                  {entriesList.data
                    .sort((a, b) => {
                      const dateA = new Date(a.timestamp);
                      const dateB = new Date(b.timestamp);

                      if (oldest) return dateA.getTime() - dateB.getTime();
                      else return dateB.getTime() - dateA.getTime();
                    })
                    .map((entry: Entry) => (
                      <ScrollableListElement entry={entry} key={entry.uid} />
                    ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {approvedList && approvedList?.data?.items && (
              <>
                <div className="bg-slate-950 bg-opacity-5 dark:bg-slate-50 dark:bg-opacity-5 divide-y divide-solid">
                  {approvedList.data?.items?.map((entry: Entry) => (
                    <ScrollableListElement entry={entry} key={entry.uid} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {entriesList?.status === 204 && (
          <div className="flex flex-col justify-center opacity-50 select-none  items-center ">
            <span className="text-lg">Lista di osservazioni vuota</span>
            <code>Status 204: No content.</code>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrollableList;
