import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getPokemonPage,
  getPokemonTypes,
  getPokemonGenerations,
  getPokemonDetail,
  searchPokemonByName,
  getPokemonByType,
  getPokemonByGeneration
} from "@/lib/api/services/pokemon";

export const pokemonRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        pageSize: z.number().default(20),
        cursor: z.number().nullish()
      })
    )
    .query(async ({ input }) => {
      const page = input.cursor || 0;
      const result = await getPokemonPage(page, input.pageSize);
      return {
        pokemon: result.pokemon,
        nextCursor: result.nextPage,
        hasMore: result.hasMore
      };
    }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await getPokemonDetail(input.id);
    }),

  search: publicProcedure
    .input(z.object({ searchTerm: z.string().min(1) }))
    .query(async ({ input }) => {
      return await searchPokemonByName(input.searchTerm);
    }),

  getTypes: publicProcedure.query(async () => {
    return await getPokemonTypes();
  }),

  getGenerations: publicProcedure.query(async () => {
    return await getPokemonGenerations();
  }),

  getByType: publicProcedure
    .input(z.object({ type: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getPokemonByType(input.type);
    }),

  getByGeneration: publicProcedure
    .input(z.object({ generation: z.string().min(1) }))
    .query(async ({ input }) => {
      return await getPokemonByGeneration(input.generation);
    })
});
