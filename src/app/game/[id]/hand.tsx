import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card, colors, Field, Label, Segmented, Stepper, Toggle } from '../../../components/ui';
import { useGame, useGames } from '../../../lib/games';
import { emptyPlayerHand, finishMultiplier, Hand, handScores, newId } from '../../../lib/scoring';

export default function HandScreen() {
  const { id, handId } = useLocalSearchParams<{ id: string; handId?: string }>();
  const game = useGame(id);
  const { updateGame } = useGames();
  const router = useRouter();

  const existing = game?.hands.find((h) => h.id === handId);
  const [hand, setHand] = useState<Hand>(
    () =>
      existing ?? {
        id: newId(),
        winner: null,
        okeyFinish: false,
        eldenFinish: false,
        pairsFinish: false,
        players: (game?.players ?? []).map(emptyPlayerHand),
      }
  );
  // Kullanıcının yazdığı metni ayrı tutuyoruz ki boş alan "0" olarak görünmesin.
  const [remainingText, setRemainingText] = useState<string[]>(() =>
    hand.players.map((p) => (existing && p.opened ? String(p.remaining) : ''))
  );

  if (!game) return null;

  const scores = handScores(hand, game.rules);
  const mult = finishMultiplier(hand);

  const setPlayer = (i: number, patch: Partial<Hand['players'][number]>) =>
    setHand((h) => ({ ...h, players: h.players.map((p, j) => (j === i ? { ...p, ...patch } : p)) }));

  const setRemaining = (i: number, text: string) => {
    const digits = text.replace(/\D/g, '');
    setRemainingText((ts) => ts.map((t, j) => (j === i ? digits : t)));
    setPlayer(i, { remaining: digits ? parseInt(digits, 10) : 0 });
  };

  const save = () => {
    updateGame(game.id, (g) => ({
      ...g,
      hands: existing ? g.hands.map((h) => (h.id === hand.id ? hand : h)) : [...g.hands, hand],
    }));
    router.back();
  };

  const handNumber = existing ? game.hands.indexOf(existing) + 1 : game.hands.length + 1;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: `${handNumber}. El` }} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Card>
          <Label>Kim bitirdi?</Label>
          <Segmented
            options={[
              ...game.players.map((p, i) => ({ label: p, value: i as number | null })),
              { label: 'Kimse', value: null },
            ]}
            value={hand.winner}
            onChange={(winner) => setHand((h) => ({ ...h, winner }))}
          />
          {hand.winner !== null && (
            <>
              <Label>Nasıl bitirdi?</Label>
              <View style={styles.wrap}>
                <Toggle label="Okey atarak" value={hand.okeyFinish} onChange={(v) => setHand((h) => ({ ...h, okeyFinish: v }))} />
                <Toggle label="Elden" value={hand.eldenFinish} onChange={(v) => setHand((h) => ({ ...h, eldenFinish: v }))} />
                <Toggle label="Çift ile" value={hand.pairsFinish} onChange={(v) => setHand((h) => ({ ...h, pairsFinish: v }))} />
              </View>
              {mult > 1 && <Text style={styles.mult}>Bu elde puanlar ×{mult}</Text>}
            </>
          )}
        </Card>

        {game.players.map((name, i) => {
          const p = hand.players[i];
          const isWinner = hand.winner === i;
          return (
            <Card key={i}>
              <View style={styles.playerHeader}>
                <Text style={styles.playerName}>
                  {isWinner ? '🏁 ' : ''}
                  {name}
                </Text>
                <Text style={[styles.playerScore, scores[i] < 0 && { color: colors.felt }]}>
                  {scores[i] > 0 ? '+' : ''}
                  {scores[i]}
                </Text>
              </View>

              {!isWinner && (
                <>
                  <Segmented
                    options={[
                      { label: 'Açtı', value: 'opened' },
                      { label: `Açamadı (${game.rules.noOpenPenalty})`, value: 'closed' },
                    ]}
                    value={p.opened ? 'opened' : 'closed'}
                    onChange={(v) => setPlayer(i, { opened: v === 'opened' })}
                  />
                  {p.opened && (
                    <View style={styles.remainingRow}>
                      <Field
                        value={remainingText[i]}
                        onChangeText={(t) => setRemaining(i, t)}
                        placeholder="Elde kalan taş toplamı"
                        keyboardType="number-pad"
                        style={{ flex: 1, minWidth: 0 }}
                      />
                      <Toggle label="Çift açtı" value={p.pairs} onChange={(v) => setPlayer(i, { pairs: v })} />
                    </View>
                  )}
                </>
              )}

              <Stepper
                label={`Ek ceza (${game.rules.extraPenalty})`}
                value={p.extraPenalties}
                onChange={(v) => setPlayer(i, { extraPenalties: v })}
              />
            </Card>
          );
        })}

        <Button title={existing ? 'Değişiklikleri Kaydet' : 'Eli Kaydet'} onPress={save} style={{ backgroundColor: colors.gold }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12, paddingBottom: 40 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  mult: { color: colors.red, fontWeight: '800' },
  playerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerName: { fontSize: 18, fontWeight: '800', color: colors.ink },
  playerScore: { fontSize: 20, fontWeight: '900', color: colors.red, fontVariant: ['tabular-nums'] },
  remainingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
