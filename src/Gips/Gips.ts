export module Gips {
  export const VertexShader: string = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;

    uniform mat3 u_world;

    varying vec2 v_texCoord;
    void main(){
      gl_Position = vec4( u_world * vec3(a_position, 1), 1);
      v_texCoord = a_texCoord;
    }
    `;

  export const FragmentShader: string = `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_texCoord;

     void main(){
      gl_FragColor = texture2D(u_image, v_texCoord);
    }
    `;
}
