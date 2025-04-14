import React, { useEffect, useState } from 'react';

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
        }
      }
    );
    const json = await res.json();
    console.log("Trailer JSON:", json); // 👈 Check this
  
    const trailer = json.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
  
    setTrailerKey(trailer?.key || null);
  };

  useEffect(() => {
    fetchTrailer();
  }, [movieId]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-gray-900 p-4 rounded-lg w-full max-w-4xl relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-white text-xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-150 hover:opacity-75 hover:z-10" onClick={onClose}><i class="ri-close-large-line text-3xl"></i></button>
        {trailerKey === null ? (
  <p className="text-white">Loading trailer...</p> // optional: add a spinner or shimmer here
) : trailerKey ? (
  <iframe
    className="w-full aspect-video"
    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
    title="Movie Trailer"
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
  ></iframe>
) : (
  <p className="text-white">Trailer not available</p>
)}

      </div>
    </div>
  );
};

export default TrailerModal;
