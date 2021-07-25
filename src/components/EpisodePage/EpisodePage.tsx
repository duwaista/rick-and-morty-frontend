import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./EpisodePage.css";

const episodesUrl = "https://rickandmortyapi.com/api/episode/";

type EpisodeTypes = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
};

type IdType = {
  id: string;
};

export default function EpisodePage(): JSX.Element {
  const { id }: IdType = useParams();
  const [episode, setEpisode] = useState<EpisodeTypes[]>([]);

  useEffect(() => {
    axios
      .get(episodesUrl + id)
      .then((responce) => {
        console.log(responce);
        setEpisode(responce.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return (
    <>
      <h2>{}</h2>
    </>
  );
}
