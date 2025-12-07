import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Gamepad2, Users, Sparkles, ChevronRight } from 'lucide-react';
import { gamesInfo, skylanders } from '../data/skylanders';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ElementIcon } from '../components/ElementIcon';
import { getSkylanderImage } from '../data/images-config';

interface GameDetailProps {
  gameId: string;
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

const gameThemeColors: Record<string, string> = {
  'spyros-adventure': 'from-purple-600 to-blue-600',
  'giants': 'from-orange-600 to-red-600',
  'swap-force': 'from-blue-600 to-cyan-600',
  'trap-team': 'from-purple-700 to-pink-600',
  'superchargers': 'from-red-600 to-yellow-500',
  'imaginators': 'from-green-600 to-blue-600',
};

export function GameDetail({ gameId, onNavigate }: GameDetailProps) {
  const [activeTab, setActiveTab] = useState<'skylanders' | 'story' | 'features'>('skylanders');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const game = gamesInfo.find(g => g.id === gameId);

  // Filtrer les Skylanders par jeu
  const gameSkylanders = skylanders.filter(s => 
    s.firstGame === game?.title
  );

  // Filtrer par élément et famille
  const filteredSkylanders = gameSkylanders.filter(s => {
    if (selectedElement && s.element !== selectedElement) return false;
    if (selectedFamily && s.family !== selectedFamily) return false;
    return true;
  });

  // Compter les Skylanders par élément
  const skylandersByElement = gameSkylanders.reduce((acc, s) => {
    acc[s.element] = (acc[s.element] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Compter les Skylanders par famille
  const skylandersByFamily = gameSkylanders.reduce((acc, s) => {
    acc[s.family] = (acc[s.family] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameId]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 dark:text-foreground mb-4">Jeu non trouvé</h2>
          <button
            onClick={() => onNavigate('games')}
            className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
          >
            Retour aux jeux
          </button>
        </div>
      </div>
    );
  }

  const storyContent = {
    'spyros-adventure': {
      synopsis: "Kaos, le sorcier maléfique, a banni tous les Skylanders du royaume des Skylands ! Ces héros légendaires ont été transformés en figurines et envoyés sur Terre. Maintenant, avec l'aide du Portal of Power, ils peuvent revenir pour défendre leur monde contre Kaos et ses armées de ténèbres.",
      keyPoints: [
        'Rencontrez le Maître Eon, gardien des Skylands',
        'Explorez les Core of Light et ses fragments dispersés',
        'Affrontez Kaos dans sa forteresse volante',
        'Découvrez les 8 éléments magiques des Skylands'
      ]
    },
    'giants': {
      synopsis: "Kaos est de retour ! Après sa défaite, il a découvert l'existence des Giants - d'anciens Skylanders deux fois plus grands avec des pouvoirs immenses. Seuls les Giants peuvent soulever des objets massifs et accéder à des zones cachées. Les Skylanders doivent s'allier à ces légendes pour arrêter Kaos une fois pour toutes.",
      keyPoints: [
        'Découvrez les légendaires Giants et leur histoire',
        'Explorez de nouvelles îles gigantesques',
        'Utilisez les LightCore pour illuminer les ténèbres',
        'Combattez les Arkeyans, une civilisation robotique ancienne'
      ]
    },
    'swap-force': {
      synopsis: "Une explosion massive au Mont Cloudbreak a donné naissance aux Swap Force - des Skylanders uniques dont le corps magnétique peut être séparé et recombiné ! Kaos et sa mère sont de retour avec un plan diabolique pour détruire le volcan magique. Les Skylanders doivent utiliser leurs nouvelles capacités de swap pour sauver les Skylands.",
      keyPoints: [
        'Découvrez 16 Swap Force avec 256 combinaisons possibles',
        'Explorez les zones Swap spéciales nécessitant des capacités uniques',
        'Affrontez Kaos et sa mère dans leurs plans démoniaques',
        'Maîtrisez les 8 types de mouvements Swap'
      ]
    },
    'trap-team': {
      synopsis: "Kaos a fait exploser la prison de Cloudcracker, libérant les pires vilains des Skylands ! Les Trap Masters, armés de cristaux de Traptanium, sont les seuls à pouvoir capturer ces criminels. Utilisez les Traps pour emprisonner les vilains, puis jouez avec eux pour combattre leurs anciens alliés !",
      keyPoints: [
        'Capturez plus de 40 vilains dans des Traps élémentaires',
        'Jouez avec les vilains capturés et utilisez leurs pouvoirs',
        'Débloquez les Traptanium Gates avec les Trap Masters',
        'Affrontez le Golden Queen et les Doom Raiders'
      ]
    },
    'superchargers': {
      synopsis: "Kaos a créé son propre royaume maléfique - le Kaos-Dome ! Pour l'arrêter, les Skylanders ont besoin de vitesse. Les SuperChargers et leurs véhicules ultra-rapides peuvent voyager sur terre, mer et dans les cieux. Course, combat et exploration s'entremêlent dans cette aventure haute en couleurs !",
      keyPoints: [
        'Conduisez 20 véhicules SuperCharged sur terre, mer et ciel',
        'Participez à des courses épiques et des combats véhiculaires',
        'Débloquez des bonus quand SuperCharger et véhicule sont assortis',
        'Explorez le Skylands avec une liberté de mouvement inédite'
      ]
    },
    'imaginators': {
      synopsis: "L'esprit de création Mind Magic a été libéré ! Avec les Cristaux Imaginators, vous pouvez créer votre propre Skylander unique avec des millions de combinaisons. Les Senseis, maîtres d'arts martiaux, vous guideront dans cette aventure où l'imagination devient réalité. Mais Kaos a aussi découvert ce pouvoir...",
      keyPoints: [
        'Créez votre Skylander personnalisé avec des millions d\'options',
        'Entraînez votre Imaginator avec les Senseis experts',
        'Débloquez des pièces secrètes et des niveaux cachés',
        'Affrontez Kaos et ses Doomlanders dans la bataille finale'
      ]
    }
  };

  const currentStory = storyContent[gameId as keyof typeof storyContent];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${gameThemeColors[gameId] || 'from-purple-600 to-blue-600'} text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => onNavigate('games')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour aux jeux
          </button>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                <ImageWithFallback
                  src={`https://via.placeholder.com/600x800/667eea/ffffff?text=${encodeURIComponent(game.title)}`}
                  alt={game.title}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Gamepad2 className="w-5 h-5" />
                <span className="text-sm">Jeu Skylanders</span>
              </div>

              <h1 className="text-white mb-3 text-4xl md:text-5xl">
                Skylanders: {game.title}
              </h1>

              <p className="text-xl text-white/90 mb-6">
                {game.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    Année de sortie
                  </div>
                  <div className="text-white text-xl">{game.releaseYear}</div>
                </div>

                <div className="px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                    <Users className="w-4 h-4" />
                    Skylanders
                  </div>
                  <div className="text-white text-xl">{gameSkylanders.length}</div>
                </div>
              </div>

              {/* Nouvelle fonctionnalité */}
              <div className="p-4 bg-yellow-500/20 backdrop-blur-sm border-2 border-yellow-400/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-yellow-200 text-sm mb-1">Nouvelle fonctionnalité</div>
                    <div className="text-white">{game.newFeature}</div>
                  </div>
                </div>
              </div>

              {/* Plateformes */}
              <div className="mt-6">
                <div className="text-white/80 text-sm mb-2">Disponible sur :</div>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map(platform => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('skylanders')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'skylanders'
                ? 'bg-[#0B63D6] text-white shadow-lg'
                : 'bg-white dark:bg-card text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-border'
            }`}
          >
            <Users className="w-5 h-5" />
            Skylanders ({gameSkylanders.length})
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'story'
                ? 'bg-[#0B63D6] text-white shadow-lg'
                : 'bg-white dark:bg-card text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-border'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            Histoire
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'features'
                ? 'bg-[#0B63D6] text-white shadow-lg'
                : 'bg-white dark:bg-card text-gray-700 dark:text-foreground hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-border'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            Caractéristiques
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'skylanders' && (
            <div>
              {/* Filtres */}
              <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-border mb-8">
                <h3 className="text-gray-900 dark:text-foreground mb-4">Filtres</h3>
                
                {/* Filtre par élément */}
                <div className="mb-6">
                  <div className="text-sm text-gray-600 dark:text-muted-foreground mb-3">Par élément</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedElement(null)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedElement === null
                          ? 'bg-[#0B63D6] text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      Tous ({gameSkylanders.length})
                    </button>
                    {Object.entries(skylandersByElement).map(([element, count]) => (
                      <button
                        key={element}
                        onClick={() => setSelectedElement(element)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          selectedElement === element
                            ? 'bg-[#0B63D6] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ElementIcon element={element} size="sm" />
                        {element} ({count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre par famille */}
                <div>
                  <div className="text-sm text-gray-600 dark:text-muted-foreground mb-3">Par famille</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedFamily(null)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedFamily === null
                          ? 'bg-[#0B63D6] text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      Tous
                    </button>
                    {Object.entries(skylandersByFamily).map(([family, count]) => (
                      <button
                        key={family}
                        onClick={() => setSelectedFamily(family)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          selectedFamily === family
                            ? 'bg-[#0B63D6] text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {family} ({count})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grille de Skylanders */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredSkylanders.map((skylander, index) => (
                  <motion.button
                    key={skylander.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('skylander-detail', skylander.id)}
                    className="bg-white dark:bg-card rounded-xl p-4 shadow-lg border-2 border-gray-100 dark:border-border hover:border-[#0B63D6] transition-all cursor-pointer group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-gray-50 dark:bg-gray-800">
                      <ImageWithFallback
                        src={getSkylanderImage(skylander.id)}
                        alt={skylander.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="mb-2">
                      <ElementIcon element={skylander.element} size="sm" />
                    </div>
                    <div className="text-sm text-gray-900 dark:text-foreground mb-1 truncate">
                      {skylander.name}
                    </div>
                    <div className={`inline-block px-2 py-1 ${familyColors[skylander.family]} text-white rounded text-xs`}>
                      {skylander.family}
                    </div>
                    {skylander.variant !== 'Regular' && (
                      <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                        ✨ {skylander.variant}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {filteredSkylanders.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-card rounded-2xl border border-gray-100 dark:border-border">
                  <div className="text-4xl mb-4">🔍</div>
                  <div className="text-gray-900 dark:text-foreground mb-2">Aucun Skylander trouvé</div>
                  <div className="text-gray-600 dark:text-muted-foreground">
                    Essayez de modifier vos filtres
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'story' && currentStory && (
            <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
              <h2 className="text-gray-900 dark:text-foreground mb-6">Synopsis</h2>
              <p className="text-lg text-gray-700 dark:text-muted-foreground leading-relaxed mb-8">
                {currentStory.synopsis}
              </p>

              <h3 className="text-gray-900 dark:text-foreground mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-[#0B63D6]" />
                Points clés de l'aventure
              </h3>
              <div className="space-y-4">
                {currentStory.keyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0B63D6] text-white flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 pt-1">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl"
                >
                  <div className="text-4xl mb-2">{gameSkylanders.length}</div>
                  <div className="text-white/90">Nouveaux Skylanders</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl"
                >
                  <div className="text-4xl mb-2">{Object.keys(skylandersByElement).length}</div>
                  <div className="text-white/90">Éléments représentés</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl"
                >
                  <div className="text-4xl mb-2">{game.platforms.length}</div>
                  <div className="text-white/90">Plateformes supportées</div>
                </motion.div>
              </div>

              {/* Distribution par élément */}
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
                <h3 className="text-gray-900 dark:text-foreground mb-6">Distribution par élément</h3>
                <div className="space-y-4">
                  {Object.entries(skylandersByElement)
                    .sort((a, b) => b[1] - a[1])
                    .map(([element, count]) => {
                      const percentage = (count / gameSkylanders.length) * 100;
                      return (
                        <div key={element}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <ElementIcon element={element} size="sm" />
                              <span className="text-gray-700 dark:text-gray-300">{element}</span>
                            </div>
                            <span className="text-gray-900 dark:text-foreground">
                              {count} ({Math.round(percentage)}%)
                            </span>
                          </div>
                          <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className={`h-full bg-gradient-to-r ${elementColors[element]}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Distribution par famille */}
              <div className="bg-white dark:bg-card rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-border">
                <h3 className="text-gray-900 dark:text-foreground mb-6">Distribution par famille</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(skylandersByFamily)
                    .sort((a, b) => b[1] - a[1])
                    .map(([family, count]) => (
                      <motion.div
                        key={family}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border-2 border-gray-200 dark:border-border"
                      >
                        <div className={`inline-block px-3 py-1 ${familyColors[family]} text-white rounded-lg mb-2`}>
                          {family}
                        </div>
                        <div className="text-2xl text-gray-900 dark:text-foreground">{count}</div>
                        <div className="text-sm text-gray-600 dark:text-muted-foreground">
                          {Math.round((count / gameSkylanders.length) * 100)}% du total
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
