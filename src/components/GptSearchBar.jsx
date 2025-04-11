import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS, OPENAI_KEY } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);


  const searchTMDBmovie = async (movie) => {
    const data = await 
    fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    return json.results
  }

  const handleGptSearchClick = async() =>{
console.log(searchText.current.value)
  
const gptQuery = "Act as a movie recommendation system and suggest some movies for the query : " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example results given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya.";

const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${OPENAI_KEY}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    contents: [{ parts: [{ text: gptQuery }] }]
  })
});

const data = await res.json();
console.log("Gemini Response:", data?.candidates?.[0]?.content?.parts?.[0]?.text);
const gptMovie =  data?.candidates?.[0]?.content?.parts?.[0]?.text.split(",");



const promisearray = gptMovie.map((movie)=> searchTMDBmovie(movie));

const tmdbmovie = await Promise.all(promisearray);
console.log(tmdbmovie);
 
dispatch(addGptMovieResults({movieNames: gptMovie,movieResults: tmdbmovie}));


}
  return (
    <div className='pt-[8%] px-20 flex justify-center'>
      <form className='  w-3/4 p-1 rounded-lg bg-gradient-to-tr from-black border-4 border-gray-800  grid grid-cols-12' onSubmit={(e)=> e.preventDefault()}>
        <input ref={searchText} type="text" className='p-2 m-4 col-span-10 outline-none border-none focus:ring-0 focus:outline-none  text-white  text-md' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className=' col-span-2 py-2 px-4 m-4 bg-[#E50000] hover:bg-red-500 text-lg font-medium  cursor-pointer   text-white rounded-sm ' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
