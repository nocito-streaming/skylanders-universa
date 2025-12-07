import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Plus, 
  Bug, 
  Lightbulb, 
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Flag,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { games } from '../data/skylanders';

interface GlitchesHubProps {
  onNavigate: (page: string, id?: string) => void;
}

interface Glitch {
  id: string;
  title: string;
  description: string;
  steps: string[];
  type: 'glitch' | 'tip' | 'exploit';
  game_id: string;
  character_id: string | null;
  platform: string;
  video_url: string | null;
  author_id: string;
  votes: number;
  confirmed: boolean;
  created_at: string;
  updated_at: string;
}

const glitchTypeIcons = {
  glitch: Bug,
  tip: Lightbulb,
  exploit: TrendingUp
};

const glitchTypeLabels = {
  glitch: 'Glitch',
  tip: 'Astuce',
  exploit: 'Exploit'
};

export function GlitchesHub({ onNavigate }: GlitchesHubProps) {
  const { user } = useAuth();
  const [glitches, setGlitches] = useState<Glitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGame, setFilterGame] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSteps, setFormSteps] = useState('');
  const [formType, setFormType] = useState<'glitch' | 'tip' | 'exploit'>('glitch');
  const [formGameId, setFormGameId] = useState('');
  const [formPlatform, setFormPlatform] = useState('all');
  const [formVideoUrl, setFormVideoUrl] = useState('');

  useEffect(() => {
    loadGlitches();
  }, [filterType, filterGame]);

  const loadGlitches = async () => {
    try {
      const params = new URLSearchParams();
      if (filterType !== 'all') params.append('type', filterType);
      if (filterGame !== 'all') params.append('gameId', filterGame);

      const data = await apiCall(`/glitches?${params.toString()}`);
      // Sort by votes
      const sorted = data.glitches.sort((a: Glitch, b: Glitch) => b.votes - a.votes);
      setGlitches(sorted);
    } catch (error: any) {
      console.error('Failed to load glitches:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGlitch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Vous devez être connecté');
      return;
    }

    if (!formTitle || !formDescription || !formGameId) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    setCreating(true);
    try {
      const steps = formSteps
        .split('\n')
        .filter(step => step.trim())
        .map(step => step.trim());

      const data = await apiCall('/glitches', {
        method: 'POST',
        body: JSON.stringify({
          title: formTitle,
          description: formDescription,
          steps,
          type: formType,
          game_id: formGameId,
          platform: formPlatform,
          video_url: formVideoUrl || null
        })
      });

      setGlitches([data.glitch, ...glitches]);
      setDialogOpen(false);
      resetForm();
      toast.success('Publié avec succès');
    } catch (error: any) {
      console.error('Failed to create glitch:', error);
      toast.error('Erreur lors de la publication');
    } finally {
      setCreating(false);
    }
  };

  const handleVote = async (glitchId: string, vote: number) => {
    if (!user) {
      toast.error('Vous devez être connecté pour voter');
      return;
    }

    try {
      const data = await apiCall(`/glitches/${glitchId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ vote })
      });

      setGlitches(glitches.map(g => 
        g.id === glitchId ? data.glitch : g
      ));
    } catch (error: any) {
      console.error('Failed to vote:', error);
      toast.error('Erreur lors du vote');
    }
  };

  const handleReport = async (glitchId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour signaler');
      return;
    }

    const reason = prompt('Pourquoi signalez-vous ce contenu ?');
    if (!reason) return;

    try {
      await apiCall(`/glitches/${glitchId}/report`, {
        method: 'POST',
        body: JSON.stringify({ reason })
      });
      toast.success('Contenu signalé');
    } catch (error: any) {
      console.error('Failed to report:', error);
      toast.error('Erreur lors du signalement');
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormSteps('');
    setFormType('glitch');
    setFormGameId('');
    setFormPlatform('all');
    setFormVideoUrl('');
  };

  const filteredGlitches = glitches.filter(glitch =>
    !searchQuery || 
    glitch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    glitch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-white mb-2">Glitchs & Astuces</h1>
              <p className="text-white/90">
                Partagez et découvrez les secrets de l'univers Skylanders
              </p>
            </div>

            {user && (
              <Button 
                className="bg-white text-[#0B63D6] hover:bg-white/90"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Partager
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6]"
              >
                <option value="all">Tous les types</option>
                <option value="glitch">Glitchs</option>
                <option value="tip">Astuces</option>
                <option value="exploit">Exploits</option>
              </select>

              <select
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6]"
              >
                <option value="all">Tous les jeux</option>
                {games.map(game => (
                  <option key={game.id} value={game.id}>{game.title}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
          </div>
        ) : filteredGlitches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Bug className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Aucun résultat</h3>
            <p className="text-gray-600 mb-6">
              Soyez le premier à partager une astuce
            </p>
            {user && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Partager une astuce
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredGlitches.map((glitch, index) => {
              const Icon = glitchTypeIcons[glitch.type];
              const game = games.find(g => g.id === glitch.game_id);
              
              return (
                <motion.div
                  key={glitch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex gap-4">
                    {/* Votes */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleVote(glitch.id, 1)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={!user}
                      >
                        <ThumbsUp className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-gray-900 font-medium">
                        {glitch.votes}
                      </span>
                      <button
                        onClick={() => handleVote(glitch.id, -1)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={!user}
                      >
                        <ThumbsDown className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-gray-900 mb-1">{glitch.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {glitchTypeLabels[glitch.type]}
                            </Badge>
                            {game && (
                              <Badge variant="outline">{game.title}</Badge>
                            )}
                            {glitch.platform !== 'all' && (
                              <Badge variant="outline">{glitch.platform}</Badge>
                            )}
                            {glitch.confirmed && (
                              <Badge className="bg-green-100 text-green-800">
                                Confirmé
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{glitch.description}</p>

                      {glitch.steps && glitch.steps.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-900 mb-2">Étapes :</p>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                            {glitch.steps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {glitch.video_url && (
                        <a
                          href={glitch.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#0B63D6] hover:underline"
                        >
                          Voir la vidéo →
                        </a>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-600">
                          {new Date(glitch.created_at).toLocaleDateString('fr-FR')}
                        </span>
                        <button
                          onClick={() => handleReport(glitch.id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Flag className="w-4 h-4" />
                          Signaler
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Partager un glitch ou une astuce</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateGlitch} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Ex: Dupliquer les objets dans Swap Force"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Décrivez le glitch ou l'astuce..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="steps">Étapes (une par ligne)</Label>
              <Textarea
                id="steps"
                value={formSteps}
                onChange={(e) => setFormSteps(e.target.value)}
                placeholder="1. Allez au niveau X&#10;2. Faites Y&#10;3. Appuyez sur Z"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type *</Label>
                <select
                  id="type"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6]"
                >
                  <option value="glitch">Glitch</option>
                  <option value="tip">Astuce</option>
                  <option value="exploit">Exploit</option>
                </select>
              </div>

              <div>
                <Label htmlFor="game">Jeu *</Label>
                <select
                  id="game"
                  value={formGameId}
                  onChange={(e) => setFormGameId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6]"
                  required
                >
                  <option value="">Sélectionner</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="platform">Plateforme</Label>
              <select
                id="platform"
                value={formPlatform}
                onChange={(e) => setFormPlatform(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6]"
              >
                <option value="all">Toutes plateformes</option>
                <option value="ps3">PlayStation 3</option>
                <option value="ps4">PlayStation 4</option>
                <option value="xbox360">Xbox 360</option>
                <option value="xboxone">Xbox One</option>
                <option value="wii">Wii</option>
                <option value="wiiu">Wii U</option>
                <option value="switch">Switch</option>
                <option value="pc">PC</option>
              </select>
            </div>

            <div>
              <Label htmlFor="videoUrl">URL vidéo (optionnel)</Label>
              <Input
                id="videoUrl"
                type="url"
                value={formVideoUrl}
                onChange={(e) => setFormVideoUrl(e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button type="submit" disabled={creating} className="flex-1">
                {creating ? 'Publication...' : 'Publier'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
