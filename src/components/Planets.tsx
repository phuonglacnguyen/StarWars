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
    console.log(planet);

    return (
      <div className="card card-planet">
        <h2 key={planet.name}>{planet.name}</h2>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Population: {planet.population}</p>
        <br />
      </div>
    );
  });

  return (
    <div>
      <h1 className="txt-shadow-gold">Planets</h1>
      <main>{allPlanetsOnPage}</main>
    </div>
  );
}

export default Planets;
