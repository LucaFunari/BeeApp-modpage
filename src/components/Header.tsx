import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="sticky left-0 dark:text-slate-50 border-b border-black  dark:bg-transparent dark:border-b dark:border-white  dark:border-opacity-20">
        <nav className="mx-auto flex max-w-8xl items-center justify-between p-4 sticky ">
          <div className="flex lg:flex-1 ">
            <span
              className="text-2xl font-black 
              hover:drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]
              hover:dark:drop-shadow-[0_0px_3px_rgba(255,255,255,0.55)]
              transition-all
              select-none cursor-pointer "
              onClick={() => navigate("/")}
            >
              <span className="text-theme-green dark:text-slate-50 ">Bee</span>
              App
            </span>
          </div>

          <div className="flex">
            <span
              className="
            select-none cursor-pointer
            hover:drop-shadow-[0_5px_3px_rgba(0,0,0,0.25)]
            hover:dark:drop-shadow-[0_0px_5px_rgba(255,255,255,0.55)]
            transition-all
            "
              onClick={() => navigate("moderation")}
            >
              Moderation
            </span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
