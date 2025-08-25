"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui";
import {
  cn,
  formatPokemonId,
  formatPokemonName,
  formatGeneration,
  getTypeColor,
  formatTypeName
} from "@/lib/utils";
import type { PokemonWithDetails } from "@/types";

interface PokemonCardProps {
  pokemon: PokemonWithDetails;
  onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
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
          {pokemon.generation && (
            <span className="text-muted-foreground text-xs">
              {formatGeneration(pokemon.generation)}
            </span>
          )}
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

        {pokemon.types.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium text-white",
                  getTypeColor(type)
                )}
              >
                {formatTypeName(type)}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
