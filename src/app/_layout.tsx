import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../components/ui';
import { GamesProvider } from '../lib/games';

export default function RootLayout() {
  return (
    <GamesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.felt },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.feltDark },
          headerBackButtonDisplayMode: 'minimal',
        }}>
        <Stack.Screen name="index" options={{ title: '101 Puan' }} />
        <Stack.Screen name="new" options={{ title: 'Yeni Oyun' }} />
        <Stack.Screen name="game/[id]/index" options={{ title: 'Puan Tablosu' }} />
        <Stack.Screen name="game/[id]/hand" options={{ title: 'El Sonucu', presentation: 'modal' }} />
      </Stack>
    </GamesProvider>
  );
}
