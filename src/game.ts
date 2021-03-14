import Shaders from "./interfaces/Shaders";
import { Sprite } from "./material";

export class Game {
  // Properties
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private shaders: Shaders;

  // Testing
  public sprite: Sprite;

  // Constructor
  public constructor() {
    this.canvas = document.getElementById("glCanvas") as HTMLCanvasElement;
    this.gl = this.canvas.getContext("webgl2");
    this.gl.clearColor(0.01, 0.6, 0.8, 1);

    this.shaders = {
      vs: document.getElementById("vs_01").innerHTML,
      fs: document.getElementById("fs_01").innerHTML,
    };

    this.sprite = new Sprite(
      this.gl,
      "img/dev_art.png",
      this.shaders.vs,
      this.shaders.fs
    );

    this.loop();
  }

  // Methods
  public update = (): void => {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.sprite.render();

    this.gl.flush();
  };

  public loop = (): void => {
    this.update();

    requestAnimationFrame(this.loop);
  };
}
