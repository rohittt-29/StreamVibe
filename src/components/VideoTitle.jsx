import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[20%] px-6 md:px-20 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='mt-10 font-normal md:font-bold text-xl md:text-6xl'>{title}</h1>
      <p className='hidden md:inline-block py-3 md:py-6 text-sm md:text-lg w-80% md:w-4/8 opacity-55'>{overview}</p>
   <div className='mt-3'>
    <button className=' p-2 ml-0  py-2 m-2 px-8 text-sm font-normal md:p-4 md:m-2 md:px-8 md:text-xl md:font-medium bg-[#E50000] hover:bg-[#FF3333]  cursor-pointer text-white  rounded-lg md:shadow-[0_0_20px_#E50000] transition-all duration-300'><i className="ri-play-large-fill text-white text-sm md:text-xl mr-1"></i>
   Start Watching Now</button>

   </div>
    </div>
  )
}

export default VideoTitle
