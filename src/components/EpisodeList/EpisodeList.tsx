import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./EpisodeList.css";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import {
  actions,
  AppState,
  FetchEpisodeList,
  FetchNextPage,
  FetchSearchQuery,
} from "../../store/store";

export default function EpisodeList(): JSX.Element {
  const dispatch = useDispatch();
  const results = useSelector(
    (state: AppState) => state.episodesSlice.episodesList
  );
  const info = useSelector(
    (state: AppState) => state.episodesSlice.episodesInfo
  );
  const searchResults = useSelector(
    (state: AppState) => state.episodesSlice.searchQueryResults
  );
  const [query, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    dispatch(FetchEpisodeList());
  }, [dispatch]);

  // Вызываем сортировку
  const sortByName = () => {
    dispatch(actions.EpisodesSlice.sortByName());
  };
  // Вызываем сортировку
  const sortByDate = () => {
    dispatch(actions.EpisodesSlice.sortByDate());
  };
  const handleSearchQuery = () => {
    dispatch(FetchSearchQuery({ query }));
    setShowResults(true);
  };
  const getNextPage = (url: string) => {
    dispatch(FetchNextPage({ url }));
  };

  return (
    <>
      {showResults && (
        <div
          role="presentation"
          onClick={() => setShowResults(false)}
          className="episode-results-background"
        />
      )}
      <div className="episode-list-container">
        <div className="episode-search-container">
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Название эпизода"
            className="episode-search"
          />
          <button
            onClick={() => handleSearchQuery()}
            type="button"
            className="episode-search-button"
          >
            Поиск
          </button>
          {showResults && (
            <div className="episode-search-results">
              {searchResults.map((result) => (
                <span key={result.id} className="accent episode-results-item">
                  <Link to={`/episode/${result.id}`}>{result.name}</Link>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="episodes-list-item-titles">
          <span
            role="presentation"
            onClick={() => sortByDate()}
            title="Сортировать по серии"
            className="episode-title-number"
          >
            #
          </span>
          <span
            role="presentation"
            onClick={() => sortByName()}
            title="Сортировать по имени"
            className="episode-title-name"
          >
            Название
          </span>
          <span
            role="presentation"
            onClick={() => sortByDate()}
            title="Сортировать по дате"
            className="episode-title-date"
          >
            Дата выхода
          </span>
        </div>
        {useMemo(() => {
          return results.map((result) => (
            <EpisodeItem key={result.id} props={result} />
          ));
        }, [results])}
        {info.count !== results.length && (
          <div
            role="presentation"
            className="episode-next-page-button"
            onClick={() => getNextPage(info.next)}
          >
            Показать ещё
          </div>
        )}
      </div>
    </>
  );
}
