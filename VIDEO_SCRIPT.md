# Five-Minute Video Walkthrough Script

**Role**: Frontend Internship Candidate  
**Target Duration**: 5:00 minutes (1 minute per section)  
**Tone**: Confident, clear, professional, and beginner-friendly  

---

## ⏱️ Minute 1 (0:00 – 1:00) — Application Demo & Core Features

### 🖥️ Screen Action:
- Open the browser running the live app (`http://localhost:5173/` or `5174`).
- Refresh the page to show the centered loading spinner for a moment, followed by 30 photos loading in.
- Show the responsive layout: 4 columns on desktop. (Optionally shrink the browser window to show 2 columns on tablet and 1 column on mobile).
- Type `"Alejandro"` in the search bar to demonstrate instant real-time filtering.
- Type `"zzzz"` to demonstrate the `"No photos found."` empty-state UI.
- Clear the search bar to restore the 30 photos.
- Click heart buttons on 2 or 3 cards to favourite them (showing the heart turning into a filled vibrant red heart).
- Open DevTools > Application tab > Local Storage to point out the `celebrare-favourites` key.
- Refresh the page and show that the favourited hearts stay selected.

### 🎙️ Spoken Words:
> *"Hello everyone! My name is [Your Name], and this is my submission for the Celebrare Frontend Internship pre-screening assignment — a React Photo Gallery built with Vite and Tailwind CSS.*
>
> *When the application initializes, it immediately fetches 30 photos from the Picsum API while displaying a centered loading spinner. As you can see, the photos are organized in a clean responsive grid: four columns on desktop, two columns on tablet, and one column on mobile.*
>
> *At the top, we have a real-time author search bar. If I start typing 'Alejandro', the gallery filters instantly without reloading the page or making extra network calls. If I search for a non-existent name like 'zzzz', it cleanly displays 'No photos found.'*
>
> *Each photo card has an author name and an accessible heart button. Clicking a heart toggles its favourite status from unselected to filled rose. When I reload the page, you can see our favourite selections are preserved through localStorage. Now let's explore the code!"*

---

## ⏱️ Minute 2 (1:00 – 2:00) — Custom Hook: `useFetchPhotos.js`

### 🖥️ Screen Action:
- Switch to VS Code / code editor.
- Open file: `src/hooks/useFetchPhotos.js`.
- Highlight lines 10–12 (`photos`, `loading`, `error` states).
- Highlight lines 15–23 (`fetch` call and `response.ok` check).
- Highlight line 38 (`return () => controller.abort()`).
- Highlight line 43 (`return { photos, loading, error }`).

### 🎙️ Spoken Words:
> *"Here in `src/hooks/useFetchPhotos.js`, I created a custom hook to keep our data-fetching and HTTP lifecycle logic cleanly separated from our visual components.*
>
> *The hook manages three states: `photos`, `loading`, and `error`. Inside `useEffect`, we make a GET request to the Picsum Photos API endpoint using the native JavaScript `fetch` API.*
>
> *Two important details here: First, unlike Axios, native `fetch` does not automatically reject HTTP error status codes like 404 or 500, so we check `response.ok` and throw an explicit error if the response failed.*
>
> *Second, we instantiate an `AbortController`. In its cleanup return function, we call `controller.abort()`. This prevents memory leaks and avoids setting state on an unmounted component, which is especially important during React 19's StrictMode double-mount in development.*
>
> *Finally, the hook returns an object containing `{ photos, loading, error }`, which our Gallery component consumes cleanly."*

---

## ⏱️ Minute 3 (2:00 – 3:00) — Reducer & Persistence: `favouritesReducer.js`

### 🖥️ Screen Action:
- In the code editor, open `src/reducers/favouritesReducer.js`.
- Highlight line 2 (`export const STORAGE_KEY = 'celebrare-favourites'`).
- Highlight lines 9–19 (`getInitialFavourites` function).
- Highlight lines 28–39 (`favouritesReducer` switch block).
- Switch briefly to `src/components/Gallery.jsx` to show lines with `useReducer` and the `useEffect` writing to `localStorage`.

### 🎙️ Spoken Words:
> *"Next, let's look at `src/reducers/favouritesReducer.js`. The assignment strictly requires managing favourite items using React's `useReducer` instead of `useState`.*
>
> *Our reducer handles the action `{ type: 'TOGGLE_FAVOURITE', payload: photoId }`. We convert the photo ID to a string to prevent type mismatches. If the ID is already present in our state array, we immutably filter it out using `.filter()`. If it is not present, we return a new array spreading existing IDs plus the new one. This ensures immutable state updates without duplicate entries.*
>
> *For persistence, we define our constant `STORAGE_KEY = 'celebrare-favourites'`. The `getInitialFavourites` function acts as a lazy initializer for `useReducer`. It reads from `localStorage` once on mount and wraps JSON parsing in a `try...catch` block so corrupted data won't crash our application.*
>
> *Then, in `Gallery.jsx`, a lightweight `useEffect` listens to the `favourites` array and syncs it back to `localStorage` whenever it changes."*

---

## ⏱️ Minute 4 (3:00 – 4:00) — Optimization: `useCallback` & `useMemo` in `Gallery.jsx`

### 🖥️ Screen Action:
- Open `src/components/Gallery.jsx`.
- Highlight `handleSearchChange` with `useCallback` (lines 33–35).
- Highlight `filteredPhotos` with `useMemo` (lines 38–41).
- Show where `handleSearchChange` is passed to `<SearchBar onChange={handleSearchChange} />`.

### 🎙️ Spoken Words:
> *"Now let's examine `src/components/Gallery.jsx`, specifically Requirement 7: `useCallback` and `useMemo`.*
>
> *Here, `handleSearchChange` is wrapped with `useCallback`. In React, functions defined inside components get re-instantiated on every single render. Because we pass this handler down as a prop to our child `<SearchBar />` component, wrapping it in `useCallback` with an empty dependency array guarantees that the function reference remains referentially stable across re-renders.*
>
> *Right below that, we calculate `filteredPhotos` using `useMemo`. We take the user's search query, trim whitespace, convert it to lowercase, and filter the photo array by `photo.author`. By memoizing this with `[photos, search]` dependencies, React only recalculates the filtered array when either the fetched photo list or the search term changes.*
>
> *What would happen if we removed them? If we removed `useCallback`, a new function reference would be created on every keystroke and render, causing unnecessary re-renders of child components. If we removed `useMemo`, our filtering logic would run on every single render cycle—even if unrelated state like favourites toggled."*

---

## ⏱️ Minute 5 (4:00 – 5:00) — Challenge Solved & Wrap-Up

### 🖥️ Screen Action:
- Open `src/components/PhotoCard.jsx` and `src/components/Gallery.jsx`.
- Show the accessibility attributes: `aria-pressed`, `aria-label`, and the SVG heart logic.
- Switch back to the browser showing the working gallery.

### 🎙️ Spoken Words:
> *"To conclude, I'd like to share one genuine implementation challenge I encountered: balancing pure `useReducer` state management with asynchronous `localStorage` persistence and strict accessibility.*
>
> *Initially, reading `localStorage` directly inside component bodies can trigger hydration mismatches or repetitive disk I/O on every render. I solved this by utilizing `useReducer`'s third parameter—the lazy initialization function `getInitialFavourites`—which reads `localStorage` exactly once during initial mount. Combined with an isolated synchronization `useEffect`, state updates remain snappy and 100% predictable.*
>
> *Additionally, we ensured top-notch accessibility: each heart toggle button has a dynamic `aria-label`, an `aria-pressed` boolean attribute, and accessible SVG icons with distinct unselected and selected visual treatments.*
>
> *All seven assignment requirements are fully implemented with zero third-party UI libraries, a 100% successful production build, and clean, modular code. Thank you so much for your time and consideration!"*
