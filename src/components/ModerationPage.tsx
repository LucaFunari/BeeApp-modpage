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

  const [loadingMockStatus, setLoadingMockStatus] = React.useState(false);
  const { mutateAsync } = useExport((bool: boolean) =>
    setLoadingMockStatus(bool)
  );

  return (
    <>
      <div className="px-4 pt-2 flex gap-3">
        <button
          onClick={() => setShowingApproved(false)}
          disabled={!showingApproved}
          className="sub-header-btn    
          text-neutral-700 dark:text-white
          transition-all  font-semibold  py-2 
          px-4 border border-neutral-700 dark:border-white
          enabled:hover:bg-neutral-500 enabled:hover:text-white rounded
          enabled:active:bg-neutral-400 enabled:active:dark:bg-neutral-300 
          disabled:bg-neutral-600 disabled:text-white disabled:border-neutral-600
          dark:disabled:bg-white dark:disabled:text-neutral-700 dark:disabled:border-white
disabled:opacity-50
          "
        >
          In attesa
        </button>
        <button
          onClick={() => setShowingApproved(true)}
          disabled={showingApproved}
          className="sub-header-btn    

          text-neutral-700 dark:text-white
          transition-all  font-semibold  py-2 
        px-4 border border-neutral-700 dark:border-white
        enabled:hover:bg-neutral-500 enabled:hover:text-white rounded
        enabled:active:bg-neutral-400 enabled:active:dark:bg-neutral-300 
        disabled:bg-neutral-600 disabled:text-white disabled:border-neutral-600
        dark:disabled:bg-white dark:disabled:text-neutral-700 dark:disabled:border-white
        disabled:opacity-50

        "
        >
          Approvate
        </button>

        {currentEntryIsApproved && (
          <button
            disabled={loadingMockStatus}
            onClick={() => mutateAsync(undefined, {})}
            className="

flex
items-center
gap-2
ml-auto
sub-header-btn    
text-neutral-700 dark:text-white

transition-all font-semibold  py-2 
        px-4 border border-neutral-700 dark:border-white
        enabled:hover:bg-neutral-500 enabled:hover:text-white rounded
        enabled:active:bg-neutral-400 enabled:active:dark:bg-neutral-300 
        disabled:bg-neutral-600 disabled:text-white disabled:border-neutral-600
        dark:disabled:bg-white dark:disabled:text-neutral-700 dark:disabled:border-white
        "
          >
            Download {loadingMockStatus ? <Spinner></Spinner> : downloadIcon}
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

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-900 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
