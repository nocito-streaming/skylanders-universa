import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  BookOpen, 
  Lightbulb, 
  Bug,
  ArrowLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Flag,
  User
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { gamesInfo } from '../data/skylanders';

interface GuidesProps {
  onNavigate: (page: string, id?: string) => void;
}

interface Guide {
  id: string;
  game_id: string;
  title: string;
  slug: string;
  author_id: string;
  author_name?: string;
  content_markdown: string;
  type: 'walkthrough' | 'tips' | 'glitch';
  difficulty: 'easy' | 'normal' | 'hard';
  chapters: any[];
  published: boolean;
  votes: number;
  created_at: string;
  updated_at: string;
}

const guideTypeIcons = {
  walkthrough: BookOpen,
  tips: Lightbulb,
  glitch: Bug
};

const guideTypeLabels = {
  walkthrough: 'Walkthrough',
  tips: 'Astuces',
  glitch: 'Glitchs'
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  normal: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

const difficultyLabels = {
  easy: 'Facile',
  normal: 'Normal',
  hard: 'Difficile'
};

export function Guides({ onNavigate }: GuidesProps) {
  const { user, isAdmin } = useAuth();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGame, setFilterGame] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    loadGuides();
  }, [filterType, filterGame, filterDifficulty]);

  const loadGuides = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType !== 'all') params.append('type', filterType);
      if (filterGame !== 'all') params.append('gameId', filterGame);
      if (filterDifficulty !== 'all') params.append('difficulty', filterDifficulty);
      if (searchQuery) params.append('q', searchQuery);
      
      // Only include unpublished guides for admins
      if (!isAdmin) {
        params.append('published', 'true');
      }

      const data = await apiCall(`/guides?${params.toString()}`);
      // Mock votes and author name since backend might not provide it yet
      const enhancedGuides = data.guides.map((g: any) => ({
        ...g,
        votes: g.votes || Math.floor(Math.random() * 50),
        author_name: g.author_name || 'PortalMaster'
      }));
      setGuides(enhancedGuides);
    } catch (error: any) {
      console.error('Failed to load guides:', error);
      toast.error('Erreur lors du chargement des guides');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    loadGuides();
  };

  // Filtrer et trier les guides
  const filteredGuides = guides
    .filter(guide => {
      if (!searchQuery) return true;
      return guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             guide.content_markdown.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => a.title.localeCompare(b.title)); // Tri alphabétique

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-white mb-2">Guides & Astuces</h1>
              <p className="text-white/90">
                Walkthroughs complets, astuces et glitchs de la communauté
              </p>
            </div>

            {user && (
              <Button 
                className="bg-white text-[#0B63D6] hover:bg-white/90"
                onClick={() => onNavigate('guide-create')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer un guide
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-border sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Rechercher un guide..."
                  className="pl-10 bg-gray-50 dark:bg-muted border-gray-200 dark:border-border"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
              >
                <option key="all" value="all">Tous les types</option>
                <option key="walkthrough" value="walkthrough">Walkthroughs</option>
                <option key="tips" value="tips">Astuces</option>
                <option key="glitch" value="glitch">Glitchs</option>
              </select>

              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
              >
                <option key="all" value="all">Tous les jeux</option>
                {gamesInfo.map(game => (
                  <option key={game.id} value={game.id}>{game.title}</option>
                ))}
              </select>

              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
              >
                <option key="all" value="all">Toutes difficultés</option>
                <option key="easy" value="easy">Facile</option>
                <option key="normal" value="normal">Normal</option>
                <option key="hard" value="hard">Difficile</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Guides List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
          </div>
        ) : filteredGuides.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-card-foreground mb-2">Aucun guide trouvé</h3>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              {searchQuery || filterType !== 'all' || filterGame !== 'all' 
                ? 'Essayez de modifier vos filtres' 
                : 'Soyez le premier à créer un guide'}
            </p>
            {user && (
              <Button onClick={() => onNavigate('guide-create')}>
                <Plus className="w-5 h-5 mr-2" />
                Créer un guide
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide, index) => {
              const Icon = guideTypeIcons[guide.type];
              const game = gamesInfo.find(g => g.id === guide.game_id);
              
              return (
                <motion.button
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onNavigate('guide-detail', guide.id)}
                  className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border overflow-hidden hover:shadow-lg transition-all text-left group w-full flex flex-col"
                >
                  {/* Image de fond du jeu */}
                  {game && (
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-sm font-medium">{game.title}</p>
                        <p className="text-white/80 text-xs">{game.year}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 dark:text-card-foreground mb-1 line-clamp-2 group-hover:text-[#0B63D6] transition-colors font-medium">
                          {guide.title}
                        </h3>
                      </div>
                    </div>

                    {/* Author & Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{guide.author_name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[#0B63D6]">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-medium">{guide.votes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="dark:bg-muted dark:text-muted-foreground">
                        {guideTypeLabels[guide.type]}
                      </Badge>
                      <Badge className={difficultyColors[guide.difficulty]}>
                        {difficultyLabels[guide.difficulty]}
                      </Badge>
                      {guide.chapters?.length > 0 && (
                        <Badge variant="outline" className="dark:border-border dark:text-muted-foreground">
                          {guide.chapters.length} chapitre{guide.chapters.length !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-muted-foreground border-t border-gray-100 dark:border-border pt-3">
                      <span>
                        {new Date(guide.created_at).toLocaleDateString('fr-FR')}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0B63D6] transition-colors" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}