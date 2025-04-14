// components/ShimmerMovieSection.js
import React from 'react';
import ShimmerCard from './shimmercard';

const ShimmerMovieSection = () => {
  return (
    <div className="m-4 p-4 bg-gradient-to-bl from-black text-white">
      <h2 className="text-xl font-semibold mb-2">Loading Recommendations...</h2>
      <div className="flex flex-wrap">
        {Array(12).fill('').map((_, i) => (
          <ShimmerCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default ShimmerMovieSection;
