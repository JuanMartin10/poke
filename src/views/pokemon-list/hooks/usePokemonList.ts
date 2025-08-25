import { useMemo, useRef, useEffect } from "react";
import {
  usePokemonInfiniteQuery,
  usePokemonSearchQuery,
  usePokemonByGenerationQuery,
  usePokemonByTypeQuery
} from "@/lib/api/queries/pokemon";
import { useDebounce } from "@/hooks";
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
  const debouncedSearchTerm = useDebounce(searchTerm || "", 500);

  const {
    data: infiniteData,
    isLoading: isLoadingInfinite,
    isError: isErrorInfinite,
    error: errorInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = usePokemonInfiniteQuery(
    !(searchTerm || debouncedSearchTerm || selectedGeneration || selectedType)
  );

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch
  } = usePokemonSearchQuery(debouncedSearchTerm);

  const {
    data: generationData,
    isLoading: isLoadingGeneration,
    isError: isErrorGeneration,
    error: errorGeneration
  } = usePokemonByGenerationQuery(selectedGeneration || "");

  const {
    data: typeData,
    isLoading: isLoadingType,
    isError: isErrorType,
    error: errorType
  } = usePokemonByTypeQuery(selectedType || "");

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const infiniteScrollPokemon = useMemo((): PokemonWithDetails[] => {
    if (!infiniteData) return [];
    return infiniteData.pages.flatMap((page) => page.pokemon);
  }, [infiniteData]);

  const pokemon = useMemo((): PokemonWithDetails[] => {
    let allPokemon: PokemonWithDetails[] = [];

    if (debouncedSearchTerm) {
      allPokemon = searchData || [];
    } else if (selectedType && selectedGeneration) {
      const typeList = typeData || [];
      const generationList = generationData || [];
      allPokemon = typeList.filter((pokemon) =>
        generationList.some((genPokemon) => genPokemon.id === pokemon.id)
      );
    } else if (selectedType) {
      allPokemon = typeData || [];
    } else if (selectedGeneration) {
      allPokemon = generationData || [];
    } else {
      allPokemon = infiniteScrollPokemon;
    }

    return allPokemon.sort(
      (a: PokemonWithDetails, b: PokemonWithDetails) => a.id - b.id
    );
  }, [
    debouncedSearchTerm,
    searchData,
    infiniteScrollPokemon,
    selectedType,
    selectedGeneration,
    generationData,
    typeData
  ]);

  useEffect(() => {
    if (
      searchTerm ||
      debouncedSearchTerm ||
      selectedGeneration ||
      selectedType ||
      !hasNextPage ||
      isFetchingNextPage
    )
      return;

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
  }, [
    searchTerm,
    debouncedSearchTerm,
    selectedGeneration,
    selectedType,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  ]);

  const isLoading = selectedType
    ? isLoadingType
    : selectedGeneration
      ? isLoadingGeneration
      : searchTerm || debouncedSearchTerm
        ? isLoadingSearch
        : isLoadingInfinite;

  const isError = selectedType
    ? isErrorType
    : selectedGeneration
      ? isErrorGeneration
      : searchTerm || debouncedSearchTerm
        ? isErrorSearch
        : isErrorInfinite;

  const error = selectedType
    ? errorType
    : selectedGeneration
      ? errorGeneration
      : searchTerm || debouncedSearchTerm
        ? errorSearch
        : errorInfinite;

  const isSearching = searchTerm !== debouncedSearchTerm;

  return {
    pokemon,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
    isSearching
  };
}
