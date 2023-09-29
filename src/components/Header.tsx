import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <header className=" dark:text-slate-50 bg-theme-green dark:bg-transparent">
        <nav className="mx-auto flex max-w-8xl items-center justify-between p-4">
          <div className="flex lg:flex-1 ">
            <span
              className="text-3xl font-extrabold hover:opacity-50
              select-none cursor-pointer"
              onClick={() => navigate("/")}
            >
              BeeApp
            </span>
          </div>
          <div className="flex">
            <span
              className="
select-none cursor-pointer
hover:opacity-50
"
              // className=""
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
