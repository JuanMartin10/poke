"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PokemonCard } from "@/components";
import { Button } from "@/components/ui";
import type { PokemonWithDetails } from "@/types";
import { usePokemonList } from "@/views/pokemon-list/hooks/usePokemonList";
import { FilterBar } from "./components";
import { usePokemonListContext } from "@/contexts";

export function PokemonListPage() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { state, updateScrollPosition } = usePokemonListContext();

  const {
    pokemon,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
    isSearching
  } = usePokemonList(state.filters);

  useEffect(() => {
    if (state.scrollPosition > 0 && scrollContainerRef.current) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: state.scrollPosition,
          behavior: "instant"
        });
      }, 100);

      return () => clearTimeout(timer);
    }
    return () => {};
  }, [state.scrollPosition]);

  useEffect(() => {
    const handleScroll = () => {
      updateScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrollPosition]);

  return (
    <div ref={scrollContainerRef} className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Pokédex</h1>
      </div>

      <FilterBar />

      {isSearching && (
        <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          <span>Buscando...</span>
        </div>
      )}

      {isLoading && (
        <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2 text-sm">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          <span>Cargando...</span>
        </div>
      )}
      {isError && (
        <div className="container mx-auto py-8">
          <div className="text-center">
            <p className="text-destructive text-lg">
              Error al cargar los Pokémon
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              {error instanceof Error ? error.message : "Error desconocido"}
            </p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Reintentar
            </Button>
          </div>
        </div>
      )}

      {!pokemon && !isLoading && !isError && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground text-lg">
            No se encontraron Pokémon
          </p>
        </div>
      )}

      {pokemon && pokemon.length > 0 && !isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pokemon.map((poke: PokemonWithDetails) => (
              <PokemonCard
                key={poke.id}
                pokemon={poke}
                onClick={() => router.push(`/pokemon/${poke.id}`)}
              />
            ))}
          </div>

          {!state.filters.searchTerm && (
            <div ref={loadMoreRef} className="mt-8 flex justify-center">
              {isFetchingNextPage && (
                <div className="text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent">
                    <span className="sr-only">Cargando más...</span>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Cargando más Pokémon...
                  </p>
                </div>
              )}
              {!hasNextPage && (
                <p className="text-muted-foreground text-sm">
                  ¡Has visto todos los Pokémon!
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
