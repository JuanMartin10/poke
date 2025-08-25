"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (
      theme === "system" &&
      systemTheme &&
      !localStorage.getItem("poke-ui-theme")
    ) {
      setTheme(systemTheme);
    }
  }, [theme, systemTheme, setTheme]);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        🌙
      </Button>
    );
  }

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const currentTheme = resolvedTheme || theme;

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
