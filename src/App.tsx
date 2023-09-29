import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ModerationPage from "./components/ModerationPage";
import Details from "./components/Details";
import Homepage from "./components/Homepage";
import Login from "./components/Login";

const logged = true;
function App() {
  return (
    <div
      className=" dark:text-slate-50 h-screen max-h-500
bg-stone-100

      dark:bg-background-gray
flex
flex-col
  "
    >
      <Header />
      <Routes>
        <Route index element={<Homepage />} />

        <Route path="login" element={<Login />} />
        <Route path="moderation" element={<ModerationPage logged={logged} />}>
          <Route path=":entryID" element={<Details />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
