import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type GameStats = {
  score: number;
  taps: number;
  doubleTaps: number;
  longPressDone: boolean;
  dragged: boolean;
  flingRight: boolean;
  flingLeft: boolean;
  pinched: boolean;
  ownTaskDone: boolean;
};

type GameContextType = {
  stats: GameStats;
  theme: ThemeMode;
  addScore: (points: number) => void;
  registerTap: () => void;
  registerDoubleTap: () => void;
  registerLongPress: () => void;
  registerDrag: () => void;
  registerFlingRight: () => void;
  registerFlingLeft: () => void;
  registerPinch: () => void;
  registerOwnTask: () => void;
  toggleTheme: () => void;
  resetGame: () => void;
};

const defaultStats: GameStats = {
  score: 0,
  taps: 0,
  doubleTaps: 0,
  longPressDone: false,
  dragged: false,
  flingRight: false,
  flingLeft: false,
  pinched: false,
  ownTaskDone: false,
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [theme, setTheme] = useState<ThemeMode>("light");

  const value = useMemo<GameContextType>(
    () => ({
      stats,
      theme,

      addScore: (points) => {
        setStats((prev) => ({ ...prev, score: prev.score + points }));
      },

      registerTap: () => {
        setStats((prev) => ({
          ...prev,
          taps: prev.taps + 1,
          score: prev.score + 1,
        }));
      },

      registerDoubleTap: () => {
        setStats((prev) => ({
          ...prev,
          doubleTaps: prev.doubleTaps + 1,
          score: prev.score + 2,
        }));
      },

      registerLongPress: () => {
        setStats((prev) => ({
          ...prev,
          longPressDone: true,
          score: prev.score + 5,
        }));
      },

      registerDrag: () => {
        setStats((prev) => ({ ...prev, dragged: true }));
      },

      registerFlingRight: () => {
        setStats((prev) => ({
          ...prev,
          flingRight: true,
          score: prev.score + Math.floor(Math.random() * 10) + 1,
        }));
      },

      registerFlingLeft: () => {
        setStats((prev) => ({
          ...prev,
          flingLeft: true,
          score: prev.score + Math.floor(Math.random() * 10) + 1,
        }));
      },

      registerPinch: () => {
        setStats((prev) => ({
          ...prev,
          pinched: true,
          score: prev.score + 3,
        }));
      },

      registerOwnTask: () => {
        setStats((prev) => ({
          ...prev,
          ownTaskDone: true,
          score: prev.score + 10,
        }));
      },

      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      },

      resetGame: () => {
        setStats(defaultStats);
      },
    }),
    [stats, theme],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }

  return context;
}
