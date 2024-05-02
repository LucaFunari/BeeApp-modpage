import { Entry } from "../../Types";
import {
  useApprovedList,
  useExport,
  useObservationsList,
} from "../api/Queries";
import ScrollableList from "./ScrollableList";
import { Outlet, useParams } from "react-router-dom";
import * as React from "react";

function ModerationPage(props: {
  showingApproved: boolean;
  setShowingApproved: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { showingApproved, setShowingApproved } = props;

  const { entryID } = useParams();

  const { data: entries } = useObservationsList(() => {
    return;
  });

  const { data: approvedList } = useApprovedList();

  const currentEntryIsApproved: boolean = React.useMemo(() => {
    if (entries?.data && approvedList?.data?.items) {
      const mergedEntries: Entry[] = [
        ...entries.data,
        ...approvedList.data.items,
      ];

      const entry = mergedEntries.find((one) => one.uid === entryID);

      return !!entry?.approvato;
    } else return false;
  }, [entries, approvedList, entryID]);

  const { mutateAsync, isLoading: isExporting } = useExport();

  return (
    <>
      <div className="px-4 pt-2 flex gap-3">
        <button
          onClick={() => setShowingApproved(false)}
          disabled={!showingApproved}
          className="sub-header-btn    
          transition-all text-white-500  font-semibold  py-2 
          px-4 border border-slate-950 dark:border-white
          hover:bg-slate-500 hover:text-white rounded
          enabled:active:bg-slate-400 enabled:active:dark:bg-slate-300 
          disabled:bg-white disabled:text-slate-950
          "
        >
          In attesa
        </button>
        <button
          onClick={() => setShowingApproved(true)}
          disabled={showingApproved}
          className="sub-header-btn    
        transition-all text-white-500  font-semibold  py-2 
        px-4 border border-slate-950 dark:border-white
        hover:bg-slate-500 hover:text-white rounded
        enabled:active:bg-slate-400 enabled:active:dark:bg-slate-300 
        disabled:bg-white disabled:text-slate-950"
        >
          Approvate
        </button>

        {currentEntryIsApproved && (
          <button
            onClick={() => mutateAsync()}
            disabled={isExporting}
            className="

flex
items-center
gap-2
ml-auto
        sub-header-btn    
        transition-all text-white-500  font-semibold  py-2 
        px-4 border border-slate-950 dark:border-white
        hover:bg-slate-500 hover:text-white rounded
        active:bg-slate-400 active:dark:bg-slate-300 
        disabled:bg-white disabled:text-slate-950"
          >
            Download {downloadIcon}
          </button>
        )}
      </div>

      <div className=" p-6 flex gap-4 flex-1 overflow-hidden h-full">
        <ScrollableList showingApproved={showingApproved} />
        <div className="border-solid border border-neutral-950 border-opacity-60 dark:border-slate-50 dark:border-opacity-40  flex-1 p-6 flex">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ModerationPage;

const downloadIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 -960 960 960"
    fill="currentColor"
    width="24"
  >
    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
  </svg>
);
