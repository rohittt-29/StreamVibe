import { useDispatch, useSelector } from "react-redux";
import { addPopularMovie, setLoading, setError } from "../utils/movieSlice";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovie = () => {
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getPopularMovies = async () => {
    try {
      dispatch(setLoading({ key: 'popular', loading: true }));
      dispatch(setError({ key: 'popular', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('Popular Movies:', json.results?.length || 0);
      dispatch(addPopularMovie(json.results || []));
      dispatch(setLoading({ key: 'popular', loading: false }));
      setRetryCount(0);
      
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      dispatch(setLoading({ key: 'popular', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`Retrying popular movies... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getPopularMovies(), 2000 * (retryCount + 1));
      } else {
        dispatch(setError({ key: 'popular', error: 'Failed to load popular movies.' }));
      }
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovie;