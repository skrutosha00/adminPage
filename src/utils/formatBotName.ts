export function botToMultiplier(botName: string): number {
  return +botName.replace("x", "");
}

export function multiplierToBot(multiplier: number): string {
  return "x" + multiplier.toString();
}
