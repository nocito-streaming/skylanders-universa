// Vrai système Skylanders - Éléments officiels
export type Element =
  | "Fire"
  | "Water"
  | "Life"
  | "Undead"
  | "Magic"
  | "Tech"
  | "Earth"
  | "Lumière"
  | "Ténèbres"
  | "Air";

// Familles officielles Skylanders
export type Family =
  | "Core"
  | "Giant"
  | "LightCore"
  | "Swap Force"
  | "Trap Master"
  | "SuperCharger"
  | "Sensei"
  | "Mini"
  | "Eon's Elite";

// Séries officielles
export type Series =
  | "Series 1"
  | "Series 2"
  | "Series 3"
  | "Series 4"
  | "Series 5";

// Variantes de couleur officielles
export type Variant =
  | "Regular"
  | "Dark"
  | "Legendary"
  | "Nitro"
  | "Winterfest"
  | "Polar Whirlwind"
  | "Granite Crusher"
  | "Jade Fire Kraken"
  | "Scarlet Ninjini"
  | "Royal Double Trouble"
  | "Gnarly Tree Rex"
  | "Frito-Lay"
  | "Chrome"
  | "Metallic"
  | "Glow in the Dark";

// Jeux officiels Skylanders
export type Game =
  | "Spyro's Adventure"
  | "Giants"
  | "Swap Force"
  | "Trap Team"
  | "SuperChargers"
  | "Imaginators";

export interface Skylander {
  id: string;
  name: string;
  element: Element;
  family: Family;
  series: Series[];
  variant: Variant;
  firstGame: Game;
  availableIn: Game[];
  description: string;
  catchphrase: string; // Phrase iconique du personnage
  attacks: {
    primary: {
      name: string;
      description: string;
    };
    secondary: {
      name: string;
      description: string;
    };
    basicUpgrades?: {
      name: string;
      description: string;
      cost: number;
    }[];
    upgradePaths?: {
      path1: {
        name: string;
        upgrades: {
          name: string;
          description: string;
          cost: number;
        }[];
      };
      path2: {
        name: string;
        upgrades: {
          name: string;
          description: string;
          cost: number;
        }[];
      };
    };
  };
  soulGem?: {
    name: string;
    description: string;
    cost: number;
  }; // Capacité déblocable
  stats?: {
    health: { base: number; max: number };
    speed: { base: number; max: number };
    armor: { base: number; max: number };
    critical: { base: number; max: number };
    elemental: { base: number; max: number };
  };
  price?: number; // Prix de vente figurine
  releasedYear: number;
  images: {
    character: string; // Image du personnage
    figurine: string; // Photo de la figurine
    ingame?: string; // Screenshot in-game
  };
  variants?: string[]; // IDs d'autres variantes
  trivia?: string[];
}

// Données exemple avec vrais Skylanders
export const skylanders: Skylander[] = [
  {
    id: "spyro-series1",
    name: "Spyro",
    element: "Magic",
    family: "Core",
    series: ["Series 1", "Series 2", "Series 3"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Jeune dragon violet et héros légendaire des Skylands. Malgré sa petite taille, Spyro possède un courage immense et une détermination sans faille.",
    catchphrase: "All Fired Up!",
    attacks: {
      primary: {
        name: "Flameball",
        description: "Lance une boule de feu sur l'ennemi.",
      },
      secondary: {
        name: "Charge",
        description:
          "Charge l'ennemi avec une puissante détermination.",
      },
      upgradePaths: {
        path1: {
          name: "Flame Mastery",
          upgrades: [
            {
              name: "Inferno Burst",
              description:
                "Lance une vague de feu dévastatrice.",
              cost: 100,
            },
            {
              name: "Blazing Fury",
              description:
                "Inflige des dégâts massifs à l'ennemi.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Speed Boost",
          upgrades: [
            {
              name: "Swift Strike",
              description: "Augmente la vitesse d'attaque.",
              cost: 50,
            },
            {
              name: "Lightning Reflexes",
              description: "Permet de se déplacer rapidement.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "The Daybringer Flame",
      description:
        "Inflige des dégâts massifs et réduit la vitesse de l'ennemi.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 7, max: 10 },
      armor: { base: 5, max: 10 },
      critical: { base: 6, max: 10 },
      elemental: { base: 8, max: 10 },
    },
    releasedYear: 2011,
    images: {
      character: "magic dragon",
      figurine: "purple dragon figurine",
      ingame: "spyro gameplay",
    },
    trivia: [
      "Premier Skylander créé",
      "Mascotte de la franchise Skylanders",
      "Héros de sa propre série de jeux avant Skylanders",
    ],
  },
  {
    id: "trigger-happy-series1",
    name: "Trigger Happy",
    element: "Tech",
    family: "Core",
    series: ["Series 1", "Series 2", "Series 3"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Gremlin hyperactif armé de deux pistolets dorés. Son amour pour l'or n'a d'égal que sa passion pour tirer sur tout ce qui bouge.",
    catchphrase: "No Gold, No Glory!",
    attacks: {
      primary: {
        name: "Golden Pistols",
        description: "Tire des balles dorées sur l'ennemi.",
      },
      secondary: {
        name: "Pot O' Gold",
        description: "Lance un pot d'or explosif.",
      },
      upgradePaths: {
        path1: {
          name: "Golden Arsenal",
          upgrades: [
            {
              name: "Golden Machine Gun",
              description: "Tire une salve de balles dorées.",
              cost: 100,
            },
            {
              name: "Golden Cannon",
              description:
                "Lance une grande salve de balles dorées.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Speed Boost",
          upgrades: [
            {
              name: "Swift Strike",
              description: "Augmente la vitesse d'attaque.",
              cost: 50,
            },
            {
              name: "Lightning Reflexes",
              description: "Permet de se déplacer rapidement.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Happiness is a Golden Gun",
      description:
        "Inflige des dégâts massifs et augmente la vitesse d'attaque.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 8, max: 10 },
      armor: { base: 4, max: 10 },
      critical: { base: 7, max: 10 },
      elemental: { base: 6, max: 10 },
    },
    releasedYear: 2011,
    images: {
      character: "tech gremlin",
      figurine: "golden gremlin figurine",
    },
    trivia: [
      "Un des Skylanders les plus populaires",
      "Disponible dans le Starter Pack original",
    ],
  },
  {
    id: "tree-rex-giant",
    name: "Tree Rex",
    element: "Life",
    family: "Giant",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Giants",
    availableIn: [
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Ancien guerrier transformé en cyborg-arbre géant. Leader des Giants et protecteur de la nature technologique.",
    catchphrase: "Be Afraid of the Bark!",
    attacks: {
      primary: {
        name: "Photosynthesis Cannon",
        description: "Lance une salve de lumière verte.",
      },
      secondary: {
        name: "Sequoia Slam",
        description:
          "Frappe l'ennemi avec une puissante force.",
      },
      upgradePaths: {
        path1: {
          name: "Life Force",
          upgrades: [
            {
              name: "Super Sized Shockwave Slam",
              description:
                "Inflige des dégâts massifs et crée une onde de choc.",
              cost: 100,
            },
            {
              name: "Life Surge",
              description: "Régénère la santé des alliés.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Bark",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Bark",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Lightfooted",
      description: "Augmente la vitesse et la résistance.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 4, max: 10 },
      armor: { base: 9, max: 10 },
      critical: { base: 5, max: 10 },
      elemental: { base: 8, max: 10 },
    },
    releasedYear: 2012,
    images: {
      character: "giant tree",
      figurine: "tree rex giant figurine",
    },
    trivia: [
      "Premier Giant révélé",
      "Taille double d'un Skylander normal",
      "Peut soulever des objets lourds",
    ],
  },
  {
    id: "wash-buckler-swap",
    name: "Wash Buckler",
    element: "Water",
    family: "Swap Force",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Swap Force",
    availableIn: [
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Pirate moitié pieuvre, moitié... pirate ! Capable de swapper son haut et son bas avec d'autres Swap Force.",
    catchphrase: "Clean and Serene!",
    attacks: {
      primary: {
        name: "Cutlass Slash",
        description: "Frappe l'ennemi avec une épée.",
      },
      secondary: {
        name: "Tentacle Slam",
        description: "Frappe l'ennemi avec une tentacule.",
      },
      upgradePaths: {
        path1: {
          name: "Water Mastery",
          upgrades: [
            {
              name: "Ink Trail",
              description:
                "Lance une traînée d'encre sur l'ennemi.",
              cost: 100,
            },
            {
              name: "Tsunami Wave",
              description:
                "Inflige des dégâts massifs et crée une vague.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Speed Boost",
          upgrades: [
            {
              name: "Swift Strike",
              description: "Augmente la vitesse d'attaque.",
              cost: 50,
            },
            {
              name: "Lightning Reflexes",
              description: "Permet de se déplacer rapidement.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Whirlpool Form",
      description:
        "Inflige des dégâts massifs et crée un tourbillon.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 7, max: 10 },
      armor: { base: 6, max: 10 },
      critical: { base: 6, max: 10 },
      elemental: { base: 7, max: 10 },
    },
    releasedYear: 2013,
    images: {
      character: "water pirate octopus",
      figurine: "swap force water figurine",
    },
    trivia: [
      "Haut et bas magnétiques interchangeables",
      "16 combinaisons possibles avec autres Swap Force",
    ],
  },
  {
    id: "snap-shot-trapmaster",
    name: "Snap Shot",
    element: "Water",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Crocosaure chasseur de têtes et shérif des Skylands. Armé de son Traptanium Bow, il capture les vilains.",
    catchphrase: "Croc and Roll!",
    attacks: {
      primary: {
        name: "Traptanium Arrows",
        description: "Fire Traptanium arrows.",
      },
      secondary: {
        name: "Crystal Slam",
        description: "Perform a Crystal Slam.",
      },
      basicUpgrades: [
        {
          name: "Sure Shot Croc",
          description: "Charge up a Traptanium Arrow attack.",
          cost: 500,
        },
        {
          name: "Torrential Tidepool",
          description:
            "Create a controllable Torrential Tidepool.",
          cost: 700,
        },
        {
          name: "Super Slam",
          description:
            "Charge up an extra powerful Crystal Slam.",
          cost: 900,
        },
        {
          name: "Amazing Arrow",
          description:
            "Improved Traptanium arrow does extra damage.",
          cost: 1200,
        },
      ],
      upgradePaths: {
        path1: {
          name: "Crackshot Croc",
          upgrades: [
            {
              name: "Arrowsplosion",
              description:
                "Traptanium Arrows now explode on impact.",
              cost: 1700,
            },
            {
              name: "Traptanium Flechette",
              description:
                "Shards of Traptanium splinter off arrows, doing extra damage.",
              cost: 2200,
            },
            {
              name: "Hydro Arrow",
              description:
                "Charge up a Water Element-infused Traptanium arrow.",
              cost: 3000,
            },
          ],
        },
        path2: {
          name: "Tide Turner",
          upgrades: [
            {
              name: "Big Wave Torrent",
              description:
                "Torrential Tidepool is bigger and does more damage.",
              cost: 1700,
            },
            {
              name: "Water Trap",
              description:
                "Enemies caught in Torrential Tidepool become trapped.",
              cost: 2200,
            },
            {
              name: "What's Kraken?",
              description:
                "Torrential Tidepool now calls forth the power of the Kraken.",
              cost: 3000,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "A Shard Act to Follow",
      description:
        "A Crystal Slam in the air creates a new Traptanium attack.",
      cost: 4000,
    },
    stats: {
      health: { base: 290, max: 580 },
      speed: { base: 70, max: 118 },
      armor: { base: 24, max: 54 },
      critical: { base: 30, max: 80 },
      elemental: { base: 46, max: 96 },
    },
    releasedYear: 2014,
    images: {
      character: "water crocodile",
      figurine: "trap master water figurine",
    },
    trivia: [
      "Leader des Trap Masters",
      "Peut déverrouiller les Traptanium Gates",
      "Soul Gem trouvé à Phoenix Psanctuary",
    ],
    variants: ["dark-snap-shot-trapmaster"],
  },
  {
    id: "dark-snap-shot-trapmaster",
    name: "Snap Shot",
    element: "Water",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Dark",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Version Dark exclusive du crocosaure chasseur de têtes. Cette variante rare est entourée de ténèbres mystiques tout en conservant sa maîtrise de l'eau.",
    catchphrase: "Croc and Roll!",
    attacks: {
      primary: {
        name: "Dark Traptanium Arrow",
        description:
          "Tire une flèche de Traptanium imprégnée d'énergie sombre.",
      },
      secondary: {
        name: "Shadow Croc Chomp",
        description:
          "Mord l'ennemi avec des crocs enveloppés d'ombres.",
      },
      upgradePaths: {
        path1: {
          name: "Dark Water Mastery",
          upgrades: [
            {
              name: "Shadow Arrow Storm",
              description:
                "Lance une salve de flèches sombres de Traptanium.",
              cost: 500,
            },
            {
              name: "Dark Tsunami Wave",
              description:
                "Inflige des dégâts massifs et crée une vague d'eau sombre.",
              cost: 700,
            },
            {
              name: "Dark Croc Master",
              description:
                "Augmente massivement les dégâts avec des ombres.",
              cost: 900,
            },
          ],
        },
        path2: {
          name: "Shadow Armor",
          upgrades: [
            {
              name: "Dark Reinforced Scale",
              description:
                "Augmente l'armure avec des écailles d'ombre.",
              cost: 500,
            },
            {
              name: "Dark Iron Scale",
              description:
                "Augmente l'armure et la résistance avec des ombres renforcées.",
              cost: 700,
            },
            {
              name: "Impenetrable Dark Scales",
              description:
                "Réduit tous les dégâts et contre-attaque avec des ombres.",
              cost: 900,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "The Ultimate Dark Trap",
      description: "Invoque un piège d'ombre et de Traptanium.",
      cost: 4000,
    },
    stats: {
      health: { base: 300, max: 600 },
      speed: { base: 75, max: 123 },
      armor: { base: 28, max: 58 },
      critical: { base: 35, max: 85 },
      elemental: { base: 50, max: 100 },
    },
    releasedYear: 2014,
    images: {
      character: "dark water crocodile",
      figurine: "dark trap master water figurine",
    },
    trivia: [
      "Variante Dark extrêmement rare",
      "Statistiques légèrement améliorées par rapport à la version normale",
      "Visuellement plus sombre avec des effets d'ombre",
    ],
  },
  {
    id: "lob-star-trapmaster",
    name: "Lob-Star",
    element: "Water",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Étoile de mer combattante armée de tentacules de Traptanium. Peut lancer ses propres étoiles comme projectiles explosifs.",
    catchphrase: "Crash the Party!",
    attacks: {
      primary: {
        name: "Starfish Bullets",
        description:
          "Lance de petites étoiles de mer explosives sur les ennemis.",
      },
      secondary: {
        name: "Star Claws",
        description:
          "Attaque au corps-à-corps avec des pinces acérées.",
      },
      upgradePaths: {
        path1: {
          name: "Shooting Star",
          upgrades: [
            {
              name: "Bouncing Stars",
              description:
                "Les étoiles ricochent sur plusieurs ennemis.",
              cost: 500,
            },
            {
              name: "Star Storm",
              description:
                "Lance une pluie d'étoiles explosives.",
              cost: 700,
            },
            {
              name: "Masterful Starfish",
              description:
                "Augmente massivement les dégâts des étoiles.",
              cost: 900,
            },
          ],
        },
        path2: {
          name: "Star Defense",
          upgrades: [
            {
              name: "Starfish Shield",
              description:
                "Crée un bouclier rotatif d'étoiles.",
              cost: 500,
            },
            {
              name: "Reinforced Carapace",
              description:
                "Augmente l'armure et la résistance.",
              cost: 700,
            },
            {
              name: "Impenetrable Defense",
              description: "Réduit tous les dégâts reçus.",
              cost: 900,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Staryu Surprise",
      description:
        "Invoque une gigantesque étoile de mer explosive.",
      cost: 4000,
    },
    stats: {
      health: { base: 270, max: 540 },
      speed: { base: 60, max: 108 },
      armor: { base: 30, max: 60 },
      critical: { base: 25, max: 75 },
      elemental: { base: 39, max: 89 },
    },
    releasedYear: 2014,
    images: {
      character: "water starfish",
      figurine: "trap master water starfish",
    },
    trivia: [
      "Ses étoiles ricochent sur les murs",
      "Peut déverrouiller les Traptanium Water Gates",
    ],
  },
  {
    id: "winterfest-lob-star-trapmaster",
    name: "Lob-Star",
    element: "Water",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Winterfest",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Version Winterfest exclusive de Lob-Star. Cette étoile de mer festive arbore des couleurs hivernales glacées et lance des étoiles givrées.",
    catchphrase: "Crash the Party!",
    attacks: {
      primary: {
        name: "Frosty Starfish Bullets",
        description:
          "Lance de petites étoiles de mer givrées qui ralentissent les ennemis.",
      },
      secondary: {
        name: "Icy Star Claws",
        description:
          "Attaque au corps-à-corps avec des pinces glacées.",
      },
      upgradePaths: {
        path1: {
          name: "Winter Shooting Star",
          upgrades: [
            {
              name: "Frozen Bouncing Stars",
              description:
                "Les étoiles givrées ricochent et gèlent les ennemis.",
              cost: 500,
            },
            {
              name: "Blizzard Star Storm",
              description:
                "Lance une tempête d'étoiles glacées.",
              cost: 700,
            },
            {
              name: "Arctic Masterful Starfish",
              description:
                "Augmente massivement les dégâts et gèle les ennemis.",
              cost: 900,
            },
          ],
        },
        path2: {
          name: "Frost Defense",
          upgrades: [
            {
              name: "Glacial Starfish Shield",
              description:
                "Crée un bouclier rotatif d'étoiles givrées.",
              cost: 500,
            },
            {
              name: "Winterfest Carapace",
              description:
                "Augmente l'armure avec une protection glacée.",
              cost: 700,
            },
            {
              name: "Frozen Impenetrable Defense",
              description:
                "Réduit tous les dégâts et gèle les attaquants.",
              cost: 900,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Winter Staryu Surprise",
      description:
        "Invoque une gigantesque étoile de mer glacée explosive.",
      cost: 4000,
    },
    stats: {
      health: { base: 280, max: 560 },
      speed: { base: 65, max: 113 },
      armor: { base: 35, max: 65 },
      critical: { base: 30, max: 80 },
      elemental: { base: 43, max: 93 },
    },
    releasedYear: 2014,
    images: {
      character: "winterfest water starfish",
      figurine: "winterfest trap master water starfish",
    },
    trivia: [
      "Variante Winterfest exclusive et très rare",
      "Thème hivernal avec effets de glace",
      "Statistiques légèrement améliorées",
    ],
  },
  {
    id: "spitfire-supercharger",
    name: "Spitfire",
    element: "Fire",
    family: "SuperCharger",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "SuperChargers",
    availableIn: ["SuperChargers", "Imaginators"],
    description:
      "Démon du volant et pilote de course légendaire. Son véhicule Hot Streak est aussi rapide que ses flammes.",
    catchphrase: "Fuel the Burn!",
    attacks: {
      primary: {
        name: "Flame Orbs",
        description: "Lance des sphères de feu sur l'ennemi.",
      },
      secondary: {
        name: "Fire Streaks",
        description: "Lance des flammes sur l'ennemi.",
      },
      upgradePaths: {
        path1: {
          name: "Flame Mastery",
          upgrades: [
            {
              name: "Inferno Burst",
              description:
                "Lance une vague de feu dévastatrice.",
              cost: 100,
            },
            {
              name: "Blazing Fury",
              description:
                "Inflige des dégâts massifs à l'ennemi.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Speed Boost",
          upgrades: [
            {
              name: "Swift Strike",
              description: "Augmente la vitesse d'attaque.",
              cost: 50,
            },
            {
              name: "Lightning Reflexes",
              description: "Permet de se déplacer rapidement.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Burnout Boost",
      description:
        "Inflige des dégâts massifs et augmente la vitesse d'attaque.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 9, max: 10 },
      armor: { base: 5, max: 10 },
      critical: { base: 7, max: 10 },
      elemental: { base: 8, max: 10 },
    },
    releasedYear: 2015,
    images: {
      character: "fire demon racer",
      figurine: "supercharger fire figurine",
    },
    trivia: [
      "Vient avec le véhicule Hot Streak",
      "Peut conduire tous les véhicules terrestres",
    ],
  },
  {
    id: "stealth-elf-series1",
    name: "Stealth Elf",
    element: "Life",
    family: "Core",
    series: ["Series 1", "Series 2", "Series 3"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Ninja elfe rapide et mortelle. Maîtresse des arts furtifs et gardienne de la forêt.",
    catchphrase: "Silent But Deadly!",
    attacks: {
      primary: {
        name: "Blade Slash",
        description: "Frappe l'ennemi avec une lame.",
      },
      secondary: {
        name: "Stealthier Decoy",
        description:
          "Crée un déguisement pour tromper l'ennemi.",
      },
      upgradePaths: {
        path1: {
          name: "Life Force",
          upgrades: [
            {
              name: "Arkeyan Stealth Tech",
              description:
                "Inflige des dégâts massifs et augmente la vitesse.",
              cost: 100,
            },
            {
              name: "Life Surge",
              description: "Régénère la santé des alliés.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Sylvan Regeneration",
      description:
        "Régénère la santé des alliés et augmente la résistance.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 9, max: 10 },
      armor: { base: 4, max: 10 },
      critical: { base: 8, max: 10 },
      elemental: { base: 6, max: 10 },
    },
    releasedYear: 2011,
    images: {
      character: "nature elf ninja",
      figurine: "stealth elf figurine",
    },
    trivia: [
      "Une des Skylanders les plus populaires",
      "Apparaît dans Skylanders Academy (série Netflix)",
    ],
  },
  {
    id: "eruptor-series1",
    name: "Eruptor",
    element: "Fire",
    family: "Core",
    series: ["Series 1", "Series 2", "Series 3"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Créature de lave explosive au tempérament volcanique. Ne le mettez pas en colère !",
    catchphrase: "Born to Burn!",
    attacks: {
      primary: {
        name: "Lava Lob",
        description: "Lance de la lave sur l'ennemi.",
      },
      secondary: {
        name: "Eruption",
        description:
          "Inflige des dégâts massifs et crée une éruption.",
      },
      upgradePaths: {
        path1: {
          name: "Flame Mastery",
          upgrades: [
            {
              name: "Inferno Burst",
              description:
                "Lance une vague de feu dévastatrice.",
              cost: 100,
            },
            {
              name: "Blazing Fury",
              description:
                "Inflige des dégâts massifs à l'ennemi.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Eruption - Mega Magma Balls",
      description:
        "Inflige des dégâts massifs et crée des boules de magma.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 5, max: 10 },
      armor: { base: 8, max: 10 },
      critical: { base: 6, max: 10 },
      elemental: { base: 9, max: 10 },
    },
    releasedYear: 2011,
    images: {
      character: "fire lava monster",
      figurine: "eruptor figurine",
    },
    trivia: [
      "Disponible dans le Starter Pack",
      "Personnage principal de Skylanders Academy",
    ],
  },
  {
    id: "pop-fizz-series1",
    name: "Pop Fizz",
    element: "Magic",
    family: "Core",
    series: ["Series 1", "Series 2"],
    variant: "Regular",
    firstGame: "Giants",
    availableIn: [
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Gremlin alchimiste fou qui adore expérimenter avec des potions. Sa potion préférée le transforme en bête sauvage !",
    catchphrase: "The Motion of the Potion!",
    attacks: {
      primary: {
        name: "Potion Lob",
        description: "Lance une potion sur l'ennemi.",
      },
      secondary: {
        name: "Beast Form",
        description: "Se transforme en bête sauvage.",
      },
      upgradePaths: {
        path1: {
          name: "Magic Mastery",
          upgrades: [
            {
              name: "Shake It!",
              description:
                "Inflige des dégâts massifs et augmente la vitesse.",
              cost: 100,
            },
            {
              name: "Magic Surge",
              description: "Régénère la santé des alliés.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Shake It!",
      description:
        "Inflige des dégâts massifs et augmente la vitesse.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 8, max: 10 },
      armor: { base: 5, max: 10 },
      critical: { base: 7, max: 10 },
      elemental: { base: 7, max: 10 },
    },
    releasedYear: 2012,
    images: {
      character: "magic gremlin potion",
      figurine: "pop fizz figurine",
    },
    trivia: [
      "Peut se transformer en bête violette",
      "Personnage très populaire chez les fans",
    ],
  },
  {
    id: "crusher-giant",
    name: "Crusher",
    element: "Earth",
    family: "Giant",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Giants",
    availableIn: [
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Golem de pierre massif qui adore écraser les choses avec son énorme marteau de roche.",
    catchphrase: "Rock and Roll!",
    attacks: {
      primary: {
        name: "Hammer Swing",
        description: "Frappe l'ennemi avec un marteau.",
      },
      secondary: {
        name: "Stone Spinners",
        description: "Lance des pierres sur l'ennemi.",
      },
      upgradePaths: {
        path1: {
          name: "Earth Mastery",
          upgrades: [
            {
              name: "Pulver-Rocks",
              description:
                "Inflige des dégâts massifs et crée des rochers.",
              cost: 100,
            },
            {
              name: "Earthquake",
              description:
                "Inflige des dégâts massifs et crée un séisme.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Granite Slam",
      description:
        "Inflige des dégâts massifs et crée un écrabouillage.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 3, max: 10 },
      armor: { base: 10, max: 10 },
      critical: { base: 5, max: 10 },
      elemental: { base: 7, max: 10 },
    },
    releasedYear: 2012,
    images: {
      character: "earth giant rock",
      figurine: "crusher giant figurine",
    },
    trivia: [
      "Un des Giants les plus imposants",
      "Existe en variante Granite Crusher",
    ],
  },
  {
    id: "cynder-series1",
    name: "Cynder",
    element: "Undead",
    family: "Core",
    series: ["Series 1", "Series 2"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Dragonne des ténèbres autrefois maléfique, maintenant héroïne des Skylands. Compagne de Spyro.",
    catchphrase: "Volts and Lightning!",
    attacks: {
      primary: {
        name: "Shadow Lightning",
        description: "Lance de la foudre sur l'ennemi.",
      },
      secondary: {
        name: "Spectral Lightning",
        description:
          "Lance de la foudre spectrale sur l'ennemi.",
      },
      upgradePaths: {
        path1: {
          name: "Lightning Mastery",
          upgrades: [
            {
              name: "Double Spooky!",
              description:
                "Inflige des dégâts massifs et augmente la vitesse.",
              cost: 100,
            },
            {
              name: "Lightning Surge",
              description: "Régénère la santé des alliés.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Haunted Ally",
      description:
        "Inflige des dégâts massifs et augmente la vitesse.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 7, max: 10 },
      armor: { base: 5, max: 10 },
      critical: { base: 7, max: 10 },
      elemental: { base: 8, max: 10 },
    },
    releasedYear: 2011,
    images: {
      character: "undead dragon dark",
      figurine: "cynder figurine",
    },
    trivia: [
      "Antagoniste devenue héroïne",
      "De la série Legend of Spyro",
    ],
  },
  {
    id: "jet-vac-series1",
    name: "Jet-Vac",
    element: "Air",
    family: "Core",
    series: ["Series 1", "Series 2"],
    variant: "Regular",
    firstGame: "Giants",
    availableIn: [
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Pilote de jet courageux, moitié oiseau moitié machine. Premier pilote des Sky Barons.",
    catchphrase: "Hawk and Awe!",
    attacks: {
      primary: {
        name: "Vac Blaster",
        description: "Lance un rayon de vac sur l'ennemi.",
      },
      secondary: {
        name: "Suction Gun",
        description: "Lance un rayon de succion sur l'ennemi.",
      },
      upgradePaths: {
        path1: {
          name: "Air Mastery",
          upgrades: [
            {
              name: "The Mulcher",
              description:
                "Inflige des dégâts massifs et crée une tornade.",
              cost: 100,
            },
            {
              name: "Air Surge",
              description: "Régénère la santé des alliés.",
              cost: 200,
            },
          ],
        },
        path2: {
          name: "Armor Boost",
          upgrades: [
            {
              name: "Reinforced Scale",
              description: "Augmente l'armure.",
              cost: 50,
            },
            {
              name: "Iron Scale",
              description:
                "Augmente l'armure et la résistance.",
              cost: 150,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Bird Blaster",
      description:
        "Inflige des dégâts massifs et augmente la vitesse.",
      cost: 300,
    },
    stats: {
      health: { base: 100, max: 150 },
      speed: { base: 8, max: 10 },
      armor: { base: 5, max: 10 },
      critical: { base: 6, max: 10 },
      elemental: { base: 7, max: 10 },
    },
    releasedYear: 2012,
    images: {
      character: "air bird jet",
      figurine: "jet vac figurine",
    },
    trivia: [
      "Dans le Starter Pack Giants",
      "Leader des Sky Barons",
    ],
  },
  // === Trap Team - Water ===
  {
    id: "echo-series1",
    name: "Echo",
    element: "Water",
    family: "Core",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Sirène guerrière capable de maîtriser les ondes sonores aquatiques. Elle peut créer des vagues de choc dévastatrices avec sa voix enchanteresse.",
    catchphrase: "Let's Make Some Noise!",
    attacks: {
      primary: {
        name: "Sonic Scream",
        description:
          "Lance une onde sonore qui traverse les ennemis.",
      },
      secondary: {
        name: "Water Echo",
        description:
          "Crée des échos aquatiques qui rebondissent sur les ennemis.",
      },
      upgradePaths: {
        path1: {
          name: "Amplified Echo",
          upgrades: [
            {
              name: "Triple Echo",
              description:
                "Les échos se multiplient trois fois.",
              cost: 1700,
            },
            {
              name: "Scream Stream",
              description:
                "Le cri sonique devient un flux continu.",
              cost: 2200,
            },
            {
              name: "Ultimate Echo",
              description:
                "Les échos explosent au contact des ennemis.",
              cost: 3000,
            },
          ],
        },
        path2: {
          name: "Siren Mastery",
          upgrades: [
            {
              name: "Tidal Wave",
              description:
                "Crée une vague déferlante qui frappe tous les ennemis.",
              cost: 1700,
            },
            {
              name: "Sonic Boom",
              description:
                "Explosion sonique massive autour d'Echo.",
              cost: 2200,
            },
            {
              name: "Tsunami Force",
              description: "Invoque un tsunami dévastateur.",
              cost: 3000,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Echoed Presence",
      description:
        "Crée des clones d'Echo qui imitent toutes ses attaques.",
      cost: 4000,
    },
    stats: {
      health: { base: 300, max: 500 },
      speed: { base: 50, max: 80 },
      armor: { base: 18, max: 48 },
      critical: { base: 50, max: 100 },
      elemental: { base: 46, max: 96 },
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Echo.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Echo.webp",
    },
    trivia: [
      "Première Trap Master Water",
      "Son arme est un Trident aquatique qui amplifie le son",
    ],
  },
  {
    id: "flip-wreck-series1",
    name: "Flip Wreck",
    element: "Water",
    family: "Core",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Dauphin acrobate maître des pirouettes aquatiques. Ancien champion de natation synchronisée devenu héros des Skylands.",
    catchphrase: "Making Waves!",
    attacks: {
      primary: {
        name: "Dolphin Blast",
        description:
          "Lance un jet d'eau puissant sur les ennemis.",
      },
      secondary: {
        name: "Flip Attack",
        description:
          "Effectue une pirouette acrobatique qui frappe les ennemis.",
      },
      upgradePaths: {
        path1: {
          name: "Aqua Acrobat",
          upgrades: [
            {
              name: "Triple Flip",
              description:
                "Effectue trois pirouettes consécutives.",
              cost: 1700,
            },
            {
              name: "Spinning Splash",
              description: "Les pirouettes créent des vagues.",
              cost: 2200,
            },
            {
              name: "Mega Flip",
              description:
                "Pirouette géante qui frappe toute la zone.",
              cost: 3000,
            },
          ],
        },
        path2: {
          name: "Water Cannon Master",
          upgrades: [
            {
              name: "Hydro Pump",
              description:
                "Le jet d'eau devient plus puissant.",
              cost: 1700,
            },
            {
              name: "Splash Zone",
              description: "Crée une zone d'éclaboussures.",
              cost: 2200,
            },
            {
              name: "Tidal Cannon",
              description: "Lance un canon d'eau dévastateur.",
              cost: 3000,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Dolphin Dynasty",
      description:
        "Invoque une formation de dauphins spectrale.",
      cost: 4000,
    },
    stats: {
      health: { base: 280, max: 480 },
      speed: { base: 60, max: 90 },
      armor: { base: 12, max: 42 },
      critical: { base: 40, max: 90 },
      elemental: { base: 39, max: 89 },
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Flip_Wreck.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Flip_Wreck.webp",
    },
    trivia: [
      "Champion de natation synchronisée des Skylands",
      "Son arme Traptanium est un anneau de plongée",
    ],
  },
  {
    id: "gill-grunt-series3",
    name: "Gill Grunt",
    element: "Water",
    family: "Core",
    series: ["Series 3"],
    variant: "Regular",
    firstGame: "Spyro's Adventure",
    availableIn: [
      "Spyro's Adventure",
      "Giants",
      "Swap Force",
      "Trap Team",
      "SuperChargers",
      "Imaginators",
    ],
    description:
      "Poisson guerrier amphibie armé d'un harpoon. Gill Grunt parcourt les océans à la recherche de sa sirène bien-aimée.",
    catchphrase: "Fear the Fish!",
    attacks: {
      primary: {
        name: "Harpoon",
        description: "Lance un harpoon acéré sur les ennemis.",
      },
      secondary: {
        name: "Water Cannon",
        description: "Tire un puissant jet d'eau.",
      },
      upgradePaths: {
        path1: {
          name: "Harpoonist",
          upgrades: [
            {
              name: "Quadent Harpoons",
              description: "Lance quatre harpoons à la fois.",
              cost: 1700,
            },
            {
              name: "Piercing Harpoons",
              description:
                "Les harpoons traversent plusieurs ennemis.",
              cost: 2200,
            },
            {
              name: "Harpoon Storm",
              description: "Pluie de harpoons sur la zone.",
              cost: 3000,
            },
          ],
        },
        path2: {
          name: "Water Weaver",
          upgrades: [
            {
              name: "Power Hose",
              description: "Jet d'eau plus puissant et rapide.",
              cost: 1700,
            },
            {
              name: "Reserve Water Tank",
              description:
                "Peut tirer plus longtemps sans recharger.",
              cost: 2200,
            },
            {
              name: "Neptune Gun",
              description:
                "Canon à eau ultime avec dégâts massifs.",
              cost: 3000,
            },
          ],
        },
      },
    },
    soulGem: {
      name: "Anchor Cannon",
      description:
        "Lance une ancre géante qui écrase les ennemis.",
      cost: 4000,
    },
    stats: {
      health: { base: 260, max: 460 },
      speed: { base: 43, max: 73 },
      armor: { base: 24, max: 54 },
      critical: { base: 50, max: 100 },
      elemental: { base: 39, max: 89 },
    },
    releasedYear: 2011,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/S3_Gill_Grunt_Promo.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/S3_Gill_Grunt_Promo.webp",
    },
    trivia: [
      "L'un des premiers Skylanders originaux",
      "À la recherche de sa sirène bien-aimée depuis toujours",
    ],
  },
  {
    id: "gil-runt-series1",
    name: "Gil Runt",
    element: "Water",
    family: "Mini",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Version miniature de Gill Grunt, tout aussi brave mais beaucoup plus petit. Ne laissez pas sa taille vous tromper, il est aussi courageux que son mentor.",
    catchphrase: "Fear the Fish!",
    attacks: {
      primary: {
        name: "Mini Harpoon",
        description: "Lance un petit harpoon rapide.",
      },
      secondary: {
        name: "Water Squirt",
        description: "Tire un jet d'eau miniature.",
      },
      upgradePaths: {
        path1: {
          name: "Tiny Terror",
          upgrades: [
            {
              name: "Double Harpoon",
              description: "Lance deux harpoons à la fois.",
              cost: 1000,
            },
            {
              name: "Sharp Shots",
              description: "Les harpoons font plus de dégâts.",
              cost: 1500,
            },
          ],
        },
        path2: {
          name: "Aqua Apprentice",
          upgrades: [
            {
              name: "Power Squirt",
              description: "Jet d'eau plus puissant.",
              cost: 1000,
            },
            {
              name: "Water Burst",
              description: "Le jet d'eau explose au contact.",
              cost: 1500,
            },
          ],
        },
      },
    },
    stats: {
      health: { base: 200, max: 350 },
      speed: { base: 50, max: 80 },
      armor: { base: 15, max: 40 },
      critical: { base: 30, max: 70 },
      elemental: { base: 25, max: 65 },
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Gil_Runt_Promo.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Gil_Runt_Promo.webp",
    },
    trivia: [
      "Version Mini de Gill Grunt",
      "Moitié de la taille, deux fois le courage",
    ],
  },
  {
    id: "thumpling-series1",
    name: "Thumpling",
    element: "Water",
    family: "Mini",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Petit baleinier intrépide qui adore sauter et créer des éclaboussures. Malgré sa petite taille, il peut créer d'énormes vagues.",
    catchphrase: "Harpoon Lagoon!",
    attacks: {
      primary: {
        name: "Belly Flop",
        description: "Saute et atterrit avec un gros splash.",
      },
      secondary: {
        name: "Splash Attack",
        description:
          "Crée une vague d'eau qui repousse les ennemis.",
      },
      upgradePaths: {
        path1: {
          name: "Splash Master",
          upgrades: [
            {
              name: "Big Splash",
              description:
                "Les éclaboussures sont plus grandes.",
              cost: 1000,
            },
            {
              name: "Tidal Thump",
              description: "Crée une mini vague dévastatrice.",
              cost: 1500,
            },
          ],
        },
        path2: {
          name: "Bouncing Bruiser",
          upgrades: [
            {
              name: "Double Jump",
              description: "Peut sauter deux fois de suite.",
              cost: 1000,
            },
            {
              name: "Mega Bounce",
              description: "Les sauts font trembler le sol.",
              cost: 1500,
            },
          ],
        },
      },
    },
    stats: {
      health: { base: 220, max: 370 },
      speed: { base: 45, max: 75 },
      armor: { base: 20, max: 45 },
      critical: { base: 25, max: 65 },
      elemental: { base: 30, max: 70 },
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Thumpling.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/1788614da378f2b6308310138e9033256059ffd3/Skylanders/Trap%20Team/Eau/Thumpling.webp",
    },
    trivia: [
      "Version Mini de Thumback",
      "Le plus petit des baleines des Skylands",
    ],
  },
  {
    id: "knight-light",
    name: "Knight Light",
    element: "Lumière",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Knight Light est un chevalier de lumière courageux et noble qui manie son épée de lumière pour combattre les ténèbres et protéger Skylands.",
    catchphrase: "Shine bright!",
    attacks: {
      primary: {
        name: "Light Slash",
        description:
          "Frappe les ennemis avec son épée de lumière.",
      },
      secondary: {
        name: "Radiant Charge",
        description:
          "Charge en ligne droite et inflige des dégâts à tous les ennemis sur son passage.",
      },
      upgradePaths: {
        path1: {
          name: "Blinding Strike",
          upgrades: [
            {
              name: "Solar Slash",
              description:
                "Une frappe de lumière qui inflige plus de dégâts.",
              cost: 1000,
            },
            {
              name: "Luminescent Spin",
              description:
                "Tourne avec son épée, frappant tous les ennemis autour.",
              cost: 1500,
            },
          ],
        },
        path2: {
          name: "Radiant Defender",
          upgrades: [
            {
              name: "Shield of Light",
              description:
                "Augmente sa défense et réduit les dégâts reçus.",
              cost: 1000,
            },
            {
              name: "Blinding Aura",
              description:
                "Éblouit les ennemis proches, les ralentissant.",
              cost: 1500,
            },
          ],
        },
      },
    },
    stats: {
      health: { base: 300, max: 500 },
      speed: { base: 50, max: 80 },
      armor: { base: 30, max: 60 },
      critical: { base: 20, max: 50 },
      elemental: { base: 40, max: 75 },
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/Lumi%C3%A8re/Knight_Light_Promo.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/Lumi%C3%A8re/Spotlight_.webp",
    },
    trivia: [
      "Knight Light est l’un des Trap Masters introduits dans Trap Team.",
      "Sa mission principale est de protéger Skylands des forces des ténèbres.",
    ],
  },
  {
    id: "knight-mare",
    name: "Knight Mare",
    element: "Ténèbres",
    family: "Trap Master",
    series: ["Series 1"],
    variant: "Regular",
    firstGame: "Trap Team",
    availableIn: ["Trap Team", "SuperChargers", "Imaginators"],
    description:
      "Knight Mare est un chevalier des ténèbres imposant et mystérieux, maniant son épée sombre pour semer la peur chez ses ennemis et protéger Skylands.",
    catchphrase: "Embrace the darkness!",
    attacks: {
      primary: {
        name: "Shadow Slash",
        description:
          "Frappe les ennemis avec son épée sombre, infligeant des dégâts d’ombre.",
      },
      secondary: {
        name: "Dark Charge",
        description:
          "Charge en ligne droite, projetant une onde d’ombre qui touche tous les ennemis sur son chemin.",
      },
      upgradePaths: {
        path1: {
          name: "Nightmare Strike",
          upgrades: [
            {
              name: "Phantom Slash",
              description:
                "Une frappe d’ombre puissante qui inflige des dégâts accrus.",
              cost: 1000
            },
            {
              name: "Shadow Spin",
              description:
                "Tourne avec son épée sombre, frappant tous les ennemis autour.",
              cost: 1500
            }
          ]
        },
        path2: {
          name: "Dark Defender",
          upgrades: [
            {
              name: "Armor of Shadows",
              description:
                "Augmente sa défense et réduit les dégâts reçus.",
              cost: 1000
            },
            {
              name: "Nightmare Aura",
              description:
                "Éblouit les ennemis proches avec des ténèbres, les ralentissant.",
              cost: 1500
            }
          ]
        }
      }
    },
    stats: {
      health: { base: 320, max: 520 },
      speed: { base: 45, max: 75 },
      armor: { base: 35, max: 65 },
      critical: { base: 25, max: 55 },
      elemental: { base: 50, max: 80 }
    },
    releasedYear: 2014,
    images: {
      character:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/T%C3%A9n%C3%A8bres/Knight_Mare_Promo.webp",
      figurine:
        "https://raw.githubusercontent.com/nocito-streaming/skylanders-images/c4f15cc58bda569ce675ce40bbe149240a6c8639/Skylanders/Trap%20Team/T%C3%A9n%C3%A8bres/Knight_Mare_Promo.webp"
    },
    trivia: [
      "Knight Mare est le pendant maléfique de Knight Light, spécialisé dans l’élément Ténèbres.",
      "Il a été introduit dans Trap Team comme l’un des Trap Masters les plus redoutables."
    ]
  }

];

// Utilitaires
export const elements: Element[] = [
  "Fire",
  "Water",
  "Life",
  "Undead",
  "Magic",
  "Tech",
  "Earth",
  "Air",
];

export const families: Family[] = [
  "Core",
  "Giant",
  "LightCore",
  "Swap Force",
  "Trap Master",
  "SuperCharger",
  "Sensei",
  "Mini",
  "Eon's Elite",
];

export const games: Game[] = [
  "Spyro's Adventure",
  "Giants",
  "Swap Force",
  "Trap Team",
  "SuperChargers",
  "Imaginators",
];

// Informations sur les jeux
export interface GameInfo {
  id: string;
  title: Game;
  releaseYear: number;
  platforms: string[];
  description: string;
  newFeature: string;
  newFamily?: Family;
  totalSkylanders: number;
  coverImage: string;
}

export const gamesInfo: GameInfo[] = [
  {
    id: "spyros-adventure",
    title: "Spyro's Adventure",
    releaseYear: 2011,
    platforms: ["PS3", "Xbox 360", "Wii", "3DS", "PC"],
    description:
      "Le premier jeu Skylanders qui a révolutionné le gaming avec la technologie Toys-to-Life.",
    newFeature:
      "Portal of Power - Figurines physiques deviennent jouables",
    newFamily: "Core",
    totalSkylanders: 32,
    coverImage: "skylanders adventure game",
  },
  {
    id: "giants",
    title: "Giants",
    releaseYear: 2012,
    platforms: ["PS3", "Xbox 360", "Wii", "Wii U", "3DS"],
    description:
      "Introduction des Giants, des Skylanders deux fois plus grands avec des capacités spéciales.",
    newFeature: "Giants - Personnages géants, LightCore",
    newFamily: "Giant",
    totalSkylanders: 24,
    coverImage: "skylanders giants game",
  },
  {
    id: "swap-force",
    title: "Swap Force",
    releaseYear: 2013,
    platforms: [
      "PS3",
      "PS4",
      "Xbox 360",
      "Xbox One",
      "Wii",
      "Wii U",
      "3DS",
    ],
    description:
      "Des Skylanders modulables dont le haut et le bas peuvent être échangés !",
    newFeature:
      "Swap Force - Personnages magnétiques interchangeables",
    newFamily: "Swap Force",
    totalSkylanders: 32,
    coverImage: "skylanders swap force game",
  },
  {
    id: "trap-team",
    title: "Trap Team",
    releaseYear: 2014,
    platforms: [
      "PS3",
      "PS4",
      "Xbox 360",
      "Xbox One",
      "Wii",
      "Wii U",
      "3DS",
      "Tablet",
    ],
    description:
      "Capturez les vilains dans des cristaux Traptanium et jouez avec eux !",
    newFeature:
      "Trap Masters + Traps - Capturez et jouez les vilains",
    newFamily: "Trap Master",
    totalSkylanders: 18,
    coverImage: "skylanders trap team game",
  },
  {
    id: "superchargers",
    title: "SuperChargers",
    releaseYear: 2015,
    platforms: [
      "PS3",
      "PS4",
      "Xbox 360",
      "Xbox One",
      "Wii",
      "Wii U",
      "3DS",
    ],
    description:
      "Course à haute vitesse avec des véhicules Skylanders sur terre, mer et ciel !",
    newFeature: "Véhicules jouables - SuperChargers + Vehicles",
    newFamily: "SuperCharger",
    totalSkylanders: 20,
    coverImage: "skylanders superchargers game",
  },
  {
    id: "imaginators",
    title: "Imaginators",
    releaseYear: 2016,
    platforms: [
      "PS3",
      "PS4",
      "Xbox 360",
      "Xbox One",
      "Wii U",
      "Switch",
    ],
    description:
      "Créez votre propre Skylander personnalisé avec des millions de combinaisons possibles !",
    newFeature: "Création de personnage - Imaginator Crystals",
    newFamily: "Sensei",
    totalSkylanders: 31,
    coverImage: "skylanders imaginators game",
  },
];