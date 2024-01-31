import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    searchedMovies: null,
    searchedMoviesResults: null,
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
  },
});

export const { toggleGptSearchView, addSearchedMovies } = gptSlice.actions;

export default gptSlice.reducer;
