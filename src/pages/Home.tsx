import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { SkylanderCard } from '../components/SkylanderCard';
import { skylanders } from '../data/skylanders';
import { Sparkles, Zap, Shield, TrendingUp, Bug, Lightbulb } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { useState, useEffect } from 'react';

interface HomeProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load initial favorites
    const loadFavorites = () => {
      const favs = new Set<string>();
      skylanders.forEach(char => {
        if (isFavorite(char.id, 'character')) {
          favs.add(char.id);
        }
      });
      setFavorites(favs);
    };
    loadFavorites();
  }, []);

  const handleFavoriteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id, 'character');
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredSkylanders = skylanders
    .filter(s => s.variant === 'Regular' && (s.family === 'Giant' || s.family === 'Trap Master' || s.family === 'SuperCharger'))
    .slice(0, 3);
  const popularSkylanders = skylanders
    .filter(s => s.variant === 'Regular')
    .slice(0, 6);

  const stats = [
    { icon: Sparkles, label: 'Personnages', value: '100+', color: 'text-[#0B63D6]' },
    { icon: Zap, label: 'Éléments', value: '8', color: 'text-[#FF7A00]' },
    { icon: Shield, label: 'Jeux', value: '12+', color: 'text-[#8A2BE2]' },
    { icon: TrendingUp, label: 'Guides', value: '50+', color: 'text-[#28C76F]' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Hero onCTAClick={() => onNavigate('skylanders')} />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-card rounded-xl p-6 shadow-lg border border-gray-100 dark:border-border hover:shadow-xl transition-all"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <div className="text-3xl text-gray-900 dark:text-card-foreground mb-1 font-bold">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured Characters */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 dark:text-foreground mb-2">Personnages Légendaires</h2>
              <p className="text-gray-600 dark:text-muted-foreground">Découvre les héros les plus puissants</p>
            </div>
            <button
              onClick={() => onNavigate('skylanders')}
              className="px-6 py-3 bg-[#0B63D6] text-white rounded-lg hover:bg-[#0B63D6]/90 transition-colors"
            >
              Voir tous
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkylanders.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <SkylanderCard
                  skylander={character}
                  onCardClick={(id) => onNavigate('skylander-detail', id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.has(character.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Popular Characters */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 dark:text-foreground mb-2">Personnages Populaires</h2>
              <p className="text-gray-600 dark:text-muted-foreground">Les favoris de la communauté</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularSkylanders.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <SkylanderCard
                  skylander={character}
                  onCardClick={(id) => onNavigate('skylander-detail', id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.has(character.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 p-8 md:p-12 bg-gradient-to-r from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] rounded-2xl text-white text-center"
        >
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-white mb-4">Prêt à explorer l'univers ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoins des milliers de fans et découvre tous les secrets des Skylanders
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('skylanders')}
              className="px-8 py-4 bg-white text-[#0B63D6] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Explorer les personnages
            </button>
            <button
              onClick={() => onNavigate('guides')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Voir les guides
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}