import { createTRPCRouter } from "@/server/api/trpc";
import { pokemonRouter } from "@/server/api/routers/pokemon";

export const appRouter = createTRPCRouter({
  pokemon: pokemonRouter
});

export type AppRouter = typeof appRouter;
