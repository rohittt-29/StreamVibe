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
      dispatch(setLoading({ key: 'nowPlaying', loading: true }));
      dispatch(setError({ key: 'nowPlaying', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('Now Playing Movies:', json.results?.length || 0);
      dispatch(addnowPlayingMovie(json.results || []));
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      setRetryCount(0); // Reset retry count on success
      
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      dispatch(setLoading({ key: 'nowPlaying', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`Retrying now playing movies... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getMovies(), 2000 * (retryCount + 1)); // Exponential backoff
      } else {
        dispatch(setError({ key: 'nowPlaying', error: 'Failed to load movies. Please check your connection.' }));
      }
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
};

export default usenowPlayingMovies;