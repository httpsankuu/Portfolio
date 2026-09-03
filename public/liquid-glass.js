/**
 * Liquid Glass JS - Apple-Inspired Glass Effects Library
 * Based on dashersw/liquid-glass-js
 */

class Container {
  static instances = [];
  static pageSnapshot = null;
  static isCapturing = false;
  static waitingForSnapshot = [];

  // Global tunable parameters
  static params = {
    edgeIntensity: 0.02,
    rimIntensity: 0.08,
    baseIntensity: 0.015,
    edgeDistance: 0.18,
    blurStrength: 2.5
  };

  constructor(options = {}) {
    this.width = 0;
    this.height = 0;
    this.borderRadius = options.borderRadius || 24;
    this.type = options.type || 'rounded'; // "rounded", "circle", or "pill"
    this.tintOpacity = options.tintOpacity !== undefined ? options.tintOpacity : 0.25;

    this.canvas = null;
    this.element = null;
    this.gl = null;
    this.gl_refs = {};
    this.webglInitialized = false;
    this.children = [];

    Container.instances.push(this);
    this.init();
  }

  init() {
    this.createElement();
    this.setupCanvas();
    this.updateSizeFromDOM();

    if (Container.pageSnapshot) {
      this.initWebGL();
    } else if (Container.isCapturing) {
      Container.waitingForSnapshot.push(this);
    } else {
      Container.isCapturing = true;
      Container.waitingForSnapshot.push(this);
      this.capturePageSnapshot();
    }
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'glass-container';

    if (this.type === 'circle') {
      this.element.classList.add('glass-container-circle');
    } else if (this.type === 'pill') {
      this.element.classList.add('glass-container-pill');
    }

    this.element.style.borderRadius = this.borderRadius + 'px';
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';

    // Backing canvas for WebGL refraction
    this.canvas = document.createElement('canvas');
    this.canvas.style.borderRadius = this.borderRadius + 'px';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3)';
    this.canvas.style.zIndex = '0';
    this.canvas.style.pointerEvents = 'none';

    this.element.appendChild(this.canvas);
  }

  setupCanvas() {
    this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true, alpha: true }) ||
              this.canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true, alpha: true });
    if (!this.gl) {
      console.warn('WebGL not supported, falling back to CSS backdrop-filter.');
      this.element.style.backdropFilter = 'blur(16px)';
      this.element.style.background = `rgba(255, 255, 255, ${this.tintOpacity})`;
    }
  }

  updateSizeFromDOM() {
    requestAnimationFrame(() => {
      if (!this.element || !this.canvas) return;
      const rect = this.element.getBoundingClientRect();
      let newWidth = Math.ceil(rect.width) || 100;
      let newHeight = Math.ceil(rect.height) || 50;

      if (this.type === 'circle') {
        const size = Math.max(newWidth, newHeight);
        newWidth = size;
        newHeight = size;
        this.borderRadius = size / 2;
        this.element.style.width = size + 'px';
        this.element.style.height = size + 'px';
        this.element.style.borderRadius = this.borderRadius + 'px';
      } else if (this.type === 'pill') {
        this.borderRadius = newHeight / 2;
        this.element.style.borderRadius = this.borderRadius + 'px';
      }

      if (newWidth !== this.width || newHeight !== this.height) {
        this.width = newWidth;
        this.height = newHeight;
        this.canvas.width = newWidth * window.devicePixelRatio;
        this.canvas.height = newHeight * window.devicePixelRatio;
        this.canvas.style.width = newWidth + 'px';
        this.canvas.style.height = newHeight + 'px';
        this.canvas.style.borderRadius = this.borderRadius + 'px';

        if (this.gl && this.gl_refs.resolutionLoc) {
          this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
          this.gl.uniform2f(this.gl_refs.resolutionLoc, this.canvas.width, this.canvas.height);
          this.gl.uniform1f(this.gl_refs.borderRadiusLoc, this.borderRadius * window.devicePixelRatio);
          this.render();
        }
      }
    });
  }

  capturePageSnapshot() {
    if (typeof html2canvas === 'undefined') {
      console.warn('html2canvas is not loaded. Waiting...');
      setTimeout(() => this.capturePageSnapshot(), 200);
      return;
    }

    const glassElements = document.querySelectorAll('.glass-container');
    glassElements.forEach(el => el.style.visibility = 'hidden');

    html2canvas(document.body, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false
    }).then(canvas => {
      glassElements.forEach(el => el.style.visibility = 'visible');
      Container.pageSnapshot = canvas;
      Container.isCapturing = false;

      Container.waitingForSnapshot.forEach(inst => inst.initWebGL());
      Container.waitingForSnapshot = [];
    }).catch(err => {
      console.error('Failed to capture page snapshot:', err);
      glassElements.forEach(el => el.style.visibility = 'visible');
      Container.isCapturing = false;
    });
  }

  initWebGL() {
    if (!this.gl || this.webglInitialized || !Container.pageSnapshot) return;

    const gl = this.gl;

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader with Refraction, Rim Highlight, Blur, and Rounded SDF
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;

      uniform sampler2D u_snapshot;
      uniform vec2 u_resolution;
      uniform vec2 u_screenSize;
      uniform vec2 u_elementPos;
      uniform float u_borderRadius;
      uniform float u_tintOpacity;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDist;
      uniform float u_blurStrength;

      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 q = abs(p) - b + r;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
      }

      void main() {
        vec2 pixelPos = v_uv * u_resolution;
        vec2 halfSize = u_resolution * 0.5;
        vec2 centeredPos = pixelPos - halfSize;
        float d = roundedBoxSDF(centeredPos, halfSize, u_borderRadius);

        if (d > 0.0) {
          discard;
        }

        // Calculate refraction normal vector based on distance to border
        float distToEdge = clamp(-d / (u_edgeDist * min(u_resolution.x, u_resolution.y)), 0.0, 1.0);
        float refractionFactor = pow(1.0 - distToEdge, 2.0);
        vec2 normal = normalize(centeredPos) * refractionFactor;

        // Screen space UV mapping for real refraction
        vec2 globalPixel = u_elementPos + pixelPos + normal * (u_edgeIntensity * u_resolution.x + u_baseIntensity * 50.0);
        vec2 screenUV = globalPixel / u_screenSize;
        screenUV.y = 1.0 - screenUV.y;
        screenUV = clamp(screenUV, 0.0, 1.0);

        // Multi-tap frosted blur sampling
        vec4 blurredColor = vec4(0.0);
        float totalWeight = 0.0;
        float blurStep = (u_blurStrength / u_screenSize.y);

        for (int x = -2; x <= 2; x++) {
          for (int y = -2; y <= 2; y++) {
            float weight = exp(-float(x * x + y * y) / 4.0);
            vec2 offset = vec2(float(x), float(y)) * blurStep;
            blurredColor += texture2D(u_snapshot, clamp(screenUV + offset, 0.0, 1.0)) * weight;
            totalWeight += weight;
          }
        }
        blurredColor /= totalWeight;

        // Specular rim light on edges
        float rim = pow(1.0 - distToEdge, 3.0) * u_rimIntensity;

        // Mix refracted frosted background with glass tint and rim highlight
        vec4 finalColor = mix(blurredColor, vec4(1.0), u_tintOpacity * 0.35);
        finalColor.rgb += vec3(rim * 1.5);
        finalColor.a = 1.0;

        gl_FragColor = finalColor;
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Snapshot Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, Container.pageSnapshot);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Store Uniform Locations
    this.gl_refs = {
      gl,
      program,
      texture,
      resolutionLoc: gl.getUniformLocation(program, 'u_resolution'),
      screenSizeLoc: gl.getUniformLocation(program, 'u_screenSize'),
      elementPosLoc: gl.getUniformLocation(program, 'u_elementPos'),
      borderRadiusLoc: gl.getUniformLocation(program, 'u_borderRadius'),
      tintOpacityLoc: gl.getUniformLocation(program, 'u_tintOpacity'),
      edgeIntensityLoc: gl.getUniformLocation(program, 'u_edgeIntensity'),
      rimIntensityLoc: gl.getUniformLocation(program, 'u_rimIntensity'),
      baseIntensityLoc: gl.getUniformLocation(program, 'u_baseIntensity'),
      edgeDistLoc: gl.getUniformLocation(program, 'u_edgeDist'),
      blurStrengthLoc: gl.getUniformLocation(program, 'u_blurStrength')
    };

    this.webglInitialized = true;
    this.render();
  }

  render() {
    if (!this.webglInitialized || !this.gl) return;

    const gl = this.gl;
    const refs = this.gl_refs;
    gl.useProgram(refs.program);

    const rect = this.element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    gl.uniform2f(refs.resolutionLoc, this.canvas.width, this.canvas.height);
    gl.uniform2f(refs.screenSizeLoc, window.innerWidth, window.innerHeight);
    gl.uniform2f(refs.elementPosLoc, rect.left + scrollX, rect.top + scrollY);
    gl.uniform1f(refs.borderRadiusLoc, this.borderRadius * window.devicePixelRatio);
    gl.uniform1f(refs.tintOpacityLoc, this.tintOpacity);

    // Tunable uniforms
    gl.uniform1f(refs.edgeIntensityLoc, Container.params.edgeIntensity);
    gl.uniform1f(refs.rimIntensityLoc, Container.params.rimIntensity);
    gl.uniform1f(refs.baseIntensityLoc, Container.params.baseIntensity);
    gl.uniform1f(refs.edgeDistLoc, Container.params.edgeDistance);
    gl.uniform1f(refs.blurStrengthLoc, Container.params.blurStrength);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  static updateAll() {
    Container.instances.forEach(inst => {
      inst.updateSizeFromDOM();
      inst.render();
    });
  }
}

window.Container = Container;
