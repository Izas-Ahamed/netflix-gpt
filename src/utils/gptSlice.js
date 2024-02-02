import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    searchedMovies: null,
    searchedMoviesResults: null,
    userAPIKey: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addSearchedMovies: (state, action) => {
      const { moviesNames, moviesResults } = action.payload;
      state.searchedMovies = moviesNames;
      state.searchedMoviesResults = moviesResults;
    },
    addUserAPIKey: (state, action) => {
      state.userAPIKey = action.payload;
    },
  },
});

export const { toggleGptSearchView, addSearchedMovies, addUserAPIKey } =
  gptSlice.actions;

export default gptSlice.reducer;
