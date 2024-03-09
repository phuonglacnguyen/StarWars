import React, { useState, useEffect } from "react";
import axios from "axios";

function Starships() {
  const [isLoading, setLoading] = useState(true);
  const [starWarsDataStarships, setStarWarsDataStarships] = useState([]);
  const [urlStarships, setUrlStarships] = useState(
    `https://swapi.info/api/starships/?page=1`
  );

  useEffect(() => {
    axios.get(urlStarships).then((response) => {
      setStarWarsDataStarships(response.data);
      setLoading(false);
    });
  }, [urlStarships]);

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="txt-shadow-red">Starships</h1>
          <button disabled={true}>⏪ Previous Page</button>
          <button disabled={true}>Next Page⏩</button>
        </div>
        <div className="overlay">Loading...</div>
      </div>
    );
  }

  const allStarshipsOnPage = starWarsDataStarships.map((Starship: any) => {
    return (
      <div key={Starship.url} className="card card-starships">
        <h2>{Starship.name}</h2>
        <p>Manufacturer: {Starship.manufacturer}</p>
        <p>Cost in credits: {Starship.cost_in_credits}</p>
        <p>Length: {Starship.length}</p>
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
