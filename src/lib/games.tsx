import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import { Game } from './scoring';

const STORAGE_KEY = 'okey101.games.v1';

interface GamesContextValue {
  games: Game[];
  loaded: boolean;
  addGame: (game: Game) => void;
  updateGame: (id: string, update: (game: Game) => Game) => void;
  deleteGame: (id: string) => void;
}

const GamesContext = createContext<GamesContextValue | null>(null);

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setGames(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(games)).catch(() => {});
  }, [games, loaded]);

  const addGame = useCallback((game: Game) => setGames((gs) => [game, ...gs]), []);
  const updateGame = useCallback(
    (id: string, update: (game: Game) => Game) =>
      setGames((gs) => gs.map((g) => (g.id === id ? update(g) : g))),
    []
  );
  const deleteGame = useCallback((id: string) => setGames((gs) => gs.filter((g) => g.id !== id)), []);

  return (
    <GamesContext.Provider value={{ games, loaded, addGame, updateGame, deleteGame }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames(): GamesContextValue {
  const ctx = useContext(GamesContext);
  if (!ctx) throw new Error('useGames must be used inside GamesProvider');
  return ctx;
}

export function useGame(id: string | undefined): Game | undefined {
  return useGames().games.find((g) => g.id === id);
}
