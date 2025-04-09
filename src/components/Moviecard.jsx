import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const Moviecard = ({posterpath}) => {
  return (
    <div className='w-48 pr-4 '>
      <img className='rounded-md  cursor-pointer transition-all duration-500 ease-in-out hover:scale-150 hover:z-10' src={IMG_CDN_URL + posterpath } alt="Movie Card" />
      
    </div>
  )
}

export default Moviecard
