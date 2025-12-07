import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Zap } from 'lucide-react';
import { Input } from '../components/ui/input';
import { PortalCard } from '../components/PortalCard';

// Mock data for portals
const mockPortals = [
  {
    id: '1',
    name: 'Portal of Power',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&h=300&fit=crop',
    game: "Spyro's Adventure",
    compatibility: 'Tous les Skylanders',
  },
  {
    id: '2',
    name: 'Giants Portal',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    game: 'Giants',
    compatibility: 'Skylanders + Giants',
  },
  {
    id: '3',
    name: 'Swap Force Portal',
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=300&fit=crop',
    game: 'Swap Force',
    compatibility: 'Tous + Swap Force',
  },
  {
    id: '4',
    name: 'Trap Team Portal',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=300&fit=crop',
    game: 'Trap Team',
    compatibility: 'Tous + Traptanium',
  },
  {
    id: '5',
    name: 'SuperChargers Portal',
    image: 'https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=400&h=300&fit=crop',
    game: 'SuperChargers',
    compatibility: 'Tous + Véhicules',
  },
  {
    id: '6',
    name: 'Imaginators Portal',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400&h=300&fit=crop',
    game: 'Imaginators',
    compatibility: 'Tous + Sensei',
  },
];

interface PortalsProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Portals({ onNavigate }: PortalsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPortals = mockPortals.filter(portal =>
    portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    portal.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white">Portails du Pouvoir</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez les différents portails et leur compatibilité
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un portail..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white dark:bg-card border-gray-200 dark:border-gray-800"
            />
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPortals.length} portail{filteredPortals.length > 1 ? 's' : ''} trouvé{filteredPortals.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Portals Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPortals.map((portal, index) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <PortalCard
                {...portal}
                onClick={() => onNavigate('portal-detail', portal.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredPortals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Zap className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">Aucun portail trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier votre recherche
            </p>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20 rounded-2xl p-8 border border-cyan-200 dark:border-cyan-900/50"
        >
          <h2 className="text-gray-900 dark:text-white mb-4">À propos des Portails du Pouvoir</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Les Portails du Pouvoir sont des accessoires essentiels pour jouer à Skylanders. 
            Chaque jeu est livré avec son propre portail, mais la plupart des portails sont 
            rétrocompatibles avec les figurines des jeux précédents.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Certains portails offrent des fonctionnalités uniques, comme la fente Traptanium 
            du Trap Team Portal ou l'emplacement véhicule du SuperChargers Portal.
          </p>
        </motion.div>
      </div>
    </div>
  );
}