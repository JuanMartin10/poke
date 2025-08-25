"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { PokemonListProvider } from "@/contexts";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="poke-ui-theme"
    >
      <QueryProvider>
        <PokemonListProvider>{children}</PokemonListProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
