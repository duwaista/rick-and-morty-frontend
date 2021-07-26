import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState, FetchOneCharacter } from "../../store/store";
import "./CharacterPage.css";

type IdType = {
  id: string;
};

export default function CharacterPage(): JSX.Element {
  const { id }: IdType = useParams();
  const dispatch = useDispatch();
  const characterInfo = useSelector(
    (state: AppState) => state.charactersSlice.characterInfo
  );

  useEffect(() => {
    dispatch(FetchOneCharacter({ id }));
  }, [dispatch, id]);
  return (
    <>
      <div className="character-info-container">
        <img
          className="character-image"
          alt="Character"
          src={characterInfo.image}
        />
        <div className="character-info-content">
          <span className="character-info-name">
            <b>{characterInfo.name}</b>
          </span>
          <span className="character-info-item">
            Статус: {characterInfo.status}
          </span>
          <span className="character-info-item">
            Вид: {characterInfo.species}
          </span>
          {characterInfo.type && (
            <span className="character-info-item">
              Подвид: {characterInfo.type}
            </span>
          )}
          <span className="character-info-item">
            Пол: {characterInfo.gender}
          </span>
          <span className="character-info-item">
            Локация: {characterInfo.location.name}
          </span>
        </div>
      </div>
    </>
  );
}
