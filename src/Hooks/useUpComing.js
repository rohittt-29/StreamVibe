import { useDispatch, useSelector } from "react-redux";
import { addUpComing, setLoading, setError } from "../utils/movieSlice";
import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useUpComing = () => {
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const getUpComing = async () => {
    try {
      dispatch(setLoading({ key: 'upcoming', loading: true }));
      dispatch(setError({ key: 'upcoming', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('Upcoming Movies:', json.results?.length || 0);
      dispatch(addUpComing(json.results || []));
      dispatch(setLoading({ key: 'upcoming', loading: false }));
      setRetryCount(0);
      
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      dispatch(setLoading({ key: 'upcoming', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`Retrying upcoming movies... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getUpComing(), 2000 * (retryCount + 1));
      } else {
        dispatch(setError({ key: 'upcoming', error: 'Failed to load upcoming movies.' }));
      }
    }
  };

  useEffect(() => {
    getUpComing();
  }, []);
};

export default useUpComing;