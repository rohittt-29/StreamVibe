
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../Hooks/useMovieTrailer';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const VideoBG = ({ movieId }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  const loading = useSelector(store => store.movies?.loading?.trailer);
  const error = useSelector(store => store.movies?.errors?.trailer);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useMovieTrailer(movieId);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    
    // Add event listener for orientation change
    window.addEventListener('orientationchange', checkMobile);
    return () => window.removeEventListener('orientationchange', checkMobile);
  }, []);

  useEffect(() => {
    // Delay video loading on mobile to improve performance
    if (trailerVideo && !isMobile) {
      setShowVideo(true);
    } else if (trailerVideo && isMobile) {
      const timer = setTimeout(() => setShowVideo(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [trailerVideo, isMobile]);

  if (loading) {
    return (
      <div className='w-screen h-96 bg-black flex items-center justify-center'>
        <LoadingSpinner size="large" color="white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-screen h-96 bg-black flex items-center justify-center'>
        <ErrorMessage message={error} showRetry={false} />
      </div>
    );
  }

  if (!trailerVideo?.key) {
    return (
      <div className='w-screen h-96 bg-black flex items-center justify-center'>
        <div className="text-white text-center">
          <p>No trailer available</p>
        </div>
      </div>
    );
  }

  // Mobile-optimized video parameters
  const videoParams = isMobile 
    ? "?&autoplay=0&mute=1&controls=1&modestbranding=1&rel=0" // No autoplay on mobile
    : "?&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"; // Autoplay on desktop

  return (
    <div className='w-screen'>
      {showVideo && (
        <iframe 
          className='w-screen aspect-video' 
          src={`https://www.youtube.com/embed/${trailerVideo.key}${videoParams}`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};

export default VideoBG;
