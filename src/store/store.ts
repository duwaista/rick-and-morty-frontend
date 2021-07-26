import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const episodesUrl = "https://rickandmortyapi.com/api/episode/";
const charactersUrl = "https://rickandmortyapi.com/api/character/";

type IdPayloadType = {
  id: string;
};

interface EpisodeTypes {
  id: number;
  name: string;
  // Костыль, чтобы успокоить линтер
  // eslint-disable-next-line camelcase
  air_date: string;
  episode: string;
  characters: [];
  url: string;
  created: string;
}

type IEpisodesSlice = {
  episodesList: any[];
  currentEpisode: EpisodeTypes;
};

type ICharacterSlice = {
  characterInfo: {
    image: string;
    name: string;
    status: string;
    type: string;
    gender: string;
    species: string;
    location: {
      name: string;
    };
  };
};

export type CharListType = {
  characters: any[];
};

// Берём данные с сервера
export const fetchEpisodeList = createAsyncThunk(
  "fetchEpisodeList",
  async () => {
    try {
      const responce = await axios.get(episodesUrl);
      return await responce.data.results;
    } catch (error) {
      // "Обработка" ошибок
      alert(error);
      return null;
    }
  }
);

export const fetchOneEpisode = createAsyncThunk(
  "fetchOneEpisode",
  async ({ id }: IdPayloadType) => {
    try {
      const responce = await axios.get(episodesUrl + id);
      return await responce.data;
    } catch (error) {
      alert(error);
      return null;
    }
  }
);

export const FetchOneCharacter = createAsyncThunk(
  "fetchOneCharacter",
  async ({ id }: IdPayloadType) => {
    try {
      const responce = await axios.get(charactersUrl + id);
      return responce.data;
    } catch (error) {
      alert(error);
      return null;
    }
  }
);

export const EpisodesSlice = createSlice({
  name: "episodesSlice",
  initialState: {
    episodesList: [],
    currentEpisode: {
      id: 0,
      name: "",
      air_date: "",
      episode: "",
      characters: [],
      url: "",
      created: "",
    },
  } as IEpisodesSlice,
  reducers: {
    sortByName: (state) => {
      // Сортировка списка по имени
      state.episodesList.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortByDate: (state) => {
      // Сортировка списка по дате
      state.episodesList.sort((a, b) => a.id - b.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodeList.fulfilled, (state, action) => {
        state.episodesList = [...action.payload];
      })
      .addCase(fetchOneEpisode.fulfilled, (state, action) => {
        state.currentEpisode = action.payload;
      });
  },
});

export const CharactersSlice = createSlice({
  name: "charactersSlice",
  initialState: {
    characterInfo: {
      name: "",
      image: "",
      gender: "",
      species: "",
      status: "",
      type: "",
      location: {
        name: "",
      },
    },
  } as ICharacterSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchOneCharacter.fulfilled, (state, action) => {
      state.characterInfo = action.payload;
    });
  },
});

const reducer = combineReducers({
  episodesSlice: EpisodesSlice.reducer,
  charactersSlice: CharactersSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;

export const actions = {
  EpisodesSlice: EpisodesSlice.actions,
  CharactersSlice: CharactersSlice.actions,
};

export type AppState = ReturnType<typeof store.getState>;
