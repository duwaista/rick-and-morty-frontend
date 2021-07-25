import React, { useEffect, useMemo, useState } from "react";
import "./EpisodeList.css";
import axios from "axios";
import EpisodeItem from "../EpisodeItem/EpisodeItem";

export default function EpisodeList() {
  const allEpisodesUrl = "https://rickandmortyapi.com/api/episode";
  const [episodesInfo, setEpisodeInfo] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Запрос к серверу
    axios
      .get(allEpisodesUrl)
      .then((response) => {
        setResults(response.data.results);
        setEpisodeInfo(response.data.info);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const resultsSort = (sortType: string) => {
    // Сохраняем значение, чтобы менять состояние
    const sorteredResults = [...results];

    if (sortType === "name") {
      // Сортируем массив по названию серии
      sorteredResults.sort((a, b) => a.name.localeCompare(b.name));
      setResults(sorteredResults);
    } else {
      // Сортируем массив по дате (сервер гарантирует, что id соответсвует дате выхода)
      sorteredResults.sort((a, b) => a.id - b.id);
      setResults(sorteredResults);
    }
  };

  return (
    <>
      <div className="episode-list-container">
        <div className="episodes-list-item-titles">
          <span
            onClick={() => resultsSort("id")}
            title="Сортировать по серии"
            className="episode-title-number"
          >
            #
          </span>
          <span
            onClick={() => resultsSort("name")}
            title="Сортировать по имени"
            className="episode-title-name"
          >
            Название
          </span>
          <span
            onClick={() => resultsSort("date")}
            title="Сортировать по дате"
            className="episode-title-date"
          >
            Дата выхода
          </span>
        </div>
        {useMemo(() => {
          return results.map((result, index) => (
            <EpisodeItem key={index} props={result} />
          ));
        }, [results])}
      </div>
    </>
  );
}
