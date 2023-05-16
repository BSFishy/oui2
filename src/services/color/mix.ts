import { red, green, blue } from './core';

export function mix(color1: number, color2: number, weight: number): number {
  // TODO: this weight calculation seems redundant
  const w = 2 * weight - 1;
  const w1 = (w + 1) / 2.0;
  const w2 = 1 - w1;

  const mixNumber = (n1, n2) => Number(Math.round(n1 * w1 + n2 * w2));

  const [r1, g1, b1] = [red(color1), green(color1), blue(color1)];
  const [r2, g2, b2] = [red(color2), green(color2), blue(color2)];

  const [r, g, b] = [mixNumber(r1, r2), mixNumber(g1, g2), mixNumber(b1, b2)];

  return (r << 16) + (g << 8) + b;
}

export function tint(color: number, percent: number): number {
  return mix(0xffffff, color, percent);
}

export function shade(color: number, percent: number): number {
  return mix(0x000000, color, percent);
}
