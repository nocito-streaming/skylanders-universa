import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Trash2, 
  Eye,
  AlertTriangle,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { gamesInfo } from '../data/skylanders';

interface AdminProps {
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
  published: boolean;
  votes: number;
  created_at: string;
  updated_at: string;
}

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

export function Admin({ onNavigate }: AdminProps) {
  const { user, isAdmin } = useAuth();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Accès non autorisé');
      onNavigate('home');
      return;
    }
    loadGuides();
  }, [isAdmin]);

  const loadGuides = async () => {
    try {
      // Load all guides (published and unpublished) for admin
      const data = await apiCall('/guides?includeUnpublished=true');
      const enhancedGuides = data.guides.map((g: any) => ({
        ...g,
        author_name: g.author_name || 'Utilisateur inconnu'
      }));
      setGuides(enhancedGuides);
    } catch (error: any) {
      console.error('Failed to load guides:', error);
      toast.error('Erreur lors du chargement des guides');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (guideId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce guide ? Cette action est irréversible.')) {
      return;
    }

    setDeleting(guideId);
    try {
      await apiCall(`/guides/${guideId}`, {
        method: 'DELETE'
      });
      toast.success('Guide supprimé');
      setGuides(guides.filter(g => g.id !== guideId));
    } catch (error: any) {
      console.error('Failed to delete guide:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10" />
            <div>
              <h1 className="text-white mb-1">Administration</h1>
              <p className="text-white/90">Gestion des guides de la communauté</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6">
              <p className="text-gray-600 dark:text-muted-foreground mb-1">Total des guides</p>
              <p className="text-3xl text-gray-900 dark:text-card-foreground">{guides.length}</p>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6">
              <p className="text-gray-600 dark:text-muted-foreground mb-1">Guides publiés</p>
              <p className="text-3xl text-green-600 dark:text-green-400">
                {guides.filter(g => g.published).length}
              </p>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6">
              <p className="text-gray-600 dark:text-muted-foreground mb-1">Brouillons</p>
              <p className="text-3xl text-orange-600 dark:text-orange-400">
                {guides.filter(g => !g.published).length}
              </p>
            </div>
          </div>

          {/* Guides List */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-border">
              <h2 className="text-gray-900 dark:text-card-foreground">Tous les guides</h2>
            </div>

            {guides.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-muted-foreground">Aucun guide trouvé</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-border">
                {guides.map((guide) => {
                  const game = gamesInfo.find(g => g.id === guide.game_id);
                  
                  return (
                    <div key={guide.id} className="p-6 hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-gray-900 dark:text-card-foreground truncate">
                              {guide.title}
                            </h3>
                            {!guide.published && (
                              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700">
                                Brouillon
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-muted-foreground mb-3">
                            <span>{game?.title || 'Jeu inconnu'}</span>
                            <span>•</span>
                            <span>{guideTypeLabels[guide.type]}</span>
                            <span>•</span>
                            <Badge variant="outline" className={difficultyColors[guide.difficulty]}>
                              {difficultyLabels[guide.difficulty]}
                            </Badge>
                            <span>•</span>
                            <span>Par {guide.author_name}</span>
                          </div>

                          <p className="text-sm text-gray-500 dark:text-muted-foreground">
                            Créé le {new Date(guide.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {guide.published && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onNavigate('guide-detail', guide.id)}
                              className="dark:border-border dark:text-card-foreground dark:hover:bg-accent"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Voir
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(guide.id)}
                            disabled={deleting === guide.id}
                            className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            {deleting === guide.id ? 'Suppression...' : 'Supprimer'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
