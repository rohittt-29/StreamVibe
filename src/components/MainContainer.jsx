import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBG from './VideoBG'

const MainContainer = () => {

    const movies = useSelector(store=> store.movies?.nowPlayingMovie)
    if(!movies) return;

    const mainmovies = movies[0];
    console.log(mainmovies);

    const {original_title, overview, id} = mainmovies
  return (
    <div className=' pt-[40%] bg-black md:pt-0'>
      <VideoTitle title = {original_title} overview = {overview} />
      <VideoBG movieId={id} />
    </div>
  )
}

export default MainContainer
