import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getPokemonPage } from "../services/pokemon";
import type { PokemonPageResponse } from "@/types";

export function usePokemonInfiniteQuery() {
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2
  });
}
