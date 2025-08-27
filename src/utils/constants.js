import logo from '../assets/Logo.svg';
import BgImage from '../assets/BgImage.png';
import { getDeviceProfile, getOptimizedImageSize } from './mobileDetection';

export const LOGO = logo;
export const BG_URL = BgImage;

export const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWQ5MDk3ZGQ1YTVlY2E2NjY3N2ZkYTEyZTY1ZTQ2OSIsIm5iZiI6MTc0MzkyOTY0Mi4xOTYsInN1YiI6IjY3ZjI0MTJhMGYyMGY5YzQ1Y2FkNDAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Q7DwzojiIjUOEuthIjg_Ya2V90qQmYWf3kumM4IUFc"
    },
  };

// Optimized image URLs for different screen sizes
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"
export const IMG_CDN_URL_MOBILE = "https://image.tmdb.org/t/p/w300" // Smaller for mobile
export const IMG_CDN_URL_LARGE = "https://image.tmdb.org/t/p/w780" // For larger screens
export const IMG_CDN_URL_LOW_PERF = "https://image.tmdb.org/t/p/w200" // For low-performance devices

// Function to get optimized image URL based on device profile
export const getOptimizedImageUrl = (posterPath, deviceProfile = null) => {
  if (!posterPath) return '';
  
  const profile = deviceProfile || getDeviceProfile();
  const size = getOptimizedImageSize(profile);
  
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

// Function to get image URL based on screen size (legacy support)
export const getImageUrlByScreenSize = (posterPath, screenSize = 'mobile') => {
  if (!posterPath) return '';
  
  const baseUrl = screenSize === 'mobile' ? IMG_CDN_URL_MOBILE : 
                  screenSize === 'large' ? IMG_CDN_URL_LARGE : 
                  screenSize === 'low-perf' ? IMG_CDN_URL_LOW_PERF :
                  IMG_CDN_URL;
  
  return baseUrl + posterPath;
};

export const SUPPORTED_LANGUAGES = [
  {identifier: "en", name: "english"},
  {identifier: "hindi", name: "Hindi"},
  {identifier: "spanish", name: "Spanish"}
];

export const OPENAI_KEY = `AIzaSyBj9a0DiXitPjc05E_6vuT09gzAClFJ_2Y`;  //Gemini API key

// Performance constants
export const API_TIMEOUT = 10000; // 10 seconds
export const RETRY_DELAY = 2000; // 2 seconds
export const MAX_RETRIES = 3;

// Device-specific timeouts
export const getApiTimeout = () => {
  const profile = getDeviceProfile();
  switch (profile) {
    case 'low-performance-mobile':
      return 15000; // 15 seconds for slow devices
    case 'mobile':
      return 12000; // 12 seconds for mobile
    default:
      return 10000; // 10 seconds for desktop
  }
};