import { Calendar, Gamepad2, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { GameInfo } from '../data/skylanders';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GameCardProps {
  game: GameInfo;
  onClick: (id: string) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(game.id)}
      className="relative group cursor-pointer"
    >
      <div className="relative bg-white dark:bg-card rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-border shadow-lg hover:shadow-2xl hover:shadow-[#0B63D6]/20 transition-all">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop`}
              alt={game.title}
              className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Year badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/30">
            <Calendar className="w-4 h-4 inline mr-1" />
            {game.releaseYear}
          </div>

          {/* Title on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-2xl mb-1 drop-shadow-lg">
              {game.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* New Feature Highlight */}
          <div className="mb-4 p-3 bg-gradient-to-r from-[#0B63D6]/10 to-[#8A2BE2]/10 rounded-lg border border-[#0B63D6]/20">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Nouveauté</div>
            <div className="text-sm text-gray-900 dark:text-white">{game.newFeature}</div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {game.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-border">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#0B63D6]/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#0B63D6]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Skylanders</div>
                <div className="text-gray-900 dark:text-white">{game.totalSkylanders}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-lg bg-[#8A2BE2]/10 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-[#8A2BE2]" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Plateformes</div>
                <div className="text-gray-900 dark:text-white">{game.platforms.length}</div>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {game.platforms.slice(0, 4).map((platform) => (
              <span
                key={platform}
                className="px-2 py-1 bg-gray-100 dark:bg-muted text-gray-600 dark:text-gray-300 text-xs rounded"
              >
                {platform}
              </span>
            ))}
            {game.platforms.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-muted text-gray-600 dark:text-gray-300 text-xs rounded">
                +{game.platforms.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
