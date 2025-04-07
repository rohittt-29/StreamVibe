
import {  useSelector } from 'react-redux';
import useMovieTrailer from '../Hooks/useMovieTrailer';


const VideoBG = ({movieId}) => {
  const trailerVideo =useSelector(store => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

 
  return (
    <div className='w-screen h-s'>
      <iframe className='w-screen aspect-video'  src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  )
}

export default VideoBG
