import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchOneEpisode } from "../../store/store";
import "./EpisodePage.css";

type IdType = {
  id: string;
};

export default function EpisodePage(): JSX.Element {
  const { id }: IdType = useParams();
  const dispatch = useDispatch();
  const episode = useSelector(
    (state: AppState) => state.episodesSlice.currentEpisode
  );
  const [results, setResults] = useState([]);

  useEffect(() => {
    dispatch(fetchOneEpisode({ id }));
  }, [dispatch, id]);

  // Запрашиваем информацию об всех персонажах эпихода
  useEffect(() => {
    const requests = episode.characters.map((url) => axios.get(url));
    Promise.all(requests).then((response) => setResults(response));
  }, [episode.characters]);

  return (
    <>
      <div className="episode-info-container">
        <img
          className="episode-info-poster"
          alt="poster"
          src="https://static-sl.insales.ru/images/products/1/1445/424478117/fp4913-rick-and-morty-season-4-part-one-v2.jpg"
        />
        <div className="episode-info-content">
          <span className="episode-info-name">
            <b>{episode.name}</b>
          </span>
          <span className="episode-info-date">{episode.air_date}</span>
        </div>
      </div>
      <h3>
        <span className="episode-info-characters">Персонажи эпизода:</span>
      </h3>
      <div className="episode-characters-container">
        {results.map((result) => (
          <Link
            to={`/character/${result.data.id}`}
            className="episode-info-item"
            title={result.data.name}
            key={result.data.id}
          >
            <img
              loading="lazy"
              className="episode-character-image"
              alt="Character"
              src={result.data.image}
            />
            <span className="episode-character-name">{result.data.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
