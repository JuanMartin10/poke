export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

export interface PokemonType {
  type: {
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
