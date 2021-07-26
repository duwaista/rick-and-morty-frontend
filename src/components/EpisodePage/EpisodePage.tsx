import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EpisodePage.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchOneEpisode } from "../../store/store";

type IdType = {
  id: string;
};

export default function EpisodePage(): JSX.Element {
  const { id }: IdType = useParams();
  const dispatch = useDispatch();
  const episode = useSelector(
    (state: AppState) => state.episodesSlice.currentEpisode
  );

  useEffect(() => {
    dispatch(fetchOneEpisode({ id }));
  }, [dispatch, id]);

  return (
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
        <span className="episode-info-iten">{episode.air_date}</span>
        <span className="episode-info-iten">Персонажи (лол):</span>
        {episode.characters.map((character) => (
          <span className="episode-info-iten" key={character}>
            {character}
          </span>
        ))}
      </div>
    </div>
  );
}
