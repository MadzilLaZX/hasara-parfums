export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Accepts 01XXXXXXXXX or +8801XXXXXXXXX / 8801XXXXXXXXX (BD mobile, operator digit 3-9). */
export function isValidBdPhone(value: string): boolean {
  const digits = value.trim().replace(/[\s-]/g, "");
  return /^(\+?880|0)1[3-9]\d{8}$/.test(digits);
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
