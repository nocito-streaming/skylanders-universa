import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Zap } from 'lucide-react';

interface PortalCardProps {
  id: string;
  name: string;
  image: string;
  game: string;
  compatibility?: string;
  onClick?: () => void;
}

export function PortalCard({ name, image, game, compatibility, onClick }: PortalCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-card rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-800 transition-all duration-300 group"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-950/30 dark:to-teal-950/30 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Compatibility Badge */}
        {compatibility && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4 text-white flex-shrink-0" />
              <span className="text-xs font-medium text-white truncate">{compatibility}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white mb-1 truncate group-hover:text-[#0B63D6] dark:group-hover:text-[#4A9EFF] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {game}
        </p>
      </div>
    </motion.div>
  );
}
