import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Heart, 
  Star, 
  Sparkles, 
  ArrowLeft, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff,
  Package,
  LayoutGrid,
  List
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface CollectionsProps {
  onNavigate: (page: string, id?: string) => void;
}

interface Collection {
  id: string;
  user_id: string;
  title: string;
  type: 'wishlist' | 'owned' | 'custom';
  visibility: 'private' | 'public';
  items: any[];
  metadata: any;
  created_at: string;
  updated_at: string;
}

const collectionTypeIcons = {
  wishlist: Heart,
  owned: Package,
  custom: Sparkles
};

const collectionTypeLabels = {
  wishlist: 'Liste d\'envies',
  owned: 'Collection possédée',
  custom: 'Collection personnalisée'
};

export function Collections({ onNavigate }: CollectionsProps) {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newCollectionTitle, setNewCollectionTitle] = useState('');
  const [newCollectionType, setNewCollectionType] = useState<'wishlist' | 'owned' | 'custom'>('wishlist');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (user) {
      loadCollections();
    }
  }, [user]);

  const loadCollections = async () => {
    try {
      const data = await apiCall('/collections');
      setCollections(data.collections);
    } catch (error: any) {
      console.error('Failed to load collections:', error);
      toast.error('Erreur lors du chargement des collections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCollectionTitle.trim()) {
      toast.error('Veuillez entrer un titre');
      return;
    }

    setCreating(true);
    try {
      const data = await apiCall('/collections', {
        method: 'POST',
        body: JSON.stringify({
          title: newCollectionTitle,
          type: newCollectionType,
          visibility: 'private'
        })
      });
      
      setCollections([...collections, data.collection]);
      setNewCollectionTitle('');
      setNewCollectionType('wishlist');
      setDialogOpen(false);
      toast.success('Collection créée avec succès');
    } catch (error: any) {
      console.error('Failed to create collection:', error);
      toast.error('Erreur lors de la création de la collection');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette collection ?')) {
      return;
    }

    try {
      await apiCall(`/collections/${collectionId}`, {
        method: 'DELETE'
      });
      
      setCollections(collections.filter(c => c.id !== collectionId));
      toast.success('Collection supprimée');
    } catch (error: any) {
      console.error('Failed to delete collection:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleVisibility = async (collection: Collection) => {
    try {
      const newVisibility = collection.visibility === 'private' ? 'public' : 'private';
      
      const data = await apiCall(`/collections/${collection.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          visibility: newVisibility
        })
      });
      
      setCollections(collections.map(c => 
        c.id === collection.id ? data.collection : c
      ));
      
      toast.success(
        newVisibility === 'public' 
          ? 'Collection maintenant publique' 
          : 'Collection maintenant privée'
      );
    } catch (error: any) {
      console.error('Failed to update visibility:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

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

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-white mb-2">Mes Collections</h1>
              <p className="text-white/90">
                Gérez vos listes d'envies et collections de Skylanders
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-[#0B63D6] hover:bg-white/90">
                  <Plus className="w-5 h-5 mr-2" />
                  Nouvelle collection
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-card dark:border-border">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-card-foreground">Créer une nouvelle collection</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateCollection} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Titre de la collection</Label>
                    <Input
                      id="title"
                      value={newCollectionTitle}
                      onChange={(e) => setNewCollectionTitle(e.target.value)}
                      placeholder="Ma liste d'envies Swap Force"
                      required
                      className="bg-white dark:bg-muted border-gray-200 dark:border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type de collection</Label>
                    <select
                      id="type"
                      value={newCollectionType}
                      onChange={(e) => setNewCollectionType(e.target.value as any)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] bg-white dark:bg-muted text-gray-900 dark:text-card-foreground"
                    >
                      <option value="wishlist">Liste d'envies</option>
                      <option value="owned">Collection possédée</option>
                      <option value="custom">Collection personnalisée</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button type="submit" disabled={creating} className="flex-1">
                      {creating ? 'Création...' : 'Créer'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end border-b border-gray-200 dark:border-border">
        <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg p-1 flex gap-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Collections Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {collections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-card-foreground mb-2">Aucune collection</h3>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              Créez votre première collection pour organiser vos Skylanders
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Créer une collection
            </Button>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {collections.map((collection, index) => {
              const Icon = collectionTypeIcons[collection.type];
              
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 hover:shadow-lg transition-all ${
                    viewMode === 'list' ? 'flex items-center justify-between gap-4' : ''
                  }`}
                >
                  {/* Header/Info */}
                  <div className={viewMode === 'list' ? 'flex items-center gap-6 flex-1' : ''}>
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-card-foreground font-medium line-clamp-1">{collection.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          {collectionTypeLabels[collection.type]}
                        </p>
                      </div>
                    </div>

                    {/* Stats - only show as separate block in grid or if space allows */}
                    <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                      <Star className="w-4 h-4" />
                      <span>{collection.items.length} élément{collection.items.length !== 1 ? 's' : ''}</span>
                    </div>

                    {/* Badges */}
                    <div className={`flex flex-wrap gap-2 ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                      <Badge variant={collection.visibility === 'public' ? 'default' : 'secondary'}>
                        {collection.visibility === 'public' ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Privé
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-2 ${viewMode === 'grid' ? 'w-full' : 'shrink-0'}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className={viewMode === 'grid' ? 'flex-1' : ''}
                      onClick={() => onNavigate('collection-detail', collection.id)}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Gérer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleVisibility(collection)}
                    >
                      {collection.visibility === 'public' ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCollection(collection.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
