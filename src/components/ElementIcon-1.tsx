import {
  Flame,
  Droplet,
  Sprout,
  Skull,
  Sparkles,
  Cpu,
  Mountain,
  Wind,
  Sun,
  Moon,
} from "lucide-react";
import { Element } from "../data/skylanders";

interface ElementIconProps {
  element: Element;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const elementConfig: Record<
  Element,
  { icon: any; gradient: string; name: string }
> = {
  Fire: {
    icon: Flame,
    gradient: "from-orange-500 to-red-600",
    name: "Feu",
  },
  Water: {
    icon: Droplet,
    gradient: "from-blue-400 to-cyan-500",
    name: "Eau",
  },
  Life: {
    icon: Sprout,
    gradient: "from-green-400 to-emerald-600",
    name: "Vie",
  },
  Undead: {
    icon: Skull,
    gradient: "from-purple-700 to-purple-900",
    name: "Mort-Vivant",
  },
  Magic: {
    icon: Sparkles,
    gradient: "from-purple-400 to-pink-500",
    name: "Magie",
  },
  Tech: {
    icon: Cpu,
    gradient: "from-yellow-400 to-amber-500",
    name: "Tech",
  },
  Earth: {
    icon: Mountain,
    gradient: "from-orange-700 to-yellow-700",
    name: "Terre",
  },
  Air: {
    icon: Wind,
    gradient: "from-cyan-300 to-blue-400",
    name: "Air",
  },
  Lumière: {
    icon: Sun,
    gradient: "from-yellow-300 to-yellow-500",
    name: "Lumière",
  },
  Ténèbres: {
    icon: Moon,
    gradient: "from-gray-800 to-black",
    name: "Ténèbres",
  },
};

const sizeClasses = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-xs",
  },
  md: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
    text: "text-sm",
  },
  lg: {
    container: "w-16 h-16",
    icon: "w-8 h-8",
    text: "text-base",
  },
};

export function ElementIcon({
  element,
  size = "md",
  showLabel = false,
}: ElementIconProps) {
  const config = elementConfig[element];
  const Icon = config.icon;
  const sizeClass = sizeClasses[size];

  if (showLabel) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`${sizeClass.container} rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-lg`}
        >
          <Icon className={sizeClass.icon} />
        </div>
        <span
          className={`${sizeClass.text} text-gray-700 dark:text-gray-200`}
        >
          {config.name}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass.container} rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center text-white shadow-lg`}
      title={config.name}
    >
      <Icon className={sizeClass.icon} />
    </div>
  );
}

// Component pour afficher tous les éléments
export function ElementGrid({
  onElementClick,
}: {
  onElementClick?: (element: Element) => void;
}) {
  const elements: Element[] = [
    "Fire",
    "Water",
    "Life",
    "Undead",
    "Magic",
    "Tech",
    "Earth",
    "Air",
    "Lumière",
    "Ténèbres",
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {elements.map((element) => (
        <button
          key={element}
          onClick={() => onElementClick?.(element)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <ElementIcon element={element} size="lg" />
          <span className="text-sm text-gray-700 dark:text-gray-200 group-hover:text-[#0B63D6] transition-colors">
            {elementConfig[element].name}
          </span>
        </button>
      ))}
    </div>
  );
}