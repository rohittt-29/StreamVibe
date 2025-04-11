import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const Moviecard = ({title,posterpath, rating }) => {
  if(!posterpath) return null;
  return (
    <div className='w-55 pr-4  transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-75 hover:z-10'>
      <img className='rounded-md  cursor-pointer' src={IMG_CDN_URL + posterpath } alt="Movie Card" />
      <h2 className='text-md font-semibold mt-1'>{title}</h2>
      <p className='text-sm text-gray-300'>⭐ {rating?.toFixed(1)}</p>
      
    </div>
  )
}

export default Moviecard
