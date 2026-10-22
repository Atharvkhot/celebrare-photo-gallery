import React from 'react';

/**
 * SearchBar Component
 * Provides a real-time, accessible text input for filtering photos by author name.
 *
 * @param {Object} props
 * @param {string} props.value - Current search term
 * @param {Function} props.onChange - Change handler callback
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <label htmlFor="author-search" className="mb-2 block text-sm font-medium text-slate-700">
        Search photos by author
      </label>
      <div className="relative flex items-center">
        {/* Search icon */}
        <div className="pointer-events-none absolute left-4 text-slate-400">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <input
          id="author-search"
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search by author name..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
        />
      </div>
    </div>
  );
}
