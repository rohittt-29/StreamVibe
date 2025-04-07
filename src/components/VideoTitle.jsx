import React from 'react'

const VideoTitle = ({title , overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[20%] px-20 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='font-bold text-6xl'>{title}</h1>
      <p className='py-6 text-lg w-4/8'>{overview}</p>
   <div className='mt-3'>
    <button className='p-3 m-2 px-8 text-xl bg-white/75 hover:bg-white/50  cursor-pointer text-black rounded-lg'><i className="ri-play-large-fill text-black text-xl mr-1"></i>
    Play</button>
    <button className='p-3 m-2 px-8 text-xl rounded-lg bg-white/75 hover:bg-white/50 cursor-pointer text-black' ><i className="ri-information-line text-black text-2xl mr-1"></i>More Info.</button>
   </div>
    </div>
  )
}

export default VideoTitle
