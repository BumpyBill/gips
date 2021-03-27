import Game from "./Gips/Game";
import Material, { Sprite } from "./Gips/Material";
import M3x3 from "./Math/Matrix3x3";
import Vector2 from "./Math/Vector2";

window.addEventListener("load", () => {
  const game = new Game();

  const material = new Material(game);

  const sprite = new Sprite(game.gl, "img/femboy.png", material, {
    size: new Vector2(255, 255),
    position: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
  });

  game.updateFunction = function () {
    sprite.render();
  };

  window.addEventListener("resize", () => {
    sprite.position = new Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    game.resize(window.innerWidth, window.innerHeight);
  });
});
