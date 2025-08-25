import { useMemo, useRef, useEffect } from "react";
import { usePokemonInfiniteQuery } from "@/lib/api/queries/pokemon";
import type { PokemonWithDetails } from "@/types";

interface UsePokemonListOptions {
  searchTerm?: string;
  selectedType?: string;
  selectedGeneration?: string;
}

export function usePokemonList({
  searchTerm,
  selectedType,
  selectedGeneration
}: UsePokemonListOptions = {}) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePokemonInfiniteQuery();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const pokemon = useMemo((): PokemonWithDetails[] => {
    if (!data) return [];

    const allPokemon = data.pages.flatMap((page) => page.pokemon);

    const filteredPokemon = allPokemon.filter((pokemon: PokemonWithDetails) => {
      if (
        searchTerm &&
        !pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (selectedType && !pokemon.types.includes(selectedType)) {
        return false;
      }

      if (selectedGeneration && pokemon.generation !== selectedGeneration) {
        return false;
      }

      return true;
    });

    return filteredPokemon.sort(
      (a: PokemonWithDetails, b: PokemonWithDetails) => a.id - b.id
    );
  }, [data, searchTerm, selectedType, selectedGeneration]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    pokemon,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef
  };
}
