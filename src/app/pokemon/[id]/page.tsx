import { PokemonDetailPage } from "@/views/pokemon-detail";

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  return <PokemonDetailPage pokemonId={params.id} />;
}
