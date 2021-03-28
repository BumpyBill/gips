export default class Vector2 {
  public constructor(public x = 0, public y = 0) {}

  add(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addn(n: number): Vector2 {
    this.x += n;
    this.y += n;
    return this;
  }

  multiply(v: Vector2): Vector2 {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  multiplyn(n: number): Vector2 {
    this.x *= n;
    this.y *= n;
    return this;
  }
}
