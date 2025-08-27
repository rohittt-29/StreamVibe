import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo, setLoading, setError } from '../utils/movieSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  const getMovieVideos = async () => {
    try {
      dispatch(setLoading({ key: 'trailer', loading: true }));
      dispatch(setError({ key: 'trailer', error: null }));
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', {
        ...API_OPTIONS,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log('Movie Videos:', json.results?.length || 0);

      const filterData = json.results?.filter((Video) => Video.type === "Trailer") || [];
      const trailer = filterData.length ? filterData[0] : json.results?.[0];
      
      if (trailer) {
        console.log('Selected Trailer:', trailer.name);
        dispatch(addTrailerVideo(trailer));
      } else {
        throw new Error('No trailer found');
      }
      
      dispatch(setLoading({ key: 'trailer', loading: false }));
      setRetryCount(0);

    } catch (error) {
      console.error('Error fetching movie trailer:', error);
      dispatch(setLoading({ key: 'trailer', loading: false }));
      
      if (retryCount < maxRetries && (error.name === 'AbortError' || error.message.includes('fetch'))) {
        console.log(`Retrying movie trailer... Attempt ${retryCount + 1}`);
        setRetryCount(prev => prev + 1);
        setTimeout(() => getMovieVideos(), 2000 * (retryCount + 1));
      } else {
        dispatch(setError({ key: 'trailer', error: 'Failed to load trailer.' }));
      }
    }
  };

  useEffect(() => {
    if (!trailerVideo && movieId) {
      getMovieVideos();
    }
  }, [movieId]);

  return null;
};

export default useMovieTrailer;
