import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, Card, colors, Field, Label, Segmented } from '../components/ui';
import { useGames } from '../lib/games';
import { DEFAULT_RULES, Mode, newId, Rules } from '../lib/scoring';

const HAND_OPTIONS: { label: string; value: number | null }[] = [
  { label: '5', value: 5 },
  { label: '7', value: 7 },
  { label: '9', value: 9 },
  { label: '11', value: 11 },
  { label: 'Sınırsız', value: null },
];

export default function NewGame() {
  const router = useRouter();
  const { addGame } = useGames();
  const [mode, setMode] = useState<Mode>('single');
  const [names, setNames] = useState(['', '', '', '']);
  const [playerCount, setPlayerCount] = useState(4);
  const [targetHands, setTargetHands] = useState<number | null>(11);
  const [rules, setRules] = useState<Rules>(DEFAULT_RULES);
  const [showRules, setShowRules] = useState(false);

  const count = mode === 'pairs' ? 4 : playerCount;

  const setName = (i: number, v: string) => setNames((ns) => ns.map((n, j) => (j === i ? v : n)));
  const setRule = (key: keyof Rules, v: string) => {
    const n = parseInt(v.replace(/\D/g, ''), 10);
    setRules((r) => ({ ...r, [key]: Number.isNaN(n) ? 0 : n }));
  };

  const start = () => {
    const id = newId();
    addGame({
      id,
      createdAt: Date.now(),
      mode,
      players: names.slice(0, count).map((n, i) => n.trim() || `Oyuncu ${i + 1}`),
      targetHands,
      rules,
      hands: [],
      finished: false,
    });
    router.replace(`/game/${id}`);
  };

  const placeholder = (i: number) => {
    if (mode === 'pairs') return `${i < 2 ? '1. Takım' : '2. Takım'} – Oyuncu ${(i % 2) + 1}`;
    return `Oyuncu ${i + 1}`;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Card>
          <Label>Oyun türü</Label>
          <Segmented
            options={[
              { label: 'Tekli', value: 'single' },
              { label: 'Eşli (2’ye 2)', value: 'pairs' },
            ]}
            value={mode}
            onChange={setMode}
          />
          {mode === 'single' && (
            <>
              <Label>Oyuncu sayısı</Label>
              <Segmented
                options={[2, 3, 4].map((n) => ({ label: String(n), value: n }))}
                value={playerCount}
                onChange={setPlayerCount}
              />
            </>
          )}
        </Card>

        <Card>
          <Label>Oyuncular</Label>
          {Array.from({ length: count }, (_, i) => (
            <View key={i}>
              {mode === 'pairs' && i % 2 === 0 && (
                <Text style={styles.teamTitle}>{i === 0 ? '1. Takım' : '2. Takım'}</Text>
              )}
              <Field
                value={names[i]}
                onChangeText={(v) => setName(i, v)}
                placeholder={placeholder(i)}
                maxLength={16}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
          ))}
        </Card>

        <Card>
          <Label>Kaç el oynanacak?</Label>
          <Segmented options={HAND_OPTIONS} value={targetHands} onChange={setTargetHands} />
        </Card>

        <Card>
          <Pressable onPress={() => setShowRules((s) => !s)} style={styles.rulesHeader}>
            <Label>Kurallar</Label>
            <Text style={styles.rulesToggle}>{showRules ? 'Gizle' : 'Düzenle'}</Text>
          </Pressable>
          {showRules ? (
            <>
              <RuleField label="Açmayan cezası" value={rules.noOpenPenalty} onChange={(v) => setRule('noOpenPenalty', v)} />
              <RuleField label="Bitiren (eksi puan)" value={rules.finishBonus} onChange={(v) => setRule('finishBonus', v)} />
              <RuleField label="Ek ceza (işlek / okey atma)" value={rules.extraPenalty} onChange={(v) => setRule('extraPenalty', v)} />
              <Text style={styles.note}>
                Okeyle, elden veya çiftle bitirmenin her biri o eldeki puanları ikiye katlar. Çift açan oyuncunun
                cezası da ikiye katlanır.
              </Text>
            </>
          ) : (
            <Text style={styles.note}>
              Açmayan {rules.noOpenPenalty} · Bitiren −{rules.finishBonus} · Ek ceza {rules.extraPenalty}
            </Text>
          )}
        </Card>

        <Button title="Oyunu Başlat" onPress={start} style={{ backgroundColor: colors.gold }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function RuleField({ label, value, onChange }: { label: string; value: number; onChange: (v: string) => void }) {
  return (
    <View style={styles.ruleRow}>
      <Text style={styles.ruleLabel}>{label}</Text>
      <Field value={String(value)} onChangeText={onChange} keyboardType="number-pad" style={styles.ruleInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 14, paddingBottom: 40 },
  teamTitle: { fontSize: 14, fontWeight: '700', color: colors.felt, marginBottom: 6, marginTop: 4 },
  rulesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rulesToggle: { color: colors.blue, fontWeight: '700' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  ruleLabel: { fontSize: 15, color: colors.ink, flex: 1 },
  ruleInput: { width: 90, textAlign: 'right' },
  note: { fontSize: 13, color: colors.muted, lineHeight: 19 },
});
