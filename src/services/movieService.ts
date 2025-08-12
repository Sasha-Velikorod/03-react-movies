import axios from "axios";
import { Movie } from "../types/movie";


const API_URL = "https://api.themoviedb.org/3/search/";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

interface MovieResponse {
    results: Movie[]
 }
 const fetchMovies = async (q: string): Promise<Movie[]> => {
    const response = await axios.get<MovieResponse>(`${API_URL}movie?query=${q}`);
    return response.data.results;
   
};
export default 
    fetchMovies;