import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, colors } from '../../../components/ui';
import { useGame, useGames } from '../../../lib/games';
import { handScores, leaders, playerTotals, teamTotals } from '../../../lib/scoring';

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = useGame(id);
  const { updateGame } = useGames();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (!game) {
    return (
      <View style={styles.center}>
        <Text style={styles.white}>Oyun bulunamadı.</Text>
      </View>
    );
  }

  const totals = playerTotals(game);
  const isPairs = game.mode === 'pairs';
  const teams = isPairs ? teamTotals(game) : [];
  const lead = game.hands.length ? leaders(isPairs ? teams : totals) : [];
  const targetReached = game.targetHands !== null && game.hands.length >= game.targetHands;

  const deleteHand = (handId: string, index: number) =>
    Alert.alert(`${index + 1}. eli sil`, 'Bu elin puanları silinecek.', [
      { text: 'Vazgeç', style: 'cancel' },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => updateGame(game.id, (g) => ({ ...g, hands: g.hands.filter((h) => h.id !== handId) })),
      },
    ]);

  const setFinished = (finished: boolean) => updateGame(game.id, (g) => ({ ...g, finished }));

  const winnerText = isPairs
    ? lead.map((t) => `${game.players[t * 2]} & ${game.players[t * 2 + 1]}`).join(', ')
    : lead.map((i) => game.players[i]).join(', ');

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom + 12 }}>
      <Stack.Screen
        options={{
          title: game.targetHands ? `El ${game.hands.length}/${game.targetHands}` : `El ${game.hands.length}`,
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {game.finished && game.hands.length > 0 && (
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>🏆 Kazanan</Text>
            <Text style={styles.bannerName}>{winnerText}</Text>
          </View>
        )}

        {isPairs && (
          <View style={styles.teams}>
            {teams.map((t, i) => (
              <View key={i} style={[styles.teamCard, lead.includes(i) && styles.leadCard]}>
                <Text style={styles.teamName} numberOfLines={1}>
                  {lead.includes(i) ? '👑 ' : ''}
                  {game.players[i * 2]} & {game.players[i * 2 + 1]}
                </Text>
                <Text style={styles.teamTotal}>{t}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.table}>
          <View style={[styles.row, styles.headRow]}>
            <Text style={[styles.cell, styles.handCell, styles.headText]}>El</Text>
            {game.players.map((p, i) => (
              <Text key={i} style={[styles.cell, styles.headText]} numberOfLines={1}>
                {!isPairs && lead.includes(i) ? '👑' : ''}
                {p}
              </Text>
            ))}
          </View>

          {game.hands.map((hand, hi) => {
            const scores = handScores(hand, game.rules);
            return (
              <Pressable
                key={hand.id}
                onPress={() => router.push({ pathname: '/game/[id]/hand', params: { id: game.id, handId: hand.id } })}
                onLongPress={() => deleteHand(hand.id, hi)}
                style={({ pressed }) => [styles.row, hi % 2 === 1 && styles.altRow, pressed && { opacity: 0.6 }]}>
                <Text style={[styles.cell, styles.handCell]}>{hi + 1}</Text>
                {scores.map((s, pi) => (
                  <Text
                    key={pi}
                    style={[styles.cell, styles.score, pi === hand.winner && styles.winnerScore]}>
                    {s}
                  </Text>
                ))}
              </Pressable>
            );
          })}

          {game.hands.length === 0 && <Text style={styles.emptyRow}>İlk elin sonucunu girmek için “El Ekle”ye bas.</Text>}

          <View style={[styles.row, styles.totalRow]}>
            <Text style={[styles.cell, styles.handCell, styles.totalText]}>Σ</Text>
            {totals.map((t, i) => (
              <Text key={i} style={[styles.cell, styles.totalText]}>
                {t}
              </Text>
            ))}
          </View>
        </View>

        {game.hands.length > 0 && (
          <Text style={styles.hint}>Düzenlemek için ele dokun, silmek için basılı tut. En düşük puan kazanır.</Text>
        )}
      </ScrollView>

      <View style={styles.actions}>
        {game.finished ? (
          <Button title="Oyuna Devam Et" variant="secondary" onPress={() => setFinished(false)} style={{ flex: 1 }} />
        ) : (
          <>
            <Button
              title="Oyunu Bitir"
              variant={targetReached ? 'primary' : 'secondary'}
              onPress={() => setFinished(true)}
              disabled={game.hands.length === 0}
              style={{ flex: 1 }}
            />
            {!targetReached && (
              <Button
                title="+ El Ekle"
                onPress={() => router.push({ pathname: '/game/[id]/hand', params: { id: game.id } })}
                style={{ flex: 1.4, backgroundColor: colors.gold }}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  white: { color: colors.white },
  content: { padding: 12, gap: 12 },
  banner: { backgroundColor: colors.gold, borderRadius: 14, padding: 16, alignItems: 'center' },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: colors.ink },
  bannerName: { fontSize: 24, fontWeight: '900', color: colors.ink, textAlign: 'center' },
  teams: { flexDirection: 'row', gap: 10 },
  teamCard: { flex: 1, backgroundColor: colors.tile, borderRadius: 14, padding: 12, alignItems: 'center' },
  leadCard: { borderWidth: 2.5, borderColor: colors.gold },
  teamName: { fontSize: 13, fontWeight: '700', color: colors.muted },
  teamTotal: { fontSize: 28, fontWeight: '900', color: colors.ink },
  table: { backgroundColor: colors.tile, borderRadius: 14, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  altRow: { backgroundColor: '#F4EBD3' },
  headRow: { backgroundColor: colors.felt },
  headText: { color: colors.white, fontWeight: '800', fontSize: 14 },
  cell: { flex: 1, textAlign: 'center', paddingHorizontal: 2, color: colors.ink, fontSize: 16 },
  handCell: { flex: 0.5, color: colors.muted, fontWeight: '700' },
  score: { fontVariant: ['tabular-nums'] },
  winnerScore: { color: colors.felt, fontWeight: '900' },
  totalRow: { borderTopWidth: 2, borderTopColor: colors.felt, backgroundColor: '#EFE3C2' },
  totalText: { fontWeight: '900', fontSize: 18, color: colors.ink },
  emptyRow: { textAlign: 'center', color: colors.muted, padding: 20, fontSize: 14 },
  hint: { color: '#9CC5B0', fontSize: 12, textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: 12, paddingTop: 8 },
});
