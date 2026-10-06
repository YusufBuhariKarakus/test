import { describe, expect, it } from '@jest/globals';

import { DEFAULT_RULES, emptyPlayerHand, Game, Hand, handScores, leaders, playerTotals, teamTotals } from '../scoring';

function hand(partial: Partial<Hand> & { players: Hand['players'] }): Hand {
  return { id: 'h', winner: null, okeyFinish: false, eldenFinish: false, pairsFinish: false, ...partial };
}

const opened = (remaining: number, pairs = false) => ({ ...emptyPlayerHand(), remaining, pairs });
const closed = () => ({ ...emptyPlayerHand(), opened: false });

describe('handScores', () => {
  it('normal bitiriş: bitiren -101, açan kalan taşı, açmayan 202 yer', () => {
    const h = hand({ winner: 0, players: [opened(0), opened(35), closed(), opened(12)] });
    expect(handScores(h, DEFAULT_RULES)).toEqual([-101, 35, 202, 12]);
  });

  it('çift açanın cezası ikiye katlanır', () => {
    const h = hand({ winner: 1, players: [opened(20, true), opened(0), opened(20), closed()] });
    expect(handScores(h, DEFAULT_RULES)).toEqual([40, -101, 20, 202]);
  });

  it('okeyle bitirince herkesin puanı ikiye katlanır', () => {
    const h = hand({ winner: 2, okeyFinish: true, players: [opened(10), closed(), opened(0), opened(5, true)] });
    expect(handScores(h, DEFAULT_RULES)).toEqual([20, 404, -202, 20]);
  });

  it('elden + okeyle bitirince puanlar dörde katlanır', () => {
    const h = hand({ winner: 0, okeyFinish: true, eldenFinish: true, players: [opened(0), closed(), opened(10)] });
    expect(handScores(h, DEFAULT_RULES)).toEqual([-404, 808, 40]);
  });

  it('kimse bitirmezse çarpan uygulanmaz, okey işaretleri yok sayılır', () => {
    const h = hand({ winner: null, okeyFinish: true, players: [opened(30), closed()] });
    expect(handScores(h, DEFAULT_RULES)).toEqual([30, 202]);
  });

  it('ek cezalar katlanmadan eklenir, bitirene de yazılabilir', () => {
    const h = hand({
      winner: 0,
      okeyFinish: true,
      players: [{ ...opened(0), extraPenalties: 1 }, { ...opened(10), extraPenalties: 2 }],
    });
    expect(handScores(h, DEFAULT_RULES)).toEqual([-202 + 101, 20 + 202]);
  });

  it('özel kurallarla hesaplar', () => {
    const rules = { noOpenPenalty: 150, finishBonus: 50, extraPenalty: 100 };
    const h = hand({ winner: 0, players: [opened(0), closed()] });
    expect(handScores(h, rules)).toEqual([-50, 150]);
  });
});

describe('toplamlar', () => {
  const game: Game = {
    id: 'g',
    createdAt: 0,
    mode: 'pairs',
    players: ['A', 'B', 'C', 'D'],
    targetHands: 11,
    rules: DEFAULT_RULES,
    finished: false,
    hands: [
      hand({ winner: 0, players: [opened(0), opened(10), opened(20), closed()] }),
      hand({ winner: 2, players: [opened(5), opened(15), opened(0), opened(30)] }),
    ],
  };

  it('oyuncu toplamlarını hesaplar', () => {
    expect(playerTotals(game)).toEqual([-96, 25, -81, 232]);
  });

  it('eşli oyunda takım toplamlarını hesaplar (1-2 ve 3-4)', () => {
    expect(teamTotals(game)).toEqual([-71, 151]);
  });

  it('en düşük puan lider olur, eşitlikte hepsi', () => {
    expect(leaders([10, -5, 30])).toEqual([1]);
    expect(leaders([7, 7, 9])).toEqual([0, 1]);
  });
});
