"use client";

import { usePokemonListContext } from "@/contexts";
import { api } from "@/utils/api";
import {
  SearchInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button
} from "@/components/ui";

export function FilterBar() {
  const { state, updateFilters } = usePokemonListContext();
  const { searchTerm, selectedType, selectedGeneration } = state.filters;

  const { data: availableTypes = [] } = api.pokemon.getTypes.useQuery();
  const { data: availableGenerations = [] } =
    api.pokemon.getGenerations.useQuery();

  const formatGeneration = (generation: string) => {
    return generation.replace("generation-", "Gen ").toUpperCase();
  };

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleSearchChange = (value: string) => {
    updateFilters({
      searchTerm: value,
      selectedType,
      selectedGeneration
    });
  };

  const handleTypeChange = (value: string) => {
    updateFilters({
      searchTerm,
      selectedType: value,
      selectedGeneration
    });
  };

  const handleGenerationChange = (value: string) => {
    updateFilters({
      searchTerm,
      selectedType,
      selectedGeneration: value
    });
  };

  const clearAllFilters = () => {
    updateFilters({
      searchTerm: "",
      selectedType: "",
      selectedGeneration: ""
    });
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
              onChange={(e) => handleSearchChange(e.target.value)}
              onClear={() => handleSearchChange("")}
            />
          </div>

          <div className="flex gap-4">
            <div className="min-w-[160px]">
              <Select value={selectedType} onValueChange={handleTypeChange}>
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
                onValueChange={handleGenerationChange}
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
                onClick={() => handleSearchChange("")}
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
                onClick={() => handleTypeChange("")}
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
                onClick={() => handleGenerationChange("")}
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
