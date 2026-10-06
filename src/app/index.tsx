import { useRouter } from 'expo-router';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, colors } from '../components/ui';
import { useGames } from '../lib/games';
import { leaders, playerTotals } from '../lib/scoring';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { games, loaded, deleteGame } = useGames();

  const confirmDelete = (id: string) =>
    Alert.alert('Oyunu sil', 'Bu oyun ve tüm elleri silinecek.', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => deleteGame(id) },
    ]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <FlatList
        data={games}
        keyExtractor={(g) => g.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          loaded ? (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Henüz oyun yok</Text>
              <Text style={styles.emptyText}>
                Kâğıt kalemle hesap yapmaya son. Yeni bir oyun başlat, her elin sonunda puanları gir; toplamı
                uygulama hesaplasın.
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          const totals = playerTotals(item);
          const lead = item.hands.length ? leaders(totals) : [];
          return (
            <Pressable
              onPress={() => router.push(`/game/${item.id}`)}
              onLongPress={() => confirmDelete(item.id)}
              style={({ pressed }) => [styles.item, pressed && { opacity: 0.85 }]}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.mode === 'pairs' ? 'Eşli' : 'Tekli'} oyun</Text>
                <Text style={[styles.badge, item.finished && styles.badgeDone]}>
                  {item.finished ? 'Bitti' : `${item.hands.length}${item.targetHands ? `/${item.targetHands}` : ''} el`}
                </Text>
              </View>
              <Text style={styles.itemPlayers}>
                {item.players.map((p, i) => `${lead.includes(i) ? '👑 ' : ''}${p} (${totals[i]})`).join('  ·  ')}
              </Text>
              <Text style={styles.itemDate}>{new Date(item.createdAt).toLocaleString('tr-TR')}</Text>
            </Pressable>
          );
        }}
      />
      {games.length > 0 && <Text style={styles.hint}>Silmek için oyuna basılı tut</Text>}
      <Button title="+ Yeni Oyun" onPress={() => router.push('/new')} style={styles.newButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 12, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, paddingTop: 80 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: colors.white, marginBottom: 8 },
  emptyText: { fontSize: 15, color: '#CFE5DA', textAlign: 'center', lineHeight: 22 },
  item: { backgroundColor: colors.tile, borderRadius: 14, padding: 14, gap: 6 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { fontSize: 17, fontWeight: '800', color: colors.ink },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    backgroundColor: colors.blue,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  badgeDone: { backgroundColor: colors.muted },
  itemPlayers: { fontSize: 14, color: colors.ink },
  itemDate: { fontSize: 12, color: colors.muted },
  hint: { textAlign: 'center', color: '#9CC5B0', fontSize: 12, marginBottom: 8 },
  newButton: { marginHorizontal: 16, backgroundColor: colors.gold },
});
