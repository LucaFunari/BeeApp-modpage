import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEntries } from "../api/Queries";

function Login() {
  const navigate = useNavigate();

  const [key, setKey] = useState<string>();

  const { isError } = useEntries(() => {
    return;
  });

  return (
    <div className=" h-full p-6 flex items-center justify-center  ">
      <div className="border border-gray-500 p-6 rounded-xl flex gap-5 flex-col w-96">
        <div>
          <button
            onClick={() => navigate("../")}
            className="text-sm opacity-50"
          >
            Torna alla Home
          </button>
          <h1 className="text-2xl font-semibold">Non autorizzato</h1>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Inserire APIKey</span>
          <input
            className="bg-transparent border 
            border-gray-400 px-2 py-0.5 
            rounded-full focus:bg-slate-50 
            focus:bg-opacity-10 placeholder:text-sm 
            focus:outline-none focus:border-emerald-500
            "
            type="password"
            placeholder="APIKey"
            value={key}
            onChange={(e) => {
              setKey(e.target.value);

              if (e) {
                localStorage.setItem("ApiKey", e.target.value);
              }
            }}
          />
        </label>
        {isError && Cookies.get("ApiKey") && (
          <pre className="text-red-800">APIKey errata</pre>
        )}
        <button
          className="border
          border-slate-950
          dark:border-slate-50 rounded-full py-1
          hover:bg-emerald-600
          hover:border-emerald-600
            transition active:bg-emerald-400
            active:drop-shadow-[0_0px_10px_rgba(52,211,153,0.2)]
            "
          onClick={() => {
            if (key) {
              Cookies.set("ApiKey", key, { expires: 1 });
              navigate("../moderation");
            }
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
