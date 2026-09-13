'use client';

import { useEffect, useRef } from 'react';

/// A full-bleed animated WebGL gradient blob ("plasma"), monochrome to match
/// the rest of the product. Pure canvas, no external dependency. Respects
/// `prefers-reduced-motion` (freezes time) and pauses when the tab or the
/// element itself is hidden.

const vertexShaderGLSL = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const fragmentShaderGLSL = `precision highp float;

uniform vec3 u_colors[5];
uniform vec4 u_scene;   // resolution.xy, time, colour count
uniform vec4 u_shape;   // scale, intensity, unused, unused
uniform vec4 u_surface; // detail, contrast, brightness, saturation
uniform vec4 u_finish;  // hue, vignette, blur, grain
uniform float u_seed;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 4; i++) {
    if (float(i) < n) col = mix(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 p, float t) {
  float k = 2.0 + u_intensity * 6.0;
  float v = sin(p.x * k + t) + sin(p.y * k * 0.8 - t * 0.7)
    + sin((p.x + p.y) * k * 0.6 + t * 0.5)
    + sin(length(p) * k * 1.2 - t);
  return palette(0.5 + 0.5 * sin(v + u_seed));
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  p *= u_scale;
  p += u_intensity * (vec2(fbm(p * u_detail), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);

  vec3 col = shade(p, u_time);
  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001) col = hueRotate(col, u_hue);
  col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_grain > 0.0001) col += (grainHash(gl_FragCoord.xy + u_seed) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

/// Monochrome palette (grayscale, matching the rest of the site) and a calm,
/// slow-drifting recipe — this sits behind readable text, not on a hero.
const COLORS: [number, number, number][] = [
  [0.04, 0.04, 0.04],
  [0.42, 0.42, 0.42],
  [0.12, 0.12, 0.12],
  [0.26, 0.26, 0.26],
  [0.04, 0.04, 0.04],
];
const RECIPE = {
  scale: 1.5,
  intensity: 0.45,
  detail: 2.2,
  contrast: 1.05,
  brightness: -0.02,
  saturation: 0,
  hue: 0,
  vignette: 0.35,
  grain: 0.05,
  seed: 7,
  timeScale: 0.16,
};

export interface ShaderBackgroundProps {
  /// Multiplies the baked animation speed; 0 freezes the field on its first frame.
  speed?: number;
  className?: string;
}

export const ShaderBackground = ({ speed = 1, className }: ShaderBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', { antialias: false });
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const locs = {
      colors: gl.getUniformLocation(program, 'u_colors'),
      scene: gl.getUniformLocation(program, 'u_scene'),
      shape: gl.getUniformLocation(program, 'u_shape'),
      surface: gl.getUniformLocation(program, 'u_surface'),
      finish: gl.getUniformLocation(program, 'u_finish'),
      seed: gl.getUniformLocation(program, 'u_seed'),
    };
    gl.uniform3fv(locs.colors, new Float32Array(COLORS.flat()));
    gl.uniform4f(locs.shape, RECIPE.scale, RECIPE.intensity, 0, 0);
    gl.uniform4f(locs.surface, RECIPE.detail, RECIPE.contrast, RECIPE.brightness, RECIPE.saturation);
    gl.uniform4f(locs.finish, RECIPE.hue, RECIPE.vignette, 0, RECIPE.grain);
    gl.uniform1f(locs.seed, RECIPE.seed);

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
      gl.uniform4f(
        locs.scene,
        canvas.width,
        canvas.height,
        t * 0.001 * RECIPE.timeScale * speed,
        COLORS.length,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
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
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-black ${className ?? ''}`}
    >
      <canvas aria-hidden="true" ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
};
