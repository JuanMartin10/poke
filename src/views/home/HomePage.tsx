"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Separator, ThemeToggle } from "@/components";
import { cn } from "@/lib/utils";

export function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div></div>
          <ThemeToggle />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Next.js Professional Setup
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Arquitectura escalable con TypeScript, TailwindCSS y Radix UI
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Componentes Base</CardTitle>
            <CardDescription>
              Componentes accesibles construidos con Radix UI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="tu@email.com" type="email" />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="destructive" size="sm">
                  Destructive
                </Button>
                <Button variant="link" size="sm">
                  Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema de Estilos</CardTitle>
            <CardDescription>
              TailwindCSS con variables CSS personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-primary" />
                <span className="text-sm">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-secondary" />
                <span className="text-sm">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-accent" />
                <span className="text-sm">Accent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-muted" />
                <span className="text-sm">Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Herramientas de Desarrollo</CardTitle>
            <CardDescription>
              ESLint, Prettier y TypeScript configurados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full bg-green-500")} />
                <span>TypeScript Strict Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full bg-green-500")} />
                <span>ESLint + Prettier</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full bg-green-500")} />
                <span>Path Aliases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full bg-green-500")} />
                <span>Barrel Exports</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
