import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBG from './VideoBG'
import LoadingSpinner from './LoadingSpinner'

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovie)
  const loading = useSelector(store => store.movies?.loading?.nowPlaying)
  const error = useSelector(store => store.movies?.errors?.nowPlaying)

  // Debug Redux state
  console.log('🎬 MainContainer Redux State:', {
    movies: movies?.length || 0,
    loading,
    error,
    hasMovies: !!movies && movies.length > 0
  });

  if (loading) {
    return (
      <div className='pt-[40%] bg-black md:pt-0 min-h-screen flex items-center justify-center'>
        <LoadingSpinner size="large" color="white" />
      </div>
    );
  }

  if (error || !movies || movies.length === 0) {
    return (
      <div className='pt-[40%] bg-black md:pt-0 min-h-screen flex items-center justify-center'>
        <div className="text-white text-center">
          <h1 className="text-2xl md:text-4xl mb-4">Welcome to StreamVibe</h1>
          <p className="text-gray-400">
            {error ? `Error: ${error}` : 'Movies will appear here'}
          </p>
          {error && (
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          )}
        </div>
      </div>
    );
  }

  const mainmovies = movies[0];
  console.log('🎬 Main Movie:', mainmovies);

  const { original_title, overview, id } = mainmovies;

  return (
    <div className='pt-[40%] bg-black md:pt-0'>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBG movieId={id} />
    </div>
  )
}

export default MainContainer
