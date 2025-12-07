import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  Heart, 
  Package, 
  Trophy,
  ArrowLeft,
  Bell,
  Lock,
  Palette,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner@2.0.3';
import { apiCall } from '../utils/api';
import { getCollectionIds, getCollectionStats } from '../utils/collection';
import { skylanders } from '../data/skylanders';
import { SkylanderCard } from '../components/SkylanderCard';

interface ProfileProps {
  onNavigate: (page: string, id?: string) => void;
}

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    privacy: 'private' | 'public';
  };
  created_at: string;
  updated_at: string;
}

export function Profile({ onNavigate }: ProfileProps) {
  const { user } = useAuth();
  const { setTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [wishlistItems, setWishlistItems] = useState<typeof skylanders>([]);
  const [ownedItems, setOwnedItems] = useState<typeof skylanders>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadCollections();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadCollections = () => {
    const wishlistIds = getCollectionIds('wishlist');
    const ownedIds = getCollectionIds('owned');
    
    setWishlistItems(skylanders.filter(s => wishlistIds.includes(s.id)));
    setOwnedItems(skylanders.filter(s => ownedIds.includes(s.id)));
    setStats(getCollectionStats(skylanders));
  };

  const loadProfile = async () => {
    try {
      // Try to load from backend, but fallback to local user data
      try {
        const data = await apiCall('/user/profile');
        setProfile(data.profile);
        setDisplayName(data.profile.display_name);
        setAvatarUrl(data.profile.avatar_url || '');
      } catch (backendError) {
        console.log('Backend not available, using local auth data');
        // Fallback to user metadata from Supabase Auth
        const fallbackProfile: UserProfile = {
          id: user!.id,
          email: user!.email || '',
          display_name: user!.user_metadata?.display_name || user!.email?.split('@')[0] || 'Utilisateur',
          avatar_url: user!.user_metadata?.avatar_url || null,
          preferences: {
            theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
            notifications: true,
            privacy: 'public',
          },
          created_at: user!.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setProfile(fallbackProfile);
        setDisplayName(fallbackProfile.display_name);
        setAvatarUrl(fallbackProfile.avatar_url || '');
      }
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Try to save to backend
      try {
        const data = await apiCall('/user/profile', {
          method: 'PATCH',
          body: JSON.stringify({
            display_name: displayName,
            avatar_url: avatarUrl || null
          })
        });
        setProfile(data.profile);
        toast.success('Profil mis à jour avec succès');
      } catch (backendError) {
        // Fallback: save to localStorage
        const updatedProfile = {
          ...profile!,
          display_name: displayName,
          avatar_url: avatarUrl || null,
          updated_at: new Date().toISOString(),
        };
        setProfile(updatedProfile);
        localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
        toast.success('Profil mis à jour localement');
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceChange = async (key: string, value: any) => {
    if (!profile) return;

    if (key === 'theme') {
      setTheme(value);
      localStorage.setItem('theme', value);
    }

    try {
      // Try to save to backend
      try {
        const data = await apiCall('/user/profile', {
          method: 'PATCH',
          body: JSON.stringify({
            preferences: {
              ...profile.preferences,
              [key]: value
            }
          })
        });
        setProfile(data.profile);
        toast.success('Préférence mise à jour');
      } catch (backendError) {
        // Fallback: save to localStorage
        const updatedProfile = {
          ...profile,
          preferences: {
            ...profile.preferences,
            [key]: value
          }
        };
        setProfile(updatedProfile);
        localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
        toast.success('Préférence mise à jour localement');
      }
    } catch (error: any) {
      console.error('Failed to update preferences:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0B63D6] border-t-transparent"></div>
      </div>
    );
  }

  // If no user, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-gray-900 dark:text-white mb-2">Connexion requise</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Vous devez être connecté pour accéder à votre profil et gérer vos collections.
          </p>
          <Button onClick={() => onNavigate('home')} className="w-full">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors">
        <p className="text-gray-600 dark:text-muted-foreground">Profil introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
            aria-label="Retour à l'accueil"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback className="bg-gradient-to-br from-white/20 to-white/10 text-white text-3xl">
                {displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-white mb-2">{displayName || 'Mon Profil'}</h1>
              <p className="text-white/90">{profile.email}</p>
              
              {/* Quick Stats */}
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{stats?.totalWishlist || 0} souhaits</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">{stats?.totalOwned || 0} possédés</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">{stats?.completionPercentage || 0}% complété</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-card border border-gray-200 dark:border-border">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Liste d'envies</span>
            </TabsTrigger>
            <TabsTrigger value="collection" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Collection</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Statistiques</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Avatar & Basic Info */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                <h3 className="text-gray-900 dark:text-card-foreground mb-6">Informations de base</h3>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] text-white text-3xl">
                        {displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Changer
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-muted-foreground text-center max-w-[200px]">
                      URL d'image recommandée (ou laissez vide pour l'avatar par défaut)
                    </p>
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="displayName">Nom d'affichage</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-muted-foreground" />
                        <Input
                          id="displayName"
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Votre nom"
                          className="pl-10 bg-white dark:bg-muted border-gray-200 dark:border-border text-gray-900 dark:text-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="pl-10 bg-gray-50 dark:bg-muted/50 text-gray-500 dark:text-muted-foreground border-gray-200 dark:border-border"
                        />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">
                        L'email ne peut pas être modifié
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="avatarUrl">URL de l'avatar (optionnel)</Label>
                      <Input
                        id="avatarUrl"
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://exemple.com/avatar.jpg"
                        className="bg-white dark:bg-muted border-gray-200 dark:border-border text-gray-900 dark:text-foreground"
                      />
                    </div>

                    <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                <h3 className="text-gray-900 dark:text-card-foreground mb-6">Préférences</h3>

                <div className="space-y-6">
                  {/* Theme */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
                      <div>
                        <p className="text-gray-900 dark:text-card-foreground">Thème Sombre</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          Activer le mode sombre
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.preferences.theme === 'dark'}
                      onCheckedChange={(checked) => 
                        handlePreferenceChange('theme', checked ? 'dark' : 'light')
                      }
                    />
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
                      <div>
                        <p className="text-gray-900 dark:text-card-foreground">Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          Recevoir des notifications sur les nouveautés
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.preferences.notifications}
                      onCheckedChange={(checked) => 
                        handlePreferenceChange('notifications', checked)
                      }
                    />
                  </div>

                  {/* Privacy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
                      <div>
                        <p className="text-gray-900 dark:text-card-foreground">Profil public</p>
                        <p className="text-sm text-gray-600 dark:text-muted-foreground">
                          Rendre vos collections visibles aux autres
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.preferences.privacy === 'public'}
                      onCheckedChange={(checked) => 
                        handlePreferenceChange('privacy', checked ? 'public' : 'private')
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Account info */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                <h3 className="text-gray-900 dark:text-card-foreground mb-4">Informations du compte</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-muted-foreground">
                  <p>
                    <span className="font-medium text-gray-900 dark:text-card-foreground">Membre depuis :</span>{' '}
                    {new Date(profile.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900 dark:text-card-foreground">Dernière mise à jour :</span>{' '}
                    {new Date(profile.updated_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900 dark:text-card-foreground mb-1">Ma liste d'envies</h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    {wishlistItems.length} Skylander{wishlistItems.length > 1 ? 's' : ''} dans votre liste
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-950/30 rounded-lg">
                  <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400 fill-current" />
                  <span className="text-pink-600 dark:text-pink-400">{wishlistItems.length}</span>
                </div>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-pink-100 dark:bg-pink-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h4 className="text-gray-900 dark:text-card-foreground mb-2">Votre liste d'envies est vide</h4>
                  <p className="text-gray-600 dark:text-muted-foreground mb-6">
                    Ajoutez des Skylanders à votre liste d'envies pour les suivre
                  </p>
                  <Button onClick={() => onNavigate('skylanders')}>
                    Explorer les Skylanders
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((skylander) => (
                    <SkylanderCard
                      key={skylander.id}
                      skylander={skylander}
                      onCardClick={(id) => onNavigate('skylander-detail', id)}
                      onFavoriteToggle={() => {}}
                      isFavorite={false}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Collection Tab */}
          <TabsContent value="collection">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-gray-900 dark:text-card-foreground mb-1">Ma collection</h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    {ownedItems.length} Skylander{ownedItems.length > 1 ? 's' : ''} possédé{ownedItems.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-950/30 rounded-lg">
                  <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">{ownedItems.length}</span>
                </div>
              </div>

              {ownedItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-gray-900 dark:text-card-foreground mb-2">Votre collection est vide</h4>
                  <p className="text-gray-600 dark:text-muted-foreground mb-6">
                    Commencez à marquer les Skylanders que vous possédez
                  </p>
                  <Button onClick={() => onNavigate('skylanders')}>
                    Explorer les Skylanders
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ownedItems.map((skylander) => (
                    <SkylanderCard
                      key={skylander.id}
                      skylander={skylander}
                      onCardClick={(id) => onNavigate('skylander-detail', id)}
                      onFavoriteToggle={() => {}}
                      isFavorite={false}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground">Complétion</p>
                      <p className="text-2xl text-gray-900 dark:text-card-foreground">{stats?.completionPercentage || 0}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] h-2 rounded-full transition-all"
                      style={{ width: `${stats?.completionPercentage || 0}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground">Liste d'envies</p>
                      <p className="text-2xl text-gray-900 dark:text-card-foreground">{stats?.totalWishlist || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                      <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-muted-foreground">Possédés</p>
                      <p className="text-2xl text-gray-900 dark:text-card-foreground">{stats?.totalOwned || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Element Stats */}
              <div className="bg-white dark:bg-card rounded-2xl shadow-sm border border-gray-200 dark:border-border p-6 transition-colors">
                <h3 className="text-gray-900 dark:text-card-foreground mb-6">Collection par élément</h3>
                <div className="space-y-4">
                  {stats && Object.entries(stats.elementStats).map(([element, data]: [string, any]) => (
                    <div key={element}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-900 dark:text-card-foreground capitalize">{element}</span>
                        <span className="text-sm text-gray-600 dark:text-muted-foreground">
                          {data.owned} / {data.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#0B63D6] to-[#8A2BE2] h-2 rounded-full transition-all"
                          style={{ width: `${data.total > 0 ? (data.owned / data.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}