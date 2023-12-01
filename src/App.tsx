import "./App.css";
import Header from "./components/Header";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import ModerationPage from "./components/ModerationPage";
import Details from "./components/Details";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Test from "./components/Test";
import React from "react";

function App() {
  return (

    <HashRouter >

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
        <Route path="moderation" element={<ModerationPage />}>
        <Route path=":entryID" element={<Details />}></Route>
        </Route>
        <Route path="" index  element={<Homepage />} />

        <Route path="test" element={<Test />} />

        <Route path="login" element={<Login />} />
      </Routes>
    </div>
      </HashRouter>
  );
}

export default App;
