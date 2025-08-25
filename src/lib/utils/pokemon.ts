export const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300"
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, "0")}`;
};

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatGeneration = (generation: string): string => {
  return generation.replace("generation-", "Gen ").toUpperCase();
};

export const formatTypeName = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const getTypeColor = (type: string): string => {
  return typeColors[type] || "bg-gray-400";
};
