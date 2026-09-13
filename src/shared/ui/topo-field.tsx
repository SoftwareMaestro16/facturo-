'use client';

import { useEffect, useRef } from 'react';

/// A full-bleed animated dark background: a faint grid plus thin drifting
/// topographic contour lines from 2D simplex noise. Pure canvas/WebGL, no
/// external script or iframe. Respects `prefers-reduced-motion` (freezes on
/// the first frame) and pauses when the tab or the element itself is hidden.

const vertexShaderGLSL = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dpr;
uniform float u_noiseScale;
uniform float u_numBands;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5; vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox; m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g; g.x  = a0.x  * x0.x  + h.x  * x0.y; g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  float gridSize = 48.0 * u_dpr;
  vec2 gridSt = gl_FragCoord.xy / gridSize;
  vec2 gridFract = fract(gridSt);
  float lineThickness = 1.0 / gridSize;
  float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);
  gridLines = clamp(gridLines, 0.0, 1.0) * 0.12;

  vec2 noisePos = st * u_noiseScale + vec2(u_time * 0.015, u_time * 0.025);
  float n = snoise(noisePos) * 0.5 + 0.5;
  float bandVal = n * u_numBands;
  float triangleWave = abs(fract(bandVal) - 0.5) * 2.0;
  float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.45;

  vec3 color = vec3(0.0);
  color += vec3(1.0) * gridLines;
  color += vec3(1.0) * topoLines;

  gl_FragColor = vec4(color, 1.0);
}
`;

export interface TopoFieldProps {
  /// Animation speed multiplier; 0 freezes the field on its first frame.
  speed?: number;
  /// Stretches (>1) or compresses (<1) the noise field driving the contour bands.
  length?: number;
  /// Multiplies the number of contour bands (visual density of lines).
  density?: number;
  className?: string;
}

export const TopoField = ({ speed = 1, length = 1, density = 1, className }: TopoFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const shaders: WebGLShader[] = [];
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const program = gl.createProgram();
    const vertex = createShader(gl.VERTEX_SHADER, vertexShaderGLSL);
    const fragment = createShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL);
    if (!program || !vertex || !fragment) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      if (program) gl.deleteProgram(program);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      res: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      dpr: gl.getUniformLocation(program, 'u_dpr'),
      noiseScale: gl.getUniformLocation(program, 'u_noiseScale'),
      numBands: gl.getUniformLocation(program, 'u_numBands'),
    };

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let visible = true;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (t: number) => {
      gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform1f(locs.time, t * 0.001 * speed);
      gl.uniform1f(locs.dpr, dpr);
      gl.uniform1f(locs.noiseScale, 1.4 * length);
      gl.uniform1f(locs.numBands, 10 * density);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const tick = (time: number) => {
      render(motion.matches ? 0 : time);
      if (!motion.matches && !document.hidden && visible && speed !== 0) raf = requestAnimationFrame(tick);
    };
    const restart = () => {
      cancelAnimationFrame(raf);
      resize();
      raf = requestAnimationFrame(tick);
    };
    const ro = new ResizeObserver(restart);
    ro.observe(container);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      restart();
    });
    observer.observe(container);
    motion.addEventListener('change', restart);
    document.addEventListener('visibilitychange', restart);
    restart();
    return () => {
      ro.disconnect();
      observer.disconnect();
      motion.removeEventListener('change', restart);
      document.removeEventListener('visibilitychange', restart);
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buffer);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteProgram(program);
    };
  }, [speed, length, density]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className ?? ''}`}
    >
      <canvas aria-hidden="true" ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
