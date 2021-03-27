import Color from "./Gips/Color";
import Game from "./Gips/Game";
import Material, { Sprite } from "./Gips/Material";
import Vector2 from "./Math/Vector2";
import wrap from "./Math/wrap";

window.addEventListener("load", () => {
  const game = new Game();

  game.clearColor = new Color(47, 46, 47, 1);

  const material = new Material(game);
  const sprite = new Sprite(game.gl, "img/femboy.png", material, {
    size: new Vector2(225, 225),
    // scale: new Vector2(4, 4),
  });

  game.updateFunction = function () {
    sprite.render();
  };

  window.addEventListener("resize", () => {
    game.resize(window.innerWidth, window.innerHeight);
  });
});
