import { useState, useEffect } from "react";
import axios from "axios";

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

  const handleInputChange = (e: any) => {
    const searchTerm = e.target.value;
    let searchInput = document.getElementById("search")?.getAttribute("value");
    //console.log(searchInput);
    setSearchItem(searchTerm);
    setStarWarsDataPeople(starWarsDataOriginalPeople);
    let filteredItems = starWarsDataPeople.filter((user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredItems.length > 0) {
      //   setStarWarsDataPeople(starWarsDataSearchPeople);
      setStarWarsDataPeople(filteredItems);
    } else {
      console.log("reset people ...#FFECBF", starWarsDataPeople);
    }
    setFilteredUsers(filteredItems);
    //console.log(filteredItems);
  };

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="txt-shadow-blue">People</h1>
          <button disabled={true}>⏪ Previous Page</button>
          <button disabled={true}>Next Page⏩</button>
        </div>
        <div className="overlay">Loading...</div>
      </div>
    );
  }

  function setSelectedPlanets(planet: string) {
    setSelectedPlanet(planet);
    setStarWarsDataPeople(starWarsDataOriginalPeople);
    let filteredPlanets = starWarsDataPeople.filter(
      (people: any) => people.homeworld === planet
    );
    if (!filteredPlanets.length) {
      console.log("Nothing");
    } else {
      setStarWarsDataPeople(filteredPlanets);
    }
  }

  let allPeopleOnPage = starWarsDataPeople.map((people: any) => {
    return (
      <div key={people.name} className="card card-people">
        <h2>{people.name}</h2>
        <p>Gender: {people.gender}</p>
        <p>
          Planet:{" "}
          {starWarsDataPlanets.map((planet: any) =>
            planet.url === people.homeworld ? planet.name : ""
          )}
        </p>
        <a
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/peopledetail?name=${people.name}`;
          }}
        >
          &gt;&gt; more
        </a>
        <br />
      </div>
    );
  });

  return (
    <div>
      <h1 className="main-title">STAR WARS</h1>
      <h1 className="txt-shadow-blue">People</h1>
      <input
        id="search"
        type="text"
        onChange={handleInputChange}
        placeholder="Type to search"
      />

      <select
        onChange={(e) => {
          setSelectedPlanets(e.target.value);
        }}
      >
        <option>Filter by planet</option>
        {starWarsDataPlanets.map((planet: any) => (
          <option key={planet.url} value={planet.url}>
            {planet.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <main>{allPeopleOnPage}</main>
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

export default People;
