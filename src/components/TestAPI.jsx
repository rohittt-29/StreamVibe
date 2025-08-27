import React, { useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const TestAPI = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testAPICall = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      console.log('🧪 Manual API Test Starting...');
      
      const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      
      console.log('📡 API Response Status:', response.status);
      console.log('📡 API Response Headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ API Test Successful:', data);
      
      setTestResult({
        success: true,
        status: response.status,
        totalResults: data.results?.length || 0,
        firstMovie: data.results?.[0]?.title || 'No movies',
        data: data
      });
      
    } catch (error) {
      console.error('❌ API Test Failed:', error);
      setTestResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded border max-w-md text-xs">
      <h3 className="font-bold mb-2">API Test</h3>
      
      <button
        onClick={testAPICall}
        disabled={isLoading}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm mb-2 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test API'}
      </button>
      
      {testResult && (
        <div className="mt-2">
          <div className="font-bold">
            {testResult.success ? '✅ Success' : '❌ Failed'}
          </div>
          {testResult.success ? (
            <div>
              <div>Status: {testResult.status}</div>
              <div>Total Results: {testResult.totalResults}</div>
              <div>First Movie: {testResult.firstMovie}</div>
            </div>
          ) : (
            <div className="text-red-400">
              Error: {testResult.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestAPI;
