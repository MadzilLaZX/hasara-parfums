export const VALID_COUPON_CODE = "HASARA30";
export const COUPON_DISCOUNT_RATE = 0.3;

export interface CouponResult {
  valid: boolean;
  code: string;
  discountRate: number;
}

export function checkCoupon(input: string): CouponResult {
  const code = input.trim().toUpperCase();
  const valid = code === VALID_COUPON_CODE;
  return { valid, code, discountRate: valid ? COUPON_DISCOUNT_RATE : 0 };
}

export function computeDiscount(subtotal: number, discountRate: number): number {
  return Math.round(subtotal * discountRate);
}
