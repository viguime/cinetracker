import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getMovies } from "../store/slices/movieSlice";
import type { RootState } from "../store/store";

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);

    useEffect(() => {
        dispatch(getMovies() as any);
    }, [dispatch]);
    
    if (loading) {
        return <div>Loading movies...</div>;
    }

    if (error) {
        const isAuthError = error.includes('401') || error.includes('API key');
        return (
            <div style={{ padding: '20px', border: '1px solid #ff6b6b', borderRadius: '8px', backgroundColor: '#ffe0e0' }}>
                <h3>🎬 Movie List</h3>
                {isAuthError ? (
                    <div>
                        <p>⚠️ TMDB API key not configured</p>
                        <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                            To fetch movies, you need to:
                        </p>
                        <ol style={{ fontSize: '0.9em', textAlign: 'left', margin: '10px auto', maxWidth: '400px' }}>
                            <li>Get a free API key from <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer">TMDB</a></li>
                            <li>Add it to <code>src/services/api.ts</code></li>
                        </ol>
                    </div>
                ) : (
                    <p>Error: {error}</p>
                )}
            </div>
        );
    }
    
    return (    
        <div>
            <h2>Movie List</h2>
            {movies.length === 0 ? (
                <p>No movies found</p>
            ) : (
                <ul>
                    {movies.map((movie: any, index: number) => (
                        <li key={index}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MovieList;