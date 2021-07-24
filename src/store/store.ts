import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({})

const store = configureStore({
	reducer: reducer
})

export default store;

export type AppState = ReturnType<typeof store.getState>;
