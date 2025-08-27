import { useDispatch } from "react-redux";
import { addPopularMovie, setLoading, setError } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovie = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      console.log('🔄 Starting popular movies API call...');
      dispatch(setLoading({ key: 'popular', loading: true }));
      dispatch(setError({ key: 'popular', error: null }));
      
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('✅ Popular Movies API Response:', {
        totalResults: json.results?.length || 0,
        firstMovie: json.results?.[0]?.title || 'No movies',
        status: response.status
      });
      
      dispatch(addPopularMovie(json.results || []));
      dispatch(setLoading({ key: 'popular', loading: false }));
      
    } catch (error) {
      console.error('❌ Error fetching popular movies:', error);
      dispatch(setLoading({ key: 'popular', loading: false }));
      dispatch(setError({ key: 'popular', error: 'Failed to load popular movies.' }));
    }
  };

  useEffect(() => {
    console.log('🚀 usePopularMovie hook initialized');
    getPopularMovies();
  }, []);

  return null;
};

export default usePopularMovie;