import { useDispatch } from "react-redux";
import { addnowPlayingMovie, setLoading, setError } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usenowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      console.log('🔄 Starting now playing movies API call...');
      dispatch(setLoading({ key: 'nowPlaying', loading: true }));
      dispatch(setError({ key: 'nowPlaying', error: null }));
      
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('✅ Now Playing Movies API Response:', {
        totalResults: json.results?.length || 0,
        firstMovie: json.results?.[0]?.title || 'No movies',
        status: response.status
      });
      
      dispatch(addnowPlayingMovie(json.results || []));
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      
    } catch (error) {
      console.error('❌ Error fetching now playing movies:', error);
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      dispatch(setError({ key: 'nowPlaying', error: 'Failed to load movies. Please check your connection.' }));
    }
  };

  useEffect(() => {
    console.log('🚀 useNowPlayingMovies hook initialized');
    getMovies();
  }, []);

  return null;
};

export default usenowPlayingMovies;