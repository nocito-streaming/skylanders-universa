import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, Heart, BookOpen, LogOut, Sparkles, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '../../contexts/AuthContext';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function AccountDrawer({ isOpen, onClose, onNavigate }: AccountDrawerProps) {
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onClose();
    onNavigate('home');
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer - Mobile: from right, Desktop: dropdown from top-right */}
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-card shadow-2xl overflow-y-auto border-l border-gray-200 dark:border-gray-800 lg:top-16 lg:bottom-auto lg:max-h-[calc(100vh-4rem)] lg:rounded-l-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between z-10">
            <h2 className="text-gray-900 dark:text-white">Mon Compte</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* User info */}
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] text-white">
                  {user?.user_metadata?.display_name?.[0]?.toUpperCase() || 
                   user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white truncate">
                  {user?.user_metadata?.display_name || 'Utilisateur'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button
                onClick={() => handleNavigate('profile')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Mon Profil</span>
              </button>

              <button
                onClick={() => handleNavigate('collections')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Sparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Mes Collections</span>
              </button>

              <button
                onClick={() => handleNavigate('favorites')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Mes Favoris</span>
              </button>

              <button
                onClick={() => handleNavigate('my-guides')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Mes Guides</span>
              </button>

              <button
                onClick={() => handleNavigate('settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Paramètres</span>
              </button>

              {isAdmin && (
                <button
                  onClick={() => handleNavigate('admin')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Admin</span>
                </button>
              )}
            </nav>

            {/* Sign out */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <Button
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Se déconnecter
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}