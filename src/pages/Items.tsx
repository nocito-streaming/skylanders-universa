import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ItemCard } from '../components/ItemCard';

// Mock data for items
const mockItems = [
  {
    id: '1',
    name: 'Anvil Rain',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
    game: "Spyro's Adventure",
    effect: 'Boost Armure',
    type: 'Magical Item',
  },
  {
    id: '2',
    name: 'Hidden Treasure',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=400&fit=crop',
    game: 'Giants',
    effect: 'Nouvelles zones',
    type: 'Adventure Pack',
  },
  {
    id: '3',
    name: 'Sky Diamond',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop',
    game: 'Swap Force',
    effect: 'Boost Vitesse',
    type: 'Magical Item',
  },
  {
    id: '4',
    name: 'Volcanic Vault',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    game: 'Trap Team',
    effect: 'Nouvelle Zone',
    type: 'Adventure Pack',
  },
  {
    id: '5',
    name: 'Legendary Treasure',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop',
    game: 'SuperChargers',
    effect: 'Boost Or',
    type: 'Relic',
  },
  {
    id: '6',
    name: 'Crystal Eye Castle',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=400&fit=crop',
    game: 'Imaginators',
    effect: 'Nouvelle Zone',
    type: 'Adventure Pack',
  },
  {
    id: '7',
    name: 'Dragon\'s Peak',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab30a?w=400&h=400&fit=crop',
    game: "Spyro's Adventure",
    effect: 'Nouvelle Zone',
    type: 'Adventure Pack',
  },
  {
    id: '8',
    name: 'Empire of Ice',
    image: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=400&fit=crop',
    game: "Spyro's Adventure",
    effect: 'Nouvelle Zone',
    type: 'Adventure Pack',
  },
];

const games = [
  'Tous les jeux',
  "Spyro's Adventure",
  'Giants',
  'Swap Force',
  'Trap Team',
  'SuperChargers',
  'Imaginators',
];

const types = [
  'Tous les types',
  'Magical Item',
  'Adventure Pack',
  'Relic',
];

interface ItemsProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Items({ onNavigate }: ItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState('Tous les jeux');
  const [selectedType, setSelectedType] = useState('Tous les types');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'Tous les jeux' || item.game === selectedGame;
    const matchesType = selectedType === 'Tous les types' || item.type === selectedType;
    return matchesSearch && matchesGame && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">Objets Magiques</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez tous les objets de l'univers Skylanders
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un objet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white dark:bg-card border-gray-200 dark:border-gray-800"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 bg-white dark:bg-card border-gray-200 dark:border-gray-800"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 space-y-4"
            >
              {/* Game Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Jeu d'origine
                </label>
                <div className="flex flex-wrap gap-2">
                  {games.map((game) => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedGame === game
                          ? 'bg-[#0B63D6] text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type d'objet
                </label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedType === type
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {filteredItems.length} objet{filteredItems.length > 1 ? 's' : ''} trouvé{filteredItems.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ItemCard
                {...item}
                onClick={() => onNavigate('item-detail', item.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Sparkles className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">Aucun objet trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}