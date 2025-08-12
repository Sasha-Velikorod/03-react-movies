import css from './App.module.css'
import  SearchBar  from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService' 
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';


const App = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isError, setIsError] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = async (query: string) => { 
        setIsError(false);
        setMovies([]);
        setIsLoading(true);
        try {
            const data = await fetchMovies(query);

            if (data.length === 0) {
                toast.error('No movies found for your request.');
                
                return;
            }
            setMovies(data);
           
            
        } catch {
            setIsError(true);
            
        } finally {
            setIsLoading(false);
        }
    }
    
    
    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
    }

    const handleModalClose = () => {
        setSelectedMovie(null);
    }
   
    return (
        <div className={css.App}>
            <SearchBar onSearch={handleSearch}/>
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleModalClose} />
            )}
            {isError && <ErrorMessage />}
            {isLoading && <Loader />}
            <Toaster />
        </div>
    )
}


export default App;
