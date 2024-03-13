import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface user {
  name: string;
}

interface people {
  homeworld: string;
  name: string;
  gender: string;
}

interface planet {
  name: string;
  url: string;
}

function People() {
  const [searchItem, setSearchItem] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [starWarsDataPeople, setStarWarsDataPeople] = useState([]);
  const [starWarsDataOriginalPeople, setStarWarsDataOriginalPeople] = useState(
    []
  );
  const [urlPeople, setUrlPeople] = useState(`https://swapi.info/api/people`);

  const [starWarsDataPlanets, setStarWarsDataPlanets] = useState([]);
  const [urlPlanets, setUrlPlanets] = useState(
    `https://swapi.info/api/planets`
  );

  const [selectedPlanet, setSelectedPlanet] = useState("");

  useEffect(() => {
    axios.get(urlPlanets).then((response) => {
      setStarWarsDataPlanets(response.data);
    });
  }, [urlPlanets]);

  useEffect(() => {
    axios.get(urlPeople).then((response) => {
      setStarWarsDataPeople(response.data);
      setStarWarsDataOriginalPeople(response.data);
      setLoading(false);
    });
  }, [urlPeople]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    let searchInput = document.getElementById("search")?.getAttribute("value");
    if (searchTerm === "") {
      setSearchItem("");
      setStarWarsDataPeople(starWarsDataOriginalPeople);
    }
    setSearchItem(searchTerm);
    setStarWarsDataPeople(starWarsDataOriginalPeople);
    let filteredItems = starWarsDataOriginalPeople.filter((user: user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      setStarWarsDataPeople(filteredItems);
    } else {
      console.log("reset people ...#FFECBF", starWarsDataPeople);
    }
    setFilteredUsers(filteredItems);
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="txt-shadow-blue">People</h1>
        </div>
        <div className="overlay">Loading...</div>
      </div>
    );
  }

  function setSelectedPlanets(planet: string) {
    setSelectedPlanet(planet);
    setStarWarsDataPeople(starWarsDataOriginalPeople);
    let filteredPlanets = starWarsDataPeople.filter(
      (people: people) => people.homeworld === planet
    );
    if (filteredPlanets.length) {
      setStarWarsDataPeople(filteredPlanets);
    }
  }

  let allPeopleOnPage = starWarsDataPeople.map((people: people) => {
    return (
      <div key={people.name} className="card card-people">
        <h2>{people.name}</h2>
        <p>Gender: {people.gender}</p>
        <p>
          Planet:{" "}
          {starWarsDataPlanets.map((planet: planet) =>
            planet.url === people.homeworld ? planet.name : ""
          )}
        </p>
        <br />
        <Button
          variant="outlined"
          href="#outlined-buttons"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/peopledetail?name=${people.name}`;
          }}
        >
          More ...
        </Button>
        <br />
      </div>
    );
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Do something
  };

  return (
    <div>
      <h1 className="main-title">STAR WARS</h1>
      <h1 className="txt-shadow-blue">People</h1>

      <TextField
        id="outlined-basic"
        className="searchField"
        label="Search by name"
        variant="outlined"
        onChange={handleInputChange}
      />

      <Select
        id="demo-simple-select"
        className="filterPlanet"
        onChange={(e: any) => {
          setSelectedPlanets(e.target.value);
        }}
      >
        {starWarsDataPlanets.map((planet: planet) => (
          <MenuItem key={planet.url} value={planet.url}>
            {planet.name}
          </MenuItem>
        ))}
      </Select>

      <br />
      <br />
      <main>{allPeopleOnPage}</main>
    </div>
  );
}

export default People;
