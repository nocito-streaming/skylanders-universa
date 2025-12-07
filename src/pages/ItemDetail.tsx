import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Check, Sparkles, Info, BarChart3, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';

interface ItemDetailProps {
  itemId: string;
  onNavigate: (page: string, id?: string) => void;
}

// Mock data
const mockItemData: any = {
  '1': {
    id: '1',
    name: 'Anvil Rain',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop',
    game: "Spyro's Adventure",
    effect: 'Boost Armure',
    type: 'Magical Item',
    description: "L'Anvil Rain est un objet magique puissant qui invoque une pluie d'enclumes sur vos ennemis. Cet objet légendaire augmente également votre armure de manière significative.",
    stats: {
      armor: '+25%',
      damage: '150',
      cooldown: '30s',
      rarity: 'Légendaire',
    },
    locations: [
      { game: "Spyro's Adventure", level: 'Chapitre 5: La Forteresse Volante' },
      { game: "Spyro's Adventure", level: 'Chapitre 12: Le Temple du Temps' },
    ],
  },
};

type Tab = 'description' | 'stats' | 'locations';

export function ItemDetail({ itemId, onNavigate }: ItemDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [inCollection, setInCollection] = useState(false);

  const item = mockItemData[itemId || '1'];

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-gray-900 dark:text-white mb-2">Objet non trouvé</h2>
          <Button onClick={() => onNavigate('/items')}>Retour aux objets</Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'description' as Tab, label: 'Description', icon: Info },
    { id: 'stats' as Tab, label: 'Statistiques', icon: BarChart3 },
    { id: 'locations' as Tab, label: 'Localisation', icon: MapPin },
  ];

  const handleAddToCollection = () => {
    setInCollection(!inCollection);
    toast.success(inCollection ? 'Retiré de votre collection' : 'Ajouté à votre collection');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate('items')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>Retour aux objets</span>
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
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
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
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 shadow-lg border-0">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {item.effect}
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
                {item.type}
              </Badge>
              <h1 className="text-white mb-4">{item.name}</h1>
              <p className="text-xl text-white/90 mb-6">{item.game}</p>
              
              <Button
                size="lg"
                className={`w-full md:w-auto ${
                  inCollection
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-white text-purple-600 hover:bg-gray-100'
                }`}
                onClick={handleAddToCollection}
              >
                {inCollection ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Dans ma collection
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Ajouter à ma collection
                  </>
                )}
              </Button>
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
              <h2 className="text-gray-900 dark:text-white mb-4">Description & Effet</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-gray-900 dark:text-white mb-6">Statistiques</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(item.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 capitalize">
                      {key === 'armor' ? 'Armure' :
                       key === 'damage' ? 'Dégâts' :
                       key === 'cooldown' ? 'Temps de recharge' :
                       key === 'rarity' ? 'Rareté' : key}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div>
              <h2 className="text-gray-900 dark:text-white mb-6">Où trouver cet objet</h2>
              <div className="space-y-4">
                {item.locations.map((location: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#0B63D6] dark:hover:border-[#4A9EFF] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white mb-1">{location.game}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{location.level}</p>
                      </div>
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