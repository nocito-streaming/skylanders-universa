import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Trash2, Search, X, Edit2, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { CollectionItem } from '../components/CollectionItem';
import { apiCall } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { skylanders } from '../data/skylanders';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface CollectionDetailProps {
  collectionId: string;
  onNavigate: (page: string, id?: string) => void;
}

interface Collection {
  id: string;
  user_id: string;
  title: string;
  type: string;
  visibility: 'public' | 'private';
  items: CollectionItem[];
  metadata: any;
  created_at: string;
  updated_at: string;
}

interface CollectionItem {
  id: string;
  item_type: 'character' | 'game' | 'item';
  item_id: string;
  note: string | null;
  added_at: string;
}

export function CollectionDetail({ collectionId, onNavigate }: CollectionDetailProps) {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedVisibility, setEditedVisibility] = useState<'public' | 'private'>('private');
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCollection();
  }, [collectionId]);

  const loadCollection = async () => {
    try {
      const data = await apiCall('/collections');
      const found = data.collections.find((c: Collection) => c.id === collectionId);
      
      if (found) {
        setCollection(found);
        setEditedTitle(found.title);
        setEditedVisibility(found.visibility as 'public' | 'private');
      } else {
        toast.error('Collection introuvable');
        onNavigate('collections');
      }
    } catch (error: any) {
      console.error('Failed to load collection:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCollection = async () => {
    if (!collection) return;
    setSaving(true);
    try {
      const data = await apiCall(`/collections/${collection.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: editedTitle,
          visibility: editedVisibility
        })
      });
      setCollection({ ...collection, title: editedTitle, visibility: editedVisibility });
      setEditMode(false);
      toast.success('Collection mise à jour');
    } catch (error: any) {
      console.error('Failed to update collection:', error);
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = async (skylanderId: string) => {
    if (!collection) return;

    try {
      const data = await apiCall(`/collections/${collection.id}/items`, {
        method: 'POST',
        body: JSON.stringify({
          item_type: 'character',
          item_id: skylanderId
        })
      });
      
      setCollection(data.collection);
      toast.success('Skylander ajouté à la collection');
    } catch (error: any) {
      console.error('Failed to add item:', error);
      if (error.message.includes('already in collection')) {
        toast.error('Ce Skylander est déjà dans la collection');
      } else {
        toast.error('Erreur lors de l\'ajout');
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!collection) return;

    try {
      const data = await apiCall(`/collections/${collection.id}/items/${itemId}`, {
        method: 'DELETE'
      });
      
      setCollection(data.collection);
      toast.success('Skylander retiré de la collection');
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

  if (!collection) {
    return null;
  }

  // Get Skylanders data for items in collection
  const collectionSkylanders = collection.items
    .filter(item => item.item_type === 'character')
    .map(item => {
      const skylander = skylanders.find(s => s.id === item.item_id);
      return skylander ? { ...skylander, collectionItemId: item.id } : null;
    })
    .filter(Boolean);

  // Filter available Skylanders for adding
  const existingIds = collection.items.map(item => item.item_id);
  const availableSkylanders = skylanders.filter(s => !existingIds.includes(s.id));
  const filteredAvailable = availableSkylanders.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] text-white pb-12 pt-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('collections')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux collections</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {editMode ? (
              <div className="flex-1 flex flex-col md:flex-row gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="flex-1">
                  <Input 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Titre de la collection"
                  />
                </div>
                <Select 
                  value={editedVisibility} 
                  onValueChange={(val: 'public' | 'private') => setEditedVisibility(val)}
                >
                  <SelectTrigger className="w-[180px] bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Publique 🌍</SelectItem>
                    <SelectItem value="private">Privée 🔒</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateCollection} disabled={saving} className="bg-white text-[#0B63D6] hover:bg-white/90">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button onClick={() => setEditMode(false)} variant="ghost" className="text-white hover:bg-white/20">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">{collection.title}</h1>
                    {collection.visibility === 'public' ? (
                      <Eye className="w-5 h-5 text-white/70" title="Visible par tous" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-white/70" title="Privé" />
                    )}
                  </div>
                  <p className="text-white/90 mt-1">
                    {collection.items.length} élément{collection.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setEditMode(true)}
                >
                  <Edit2 className="w-5 h-5" />
                </Button>
              </div>
            )}

            {!editMode && (
              <Button 
                className="bg-white text-[#0B63D6] hover:bg-white/90 shadow-lg"
                onClick={() => setAddDialogOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter des items
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8">
        {collectionSkylanders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-card rounded-2xl p-12 text-center shadow-sm border border-gray-200 dark:border-border"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] mx-auto mb-4 flex items-center justify-center">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-card-foreground mb-2">Collection vide</h3>
            <p className="text-gray-600 dark:text-muted-foreground mb-6">
              Commencez à ajouter des Skylanders, jeux ou objets à votre collection
            </p>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Ajouter maintenant
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {collectionSkylanders.map((skylander: any, index: number) => (
              <motion.div
                key={skylander.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CollectionItem
                  item={skylander}
                  type="character"
                  onDelete={handleRemoveItem}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Items Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col bg-white dark:bg-card dark:border-border">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-card-foreground">Ajouter des Skylanders</DialogTitle>
          </DialogHeader>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un Skylander..."
                className="pl-10 bg-gray-50 dark:bg-muted border-gray-200 dark:border-border"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {filteredAvailable.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-muted-foreground py-8">
                {searchQuery 
                  ? 'Aucun Skylander trouvé' 
                  : 'Tous les Skylanders sont déjà dans cette collection'}
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAvailable.map((skylander) => (
                  <button
                    key={skylander.id}
                    onClick={() => {
                      handleAddItem(skylander.id);
                      setSearchQuery('');
                    }}
                    className="text-left bg-white dark:bg-muted/50 rounded-xl border-2 border-transparent hover:border-[#0B63D6] dark:hover:border-[#0B63D6] transition-all p-3 group flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 relative">
                       <img 
                         src={skylander.image} 
                         alt={skylander.name}
                         className="w-full h-full object-contain"
                       />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-card-foreground group-hover:text-[#0B63D6] transition-colors line-clamp-1">
                        {skylander.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-muted-foreground capitalize">{skylander.element}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t dark:border-border">
            <Button 
              variant="outline" 
              onClick={() => {
                setAddDialogOpen(false);
                setSearchQuery('');
              }}
              className="w-full"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
