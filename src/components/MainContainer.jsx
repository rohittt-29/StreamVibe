import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBG from './VideoBG'
import LoadingSpinner from './LoadingSpinner'

const MainContainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovie)
  const loading = useSelector(store => store.movies?.loading?.nowPlaying)
  const error = useSelector(store => store.movies?.errors?.nowPlaying)

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
          <h1 className="text-2xl md:text-4xl mb-4">Welcome to Netflix</h1>
          <p className="text-gray-400">Movies will appear here</p>
        </div>
      </div>
    );
  }

  const mainmovies = movies[0];
  console.log('Main Movie:', mainmovies);

  const { original_title, overview, id } = mainmovies;

  return (
    <div className='pt-[40%] bg-black md:pt-0'>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBG movieId={id} />
    </div>
  )
}

export default MainContainer
