export interface Pokemon {
  id: number;
  name: string;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonListResponse {
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  generation: {
    name: string;
  };
  evolution_chain: {
    url: string;
  };
}

export interface PokemonWithDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
  generation: string;
}

export interface PokemonPageResponse {
  pokemon: PokemonWithDetails[];
  nextPage?: number | undefined;
  hasMore: boolean;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionChainNode;
}

export interface EvolutionChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainNode[];
}

export interface PokemonEvolution {
  id: number;
  name: string;
  evolutionFamily: string[];
}

export interface PokemonTypeResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonGenerationResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface GenerationDetails {
  id: number;
  name: string;
  pokemon_species: {
    name: string;
    url: string;
  }[];
}

export interface TypeDetails {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
}
