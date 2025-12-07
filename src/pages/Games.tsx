import { motion } from 'motion/react';
import { Gamepad2, Sparkles } from 'lucide-react';
import { gamesInfo } from '../data/skylanders';
import { GameCard } from '../components/GameCard';

interface GamesProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Games({ onNavigate }: GamesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-card transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0B63D6]/10 to-[#8A2BE2]/10 dark:from-[#0B63D6]/20 dark:to-[#8A2BE2]/20 rounded-full mb-4">
            <Gamepad2 className="w-5 h-5 text-[#0B63D6] dark:text-[#0B63D6]" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Tous les jeux Skylanders</span>
          </div>
          
          <h1 className="text-gray-900 dark:text-white mb-4">
            La Saga Skylanders
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Découvrez tous les jeux de la franchise qui a révolutionné le gaming avec la technologie Toys-to-Life
          </p>
        </motion.div>

        {/* Timeline visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12 relative"
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] hidden md:block" />
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gamesInfo.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCard game={game} onClick={() => onNavigate('game-detail', game.id)} />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-white mb-4">Une Franchise Légendaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-2">6</div>
              <div className="text-white/90">Jeux principaux</div>
            </div>
            <div>
              <div className="text-4xl mb-2">300+</div>
              <div className="text-white/90">Skylanders créés</div>
            </div>
            <div>
              <div className="text-4xl mb-2">2011-2016</div>
              <div className="text-white/90">Années d'or</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}