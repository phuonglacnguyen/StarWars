import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

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
      <h1 className="main-title">STAR WARS</h1>
      <div className="card card-people">
        <h2>Name : {name}</h2>
        <p>
          Weight :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.mass : ""
          )}
        </p>
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
          Hair color :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.hair_color : ""
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
        <br />
        <p>
          Films :<span id="films">{moviesTitle.join(", ")}</span>
        </p>
        <br />
        <p>
          Created :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.created : ""
          )}
        </p>
        <br />
        <Button
          variant="outlined"
          href="#outlined-buttons"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "./people";
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default PeopleDetail;
