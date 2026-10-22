import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos.js';
import { favouritesReducer, getInitialFavourites, STORAGE_KEY } from '../reducers/favouritesReducer.js';
import SearchBar from './SearchBar.jsx';
import PhotoCard from './PhotoCard.jsx';

/**
 * Gallery Component
 * Main coordinator component managing photos fetching, author search filtering,
 * favourite state persistence, and responsive grid layout.
 */
export default function Gallery() {
  // Fetch photos data, loading state, and error message from custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Search input state managed via useState
  const [search, setSearch] = useState('');

  // Favourites state managed via useReducer with lazy initializer from localStorage
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, getInitialFavourites);

  // Synchronize favourites to localStorage whenever favourites state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to persist favourites to localStorage:', err);
    }
  }, [favourites]);

  // Memoized search input change handler using useCallback
  const handleSearchChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  // Memoized filtered photos list using useMemo
  const filteredPhotos = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return photos.filter((photo) => photo.author.toLowerCase().includes(keyword));
  }, [photos, search]);

  // Handler to toggle favourite state via reducer dispatch
  const handleToggleFavourite = (photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Photo Gallery
          </h1>
          <p className="mt-3 text-base text-slate-500 sm:text-lg">
            Discover breathtaking captures and save your personal favourites.
          </p>
        </header>

        {/* Real-time Search Bar */}
        <SearchBar value={search} onChange={handleSearchChange} />

        {/* Loading State: Centered Spinner */}
        {loading && (
          <div role="status" className="flex flex-col items-center justify-center gap-4 py-24 text-slate-600">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
            <p className="text-base font-medium">Loading photos...</p>
          </div>
        )}

        {/* Error State: Clear Alert Message */}
        {!loading && error && (
          <div
            role="alert"
            className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-red-800">Unable to load photos</h2>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty Search Results State */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-slate-700">No photos found.</p>
            <p className="mt-1 text-sm text-slate-500">
              No matching authors found for &ldquo;{search}&rdquo;. Try another name.
            </p>
          </div>
        )}

        {/* Responsive Photo Gallery Grid: Mobile 1 col, Tablet 2 cols, Desktop 4 cols */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(String(photo.id))}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
