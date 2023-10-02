import ScrollableList from "./ScrollableList";
import { Outlet } from "react-router-dom";

function ModerationPage() {
  return (
    <div className=" p-6 flex gap-4 flex-1 overflow-hidden h-full">
      <ScrollableList />

      <div className="border-solid border border-neutral-950 border-opacity-60 dark:border-slate-50 dark:border-opacity-40 rounded-lg flex-1 p-6 flex">
        <Outlet />
      </div>
    </div>
  );
}

export default ModerationPage;
