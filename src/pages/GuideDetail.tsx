import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Edit2, 
  Flag, 
  BookOpen, 
  Clock,
  User as UserIcon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import ReactMarkdown from 'react-markdown';
import { games } from '../data/skylanders';

interface GuideDetailProps {
  guideId: string;
  onNavigate: (page: string, id?: string) => void;
}

interface Guide {
  id: string;
  game_id: string;
  title: string;
  slug: string;
  author_id: string;
  content_markdown: string;
  type: 'walkthrough' | 'tips' | 'glitch';
  difficulty: 'easy' | 'normal' | 'hard';
  chapters: Chapter[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  normal: 'bg-blue-100 text-blue-800',
  hard: 'bg-red-100 text-red-800'
};

const difficultyLabels = {
  easy: 'Facile',
  normal: 'Normal',
  hard: 'Difficile'
};

const guideTypeLabels = {
  walkthrough: 'Walkthrough',
  tips: 'Astuces',
  glitch: 'Glitchs'
};

export function GuideDetail({ guideId, onNavigate }: GuideDetailProps) {
  const { user } = useAuth();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    loadGuide();
  }, [guideId]);

  const loadGuide = async () => {
    try {
      const data = await apiCall(`/guides/${guideId}`);
      setGuide(data.guide);
      if (data.guide.chapters?.length > 0) {
        setActiveChapter(data.guide.chapters[0].id);
      }
    } catch (error: any) {
      console.error('Failed to load guide:', error);
      toast.error('Erreur lors du chargement du guide');
    } finally {
      setLoading(false);
    }
  };

  const handleReport = async () => {
    if (!user) {
      toast.error('Vous devez être connecté pour signaler un guide');
      return;
    }

    const reason = prompt('Pourquoi signalez-vous ce guide ?');
    if (!reason) return;

    try {
      await apiCall(`/guides/${guideId}/report`, {
        method: 'POST',
        body: JSON.stringify({ reason })
      });
      toast.success('Guide signalé avec succès');
    } catch (error: any) {
      console.error('Failed to report guide:', error);
      toast.error('Erreur lors du signalement');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Guide introuvable</p>
      </div>
    );
  }

  const game = games.find(g => g.id === guide.game_id);
  const isAuthor = user?.id === guide.author_id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => onNavigate('guides')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux guides</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  {guideTypeLabels[guide.type]}
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  {difficultyLabels[guide.difficulty]}
                </Badge>
                {game && (
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    {game.title}
                  </Badge>
                )}
              </div>
              <h1 className="text-white mb-2">{guide.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(guide.created_at).toLocaleDateString('fr-FR')}
                </span>
                {guide.chapters?.length > 0 && (
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {guide.chapters.length} chapitre{guide.chapters.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {isAuthor && (
                <Button 
                  className="bg-white text-[#0B63D6] hover:bg-white/90"
                  onClick={() => onNavigate('guide-edit', guide.id)}
                >
                  <Edit2 className="w-5 h-5 mr-2" />
                  Modifier
                </Button>
              )}
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={handleReport}
              >
                <Flag className="w-5 h-5 mr-2" />
                Signaler
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents (if chapters exist) */}
          {guide.chapters && guide.chapters.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h3 className="text-gray-900 mb-4">Table des matières</h3>
                <nav className="space-y-2">
                  {guide.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapter(chapter.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        activeChapter === chapter.id
                          ? 'bg-[#0B63D6] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {chapter.order}. {chapter.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Guide Content */}
          <div className={guide.chapters?.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              {guide.content_markdown ? (
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown>{guide.content_markdown}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  Ce guide n'a pas encore de contenu.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
