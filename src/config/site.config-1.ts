/**
 * 🎮 CONFIGURATION GLOBALE DU SITE
 * 
 * Ce fichier centralise TOUTES les configurations importantes.
 * Modifiez ici pour personnaliser votre encyclopédie !
 */

// ========================================
// 📋 INFORMATIONS DU SITE
// ========================================

export const SITE_CONFIG = {
  // Nom de votre site
  name: "Skylanders Universe",
  
  // Description
  description: "L'encyclopédie interactive la plus complète sur l'univers Skylanders",
  
  // Langue
  language: "fr",
  
  // Version
  version: "2.0.0",
  
  // Auteur
  author: "Votre Nom",
};

// ========================================
// 🎨 THÈME ET COULEURS
// ========================================

export const THEME_CONFIG = {
  // Couleurs principales
  colors: {
    primary: "#0B63D6",      // Bleu Skylanders
    secondary: "#8A2BE2",    // Violet
    success: "#28C76F",      // Vert
    warning: "#FF7A00",      // Orange
    danger: "#FF4444",       // Rouge
  },
  
  // Mode par défaut
  defaultMode: "dark" as "light" | "dark",
};

// ========================================
// 📱 NAVIGATION
// ========================================

export const NAVIGATION_ITEMS = [
  { label: "Accueil", path: "/", icon: "Home" },
  { label: "Skylanders", path: "/skylanders", icon: "Users" },
  { label: "Jeux", path: "/games", icon: "Gamepad2" },
  { label: "Portails", path: "/portals", icon: "Sparkles" },
  { label: "Guides", path: "/guides", icon: "BookOpen" },
  { label: "Collection", path: "/collections", icon: "FolderOpen" },
];

// ========================================
// 🔧 FONCTIONNALITÉS
// ========================================

export const FEATURES_CONFIG = {
  // Activer/désactiver des fonctionnalités
  enableAuth: true,              // Authentification Supabase
  enableCollections: true,       // Collections (Wishlist/Owned)
  enableFavorites: true,         // Système de favoris
  enableSearch: true,            // Barre de recherche
  enableDarkMode: true,          // Mode sombre
  enableComments: false,         // Commentaires (à venir)
  enableRatings: false,          // Notes (à venir)
  
  // Pagination
  itemsPerPage: 12,
  
  // Tri par défaut
  defaultSort: "alphabetical" as "alphabetical" | "year" | "element",
};

// ========================================
// 📊 STATISTIQUES
// ========================================

export const STATS_CONFIG = {
  // Afficher les statistiques sur la page d'accueil
  showStats: true,
  
  // Compteurs
  totalSkylanders: 100,
  totalGames: 6,
  totalPortals: 4,
  totalGuides: 12,
};

// ========================================
// 🌐 URLs ET LIENS
// ========================================

export const LINKS_CONFIG = {
  // Réseaux sociaux (optionnel)
  social: {
    twitter: "",
    facebook: "",
    youtube: "",
    discord: "",
  },
  
  // Liens externes
  external: {
    officialSite: "https://www.skylanders.com",
    wiki: "https://skylanderscharacterlist.com",
  },
};

// ========================================
// 💾 STOCKAGE LOCAL
// ========================================

export const STORAGE_KEYS = {
  theme: "skylanders_theme",
  favorites: "skylanders_favorites",
  wishlist: "skylanders_wishlist",
  owned: "skylanders_owned",
  settings: "skylanders_settings",
};

// ========================================
// 🎮 ÉLÉMENTS SKYLANDERS
// ========================================

export const ELEMENTS = [
  "Fire",
  "Water",
  "Life",
  "Undead",
  "Magic",
  "Tech",
  "Earth",
  "Air",
] as const;

export const FAMILIES = [
  "Core",
  "Giant",
  "LightCore",
  "Swap Force",
  "Trap Master",
  "SuperCharger",
  "Sensei",
  "Mini",
  "Eon's Elite",
] as const;

export const GAMES = [
  "Spyro's Adventure",
  "Giants",
  "Swap Force",
  "Trap Team",
  "SuperChargers",
  "Imaginators",
] as const;
