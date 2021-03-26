import Material, { Sprite } from "./Material";

export default class Game {
  private canvasElm: HTMLCanvasElement;

  public gl: WebGL2RenderingContext;

  // Sprites
  public sprite1: Sprite;

  public constructor() {
    this.canvasElm = document.getElementById("glCanvas") as HTMLCanvasElement;
    this.gl = this.canvasElm.getContext("webgl2");

    this.gl.clearColor(0.4, 0.6, 1, 0);

    let vs = document.getElementById("vs_01").innerHTML;
    let fs = document.getElementById("fs_01").innerHTML;

    const sprite1_material = new Material(this.gl, vs, fs);

    this.sprite1 = new Sprite(this.gl, "img/femboy.png", sprite1_material);

    this.loop();
  }

  private loop = () => {
    this.update();

    requestAnimationFrame(this.loop);
  };

  private update = () => {
    this.gl.viewport(0, 0, this.canvasElm.width, this.canvasElm.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.sprite1.render();

    this.gl.flush();
  };
}
