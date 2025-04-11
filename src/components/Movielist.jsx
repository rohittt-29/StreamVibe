import React from 'react'
import Moviecard from './Moviecard'

const Movielist = ({title, movies}) => {
  if(!movies) return;
    console.log(movies);
  return (
    <div className='px-5 text-white'>
        <h1 className='font-semibold text-3xl py-4'>{title}</h1>
        <div className='flex overflow-x-scroll  hide-scrollbar'>
          
            <div className='flex'>
              {movies.map((movie)=>(
                <Moviecard key={movie.id} posterpath={movie?.poster_path} title={movie?.title} rating={movie?.vote_average}/>
              ))}
              
            
            </div>
        </div>
      
  
    </div>
  )
}

export default Movielist
