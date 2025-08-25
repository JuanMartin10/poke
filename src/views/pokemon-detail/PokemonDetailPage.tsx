"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { usePokemonDetail } from "./hooks/usePokemonDetail";
import { PokemonInfo } from "./components/PokemonInfo";
import { PokemonEvolutions } from "./components/PokemonEvolutions";
import { PokemonStats } from "./components/PokemonStats";

interface PokemonDetailPageProps {
  pokemonId: string;
}

export function PokemonDetailPage({ pokemonId }: PokemonDetailPageProps) {
  const router = useRouter();
  const { pokemon, species, evolutions, isLoading, isError, error } =
    usePokemonDetail(pokemonId);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent">
            <span className="sr-only">Cargando...</span>
          </div>
          <p className="text-muted-foreground mt-4 text-lg">
            Cargando información del Pokémon...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg text-red-600">
            Error al cargar el Pokémon: {error?.message}
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Volver al listado
          </Button>
        </div>
      </div>
    );
  }

  if (!pokemon || !species) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-lg">Pokémon no encontrado</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Volver al listado
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          ← Volver
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">Pokédex</h1>
      </div>

      <div className="space-y-8">
        <PokemonInfo pokemon={pokemon} species={species} />

        {evolutions && evolutions.length > 1 && (
          <PokemonEvolutions
            evolutions={evolutions}
            currentPokemonId={pokemon.id}
          />
        )}

        <PokemonStats stats={pokemon.stats} />
      </div>
    </div>
  );
}
