export default function (n: number, min: number, max: number) {
  if (n > max) {
    n = min;
  }

  if (n < min) {
    n = max;
  }

  return n;
}
