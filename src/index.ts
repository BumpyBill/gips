import Color from "./Gips/Color";
import Game from "./Gips/Game";
import Material, { Sprite } from "./Gips/Material";
import Vector2 from "./Math/Vector2";
import wrap from "./Math/wrap";

window.addEventListener("load", () => {
  const game = new Game();

  game.clearColor = new Color(47, 46, 47, 1);

  const material = new Material(game);

  const logo = new Sprite(game.gl, "img/gips.png", material, {
    position: new Vector2(
      window.innerWidth / 2 - 31,
      window.innerHeight / 2 - 192
    ),
    size: new Vector2(31, 15),
    scale: new Vector2(8, 8),
  });

  var tiles: Sprite[] = [];

  for (var i = 0; i < 20; i++) {
    tiles.push(
      new Sprite(game.gl, "img/tile.png", material, {
        size: new Vector2(32, 32),
        position: new Vector2(i * 128, window.innerHeight + 32),
        scale: new Vector2(4, 4),
      })
    );
  }

  game.updateFunction = function () {
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].render();
    }

    logo.render();
  };

  window.addEventListener("resize", () => {
    game.resize(window.innerWidth, window.innerHeight);
  });
});
