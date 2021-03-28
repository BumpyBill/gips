import M3x3 from "../Math/Matrix3x3";
import Color from "./Color";
import Sprite from "./Sprite";

export default class Game {
  private _updateFunction: Function = function () {};

  public canvasElm: HTMLCanvasElement;
  public worldSpaceMatrix: M3x3 = new M3x3();
  public sprites: Sprite[] = [];
  public deltaTime: number = 0;

  public set updateFunction(func: Function) {
    this._updateFunction = func;
  }

  public gl: WebGL2RenderingContext;
  public clearColor: Color = new Color();

  public constructor() {
    this.canvasElm = document.getElementById("glCanvas") as HTMLCanvasElement;
    this.gl = this.canvasElm.getContext("webgl2");

    this.resize(window.innerWidth, window.innerHeight);

    this.loop();
  }

  private loop = () => {
    this.update(performance.now());

    requestAnimationFrame(this.loop);
  };

  private update = async (timeStamp: number) => {
    this.gl.viewport(0, 0, this.canvasElm.width, this.canvasElm.height);

    this.gl.clearColor(
      this.clearColor.raw[0],
      this.clearColor.raw[1],
      this.clearColor.raw[2],
      this.clearColor.raw[3]
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    for (var i = 0; i < this.sprites.length; i++) {
      const sprite = await this.sprites[i];
      sprite.render(this.sprites[i].frame);

      for (var j = 0; j < sprite.components.length; j++) {
        if ("update" in sprite.components[j])
          await sprite.components[j].update(this.deltaTime);
      }
    }

    this.deltaTime = timeStamp / performance.now();

    this.gl.flush();
  };

  public resize(x: number, y: number) {
    this.canvasElm.width = x;
    this.canvasElm.height = y;

    let wRatio = x / (y / 1080);
    this.worldSpaceMatrix = new M3x3()
      .transition(-1, 1)
      .scale(2 / wRatio, -2 / 1080);
  }
}
