import Image from "next/image";
import { Card, CardContent } from "@/components/ui";
import {
  cn,
  formatPokemonId,
  formatPokemonName,
  formatGeneration,
  getTypeColor,
  formatTypeName
} from "@/lib/utils";
import type { Pokemon, PokemonSpecies } from "@/types";

interface PokemonInfoProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

export function PokemonInfo({ pokemon, species }: PokemonInfoProps) {
  const pokemonImage =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Card>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative h-64 w-64">
              {pokemonImage ? (
                <Image
                  src={pokemonImage}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="256px"
                  priority
                />
              ) : (
                <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">Sin imagen</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl font-bold">
                  {formatPokemonName(pokemon.name)}
                </h2>
                <span className="text-muted-foreground text-xl">
                  {formatPokemonId(pokemon.id)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Generación</h3>
              <span className="bg-muted text-muted-foreground rounded-lg px-3 py-1">
                {formatGeneration(species.generation.name)}
              </span>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold">Tipos</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((typeData) => (
                  <span
                    key={typeData.type.name}
                    className={cn(
                      "rounded-full px-4 py-2 font-medium text-white",
                      getTypeColor(typeData.type.name)
                    )}
                  >
                    {formatTypeName(typeData.type.name)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
