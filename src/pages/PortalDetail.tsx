import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Info, Users, Gamepad2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface PortalDetailProps {
  portalId: string;
  onNavigate: (page: string, id?: string) => void;
}

// Mock data
const mockPortalData: any = {
  '1': {
    id: '1',
    name: 'Portal of Power',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&h=600&fit=crop',
    game: "Spyro's Adventure",
    compatibility: 'Tous les Skylanders',
    description: "Le tout premier Portal of Power, introduit avec Spyro's Adventure. Ce portail iconique a lancé la franchise et reste compatible avec tous les jeux Skylanders suivants. Il dispose d'un éclairage LED qui change selon le Skylander placé dessus.",
    features: [
      'Éclairage LED réactif',
      'Connection USB',
      'Compatible avec tous les jeux',
      'Support pour 2 figurines simultanées',
    ],
    figureCompatibility: [
      'Core Skylanders',
      'Lightcore',
      'Giants (avec les jeux compatibles)',
      'Swap Force (avec les jeux compatibles)',
      'Trap Masters (avec les jeux compatibles)',
      'SuperChargers (avec les jeux compatibles)',
      'Sensei (avec les jeux compatibles)',
    ],
    gameConsoleCompatibility: [
      { game: "Spyro's Adventure", consoles: ['PS3', 'Xbox 360', 'Wii', 'PC', '3DS'] },
      { game: 'Giants', consoles: ['PS3', 'Xbox 360', 'Wii', 'Wii U', '3DS'] },
      { game: 'Swap Force', consoles: ['PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Wii U', '3DS'] },
    ],
  },
  '2': {
    id: '2',
    name: 'Giants Portal',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop',
    game: 'Giants',
    compatibility: 'Skylanders + Giants',
    description: 'Le portail Giants est une version améliorée du portail original, conçu pour supporter les figurines Giants plus grandes et plus lourdes. Il conserve toutes les fonctionnalités du portail original tout en ajoutant un design plus robuste.',
    features: [
      'Support renforcé pour les Giants',
      'Éclairage LED amélioré',
      'Connection USB',
      'Rétrocompatibilité totale',
    ],
    figureCompatibility: [
      'Tous les Skylanders du jeu original',
      'Giants',
      'Lightcore Giants',
      'Series 2 Skylanders',
    ],
    gameConsoleCompatibility: [
      { game: 'Giants', consoles: ['PS3', 'Xbox 360', 'Wii', 'Wii U', '3DS'] },
      { game: 'Swap Force', consoles: ['PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Wii U'] },
      { game: 'Trap Team', consoles: ['PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Wii U'] },
    ],
  },
  '4': {
    id: '4',
    name: 'Trap Team Portal',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop',
    game: 'Trap Team',
    compatibility: 'Tous + Traptanium',
    description: 'Le Trap Team Portal introduit une fente spéciale Traptanium qui permet de placer des cristaux Trap pour capturer et jouer avec les méchants. Cette fonctionnalité unique le distingue de tous les autres portails.',
    features: [
      'Fente Traptanium pour les Traps',
      'Haut-parleur intégré pour les voix des vilains',
      'Éclairage LED synchronisé',
      'Support pour 2 figurines + 1 Trap',
    ],
    figureCompatibility: [
      'Tous les Skylanders précédents',
      'Trap Masters',
      'Mini Skylanders',
      'Eon\'s Elite',
      'Trap Crystals',
    ],
    gameConsoleCompatibility: [
      { game: 'Trap Team', consoles: ['PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Wii', 'Wii U', 'Tablet'] },
      { game: 'SuperChargers', consoles: ['PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Wii U'] },
    ],
  },
};

type Tab = 'description' | 'figures' | 'games';

export function PortalDetail({ portalId, onNavigate }: PortalDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const portal = mockPortalData[portalId || '1'] || mockPortalData['1'];

  const tabs = [
    { id: 'description' as Tab, label: 'Description', icon: Info },
    { id: 'figures' as Tab, label: 'Compatibilité Figurines', icon: Users },
    { id: 'games' as Tab, label: 'Jeux & Consoles', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate('portals')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Retour aux portails</span>
          </motion.button>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <ImageWithFallback
                  src={portal.image}
                  alt={portal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              >
                <Badge className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 shadow-lg border-0">
                  <Zap className="w-4 h-4 mr-2" />
                  {portal.compatibility}
                </Badge>
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white"
            >
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 mb-4">
                Portal of Power
              </Badge>
              <h1 className="text-white mb-4">{portal.name}</h1>
              <p className="text-xl text-white/90 mb-6">{portal.game}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0B63D6] text-white shadow-lg'
                    : 'bg-white dark:bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800"
        >
          {activeTab === 'description' && (
            <div>
              <h2 className="text-gray-900 dark:text-white mb-4">Description & Fonctionnement</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {portal.description}
              </p>

              <h3 className="text-gray-900 dark:text-white mb-4">Fonctionnalités</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {portal.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'figures' && (
            <div>
              <h2 className="text-gray-900 dark:text-white mb-6">Compatibilité des Figurines</h2>
              <div className="space-y-3">
                {portal.figureCompatibility.map((figureType: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">{figureType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div>
              <h2 className="text-gray-900 dark:text-white mb-6">Compatibilité Jeu & Console</h2>
              <div className="space-y-6">
                {portal.gameConsoleCompatibility.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-900 dark:text-white">{item.game}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.consoles.map((console: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                        >
                          {console}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}