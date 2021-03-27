import Vector2 from "../Math/Vector2";
import Game from "./Game";
import { Gips } from "./Gips";

export default class Material {
  public program: WebGLProgram;
  public gl: WebGL2RenderingContext;

  public constructor(
    public game: Game,
    vs: string = Gips.VertexShader,
    fs: string = Gips.FragmentShader
  ) {
    this.gl = game.gl;
    let gl = this.gl;

    let vsShader = this.getShader(vs, this.gl.VERTEX_SHADER);
    let fsShader = this.getShader(fs, this.gl.FRAGMENT_SHADER);

    if (vsShader && fsShader) {
      this.program = gl.createProgram();
      gl.attachShader(this.program, vsShader);
      gl.attachShader(this.program, fsShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(
          `Cannot load shader:\n${gl.getProgramInfoLog(this.program)}`
        );

        return null;
      }
    }

    gl.detachShader(this.program, vsShader);
    gl.detachShader(this.program, fsShader);
    gl.deleteShader(vsShader);
    gl.deleteShader(fsShader);
  }

  private getShader(script: string, type: number): null | WebGLShader {
    let gl = this.gl;

    var out = gl.createShader(type);
    gl.shaderSource(out, script);
    gl.compileShader(out);

    if (!gl.getShaderParameter(out, gl.COMPILE_STATUS)) {
      console.error(`Shader Error: \n${gl.getShaderInfoLog(out)}`);
      return null;
    }

    return out;
  }
}

export class Sprite {
  public image: HTMLImageElement;
  public isLoaded: boolean = false;
  public size: Vector2 = new Vector2(64, 64);
  public position: Vector2 = new Vector2();
  public uv: Vector2 = new Vector2();

  private gl_tex: WebGLTexture;
  private tex_buff: WebGLBuffer;
  private geo_buff: WebGLBuffer;
  private aPositionLoc: number;
  private aTexcoordLoc: number;
  private uImageLoc: WebGLUniformLocation;
  private uWorldLoc: WebGLUniformLocation;
  private uFrameLoc: WebGLUniformLocation;

  public constructor(
    public gl: WebGL2RenderingContext,
    public img_url: string,
    public material: Material,
    public options?: SpriteOptions
  ) {
    if ("size" in options) this.size = options.size;
    if ("position" in options) this.position = options.position;

    this.image = new Image();
    this.image.src = img_url;

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
        this.position.x,
        this.position.y,
        this.size.x,
        this.size.y
      ),
      gl.STATIC_DRAW
    );

    this.aPositionLoc = gl.getAttribLocation(
      this.material.program,
      "a_position"
    );
    this.aTexcoordLoc = gl.getAttribLocation(
      this.material.program,
      "a_texCoord"
    );
    this.uImageLoc = gl.getUniformLocation(this.material.program, "u_image");
    this.uWorldLoc = gl.getUniformLocation(this.material.program, "u_world");
    this.uFrameLoc = gl.getUniformLocation(this.material.program, "u_frame");

    gl.useProgram(null);
    this.isLoaded = true;
  };

  public render(frames: Vector2 = new Vector2(0, 0)) {
    let frame = new Vector2(
      Math.floor(frames.x) * this.uv.x,
      Math.floor(frames.y) * this.uv.y
    );

    if (this.isLoaded) {
      let gl = this.gl;

      gl.useProgram(this.material.program);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.gl_tex);
      gl.uniform1i(this.uImageLoc, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
      gl.enableVertexAttribArray(this.aTexcoordLoc);
      gl.vertexAttribPointer(this.aTexcoordLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
      gl.enableVertexAttribArray(this.aPositionLoc);
      gl.vertexAttribPointer(this.aPositionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(this.uFrameLoc, frame.x, frame.y);
      gl.uniformMatrix3fv(
        this.uWorldLoc,
        false,
        this.material.game.worldSpaceMatrix.getFloatArray()
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

      gl.useProgram(null);
    }
  }

  static createRectArray(x = 0, y = 0, w = 1, h = 1) {
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
}

export interface SpriteOptions {
  size?: Vector2;
  position?: Vector2;
}
