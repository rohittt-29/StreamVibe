import React from 'react'
import { useSelector } from 'react-redux'
import Movielist from './Movielist';

const GptMovieSuggestions = () => {

  const gpt = useSelector((store)=> store.gpt);
  const {movieResults, movieNames} = gpt
  if(!movieNames) return null;
  return (
    <div className='m-4 p-4  bg-gradient-to-bl from-black text-white'>
      <div>
    {movieNames.map((movieName , index) =>     <Movielist key={movieName} title={movieName} movies={movieResults[index]} />
)} 
    </div>
    </div>
  )
}

export default GptMovieSuggestions
