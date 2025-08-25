import { api } from "../api";
import type {
  Pokemon,
  PokemonSpecies,
  PokemonWithDetails,
  PokemonPageResponse,
  EvolutionChain,
  PokemonTypeResponse,
  PokemonGenerationResponse,
  GenerationDetails,
  TypeDetails
} from "@/types";

async function getPokemon(id: number | string): Promise<Pokemon> {
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

const evolutionCache = new Map<string, string[]>();

function extractEvolutionFamily(chain: EvolutionChain): string[] {
  const family: string[] = [];

  function traverse(node: EvolutionChain["chain"]) {
    family.push(node.species.name);
    if (node.evolves_to) {
      node.evolves_to.forEach(traverse);
    }
  }

  traverse(chain.chain);
  return family;
}

export async function getPokemonEvolutionFamily(
  pokemonName: string,
  signal?: AbortSignal
): Promise<string[]> {
  if (evolutionCache.has(pokemonName)) {
    return evolutionCache.get(pokemonName)!;
  }

  try {
    const pokemon = await api.get<Pokemon>(`/pokemon/${pokemonName}`);

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const speciesUrl = pokemon.species.url.replace(
      "https://pokeapi.co/api/v2",
      ""
    );
    const species = await api.get<PokemonSpecies>(speciesUrl);

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const evolutionChainUrl = species.evolution_chain.url.replace(
      "https://pokeapi.co/api/v2",
      ""
    );
    const evolutionChain = await api.get<EvolutionChain>(evolutionChainUrl);

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const family = extractEvolutionFamily(evolutionChain);

    family.forEach((name) => {
      evolutionCache.set(name, family);
    });

    return family;
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }
    evolutionCache.set(pokemonName, [pokemonName]);
    return [pokemonName];
  }
}

export async function getPokemonTypes(): Promise<string[]> {
  try {
    const response = await api.get<PokemonTypeResponse>("/type");
    return response.results.map((type) => type.name).sort();
  } catch {
    throw new Error("Failed to fetch Pokemon types");
  }
}

export async function getPokemonGenerations(): Promise<string[]> {
  try {
    const response = await api.get<PokemonGenerationResponse>("/generation");
    return response.results.map((gen) => gen.name).sort();
  } catch {
    throw new Error("Failed to fetch Pokemon generations");
  }
}

function convertRomanToNumber(roman: string): number | undefined {
  const romanNumerals: Record<string, number> = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
    ix: 9
  };
  return romanNumerals[roman.toLowerCase()];
}

function parseGenerationId(generation: string): number {
  if (!generation) {
    throw new Error("Generation is required");
  }

  const generationParts = generation.split("-");
  if (generationParts.length !== 2 || generationParts[0] !== "generation") {
    throw new Error(
      `Invalid generation format: ${generation}. Expected format: generation-[i-ix]`
    );
  }

  const generationRoman = generationParts[1];
  if (!generationRoman) {
    throw new Error("Generation number is required");
  }

  const generationNumber = convertRomanToNumber(generationRoman);
  if (!generationNumber) {
    throw new Error(
      `Invalid generation number: ${generationRoman}. Expected roman numeral i-ix`
    );
  }

  return generationNumber;
}

export async function getPokemonByGeneration(
  generation: string,
  signal?: AbortSignal
): Promise<PokemonWithDetails[]> {
  try {
    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const generationNumber = parseGenerationId(generation);

    const generationDetails = await api.get<GenerationDetails>(
      `/generation/${generationNumber}`
    );

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const pokemonPromises = generationDetails.pokemon_species.map(
      async (species: { name: string; url: string }) => {
        try {
          const pokemonName = species.name;
          const pokemonData = await getPokemon(pokemonName);
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image:
              pokemonData.sprites.other["official-artwork"].front_default ||
              pokemonData.sprites.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
            types: pokemonData.types.map((t) => t.type.name),
            generation: generation
          };
        } catch {
          return null;
        }
      }
    );

    const pokemonResults = await Promise.all(pokemonPromises);
    return pokemonResults
      .filter(
        (pokemon: PokemonWithDetails | null): pokemon is PokemonWithDetails =>
          pokemon !== null
      )
      .sort((a: PokemonWithDetails, b: PokemonWithDetails) => a.id - b.id);
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }
    throw new Error(`Failed to fetch Pokemon for generation ${generation}`);
  }
}

export async function getPokemonByType(
  type: string,
  signal?: AbortSignal
): Promise<PokemonWithDetails[]> {
  try {
    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const typeDetails = await api.get<TypeDetails>(`/type/${type}`);

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const pokemonPromises = typeDetails.pokemon.map(
      async ({
        pokemon: { name }
      }: {
        pokemon: { name: string };
      }): Promise<PokemonWithDetails | null> => {
        try {
          if (!name) {
            throw new Error("Pokemon name is required");
          }
          const pokemonData = await getPokemon(name);
          const speciesData = await getPokemonSpecies(pokemonData.id);
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image:
              pokemonData.sprites.other["official-artwork"].front_default ||
              pokemonData.sprites.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
            types: pokemonData.types.map((t) => t.type.name),
            generation: speciesData.generation.name
          };
        } catch {
          return null;
        }
      }
    );

    const pokemonResults = await Promise.all(pokemonPromises);
    return pokemonResults
      .filter(
        (pokemon: PokemonWithDetails | null): pokemon is PokemonWithDetails =>
          pokemon !== null
      )
      .sort((a: PokemonWithDetails, b: PokemonWithDetails) => a.id - b.id);
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }
    throw new Error(`Failed to fetch Pokemon for type ${type}`);
  }
}

export async function searchPokemonByName(
  searchTerm: string,
  signal?: AbortSignal
): Promise<PokemonWithDetails[]> {
  try {
    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const family = await getPokemonEvolutionFamily(searchTerm, signal);

    if (signal?.aborted) {
      throw new Error("Request aborted");
    }

    const familyPokemon = await Promise.all(
      family.map(async (name): Promise<PokemonWithDetails | null> => {
        try {
          const pokemonData = await getPokemon(name);
          const speciesData = await getPokemonSpecies(pokemonData.id);
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image:
              pokemonData.sprites.other["official-artwork"].front_default ||
              pokemonData.sprites.front_default,
            generation: speciesData.generation.name,
            types: pokemonData.types.map((type) => type.type.name)
          };
        } catch {
          return null;
        }
      })
    );

    return familyPokemon.filter(
      (pokemon): pokemon is PokemonWithDetails => pokemon !== null
    );
  } catch {
    return [];
  }
}

export async function getPokemonDetail(id: string): Promise<{
  pokemon: Pokemon;
  species: PokemonSpecies;
  evolutions: PokemonWithDetails[];
}> {
  const pokemon = await getPokemon(id);
  const species = await getPokemonSpecies(pokemon.id);
  const evolutionFamily = await getPokemonEvolutionFamily(pokemon.name);

  const evolutions = await Promise.all(
    evolutionFamily.map(async (name): Promise<PokemonWithDetails> => {
      const pokemonData = await getPokemon(name);
      const speciesData = await getPokemonSpecies(pokemonData.id);

      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image:
          pokemonData.sprites.other["official-artwork"].front_default ||
          pokemonData.sprites.front_default,
        generation: speciesData.generation.name,
        types: pokemonData.types.map((type) => type.type.name)
      };
    })
  );

  evolutions.sort((a, b) => a.id - b.id);

  return { pokemon, species, evolutions };
}
