import Game from "./Gips/Game";
import Material, { Sprite } from "./Gips/Material";
import Vector2 from "./Math/Vector2";
import wrap from "./Math/wrap";

window.addEventListener("load", () => {
  const game = new Game();

  let n = 0;

  const material = new Material(game);

  const sprite = new Sprite(game.gl, "img/omw to steal df code.png", material, {
    size: new Vector2(360, 480),
  });

  game.updateFunction = function () {
    n += 0.1;
    n = wrap(n, 0, 3);

    console.log(n);
    sprite.render(new Vector2(n));
  };

  window.addEventListener("resize", () => {
    game.resize(window.innerWidth, window.innerHeight);
  });
});
