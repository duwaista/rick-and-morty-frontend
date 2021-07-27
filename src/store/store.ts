import {
  combineReducers,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const episodesUrl = "https://rickandmortyapi.com/api/episode/";
const charactersUrl = "https://rickandmortyapi.com/api/character/";
const episodeSearchQuery = "https://rickandmortyapi.com/api/episode/?name=";

type IdPayloadType = {
  id: string;
};

type UrlFetchPayload = {
  url: string;
};

type SearchPayloadType = {
  query: string;
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

type EpisodeInfoTypes = {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
};

type IEpisodesSlice = {
  episodesList: any[];
  searchQueryResults: any[];
  currentEpisode: EpisodeTypes;
  episodesInfo: EpisodeInfoTypes;
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

// Берём список серий с сервера
export const FetchEpisodeList = createAsyncThunk(
  "fetchEpisodeList",
  async () => {
    try {
      const responce = await axios.get(episodesUrl);
      return await responce.data;
    } catch (error) {
      // "Обработка" ошибок
      alert(error);
      return null;
    }
  }
);

export const FetchSearchQuery = createAsyncThunk(
  "fetchSearchQuery",
  async ({ query }: SearchPayloadType) => {
    try {
      const responce = await axios.get(episodeSearchQuery + query);
      return responce.data;
    } catch (error) {
      return null;
    }
  }
);

// Берём информацию о серии с сервера
export const FetchOneEpisode = createAsyncThunk(
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

export const FetchNextPage = createAsyncThunk(
  "fetchNextPage",
  async ({ url }: UrlFetchPayload) => {
    try {
      const responce = await axios.get(url);
      return responce.data;
    } catch (error) {
      alert(error);
      return null;
    }
  }
);

// Берём информацию о персонаже с сервера
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

// Можно вынести в отдельный файл
export const EpisodesSlice = createSlice({
  name: "episodesSlice",
  initialState: {
    episodesList: [],
    searchQueryResults: [],
    episodesInfo: {
      count: 0,
      pages: 0,
      next: "",
      prev: null,
    },
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
      // Сортировка списка серий по имени
      // Никакой иммутабельности(
      state.episodesList.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortByDate: (state) => {
      // Сортировка списка серий по дате (id)
      // Никакой иммутабельности(
      state.episodesList.sort((a, b) => a.id - b.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchEpisodeList.fulfilled, (state, action) => {
        state.episodesList = [...action.payload.results];
        state.episodesInfo = action.payload.info;
      })
      .addCase(FetchOneEpisode.fulfilled, (state, action) => {
        state.currentEpisode = action.payload;
      })
      .addCase(FetchNextPage.fulfilled, (state, action) => {
        state.episodesList = [
          ...state.episodesList.concat(action.payload.results),
        ];
        state.episodesInfo = action.payload.info;
      })
      .addCase(FetchSearchQuery.fulfilled, (state, action) => {
        if (action.payload) {
          state.searchQueryResults = [...action.payload.results];
          console.log(action.payload);
        } else {
          const noResults = { name: "Ничего не найдено" };
          state.searchQueryResults = [...[noResults]];
          console.log(action.payload);
        }
      });
  },
});

// Можно вынести в отдельный файл
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
