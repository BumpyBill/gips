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
