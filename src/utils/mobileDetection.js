// Mobile device detection utility
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
};

// Check for slow network connection
export const isSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    return connection.effectiveType === 'slow-2g' || 
           connection.effectiveType === '2g' || 
           connection.effectiveType === '3g';
  }
  return false;
};

// Check for low-end device
export const isLowEndDevice = () => {
  const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores if not available
  
  return memory < 4 || cores < 4;
};

// Get device performance profile
export const getDeviceProfile = () => {
  const isMobile = isMobileDevice();
  const isSlow = isSlowConnection();
  const isLowEnd = isLowEndDevice();
  
  if (isMobile && (isSlow || isLowEnd)) {
    return 'low-performance-mobile';
  } else if (isMobile) {
    return 'mobile';
  } else {
    return 'desktop';
  }
};

// Get optimized image size based on device profile
export const getOptimizedImageSize = (profile) => {
  switch (profile) {
    case 'low-performance-mobile':
      return 'w200'; // Very small for low-end devices
    case 'mobile':
      return 'w300'; // Small for mobile
    default:
      return 'w500'; // Standard for desktop
  }
};
