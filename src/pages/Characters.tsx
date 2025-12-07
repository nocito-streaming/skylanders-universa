import { useState, useEffect } from 'react';
import { Filter, Grid, List, X } from 'lucide-react';
import { motion } from 'motion/react';
import { characters, Character } from '../data/characters';
import { CharacterCard } from '../components/CharacterCard';
import { FilterSidebar, Filters } from '../components/FilterSidebar';
import { isFavorite, toggleFavorite } from '../utils/favorites';

interface CharactersProps {
  onNavigate: (page: string, id?: string) => void;
  searchQuery?: string;
}

export function Characters({ onNavigate, searchQuery = '' }: CharactersProps) {
  const [filters, setFilters] = useState<Filters>({
    elements: [],
    rarities: [],
    types: [],
    powerRange: [0, 350],
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'power' | 'rarity'>('name');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadFavorites = () => {
      const favs = new Set<string>();
      characters.forEach(char => {
        if (isFavorite(char.id, 'character')) {
          favs.add(char.id);
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

  const filteredCharacters = characters.filter((char) => {
    // Search filter
    if (searchQuery && !char.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Element filter
    if (filters.elements.length > 0 && !filters.elements.includes(char.element)) {
      return false;
    }

    // Rarity filter
    if (filters.rarities.length > 0 && !filters.rarities.includes(char.rarity)) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(char.type)) {
      return false;
    }

    // Power range filter
    if (char.basePower < filters.powerRange[0] || char.basePower > filters.powerRange[1]) {
      return false;
    }

    return true;
  });

  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'power':
        return b.basePower - a.basePower;
      case 'rarity':
        const rarityOrder = { Common: 0, Rare: 1, Epic: 2, Legendary: 3 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

  const hasActiveFilters = 
    filters.elements.length > 0 || 
    filters.rarities.length > 0 || 
    filters.types.length > 0 ||
    filters.powerRange[0] !== 0 ||
    filters.powerRange[1] !== 350 ||
    searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
        />

        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Personnages Skylanders</h1>
              <p className="text-gray-600">
                {sortedCharacters.length} personnage{sortedCharacters.length > 1 ? 's' : ''} trouvé{sortedCharacters.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] focus:border-transparent"
                >
                  <option value="name">Trier par nom</option>
                  <option value="power">Trier par puissance</option>
                  <option value="rarity">Trier par rareté</option>
                </select>

                {hasActiveFilters && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => {
                      setFilters({
                        elements: [],
                        rarities: [],
                        types: [],
                        powerRange: [0, 350],
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Réinitialiser
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#0B63D6] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label="Vue grille"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#0B63D6] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  aria-label="Vue liste"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results */}
            {sortedCharacters.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-gray-900 mb-2">Aucun personnage trouvé</h3>
                <p className="text-gray-600 mb-6">
                  Essayez d'élargir vos critères de recherche ou de filtrage.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      elements: [],
                      rarities: [],
                      types: [],
                      powerRange: [0, 350],
                    });
                  }}
                  className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedCharacters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CharacterCard
                      character={character}
                      onCardClick={(id) => onNavigate('character-detail', id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      isFavorite={favorites.has(character.id)}
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
