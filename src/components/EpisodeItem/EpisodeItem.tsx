import React from "react";
import { Link } from "react-router-dom";
import "./EpisodeItem.css";

export type EpisodeItemProps = {
  props: {
    id: string;
    // Костыль, чтобы успокоить линтер
    // eslint-disable-next-line camelcase
    air_date: string;
    url: string;
    name: string;
    date: Date;
    episode: string;
  };
};

export default function EpisodeItem({ props }: EpisodeItemProps): JSX.Element {
  // Прекрасный костыль для получения сезона и серии в сезоне
  const episodeCodeArr = props.episode.split("", 6);

  return (
    <>
      <div className="episode-item-container">
        <span title="Серия в сезоне" className="episode-item-number">
          {episodeCodeArr[4] !== "0" && (
            <span className="episode-item-number-fixer">
              {episodeCodeArr[4]}
            </span>
          )}
          {episodeCodeArr[5]}
        </span>
        <Link to={`/episode/${props.id}`}>
          <span
            title={`${props.name} Сезон ${episodeCodeArr[2]}`}
            className="episode-item-name accent"
          >
            {props.name}
          </span>
        </Link>
        <span className="episode-item-date">{props.air_date}</span>
      </div>
    </>
  );
}
