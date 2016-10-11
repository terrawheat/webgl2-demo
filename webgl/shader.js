export default class Shader {
  constructor(gl) {
    this.gl = gl;
  }

  createShader(source) {
    const shader = this.gl.createShader(this.type);

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    return null;
  }
}