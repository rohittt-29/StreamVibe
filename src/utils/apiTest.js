// Simple API test utility
export const testTMDBAPI = async () => {
  try {
    console.log('🧪 Testing TMDB API connection...');
    
    const API_OPTIONS = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNWQ5MDk3ZGQ1YTVlY2E2NjY3N2ZkYTEyZTY1ZTQ2OSIsIm5iZiI6MTc0MzkyOTY0Mi4xOTYsInN1YiI6IjY3ZjI0MTJhMGYyMGY5YzQ1Y2FkNDAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Q7DwzojiIjUOEuthIjg_Ya2V90qQmYWf3kumM4IUFc"
      },
    };

    const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ TMDB API Test Successful:', {
      status: response.status,
      totalResults: data.results?.length || 0,
      firstMovie: data.results?.[0]?.title || 'No movies'
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('❌ TMDB API Test Failed:', error);
    return { success: false, error: error.message };
  }
};

// Test network connectivity
export const testNetworkConnectivity = async () => {
  try {
    console.log('🌐 Testing network connectivity...');
    
    const response = await fetch('https://httpbin.org/get', { 
      method: 'GET',
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      console.log('✅ Network connectivity test successful');
      return true;
    } else {
      console.log('❌ Network connectivity test failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Network connectivity test failed:', error);
    return false;
  }
};
