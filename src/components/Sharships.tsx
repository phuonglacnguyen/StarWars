import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

interface starship {
  url: string;
  name: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  max_atmosphering_speed: string;
  crew: string;
  passengers: number;
  cargo_capacity: number;
}

interface user {
  name: string;
}

function Starships() {
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [starWarsDataOriginalStarships, setStarWarsDataOriginalStarships] =
    useState([]);

  const [isLoading, setLoading] = useState(true);
  const [starWarsDataStarships, setStarWarsDataStarships] = useState([]);
  const [urlStarships, setUrlStarships] = useState(
    `https://swapi.info/api/starships/?page=1`
  );
  let autoComleteNames: any = [];

  useEffect(() => {
    axios.get(urlStarships).then((response) => {
      setStarWarsDataStarships(response.data);
      setStarWarsDataOriginalStarships(response.data);
      setLoading(false);
    });
  }, [urlStarships]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    let searchInput = document.getElementById("search")?.getAttribute("value");
    if (searchTerm === "") {
      setSearchItem("");
      setStarWarsDataStarships(starWarsDataOriginalStarships);
      starWarsDataStarships.map((Starship: starship) => {
        autoComleteNames.push(Starship.name);
      });
    }
    setSearchItem(searchTerm);
    let filteredItems = starWarsDataOriginalStarships.filter((user: user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      setStarWarsDataStarships(starWarsDataOriginalStarships);
      setStarWarsDataStarships(filteredItems);
    } else {
      console.log("reset people ...#FFECBF", starWarsDataStarships);
    }
    setFilteredUsers(filteredItems);
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="txt-shadow-red">Starships</h1>
        </div>
        <div className="overlay">Loading...</div>
      </div>
    );
  }

  const allStarshipsOnPage = starWarsDataStarships.map((Starship: starship) => {
    autoComleteNames.push(Starship.name);
    return (
      <div key={Starship.url} className="card card-starships">
        <h2>{Starship.name}</h2>
        <p>Manufacturer: {Starship.manufacturer}</p>
        <p>Cost in credits: {Starship.cost_in_credits}</p>
        <p>Length: {Starship.length}</p>
        <br />
        <p>Max atmosphering speed: {Starship.max_atmosphering_speed}</p>
        <p>Crew: {Starship.crew}</p>
        <p>Passengers: {Starship.passengers}</p>
        <p>Cargo capacity: {Starship.cargo_capacity}</p>
        <br />
      </div>
    );
  });

  return (
    <div>
      <h1 className="main-title">STAR WARS</h1>
      <h1 className="txt-shadow-red">Starships</h1>
      <center>
        <Autocomplete
          options={autoComleteNames}
          sx={{ width: 300, "& input": { padding: 0 } }}
          className="autocomplete"
          renderInput={(params) => (
            <TextField
              {...params}
              className="autocompletetext"
              label="Search by name"
              onChange={handleInputChange}
              onSelect={handleInputChange}
            />
          )}
        />
      </center>
      <br />
      <main>{allStarshipsOnPage}</main>
      <button
        onClick={() =>
          (document.body.scrollTop = document.documentElement.scrollTop = 0)
        }
      >
        Top
      </button>
    </div>
  );
}

export default Starships;
