import Sprite from "./Sprite";

export default interface Script {
  name: string;
  sprite: Sprite;

  update?(delta?: number): void;
}
