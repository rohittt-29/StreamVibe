import { useDispatch, useSelector } from "react-redux";
import { addTopRated, setLoading, setError } from "../utils/movieSlice";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRated = () => {
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getTopRated = async () => {
    try {
      dispatch(setLoading({ key: 'topRated', loading: true }));
      dispatch(setError({ key: 'topRated', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('Top Rated Movies:', json.results?.length || 0);
      dispatch(addTopRated(json.results || []));
      dispatch(setLoading({ key: 'topRated', loading: false }));
      setRetryCount(0);
      
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      dispatch(setLoading({ key: 'topRated', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`Retrying top rated movies... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getTopRated(), 2000 * (retryCount + 1));
      } else {
        dispatch(setError({ key: 'topRated', error: 'Failed to load top rated movies.' }));
      }
    }
  };

  useEffect(() => {
    getTopRated();
  }, []);
};

export default useTopRated;