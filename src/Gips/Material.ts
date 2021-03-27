import M3x3 from "../Math/Matrix3x3";
import Vector2 from "../Math/Vector2";
import Game from "./Game";
import { Gips } from "./Gips";

export default class Material {
  public program: WebGLProgram;
  public gl: WebGL2RenderingContext;
  public parameters: any;

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

    this.gatherParameters();

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

  public gatherParameters() {
    let gl = this.gl;
    let isUniform = 0;

    this.parameters = {};

    while (isUniform < 2) {
      let paramType = isUniform ? gl.ACTIVE_UNIFORMS : gl.ACTIVE_ATTRIBUTES;
      let count = gl.getProgramParameter(this.program, paramType);

      for (let i = 0; i < count; i++) {
        let details;
        let location;
        if (isUniform) {
          details = gl.getActiveUniform(this.program, i);
          location = gl.getUniformLocation(this.program, details.name);
        } else {
          details = gl.getActiveAttrib(this.program, i);
          location = gl.getAttribLocation(this.program, details.name);
        }

        this.parameters[details.name] = {
          location: location,
          uniform: !!isUniform,
          type: details.type,
        };
      }
      isUniform++;
    }
  }

  public set(name: string, a?: any, b?: any, c?: any, d?: any, e?: any) {
    let gl = this.gl;
    if (name in this.parameters) {
      let param = this.parameters[name];
      if (param.uniform) {
        switch (param.type) {
          case gl.FLOAT:
            gl.uniform1f(param.location, a);
            break;
          case gl.FLOAT_VEC2:
            gl.uniform2f(param.location, a, b);
            break;
          case gl.FLOAT_VEC3:
            gl.uniform3f(param.location, a, b, c);
            break;
          case gl.FLOAT_VEC4:
            gl.uniform4f(param.location, a, b, c, d);
            break;
          case gl.FLOAT_MAT3:
            gl.uniformMatrix3fv(param.location, false, a);
            break;
          case gl.FLOAT_MAT4:
            gl.uniformMatrix4fv(param.location, false, a);
            break;
          case gl.SAMPLER_2D:
            gl.uniform1i(param.location, a);
            break;
        }
      } else {
        gl.enableVertexAttribArray(param.location);

        if (a == undefined) a = gl.FLOAT;
        if (b == undefined) b = false;
        if (c == undefined) c = 0;
        if (d == undefined) d = 0;

        switch (param.type) {
          case gl.FLOAT:
            gl.vertexAttribPointer(param.location, 1, a, b, c, d);
            break;
          case gl.FLOAT_VEC2:
            gl.vertexAttribPointer(param.location, 2, a, b, c, d);
            break;
          case gl.FLOAT_VEC3:
            gl.vertexAttribPointer(param.location, 3, a, b, c, d);
            break;
          case gl.FLOAT_VEC4:
            gl.vertexAttribPointer(param.location, 4, a, b, c, d);
            break;
        }
      }
    }
  }
}

export class Sprite {
  public image: HTMLImageElement;
  public isLoaded: boolean = false;
  public size: Vector2 = new Vector2(64, 64);
  public position: Vector2 = new Vector2();
  public uv: Vector2 = new Vector2();
  public scale: Vector2 = new Vector2(1, 1);

  private gl_tex: WebGLTexture;
  private tex_buff: WebGLBuffer;
  private geo_buff: WebGLBuffer;
  private aPositionLoc: number;
  private aTexcoordLoc: number;
  private uImageLoc: WebGLUniformLocation;
  private uWorldLoc: WebGLUniformLocation;
  private uFrameLoc: WebGLUniformLocation;
  private uObjectLoc: WebGLUniformLocation;

  public constructor(
    public gl: WebGL2RenderingContext,
    public img_url: string,
    public material: Material,
    public options?: SpriteOptions
  ) {
    if ("size" in options) this.size = options.size;
    if ("position" in options) this.position = options.position;
    if ("scale" in options) this.position = options.scale;

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
      Sprite.createRectArray(0, 0, this.size.x, this.size.y),
      gl.STATIC_DRAW
    );

    /*
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
    this.uObjectLoc = gl.getUniformLocation(this.material.program, "u_object");

    */

    gl.useProgram(null);
    this.isLoaded = true;
  };

  public render(frames: Vector2 = new Vector2(0, 0)) {
    if (this.isLoaded) {
      let gl = this.gl;

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
  scale?: Vector2;
}
