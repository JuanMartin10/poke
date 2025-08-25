"use client";

import { useState, useEffect } from "react";
import {
  usePokemonTypesQuery,
  usePokemonGenerationsQuery
} from "@/lib/api/queries/pokemon";
import {
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button
} from "@/components/ui";

interface FilterBarProps {
  onFiltersChange: (filters: {
    searchTerm: string;
    selectedType: string;
    selectedGeneration: string;
  }) => void;
}

export function FilterBar({ onFiltersChange }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("");

  const { data: availableTypes = [] } = usePokemonTypesQuery();
  const { data: availableGenerations = [] } = usePokemonGenerationsQuery();

  const formatGeneration = (generation: string) => {
    return generation.replace("generation-", "Gen ").toUpperCase();
  };

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  useEffect(() => {
    onFiltersChange({
      searchTerm,
      selectedType,
      selectedGeneration
    });
  }, [searchTerm, selectedType, selectedGeneration, onFiltersChange]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedGeneration("");
  };

  const hasActiveFilters = searchTerm || selectedType || selectedGeneration;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row">
          <div className="flex-1 sm:max-w-sm">
            <SearchInput
              placeholder="Buscar Pokémon (incluye evoluciones)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm("")}
            />
          </div>

          <div className="flex gap-4">
            <div className="min-w-[160px]">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {availableTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatType(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[160px]">
              <Select
                value={selectedGeneration}
                onValueChange={setSelectedGeneration}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Generación" />
                </SelectTrigger>
                <SelectContent>
                  {availableGenerations.map((generation) => (
                    <SelectItem key={generation} value={generation}>
                      {formatGeneration(generation)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full sm:w-auto"
          >
            <span className="mr-2">✕</span>
            Limpiar filtros
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-3 py-1 text-sm">
              <span>Búsqueda: &quot;{searchTerm}&quot;</span>
              <button
                onClick={() => setSearchTerm("")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">✕</span>
              </button>
            </div>
          )}
          {selectedType && (
            <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-3 py-1 text-sm">
              <span>Tipo: {formatType(selectedType)}</span>
              <button
                onClick={() => setSelectedType("")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">✕</span>
              </button>
            </div>
          )}
          {selectedGeneration && (
            <div className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-3 py-1 text-sm">
              <span>Generación: {formatGeneration(selectedGeneration)}</span>
              <button
                onClick={() => setSelectedGeneration("")}
                className="hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">✕</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
