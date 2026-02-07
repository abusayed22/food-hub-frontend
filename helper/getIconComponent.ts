// lib/icon-map.ts or top of your component
import { 
  Utensils, 
  Coffee, 
  Leaf, 
  Flame, 
  Sparkles, 
  WheatOff,
  Pizza,
  Fish,
  Soup,
  IceCream,
  CircleHelp // Fallback icon
} from "lucide-react"

// 1. Define the Map
export const iconMap: Record<string, React.ElementType> = {
  Utensils,
  Coffee,
  Leaf,
  Vegan: Leaf,
  Flame,
  Hot: Flame,
  Sparkles,
  WheatOff,
  GlutenFree: WheatOff,
  Pizza,
  Fish,
  Soup,
  Desserts: IceCream,
}

// 2. Helper function to safely get the icon
export const getIconComponent = (iconName: string | undefined | null) => {
  if (!iconName) return Utensils;
  return iconMap[iconName] || Utensils;
}