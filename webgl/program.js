export default class Program {
  constructor(gl, vShader, fShader) {
    this.gl = gl;
    this.vertexShader = vShader;
    this.fragmentShader = fShader;

    this.program = this.gl.createProgram();
    
    this.gl.attachShader(this.program, this.vertexShader.shader);
    this.gl.attachShader(this.program, this.fragmentShader.shader);
    this.gl.linkProgram(this.program);
    
    this.locators = {
      uniform: new Map(),
      attribute: new Map(),
    };

    if (gl.getProgramParameter(this.program, gl.LINK_STATUS)) return;
    
    console.warn(gl.getProgramLogInfo(this.program));
    gl.deleteProgram();
  }

  _enable(name, key) {
    const keyFnMap = {
      uniform: 'Uniform',
      attribute: 'Attrib',
    };
    const fn = `get${keyFnMap[key]}Location`;

    this.locators[key].set(name, this.gl[fn](this.program, name));
  }

  enableUniforms(...uniforms) {
    uniforms.forEach(u => this._enable(u, 'uniform'));
    return this;
  }

  enableAttributes(...attributes) {
    attributes.forEach(a => this._enable(a, 'attribute'));
    return this;
  }

  getLocator(name, type) {
    return this.locators[type].get(name);
  }
}