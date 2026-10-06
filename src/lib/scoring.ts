export type Mode = 'single' | 'pairs';

export interface Rules {
  /** Eli açamayan oyuncuya yazılan ceza (genelde 202). */
  noOpenPenalty: number;
  /** Bitiren oyuncudan düşülen puan (genelde 101). */
  finishBonus: number;
  /** İşlek taş / okey atma gibi tek seferlik cezalar (genelde 101). */
  extraPenalty: number;
}

export const DEFAULT_RULES: Rules = {
  noOpenPenalty: 202,
  finishBonus: 101,
  extraPenalty: 101,
};

export interface PlayerHand {
  opened: boolean;
  /** Elde kalan taşların toplamı (sadece açan oyuncular için). */
  remaining: number;
  /** Oyuncu çift açtıysa cezası ikiye katlanır. */
  pairs: boolean;
  /** Bu elde yazılan ek ceza sayısı. */
  extraPenalties: number;
}

export interface Hand {
  id: string;
  /** Bitiren oyuncunun sırası; kimse bitirmediyse null. */
  winner: number | null;
  okeyFinish: boolean;
  eldenFinish: boolean;
  pairsFinish: boolean;
  players: PlayerHand[];
}

export interface Game {
  id: string;
  createdAt: number;
  mode: Mode;
  players: string[];
  /** Oynanacak el sayısı; null ise sınırsız. */
  targetHands: number | null;
  rules: Rules;
  hands: Hand[];
  finished: boolean;
}

export function emptyPlayerHand(): PlayerHand {
  return { opened: true, remaining: 0, pairs: false, extraPenalties: 0 };
}

/** Okeyle, elden veya çiftle bitirmenin her biri cezaları ikiye katlar. */
export function finishMultiplier(hand: Hand): number {
  if (hand.winner === null) return 1;
  return (hand.okeyFinish ? 2 : 1) * (hand.eldenFinish ? 2 : 1) * (hand.pairsFinish ? 2 : 1);
}

export function handScores(hand: Hand, rules: Rules): number[] {
  const mult = finishMultiplier(hand);
  return hand.players.map((p, i) => {
    const extra = p.extraPenalties * rules.extraPenalty;
    if (i === hand.winner) return -rules.finishBonus * mult + extra;
    const base = p.opened ? p.remaining * (p.pairs ? 2 : 1) : rules.noOpenPenalty;
    return base * mult + extra;
  });
}

export function playerTotals(game: Game): number[] {
  const totals = game.players.map(() => 0);
  for (const hand of game.hands) {
    handScores(hand, game.rules).forEach((s, i) => {
      totals[i] += s;
    });
  }
  return totals;
}

/** Eşli oyunda 1-2. oyuncular birinci, 3-4. oyuncular ikinci takımdır. */
export function teamOf(playerIndex: number): number {
  return playerIndex < 2 ? 0 : 1;
}

export function teamTotals(game: Game): number[] {
  const totals = [0, 0];
  playerTotals(game).forEach((t, i) => {
    totals[teamOf(i)] += t;
  });
  return totals;
}

/** En düşük puan kazanır. Eşitlikte hepsi lider sayılır. */
export function leaders(totals: number[]): number[] {
  const min = Math.min(...totals);
  return totals.flatMap((t, i) => (t === min ? [i] : []));
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
