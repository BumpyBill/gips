import Color from "./Gips/Color";
import Game from "./Gips/Game";
import Material from "./Gips/Material";
import Sprite from "./Gips/Sprite";
import Vector2 from "./Math/Vector2";

import PlayerAnimation from "./scripts/PlayerAnimation";
import PlayerInput from "./scripts/PlayerInput";

window.addEventListener("load", () => {
  const game = new Game();

  game.clearColor = new Color(47, 46, 47, 1);

  const material = new Material(game);

  const logo = new Sprite(game, "img/gips.png", material, {
    position: new Vector2(1920 / 2 - 31, 1080 / 2 - 192),
    size: new Vector2(31, 15),
    scale: new Vector2(8, 8),
  });

  const player = new Sprite(game, "img/player.png", material, {
    position: new Vector2(1920 / 2, 1080 - 128 - 148),
    size: new Vector2(25, 37),
    scale: new Vector2(4, 4),
  });

  player.addComponent(new PlayerAnimation(player));
  player.addComponent(new PlayerInput(player));

  var tiles: Sprite[] = [];

  for (var i = 0; i < 20; i++) {
    tiles.push(
      new Sprite(game, "img/tile.png", material, {
        size: new Vector2(32, 31),
        position: new Vector2(i * 128, 1080 - 124),
        scale: new Vector2(4, 4),
      })
    );
  }

  window.addEventListener("resize", () => {
    game.resize(window.innerWidth, window.innerHeight);
  });
});
