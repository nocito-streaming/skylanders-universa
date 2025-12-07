import { Search, Menu, X, Star, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './auth/AuthModal';
import { AccountDrawer } from './auth/AccountDrawer';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
}

export function Header({ onNavigate, currentPage, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const { user } = useAuth();

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'skylanders', label: 'Skylanders' },
    { id: 'games', label: 'Jeux' },
    { id: 'items', label: 'Objets' },
    { id: 'portals', label: 'Portails' },
    { id: 'guides', label: 'Guides' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (currentPage !== 'skylanders' && currentPage !== 'guides') {
      onNavigate('skylanders');
    }
    setMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (user) {
      setAccountDrawerOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-card border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Menu principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
          </button>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] flex items-center justify-center shadow-lg">
              <span className="text-white font-black">S</span>
            </div>
            <div className="hidden sm:block">
              <span className="bg-gradient-to-r from-[#0B63D6] via-[#8A2BE2] to-[#FF7A00] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                Skylanders Universe
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-[#0B63D6] text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className={`hidden md:flex items-center gap-2 transition-all ${
              searchFocused ? 'w-64' : 'w-48'
            }`}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] focus:border-transparent transition-colors"
              />
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('favorites')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              aria-label="Favoris"
            >
              <Star className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            {user ? (
              <button
                onClick={handleAccountClick}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Compte"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-[#0B63D6] to-[#8A2BE2] text-white text-sm">
                    {user.user_metadata?.display_name?.[0]?.toUpperCase() || 
                     user.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <button
                onClick={handleAccountClick}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Compte"
              >
                <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search (always visible on mobile) */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un personnage..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B63D6] focus:border-transparent transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-card"
          >
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-[#0B63D6] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* Account Drawer */}
      <AccountDrawer 
        isOpen={accountDrawerOpen} 
        onClose={() => setAccountDrawerOpen(false)}
        onNavigate={onNavigate}
      />
    </header>
  );
}