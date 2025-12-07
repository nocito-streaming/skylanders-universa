import { useState, useEffect } from 'react';
import { Filter, Grid, X } from 'lucide-react';
import { motion } from 'motion/react';
import { skylanders, Game } from '../data/skylanders';
import { SkylanderCard } from '../components/SkylanderCard';
import { SkylanderFilter, SkylanderFilters } from '../components/SkylanderFilter';
import { ElementGrid } from '../components/ElementIcon';
import { isFavorite, toggleFavorite } from '../utils/favorites';

interface SkylandersListProps {
  onNavigate: (page: string, id?: string) => void;
  searchQuery?: string;
}

export function SkylandersList({ onNavigate, searchQuery = '' }: SkylandersListProps) {
  const [filters, setFilters] = useState<SkylanderFilters>({
    elements: [],
    families: [],
    games: [],
    series: [],
    searchQuery: '',
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'element'>('name');

  useEffect(() => {
    const loadFavorites = () => {
      const favs = new Set<string>();
      skylanders.forEach(sky => {
        if (isFavorite(sky.id, 'character')) {
          favs.add(sky.id);
        }
      });
      setFavorites(favs);
    };
    loadFavorites();
  }, []);

  const handleFavoriteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id, 'character');
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Filtrage
  const filteredSkylanders = skylanders.filter((sky) => {
    // Ne montrer que les variantes Regular
    if (sky.variant !== 'Regular') {
      return false;
    }

    // Search
    if (searchQuery && !sky.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Elements
    if (filters.elements.length > 0 && !filters.elements.includes(sky.element)) {
      return false;
    }

    // Families
    if (filters.families.length > 0 && !filters.families.includes(sky.family)) {
      return false;
    }

    // Games - Filtrer par jeu d'origine (firstGame)
    if (filters.games.length > 0 && !filters.games.includes(sky.firstGame as Game)) {
      return false;
    }

    // Series
    if (filters.series.length > 0) {
      const hasSeries = filters.series.some(series => sky.series.includes(series as any));
      if (!hasSeries) return false;
    }

    return true;
  });

  // Tri
  const sortedSkylanders = [...filteredSkylanders].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year':
        return b.releasedYear - a.releasedYear;
      case 'element':
        return a.element.localeCompare(b.element);
      default:
        return 0;
    }
  });

  const hasActiveFilters = 
    filters.elements.length > 0 || 
    filters.families.length > 0 || 
    filters.games.length > 0 ||
    filters.series.length > 0 ||
    searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      <div className="flex">
        <SkylanderFilter
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-gray-900 dark:text-white">Encyclopédie Skylanders</h1>
                
                {/* Info badge pour changer les images */}
                <a
                  href="/COMMENT_CHANGER_LES_IMAGES.md"
                  target="_blank"
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  title="Voir le guide pour changer les images"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Changer les images
                </a>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {sortedSkylanders.length} Skylander{sortedSkylanders.length > 1 ? 's' : ''} trouvé{sortedSkylanders.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Quick Element Filter */}
            {!hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-white dark:bg-card rounded-2xl shadow-lg border border-gray-200 dark:border-border transition-colors"
              >
                <h3 className="text-gray-900 dark:text-white mb-4">Filtrer par élément</h3>
                <ElementGrid
                  onElementClick={(element) => {
                    setFilters({ ...filters, elements: [element] });
                  }}
                />
              </motion.div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-card border border-gray-300 dark:border-border rounded-lg hover:bg-gray-50 dark:hover:bg-muted transition-colors shadow-sm text-gray-900 dark:text-white"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-[#0B63D6] rounded-full" />
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white dark:bg-card border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] focus:border-transparent shadow-sm text-gray-900 dark:text-white transition-colors"
                >
                  <option value="name">Trier par nom</option>
                  <option value="year">Trier par année</option>
                  <option value="element">Trier par élément</option>
                </select>

                {hasActiveFilters && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => {
                      setFilters({
                        elements: [],
                        families: [],
                        games: [],
                        series: [],
                        searchQuery: '',
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors shadow-md"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg text-sm text-gray-600 dark:text-gray-400 shadow-sm transition-colors">
                  <Grid className="w-4 h-4 inline mr-2" />
                  Vue grille
                </div>
              </div>
            </div>

            {/* Results */}
            {sortedSkylanders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-2">Aucun Skylander trouvé</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Essayez d'élargir vos critères de recherche ou de filtrage.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      elements: [],
                      families: [],
                      games: [],
                      series: [],
                      searchQuery: '',
                    });
                  }}
                  className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors shadow-md"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedSkylanders.map((skylander, index) => (
                  <motion.div
                    key={skylander.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <SkylanderCard
                      skylander={skylander}
                      onCardClick={(id) => onNavigate('skylander-detail', id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      isFavorite={favorites.has(skylander.id)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}