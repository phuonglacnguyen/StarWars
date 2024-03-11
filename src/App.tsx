import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Planets from "./components/Planets";
import Starships from "./components/Sharships";
import People from "./components/People";
import PeopleDetail from "./components/PeopleDetail";
import { Route, Routes } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const [selectedComponent, setSelectedComponent] = useState("");

  return (
    <>
      <nav className="nav">
        <li
          className="homeButton"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./";
          }}
        >
          <MovieFilterIcon /> Films
        </li>
        <li
          className="planetButton"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./planets";
          }}
        >
          <PublicIcon /> Planets
        </li>
        <li
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./starships";
          }}
          className="starshipButton"
        >
          <RocketLaunchIcon /> Starships
        </li>
        <li
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./people";
          }}
          className="peoplepButton"
        >
          <ManageAccountsOutlinedIcon /> People
        </li>
      </nav>

      <div id="ctn-main">
        {selectedComponent === "Main" && !name ? <Main /> : ""}
        <Routes>
          <Route path="/" Component={() => <Main />} />
          <Route path="/planets" Component={() => <Planets />} />
          <Route path="/starships" Component={() => <Starships />} />
          <Route path="/people" Component={() => <People />} />
          <Route
            path="/Peopledetail"
            Component={() => <PeopleDetail name={name} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
