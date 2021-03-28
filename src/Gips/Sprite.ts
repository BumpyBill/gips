import M3x3 from "../Math/Matrix3x3";
import Vector2 from "../Math/Vector2";
import Game from "./Game";
import Material from "./Material";
import Script from "./Script";

export default class Sprite {
  public image: HTMLImageElement;
  public isLoaded: boolean = false;
  public size: Vector2 = new Vector2(64, 64);
  public position: Vector2 = new Vector2();
  public uv: Vector2 = new Vector2();
  public scale: Vector2 = new Vector2(1, 1);
  public gl: WebGL2RenderingContext;
  public frame: Vector2 = new Vector2();
  public components: Script[] = [];

  private gl_tex: WebGLTexture;
  private tex_buff: WebGLBuffer;
  private geo_buff: WebGLBuffer;

  public constructor(
    private game: Game,
    public img_url: string,
    public material: Material,
    public options?: SpriteOptions
  ) {
    if ("size" in options) this.size = options.size;
    if ("position" in options) this.position = options.position;
    if ("scale" in options) this.scale = options.scale;

    this.gl = this.game.gl;

    this.image = new Image();
    this.image.src = img_url;

    this.game.sprites.push(this);

    this.image.onload = this.onLoad;
  }

  private onLoad = (): void => {
    this.setup();
  };

  private setup = (): void => {
    let gl = this.gl;

    gl.useProgram(this.material.program);
    this.gl_tex = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    );
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.useProgram(null);
    this.isLoaded = true;
  };

  public render(frames: Vector2 = new Vector2(0, 0)) {
    if (this.isLoaded) {
      let gl = this.gl;

      this.uv = new Vector2(
        this.size.x / this.image.width,
        this.size.y / this.image.height
      );

      this.tex_buff = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        Sprite.createRectArray(0, 0, this.uv.x, this.uv.y),
        gl.STATIC_DRAW
      );

      this.geo_buff = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        Sprite.createRectArray(
          0,
          0,
          this.size.x * this.scale.x,
          this.size.y * this.scale.y
        ),
        gl.STATIC_DRAW
      );

      let frame = new Vector2(
        Math.floor(frames.x) * this.uv.x,
        Math.floor(frames.y) * this.uv.y
      );

      let oMat = new M3x3().transition(this.position.x, this.position.y);

      gl.useProgram(this.material.program);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);
      this.material.set("u_image", 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
      this.material.set("a_texCoord");

      gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
      this.material.set("a_position");

      // this.material.set("u_scale", this.scale.x, this.scale.y);
      this.material.set("u_frame", frame.x, frame.y);
      this.material.set(
        "u_world",
        this.material.game.worldSpaceMatrix.getFloatArray()
      );
      this.material.set("u_object", oMat.getFloatArray());

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

      gl.useProgram(null);
    }
  }

  public static createRectArray(x = 0, y = 0, w = 1, h = 1) {
    return new Float32Array([
      x,
      y,
      x + w,
      y,
      x,
      y + h,
      x,
      y + h,
      x + w,
      y,
      x + w,
      y + h,
    ]);
  }

  public addComponent = (script: Script): Script => {
    this.components.push(script);
    return script;
  };

  public getComponent = (name: string): Script | null => {
    return this.components.find((x) => x.name == name);
  };
}

export interface SpriteOptions {
  size?: Vector2;
  position?: Vector2;
  scale?: Vector2;
}
