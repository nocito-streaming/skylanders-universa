import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Send,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import ReactMarkdown from 'react-markdown';
import { gamesInfo } from '../data/skylanders';

interface GuideEditorProps {
  guideId?: string;
  onNavigate: (page: string, id?: string) => void;
}

interface Chapter {
  id: string;
  title: string;
  order: number;
}

export function GuideEditor({ guideId, onNavigate }: GuideEditorProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(!!guideId);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [gameId, setGameId] = useState('');
  const [type, setType] = useState<'walkthrough' | 'tips' | 'glitch'>('walkthrough');
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [published, setPublished] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    if (guideId) {
      loadGuide();
    } else {
      setLoading(false);
    }
  }, [guideId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!guideId || !title) return;

    const autoSaveInterval = setInterval(() => {
      handleSave(true);
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [guideId, title, gameId, type, difficulty, contentMarkdown, chapters]);

  const loadGuide = async () => {
    try {
      const data = await apiCall(`/guides/${guideId}`);
      const guide = data.guide;

      // Check if user is the author
      if (guide.author_id !== user?.id) {
        toast.error('Vous n\'êtes pas autorisé à modifier ce guide');
        onNavigate('guides');
        return;
      }

      setTitle(guide.title);
      setGameId(guide.game_id);
      setType(guide.type);
      setDifficulty(guide.difficulty);
      setContentMarkdown(guide.content_markdown || '');
      setChapters(guide.chapters || []);
      setPublished(guide.published);
    } catch (error: any) {
      console.error('Failed to load guide:', error);
      toast.error('Erreur lors du chargement du guide');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (silent = false) => {
    if (!title || !gameId) {
      if (!silent) toast.error('Titre et jeu sont requis');
      return;
    }

    setSaving(true);
    try {
      if (guideId) {
        // Update existing guide
        await apiCall(`/guides/${guideId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title,
            game_id: gameId,
            type,
            difficulty,
            content_markdown: contentMarkdown,
            chapters
          })
        });
        if (!silent) toast.success('Guide enregistré');
      } else {
        // Create new guide
        const data = await apiCall('/guides', {
          method: 'POST',
          body: JSON.stringify({
            title,
            game_id: gameId,
            type,
            difficulty,
            content_markdown: contentMarkdown,
            chapters
          })
        });
        if (!silent) toast.success('Guide créé');
        onNavigate('guide-edit', data.guide.id);
      }
    } catch (error: any) {
      console.error('Failed to save guide:', error);
      if (!silent) toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!title || !gameId || !contentMarkdown) {
      toast.error('Veuillez remplir tous les champs avant de publier');
      return;
    }

    setSaving(true);
    try {
      await apiCall(`/guides/${guideId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          published: true
        })
      });
      setPublished(true);
      toast.success('Guide publié avec succès');
      onNavigate('guide-detail', guideId);
    } catch (error: any) {
      console.error('Failed to publish guide:', error);
      toast.error('Erreur lors de la publication');
    } finally {
      setSaving(false);
    }
  };

  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: crypto.randomUUID(),
      title: `Chapitre ${chapters.length + 1}`,
      order: chapters.length + 1
    };
    setChapters([...chapters, newChapter]);
  };

  const handleUpdateChapter = (id: string, newTitle: string) => {
    setChapters(chapters.map(ch => 
      ch.id === id ? { ...ch, title: newTitle } : ch
    ));
  };

  const handleDeleteChapter = (id: string) => {
    const updatedChapters = chapters.filter(ch => ch.id !== id);
    // Reorder
    setChapters(updatedChapters.map((ch, index) => ({
      ...ch,
      order: index + 1
    })));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Vous devez être connecté pour créer un guide</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-border sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('guides')}
              className="flex items-center gap-2 text-gray-600 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>

            <div className="flex items-center gap-2">
              {guideId && !published && (
                <Button onClick={handlePublish} disabled={saving}>
                  <Send className="w-4 h-4 mr-2" />
                  Publier
                </Button>
              )}
              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving} className="bg-white dark:bg-card dark:text-card-foreground dark:border-border hover:bg-gray-100 dark:hover:bg-accent">
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Basic Info */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
            <h3 className="text-gray-900 dark:text-card-foreground mb-6">Informations du guide</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">Titre du guide *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Walkthrough complet de Spyro's Adventure"
                  required
                  className="bg-white dark:bg-muted border-gray-200 dark:border-border"
                />
              </div>

              <div>
                <Label htmlFor="game">Jeu *</Label>
                <select
                  id="game"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
                  required
                >
                  <option value="">Sélectionner un jeu</option>
                  {gamesInfo.map(game => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="type">Type de guide *</Label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
                >
                  <option value="walkthrough">Walkthrough</option>
                  <option value="tips">Astuces</option>
                  <option value="glitch">Glitchs</option>
                </select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulté</Label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
                >
                  <option value="easy">Facile</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Difficile</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chapters (optional) */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-900 dark:text-card-foreground">Chapitres (optionnel)</h3>
              <Button variant="outline" size="sm" onClick={handleAddChapter} className="dark:border-border dark:text-card-foreground dark:hover:bg-accent">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un chapitre
              </Button>
            </div>

            {chapters.length === 0 ? (
              <p className="text-gray-600 dark:text-muted-foreground text-center py-4">
                Aucun chapitre. Les chapitres permettent d'organiser votre guide en sections.
              </p>
            ) : (
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="flex items-center gap-3">
                    <span className="text-gray-600 dark:text-muted-foreground w-8">{chapter.order}.</span>
                    <Input
                      value={chapter.title}
                      onChange={(e) => handleUpdateChapter(chapter.id, e.target.value)}
                      placeholder="Titre du chapitre"
                      className="flex-1 bg-white dark:bg-muted border-gray-200 dark:border-border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteChapter(chapter.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border overflow-hidden transition-colors">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start border-b dark:border-border rounded-none bg-gray-50 dark:bg-muted/20">
                <TabsTrigger value="edit" className="data-[state=active]:bg-white dark:data-[state=active]:bg-card">Édition</TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-white dark:data-[state=active]:bg-card">Aperçu</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="p-6">
                <Label htmlFor="content">Contenu (Markdown) *</Label>
                <Textarea
                  id="content"
                  value={contentMarkdown}
                  onChange={(e) => setContentMarkdown(e.target.value)}
                  placeholder="Écrivez votre guide en Markdown...&#10;&#10;# Titre principal&#10;## Sous-titre&#10;&#10;Votre contenu ici..."
                  className="min-h-[500px] font-mono bg-white dark:bg-muted border-gray-200 dark:border-border"
                />
                <p className="text-sm text-gray-500 dark:text-muted-foreground mt-2">
                  Utilisez Markdown pour formater votre texte. Supporte les titres, listes, liens, etc.
                </p>
              </TabsContent>

              <TabsContent value="preview" className="p-6">
                {contentMarkdown ? (
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <ReactMarkdown>{contentMarkdown}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-muted-foreground italic text-center py-16">
                    Écrivez du contenu pour voir l'aperçu
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}