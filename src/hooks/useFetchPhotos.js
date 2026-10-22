import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch 30 photos from Picsum Photos API.
 * Handles loading, error, and photos state with proper AbortController cleanup.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null }}
 */
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch photos (HTTP ${response.status}). Please try again later.`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Do not update error state if the fetch was deliberately aborted on unmount
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching photos.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    // Cleanup abort controller on component unmount
    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}

