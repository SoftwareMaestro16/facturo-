'use client';

import { useEffect, useRef } from 'react';

/// A small, contained animated WebGL glow: a raymarched fractal drift,
/// monochrome to match the rest of the product. Pure canvas, no Three.js —
/// the codebase's other backgrounds (HeroCanvas, TopoField, ShaderBackground)
/// already prove a single full-screen shader quad needs nothing heavier than
/// raw WebGL. Meant to sit low-opacity behind a feature card's own graphic,
/// not as a full-bleed hero. Respects `prefers-reduced-motion` (freezes on
/// the first frame) and pauses when the tab or the element itself is hidden.

const vertexShaderGLSL = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float map(vec3 p) {
  p.xz *= rot(u_time * 0.4);
  p.xy *= rot(u_time * 0.3);
  vec3 q = p * 2.0 + u_time;
  return length(p + vec3(sin(u_time * 0.7))) * log(length(p) + 1.0)
    + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / min(u_resolution.x, u_resolution.y) - vec2(0.5, 0.5);
  vec3 col = vec3(0.0);
  float d = 2.5;
  for (int i = 0; i <= 5; i++) {
    vec3 p = vec3(0.0, 0.0, 5.0) + normalize(vec3(uv, -1.0)) * d;
    float rz = map(p);
    float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 base = vec3(0.5) + vec3(1.0) * f;
    col = col * base + smoothstep(2.5, 0.0, rz) * 0.7 * base;
    d += min(rz, 1.0);
  }
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export interface NebulaFieldProps {
  /// Animation speed multiplier; 0 freezes the field on its first frame.
  speed?: number;
  className?: string;
}

export const NebulaField = ({ speed = 1, className }: NebulaFieldProps) => {
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
    };

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (t: number) => {
      gl.uniform2f(locs.res, canvas.width, canvas.height);
      gl.uniform1f(locs.time, t * 0.001 * speed);
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
  }, [speed]);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute overflow-hidden ${className ?? ''}`}>
      <canvas aria-hidden="true" ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
