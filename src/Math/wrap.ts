export default function (n: number, min: number, max: number) {
  if (n > max) {
    n = min + (n - max);
  }

  if (n < min) {
    n = max + (n - min);
  }

  return n;
}
