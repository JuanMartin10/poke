"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { PokemonWithDetails } from "@/types";

interface PokemonCardProps {
  pokemon: PokemonWithDetails;
  onClick?: () => void;
}

const typeColors: Record<string, string> = {
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

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const formatPokemonId = (id: number) => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  const formatPokemonName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatGeneration = (generation: string) => {
    return generation.replace("generation-", "Gen ").toUpperCase();
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
        onClick && "hover:bg-accent/5"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm font-medium">
            {formatPokemonId(pokemon.id)}
          </span>
          <span className="text-muted-foreground text-xs">
            {formatGeneration(pokemon.generation)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative h-24 w-24">
            {pokemon.image ? (
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain"
                sizes="96px"
              />
            ) : (
              <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                <span className="text-muted-foreground text-xs">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {formatPokemonName(pokemon.name)}
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={cn(
                "rounded-full px-2 py-1 text-xs font-medium text-white",
                typeColors[type] || "bg-gray-400"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
