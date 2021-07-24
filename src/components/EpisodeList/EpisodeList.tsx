import React, { useEffect, useMemo, useState } from "react";
import "./EpisodeList.css";
import axios from "axios";
import EpisodeItem from "../EpisodeItem/EpisodeItem";

export default function EpisodeList() {
  const allEpisodesUrl = "https://rickandmortyapi.com/api/episode";
  const [results, setResults] = useState([]);

  useEffect(() => {
		// Запрос к серверу
    axios.get(allEpisodesUrl)
      .then((response) => {
        setResults(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

	const nameSort = () => {
		// console.log(Object.getOwnPropertyNames(results));
		console.log(results)
	}

  return (
    <>
      <div className="episode-list-container">
        <div className="episodes-list-item-titles">
          <span className="episode-title-number">#</span>
          <span onClick={nameSort} className="episode-title-name">Название</span>
          <span className="episode-title-date">Дата выхода</span>
        </div>
        {/* Без мемоизации, т.к. используется внутреннее состояние компонента */}
        {results.map((result, index) => (
          <EpisodeItem key={result.id} props={result} />
        ))}
      </div>
    </>
  );
}
