import React from 'react'
import Movielist from './Movielist'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)
  
  // Debug Redux state
  console.log('🎬 SecondaryContainer Redux State:', {
    nowPlaying: movies?.nowPlayingMovie?.length || 0,
    popular: movies?.PopularMovie?.length || 0,
    topRated: movies?.TopRated?.length || 0,
    upcoming: movies?.UpComing?.length || 0,
    loading: movies?.loading,
    errors: movies?.errors
  });
  
  return (
    <div className='bg-black'>
      <div className='md:-mt-50 pl-2 md:pl-12 relative z-20'>
        <Movielist 
          title={"Now Playing"} 
          movies={movies.nowPlayingMovie} 
          loadingKey="nowPlaying"
          errorKey="nowPlaying"
        />
        <Movielist 
          title={"Popular"} 
          movies={movies.PopularMovie} 
          loadingKey="popular"
          errorKey="popular"
        />
        <Movielist 
          title={"Top Rated"} 
          movies={movies.TopRated} 
          loadingKey="topRated"
          errorKey="topRated"
        />
        <Movielist 
          title={"Upcoming Movies"} 
          movies={movies.UpComing} 
          loadingKey="upcoming"
          errorKey="upcoming"
        />
      </div>
    </div>
  )
}

export default SecondaryContainer
