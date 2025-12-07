import { useState } from 'react';
import { Heart, Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { CollectionType, toggleCollection, isInCollection } from '../utils/collection';
import { toast } from 'sonner@2.0.3';

interface CollectionManagerProps {
  itemId: string;
  itemName?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onUpdate?: () => void;
}

export function CollectionManager({ 
  itemId, 
  itemName = 'cet élément',
  showLabels = false,
  size = 'md',
  onUpdate 
}: CollectionManagerProps) {
  const [inWishlist, setInWishlist] = useState(isInCollection(itemId, 'wishlist'));
  const [inOwned, setInOwned] = useState(isInCollection(itemId, 'owned'));

  const handleToggle = (type: CollectionType) => {
    const isAdded = toggleCollection(itemId, type);
    
    if (type === 'wishlist') {
      setInWishlist(isAdded);
      toast.success(isAdded 
        ? `${itemName} ajouté à votre liste d'envies` 
        : `${itemName} retiré de votre liste d'envies`
      );
    } else {
      setInOwned(isAdded);
      toast.success(isAdded 
        ? `${itemName} ajouté à votre collection` 
        : `${itemName} retiré de votre collection`
      );
    }

    if (onUpdate) {
      onUpdate();
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
  const buttonPadding = size === 'sm' ? 'p-2' : size === 'md' ? 'p-2.5' : 'p-3';

  return (
    <div className="flex items-center gap-2">
      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle('wishlist');
        }}
        className={`${buttonPadding} rounded-lg transition-all ${
          inWishlist 
            ? 'bg-pink-100 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 border-2 border-pink-300 dark:border-pink-800' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-800'
        }`}
        title={inWishlist ? "Retirer de la liste d'envies" : "Ajouter à la liste d'envies"}
      >
        <Heart className={`${iconSize} ${inWishlist ? 'fill-current' : ''}`} />
      </motion.button>

      {/* Owned Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle('owned');
        }}
        className={`${buttonPadding} rounded-lg transition-all ${
          inOwned 
            ? 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 border-2 border-green-300 dark:border-green-800' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:border-green-300 dark:hover:border-green-800'
        }`}
        title={inOwned ? "Retirer de votre collection" : "Ajouter à votre collection"}
      >
        <Check className={`${iconSize} ${inOwned ? 'stroke-[3]' : ''}`} />
      </motion.button>

      {showLabels && (
        <div className="flex flex-col text-xs">
          {inWishlist && (
            <span className="text-pink-600 dark:text-pink-400">En liste d'envies</span>
          )}
          {inOwned && (
            <span className="text-green-600 dark:text-green-400">Possédé</span>
          )}
        </div>
      )}
    </div>
  );
}
