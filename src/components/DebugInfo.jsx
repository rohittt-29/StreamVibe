import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { testTMDBAPI, testNetworkConnectivity } from '../utils/apiTest';

const DebugInfo = () => {
  const [debugInfo, setDebugInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    const runDebugTests = async () => {
      const networkTest = await testNetworkConnectivity();
      const apiTest = await testTMDBAPI();
      
      setDebugInfo({
        networkTest,
        apiTest,
        reduxState: {
          nowPlaying: movies?.nowPlayingMovie?.length || 0,
          popular: movies?.PopularMovie?.length || 0,
          topRated: movies?.TopRated?.length || 0,
          upcoming: movies?.UpComing?.length || 0,
          loading: movies?.loading,
          errors: movies?.errors
        },
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    };

    runDebugTests();
  }, [movies]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Debug
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black text-white p-4 rounded border max-w-md text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Debug Info</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div>
          <strong>Network:</strong> {debugInfo.networkTest ? '✅' : '❌'}
        </div>
        <div>
          <strong>API:</strong> {debugInfo.apiTest?.success ? '✅' : '❌'}
        </div>
        <div>
          <strong>Redux State:</strong>
          <div className="ml-2">
            <div>Now Playing: {debugInfo.reduxState?.nowPlaying || 0}</div>
            <div>Popular: {debugInfo.reduxState?.popular || 0}</div>
            <div>Top Rated: {debugInfo.reduxState?.topRated || 0}</div>
            <div>Upcoming: {debugInfo.reduxState?.upcoming || 0}</div>
          </div>
        </div>
        <div>
          <strong>Loading States:</strong>
          <pre className="text-xs bg-gray-800 p-1 rounded mt-1">
            {JSON.stringify(debugInfo.reduxState?.loading, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Errors:</strong>
          <pre className="text-xs bg-gray-800 p-1 rounded mt-1">
            {JSON.stringify(debugInfo.reduxState?.errors, null, 2)}
          </pre>
        </div>
        <div>
          <strong>User Agent:</strong>
          <div className="text-xs bg-gray-800 p-1 rounded mt-1 break-all">
            {debugInfo.userAgent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugInfo;
