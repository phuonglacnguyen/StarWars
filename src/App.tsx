import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Main from "./components/Main";
import Planets from "./components/Planets";
import Starships from "./components/Sharships";
import People from "./components/People";
import PeopleDetail from "./components/PeopleDetail";
import { Route, Routes } from "react-router-dom";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");

  const [selectedComponent, setSelectedComponent] = useState("Main");

  return (
    <>
      <nav>
        <button onClick={() => setSelectedComponent("Main")}>Main Page</button>
        <button onClick={() => setSelectedComponent("Planets")}>Planets</button>
        <a href="/Planets">...Planets url</a>
        <button onClick={() => setSelectedComponent("Starships")}>
          Starships
        </button>
        <button onClick={() => setSelectedComponent("People")}>People</button>
        <button onClick={() => setSelectedComponent("Peopledetail")}>
          People detail
        </button>
      </nav>
      <div id="ctn-main">
        {selectedComponent === "Main" && <Main />}
        {selectedComponent === "Planets" && <Planets />}
        {selectedComponent === "Starships" && <Starships />}
        {selectedComponent === "People" && <People />}
        {selectedComponent === "Peopledetail" && <PeopleDetail name={name} />}

        <Routes>
          <Route path="/planets" Component={() => <Planets />} />
          <Route path="/starships" Component={() => <Starships />} />
          <Route path="/people" Component={() => <People />} />
          <Route
            path="/Peopledetail"
            Component={() => <PeopleDetail name={name} />}
          />
          {/* <Route
            path="/Peopledetail/:name"
            render={( match: any ) => (
              <PeopleDetail item={data.find((item : any) => String(item.id) === String(match.params.name))} />
            )}
          /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
