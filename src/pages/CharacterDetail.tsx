import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Star,
  Zap,
  Shield,
  Swords,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";
import { characters, Character } from "../data/characters";
import { getImageUrl } from "../utils/imageMap";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface CharacterDetailProps {
  characterId: string;
  onNavigate: (page: string) => void;
}

const elementColors: Record<string, string> = {
  Feu: "from-orange-500 to-red-600",
  Eau: "from-blue-400 to-cyan-600",
  Terre: "from-amber-600 to-yellow-700",
  Air: "from-sky-300 to-indigo-400",
  Vie: "from-green-400 to-emerald-600",
  "Mort-Vivant": "from-purple-900 to-gray-800",
  Magie: "from-purple-500 to-pink-600",
  Tech: "from-gray-500 to-slate-700",
  Lumière: "from-white to-yellow-700",
  Ténèbres: "from-gray-800 to-black",
};

const elementIcons: Record<string, any> = {
  Feu: Zap,
  Eau: Shield,
  Terre: Shield,
  Air: Zap,
  Vie: Heart,
  "Mort-Vivant": Swords,
  Magie: Star,
  Tech: Zap,
  Lumière: Shield,
  Ténèbres: motion,
};

export function CharacterDetail({
  characterId,
  onNavigate,
}: CharacterDetailProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "abilities" | "stats" | "variants"
  >("description");
  const [isFav, setIsFav] = useState(false);

  const character = characters.find(
    (c) => c.id === characterId,
  );

  useEffect(() => {
    if (character) {
      setIsFav(isFavorite(character.id, "character"));
    }
  }, [character]);

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">
            Personnage non trouvé
          </h2>
          <button
            onClick={() => onNavigate("characters")}
            className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
          >
            Retour aux personnages
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(character.id, "character");
    setIsFav(!isFav);
  };

  const ElementIcon = elementIcons[character.element];

  const tabs = [
    { id: "description", label: "Description" },
    { id: "abilities", label: "Compétences" },
    { id: "stats", label: "Statistiques" },
    { id: "variants", label: "Variantes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className={`relative bg-gradient-to-br ${elementColors[character.element]} text-white`}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => onNavigate("characters")}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux personnages
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <ImageWithFallback
                  src={getImageUrl(character.images.full)}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 bg-white/20 backdrop-blur-sm rounded-xl`}
                >
                  <ElementIcon className="w-6 h-6" />
                </div>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {character.element}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {character.type}
                </span>
              </div>

              <h1 className="text-white mb-4">
                {character.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-white/80">Rareté:</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    {character.rarity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/80">
                    Puissance:
                  </span>
                  <span className="text-2xl">
                    {character.basePower}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFavoriteToggle}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isFav
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                }`}
              >
                <Star
                  className={`w-5 h-5 ${isFav ? "fill-white" : ""}`}
                />
                {isFav
                  ? "Dans les favoris"
                  : "Ajouter aux favoris"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-[#0B63D6] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "description" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-gray-900 mb-4">
                À propos de {character.name}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {character.description}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-900 mb-3">
                    Origine
                  </h3>
                  <p className="text-gray-600">
                    {character.gameOrigin}
                  </p>
                </div>
                <div>
                  <h3 className="text-gray-900 mb-3">
                    Où le trouver
                  </h3>
                  <ul className="space-y-2">
                    {character.foundIn.map(
                      (location, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <div className="w-2 h-2 bg-[#0B63D6] rounded-full" />
                          {location}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "abilities" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-gray-900 mb-6">
                Compétences
              </h2>
              <div className="space-y-4">
                {character.abilities.map((ability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${elementColors[character.element]} flex items-center justify-center text-white flex-shrink-0`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">
                        {ability}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Compétence{" "}
                        {index ===
                        character.abilities.length - 1
                          ? "ultime"
                          : "de base"}{" "}
                        du personnage
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-gray-900 mb-6">
                Statistiques
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">
                      Puissance
                    </span>
                    <span className="text-gray-900">
                      {character.basePower}/350
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(character.basePower / 350) * 100}%`,
                      }}
                      transition={{
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className={`h-full bg-gradient-to-r ${elementColors[character.element]}`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl text-gray-900 mb-2">
                      {character.element}
                    </div>
                    <div className="text-sm text-gray-600">
                      Élément
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-gray-900 mb-2">
                      {character.type}
                    </div>
                    <div className="text-sm text-gray-600">
                      Type
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-gray-900 mb-2">
                      {character.rarity}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rareté
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "variants" && (
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-gray-900 mb-6">
                Variantes disponibles
              </h2>
              {character.variants &&
              character.variants.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {character.variants.map((variant, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#0B63D6] transition-colors"
                    >
                      <h3 className="text-gray-900 mb-2">
                        {variant}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Variante exclusive du personnage{" "}
                        {character.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Aucune variante disponible pour ce personnage
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}