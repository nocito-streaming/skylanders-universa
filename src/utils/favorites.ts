// Client-side favorites management with localStorage
export type FavoriteType = 'character' | 'skylander' | 'game' | 'item' | 'portal';

export interface Favorite {
  id: string;
  type: FavoriteType;
  addedAt: string;
}

const FAVORITES_KEY = 'skylanders_favorites';

export function getFavorites(): Favorite[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: string, type: FavoriteType): void {
  const favorites = getFavorites();
  const exists = favorites.some(f => f.id === id && f.type === type);
  if (!exists) {
    favorites.push({ id, type, addedAt: new Date().toISOString() });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: string, type: FavoriteType): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => !(f.id === id && f.type === type));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

export function isFavorite(id: string, type: FavoriteType): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.id === id && f.type === type);
}

export function toggleFavorite(id: string, type: FavoriteType): boolean {
  const isCurrentlyFavorite = isFavorite(id, type);
  if (isCurrentlyFavorite) {
    removeFavorite(id, type);
    return false;
  } else {
    addFavorite(id, type);
    return true;
  }
}