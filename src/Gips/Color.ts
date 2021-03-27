export default class Color {
  private _raw = [0, 0, 0, 1];

  get raw() {
    return this._raw;
  }

  set r(n: number) {
    this._r = n;

    this._raw = [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  }
  set g(n: number) {
    this._g = n;

    this._raw = [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  }
  set b(n: number) {
    this._b = n;

    this._raw = [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  }
  set a(n: number) {
    this._a = n;

    this._raw = [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  }

  get r() {
    return this._r;
  }
  get g() {
    return this._g;
  }
  get b() {
    return this._b;
  }
  get a() {
    return this._a;
  }

  constructor(
    private _r: number = 0,
    private _g: number = 0,
    private _b: number = 0,
    private _a: number = 255
  ) {
    this._raw = [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
  }
}
