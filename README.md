# Pokédex - Technical Test

A modern Pokédex application built with Next.js, TypeScript, and the PokéAPI.

## 🚀 Live Demo

**[View Live Application](https://poke-blush-tau.vercel.app/)**

## Features

- **Pokémon List**: Browse all Pokémon with infinite scroll (20 per batch)
- **Filters**: Filter by type and generation
- **Search**: Real-time search by name including evolutionary families
- **Detail Pages**: View comprehensive information including stats, types, and evolutions
- **Evolution Navigation**: Navigate between evolutionary forms
- **State Persistence**: Maintains filters and scroll position during navigation (resets on page refresh)
- **Dark/Light Mode**: Theme toggle with system preference detection

## Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **tRPC** - End-to-end type-safe API
- **TailwindCSS v4** - Styling
- **Radix UI** - UI components
- **TanStack Query** - Data fetching and caching (used by tRPC)
- **PokéAPI** - Pokémon data source

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/JuanMartin10/poke
   cd poke
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # API services and utilities
├── providers/          # App-level providers
├── server/             # tRPC router and procedures
├── styles/             # Global styles
├── types/              # TypeScript definitions
├── utils/              # Utility functions and API client
└── views/              # Page components
```