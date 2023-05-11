export function red(color: number): number {
  return (color & 0xff0000) >> 16;
}

export function green(color: number): number {
  return (color & 0x00ff00) >> 8;
}

export function blue(color: number): number {
  return color & 0x0000ff;
}
