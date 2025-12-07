import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { GameDetail } from './pages/GameDetail';
import { ComingSoon } from './pages/ComingSoon';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Import nouvelles pages Skylanders
import { SkylandersList } from './pages/SkylandersList';
import { SkylanderDetail } from './pages/SkylanderDetail';
import { Favorites } from './pages/Favorites';

// Import nouvelles pages Auth & Collections
import { Profile } from './pages/Profile';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';

// Import pages Guides
import { Guides } from './pages/Guides';
import { GuideDetail } from './pages/GuideDetail';
import { GuideEditor } from './pages/GuideEditor';

// Import page Glitches
import { GlitchesHub } from './pages/GlitchesHub';

// Import pages Settings, Items & Portals
import { Settings } from './pages/Settings';
import { Items } from './pages/Items';
import { ItemDetail } from './pages/ItemDetail';
import { Portals } from './pages/Portals';
import { PortalDetail } from './pages/PortalDetail';
import { Admin } from './pages/Admin';

type Page = 
  | 'home' 
  | 'skylanders' 
  | 'skylander-detail' 
  | 'games'
  | 'game-detail'
  | 'items'
  | 'item-detail'
  | 'portals'
  | 'portal-detail'
  | 'guides'
  | 'guide-detail'
  | 'guide-create'
  | 'guide-edit'
  | 'glitches'
  | 'favorites' 
  | 'account'
  | 'profile'
  | 'collections'
  | 'collection-detail'
  | 'my-guides'
  | 'settings'
  | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setSelectedId(id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 'skylanders') {
      setCurrentPage('skylanders');
    }
  };

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Home onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'skylanders':
        return (
          <motion.div
            key="skylanders"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SkylandersList onNavigate={handleNavigate} searchQuery={searchQuery} />
          </motion.div>
        );

      case 'skylander-detail':
        return (
          <motion.div
            key={`skylander-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SkylanderDetail skylanderId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'games':
        return (
          <motion.div
            key="games"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Games onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'game-detail':
        return (
          <motion.div
            key={`game-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GameDetail gameId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'favorites':
        return (
          <motion.div
            key="favorites"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Favorites onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Profile onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'collections':
        return (
          <motion.div
            key="collections"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Collections onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'collection-detail':
        return (
          <motion.div
            key={`collection-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <CollectionDetail collectionId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'guides':
        return (
          <motion.div
            key="guides"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Guides onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'guide-detail':
        return (
          <motion.div
            key={`guide-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GuideDetail guideId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'guide-create':
        return (
          <motion.div
            key="guide-create"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GuideEditor onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'guide-edit':
        return (
          <motion.div
            key={`guide-edit-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GuideEditor guideId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'glitches':
        return (
          <motion.div
            key="glitches"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <GlitchesHub onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'items':
        return (
          <motion.div
            key="items"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Items onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'item-detail':
        return (
          <motion.div
            key={`item-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ItemDetail itemId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'portals':
        return (
          <motion.div
            key="portals"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Portals onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'portal-detail':
        return (
          <motion.div
            key={`portal-${selectedId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PortalDetail portalId={selectedId} onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'my-guides':
        return (
          <motion.div
            key="my-guides"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ComingSoon
              title="Mes Guides"
              description="Gérez vos guides créés et vos brouillons."
              onNavigate={handleNavigate}
            />
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            key="settings"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Settings onNavigate={handleNavigate} />
          </motion.div>
        );

      case 'account':
        return (
          <motion.div
            key="account"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ComingSoon
              title="Mon Compte"
              description="Gérez votre profil, synchronisez vos favoris et personnalisez votre expérience."
              onNavigate={handleNavigate}
            />
          </motion.div>
        );

      case 'admin':
        return (
          <motion.div
            key="admin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Admin onNavigate={handleNavigate} />
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Home onNavigate={handleNavigate} />
          </motion.div>
        );
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="skylanders-theme">
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background transition-colors duration-300">
          <Header 
            onNavigate={handleNavigate} 
            currentPage={currentPage}
            onSearch={handleSearch}
          />
          
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </main>

          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}