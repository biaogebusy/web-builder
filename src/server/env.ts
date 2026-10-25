/** Read a positive integer tuning knob from the environment, or fall back to the default. */
export function readPositiveInteger(name: string, fallback: number): number {
  const parsed = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
