import React, { useEffect, useState } from "react";
import axios from "axios";
// console.log(React);
function Planets() {
  const [isLoading, setLoading] = useState(true);
  const [starWarsDataPlanets, setStarWarsDataPlanets] = useState([]);
  const [urlPlanets, setUrlPlanets] = useState(
    `https://swapi.info/api/planets`
  );

  useEffect(() => {
    axios.get(urlPlanets).then((response: any) => {
      setStarWarsDataPlanets(response.data);
      setLoading(false);
    });
  }, [urlPlanets]);

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="txt-shadow-gold">Planets</h1>
          <button disabled={true}>⏪ Previous Page</button>
          <button disabled={true}>Next Page⏩</button>
        </div>
        <div className="overlay">Loading...</div>
      </div>
    );
  }

  const allPlanetsOnPage = starWarsDataPlanets.map((planet: any) => {
    return (
      <div key={planet.url} className="card card-planet">
        <h2>{planet.name}</h2>
        <p>Population: {planet.population}</p>
        <p>Rotation period: {planet.rotation_period}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
        <br />
      </div>
    );
  });

  return (
    <div>
      <h1 className="main-title">STAR WARS</h1>
      <h1 className="txt-shadow-gold">Planets</h1>
      <main>{allPlanetsOnPage}</main>
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

export default Planets;
