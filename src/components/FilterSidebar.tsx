import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  elements,
  rarities,
  characterTypes,
  Element,
  Rarity,
  CharacterType,
} from "../data/characters";

export interface Filters {
  elements: Element[];
  rarities: Rarity[];
  types: CharacterType[];
  powerRange: [number, number];
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const toggleArrayFilter = <T,>(array: T[], value: T): T[] => {
    return array.includes(value)
      ? array.filter((item) => item !== value)
      : [...array, value];
  };

  const handleElementToggle = (element: Element) => {
    onFiltersChange({
      ...filters,
      elements: toggleArrayFilter(filters.elements, element),
    });
  };

  const handleRarityToggle = (rarity: Rarity) => {
    onFiltersChange({
      ...filters,
      rarities: toggleArrayFilter(filters.rarities, rarity),
    });
  };

  const handleTypeToggle = (type: CharacterType) => {
    onFiltersChange({
      ...filters,
      types: toggleArrayFilter(filters.types, type),
    });
  };

  const handlePowerChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.powerRange];
    newRange[index] = value;
    onFiltersChange({
      ...filters,
      powerRange: newRange,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      elements: [],
      rarities: [],
      types: [],
      powerRange: [0, 350],
    });
  };

  const hasActiveFilters =
    filters.elements.length > 0 ||
    filters.rarities.length > 0 ||
    filters.types.length > 0 ||
    filters.powerRange[0] !== 0 ||
    filters.powerRange[1] !== 350;

  const elementColors: Record<Element, string> = {
    Feu: "bg-orange-500 hover:bg-orange-600 border-orange-600",
    Eau: "bg-blue-500 hover:bg-blue-600 border-blue-600",
    Terre: "bg-amber-600 hover:bg-amber-700 border-amber-700",
    Air: "bg-sky-400 hover:bg-sky-500 border-sky-500",
    Vie: "bg-green-500 hover:bg-green-600 border-green-600",
    "Mort-Vivant":
      "bg-purple-900 hover:bg-purple-950 border-purple-950",
    Magie:
      "bg-purple-500 hover:bg-purple-600 border-purple-600",
    Tech: "bg-gray-600 hover:bg-gray-700 border-gray-700",
    Lumière:"bg-yellow-400 hover:bg-yellow-500 border-yellow-500",
    Ténèbres: "bg-gray-800 hover:bg-gray-900 border-gray-900",
  };

  const content = (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900">Filtres</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer les filtres"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full mb-6 px-4 py-2 text-sm text-[#0B63D6] border border-[#0B63D6] rounded-lg hover:bg-blue-50 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        )}

        {/* Elements */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Éléments</h3>
          <div className="flex flex-wrap gap-2">
            {elements.map((element) => (
              <button
                key={element}
                onClick={() => handleElementToggle(element)}
                className={`px-3 py-2 rounded-lg text-sm transition-all border-2 ${
                  filters.elements.includes(element)
                    ? `${elementColors[element]} text-white`
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {element}
              </button>
            ))}
          </div>
        </div>

        {/* Rarity */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Rareté</h3>
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <label
                key={rarity}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.rarities.includes(rarity)}
                  onChange={() => handleRarityToggle(rarity)}
                  className="w-4 h-4 text-[#0B63D6] border-gray-300 rounded focus:ring-[#0B63D6]"
                />
                <span className="text-sm text-gray-700">
                  {rarity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Type</h3>
          <div className="space-y-2">
            {characterTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="w-4 h-4 text-[#0B63D6] border-gray-300 rounded focus:ring-[#0B63D6]"
                />
                <span className="text-sm text-gray-700">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Power Range */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3">Puissance</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Minimum: {filters.powerRange[0]}
              </label>
              <input
                type="range"
                min="0"
                max="350"
                step="10"
                value={filters.powerRange[0]}
                onChange={(e) =>
                  handlePowerChange(0, parseInt(e.target.value))
                }
                className="w-full accent-[#0B63D6]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">
                Maximum: {filters.powerRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="350"
                step="10"
                value={filters.powerRange[1]}
                onChange={(e) =>
                  handlePowerChange(1, parseInt(e.target.value))
                }
                className="w-full accent-[#0B63D6]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile: render as overlay
  if (
    typeof window !== "undefined" &&
    window.innerWidth < 1024
  ) {
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
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl lg:hidden"
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
    <aside className="hidden lg:block w-80 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)]">
      {content}
    </aside>
  );
}