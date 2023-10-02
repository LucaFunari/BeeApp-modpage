import ScrollableList from "./ScrollableList";
import { Outlet } from "react-router-dom";

function ModerationPage() {
  return (
    <div className="p-6 br-20 rounded-xl flex gap-4 flex-1 overflow-hidden">
      <ScrollableList />

      <div className="border border-neutral-950 border-opacity-60 dark:border-slate-50 dark:border-opacity-40 rounded-br-xl flex-1 p-6 flex">
        <Outlet />
      </div>
    </div>
  );
}

export default ModerationPage;
