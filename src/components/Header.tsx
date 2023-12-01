import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <header className="sticky left-0 dark:text-slate-50   dark:bg-transparent  ">
        <nav className="mx-auto flex max-w-8xl items-center justify-between p-2 sticky ">
          <div className="flex lg:flex-1 ">
            <div className="inline-flex items-center gap-5">

            <img src="./icona_app_ng4p.png" className="h-12 w-12 " alt="Logo NG4P"/>
            <h1 className="text-xl font-extrabold select-none opacity-50">
              Admin
            </h1>
            </div>
          </div>
          {process.env.NODE_ENV === "development" &&
          <pre className="
          opacity-10
          select-none
          ">

          {process.env.NODE_ENV}
          </pre>
          }
        </nav>

      </header>
    </div>
  );
}

export default Header;
