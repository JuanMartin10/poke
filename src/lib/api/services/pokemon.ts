import { api } from "../api";
import type {
  Pokemon,
  PokemonSpecies,
  PokemonWithDetails,
  PokemonPageResponse
} from "@/types";

async function getPokemon(id: number): Promise<Pokemon> {
  try {
    return await api.get<Pokemon>(`/pokemon/${id}`);
  } catch {
    throw new Error(`Failed to fetch Pokemon ${id}`);
  }
}

async function getPokemonSpecies(id: number): Promise<PokemonSpecies> {
  try {
    return await api.get<PokemonSpecies>(`/pokemon-species/${id}`);
  } catch {
    throw new Error(`Failed to fetch Pokemon species ${id}`);
  }
}

async function getPokemonDetails(id: number): Promise<PokemonWithDetails> {
  try {
    const [pokemon, species] = await Promise.all([
      getPokemon(id),
      getPokemonSpecies(id)
    ]);

    return {
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: pokemon.types.map((t) => t.type.name),
      generation: species.generation.name
    };
  } catch {
    return {
      id,
      name: `pokemon-${id}`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      types: [],
      generation: "unknown"
    };
  }
}

export async function getPokemonPage(
  page: number,
  pageSize: number = 20
): Promise<PokemonPageResponse> {
  try {
    const startId = page * pageSize + 1;
    const endId = Math.min(startId + pageSize - 1, 1000);

    if (startId > 1000) {
      return {
        pokemon: [],
        hasMore: false
      };
    }

    const promises = [];

    for (let i = startId; i <= endId; i++) {
      promises.push(getPokemonDetails(i));
    }

    const pokemon = await Promise.all(promises);
    const hasMore = endId < 1000;
    const nextPage = hasMore ? page + 1 : undefined;

    return {
      pokemon: pokemon.sort((a, b) => a.id - b.id),
      nextPage,
      hasMore
    };
  } catch {
    throw new Error("Failed to fetch Pokemon page");
  }
}
