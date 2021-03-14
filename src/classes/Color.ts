export default class Color {
  private _x: number;
  private _y: number;
  private _z: number;
  private _a: number;

  private _raw: number[];

  // Setters
  public set x(n: number) {
    this._x = n;
    this._raw = [this._x / 255, this._y / 255, this._z / 255, this._a];
  }
  public set y(n: number) {
    this._y = n;
    this._raw = [this._x / 255, this._y / 255, this._z / 255, this._a];
  }
  public set z(n: number) {
    this._z = n;
    this._raw = [this._x / 255, this._y / 255, this._z / 255, this._a];
  }
  public set a(n: number) {
    this._a = n;
    this._raw = [this._x / 255, this._y / 255, this._z / 255, this._a];
  }

  // Getters

  public get raw() {
    return this._raw;
  }

  public constructor(x: number, y: number, z: number, a: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = a;
  }
}
