import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import BgVideo from '../assets/BgVideos.mp4'; // 👈 zaroori hai!



const GptSearch = () => {
  return (
    <div>
    {/* 🔁 BG Image ko replace kar diya video se */}
    <div className='fixed -z-10 w-full h-full'>
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     
    </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>

    </div>
  )
}

export default GptSearch
