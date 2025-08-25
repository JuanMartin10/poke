import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData
} from "@tanstack/react-query";
import {
  getPokemonPage,
  searchPokemonByName,
  getPokemonTypes,
  getPokemonGenerations,
  getPokemonByType,
  getPokemonByGeneration,
  getPokemonDetail
} from "../services/pokemon";
import type {
  PokemonPageResponse,
  PokemonWithDetails,
  Pokemon,
  PokemonSpecies
} from "@/types";

export function usePokemonInfiniteQuery(enabled: boolean = true) {
  return useInfiniteQuery<
    PokemonPageResponse,
    Error,
    InfiniteData<PokemonPageResponse>,
    string[],
    number
  >({
    queryKey: ["pokemon", "infinite"],
    queryFn: ({ pageParam = 0 }) => getPokemonPage(pageParam as number, 20),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2
  });
}

export function usePokemonTypesQuery() {
  return useQuery<string[], Error>({
    queryKey: ["pokemon", "types"],
    queryFn: getPokemonTypes,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  });
}

export function usePokemonGenerationsQuery() {
  return useQuery<string[], Error>({
    queryKey: ["pokemon", "generations"],
    queryFn: getPokemonGenerations,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  });
}

export function usePokemonByTypeQuery(type: string) {
  return useQuery<PokemonWithDetails[], Error>({
    queryKey: ["pokemon", "type", type],
    queryFn: ({ signal }) => getPokemonByType(type, signal),
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}

export function usePokemonByGenerationQuery(generation: string) {
  return useQuery<PokemonWithDetails[], Error>({
    queryKey: ["pokemon", "generation", generation],
    queryFn: ({ signal }) => getPokemonByGeneration(generation, signal),
    enabled: !!generation,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
}

export function usePokemonSearchQuery(searchTerm: string) {
  return useQuery<PokemonWithDetails[], Error>({
    queryKey: ["pokemon", "search", searchTerm],
    queryFn: ({ signal }) => searchPokemonByName(searchTerm, signal),
    enabled: !!searchTerm && searchTerm.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1
  });
}

export function usePokemonDetailQuery(pokemonId: string) {
  return useQuery<
    {
      pokemon: Pokemon;
      species: PokemonSpecies;
      evolutions: PokemonWithDetails[];
    },
    Error
  >({
    queryKey: ["pokemon", "detail", pokemonId],
    queryFn: () => getPokemonDetail(pokemonId),
    enabled: !!pokemonId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2
  });
}
