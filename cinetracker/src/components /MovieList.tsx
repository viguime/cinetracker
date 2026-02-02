import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getMovies } from "../store/slices/movieSlice";
import {RootState} from "../store/store";

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);

    useEffect(() => {
        dispatch(getMovies() as any);
    }, [dispatch]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (    
        <div>
            <h2>Movie List</h2>
            <ul>
                {movies.map((movie: any, index: number) => (
                    <li key={index}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;