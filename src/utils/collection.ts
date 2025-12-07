// Utilitaires pour gérer les collections (wishlist et owned)
const WISHLIST_KEY = 'skylanders_wishlist';
const OWNED_KEY = 'skylanders_owned';

export type CollectionType = 'wishlist' | 'owned';

// Récupérer les IDs d'une collection
export function getCollectionIds(type: CollectionType): string[] {
  const key = type === 'wishlist' ? WISHLIST_KEY : OWNED_KEY;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

// Vérifier si un item est dans une collection
export function isInCollection(itemId: string, type: CollectionType): boolean {
  const ids = getCollectionIds(type);
  return ids.includes(itemId);
}

// Ajouter un item à une collection
export function addToCollection(itemId: string, type: CollectionType): void {
  const ids = getCollectionIds(type);
  if (!ids.includes(itemId)) {
    ids.push(itemId);
    const key = type === 'wishlist' ? WISHLIST_KEY : OWNED_KEY;
    localStorage.setItem(key, JSON.stringify(ids));
  }
}

// Retirer un item d'une collection
export function removeFromCollection(itemId: string, type: CollectionType): void {
  const ids = getCollectionIds(type);
  const newIds = ids.filter(id => id !== itemId);
  const key = type === 'wishlist' ? WISHLIST_KEY : OWNED_KEY;
  localStorage.setItem(key, JSON.stringify(newIds));
}

// Toggle un item dans une collection
export function toggleCollection(itemId: string, type: CollectionType): boolean {
  if (isInCollection(itemId, type)) {
    removeFromCollection(itemId, type);
    return false;
  } else {
    addToCollection(itemId, type);
    return true;
  }
}

// Obtenir des statistiques de collection
export interface CollectionStats {
  totalWishlist: number;
  totalOwned: number;
  completionPercentage: number;
  elementStats: Record<string, { owned: number; total: number }>;
}

export function getCollectionStats(allItems: any[]): CollectionStats {
  const wishlist = getCollectionIds('wishlist');
  const owned = getCollectionIds('owned');
  
  const elementStats: Record<string, { owned: number; total: number }> = {};
  
  allItems.forEach(item => {
    const element = item.element || 'Unknown';
    if (!elementStats[element]) {
      elementStats[element] = { owned: 0, total: 0 };
    }
    elementStats[element].total++;
    if (owned.includes(item.id)) {
      elementStats[element].owned++;
    }
  });
  
  return {
    totalWishlist: wishlist.length,
    totalOwned: owned.length,
    completionPercentage: allItems.length > 0 
      ? Math.round((owned.length / allItems.length) * 100) 
      : 0,
    elementStats,
  };
}
