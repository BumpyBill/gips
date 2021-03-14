export class Material {
  public program: WebGLProgram;
  public constructor(
    private gl: WebGL2RenderingContext,
    vs: string,
    fs: string
  ) {
    var vsShader = this.getShader(vs, gl.VERTEX_SHADER);
    var fsShader = this.getShader(fs, gl.FRAGMENT_SHADER);

    if (vsShader && fsShader) {
      this.program = this.gl.createProgram();
      this.gl.attachShader(this.program, vsShader);
      this.gl.attachShader(this.program, fsShader);

      this.gl.linkProgram(this.program);

      if (!this.gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(
          `Cannot load shader(s): \n${this.gl.getProgramInfoLog(this.program)}`
        );
        alert("Error. Check console for more information.");
        return;
      }
    }

    this.gl.detachShader(this.program, vsShader);
    this.gl.detachShader(this.program, fsShader);
    this.gl.deleteShader(vsShader);
    this.gl.deleteShader(fsShader);

    this.gl.useProgram(null);
  }

  private getShader(script: string, type: number): WebGLShader | null {
    var out = this.gl.createShader(type);
    this.gl.shaderSource(out, script);
    this.gl.compileShader(out);

    if (!this.gl.getShaderParameter(out, this.gl.COMPILE_STATUS)) {
      console.error(`Shader Error: \n${this.gl.getShaderInfoLog(out)}`);
      alert("Error. Check console for more information.");
      return;
    }

    return out;
  }
}

export class Sprite {
  public isLoaded: boolean = false;
  public material: Material;
  public image: HTMLImageElement;
  public sprite: any;

  private gl_tex: WebGLTexture;
  private geo_buff: WebGLBuffer;
  private tex_buff: WebGLBuffer;
  private aPositionLoc: number;
  private aTexcoordLoc: number;
  private uImageLoc: WebGLUniformLocation;

  public constructor(
    private gl: WebGL2RenderingContext,
    public img_url: string,
    vs: string,
    fs: string
  ) {
    this.material = new Material(gl, vs, fs);
    this.image = new Image();
    this.image.src = img_url;
    //@ts-ignore  (crappy fix)
    this.image.sprite = this;
    this.image.onload = () => {
      this.setup();
    };
  }

  private static createRectArray(
    x: number = 1,
    y: number = 1,
    w: number = 1,
    h: number = 1
  ) {
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

  private setup(): void {
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

    this.tex_buff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
    gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);

    this.geo_buff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
    gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);

    this.aPositionLoc = gl.getAttribLocation(
      this.material.program,
      "a_position"
    );
    this.aTexcoordLoc = gl.getAttribLocation(
      this.material.program,
      "a_texCoord"
    );
    this.uImageLoc = gl.getUniformLocation(this.material.program, "u_image");

    gl.useProgram(null);
    this.isLoaded = true;
  }

  public render(): void {
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

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

      gl.useProgram(null);
    }
  }
}
