import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import type { PokemonStat } from "@/types";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const statNames: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed"
};

const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-purple-500"
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  const maxStatValue = 255;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => {
            const statName = stat.stat.name;
            const displayName =
              statNames[statName] ||
              statName.charAt(0).toUpperCase() + statName.slice(1);
            const percentage = (stat.base_stat / maxStatValue) * 100;
            const colorClass = statColors[statName] || "bg-gray-500";

            return (
              <div key={statName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-muted-foreground font-mono">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="font-mono text-lg font-semibold">
                {stats.reduce((total, stat) => total + stat.base_stat, 0)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
