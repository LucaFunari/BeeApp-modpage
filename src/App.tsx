import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import ModerationPage from "./components/ModerationPage";
import Details from "./components/Details";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import * as React from "react";

function App() {
  const [isShowingApproved, setIsShowingApproved] =
    React.useState<boolean>(false);

  return (
    <div
      className=" dark:text-slate-50 
    bg-stone-100
      dark:bg-background-gray
      flex flex-col
      h-screen 
      "
    >
      <Header />

      <Routes>
        <Route
          path="moderation"
          element={
            <ModerationPage
              setShowingApproved={setIsShowingApproved}
              showingApproved={isShowingApproved}
            />
          }
        >
          <Route path=":entryID" element={<Details />}></Route>
        </Route>
        <Route index element={<Homepage />} />

        {/* <Route path="test" element={<Test />} /> */}

        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
