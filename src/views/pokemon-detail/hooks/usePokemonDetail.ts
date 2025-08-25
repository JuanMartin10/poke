import type { Pokemon, PokemonSpecies, PokemonWithDetails } from "@/types";
import { api } from "@/utils/api";

interface UsePokemonDetailReturn {
  pokemon: Pokemon | undefined;
  species: PokemonSpecies | undefined;
  evolutions: PokemonWithDetails[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: any;
}

export function usePokemonDetail(pokemonId: string): UsePokemonDetailReturn {
  const { data, isLoading, isError, error } = api.pokemon.getDetail.useQuery({
    id: pokemonId
  });

  return {
    pokemon: data?.pokemon,
    species: data?.species,
    evolutions: data?.evolutions,
    isLoading,
    isError,
    error
  };
}
