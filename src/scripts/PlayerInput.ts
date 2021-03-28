import Script from "../Gips/Script";
import Sprite from "../Gips/Sprite";
import Vector2 from "../Math/Vector2";
import PlayerAnimation, { Direction, PlayerState } from "./PlayerAnimation";

export default class PlayerInput implements Script {
  public animation: PlayerAnimation;
  public keydown: string;

  public keys: any;

  public constructor(public sprite: Sprite) {
    this.animation = this.sprite.getComponent(
      "PlayerAnimation"
    ) as PlayerAnimation;

    this.keys = new Array(222);
    for (var i = 0; i < 222; i++) this.keys[i] = false;

    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }

  public isKeyPressed(key: string) {
    if (this.keys[key] == true) return true;

    return false;
  }

  public name: string = "PlayerInput";

  public update(): void {
    if (this.isKeyPressed("d")) {
      this.animation.direction = Direction.RIGHT;
      this.animation.state = PlayerState.RUN;
    } else if (this.isKeyPressed("a")) {
      this.animation.direction = Direction.LEFT;
      this.animation.state = PlayerState.RUN;
    } else {
      this.animation.state = PlayerState.IDLE;
    }
  }
}
