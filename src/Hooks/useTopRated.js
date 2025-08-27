import { useDispatch } from "react-redux";
import { addTopRated, setLoading, setError } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRated = () => {
  const dispatch = useDispatch();

  const getTopRated = async () => {
    try {
      console.log('🔄 Starting top rated movies API call...');
      dispatch(setLoading({ key: 'topRated', loading: true }));
      dispatch(setError({ key: 'topRated', error: null }));
      
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('✅ Top Rated Movies API Response:', {
        totalResults: json.results?.length || 0,
        firstMovie: json.results?.[0]?.title || 'No movies',
        status: response.status
      });
      
      dispatch(addTopRated(json.results || []));
      dispatch(setLoading({ key: 'topRated', loading: false }));
      
    } catch (error) {
      console.error('❌ Error fetching top rated movies:', error);
      dispatch(setLoading({ key: 'topRated', loading: false }));
      dispatch(setError({ key: 'topRated', error: 'Failed to load top rated movies.' }));
    }
  };

  useEffect(() => {
    console.log('🚀 useTopRated hook initialized');
    getTopRated();
  }, []);

  return null;
};

export default useTopRated;