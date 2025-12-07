import { Heart, Star, Check, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Element, Skylander } from "../data/skylanders";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getSkylanderImage } from "../data/images-config";
import { useState } from "react";
import {
  isInCollection,
  toggleCollection,
} from "../utils/collection";

interface SkylanderCardProps {
  skylander: Skylander;
  onCardClick: (id: string) => void;
  onFavoriteToggle: (id: string, e: React.MouseEvent) => void;
  isFavorite: boolean;
}

// Couleurs officielles des éléments Skylanders
const elementColors: Record<
  string,
  { gradient: string; solid: string; glow: string }
> = {
  Fire: {
    gradient: "from-orange-500 via-red-500 to-red-600",
    solid: "bg-red-500",
    glow: "shadow-red-500/50",
  },
  Water: {
    gradient: "from-blue-400 via-blue-500 to-cyan-500",
    solid: "bg-blue-500",
    glow: "shadow-blue-500/50",
  },
  Life: {
    gradient: "from-green-400 via-green-500 to-emerald-600",
    solid: "bg-green-500",
    glow: "shadow-green-500/50",
  },
  Undead: {
    gradient: "from-purple-700 via-purple-800 to-purple-900",
    solid: "bg-purple-800",
    glow: "shadow-purple-700/50",
  },
  Magic: {
    gradient: "from-purple-400 via-purple-500 to-pink-500",
    solid: "bg-purple-500",
    glow: "shadow-purple-500/50",
  },
  Tech: {
    gradient: "from-yellow-400 via-yellow-500 to-amber-500",
    solid: "bg-yellow-500",
    glow: "shadow-yellow-500/50",
  },
  Earth: {
    gradient: "from-orange-700 via-amber-700 to-yellow-700",
    solid: "bg-amber-700",
    glow: "shadow-amber-700/50",
  },
  Air: {
    gradient: "from-cyan-300 via-sky-400 to-blue-400",
    solid: "bg-sky-400",
    glow: "shadow-sky-400/50",
  },
  Lumière: {
    gradient: "from-yellow-300 via-yellow-400 to-yellow-500",
    solid: "bg-yellow-400",
    glow: "shadow-yellow-400/50",
  },
  Ténèbres: {
    gradient: "from-gray-800 via-gray-900 to-black",
    solid: "bg-gray-900",
    glow: "shadow-gray-900/50",
  },
};

// Couleurs pour les familles
const familyColors: Record<string, string> = {
  Core: "bg-gray-700",
  Giant: "bg-orange-600",
  LightCore: "bg-yellow-500",
  "Swap Force": "bg-blue-600",
  "Trap Master": "bg-purple-600",
  SuperCharger: "bg-red-600",
  Sensei: "bg-green-600",
  Mini: "bg-pink-500",
  "Eon's Elite": "bg-amber-500",
};

export function SkylanderCard({
  skylander,
  onCardClick,
  onFavoriteToggle,
  isFavorite,
}: SkylanderCardProps) {
  const elementStyle = elementColors[skylander.element];
  const [inWishlist, setInWishlist] = useState(
    isInCollection(skylander.id, "wishlist"),
  );
  const [inOwned, setInOwned] = useState(
    isInCollection(skylander.id, "owned"),
  );

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdded = toggleCollection(skylander.id, "wishlist");
    setInWishlist(isAdded);
  };

  const handleOwnedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdded = toggleCollection(skylander.id, "owned");
    setInOwned(isAdded);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer"
      onClick={() => onCardClick(skylander.id)}
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-gradient-to-br ${elementStyle.gradient}`}
      />

      <div
        className={`relative bg-white dark:bg-card rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-border shadow-lg hover:shadow-2xl ${elementStyle.glow} group-hover:border-transparent transition-all`}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          {/* Element gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${elementStyle.gradient} opacity-20`}
          />

          {/* Character Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <ImageWithFallback
                src={getSkylanderImage(
                  skylander.id,
                  "character",
                )}
                alt={skylander.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                inWishlist
                  ? "bg-pink-500 shadow-pink-500/50"
                  : "bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80"
              }`}
              aria-label={
                inWishlist
                  ? "Retirer de la liste d'envies"
                  : "Ajouter à la liste d'envies"
              }
            >
              <Heart
                className={`w-4 h-4 ${inWishlist ? "fill-white text-white" : "text-gray-600 dark:text-white"}`}
              />
            </motion.button>

            {/* Owned Button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleOwnedToggle}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                inOwned
                  ? "bg-green-500 shadow-green-500/50"
                  : "bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80"
              }`}
              aria-label={
                inOwned
                  ? "Retirer de votre collection"
                  : "Ajouter à votre collection"
              }
            >
              <Check
                className={`w-4 h-4 ${inOwned ? "text-white stroke-[3]" : "text-gray-600 dark:text-white"}`}
              />
            </motion.button>

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 15 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => onFavoriteToggle(skylander.id, e)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFavorite
                  ? "bg-amber-500 shadow-lg shadow-amber-500/50"
                  : "bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 shadow-md"
              }`}
              aria-label={
                isFavorite
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
            >
              <Star
                className={`w-4 h-4 ${isFavorite ? "fill-white text-white" : "text-gray-600 dark:text-white"}`}
              />
            </motion.button>
          </div>

          {/* Element Badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${elementStyle.gradient} text-white text-xs backdrop-blur-sm shadow-lg flex items-center gap-1.5`}
          >
            <Zap className="w-3 h-3" />
            {skylander.element}
          </div>

          {/* Family Badge */}
          <div
            className={`absolute bottom-3 left-3 px-3 py-1 rounded-full ${familyColors[skylander.family]} text-white text-xs shadow-lg`}
          >
            {skylander.family}
          </div>

          {/* Variant Badge (if not Regular) */}
          {skylander.variant !== "Regular" && (
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm text-yellow-400 text-xs shadow-lg border border-yellow-400/30">
              ✨ {skylander.variant}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Name & Series */}
          <div className="mb-3">
            <h3 className="text-gray-900 dark:text-card-foreground mb-1 group-hover:text-[#0B63D6] transition-colors">
              {skylander.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 italic">
              "{skylander.catchphrase}"
            </p>
          </div>

          {/* Collection Status */}
          {(inWishlist || inOwned) && (
            <div className="flex gap-2 mb-3">
              {inWishlist && (
                <div className="flex items-center gap-1 px-2 py-1 bg-pink-100 dark:bg-pink-950/30 rounded-full text-xs text-pink-600 dark:text-pink-400">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>Souhaité</span>
                </div>
              )}
              {inOwned && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-950/30 rounded-full text-xs text-green-600 dark:text-green-400">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Possédé</span>
                </div>
              )}
            </div>
          )}

          {/* Series Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skylander.series.map((series) => (
              <span
                key={series}
                className="px-2 py-0.5 bg-gray-100 dark:bg-muted text-gray-600 dark:text-gray-200 text-xs rounded-full"
              >
                {series}
              </span>
            ))}
          </div>

          {/* Stats Preview */}
          {skylander.stats && (
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-gray-100 dark:border-border">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Speed
                </div>
                <div
                  className={`text-sm ${elementStyle.solid} w-6 h-6 rounded-full flex items-center justify-center text-white mx-auto`}
                >
                  {skylander.stats.speed.base}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Armor
                </div>
                <div
                  className={`text-sm ${elementStyle.solid} w-6 h-6 rounded-full flex items-center justify-center text-white mx-auto`}
                >
                  {skylander.stats.armor.base}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Crit
                </div>
                <div
                  className={`text-sm ${elementStyle.solid} w-6 h-6 rounded-full flex items-center justify-center text-white mx-auto`}
                >
                  {skylander.stats.critical.base}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                  Elem
                </div>
                <div
                  className={`text-sm ${elementStyle.solid} w-6 h-6 rounded-full flex items-center justify-center text-white mx-auto`}
                >
                  {skylander.stats.elemental.base}
                </div>
              </div>
            </div>
          )}

          {/* First Game */}
          <div className="text-xs text-gray-500 dark:text-gray-300 mt-3 pt-3 border-t border-gray-100 dark:border-border">
            🎮 {skylander.firstGame} ({skylander.releasedYear})
          </div>
        </div>
      </div>
    </motion.div>
  );
}