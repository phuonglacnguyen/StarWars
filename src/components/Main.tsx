import axios from "axios";
import React, { useEffect, useState } from "react";

function Main() {
  const [starWarsDataFilms, setStarWarsDataFilms] = useState([]);
  const [urlFilms, setUrlFilms] = useState(`https://swapi.info/api/films`);

  useEffect(() => {
    axios.get(urlFilms).then((response: any) => {
      setStarWarsDataFilms(response.data);
    });
  }, [urlFilms]);

  const allFilmsOnPage = starWarsDataFilms.map((film: any) => {
    return (
      <div key={film.url} className="card card-films">
        <h2>{film.title}</h2>
        <p>Director: {film.director}</p>
        <p>Release date: {film.release_date}</p>
        <p>Episode: {film.episode_id}</p>
        <br />
        <p>{film.opening_crawl}</p>
        <br />
      </div>
    );
  });

  return (
    <main className="center txt-shadow-red">
      <h1 className="main-title">STAR WARS</h1>
      <h1 className="txt-shadow-gold">Films</h1>
      {allFilmsOnPage}
    </main>
  );
}

export default Main;
