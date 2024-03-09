import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  name: string | null;
}

const PeopleDetail = ({ name }: Props) => {
  const [starWarsDataFilms, setStarWarsDataFilms] = useState([]);
  const [urlFilms, setUrlFilms] = useState(`https://swapi.info/api/films`);

  const [starWarsDataPeople, setStarWarsDataPeople] = useState([]);
  const [urlPeople, setUrlPeople] = useState(`https://swapi.info/api/people`);

  const [starWarsDataPlanets, setStarWarsDataPlanets] = useState([]);
  const [urlPlanets, setUrlPlanets] = useState(
    `https://swapi.info/api/planets`
  );

  useEffect(() => {
    axios.get(urlPlanets).then((response) => {
      setStarWarsDataPlanets(response.data);
    });
  }, [urlPlanets]);

  useEffect(() => {
    axios.get(urlFilms).then((response) => {
      setStarWarsDataFilms(response.data);
    });
  }, [urlFilms]);

  useEffect(() => {
    axios.get(urlPeople).then((response) => {
      setStarWarsDataPeople(response.data);
    });
  }, [urlPeople]);

  let separator = "<br>";
  let moviesTitle: any = [];
  starWarsDataPeople.map((people: any) => {
    if (people.name === name) {
      Object.keys(people.films).forEach(function (key) {
        starWarsDataFilms.map((film: any) => {
          if (people.films[key] === film.url) {
            moviesTitle.push(film.title);
          }
        });
      });
    }
  });

  return (
    <>
      <div className="card card-people">
        <h2>Name : {name}</h2>
        <p>
          Year :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.birth_year : ""
          )}
        </p>
        <p>
          Gender :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.gender : ""
          )}
        </p>
        <p>
          Planet:{" "}
          {starWarsDataPeople.map((people: any) =>
            starWarsDataPlanets.map((planet: any) =>
              planet.url === people.homeworld && people.name === name
                ? planet.name
                : ""
            )
          )}
        </p>
        <p>
          Films :<span id="films">{moviesTitle.join(", ")}</span>
        </p>
        <p>
          Created :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.created : ""
          )}
        </p>

        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./people";
          }}
        >
          &lt;&lt; Back
        </button>
      </div>
    </>
  );
};

export default PeopleDetail;
