import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getMovies } from "../store/slices/movieSlice";
import type { RootState } from "../store/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Film, Loader2 } from "lucide-react";

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const loading = useSelector((state: RootState) => state.movies.loading);
    const error = useSelector((state: RootState) => state.movies.error);

    useEffect(() => {
        dispatch(getMovies() as any);
    }, [dispatch]);
    
    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading movies...</span>
            </div>
        );
    }

    if (error) {
        const isAuthError = error.includes('401') || error.includes('API key');
        return (
            <Card className="border-destructive bg-destructive/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {isAuthError ? 'API Key Required' : 'Error'}
                    </CardTitle>
                    <CardDescription className="text-destructive-foreground">
                        {isAuthError ? (
                            <div className="space-y-3 mt-2">
                                <p>To fetch movies, you need to configure your TMDB API key:</p>
                                <ol className="list-decimal list-inside space-y-2 text-sm">
                                    <li>
                                        Get a free API key from{' '}
                                        <a 
                                            href="https://www.themoviedb.org/settings/api" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="underline font-semibold hover:text-primary"
                                        >
                                            TMDB
                                        </a>
                                    </li>
                                    <li>Add it to your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
                                </ol>
                            </div>
                        ) : (
                            <p>{error}</p>
                        )}
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }
    
    if (movies.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>No Movies Found</CardTitle>
                    <CardDescription>Try again later</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie: any) => (
                <Card key={movie.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-600">
                    <div className="aspect-[2/3] relative bg-gray-300">
                        {movie.poster_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gray-300">
                                <Film className="w-12 h-12 md:w-16 md:h-16 text-black-500" />
                            </div>
                        )}
                    </div>
                    <CardHeader className="p-3 md:p-4">
                        <CardTitle className="text-base md:text-lg line-clamp-2">{movie.title}</CardTitle>
                        <CardDescription className="text-xs md:text-sm">
                            {movie.release_date && new Date(movie.release_date).getFullYear()}
                            {movie.vote_average > 0 && (
                                <span className="ml-2">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>
                    {movie.overview && (
                        <CardContent className="p-3 md:p-4 pt-0">
                            <p className="text-xs md:text-sm text-black line-clamp-3">
                                {movie.overview}
                            </p>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    );
}

export default MovieList;