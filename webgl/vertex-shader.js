import Shader from './shader';

export default class VertexShader extends Shader {
  constructor(gl, source) {
    super(gl);
    this.type = this.gl.VERTEX_SHADER;
    this.source = source;
    this.shader = this.createShader(this.source); 
  }

}