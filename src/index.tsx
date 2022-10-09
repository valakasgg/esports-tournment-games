import React from "react";
import ReactDOM from "react-dom";
import TournmentGames from "./components/tournmentGames";
import './app.css'; // Import css modules stylesheet as styles

ReactDOM.render(
  <React.StrictMode>
    <TournmentGames />
  </React.StrictMode>,
  document.getElementById("root")
);
