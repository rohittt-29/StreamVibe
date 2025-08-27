import React, { useState } from 'react'
import { getOptimizedImageUrl } from '../utils/constants'
import LoadingSpinner from './LoadingSpinner'

const Moviecard = ({ title, posterpath, rating }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!posterpath) return null;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className='w-40 md:w-55 pr-4 transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-75 hover:z-10'>
      <div className="relative">
        {!imageLoaded && !imageError && (
          <div className="w-full h-60 bg-gray-800 rounded-md flex items-center justify-center">
            <LoadingSpinner size="small" color="gray" />
          </div>
        )}
        
        {!imageError ? (
          <img 
            className={`rounded-md cursor-pointer ${imageLoaded ? 'block' : 'hidden'}`}
            src={getOptimizedImageUrl(posterpath)}
            alt={title || "Movie Poster"}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-60 bg-gray-800 rounded-md flex items-center justify-center text-gray-400 text-xs">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>Image not available</p>
            </div>
          </div>
        )}
      </div>
      
      <h2 className='text-sm md:text-md font-normal md:font-semibold mt-1 text-white truncate'>{title}</h2>
      <p className='text-sm text-gray-300'>⭐ {rating?.toFixed(1) || 'N/A'}</p>
    </div>
  )
}

export default Moviecard
