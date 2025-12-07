import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Zap, Award, Info, Heart, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { skylanders } from '../data/skylanders';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { isInCollection, toggleCollection } from '../utils/collection';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ElementIcon } from '../components/ElementIcon';
import { getSkylanderImage } from '../data/images-config';
import { toast } from 'sonner@2.0.3';

interface SkylanderDetailProps {
  skylanderId: string;
  onNavigate: (page: string, id?: string) => void;
}

const elementColors: Record<string, string> = {
  'Fire': 'from-orange-500 to-red-600',
  'Water': 'from-blue-400 to-cyan-500',
  'Life': 'from-green-400 to-emerald-600',
  'Undead': 'from-purple-700 to-purple-900',
  'Magic': 'from-purple-400 to-pink-500',
  'Tech': 'from-yellow-400 to-amber-500',
  'Earth': 'from-orange-700 to-yellow-700',
  'Air': 'from-cyan-300 to-blue-400',
  'Lumière': 'from-yellow-300 to-yellow-500',
  'Ténèbres': 'from-gray-800 to-black',
};

const familyColors: Record<string, string> = {
  'Core': 'bg-gray-700',
  'Giant': 'bg-orange-600',
  'LightCore': 'bg-yellow-500',
  'Swap Force': 'bg-blue-600',
  'Trap Master': 'bg-purple-600',
  'SuperCharger': 'bg-red-600',
  'Sensei': 'bg-green-600',
  'Mini': 'bg-pink-500',
  'Eon\'s Elite': 'bg-amber-500',
};

const getGameInfo = (gameName: string): { icon: string; year: string; platforms: string } => {
  const gameData: Record<string, { icon: string; year: string; platforms: string }> = {
    'Spyro\'s Adventure': {
      icon: '🐲',
      year: '2011',
      platforms: 'Xbox 360, PS3, Wii, 3DS, PC'
    },
    'Giants': {
      icon: '⚡',
      year: '2012',
      platforms: 'Xbox 360, PS3, Wii, Wii U, 3DS'
    },
    'Swap Force': {
      icon: '🔄',
      year: '2013',
      platforms: 'Xbox 360, Xbox One, PS3, PS4, Wii, Wii U, 3DS'
    },
    'Trap Team': {
      icon: '🔮',
      year: '2014',
      platforms: 'Xbox 360, Xbox One, PS3, PS4, Wii, Wii U, 3DS, Tablet'
    },
    'SuperChargers': {
      icon: '🏎️',
      year: '2015',
      platforms: 'Xbox 360, Xbox One, PS3, PS4, Wii, Wii U, 3DS'
    },
    'Imaginators': {
      icon: '✨',
      year: '2016',
      platforms: 'Xbox 360, Xbox One, PS3, PS4, Wii U, Switch'
    }
  };

  return gameData[gameName] || { icon: '🎮', year: 'N/A', platforms: 'Multiple platforms' };
};

export function SkylanderDetail({ skylanderId, onNavigate }: SkylanderDetailProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'attacks' | 'stats' | 'games'>('description');
  const [isFav, setIsFav] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const skylander = skylanders.find(s => s.id === skylanderId);
  
  // Trouver toutes les versions de ce Skylander (même nom de base)
  const allVersions = skylanders.filter(s => 
    s.name === skylander?.name && s.id !== skylander?.id
  );

  useEffect(() => {
    if (skylander) {
      setIsFav(isFavorite(skylander.id, 'character'));
      setIsCollected(isInCollection(skylander.id, 'owned'));
      // Sélectionner la première série par défaut
      if (skylander.series.length > 0) {
        setSelectedSeries(skylander.series[0]);
      }
    }
  }, [skylander]);

  if (!skylander) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 mb-4">Skylander non trouvé</h2>
          <button
            onClick={() => onNavigate('skylanders')}
            className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(skylander.id, 'character');
    setIsFav(!isFav);
  };

  const handleCollectionToggle = () => {
    const newState = toggleCollection(skylander.id, 'owned');
    setIsCollected(newState);
    toast(newState ? 'Ajouté à votre collection ✓' : 'Retiré de votre collection');
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'attacks', label: 'Attaques', icon: Zap },
    { id: 'stats', label: 'Statistiques', icon: Award },
    { id: 'games', label: 'Jeux', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${elementColors[skylander.element]} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => onNavigate('skylanders')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux Skylanders
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              key={selectedSeries}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                <ImageWithFallback
                  src={getSkylanderImage(skylander.id, 'figurine')}
                  alt={`${skylander.name} - ${selectedSeries}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -left-4 top-1/4 "
              >
                <ElementIcon element={skylander.element} size="lg" />
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-4 py-2 ${familyColors[skylander.family]} text-white rounded-full text-sm shadow-lg`}>
                  {skylander.family}
                </span>
                {skylander.variant !== 'Regular' && (
                  <span className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm shadow-lg">
                    ✨ {skylander.variant}
                  </span>
                )}
                {skylander.series.map((series, index) => (
                  <motion.button
                    key={series}
                    onClick={() => setSelectedSeries(series)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      selectedSeries === series
                        ? 'bg-white text-[#0B63D6] shadow-lg'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                  >
                    {series}
                  </motion.button>
                ))}
              </div>

              <h1 className="text-white mb-3 text-4xl md:text-5xl">{skylander.name}</h1>
              
              <p className="text-2xl text-white/90 mb-6 italic">
                "{skylander.catchphrase}"
              </p>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="text-white/80 text-sm">Premier jeu</span>
                  <div className="text-white">{skylander.firstGame}</div>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="text-white/80 text-sm">Année</span>
                  <div className="text-white">{skylander.releasedYear}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFavoriteToggle}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-2xl ${
                    isFav
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <Star className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
                  <span>{isFav ? 'Dans les favoris' : 'Ajouter aux favoris'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCollectionToggle}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-2xl ${
                    isCollected
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <Check className={`w-5 h-5 ${isCollected ? 'stroke-[3]' : ''}`} />
                  <span>{isCollected ? 'Dans ma collection' : 'Ajouter à ma collection'}</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Autres versions du personnage */}
        {allVersions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-border"
          >
            <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">🎭</span>
              Autres versions de {skylander.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allVersions.map((version, index) => (
                <motion.button
                  key={version.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('skylander-detail', version.id)}
                  className="relative group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-border hover:border-[#0B63D6] transition-all cursor-pointer"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-white dark:bg-gray-800 shadow-md">
                    <ImageWithFallback
                      src={getSkylanderImage(version.id)}
                      alt={version.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-center mb-2">
                      <div className={`inline-block px-3 py-1 ${familyColors[version.family]} text-white rounded-full text-xs`}>
                        {version.family}
                      </div>
                    </div>
                    <div className="text-sm text-gray-900 dark:text-foreground truncate text-center">{version.name}</div>
                    <div className="text-xs text-gray-500 dark:text-muted-foreground text-center">
                      {version.series.join(', ')}
                    </div>
                  </div>
                  {version.variant !== 'Regular' && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                      ✨
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0B63D6] text-white shadow-lg shadow-[#0B63D6]/30'
                    : 'bg-white dark:bg-card text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-border'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'description' && (
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
              <h2 className="text-gray-900 dark:text-foreground mb-6">À propos de {skylander.name}</h2>
              <p className="text-lg text-gray-700 dark:text-muted-foreground leading-relaxed mb-8">
                {skylander.description}
              </p>
              
              {skylander.trivia && skylander.trivia.length > 0 && (
                <div className="pt-6 border-t border-gray-200 dark:border-border">
                  <h3 className="text-gray-900 dark:text-foreground mb-4">💡 Le saviez-vous ?</h3>
                  <ul className="space-y-3">
                    {skylander.trivia.map((fact, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-muted-foreground">
                        <span className="w-2 h-2 bg-[#0B63D6] rounded-full mt-2 flex-shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attacks' && (
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
              <h2 className="text-gray-900 dark:text-foreground mb-6">Attaques & Compétences</h2>
              
              {/* Attaques de base */}
              <div className="mb-8">
                <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
                  <span className="text-xl">⚔️</span>
                  Attaques de base
                </h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${elementColors[skylander.element]} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        1
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-gray-900 dark:text-foreground">{skylander.attacks.primary.name}</h3>
                          <span className="text-xs px-2 py-1 bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 rounded-full">
                            Attaque primaire
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{skylander.attacks.primary.description}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${elementColors[skylander.element]} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        2
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-gray-900 dark:text-foreground">{skylander.attacks.secondary.name}</h3>
                          <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full">
                            Attaque secondaire
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{skylander.attacks.secondary.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Améliorations de base */}
              {skylander.attacks.basicUpgrades && skylander.attacks.basicUpgrades.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    Améliorations de base
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
                    Améliorations disponibles chez Persephone/Power Pods
                  </p>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skylander.attacks.basicUpgrades.map((upgrade, index) => (
                      <motion.div
                        key={upgrade.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-sm text-gray-900 dark:text-foreground pr-2">{upgrade.name}</h5>
                          <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full flex-shrink-0 flex items-center gap-1">
                            <span>💰</span>
                            {upgrade.cost}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{upgrade.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chemins d'amélioration */}
              {skylander.attacks.upgradePaths && (
                <div className="mb-8">
                  <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    Chemins d'amélioration
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
                    Choisissez l'un des deux chemins pour personnaliser votre Skylander
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Path 1 */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-lg">
                          🅰️
                        </div>
                        <h4 className="text-gray-900 dark:text-foreground">{skylander.attacks.upgradePaths.path1.name}</h4>
                      </div>
                      <div className="space-y-3">
                        {skylander.attacks.upgradePaths.path1.upgrades.map((upgrade, index) => (
                          <motion.div
                            key={upgrade.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-sm text-gray-900 dark:text-foreground pr-2">{upgrade.name}</h5>
                              <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full flex-shrink-0 flex items-center gap-1">
                                <span>💰</span>
                                {upgrade.cost}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{upgrade.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Path 2 */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white shadow-lg">
                          🅱️
                        </div>
                        <h4 className="text-gray-900 dark:text-foreground">{skylander.attacks.upgradePaths.path2.name}</h4>
                      </div>
                      <div className="space-y-3">
                        {skylander.attacks.upgradePaths.path2.upgrades.map((upgrade, index) => (
                          <motion.div
                            key={upgrade.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-sm text-gray-900 dark:text-foreground pr-2">{upgrade.name}</h5>
                              <span className="text-xs px-2 py-1 bg-yellow-500 text-white rounded-full flex-shrink-0 flex items-center gap-1">
                                <span>💰</span>
                                {upgrade.cost}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{upgrade.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Soul Gem */}
              {skylander.soulGem && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-2 border-amber-200 dark:border-amber-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      💎
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-900 dark:text-foreground">{skylander.soulGem.name}</h3>
                        <span className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-full flex items-center gap-1 flex-shrink-0">
                          <span>💰</span>
                          {skylander.soulGem.cost}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{skylander.soulGem.description}</p>
                      <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 rounded px-2 py-1 inline-block">
                        ✨ Déblocable dans le niveau du Soul Gem
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'stats' && skylander.stats && (
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
              <h2 className="text-gray-900 dark:text-foreground mb-8">Statistiques</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skylander.stats).map(([key, value]) => {
                  const stat = value as { base: number; max: number };
                  const percentage = (stat.base / stat.max) * 100;
                  
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 capitalize">{key}</span>
                        <span className="text-gray-900 dark:text-foreground">
                          {stat.base} / {stat.max}
                        </span>
                      </div>
                      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${elementColors[skylander.element]}`}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-muted-foreground mt-1">
                        {Math.round(percentage)}% de la valeur maximale
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
              <h2 className="text-gray-900 dark:text-foreground mb-6">Compatibilité des jeux</h2>
              
              {/* Premier jeu en vedette */}
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-2 border-blue-300 dark:border-blue-700">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-blue-700 dark:text-blue-400 mb-1">Premier jeu disponible</div>
                    <h3 className="text-gray-900 dark:text-foreground mb-2">Skylanders: {skylander.firstGame}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skylander.name} a fait ses débuts dans ce jeu en {skylander.releasedYear}
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste des jeux compatibles */}
              <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🎮</span>
                Tous les jeux compatibles
              </h3>
              <p className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
                Ce Skylander peut être utilisé dans {skylander.availableIn.length} {skylander.availableIn.length === 1 ? 'jeu' : 'jeux'}
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skylander.availableIn.map((game, index) => {
                  const gameInfo = getGameInfo(game);
                  return (
                    <motion.div
                      key={game}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        game === skylander.firstGame
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-border hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          game === skylander.firstGame ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          <span className={`text-2xl ${game === skylander.firstGame ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                            {gameInfo.icon}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 dark:text-foreground truncate">{game}</div>
                          <div className="text-xs text-gray-500 dark:text-muted-foreground">{gameInfo.year}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {gameInfo.platforms}
                        </div>
                        {game === skylander.firstGame && (
                          <div className="inline-block text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
                            ✨ Première apparition
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Info complémentaire */}
              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-border">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div className="flex-1">
                    <h4 className="text-sm text-gray-900 dark:text-foreground mb-2">Compatibilité rétroactive</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Les figurines Skylanders peuvent être utilisées dans tous les jeux suivants leur première apparition. 
                      {skylander.variant !== 'Regular' && (
                        <span> Les variantes {skylander.variant} peuvent avoir des bonus spéciaux ou des effets visuels uniques dans certains jeux.</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}