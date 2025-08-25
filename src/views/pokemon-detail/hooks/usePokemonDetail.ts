import type { Pokemon, PokemonSpecies, PokemonWithDetails } from "@/types";
import { usePokemonDetailQuery } from "@/lib/api/queries/pokemon";

interface UsePokemonDetailReturn {
  pokemon: Pokemon | undefined;
  species: PokemonSpecies | undefined;
  evolutions: PokemonWithDetails[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePokemonDetail(pokemonId: string): UsePokemonDetailReturn {
  const { data, isLoading, isError, error } = usePokemonDetailQuery(pokemonId);

  return {
    pokemon: data?.pokemon,
    species: data?.species,
    evolutions: data?.evolutions,
    isLoading,
    isError,
    error
  };
}
