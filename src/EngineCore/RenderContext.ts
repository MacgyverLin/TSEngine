/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright © 2018 Lin Koon Wing, Macgyver
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”),
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR 
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var gl = null;
var extensions = null;

namespace Magnum {
    export class mat4 {
        values = Array<number>(16);

        constructor() {
        }

        public destructor() {
        }

        static create(): mat4 {
            return new mat4().identity();
        }

        transpose() {
            var temp = this;
            this.values[0] = temp.values[0]; this.values[1] = temp.values[4]; this.values[2] = temp.values[8]; this.values[3] = temp.values[12];
            this.values[4] = temp.values[1]; this.values[5] = temp.values[5]; this.values[6] = temp.values[9]; this.values[7] = temp.values[13];
            this.values[8] = temp.values[2]; this.values[9] = temp.values[6]; this.values[10] = temp.values[10]; this.values[11] = temp.values[14];
            this.values[12] = temp.values[3]; this.values[13] = temp.values[7]; this.values[14] = temp.values[11]; this.values[15] = temp.values[15];
        }

        identity(): mat4 {
            this.values[0] = 1; this.values[1] = 0; this.values[2] = 0; this.values[3] = 0;
            this.values[4] = 0; this.values[5] = 1; this.values[6] = 0; this.values[7] = 0;
            this.values[8] = 0; this.values[9] = 0; this.values[10] = 1; this.values[11] = 0;
            this.values[12] = 0; this.values[13] = 0; this.values[14] = 0; this.values[15] = 1;

            return this;
        }

        perspective(a, b, c, d): mat4 {
            a = c * Math.tan(a * Math.PI / 360);
            b = a * b;

            return this.frustum(-b, b, -a, a, c, d);
        };

        frustum(a, b, c, d, e, g): mat4 {
            var h = b - a;
            var i = d - c;
            var j = g - e;

            this.values[0] = e * 2 / h;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = e * 2 / i;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = (b + a) / h;
            this.values[9] = (d + c) / i;
            this.values[10] = -(g + e) / j;
            this.values[11] = -1;
            this.values[12] = 0;
            this.values[13] = 0;
            this.values[14] = -(g * e * 2) / j;
            this.values[15] = 0;

            return this;
        };

        ortho(a, b, c, d, e, g): mat4 {
            var h = b - a;
            var i = d - c;
            var j = g - e;
            this.values[0] = 2 / h;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = 2 / i;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = 0;
            this.values[9] = 0;
            this.values[10] = -2 / j;
            this.values[11] = 0;
            this.values[12] = -(a + b) / h;
            this.values[13] = -(d + c) / i;
            this.values[14] = -(g + e) / j;
            this.values[15] = 1;

            return this;
        };

        translate(b): mat4 {
            var d = b[0];
            var e = b[1];
            b = b[2];
            this.values[12] = this.values[0] * d + this.values[4] * e + this.values[8] * b + this.values[12];
            this.values[13] = this.values[1] * d + this.values[5] * e + this.values[9] * b + this.values[13];
            this.values[14] = this.values[2] * d + this.values[6] * e + this.values[10] * b + this.values[14];
            this.values[15] = this.values[3] * d + this.values[7] * e + this.values[11] * b + this.values[15];
            return this;
        };

        public scale(b) {
            var d = b[0],
                e = b[1];
            b = b[2];

            this.values[0] *= d;
            this.values[1] *= d;
            this.values[2] *= d;
            this.values[3] *= d;
            this.values[4] *= e;
            this.values[5] *= e;
            this.values[6] *= e;
            this.values[7] *= e;
            this.values[8] *= b;
            this.values[9] *= b;
            this.values[10] *= b;
            this.values[11] *= b;
        };

        public rotate(b, c) {
            var e = c[0],
                g = c[1];
            c = c[2];
            var f = Math.sqrt(e * e + g * g + c * c);
            if (f != 1) {
                f = 1 / f;
                e *= f;
                g *= f;
                c *= f
            }
            var radB = b * Math.PI / 180.0
            var h = Math.sin(radB),
                i = Math.cos(radB),
                j = 1 - i;
            b = this.values[0];
            f = this.values[1];
            var k = this.values[2],
                l = this.values[3],
                o = this.values[4],
                m = this.values[5],
                n = this.values[6],
                p = this.values[7],
                r = this.values[8],
                s = this.values[9],
                A = this.values[10],
                B = this.values[11],
                t = e * e * j + i,
                u = g * e * j + c * h,
                v = c * e * j - g * h,
                w = e * g * j - c * h,
                x = g * g * j + i,
                y = c * g * j + e * h,
                z = e * c * j + g * h;
            e = g * c * j - e * h;
            g = c * c * j + i;

            this.values[0] = b * t + o * u + r * v;
            this.values[1] = f * t + m * u + s * v;
            this.values[2] = k * t + n * u + A * v;
            this.values[3] = l * t + p * u + B * v;
            this.values[4] = b * w + o * x + r * y;
            this.values[5] = f * w + m * x + s * y;
            this.values[6] = k * w + n * x + A * y;
            this.values[7] = l * w + p * x + B * y;
            this.values[8] = b * z + o * e + r * g;
            this.values[9] = f * z + m * e + s * g;
            this.values[10] = k * z + n * e + A * g;
            this.values[11] = l * z + p * e + B * g;
        };
    };

    export class RenderContext {
        private static currentShaderProgram: RenderContext.ShaderProgram = null;
        private static currentVertexBuffer: RenderContext.VertexBuffer = null;
        private static currentIndexBuffer: RenderContext.IndexBuffer = null;
        private static currentTextures: Array<RenderContext.Texture> = null;

        public constructor() {
        }

        public destructor() {
        }

        private static getWebGLContext(canvas) {
            return canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("moz-webgl") || canvas.getContext("webkit-3d");
        }

        private static initiateContext(canvasName, width: number, height: number): boolean {
            var canvas: HTMLElement = document.getElementById("glCanvas"); // Handle to canvas tag

            // Initialize WebGL rendering context, if available
            if (gl = this.getWebGLContext(canvas)) {
                Console.info("WebGL is initialized.");

                // Ensure WebGL viewport is resized to match canvas dimensions
                gl.viewportWidth = width;
                gl.viewportHeight = height;

                // Output the WebGL rendering context object
                // to console for reference
                Console.info(gl);

                // List available extensions
                Console.info(extensions = gl.getSupportedExtensions());

                this.currentShaderProgram = null;
                this.currentVertexBuffer = null;
                this.currentIndexBuffer = null;
                this.currentTextures = new Array<RenderContext.Texture>(8);

                return true;
            }
            else {
                Console.error("Your browser doesn't support WebGL.");
                return false;
            }
        }

        public static initiate(width: number, height: number): boolean {
            if (!this.initiateContext("glCanvas", width, height))
                return false;

            return true;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Per-Fragment Operations 
        public static blendColor(red: number, green: number, blue: number, alpha: number): void {
            gl.blendColor(red, green, blue, alpha);
        }

        public static blendEquation(mode: RenderContext.BlendMode): void {
            var modes = [
                gl.FUNC_ADD,
                gl.FUNC_SUBTRACT,
                gl.FUNC_REVERSE_SUBTRACT
            ];

            gl.blendEquation(modes[mode]);
        }

        public static blendEquationSeparate(mode: RenderContext.BlendMode, modeAlpha: RenderContext.BlendMode): void {
            var modes = [
                gl.FUNC_ADD,
                gl.FUNC_SUBTRACT,
                gl.FUNC_REVERSE_SUBTRACT
            ];

            gl.blendEquationSeparate(modes[mode], modes[modeAlpha]);
        }

        public static blendFunc(srcFactor: RenderContext.SrcFactor, dstFactor: RenderContext.DstFactor): void {
            var srcFactors = [
                gl.ZERO,
                gl.ONE,

                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,

                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA,

                gl.SRC_ALPHA_SATURATE
            ];

            var dstFactors = [
                gl.ZERO,
                gl.ONE,

                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,

                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA
            ];

            gl.blendFunc(srcFactors[srcFactor], dstFactors[dstFactor]);
        }

        public static blendFuncSeparate(srcRGB: RenderContext.SrcFactor, dstRGB: RenderContext.DstFactor,
            srcAlpha: RenderContext.SrcFactor, dstAlpha: RenderContext.DstFactor) {
            var srcFactors = [
                gl.ZERO,
                gl.ONE,

                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,

                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA,

                gl.SRC_ALPHA_SATURATE
            ];

            var dstFactors = [
                gl.ZERO,
                gl.ONE,

                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,

                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA
            ];

            gl.blendFuncSeparate(srcFactors[srcRGB], dstFactors[dstRGB],
                srcFactors[srcAlpha], dstFactors[dstAlpha]);
        }

        public static depthFunc(func: RenderContext.DepthFunc): void {
            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];

            gl.depthFunc(funcs[func]);
        }

        public static sampleCoverage(value: number, invert: boolean): void {
            gl.SampleCoverage(value, invert);
        }

        public static stencilFunc(func: RenderContext.StencilFunc, ref: number, mask: number): void {
            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];

            gl.stencilFunc(funcs[func], ref, mask);
        }

        public static stencilFuncSeparate(face: RenderContext.Face, func: RenderContext.StencilFunc, ref: number, mask: number): void {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];

            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];

            gl.stencilFunc(faces[face], funcs[func], ref, mask);
        }

        public static stencilOp(fail: RenderContext.StencilOp, zfail: RenderContext.StencilOp, zpass: RenderContext.StencilOp): void {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];

            var ops = [
                gl.KEEP,
                gl.ZERO,

                gl.REPLACE,

                gl.INCR,
                gl.DECR,

                gl.INVERT,

                gl.INCR_WRAP,
                gl.DECR_WRAP
            ];

            gl.stencilOp(ops[fail], ops[zfail], ops[zpass]);
        }

        public static stencilOpSeparate(face: RenderContext.Face, fail: RenderContext.StencilOp, zfail: RenderContext.StencilOp, zpass: RenderContext.StencilOp): void {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];

            var ops = [
                gl.KEEP,
                gl.ZERO,

                gl.REPLACE,

                gl.INCR,
                gl.DECR,

                gl.INVERT,

                gl.INCR_WRAP,
                gl.DECR_WRAP
            ];

            gl.stencilOpSeparate(faces[face], ops[fail], ops[zfail], ops[zpass]);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // ArrayBuffer and Typed Arrays

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Whole Framebuffer Operations 
        public static clear(value) {
            var bit = 0;

            if (value & RenderContext.ClearFlags.ColorBuffer)
                bit |= gl.COLOR_BUFFER_BIT;
            if (value & RenderContext.ClearFlags.DepthBuffer)
                bit |= gl.DEPTH_BUFFER_BIT;
            if (value & RenderContext.ClearFlags.StencilBuffer)
                bit |= gl.STENCIL_BUFFER_BIT;

            gl.clear(bit);
        }

        public static clearColor(r: number, g: number, b: number, a: number): void {
            gl.clearColor(r, g, b, a);
        }

        public static clearDepth(depth: number): void {
            gl.clearDepth(depth);
        }

        public static clearStencil(depth: number): void {
            gl.clearStencil(depth);
        }

        public static colorMask(rMask: boolean, gMask: boolean, bMask: boolean, aMask: boolean): void {
            gl.colorMask(rMask, gMask, bMask, aMask);
        }

        public static depthMask(mask: boolean): void {
            gl.depthMask(mask);
        }

        public static stencilMask(bit: number): void {
            gl.stencilMask(bit);
        }

        public static stencilMaskSeparate(face: RenderContext.Face, mask: number): void {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];

            gl.stencilMaskSeparate(faces[face], mask);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Buffer Object

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Rasterization
        public static cullFace(face: RenderContext.Face): void {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];

            gl.cullFace(faces[face]);
        }

        public static frontFace(frontface: RenderContext.FrontFace) {
            var frontfaces = [
                gl.CW,
                gl.CCW
            ];

            gl.frontFace(frontfaces[frontface]);
        }

        public static lineWidth(width: number) {
            gl.lineWidth(width);
        }

        public static polygonOffset(factor: number, units: number) {
            gl.polygonOffset(factor, units);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // View And Clip        
        public static depthRange(zNear: number, zFar: number): void {
            gl.depthRange(zNear, zFar);
        }

        public static scissor(x: number, y: number, width: number, height: number): void {
            gl.scissor(x, y, width, height);
        }

        public static viewport(x: number, y: number, width: number, height: number): void {
            gl.viewport(x, y, width, height);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Programs and Shaders
        public static createShaderProgram(vs: string, fs: string, gs?: string, ts?: string, hs?: string): RenderContext.ShaderProgram {
            var shaderProgram = new RenderContext.ShaderProgram();
            if (!shaderProgram.construct(vs, fs, gs, ts, hs))
                return null;

            return shaderProgram;
        }

        public static deleteShaderProgram(shaderProgram: RenderContext.ShaderProgram) {
            if (shaderProgram) {
                shaderProgram.destruct();
                shaderProgram.destructor();
            }
        }

        public static setShaderProgram(shaderProgram: RenderContext.ShaderProgram) {
            if (shaderProgram && shaderProgram.getHandle()) {
                this.currentShaderProgram = shaderProgram;
                gl.useProgram(this.currentShaderProgram.getHandle());
            }
        }

        public static getShaderProgram(): RenderContext.ShaderProgram {
            return this.currentShaderProgram;
        }

        public static createVertexBuffer(positions: Float32Array, colors?: Float32Array,
            texcoord0?: Float32Array, texcoord1?: Float32Array, texcoord2?: Float32Array, texcoord3?: Float32Array,
            texcoord4?: Float32Array, texcoord5?: Float32Array, texcoord6?: Float32Array, texcoord7?: Float32Array,
            usage?: RenderContext.Usage): RenderContext.VertexBuffer {

            if (usage == undefined) {
                usage = RenderContext.Usage.StaticDraw;
            }

            var vertexBuffer = new RenderContext.VertexBuffer();
            if (!vertexBuffer.construct())
                return null;

            if (positions && !vertexBuffer.setPosition(positions, usage))
                return null;

            if (colors && !vertexBuffer.setColor(colors, usage))
                return null;

            if (texcoord0 && !vertexBuffer.setTexCoord(0, texcoord0, 2, usage))
                return null;

            if (texcoord1 && !vertexBuffer.setTexCoord(1, texcoord1, 2, usage))
                return null;

            if (texcoord2 && !vertexBuffer.setTexCoord(2, texcoord2, 2, usage))
                return null;

            if (texcoord3 && !vertexBuffer.setTexCoord(3, texcoord3, 2, usage))
                return null;

            if (texcoord4 && !vertexBuffer.setTexCoord(4, texcoord4, 2, usage))
                return null;

            if (texcoord5 && !vertexBuffer.setTexCoord(5, texcoord5, 2, usage))
                return null;

            if (texcoord6 && !vertexBuffer.setTexCoord(6, texcoord6, 2, usage))
                return null;

            if (texcoord7 && !vertexBuffer.setTexCoord(7, texcoord7, 2, usage))
                return null;

            return vertexBuffer;
        }

        public static deleteVertexBuffer(vertexBuffer: RenderContext.VertexBuffer) {
            if (vertexBuffer) {
                vertexBuffer.destruct();
                vertexBuffer.destructor();
            }
        }

        public static setVertexBuffer(vertexBuffer: RenderContext.VertexBuffer) {
            this.currentVertexBuffer = vertexBuffer;
        }

        public static getVertexBuffer(): RenderContext.VertexBuffer {
            return this.currentVertexBuffer;
        }

        public static setIndexBuffer(indexBuffer: RenderContext.IndexBuffer) {
            this.currentIndexBuffer = indexBuffer;
        }

        public static getIndexBuffer(): RenderContext.IndexBuffer {
            return this.currentIndexBuffer;
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Uniforms and Attributes
        public static setUniform1i(name: string, value: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform1i(uniform.location, value);
        }

        public static setUniform2i(name: string, value1: number, value2: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform2i(uniform.location, value1, value2);
        }

        public static setUniform3i(name: string, value1: number, value2: number, value3: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform3i(uniform.location, value1, value2, value3);
        }

        public static setUniform4i(name: string, value1: number, value2: number, value3: number, value4: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform4i(uniform.location, value1, value2, value3, value4);
        }

        public static setUniform1f(name: string, value: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform1f(uniform.location, value);
        }

        public static setUniform2f(name: string, value1: number, value2: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform2f(uniform.location, value1, value2);
        }

        public static setUniform3f(name: string, value1: number, value2: number, value3: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform3f(uniform.location, value1, value2, value3);
        }

        public static setUniform4f(name: string, value1: number, value2: number, value3: number, value4: number) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform4f(uniform.location, value1, value2, value3, value4);
        }

        public static setUniform1iv(name: string, count: number, value: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform1iv(uniform.location, count, value);
        }

        public static setUniform2iv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform2iv(uniform.location, count, value1, value2);
        }

        public static setUniform3iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform3iv(uniform.location, count, value1, value2, value3);
        }

        public static setUniform4iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform4iv(uniform.location, value1, value2, value3, value4);
        }

        public static setUniform1fv(name: string, count: number, value: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform1fv(uniform.location, count, value);
        }

        public static setUniform2fv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform2fv(uniform.location, count, value1, value2);
        }

        public static setUniform3fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform3fv(uniform.location, count, value1, value2, value3);
        }

        public static setUniform4fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniform4fv(uniform.location, value1, value2, value3, value4);
        }

        public static setUniformMatrix2fv(name: string, mat: Matrix2) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniformMatrix2fv(uniform.location, false, mat.toArrayTranpose());
        }

        public static setUniformMatrix3fv(name: string, mat: Matrix3) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniformMatrix3fv(uniform.location, false, mat.toArrayTranpose());
        }

        public static setUniformMatrix4fv(name: string, mat: Matrix4) {
            if (!this.currentShaderProgram)
                return;

            var uniform = this.currentShaderProgram.getUniform(name)
            if (!uniform)
                return;

            gl.uniformMatrix4fv(uniform.location, false, mat.toArrayTranpose());
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Texture Objects
        public static createTexture(textureTarget: RenderContext.TextureTarget, level: number, width: number, height: number,
            internalFormat: RenderContext.InternalFormat, format: RenderContext.Format, type: RenderContext.Type, object: Object, genMipmap: boolean): RenderContext.Texture {
            var texture = new RenderContext.Texture();
            if (!texture.construct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap))
                return null;

            return texture;
        }

        public static deleteTexture(texture: RenderContext.Texture) {
            if (texture)
                texture.destruct();
        }

        public static setTexture(textureStage: number, texture: RenderContext.Texture) {
            var minFilters = [
                gl.NEAREST,
                gl.LINEAR,
                gl.NEAREST_MIPMAP_NEAREST,
                gl.LINEAR_MIPMAP_NEAREST,
                gl.NEAREST_MIPMAP_LINEAR,
                gl.LINEAR_MIPMAP_LINEAR
            ];

            var magFilters = [
                gl.NEAREST,
                gl.LINEAR
            ];

            var wraps = [
                gl.CLAMP_TO_EDGE,
                gl.MIRRORED_REPEAT,
                gl.REPEAT
            ];

            var textureTargets = [
                gl.TEXTURE_2D,
                gl.TEXTURE_CUBE_MAP,
            ];

            if (texture && texture.getHandle()) {
                gl.activeTexture(gl.TEXTURE0 + textureStage);

                var textureTarget = textureTargets[texture.TextureTarget];
                var minFilter = minFilters[texture.MinFilter];
                var magFilter = magFilters[texture.MagFilter];
                var wrapS = wraps[texture.WrapS];
                var wrapT = wraps[texture.WrapT];
                gl.bindTexture(textureTarget, texture.getHandle());
                gl.texParameteri(textureTarget, gl.TEXTURE_MAG_FILTER, magFilter);
                gl.texParameteri(textureTarget, gl.TEXTURE_MIN_FILTER, minFilter);
                gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_S, wrapS);
                gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_T, wrapT);

                this.currentTextures[textureStage] = texture;
            }
        }

        public static getTexture(textureStage: number): RenderContext.Texture {
            return this.currentTextures[textureStage];
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Writing to the Draw Buffer  
        public static drawArrays(mode: RenderContext.PrimitiveMode, first?: number, count?: number) {
            if (!this.currentShaderProgram)
                return;
            if (!this.currentVertexBuffer)
                return;

            var attributes = this.currentShaderProgram.getAttributes();

            var modes = [
                gl.POINTS,
                gl.LINES,
                gl.LINE_LOOP,
                gl.LINE_STRIP,
                gl.TRIANGLES,
                gl.TRIANGLE_STRIP,
                gl.TRIANGLE_FAN,
            ];

            for (var i = 0; i < 8; i++)
                gl.disableVertexAttribArray(i);

            var position = this.currentVertexBuffer.getPosition();
            if (position && attributes.hasOwnProperty("aPosition")) {
                var attribute = attributes["aPosition"];
                gl.bindBuffer(gl.ARRAY_BUFFER, position.handle);
                gl.vertexAttribPointer(attribute.location, position.itemSize, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(attribute.location);
            }

            var color = this.currentVertexBuffer.getColor();
            if (color && attributes.hasOwnProperty("aColor")) {
                var attribute = attributes["aColor"];
                gl.bindBuffer(gl.ARRAY_BUFFER, color.handle);
                gl.vertexAttribPointer(attribute.location, color.itemSize, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(attribute.location);
            }

            for (var i = 0; i < 8; i++) {
                var texCoord = this.currentVertexBuffer.getTexCoord(i);
                var name = "aTexCoord" + i;
                if (texCoord && attributes.hasOwnProperty(name)) {
                    var attribute = attributes[name];
                    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord.handle);
                    gl.vertexAttribPointer(attribute.location, texCoord.itemSize, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(attribute.location);
                }
            }

            if (!first)
                first = 0;
            if (!count)
                count = position.numItems;

            gl.drawArrays(modes[mode], first, count);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Special Functions
        public static enable(value) {
            if (value & RenderContext.EnableFlags.Blend)
                gl.enable(gl.BLEND);
            if (value & RenderContext.EnableFlags.CullFace)
                gl.enable(gl.CULL_FACE);
            if (value & RenderContext.EnableFlags.DepthTest)
                gl.enable(gl.DEPTH_TEST);
            if (value & RenderContext.EnableFlags.Dither)
                gl.enable(gl.DITHER);
            if (value & RenderContext.EnableFlags.PolygonOffsetFill)
                gl.enable(gl.POLYGON_OFFSET_FILL);
            if (value & RenderContext.EnableFlags.SampleAlphaToCoverage)
                gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            if (value & RenderContext.EnableFlags.SampleCoverage)
                gl.enable(gl.SAMPLE_COVERAGE);
            if (value & RenderContext.EnableFlags.ScissorTest)
                gl.enable(gl.SCISSOR_TEST);
            if (value & RenderContext.EnableFlags.StencilTest)
                gl.enable(gl.STENCIL_TEST);
        }

        public static disable(value) {
            if (value & RenderContext.EnableFlags.Blend)
                gl.disable(gl.BLEND);
            if (value & RenderContext.EnableFlags.CullFace)
                gl.disable(gl.CULL_FACE);
            if (value & RenderContext.EnableFlags.DepthTest)
                gl.disable(gl.DEPTH_TEST);
            if (value & RenderContext.EnableFlags.Dither)
                gl.disable(gl.DITHER);
            if (value & RenderContext.EnableFlags.PolygonOffsetFill)
                gl.disable(gl.POLYGON_OFFSET_FILL);
            if (value & RenderContext.EnableFlags.SampleAlphaToCoverage)
                gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            if (value & RenderContext.EnableFlags.SampleCoverage)
                gl.disable(gl.SAMPLE_COVERAGE);
            if (value & RenderContext.EnableFlags.ScissorTest)
                gl.disable(gl.SCISSOR_TEST);
            if (value & RenderContext.EnableFlags.StencilTest)
                gl.disable(gl.STENCIL_TEST);
        }

        public static isEnabled(cap: RenderContext.EnableFlags): boolean {
            var caps = [
                gl.BLEND,
                gl.CULL_FACE,
                gl.DEPTH_TEST,
                gl.DITHER,
                gl.POLYGON_OFFSET_FILL,
                gl.SAMPLE_ALPHA_TO_COVERAGE,
                gl.SAMPLE_COVERAGE,
                gl.SCISSOR_TEST,
                gl.STENCIL_TEST
            ];

            return gl.isEnabled(caps[cap]);
        }

        public static flush(): void {
            gl.flush();
        }

        public static finish(): void {
            gl.finish();
        }

        public static getError(): number {
            return 0;
        }

        /*
        // Returns: OUT_OF_MEMORY, INVALID_{ENUM, OPERATION, FRAMEBUFFER_OPERATION, VALUE}, NO_ERROR,  CONTEXT_LOST_WEBGL 
        //getParameter(enum pname) 
        pname: {
        ALPHA, RED, GREEN, BLUE, SUBPIXEL}_BITS,  
        ACTIVE_TEXTURE, 
        ALIASED_{LINE_WIDTH, POINT_SIZE}_RANGE, 
        ARRAY_BUFFER_BINDING, 
        BLEND_DST_{ALPHA, RGB}, 
        BLEND_EQUATION_{ALPHA, RGB}, 
        BLEND_SRC_{ALPHA, RGB}, 
        BLEND[_COLOR], 
        COLOR_{CLEAR_VALUE, WRITEMASK}, 
        [NUM_]COMPRESSED_TEXTURE_FORMATS, 
        CULL_FACE[_MODE], 
        CURRENT_PROGRAM, 
        DEPTH_{BITS, CLEAR_VALUE, FUNC, RANGE, TEST,WRITEMASK}, 
        ELEMENT_ARRAY_BUFFER_BINDING, 
        DITHER, 
        FRAMEBUFFER_BINDING, 
        FRONT_FACE, 
        GENERATE_MIPMAP_HINT, 
        LINE_WIDTH, 
        MAX_[COMBINED_]TEXTURE_IMAGE_UNITS, 
        MAX_{CUBE_MAP_TEXTURE, RENDERBUFFER, TEXTURE}_SIZE, 
        MAX_VARYING_VECTORS, 
        MAX_VERTEX_{ATTRIBS,  TEXTURE_IMAGE_UNITS, UNIFORM_VECTORS}, 
        MAX_VIEWPORT_DIMS, PACK_ALIGNMENT,
        POLYGON_OFFSET_{FACTOR, FILL, UNITS}, 
        RENDERBUFFER_BINDING, 
        RENDERER, 
        SAMPLE_BUFFERS, 
        SAMPLE_COVERAGE_{INVERT, VALUE}, 
        SAMPLES, 
        SCISSOR_{BOX, TEST}, 
        SHADING_LANGUAGE_VERSION, 
        STENCIL_{BITS, CLEAR_VALUE, TEST}, 
        STENCIL_[BACK_]{FAIL, FUNC, REF,VALUE_MASK, WRITEMASK},  
        STENCIL_[BACK_]PASS_DEPTH_{FAIL, PASS}, 
        TEXTURE_BINDING_{2D, CUBE_MAP}, 
        UNPACK_ALIGNMENT, 
        UNPACK_{COLORSPACE_CONVERSION_WEBGL, 
        FLIP_Y_WEBGL, 
        PREMULTIPLY_ALPHA_WEBGL}, 
        VENDOR, VERSION, 
        VIEWPORT         
        */

        public static hint(target: RenderContext.HintTarget, mode: RenderContext.HintMode): void {
            var targets = [
                gl.GENERATE_MIPMAP_HINT
            ];

            var modes = [
                gl.FASTEST,
                gl.NICEST,
                gl.DONT_CARE
            ];

            gl.hint(targets[target], modes[mode]);
        }

        public static pixelStorei(pname: RenderContext.PixelStore, param: number): void {
            var pnames = [
                gl.UNPACK_ALIGNMENT,
                gl.UNPACK_FLIP_Y_WEBGL,
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                gl.PACK_FLIP_Y_WEBGL,
                gl.PACK_ALIGNMENT,
                gl.PACK_PREMULTIPLY_ALPHA_WEBGL,
                gl.UNPACK_COLORSPACE_CONVERSION_WEBGL
            ];

            gl.pixelStorei(pnames[pname], param);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Renderbuffer Objects [5.13.7] 
        //void bindRenderbuffer(enum target, Object renderbuffer) target: RENDERBUFFER 
        //Object createRenderbuffer() Note: Corresponding OpenGL ES function is GenRenderbuffers 
        //void deleteRenderbuffer(Object renderbuffer) 
        //any getRenderbufferParameter(enum target, enum pname) target: RENDERBUFFER pname: RENDERBUFFER_{WIDTH,HEIGHT,INTERNAL_FORMAT}, RENDEDRBUFFER_{RED,GREEN,BLUE,ALPHA,DEPTH,STENCIL}_SIZE 
        //bool isRenderbuffer(Object renderbuffer) 
        //void renderbufferStorage(enum target,  enum internalformat, long width, long height) target: RENDERBUFFER internalformat: DEPTH_COMPONENT16, RGBA4, RGB5_A1,  RGB565, STENCIL_INDEX8

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Read Back Pixels 
        // readPixels(x : number, y : number, width : number, height : number, enum format, enum type, Object pixels)
        // format: RGBA type: UNSIGNED_BYTE

        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Framebuffer Objects
        // bindFramebuffer(enum target, Object framebuffer) target: FRAMEBUFFER 
        // enum checkFramebufferStatus(enum target) target: FRAMEBUFFER Returns: FRAMEBUFFER_{COMPLETE, UNSUPPORTED}, FRAMEBUFFER_INCOMPLETE_{ATTACHMENT, DIMENSIONS, MISSING_ATTACHMENT}
        // Object createFramebuffer() Note: Corresponding OpenGL ES function is GenFramebuffers 
        // void deleteFramebuffer(Object buffer) 
        // void framebufferRenderbuffer(enum target, enum attachment, enum renderbuffertarget, Object renderbuffer) target: FRAMEBUFFER attachment: COLOR_ATTACHMENT0, {DEPTH, STENCIL}_ATTACHMENT renderbuffertarget: RENDERBUFFER 
        // bool isFramebuffer(Object framebuffer)
        // void framebufferTexture2D(enum target, enum attachment,  enum textarget, Object texture, int level) target and attachment: Same as for framebufferRenderbuffer textarget: TEXTURE_2D, TEXTURE_CUBE_MAP_POSITIVE{X, Y, Z}, TEXTURE_CUBE_MAP_NEGATIVE{X, Y, Z},  any getFramebufferAttachmentParameter(enum target,  enum attachment, enum pname) target and attachment: Same as for framebufferRenderbuffer pname: FRAMEBUFFER_ATTACHMENT_OBJECT_{TYPE, NAME},  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL,  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE

        /////////////////////////////////
        /*
        private static disableVertexAttribArray(index: number): void
        // index: [0, MAX_VERTEX_ATTRIBS - 1] 
        {
            gl.disableVertexAttribArray(index);
        }

        private static enableVertexAttribArray(index: number): void
        // index: [0, MAX_VERTEX_ATTRIBS - 1] 
        {
            gl.enableVertexAttribArray(index);
        }

        private static getActiveAttrib(program: Object, index: number): Object {
            return gl.getActiveAttrib(program, index);
        }

        private static getActiveUniform(program: Object, index: number): Object {
            return gl.getActiveUniform(program, index);
        }

        private static getAttribLocation(program: Object, name: string): number {
            return gl.getAttribLocation(program, name);
        }

        private static getUniform(program: Object, location: number): any {
            return gl.getUniform(program, location);
        }

        private static getUniformLocation(program: Object, name: string): number {
            return gl.getUniformLocation(program, name);
        }

        private static getVertexAttrib(index: number, pname): any
        // pname: CURRENT_VERTEX_ATTRIB , VERTEX_ATTRIB_ARRAY_ {BUFFER_BINDING, ENABLED, SIZE, STRIDE, TYPE, NORMALIZED} 
        {
            return gl.getVertexAttrib(index, pname);
        }

        private static getVertexAttribOffset(index: number, pname): number
        // Note: Corres. OpenGL ES function is GetVertexAttribPointerv pname: VERTEX_ATTRIB_ARRAY_POINTER 
        {
            return gl.getVertexAttribOffset(index, pname);
        }

        // uniform[1234][fi](uint location, ...) : void 
        // uniform[1234][fi]v(uint location, Array value)  : void
        // uniformMatrix[234]fv(uint location, bool transpose, Array) : void transpose: FALSE 
        // vertexAttrib[1234]f(uint index, ...)  : void
        // vertexAttrib[1234]fv(uint index, Array value)  : void
        // vertexAttribPointer(uint index, int size, enum type, bool normalized, long stride, long offset)  : void
        // type: BYTE, SHORT, UNSIGNED_{BYTE, SHORT}, FIXED, FLOAT index: [0, MAX_VERTEX_ATTRIBS - 1] stride: [0, 255] offset, stride: must be a multiple of the type size in WebGL        
        */
    };

    export namespace RenderContext {
        export enum BlendMode {
            Add = 0x01,
            Subtract = 0x02,
            ReverseSubtract = 0x03
        };

        export enum ClearFlags {
            None = 0x00,
            ColorBuffer = 0x01,
            DepthBuffer = 0x02,
            StencilBuffer = 0x04,
            All = 0x07
        };

        export enum DepthFunc {
            Never = 0,
            Always = 1,
            Less = 2,
            Lequal = 3,
            Equal = 4,
            GEqual = 5,
            Greater = 6,
            NotEqual = 7
        };

        export enum DstFactor {
            Zero = 0,
            One = 1,

            SrcColor = 2,
            SrcAlpha = 3,
            ConstantColor = 4,
            DstColor = 5,
            DstAlpha = 6,
            ConstantAlpha = 7,

            OnMinusSrcColor = 8,
            OnMinusSrcAlpha = 9,
            OnMinusConstantColor = 10,
            OnMinusDstColor = 11,
            OnMinusDstAlpha = 12,
            OnMinusConstantAlpha = 13,
        };

        export enum EnableFlags {
            None = 0x00,
            Blend = 0x01,
            CullFace = 0x02,
            DepthTest = 0x04,
            Dither = 0x08,
            PolygonOffsetFill = 0x10,
            SampleAlphaToCoverage = 0x20,
            SampleCoverage = 0x40,
            ScissorTest = 0x80,
            StencilTest = 0x100,

            All = 0x1ff
        };

        export enum Face {
            Front = 0x00,
            Back = 0x01,
            FrontAndBack = 0x02,
        };

        export enum FrontFace {
            CW = 0x00,
            CCW = 0x01
        };

        export enum HintTarget {
            GenerateMipMapHint = 0
        };

        export enum HintMode {
            Fastest = 0,
            Nicest = 1,
            DontCare = 2
        };

        export enum PrimitiveMode {
            Points = 0,
            Lines = 1,
            LineLoop = 2,
            LineStrip = 3,
            Triangles = 4,
            TriangleStrip = 5,
            TriangleFan = 6,
        };

        export enum SrcFactor {
            Zero = 0,
            One = 1,

            SrcColor = 2,
            SrcAlpha = 3,
            ConstantColor = 4,
            DstColor = 5,
            DstAlpha = 6,
            ConstantAlpha = 7,

            OnMinusSrcColor = 8,
            OnMinusSrcAlpha = 9,
            OnMinusConstantColor = 10,
            OnMinusDstColor = 11,
            OnMinusDstAlpha = 12,
            OnMinusConstantAlpha = 13,

            SrcAlphaSaturate = 14
        };

        export enum StencilFunc {
            Never = 0,
            Always = 1,
            Less = 2,
            Lequal = 3,
            Equal = 4,
            GEqual = 5,
            Greater = 6,
            NotEqual = 7
        };

        export enum StencilOp {
            Keep = 0,
            Zero = 1,
            Replace = 2,

            Increase = 3,
            Decrease = 4,
            Invert = 5,

            IncreaseWrap = 6,
            DecreaseWrap = 7
        };

        export enum PixelStore {
            UNPACK_ALIGNMENT = 0,
            UNPACK_FLIP_Y_WEBGL = 1,
            UNPACK_PREMULTIPLY_ALPHA_WEBGL = 2,
            PACK_ALIGNMENT = 3,
            PACK_FLIP_Y_WEBGL = 4,
            PACK_PREMULTIPLY_ALPHA_WEBGL = 5,
            UNPACK_COLORSPACE_CONVERSION_WEBGL = 6
        };

        export enum MinFilter {
            Nearest = 0, // Returns the value of the texture element that is nearest (in Manhattan distance) to the center of the pixel being textured. 
            Linear = 1,  // Returns the weighted average of the four texture elements that are closest to the center of the pixel being textured. 
            NearestMipmapNearest = 2, // Chooses the mipmap that most closely matches the size of the pixel being textured and uses the GL_NEAREST criterion (the texture element nearest to the center of the pixel) to produce a texture value. 
            LinearMipmapNearest = 3, // Chooses the mipmap that most closely matches the size of the pixel being textured and uses the GL_LINEAR criterion (a weighted average of the four texture elements that are closest to the center of the pixel) to produce a texture value. 
            NearestMipmapLinear = 4, // Chooses the two mipmaps that most closely match the size of the pixel being textured and uses the GL_NEAREST criterion (the texture element nearest to the center of the pixel) to produce a texture value from each mipmap. The final texture value is a weighted average of those two values. 
            LinearMipmapLinear = 5 // Chooses the two mipmaps that most closely match the size of the pixel being textured and uses the GL_LINEAR criterion (a weighted average of the four texture elements that are closest to the center of the pixel) to produce a texture value from each mipmap. The final texture value is a weighted average of those two values.
        };

        export enum MagFilter {
            Nearest = 0, // Returns the value of the texture element that is nearest (in Manhattan distance) to the center of the pixel being textured. 
            Linear = 1,  // Returns the weighted average of the four texture elements that are closest to the center of the pixel being textured. 
        };

        export enum Wrap {
            ClampToEdge = 0,
            Mirror = 1,
            Repeat = 2,
        };

        export enum TextureTarget {
            Target2D = 0,
            TargetCubeMap = 1,
        };

        export enum TextureFace {
            Texture2D = 0,
            CubeMapPositiveX = 1,
            CubeMapPositiveY = 2,
            CubeMapPositiveZ = 3,
            CubeMapNegativeX = 1,
            CubeMapNegativeY = 2,
            CubeMapNegativeZ = 3,
        };

        export enum InternalFormat {
            Alpha,
            Luminance,
            LuminanceAlpha,
            RGB,
            RGBA
        };

        export enum Format {
            Alpha,
            RGB,
            RGBA,
            Luminance,
            LuminanceAlpha
        };

        export enum Type {
            UnsignedByte,
            UnsignedShort565,
            UnsignedShort4444,
            UnsignedShort5551
        };

        export enum FVF {
            None = 0x0000,
            Position = 0x0001,
            Color = 0x0002,
            TexCoord0 = 0x0004,
            TexCoord1 = 0x0008,
            TexCoord2 = 0x0010,
            TexCoord3 = 0x0020,
            TexCoord4 = 0x0040,
            TexCoord5 = 0x0080,
            TexCoord6 = 0x0100,
            TexCoord7 = 0x0200
        };

        export enum Usage {
            StaticDraw = 0,
            StreamDraw = 1,
            DynamicDraw = 2
        };

        export class ShaderProgram {
            private handle;
            private attributes;
            private uniforms;
            private uniformsValues: Array<any>;

            constructor() {
                this.handle = null;
                this.attributes = null;
                this.uniforms = null;
                this.uniformsValues = new Array<any>();
            }

            public destructor() {
            }

            public construct(vs: string, fs: string, gs?: string, ts?: string, hs?: string): boolean {
                return this.onConstruct(vs, fs, gs, ts, hs);
            }

            public destruct(): void {
                this.onDestruct();
            }

            public onConstruct(vs: string, fs: string, gs?: string, ts?: string, hs?: string): boolean {
                this.attributes = {};
                this.uniforms = {};

                var vertexShader = this.getShader(gl.VERTEX_SHADER, vs);
                if (!vertexShader) {
                    console.log("Error in creating Vertex Shader");
                    return false;
                }

                var fragmentShader = this.getShader(gl.FRAGMENT_SHADER, fs);
                if (!fragmentShader) {
                    console.log("Error in creating Fragment Shader");
                    return false;
                }

                var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);

                this.handle = gl.createProgram();
                gl.attachShader(this.handle, vertexShader);
                gl.attachShader(this.handle, fragmentShader);
                gl.linkProgram(this.handle);

                if (!gl.getProgramParameter(this.handle, gl.LINK_STATUS)) {
                    console.log("Error in creating linking Shader Program");
                    return false;
                }

                gl.useProgram(this.handle);

                var numActiveUniforms = gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS);
                for (var i = 0; i < numActiveUniforms; i++) {
                    var uniform = gl.getActiveUniform(this.handle, i);

                    uniform.location = gl.getUniformLocation(this.handle, uniform.name);
                    this.uniforms[uniform.name] = uniform;
                }

                var numActiveAttributes = gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES);
                for (var i = 0; i < numActiveAttributes; i++) {
                    var attribute = gl.getActiveAttrib(this.handle, i);

                    attribute.location = gl.getAttribLocation(this.handle, attribute.name);
                    this.attributes[attribute.name] = attribute;
                }

                if (vertexShader) {
                    gl.deleteShader(vertexShader);
                    vertexShader = null;
                }
                if (fragmentShader) {
                    gl.deleteShader(fragmentShader);
                    fragmentShader = null;
                }

                if (currentProgram)
                    gl.useProgram(currentProgram);

                return true;
            }

            public onDestruct(): void {
                if (this.handle) {
                    gl.deleteProgram(this.handle);
                    this.handle = null;
                }
            }

            public setUniform1i(name: string, value1: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1) {
                    RenderContext.setUniform1i(name, value1);
                }.bind(this, name, value1));
            }

            public setUniform2i(name: string, value1: number, value2: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2) {
                    RenderContext.setUniform2i(name, value1, value2);
                }.bind(this, name, value1, value2));
            }

            public setUniform3i(name: string, value1: number, value2: number, value3: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2, value3) {
                    RenderContext.setUniform3i(name, value1, value2, value3);
                }.bind(this, name, value1, value2, value3));
            }

            public setUniform4i(name: string, value1: number, value2: number, value3: number, value4: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                    RenderContext.setUniform4i(name, value1, value2, value3, value4);
                }.bind(this, name, value1, value2, value3, value4));
            }

            public setUniform1f(name: string, value1: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1) {
                    RenderContext.setUniform1f(name, value1);
                }.bind(this, name, value1));
            }

            public setUniform2f(name: string, value1: number, value2: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2) {
                    RenderContext.setUniform2f(name, value1, value2);
                }.bind(this, name, value1, value2));
            }

            public setUniform3f(name: string, value1: number, value2: number, value3: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2, value3) {
                    RenderContext.setUniform3f(name, value1, value2, value3);
                }.bind(this, name, value1, value2, value3));
            }

            public setUniform4f(name: string, value1: number, value2: number, value3: number, value4: number) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                    RenderContext.setUniform4f(name, value1, value2, value3, value4);
                }.bind(this, name, value1, value2, value3, value4));
            }

            public setUniform1iv(name: string, count: number, value1: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1) {
                    RenderContext.setUniform1iv(name, count, value1);
                }.bind(this, name, count, value1));
            }

            public setUniform2iv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2) {
                    RenderContext.setUniform2iv(name, count, value1, value2);
                }.bind(this, name, count, value1, value2));
            }

            public setUniform3iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2, value3) {
                    RenderContext.setUniform3iv(name, count, value1, value2, value3);
                }.bind(this, name, count, value1, value2, value3));
            }

            public setUniform4iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                    RenderContext.setUniform4iv(name, count, value1, value2, value3, value4);
                }.bind(this, name, count, value1, value2, value3, value4));
            }

            public setUniform1fv(name: string, count: number, value1: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1) {
                    RenderContext.setUniform1fv(name, count, value1);
                }.bind(this, name, count, value1));
            }

            public setUniform2fv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2) {
                    RenderContext.setUniform2fv(name, count, value1, value2);
                }.bind(this, name, count, value1, value2));
            }

            public setUniform3fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2, value3) {
                    RenderContext.setUniform3fv(name, count, value1, value2, value3);
                }.bind(this, name, count, value1, value2, value3));
            }

            public setUniform4fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                    RenderContext.setUniform4fv(name, count, value1, value2, value3, value4);
                }.bind(this, name, count, value1, value2, value3, value4));
            }

            public setUniformMatrix2fv(name: string, mat: Matrix2) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix2fv(name, mat);
                }.bind(this, name, mat));
            }

            public setUniformMatrix3fv(name: string, mat: Matrix3) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix3fv(name, mat);
                }.bind(this, name, mat));
            }

            public setUniformMatrix4fv(name: string, mat: Matrix4) {
                if (!this.handle)
                    return;

                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix4fv(name, mat);
                }.bind(this, name, mat));
            }

            public updateUniforms() {
                if (!this.handle)
                    return;

                for (var i = 0; i < this.uniformsValues.length; i++) {
                    this.uniformsValues[i]();
                }

                this.uniformsValues = [];
            }

            public getAttributes() {
                return this.attributes;
            }

            public getUniforms() {
                return this.uniforms;
            }

            public getAttributesCount() {
                return this.attributes.length;
            }

            public getUniformsCount() {
                return this.uniforms.length;
            }

            public getAttribute(name: string) {
                return this.attributes[name];
            }

            public getUniform(name: string) {
                return this.uniforms[name];
            }

            public getHandle() {
                return this.handle;
            }

            getShader(type, source) {
                var shader;
                if (type == gl.VERTEX_SHADER)
                    shader = gl.createShader(gl.VERTEX_SHADER);
                else if (type == gl.FRAGMENT_SHADER)
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                else
                    return null;

                gl.shaderSource(shader, source);
                gl.compileShader(shader);

                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.log(gl.getShaderInfoLog(shader));
                    return null;
                }

                return shader;
            }

            setUniforms(camera, translate, rotateAngle, rotateAxis, scale, color, texture) {
                var projectionViewMat = camera.getProjectionViewMatrix();
                gl.uniformMatrix4fv(this.uniforms["uPMatrix"], false, projectionViewMat);

                var modelMat = new mat4();
                modelMat.identity();
                modelMat.translate(translate);
                modelMat.rotate(rotateAngle * Math.PI / 180, rotateAxis);
                modelMat.scale(scale);
                gl.uniformMatrix4fv(this.uniforms["uMVMatrix"], false, modelMat);
                gl.uniform4fv(this.uniforms["uColor"], color);
                gl.uniform1i(this.uniforms["uTexture0"], 0);
            }
        };

        export class VertexBuffer {
            private attributes;
            private fvf: number;

            constructor() {
                this.attributes = {};
                this.fvf = RenderContext.FVF.None;
            }

            public destructor() {
            }

            public construct(): boolean {
                return this.onConstruct();
            }

            public destruct(): void {
                this.onDestruct();
            }

            public onConstruct(): boolean {
                return true;
            }

            public onDestruct(): void {
                for (var key in this.attributes) {
                    var attribute = this.attributes[key];
                    if (attribute.handle) {
                        gl.deleteBuffer(attribute.handle);
                        attribute.handle = null;
                    }
                }

                this.attributes = {};
            }

            public getFVF(): number {
                return this.fvf;
            }

            private createVertexAttribute(data: Float32Array, itemSize: number, usage: RenderContext.Usage): Object {
                var usages = [
                    gl.STATIC_DRAW,
                    gl.STREAM_DRAW,
                    gl.DYNAMIC_DRAW
                ];

                var attibute = { handle: null, itemSize: 0, numItems: 0 };
                attibute.handle = gl.createBuffer();
                if (!attibute.handle)
                    return null;

                if (!usage)
                    usage = RenderContext.Usage.StaticDraw;

                gl.bindBuffer(gl.ARRAY_BUFFER, attibute.handle);
                gl.bufferData(gl.ARRAY_BUFFER, data, usages[usage]);
                attibute.itemSize = itemSize;
                attibute.numItems = data.length / attibute.itemSize;

                return attibute;
            }

            public getAttributes() {
                return this.attributes;
            }

            public setAttribute(attribute: RenderContext.FVF, data: Float32Array, itemSize: number, usage?: RenderContext.Usage): boolean {
                this.attributes[attribute] = this.createVertexAttribute(data, itemSize, usage);

                this.fvf |= attribute;

                return this.attributes[attribute] != null;
            }

            public getAttribute(attribute: RenderContext.FVF) {
                return this.attributes[attribute];
            }

            public setPosition(positions: Float32Array, usage?: RenderContext.Usage): boolean {
                return this.setAttribute(RenderContext.FVF.Position, positions, 3, usage);
            }

            public getPosition() {
                return this.getAttribute(RenderContext.FVF.Position);
            }

            public setColor(colors: Float32Array, usage?: RenderContext.Usage): boolean {
                return this.setAttribute(RenderContext.FVF.Color, colors, 4, usage);
            }

            public getColor() {
                return this.getAttribute(RenderContext.FVF.Color);
            }

            public setTexCoord(i: number, texcoords: Float32Array, itemSize: number, usage?: RenderContext.Usage): boolean {
                return this.setAttribute(RenderContext.FVF.TexCoord0 << i, texcoords, 2, usage);
            }

            public getTexCoord(i: number) {
                return this.getAttribute(RenderContext.FVF.TexCoord0 << i);
            }
        };

        export class IndexBuffer {
            private indexAttribute;

            constructor() {
                this.indexAttribute = {};
            }

            public destructor() {
            }

            public construct(): boolean {
                return this.onConstruct();
            }

            public destruct(): void {
                this.onDestruct();
            }

            public onConstruct(): boolean {
                return true;
            }

            public onDestruct(): void {
                if (this.indexAttribute.handle) {
                    gl.deleteBuffer(this.indexAttribute.handle);
                    this.indexAttribute.handle = null;
                }

                this.indexAttribute = {};
            }

            private createIndexAttribute(data: Int16Array, usage: IndexBuffer.Usage): Object {
                var usages = [
                    gl.STATIC_DRAW,
                    gl.STREAM_DRAW,
                    gl.DYNAMIC_DRAW
                ];

                var attibute = { handle: null, itemSize: 0, numItems: 0 };
                attibute.handle = gl.createBuffer();
                if (!attibute.handle)
                    return null;

                if (!usage)
                    usage = RenderContext.Usage.StaticDraw;

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attibute.handle);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usages[usage]);
                attibute.itemSize = 2;
                attibute.numItems = data.length / attibute.itemSize;

                return attibute;
            }

            public setIndices(indices: Int16Array, usage?: IndexBuffer.Usage): boolean {
                this.indexAttribute = this.createIndexAttribute(indices, usage);

                return this.indexAttribute != null;
            }

            public getIndices() {
                return this.indexAttribute.buffer;
            }
        };

        export class Texture {
            public handle;
            public width: number;
            public height: number;
            public mipmap: boolean;

            public textureTarget: RenderContext.TextureTarget;
            private minFilter: RenderContext.MinFilter;
            private magFilter: RenderContext.MagFilter;
            private wrapS: RenderContext.Wrap;
            private wrapT: RenderContext.Wrap;

            private static pot(n: number): boolean {
                return (n > 0) && (n & (n - 1)) == 0;
            }

            public constructor() {
                this.handle = null;
                this.width = 0;
                this.height = 0;
                this.mipmap = false;

                this.textureTarget = RenderContext.TextureTarget.Target2D;
                this.minFilter = RenderContext.MinFilter.Linear;
                this.magFilter = RenderContext.MagFilter.Linear;
                this.wrapS = RenderContext.Wrap.Repeat;
                this.wrapT = RenderContext.Wrap.Repeat;
            }

            public destructor() {
            }

            public construct(textureTarget: RenderContext.TextureTarget, level: number, width: number, height: number,
                internalFormat: RenderContext.InternalFormat, format: RenderContext.Format, type: RenderContext.Type, object, genMipmap: boolean): boolean {
                return this.onConstruct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap);
            }

            public destruct(): void {
                this.onDestruct();
            }

            public onConstruct(textureTarget: RenderContext.TextureTarget, level: number, width: number, height: number,
                internalFormat: RenderContext.InternalFormat, format: RenderContext.Format, type: RenderContext.Type, object, genMipmap: boolean): boolean {

                var textureTargets = [
                    gl.TEXTURE_2D,
                    gl.TEXTURE_CUBE_MAP,
                ];

                var textureFaces = [
                    gl.TEXTURE_2D,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
                ];

                var internalFormats = [
                    gl.ALPHA,
                    gl.LUMINANCE,
                    gl.LUMINANCE_ALPHA,
                    gl.RGB,
                    gl.RGBA
                ];

                var formats = [
                    gl.ALPHA,
                    gl.RGB,
                    gl.RGBA,
                    gl.LUMINANCE,
                    gl.LUMINANCE_ALPHA
                ];

                var types =
                    [
                        gl.UNSIGNED_BYTE,
                        gl.UNSIGNED_SHORT_5_6_5,
                        gl.UNSIGNED_SHORT_4_4_4_4,
                        gl.UNSIGNED_SHORT_5_5_5_1
                    ];

                var bindings =
                    [
                        gl.TEXTURE_BINDING_2D,
                        gl.TEXTURE_BINDING_CUBE_MAP,
                        gl.TEXTURE_BINDING_CUBE_MAP,
                        gl.TEXTURE_BINDING_CUBE_MAP,
                        gl.TEXTURE_BINDING_CUBE_MAP,
                        gl.TEXTURE_BINDING_CUBE_MAP,
                        gl.TEXTURE_BINDING_CUBE_MAP
                    ];

                if (!object) {
                    var currentTexture;
                    currentTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);

                    this.handle = gl.createTexture();
                    if (!this.handle)
                        return false;

                    var data = new Int8Array(256 * 256 * 4);
                    var idx = 0;
                    for (var j = 0; j < 256; j++) {
                        for (var i = 0; i < 256; i++) {
                            var a = (i % 64) < 32;
                            var b = (j % 64) < 32;
                            if ((a && !b) || (!a && b)) {
                                data[idx++] = 255;
                                data[idx++] = 255;
                                data[idx++] = 255;
                            }
                            data[idx++] = 255;
                        }
                    }

                    gl.bindTexture(gl.TEXTURE_2D, this.handle);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                    gl.generateMipmap(gl.TEXTURE_2D);

                    this.textureTarget = textureTarget;
                    this.width = 256;
                    this.height = 256;
                    this.mipmap = true;

                    if (currentTexture)
                        gl.bindTexture(gl.TEXTURE_2D, currentTexture);
                    /*
                    var img = new Image();
                    img.onload = function () {
                        var oldBindedTexture;
                        oldBindedTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);

                        this.ctx = gl.createTexture();
                        if (!this.ctx)
                            return false;

                        gl.bindTexture(gl.TEXTURE_2D, this.ctx);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

                        this.textureTarget = textureTarget;
                        this.width = img.width;
                        this.height = img.height;
                        if (Texture.pot(img.width) && Texture.pot(img.height) && genMipmap) {
                            gl.generateMipmap(gl.TEXTURE_2D);
                            this.mipmap = true;
                        }
                        else {
                            this.mipmap = false;
                        }

                        gl.bindTexture(gl.TEXTURE_2D, oldBindedTexture);
                    }.bind(this);
                    img.src = "assets/block.png";
                    */
                }
                else {
                    var image = object;
                    var currentTexture;
                    currentTexture = gl.getParameter(bindings[textureTarget]);

                    this.handle = gl.createTexture();
                    if (!this.handle)
                        return false;

                    gl.bindTexture(textureTargets[textureTarget], this.handle);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_WRAP_T, gl.REPEAT);
                    gl.texImage2D(textureFaces[0], 0, internalFormats[internalFormat], formats[format], types[type], image);

                    this.textureTarget = textureTarget;
                    this.width = image.width;
                    this.height = image.height;
                    if (Texture.pot(image.width) && Texture.pot(image.height) && genMipmap) {
                        gl.generateMipmap(textureTargets[textureTarget]);
                        this.mipmap = true;
                    }
                    else {
                        this.mipmap = false;
                    }

                    if (currentTexture)
                        gl.bindTexture(textureTargets[textureTarget], currentTexture);
                }
                return true;
            }

            public onDestruct(): void {
                if (this.handle) {
                    gl.deleteTexture(this.handle);
                    this.handle = null;
                }
            }

            public getHandle() {
                return this.handle;
            }

            public get Width(): number {
                return this.width;
            }

            public get Height(): number {
                return this.height;
            }

            public get PowerOf2() {
                return Texture.pot(this.width) && Texture.pot(this.height);
            }

            public get Mipmap(): boolean {
                return this.mipmap;
            }

            public get TextureTarget(): RenderContext.TextureTarget {
                return this.textureTarget;
            }

            public get MinFilter() {
                return this.minFilter;
            }

            public set MinFilter(value: RenderContext.MinFilter) {
                this.minFilter = value;
            }

            public get MagFilter() {
                return this.magFilter;
            }

            public set MagFilter(value: RenderContext.MagFilter) {
                this.magFilter = value;
            }

            public get WrapS() {
                return this.wrapS;
            }

            public set WrapS(value: RenderContext.Wrap) {
                this.wrapS = value;
            }

            public get WrapT() {
                return this.wrapT;
            }

            public set WrapT(value: RenderContext.Wrap) {
                this.wrapT = value;
            }
        };
    };
};