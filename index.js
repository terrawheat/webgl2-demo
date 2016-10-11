import Application from './webgl/application';

import VertexShader from './webgl/vertex-shader';
import FragmentShader from './webgl/fragment-shader';

import Program from './webgl/program';

import SampleVertexShader from './shaders/sample-vertex-shader';
import SampleFragmentShader from './shaders/sample-fragment-shader';

const application = new Application(document.getElementById('c'));

const vertexShader = new VertexShader(application.context, SampleVertexShader)
const fragmentShader = new FragmentShader(application.context, SampleFragmentShader);
const program = new Program(application.context, vertexShader, fragmentShader);

// remove
const gl = application.context;
// /remove

program.enableUniforms('u_color', 'u_resolution')
  .enableAttributes('a_position');

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

let vao = gl.createVertexArray();

gl.bindVertexArray(vao);
gl.enableVertexAttribArray(program.getLocator('a_position', 'attribute'));

gl.vertexAttribPointer(program.getLocator('a_position', 'attribute'), 2, gl.FLOAT, false, 0, 0);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program.program);

gl.uniform2f(program.getLocator('u_resolution', 'uniform'), gl.canvas.width, gl.canvas.height);
gl.bindVertexArray(vao);

for (let ii = 0; ii < 50; ++ii) {
  setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

  gl.uniform4f(program.getLocator('u_color', 'uniform'), Math.random(), Math.random(), Math.random(), 1);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}


function randomInt(range) {
  return Math.floor(Math.random() * range);
}

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

