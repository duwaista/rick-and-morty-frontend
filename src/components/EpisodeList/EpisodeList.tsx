import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EpisodeList.css";
import EpisodeItem from "../EpisodeItem/EpisodeItem";
import { actions, AppState, fetchEpisodeList } from "../../store/store";

export default function EpisodeList(): JSX.Element {
  const dispatch = useDispatch();
  const results = useSelector(
    (state: AppState) => state.episodesSlice.episodesList
  );

  useEffect(() => {
    dispatch(fetchEpisodeList());
  }, [dispatch]);

  // Вызываем сортировку
  const sortByName = () => {
    dispatch(actions.EpisodesSlice.sortByName());
  };

  // Вызываем сортировку
  const sortByDate = () => {
    dispatch(actions.EpisodesSlice.sortByDate());
  };

  return (
    <div className="episode-list-container">
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
        return results.map((result, index) => (
          <EpisodeItem key={result.id} props={result} />
        ));
      }, [results])}
    </div>
  );
}
