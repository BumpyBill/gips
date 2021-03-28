import Script from "../Gips/Script";
import Sprite from "../Gips/Sprite";
import Vector2 from "../Math/Vector2";
import wrap from "../Math/wrap";
import PlayerInput from "./PlayerInput";

export default class PlayerAnimation implements Script {
  public constructor(public sprite: Sprite) {}

  public name: string = "PlayerAnimation";

  public frame_x: number = 0;
  public state: PlayerState = PlayerState.IDLE;
  public direction: Direction = Direction.RIGHT;

  public update(deltaTime: number): void {
    this.frame_x += 0.1;
    if (this.state == PlayerState.IDLE) {
      this.frame_x = wrap(this.frame_x, 0, 4);

      this.sprite.frame = new Vector2(Math.floor(this.frame_x));
    }

    if (this.state == PlayerState.RUN) {
      this.frame_x = wrap(this.frame_x, 0, 5);

      this.sprite.frame = new Vector2(Math.floor(this.frame_x), 1);

      this.sprite.position.add(new Vector2(this.direction * 10 * deltaTime));

      this.sprite.scale = new Vector2(4 * this.direction, 4);
    }
  }
}

export enum PlayerState {
  IDLE = 0,
  RUN = 1,
}

export enum Direction {
  LEFT = -1,
  RIGHT = 1,
}
