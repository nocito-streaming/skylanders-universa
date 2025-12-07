import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { elements, families, games, Element, Family, Game } from '../data/skylanders';
import { ElementIcon } from './ElementIcon';

export interface SkylanderFilters {
  elements: Element[];
  families: Family[];
  games: Game[];
  series: string[];
  searchQuery: string;
}

interface SkylanderFilterProps {
  filters: SkylanderFilters;
  onFiltersChange: (filters: SkylanderFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SkylanderFilter({ filters, onFiltersChange, isOpen, onClose }: SkylanderFilterProps) {
  const toggleArrayFilter = <T,>(array: T[], value: T): T[] => {
    return array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  const handleElementToggle = (element: Element) => {
    onFiltersChange({
      ...filters,
      elements: toggleArrayFilter(filters.elements, element),
    });
  };

  const handleFamilyToggle = (family: Family) => {
    onFiltersChange({
      ...filters,
      families: toggleArrayFilter(filters.families, family),
    });
  };

  const handleGameToggle = (game: Game) => {
    onFiltersChange({
      ...filters,
      games: toggleArrayFilter(filters.games, game),
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      elements: [],
      families: [],
      games: [],
      series: [],
      searchQuery: '',
    });
  };

  const hasActiveFilters = 
    filters.elements.length > 0 || 
    filters.families.length > 0 || 
    filters.games.length > 0 ||
    filters.series.length > 0;

  const familyColors: Record<Family, string> = {
    'Core': 'border-gray-700 text-gray-700 hover:bg-gray-700',
    'Giant': 'border-orange-600 text-orange-600 hover:bg-orange-600',
    'LightCore': 'border-yellow-500 text-yellow-500 hover:bg-yellow-500',
    'Swap Force': 'border-blue-600 text-blue-600 hover:bg-blue-600',
    'Trap Master': 'border-purple-600 text-purple-600 hover:bg-purple-600',
    'SuperCharger': 'border-red-600 text-red-600 hover:bg-red-600',
    'Sensei': 'border-green-600 text-green-600 hover:bg-green-600',
    'Mini': 'border-pink-500 text-pink-500 hover:bg-pink-500',
    'Eon\'s Elite': 'border-amber-500 text-amber-500 hover:bg-amber-500',
  };

  const content = (
    <div className="h-full overflow-y-auto bg-white dark:bg-card transition-colors">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 dark:text-white">Filtres</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-muted rounded-lg transition-colors text-gray-900 dark:text-white"
            aria-label="Fermer les filtres"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full mb-6 px-4 py-2 text-sm text-[#0B63D6] border border-[#0B63D6] rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        )}

        {/* Éléments avec icônes */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Éléments</h3>
          <div className="grid grid-cols-2 gap-3">
            {elements.map((element) => (
              <button
                key={element}
                onClick={() => handleElementToggle(element)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  filters.elements.includes(element)
                    ? 'border-[#0B63D6] bg-blue-50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <ElementIcon element={element} size="sm" showLabel />
              </button>
            ))}
          </div>
        </div>

        {/* Familles */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Familles</h3>
          <div className="flex flex-wrap gap-2">
            {families.map((family) => (
              <button
                key={family}
                onClick={() => handleFamilyToggle(family)}
                className={`px-4 py-2 rounded-lg text-sm transition-all border-2 ${
                  filters.families.includes(family)
                    ? `${familyColors[family]} text-white bg-current border-current`
                    : `${familyColors[family]} bg-transparent border-current hover:text-white`
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Jeux */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Jeux d'origine</h3>
          <div className="space-y-2">
            {games.map((game) => (
              <label
                key={game}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-muted cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.games.includes(game)}
                  onChange={() => handleGameToggle(game)}
                  className="w-4 h-4 text-[#0B63D6] border-gray-300 dark:border-border rounded focus:ring-[#0B63D6]"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200">{game}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Séries */}
        <div className="mb-6">
          <h3 className="text-gray-900 dark:text-white mb-3">Séries</h3>
          <div className="flex flex-wrap gap-2">
            {['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'].map((series) => (
              <button
                key={series}
                onClick={() => {
                  onFiltersChange({
                    ...filters,
                    series: toggleArrayFilter(filters.series, series),
                  });
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${
                  filters.series.includes(series)
                    ? 'bg-[#8A2BE2] text-white border-[#8A2BE2]'
                    : 'bg-white dark:bg-card text-gray-700 dark:text-gray-200 border-gray-300 dark:border-border hover:border-[#8A2BE2]'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile: render as overlay
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-card z-50 shadow-2xl lg:hidden transition-colors"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: always visible
  return (
    <aside className="hidden lg:block w-80 bg-white dark:bg-card border-r border-gray-200 dark:border-border sticky top-16 h-[calc(100vh-4rem)] transition-colors">
      {content}
    </aside>
  );
}