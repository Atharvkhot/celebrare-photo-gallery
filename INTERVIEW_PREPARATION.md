# Celebrare React Internship — Technical Interview Preparation Guide

This guide contains **20 high-frequency interview questions and concise, senior-grade answers** tailored directly to the architecture, React hooks, API integration, state management, and design patterns used in this project.

---

### Category 1: React Hooks & Component Lifecycle

#### 1. Why did you use `useReducer` instead of `useState` for managing favourites?
> **Answer**: `useReducer` decouples state transition logic from UI components. In our project, toggling a favourite involves checking for existing presence, deduplicating IDs, and immutable array operations. Placing this in `favouritesReducer` centralizes state logic, makes it pure and easily unit-testable, and avoids passing complex setter functions down the component tree.

#### 2. What is the difference between `useCallback` and `useMemo` in this project?
> **Answer**: 
> - `useCallback` memoizes a **function definition** across renders. We used it for `handleSearchChange` so its reference remains stable when passed as a prop to `<SearchBar />`.
> - `useMemo` memoizes the **result of a calculation**. We used it for `filteredPhotos` so the array filtering computation runs only when `photos` or `search` changes, rather than on every render.

#### 3. What would happen if we removed `useCallback` from `handleSearchChange`?
> **Answer**: The application would still function correctly, but on every render of `<Gallery />`, a new function instance would be created in memory. If child components like `<SearchBar />` are wrapped in `React.memo`, passing an unstable function reference forces unnecessary re-renders of the child.

#### 4. What would happen if we removed `useMemo` from `filteredPhotos`?
> **Answer**: Without `useMemo`, the `.filter()` method would execute on every single render cycle—including when unrelated state changes (like when a user clicks a favourite heart button). For a 30-item list, the performance penalty is minor, but as the dataset grows, recalculating filters on every render causes frame drops.

#### 5. Why did you pass a third argument (`getInitialFavourites`) to `useReducer`?
> **Answer**: The third argument is a **lazy initializer function**. `localStorage.getItem` is a synchronous, blocking browser I/O operation. By passing `getInitialFavourites` as the third parameter (`useReducer(reducer, undefined, init)`), React runs the storage read only once when the component initially mounts, rather than on every render cycle.

#### 6. What is the dependency array in `useEffect`, and what happens if it is omitted?
> **Answer**: The dependency array tells React when to re-run the effect.
> - An empty array `[]` runs the effect once after the initial mount.
> - An array with dependencies `[a, b]` runs when any listed variable changes.
> - Omitting the array completely causes the effect to execute after **every single render**, which would trigger infinite loops if the effect updates state.

---

### Category 2: API Integration & Asynchronous JavaScript

#### 7. Why did you use an `AbortController` in `useFetchPhotos`?
> **Answer**: `AbortController` allows us to cancel an ongoing HTTP fetch request when a component unmounts. In modern React (especially React 18/19 StrictMode in development), components mount, unmount, and remount to verify effects. Without aborting, attempting to update state on an unmounted component wastes network bandwidth and can trigger memory leaks and race conditions.

#### 8. Why do we check `response.ok` when using the native `fetch` API?
> **Answer**: Unlike Axios, native `fetch` only rejects a Promise on actual network failures (e.g., DNS lookup failure, lost connection). It does **not** reject on HTTP error status codes like 404, 500, or 403. Checking `if (!response.ok)` allows us to intercept HTTP errors and throw an exception to be caught in our `catch` block.

#### 9. Why should you avoid calling the API on every keystroke in search?
> **Answer**: Firing an API request on every keystroke introduces unnecessary network traffic, hits server rate limits, and creates race conditions where older requests might resolve after newer ones. Since we fetched the full set of 30 photos upfront, filtering client-side using `useMemo` gives instantaneous 0ms feedback with zero network overhead.

#### 10. What is the purpose of custom hooks like `useFetchPhotos`?
> **Answer**: Custom hooks allow developers to extract and reuse stateful logic without duplicating code. `useFetchPhotos` encapsulates network requests, loading status, error handling, and cleanup, exposing a clean API `{ photos, loading, error }` to the presentation layer.

---

### Category 3: State Management & Persistence

#### 11. Why do we store only photo IDs in `localStorage` instead of the full photo objects?
> **Answer**: Storing only IDs follows the database normalization principle. It minimizes `localStorage` storage consumption (which has a strict ~5MB limit per domain) and prevents stale data: if photo URLs or author metadata change on the server, our app always renders fresh data from the API while preserving user favourite relationships.

#### 12. How do you protect against corrupt data in `localStorage`?
> **Answer**: We wrap `JSON.parse(localStorage.getItem(...))` in a `try...catch` block and verify that the parsed result is an array (`Array.isArray(parsed)`). If a user or external script tampers with localStorage, our fallback returns an empty array `[]` instead of crashing the React application.

#### 13. What is state immutability in React, and why is it essential in `favouritesReducer`?
> **Answer**: Immutability means never modifying existing state directly (e.g., via `state.push()` or `state.splice()`). Instead, we create a new copy using `[...state, id]` or `state.filter(...)`. Immutability ensures React can perform shallow reference equality checks (`prev !== next`) to detect changes and trigger UI updates reliably.

---

### Category 4: Styling, Responsive Design & Accessibility

#### 14. How did you implement responsive design without CSS media queries?
> **Answer**: We utilized Tailwind CSS mobile-first responsive breakpoints:
> - `grid-cols-1`: Default for mobile devices (< 768px).
> - `md:grid-cols-2`: Switches to 2 columns at the medium breakpoint (≥ 768px, tablet).
> - `lg:grid-cols-4`: Expands to 4 columns at the large breakpoint (≥ 1024px, desktop).

#### 15. What accessibility features did you build into the Photo Gallery?
> **Answer**: 
> 1. Form controls: An explicit `<label>` linked via `htmlFor="author-search"` to the search `<input>`.
> 2. Interactive buttons: Dynamic `aria-label` stating whether clicking will add or remove the specific author's photo.
> 3. Toggle state: `aria-pressed={isFavourite}` to inform screen readers of toggle status.
> 4. SVGs: Decorated with `aria-hidden="true"` so screen readers don't read raw vector paths.
> 5. Images: Meaningful `alt` text containing the photographer's name.

#### 16. Why did you use inline SVGs instead of installing an icon package like `lucide-react`?
> **Answer**: Installing third-party icon libraries increases bundle size and introduces unnecessary dependencies. Using lightweight inline SVGs keeps the bundle feather-light, eliminates dependency vulnerabilities, provides instant rendering with zero layout shift, and allows direct styling via Tailwind classes (`stroke`, `fill`, `transition`).

#### 17. How did you prevent layout shift when photos are loading?
> **Answer**: Each photo container is assigned a fixed aspect ratio utility class (`aspect-[4/3]`) and a background placeholder color (`bg-slate-100`). This reserves exact dimensions in the DOM before image assets load, preventing Cumulative Layout Shift (CLS).

---

### Category 5: Tooling & Architecture

#### 18. Why choose Vite over Create React App (CRA)?
> **Answer**: Create React App relies on Webpack, which bundles the entire application before serving, resulting in slow startup times. Vite uses native browser ES modules during development with esbuild (written in Go), offering near-instant server starts and lightning-fast Hot Module Replacement (HMR).

#### 19. What is the role of `React.StrictMode` in `main.jsx`?
> **Answer**: `React.StrictMode` is a development-only tool that highlights potential problems. It purposefully double-invokes component lifecycle methods and effects to detect side-effects, deprecated APIs, and verify that effect cleanup functions (such as `AbortController.abort()`) work correctly.

#### 20. How would you handle paginating 1,000 photos if required in the future?
> **Answer**: We would modify `useFetchPhotos` to accept a `page` parameter (e.g., `https://picsum.photos/v2/list?page=${page}&limit=30`). We could implement either numbered pagination or infinite scrolling with an `IntersectionObserver` observing a sentinel element at the bottom of the grid, appending newly fetched pages to our existing list.
