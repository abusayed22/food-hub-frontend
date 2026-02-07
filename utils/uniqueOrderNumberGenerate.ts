// lib/utils.ts

export function generateOrderNumber(): string {
  // 1. Get today's date in YYYYMMDD format
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // "20260205"

  // 2. Generate 4 random alphanumeric characters (A-Z, 0-9)
  // We use base 36 to get numbers and letters
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

  // 3. Combine them
  return `ORD-${datePart}-${randomPart}`;
}