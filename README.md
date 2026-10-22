# Celebrare React Internship — Photo Gallery Application

A modern, responsive, and accessible Photo Gallery web application built with **React 19**, **Vite 6**, and **Tailwind CSS 4**. This project is built strictly to the specifications of the **Celebrare Frontend Internship Pre-Screening Assignment**.

---

## 🚀 Live Demo & Repository

- **Repository**: [GitHub Repository URL] *(Replace with your repository link)*
- **Walkthrough Video**: [Video Walkthrough URL (Google Drive / Unlisted YouTube)] *(Replace with your video link)*

---

## 🛠️ Technology Stack

- **React 19**: Modern component architecture, functional components, and standard hooks.
- **Vite 6**: Ultra-fast development server and optimized production bundler.
- **JavaScript (ES6+)**: Clean, idiomatic JavaScript without third-party UI/state management bloat.
- **Tailwind CSS 4**: Modern utility-first CSS for styling and responsive design.
- **Native Fetch API & AbortController**: Seamless HTTP communication with proper lifecycle cleanup.
- **HTML5 Web Storage (`localStorage`)**: Safe client-side persistence with fallback handling.

> **Zero Extra Dependencies**: Strictly built without Redux, Zustand, Axios, Bootstrap, Material UI, or external icon packages. All icons are lightweight, inline, accessible SVGs.

---

## ✨ Features & Assignment Requirements

1. **Photo API Integration (`useFetchPhotos`)**:
   - Fetches 30 high-quality photos from `https://picsum.photos/v2/list?limit=30` upon load.
   - Manages `photos`, `loading`, and `error` states cleanly.
   - Implements `AbortController` cleanup to prevent memory leaks and unmounted component updates (including React Strict Mode dual-mount cycles).
2. **Responsive Photo Gallery Grid**:
   - **Mobile (< 768px)**: 1 column.
   - **Tablet (768px – 1023px)**: 2 columns.
   - **Desktop (≥ 1024px)**: 4 columns.
   - High-performance cards with consistent aspect ratios (`aspect-[4/3]`), rounded borders, subtle hover lifts, and truncated author names with tooltips.
3. **Real-Time Client-Side Search**:
   - Case-insensitive, partial-match filtering by author name.
   - Instant search response with zero additional network requests.
   - Displays clear `"No photos found."` empty-state UI when no matches are detected.
4. **Favourites Management via `useReducer`**:
   - Full state management driven by `useReducer` (no `useState` for favourites).
   - Handles `{ type: 'TOGGLE_FAVOURITE', payload: photoId }` with strictly immutable updates.
   - Visual toggle between unselected (♡ outlined) and selected (♥ filled vibrant rose/red).
   - Fully keyboard accessible with dynamic `aria-label` and `aria-pressed` attributes.
5. **Robust `localStorage` Persistence**:
   - Saves favourite photo IDs under the exact key `celebrare-favourites`.
   - Lazy initializer safely parses saved JSON and falls back gracefully on corrupted/empty storage.
   - Automatically synchronizes updates to `localStorage` on state change.
6. **Performance Optimization (`useCallback` & `useMemo`)**:
   - `useCallback`: Stabilizes the search input change handler reference.
   - `useMemo`: Caches the filtered photo array to avoid recalculation on unrelated component renders.

---

## 📁 Project Architecture

```
celebrare-photo-gallery/
│
├── src/
│   ├── components/
│   │   ├── Gallery.jsx           # Main coordinator (fetching, search, grid, state)
│   │   ├── PhotoCard.jsx         # Individual photo card with heart toggle
│   │   └── SearchBar.jsx         # Accessible real-time search input
│   │
│   ├── hooks/
│   │   └── useFetchPhotos.js     # Custom hook for API fetch, loading & error
│   │
│   ├── reducers/
│   │   └── favouritesReducer.js  # useReducer logic & localStorage lazy initialization
│   │
│   ├── App.jsx                   # Root application container
│   ├── main.jsx                  # React DOM mount point & StrictMode
│   └── index.css                 # Tailwind CSS 4 directives
│
├── index.html                    # HTML entry point with semantic markup
├── package.json                  # Scripts and dependencies
├── vite.config.js                # Vite build configuration
├── README.md                     # Comprehensive documentation
├── VIDEO_SCRIPT.md               # 5-minute video walkthrough guide
└── INTERVIEW_PREPARATION.md      # 20 interview Q&As for assessment
```

---

## 🧠 React Hooks Deep Dive

| Hook | Purpose & Where Used | Benefit in this Application |
| :--- | :--- | :--- |
| `useState` | Search input state in `Gallery.jsx` | Tracks current search query as user types without re-fetching API data. |
| `useEffect` | Fetching in `useFetchPhotos.js` & storage in `Gallery.jsx` | Triggers initial API request on mount with AbortController cleanup; syncs favourites array to `localStorage`. |
| `useReducer` | Favourite photos list in `Gallery.jsx` | Encapsulates toggle action `{ type: 'TOGGLE_FAVOURITE' }` predictably in an external pure reducer function. |
| `useCallback` | `handleSearchChange` in `Gallery.jsx` | Preserves a stable function identity across renders to pass to the `<SearchBar />` child component. |
| `useMemo` | `filteredPhotos` in `Gallery.jsx` | Avoids re-filtering the 30-item array unless `photos` or `search` string actually changes. |
| `useFetchPhotos` | Custom Hook in `src/hooks/useFetchPhotos.js` | Decouples data fetching and HTTP lifecycle management from presentation UI components. |

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 1. Installation
Navigate into the project directory and install dependencies:
```bash
cd celebrare-photo-gallery
npm install
```

### 2. Development Mode
Start the Vite local development server:
```bash
npm run dev
```
Open your browser and navigate to the printed local URL (typically `http://localhost:5173/` or `http://localhost:5174/`).

### 3. Production Build & Preview
To create an optimized production build:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 🧪 Testing Checklist

- [x] **Initial Load**: 30 photos load from Picsum API with a centered loading spinner.
- [x] **Real-time Search**: Typing author names (e.g., `Alejandro`, `Paul`) filters cards instantly.
- [x] **No Extra Requests**: Network inspection confirms 0 extra network calls during search.
- [x] **Empty State**: Searching an unknown author displays `"No photos found."`.
- [x] **Favourites Toggle**: Clicking heart icons toggles between unselected (♡) and filled red (♥).
- [x] **Refresh Persistence**: Favourite IDs persist in `localStorage` under `celebrare-favourites`.
- [x] **Responsive Grid**:
  - Mobile (375px): 1 column
  - Tablet (768px): 2 columns
  - Desktop (1440px): 4 columns
- [x] **Zero Console Errors**: Clean console with no React warnings or unhandled exceptions.
