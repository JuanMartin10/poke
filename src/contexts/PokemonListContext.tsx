"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

interface PokemonListState {
  filters: {
    searchTerm: string;
    selectedType: string;
    selectedGeneration: string;
  };
  scrollPosition: number;
  currentPage: number;
}

type PokemonListAction =
  | { type: "UPDATE_FILTERS"; payload: PokemonListState["filters"] }
  | { type: "UPDATE_SCROLL_POSITION"; payload: number }
  | { type: "UPDATE_CURRENT_PAGE"; payload: number }
  | { type: "RESET_STATE" };

interface PokemonListContextType {
  state: PokemonListState;
  dispatch: React.Dispatch<PokemonListAction>;
  updateFilters: (filters: PokemonListState["filters"]) => void;
  updateScrollPosition: (position: number) => void;
  updateCurrentPage: (page: number) => void;
  resetState: () => void;
}

const PokemonListContext = createContext<PokemonListContextType | undefined>(
  undefined
);

const initialState: PokemonListState = {
  filters: {
    searchTerm: "",
    selectedType: "",
    selectedGeneration: ""
  },
  scrollPosition: 0,
  currentPage: 0
};

function pokemonListReducer(
  state: PokemonListState,
  action: PokemonListAction
): PokemonListState {
  switch (action.type) {
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: action.payload,
        scrollPosition: 0,
        currentPage: 0
      };
    case "UPDATE_SCROLL_POSITION":
      return {
        ...state,
        scrollPosition: action.payload
      };
    case "UPDATE_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}

export function PokemonListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokemonListReducer, initialState);

  const updateFilters = (filters: PokemonListState["filters"]) => {
    dispatch({ type: "UPDATE_FILTERS", payload: filters });
  };

  const updateScrollPosition = (position: number) => {
    dispatch({ type: "UPDATE_SCROLL_POSITION", payload: position });
  };

  const updateCurrentPage = (page: number) => {
    dispatch({ type: "UPDATE_CURRENT_PAGE", payload: page });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  const value: PokemonListContextType = {
    state,
    dispatch,
    updateFilters,
    updateScrollPosition,
    updateCurrentPage,
    resetState
  };

  return (
    <PokemonListContext.Provider value={value}>
      {children}
    </PokemonListContext.Provider>
  );
}

export function usePokemonListContext() {
  const context = useContext(PokemonListContext);
  if (context === undefined) {
    throw new Error(
      "usePokemonListContext must be used within a PokemonListProvider"
    );
  }
  return context;
}
