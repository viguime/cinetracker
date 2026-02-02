import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the movie state
interface MovieState {
  movies: Array<unknown>; // You can define a more specific type for movies if needed
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Create the movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Reducer to handle fetching movies
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action: PayloadAction<Array<unknown>>) {
      state.loading = false;
      state.movies = action.payload;
    },
    fetchMoviesFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFail } = movieSlice.actions;
export default movieSlice.reducer;
