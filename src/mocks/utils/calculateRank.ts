export default function calculateRank(firstLineCount: number) {
  if (firstLineCount === 0) {
    const randomRankBetweenPlayerAndUser = [0, 1][Math.floor(Math.random() * 2)];
    return randomRankBetweenPlayerAndUser;
  } else if (firstLineCount === 1) {
    return 2;
  } else if (firstLineCount < 5) {
    return 3;
  } else if (firstLineCount < 8) {
    return 4;
  } else {
    return 5;
  }
}
