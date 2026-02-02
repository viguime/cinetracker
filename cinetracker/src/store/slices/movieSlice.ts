import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchMovies } from '../../services/api';

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
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<Array<unknown>>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    },  
});

export const getMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { rejectWithValue }) => {
        try {
            const movies = await fetchMovies();
            return movies;
        } catch (error) {
            return rejectWithValue('Failed to fetch movies' + (error instanceof Error ? `: ${error.message}` : ''));
        }
    }
);

// Export actions and reducer
export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFail } = movieSlice.actions;
export default movieSlice.reducer;
