import { useLayoutEffect } from "react";
import ScrollableList from "./ScrollableList";
import { Outlet, useNavigate } from "react-router-dom";

function ModerationPage({ logged }: { logged: boolean }) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (logged === false) {
      navigate("../login");
    }
  }, []);

  return (
    <div className="p-6 bg-opacity-10 br-20 rounded-xl flex gap-4 flex-1 overflow-hidden">
      <ScrollableList />

      <div className="bg-slate-950 dark:bg-slate-50 dark:bg-opacity-10 bg-opacity-10 rounded-xl flex-1 p-6 flex">
        <Outlet />
      </div>
    </div>
  );
}

export default ModerationPage;
