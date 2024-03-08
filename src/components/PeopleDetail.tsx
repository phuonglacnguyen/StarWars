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

  useEffect(() => {
    axios.get(urlFilms).then((response) => {
      setStarWarsDataFilms(response.data);
    });
  }, [urlFilms]);

  useEffect(() => {
    axios.get(urlPeople).then((response) => {
      setStarWarsDataPeople(response.data);
      //console.log(response.data);
    });
  }, [urlPeople]);
  //const [films, setFilms] = useState([]);

  starWarsDataFilms.map((film: any) => {
    //if (film.name === name) {
    //console.log(film.title);
    //}
  });

  let separator = "<br>";
  let moviesTitle: any = [];
  starWarsDataPeople.map((people: any) => {
    if (people.name === name) {
      Object.keys(people.films).forEach(function (key) {
        //console.log(people.films[key]);
        starWarsDataFilms.map((film: any) => {
          if (people.films[key] === film.url) {
            //console.log(film.title);
            moviesTitle.push(film.title);
            //document.getElementById('films')?.innerHTML = film.title + '<br />';
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
          Home world :{" "}
          {starWarsDataPeople.map((people: any) =>
            people.name === name ? people.homeworld : ""
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
      </div>
    </>
  );
};

export default PeopleDetail;
