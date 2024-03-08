import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
//import Link from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";

function People() {
  const [isLoading, setLoading] = useState(true);
  const [starWarsDataPeople, setStarWarsDataPeople] = useState([]);
  const [urlPeople, setUrlPeople] = useState(`https://swapi.info/api/people`);

  const [starWarsDataPlanets, setStarWarsDataPlanets] = useState([]);
  const [urlPlanets, setUrlPlanets] = useState(
    `https://swapi.info/api/planets`
  );

  useEffect(() => {
    axios.get(urlPlanets).then((response) => {
      setStarWarsDataPlanets(response.data);
      //setLoading(false);
    });
  }, [urlPlanets]);

  useEffect(() => {
    axios.get(urlPeople).then((response) => {
      setStarWarsDataPeople(response.data);
      setLoading(false);
    });
  }, [urlPeople]);

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

  const allPeopleOnPage = starWarsDataPeople.map((people: any) => {
    //console.log(people);
    //var currentWorld = '';

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

        <a href={`/peopledetail?name=${people.name}`}>...more</a>

        <br />
      </div>
    );
  });

  return (
    <div>
      <h1 className="txt-shadow-blue">People</h1>
      <main>{allPeopleOnPage}</main>
    </div>
  );
}

export default People;
