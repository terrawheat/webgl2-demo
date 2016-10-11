import Shader from './shader';

export default class FragmentShader extends Shader {
  constructor(gl, source) {
    super(gl);
    this.type = this.gl.FRAGMENT_SHADER;
    this.source = source;
    this.shader = this.createShader(this.source);  
  }
}