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
  return (
    <>
      <div className="episode-item-container">
        <span className="episode-item-number">{props.id}</span>
        <Link to={`/episode/${props.id}`}>
          <span className="episode-item-name accent">{props.name}</span>
        </Link>
        <span className="episode-item-date">{props.air_date}</span>
      </div>
    </>
  );
}
