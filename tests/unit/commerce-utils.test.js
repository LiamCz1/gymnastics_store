import { describe, expect, it } from 'vitest';
import {
  calculateCheckoutTotals,
  calculateLessonTotals,
  normalizeCart
} from '../../src/commerce-utils.js';

describe('normalizeCart', () => {
  it('keeps product IDs and clamps invalid quantities', () => {
    expect(normalizeCart([
      { id: 'beam', quantity: 3 },
      { id: 'grips', quantity: 0 },
      { id: 'chalk-ball-set', quantity: 'bad' },
      null
    ])).toEqual([
      { id: 'beam', quantity: 3 },
      { id: 'grips', quantity: 1 },
      { id: 'chalk-ball-set', quantity: 1 }
    ]);
  });
});

describe('calculateCheckoutTotals', () => {
  it('applies tax after a valid promo discount and shipping', () => {
    const totals = calculateCheckoutTotals(100, 0, 'train10', { code: 'TRAIN10', percent: 10 });

    expect(totals.discountAmount).toBe(10);
    expect(totals.discountedSubtotal).toBe(90);
    expect(totals.estimatedTax).toBeCloseTo(7.65);
    expect(totals.finalTotal).toBeCloseTo(97.65);
    expect(totals.isValidPromo).toBe(true);
  });

  it('does not apply an invalid promo code', () => {
    const totals = calculateCheckoutTotals(40, 5.99, 'wrong', { code: 'TRAIN10', percent: 10 });

    expect(totals.discountAmount).toBe(0);
    expect(totals.finalTotal).toBeCloseTo(49.89915);
    expect(totals.isValidPromo).toBe(false);
  });
});

describe('calculateLessonTotals', () => {
  it('calculates a lesson discount without adding shipping or tax', () => {
    const totals = calculateLessonTotals(80, 'COACH25', { code: 'coach25', percent: 25 });

    expect(totals).toEqual({
      baseTotal: 80,
      discountAmount: 20,
      finalTotal: 60,
      isValidPromo: true
    });
  });
});
