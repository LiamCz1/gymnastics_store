export function normalizeCart(cart) {
  if (!Array.isArray(cart)) return [];

  return cart
    .map(item => {
      if (!item || !item.id) return null;
      return {
        id: String(item.id),
        quantity: Math.max(1, Number(item.quantity) || 1)
      };
    })
    .filter(Boolean);
}

export function calculateCheckoutTotals(itemsSubtotal, shippingFee, promoCode, activePromo = {}) {
  const enteredCode = String(promoCode || '').trim().toUpperCase();
  const configuredCode = String(activePromo.code || '').trim().toUpperCase();
  const percent = Math.max(0, Number(activePromo.percent) || 0);
  const isValidPromo = Boolean(configuredCode && enteredCode && enteredCode === configuredCode && percent > 0);
  const discountAmount = isValidPromo ? itemsSubtotal * (percent / 100) : 0;
  const discountedSubtotal = Math.max(0, itemsSubtotal - discountAmount);
  const estimatedTax = (discountedSubtotal + shippingFee) * 0.085;

  return {
    itemsSubtotal,
    discountedSubtotal,
    discountAmount,
    shippingFee,
    estimatedTax,
    finalTotal: discountedSubtotal + shippingFee + estimatedTax,
    isValidPromo
  };
}

export function calculateLessonTotals(baseTotal, promoCode, activePromo = {}) {
  const checkout = calculateCheckoutTotals(baseTotal, 0, promoCode, activePromo);
  return {
    baseTotal,
    discountAmount: checkout.discountAmount,
    finalTotal: checkout.discountedSubtotal,
    isValidPromo: checkout.isValidPromo
  };
}
