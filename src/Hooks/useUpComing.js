import { useDispatch } from "react-redux";
import { addUpComing, setLoading, setError } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useUpComing = () => {
  const dispatch = useDispatch();

  const getUpComing = async () => {
    try {
      console.log('🔄 Starting upcoming movies API call...');
      dispatch(setLoading({ key: 'upcoming', loading: true }));
      dispatch(setError({ key: 'upcoming', error: null }));
      
      const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      console.log('✅ Upcoming Movies API Response:', {
        totalResults: json.results?.length || 0,
        firstMovie: json.results?.[0]?.title || 'No movies',
        status: response.status
      });
      
      dispatch(addUpComing(json.results || []));
      dispatch(setLoading({ key: 'upcoming', loading: false }));
      
    } catch (error) {
      console.error('❌ Error fetching upcoming movies:', error);
      dispatch(setLoading({ key: 'upcoming', loading: false }));
      dispatch(setError({ key: 'upcoming', error: 'Failed to load upcoming movies.' }));
    }
  };

  useEffect(() => {
    console.log('🚀 useUpComing hook initialized');
    getUpComing();
  }, []);

  return null;
};

export default useUpComing;