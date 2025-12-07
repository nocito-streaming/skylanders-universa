import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Monitor, Bell, Lock, LogOut, Trash2, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [collectionVisibility, setCollectionVisibility] = useState<'public' | 'private'>('public');

  const themeOptions = [
    { value: 'light' as const, label: 'Clair', icon: Sun, description: 'Mode clair permanent' },
    { value: 'dark' as const, label: 'Sombre', icon: Moon, description: 'Mode sombre permanent' },
    { value: 'system' as const, label: 'Système', icon: Monitor, description: 'Suit les préférences de votre appareil' },
  ];

  const handleSignOut = async () => {
    await signOut();
    toast.success('Déconnexion réussie');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with backend
    toast.success('Demande de suppression envoyée');
    setShowDeleteModal(false);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(`Notifications ${!notificationsEnabled ? 'activées' : 'désactivées'}`);
  };

  const handleVisibilityToggle = () => {
    const newVisibility = collectionVisibility === 'public' ? 'private' : 'public';
    setCollectionVisibility(newVisibility);
    toast.success(`Collection ${newVisibility === 'public' ? 'publique' : 'privée'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Paramètres</h1>
          <p className="text-gray-600 dark:text-gray-200">
            Gérez vos préférences et votre compte
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Theme Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-card rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300"
          >
            <div className="mb-6">
              <h2 className="text-gray-900 dark:text-white mb-1">Apparence</h2>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Personnalisez l'apparence de Skylanders Universe
              </p>
            </div>

            <div className="space-y-3">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      isActive
                        ? 'border-[#0B63D6] bg-blue-50 dark:bg-blue-950/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-[#0B63D6] text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium ${
                        isActive ? 'text-[#0B63D6]' : 'text-gray-900 dark:text-white'
                      }`}>
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-[#0B63D6] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* Account Preferences */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-card rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300"
          >
            <div className="mb-6">
              <h2 className="text-gray-900 dark:text-white mb-1">Préférences du compte</h2>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Gérez vos notifications et votre confidentialité
              </p>
            </div>

            <div className="space-y-4">
              {/* Notifications Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Recevoir les mises à jour et actualités
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNotificationsToggle}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-[#0B63D6]' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ left: notificationsEnabled ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Privacy Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <Label className="text-gray-900 dark:text-white">Collection publique</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {collectionVisibility === 'public' 
                        ? 'Visible par tous les utilisateurs' 
                        : 'Visible uniquement par vous'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleVisibilityToggle}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    collectionVisibility === 'public' ? 'bg-[#0B63D6]' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ left: collectionVisibility === 'public' ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Account Actions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-card rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300"
          >
            <div className="mb-6">
              <h2 className="text-gray-900 dark:text-white mb-1">Actions du compte</h2>
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Gérez votre connexion et vos données
              </p>
            </div>

            <div className="space-y-3">
              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">Se déconnecter</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-950/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-red-600 dark:text-red-400 font-medium">Supprimer mon compte</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </motion.section>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white dark:bg-card rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800"
            >
              <h3 className="text-gray-900 dark:text-white mb-2">Supprimer le compte</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6">
                Cette action est irréversible. Toutes vos données, collections et guides seront définitivement supprimés.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDeleteAccount}
                >
                  Supprimer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}