"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { TRPCProvider } from "./trpc-provider";
import { PokemonListProvider } from "@/contexts";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <TRPCProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="poke-ui-theme"
      >
        <PokemonListProvider>{children}</PokemonListProvider>
      </ThemeProvider>
    </TRPCProvider>
  );
}
