import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeCtx = createContext<ThemeContextValue>({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeCtx);
}

function getInitialMode(): Mode {
  try {
    const stored = localStorage.getItem("theme-mode");
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try { localStorage.setItem("theme-mode", next); } catch {}
      return next;
    });
  }, []);

  return (
    <ThemeCtx.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeCtx.Provider>
  );
}
