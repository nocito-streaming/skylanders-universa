/**
 * 🖼️ CONFIGURATION SIMPLE DES IMAGES
 *
 * Ce fichier centralise TOUTES les images de l'application.
 * Pour changer une image, modifiez simplement l'URL ici !
 */

// ========================================
// 🎮 IMAGES DES SKYLANDERS
// ========================================

export const skylandersImages: Record<
  string,
  {
    character: string; // Image du personnage
    figurine?: string; // Photo de la figurine (optionnel)
    ingame?: string; // Screenshot in-game (optionnel)
  }
> = {
  // 🔥 FIRE (Feu)
  "spyro-series1": {
    character:
      "https://drive.google.com/uc?export=view&id=1bwx3b4SMSQMqswb-mBqfsNrl_AI-i_IL",
    figurine:
      "https://drive.google.com/uc?export=view&id=1bwx3b4SMSQMqswb-mBqfsNrl_AI-i_IL",
  },
  "eruptor-series1": {
    character:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop",
  },
  "flameslinger-series1": {
    character:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop",
  },
  "ignitor-series1": {
    character:
      "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&h=400&fit=crop",
  },
  // Lumière
  "knight-light": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/Lumi%C3%A8re/Knight_Light_Promo.webp",
  },
  "knight-mare": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/T%C3%A9n%C3%A8bres/Knight_Mare_Promo.webp",
  },
  // 💧 WATER (Eau)
  "gill-grunt-series1": {
    character:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
  },
  "slam-bam-series1": {
    character:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
  },
  "wham-shell-series1": {
    character:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
  },
  "zap-series1": {
    character:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
  },
  "snap-shot-trapmaster": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/065d5acecc11b228010edd73ed3e7d7ea588fd43/Skylanders/Trap%20Team/Eau/Snap_Shot.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/065d5acecc11b228010edd73ed3e7d7ea588fd43/Skylanders/Trap%20Team/Eau/Snap_Shot.webp",
  },
  "dark-snap-shot-trapmaster": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/065d5acecc11b228010edd73ed3e7d7ea588fd43/Skylanders/Trap%20Team/Eau/Dark_Snap_Shot_Promo.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/065d5acecc11b228010edd73ed3e7d7ea588fd43/Skylanders/Trap%20Team/Eau/Dark_Snap_Shot_Promo.webp",
  },
  "lob-star-trapmaster": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/2545a49634efde361dafc3a031ac900dc71b29c1/Skylanders/Trap%20Team/Eau/Lob-Star.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/2545a49634efde361dafc3a031ac900dc71b29c1/Skylanders/Trap%20Team/Eau/Lob-Star.webp",
  },
  "winterfest-lob-star-trapmaster": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/2545a49634efde361dafc3a031ac900dc71b29c1/Skylanders/Trap%20Team/Eau/Winterfest_Lob-Star_promo.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/2545a49634efde361dafc3a031ac900dc71b29c1/Skylanders/Trap%20Team/Eau/Winterfest_Lob-Star_promo.webp",
  },
  "echo-series1": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Echo.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Echo.webp",
  },
  "flip-wreck-series1": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Flip_Wreck.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Flip_Wreck.webp",
  },
  "gill-grunt-series3": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/S3_Gill_Grunt_Promo.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/S3_Gill_Grunt_Promo.webp",
  },
  "gil-runt-series1": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Gil_Runt_Promo.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Gil_Runt_Promo.webp",
  },
  "thumpling-series1": {
    character:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Thumpling.webp",
    figurine:
      "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Thumpling.webp",
  },

  // 🌿 LIFE (Vie)
  "stealth-elf-series1": {
    character:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
  },
  "stump-smash-series1": {
    character:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
  },
  "camo-series1": {
    character:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
  },
  "zook-series1": {
    character:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
  },

  // 💀 UNDEAD (Mort-vivant)
  "chop-chop-series1": {
    character:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=400&fit=crop",
  },
  "ghost-roaster-series1": {
    character:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=400&fit=crop",
  },
  "cynder-series1": {
    character:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=400&fit=crop",
  },
  "hex-series1": {
    character:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=400&fit=crop",
  },

  // ✨ MAGIC (Magie)
  "spyro-series2": {
    character:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
  },
  "double-trouble-series1": {
    character:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
  },
  "voodood-series1": {
    character:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
  },
  "wrecking-ball-series1": {
    character:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
  },

  // ⚙️ TECH (Technologie)
  "trigger-happy-series1": {
    character:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },
  "drobot-series1": {
    character:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },
  "drill-sergeant-series1": {
    character:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },
  "boomer-series1": {
    character:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },

  // 🪨 EARTH (Terre)
  "bash-series1": {
    character:
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=400&fit=crop",
  },
  "dino-rang-series1": {
    character:
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=400&fit=crop",
  },
  "prism-break-series1": {
    character:
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=400&fit=crop",
  },
  "terrafin-series1": {
    character:
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=400&fit=crop",
  },

  // 💨 AIR (Air)
  "whirlwind-series1": {
    character:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
  },
  "sonic-boom-series1": {
    character:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
  },
  "lightning-rod-series1": {
    character:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
  },
  "warnado-series1": {
    character:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
  },

  // 🦅 GIANTS
  "tree-rex": {
    character:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop",
  },
  crusher: {
    character:
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=400&fit=crop",
  },
  bouncer: {
    character:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  },
  "jet-vac": {
    character:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=400&fit=crop",
  },
};

// ========================================
// 🌀 IMAGES DES PORTAILS
// ========================================

export const portalsImages: Record<string, string> = {
  "portal-of-power":
    "https://images.unsplash.com/photo-1633479397627-9bca35c81880?w=600&h=400&fit=crop",
  "traptanium-portal":
    "https://images.unsplash.com/photo-1633479397627-9bca35c81880?w=600&h=400&fit=crop",
  "superchargers-portal":
    "https://images.unsplash.com/photo-1633479397627-9bca35c81880?w=600&h=400&fit=crop",
  "imaginators-portal":
    "https://images.unsplash.com/photo-1633479397627-9bca35c81880?w=600&h=400&fit=crop",
};

// ========================================
// 🎯 IMAGES DES JEUX
// ========================================

export const gamesImages: Record<string, string> = {
  "spyros-adventure":
    "https://images.unsplash.com/photo-1760693052314-d71e8b493c84?w=800&h=600&fit=crop",
  giants:
    "https://images.unsplash.com/photo-1682975825914-745c63fa0313?w=800&h=600&fit=crop",
  "swap-force":
    "https://images.unsplash.com/photo-1656639969807-94711deb32a2?w=800&h=600&fit=crop",
  "trap-team":
    "https://images.unsplash.com/photo-1760693052314-d71e8b493c84?w=800&h=600&fit=crop",
  superchargers:
    "https://images.unsplash.com/photo-1682975825914-745c63fa0313?w=800&h=600&fit=crop",
  imaginators:
    "https://images.unsplash.com/photo-1656639969807-94711deb32a2?w=800&h=600&fit=crop",
};

// ========================================
// 🏠 IMAGES DES PAGES
// ========================================

export const pagesImages = {
  // Hero carousel (page d'accueil)
  hero: [
    "https://images.unsplash.com/photo-1760693052314-d71e8b493c84?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1682975825914-745c63fa0313?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1656639969807-94711deb32a2?w=1920&h=1080&fit=crop",
  ],

  // Background de la page Skylanders
  skylandersBackground:
    "https://images.unsplash.com/photo-1760693052314-d71e8b493c84?w=1920&h=400&fit=crop",

  // Background de la page Guides
  guidesBackground:
    "https://images.unsplash.com/photo-1682975825914-745c63fa0313?w=1920&h=400&fit=crop",
};

// ========================================
// 🛠️ FONCTION HELPER
// ========================================

/**
 * Récupère l'URL d'une image de Skylander
 * Retourne une image par défaut si non trouvée
 */
export function getSkylanderImage(
  skylanderId: string,
  type: "character" | "figurine" | "ingame" = "character",
): string {
  const images = skylandersImages[skylanderId];
  if (!images) {
    // Image par défaut si le Skylander n'est pas trouvé
    return "https://images.unsplash.com/photo-1600106924825-f54fb759c603?w=400&h=400&fit=crop";
  }
  return images[type] || images.character;
}

/**
 * Récupère l'URL d'une image de portail
 */
export function getPortalImage(portalId: string): string {
  return (
    portalsImages[portalId] ||
    "https://images.unsplash.com/photo-1633479397627-9bca35c81880?w=600&h=400&fit=crop"
  );
}

/**
 * Récupère l'URL d'une image de jeu
 */
export function getGameImage(gameId: string): string {
  return (
    gamesImages[gameId] ||
    "https://images.unsplash.com/photo-1760693052314-d71e8b493c84?w=800&h=600&fit=crop"
  );
}