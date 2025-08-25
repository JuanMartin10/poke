import { PokemonDetailPage } from "@/views/pokemon-detail";

interface PokemonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { id } = await params;
  return <PokemonDetailPage pokemonId={id} />;
}
