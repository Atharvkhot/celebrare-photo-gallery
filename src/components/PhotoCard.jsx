import React from 'react';

/**
 * PhotoCard Component
 * Displays a single photo card with author information and an interactive favourite toggle button.
 *
 * @param {Object} props
 * @param {Object} props.photo - Photo data object (id, author, width, height, etc.)
 * @param {boolean} props.isFavourite - Whether this photo is currently favourited
 * @param {Function} props.onToggleFavourite - Callback to toggle favourite status
 */
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Photo Image with consistent aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photograph taken by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Card Footer: Author Name & Favourite Toggle Button */}
      <div className="flex items-center justify-between gap-3 p-4">
        <p
          className="truncate text-sm font-semibold text-slate-800 sm:text-base"
          title={photo.author}
        >
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          aria-pressed={isFavourite}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${
            isFavourite
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
          }`}
        >
          {/* Accessible inline SVG heart icon: Outlined (♡) when unselected, Filled (♥) when selected */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 transition-transform duration-150 active:scale-125"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '1.5' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
