import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='font-bold text-6xl'>{title}</h1>
      <p className='py-6 text-lg w-4/8 opacity-55'>{overview}</p>
   <div className='mt-3'>
    <button className='p-4 m-2 px-8 text-xl font-medium bg-[#E50000] hover:bg-[#FF3333]  cursor-pointer text-white rounded-lg shadow-[0_0_20px_#E50000] transition-all duration-300'><i className="ri-play-large-fill text-white text-xl mr-1"></i>
   Start Watching Now</button>

   </div>
    </div>
  )
}

export default VideoTitle
