/**
 * 🗂️ CONFIGURATION DES CHEMINS
 * 
 * Ce fichier centralise tous les chemins et routes de l'application.
 * Facilite la maintenance et évite les erreurs de typo !
 */

// ========================================
// 🌐 ROUTES DE L'APPLICATION
// ========================================

export const ROUTES = {
  // Pages principales
  HOME: "/",
  SKYLANDERS: "/skylanders",
  SKYLANDER_DETAIL: (id: string) => `/skylander/${id}`,
  
  // Collections et favoris
  FAVORITES: "/favorites",
  COLLECTIONS: "/collections",
  COLLECTION_DETAIL: (id: string) => `/collection/${id}`,
  PROFILE: "/profile",
  
  // Contenu
  GAMES: "/games",
  PORTALS: "/portals",
  PORTAL_DETAIL: (id: string) => `/portal/${id}`,
  ITEMS: "/items",
  ITEM_DETAIL: (id: string) => `/item/${id}`,
  
  // Guides
  GUIDES: "/guides",
  GUIDE_DETAIL: (id: string) => `/guide/${id}`,
  GUIDE_EDITOR: "/guide/editor",
  
  // Autres
  GLITCHES: "/glitches",
  SETTINGS: "/settings",
  COMING_SOON: "/coming-soon",
};

// ========================================
// 📁 CHEMINS DES FICHIERS DE DONNÉES
// ========================================

export const DATA_PATHS = {
  SKYLANDERS: "/data/skylanders.ts",
  IMAGES: "/data/images-config.ts",
  PORTALS: "/data/portals.ts",
  CHARACTERS: "/data/characters.ts",
};

// ========================================
// 🖼️ CHEMINS DES ASSETS
// ========================================

export const ASSET_PATHS = {
  IMAGES: "/images",
  ICONS: "/icons",
  FONTS: "/fonts",
};

// ========================================
// 📄 CHEMINS DES GUIDES
// ========================================

export const GUIDE_PATHS = {
  IMAGES: "/COMMENT_CHANGER_LES_IMAGES.md",
  IMAGES_SIMPLE: "/GUIDE_IMAGES_SIMPLE.md",
  IMAGES_EXAMPLE: "/EXEMPLE_CHANGER_IMAGES.md",
  IMAGES_README: "/README_IMAGES.md",
  SKYLANDERS: "/GUIDE_AJOUT_SKYLANDERS.md",
  INSTALLATION: "/GUIDE_INSTALLATION_LOCALE.md",
  PROJECT: "/PROJECT_SETUP.md",
  INDEX: "/INDEX_GUIDES.md",
};

// ========================================
// 🔗 LIENS API (si utilisés)
// ========================================

export const API_PATHS = {
  // Supabase
  SUPABASE_URL: process.env.VITE_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || "",
  
  // Futures APIs
  EXTERNAL_API: "",
};
