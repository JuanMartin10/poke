import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  cn,
  formatPokemonName,
  formatPokemonId,
  getTypeColor,
  formatTypeName
} from "@/lib/utils";
import type { PokemonWithDetails } from "@/types";

interface PokemonEvolutionsProps {
  evolutions: PokemonWithDetails[];
  currentPokemonId: number;
}

export function PokemonEvolutions({
  evolutions,
  currentPokemonId
}: PokemonEvolutionsProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evoluciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {evolutions.map((evolution) => {
            const isCurrent = evolution.id === currentPokemonId;

            return (
              <div
                key={evolution.id}
                className={cn(
                  "rounded-lg border-2 p-4 transition-all duration-200",
                  isCurrent
                    ? "border-primary bg-primary/5 ring-primary/20 ring-2"
                    : "border-border hover:border-primary/50 cursor-pointer hover:shadow-md"
                )}
                onClick={() => {
                  if (!isCurrent) {
                    router.push(`/pokemon/${evolution.id}`);
                  }
                }}
              >
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="relative h-20 w-20">
                      {evolution.image ? (
                        <Image
                          src={evolution.image}
                          alt={evolution.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center rounded-lg">
                          <span className="text-muted-foreground text-xs">
                            Sin imagen
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="font-semibold">
                        {formatPokemonName(evolution.name)}
                      </h3>
                      {isCurrent && (
                        <div className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {formatPokemonId(evolution.id)}
                    </p>
                    {isCurrent && (
                      <p className="text-primary mt-1 text-xs font-medium">
                        Pokémon actual
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center gap-1">
                    {evolution.types.map((type) => (
                      <span
                        key={type}
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium text-white",
                          getTypeColor(type)
                        )}
                      >
                        {formatTypeName(type)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
