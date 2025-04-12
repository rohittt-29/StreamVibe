import React from 'react'
import Movielist from './Movielist'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)
  return (
    <div className=' bg-black'>
      <div className=' md:-mt-50 pl-2 md:pl-12  relative z-20'>
      <Movielist  title={"Now Playing"} movies={movies.nowPlayingMovie} />
      <Movielist  title={"Popular"} movies={movies.PopularMovie} />
      <Movielist  title={"Top Rated"} movies={movies.TopRated} />
      <Movielist  title={"Upcoming Movies"} movies={movies.UpComing} />
      </div>
    </div>
  )
}

export default SecondaryContainer
