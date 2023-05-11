import { red, green, blue } from './core';

export function luminance(color: number): number {
  const rgba = [red(color), green(color), blue(color)];
  const rgba2 = [];

  for (let i = 0; i < 3; i++) {
    let rgb = rgba[i] / 255;

    if (rgb < 0.03928) {
      rgb = rgb / 12.92;
    } else {
      rgb = Math.pow((rgb + 0.055) / 1.055, 2.4);
    }

    rgba2.push(rgb);
  }

  return 0.2126 * rgba2[0] + 0.7152 * rgba2[1] + 0.0722 * rgba2[2];
}

export function lightness(color: number): number {
  const [r, g, b] = [red(color), green(color), blue(color)];

  return (r * 299 + g * 587 + b * 114) / 1000 / 255;
}

export function contrastRatio(background: number, foreground: number): number {
  const backgroundLum = luminance(background) + 0.05;
  const foregroundLum = luminance(foreground) + 0.05;

  return (
    Math.max(backgroundLum, foregroundLum) /
    Math.min(backgroundLum, foregroundLum)
  );
}
