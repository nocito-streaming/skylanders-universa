import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Character } from '../data/characters';
import { getImageUrl } from '../utils/imageMap';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CharacterCardProps {
  character: Character;
  onCardClick: (id: string) => void;
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const elementColors: Record<string, string> = {
  'Feu': 'bg-gradient-to-br from-orange-500 to-red-600',
  'Eau': 'bg-gradient-to-br from-blue-400 to-cyan-600',
  'Terre': 'bg-gradient-to-br from-amber-600 to-yellow-700',
  'Air': 'bg-gradient-to-br from-sky-300 to-indigo-400',
  'Vie': 'bg-gradient-to-br from-green-400 to-emerald-600',
  'Mort-Vivant': 'bg-gradient-to-br from-purple-900 to-gray-800',
  'Magie': 'bg-gradient-to-br from-purple-500 to-pink-600',
  'Tech': 'bg-gradient-to-br from-gray-500 to-slate-700',
};

const rarityColors: Record<string, { bg: string; text: string; border: string }> = {
  'Common': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  'Rare': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  'Epic': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'Legendary': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
};

export function CharacterCard({ character, onCardClick, onFavoriteToggle, isFavorite }: CharacterCardProps) {
  const rarityStyle = rarityColors[character.rarity];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer"
      onClick={() => onCardClick(character.id)}
    >
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl ${elementColors[character.element]}`} />
      
      <div className={`relative bg-white rounded-xl overflow-hidden border-2 ${rarityStyle.border} shadow-lg hover:shadow-2xl transition-shadow`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 ${elementColors[character.element]} opacity-20`} />
          <ImageWithFallback
            src={getImageUrl(character.images.thumb)}
            alt={character.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Favorite button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => onFavoriteToggle(character.id, e)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-amber-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
          </motion.button>

          {/* Rarity badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs ${rarityStyle.bg} ${rarityStyle.text} backdrop-blur-sm border ${rarityStyle.border}`}>
            {character.rarity}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{character.name}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white ${elementColors[character.element]}`}>
                  {character.element}
                </span>
                <span className="text-xs text-gray-600">{character.type}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {character.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Puissance</span>
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${elementColors[character.element]}`}
                    style={{ width: `${(character.basePower / 350) * 100}%` }}
                  />
                </div>
                <span className="text-xs">{character.basePower}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            {character.gameOrigin}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
