import { useDispatch, useSelector } from "react-redux";
import { addnowPlayingMovie, setLoading, setError } from "../utils/movieSlice";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const usenowPlayingMovies = () => {
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getMovies = async () => {
    try {
      console.log('🔄 Starting now playing movies API call...');
      dispatch(setLoading({ key: 'nowPlaying', loading: true }));
      dispatch(setError({ key: 'nowPlaying', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      console.log('📡 Making API request to TMDB...');
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('✅ Now Playing Movies API Response:', {
        totalResults: json.results?.length || 0,
        firstMovie: json.results?.[0]?.title || 'No movies',
        status: data.status
      });
      
      dispatch(addnowPlayingMovie(json.results || []));
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      setRetryCount(0); // Reset retry count on success
      
    } catch (error) {
      console.error('❌ Error fetching now playing movies:', error);
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`🔄 Retrying now playing movies... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getMovies(), 2000 * (retryCount + 1)); // Exponential backoff
      } else {
        console.error('💥 Max retries reached for now playing movies');
        
        // Try fallback API call with different endpoint
        try {
          console.log('🔄 Trying fallback API call...');
          const fallbackData = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
          if (fallbackData.ok) {
            const fallbackJson = await fallbackData.json();
            console.log('✅ Fallback API call successful');
            dispatch(addnowPlayingMovie(fallbackJson.results || []));
            dispatch(setLoading({ key: 'nowPlaying', loading: false }));
          } else {
            throw new Error('Fallback also failed');
          }
        } catch (fallbackError) {
          console.error('❌ Fallback API call also failed:', fallbackError);
          dispatch(setError({ key: 'nowPlaying', error: 'Failed to load movies. Please check your connection.' }));
        }
      }
    }
  };

  useEffect(() => {
    console.log('🚀 useNowPlayingMovies hook initialized');
    getMovies();
  }, []);

  return null; // This hook doesn't return anything
};

export default usenowPlayingMovies;