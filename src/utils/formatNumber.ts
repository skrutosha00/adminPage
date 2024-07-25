export default function formatNumber(number: number | string, separator: string) {
  const [numberString, floatString] = number.toString().split(".");
  const numberArray = numberString.split("");

  numberArray.reverse();

  for (let i = 3; i < numberArray.length; i += 4) {
    numberArray.splice(i, 0, separator);
  }

  numberArray.reverse();

  const formattedNumber = numberArray.join("");

  return formattedNumber + (floatString ? `.${floatString}` : "");
}
