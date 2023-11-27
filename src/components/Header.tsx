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
              transition-all
              select-none "
              // onClick={() => navigate("/")}
            >
              <span className="text-theme-green dark:text-slate-50 ">Bee</span>
              App
            </span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
