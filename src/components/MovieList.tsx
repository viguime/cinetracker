import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { getMovies } from "../store/slices/movieSlice";
import type { RootState } from "../store/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Film, Loader2 } from "lucide-react";

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie: any) => (
                <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[2/3] relative bg-muted">
                        {movie.poster_path ? (
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <Film className="w-16 h-16 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">{movie.title}</CardTitle>
                        <CardDescription>
                            {movie.release_date && new Date(movie.release_date).getFullYear()}
                            {movie.vote_average > 0 && (
                                <span className="ml-2">
                                    ⭐ {movie.vote_average.toFixed(1)}
                                </span>
                            )}
                        </CardDescription>
                    </CardHeader>
                    {movie.overview && (
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">
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