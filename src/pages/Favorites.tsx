import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { skylanders } from '../data/skylanders';
import { SkylanderCard } from '../components/SkylanderCard';
import { getFavorites, removeFavorite } from '../utils/favorites';

interface FavoritesProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Favorites({ onNavigate }: FavoritesProps) {
  const [favoriteSkylanders, setFavoriteSkylanders] = useState(skylanders.filter(c => false));
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const allFavorites = getFavorites();
    // Support both 'skylander' and 'character' types for backwards compatibility
    const skylanderFavorites = allFavorites.filter(f => f.type === 'skylander' || f.type === 'character');
    const favoriteIds = skylanderFavorites.map(f => f.id);
    
    const favSkylanders = skylanders.filter(c => favoriteIds.includes(c.id));
    setFavoriteSkylanders(favSkylanders);
    setFavorites(new Set(favoriteIds));
  };

  const handleFavoriteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Remove both types for backwards compatibility
    removeFavorite(id, 'skylander');
    removeFavorite(id, 'character');
    loadFavorites();
  };

  const clearAllFavorites = () => {
    favoriteSkylanders.forEach(char => {
      removeFavorite(char.id, 'skylander');
      removeFavorite(char.id, 'character');
    });
    loadFavorites();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-950/30 rounded-xl">
              <Star className="w-8 h-8 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">Mes Favoris</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {favoriteSkylanders.length} personnage{favoriteSkylanders.length !== 1 ? 's' : ''} favori{favoriteSkylanders.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {favoriteSkylanders.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Tout supprimer
            </button>
          )}
        </div>

        {/* Content */}
        {favoriteSkylanders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-gray-900 dark:text-white mb-2">Aucun favori pour le moment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Explorez les Skylanders et ajoutez-les à vos favoris en cliquant sur l'étoile.
            </p>
            <button
              onClick={() => onNavigate('skylanders')}
              className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
            >
              Explorer les Skylanders
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteSkylanders.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <SkylanderCard
                  skylander={character}
                  onCardClick={(id) => onNavigate('skylander-detail', id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={true}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Tips */}
        {favoriteSkylanders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl transition-colors"
          >
            <h3 className="text-gray-900 dark:text-white mb-2">💡 Astuce</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Vos favoris sont sauvegardés localement dans votre navigateur. Créez un compte pour les synchroniser sur tous vos appareils !
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}