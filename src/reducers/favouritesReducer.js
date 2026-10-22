// Storage key as required by the assignment specification
export const STORAGE_KEY = 'celebrare-favourites';

/**
 * Lazy initializer function for useReducer.
 * Retrieves favourite photo IDs from localStorage and handles corrupt/malformed data safely.
 * @returns {string[]} Array of saved favourite photo IDs
 */
export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage:', error);
    return [];
  }
}

/**
 * Reducer function for managing favourite photos state.
 * Supports TOGGLE_FAVOURITE action with immutable state updates.
 * Prevents duplicate entries and ensures photo IDs are strings.
 * 
 * @param {string[]} state - Current array of favourite photo IDs
 * @param {{ type: string, payload: string|number }} action - Dispatched action
 * @returns {string[]} Updated array of favourite photo IDs
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = String(action.payload);
      if (state.includes(id)) {
        return state.filter((itemId) => itemId !== id);
      }
      return [...state, id];
    }
    default:
      return state;
  }
}
