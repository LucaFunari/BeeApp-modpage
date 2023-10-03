import { useNavigate } from "react-router-dom";
import { Entry } from "../../Types";

function ScrollableListElement({ entry }: { entry: Entry }) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* {approvedObs.id === entry.id && (
        <>
          {approvedObs.approved ? (
            <div className="absolute  w-full h-full flex justify-center items-center bg-green-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
              Approvata ✔
            </div>
          ) : (
            <div className="absolute  w-full h-full flex justify-center items-center bg-red-500 z-50 bg-opacity-25 backdrop-blur-sm text-xl select-none">
              Rifiutata ✖
            </div>
          )}
        </>
      )} */}
      <div
        className="
        max-w-10 select-none cursor-pointer h-20
        flex flex-col justify-center
      hover:bg-slate-950 hover:dark:bg-slate-50
        hover:dark:bg-opacity-10 hover:bg-opacity-10 
        transition px-5 relative active:bg-opacity-20
        active:dark:bg-opacity-20 text-sm sm:text-lg
        "
        onClick={() => navigate(entry.uid.toString())}
      >
        <span>Observation {entry.uid}</span>
        <span className="line-clamp-2 text-sm opacity-70 z-30">
          {entry.description}
        </span>
      </div>
    </div>
  );
}

export default ScrollableListElement;
