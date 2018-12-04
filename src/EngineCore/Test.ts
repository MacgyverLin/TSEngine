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
/// <reference path = "Renderer.ts" /> 
/// <reference path = "RenderContext.ts" /> 

namespace Magnum {
    export class RenderTest {
        public ang = 0.0;

        public flat3DShader: RenderContext.ShaderProgram;
        public flat3DBuffer: RenderContext.VertexBuffer;
        public gourand3DShader: RenderContext.ShaderProgram;
        public gourand3DBuffer: RenderContext.VertexBuffer;
        public flatTex3DShader: RenderContext.ShaderProgram;
        public flatTex3DBuffer: RenderContext.VertexBuffer;
        public flatTex3DTexture: RenderContext.Texture;
        public gourandTex3DShader: RenderContext.ShaderProgram;
        public gourandTex3DBuffer: RenderContext.VertexBuffer;
        public gourandTex3DTexture: RenderContext.Texture;

        public initFlat3D(): boolean {
            var vs =
                "attribute vec3 aPosition;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "" +
                "void main(void) " +
                "{" +
                "    gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "    vColor = uColor;" +
                "}";

            var fs =
                "precision mediump float;" +
                "varying vec4 vColor;" +
                "" +
                "void main(void)" +
                "{" +
                "    gl_FragColor = vColor;" +
                "}";

            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            this.flat3DBuffer = RenderContext.createVertexBuffer(new Float32Array(vertices));
            if (!this.flat3DBuffer)
                return false;

            this.flat3DShader = RenderContext.createShaderProgram(vs, fs);
            if (!this.flat3DShader)
                return false;

            return true;
        }

        public initGourand3D(): boolean {
            var vs =
                "attribute vec3 aPosition;" +
                "attribute vec4 aColor;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vColor = uColor * aColor;" +
                "}";

            var fs =
                "precision mediump float;" +
                "varying vec4 vColor;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor;" +
                "}";

            this.gourand3DShader = RenderContext.createShaderProgram(vs, fs);
            if (!this.gourand3DShader)
                return false;

            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];

            this.gourand3DBuffer = RenderContext.createVertexBuffer(
                new Float32Array(vertices),
                new Float32Array(colors));
            if (!this.gourand3DBuffer)
                return false;

            return true;
        }

        public initFlatTex3D(): boolean {
            var vs =
                "attribute vec3 aPosition;" +
                "attribute vec2 aTexCoord0;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vTexCoord0 = aTexCoord0;" +
                "	vColor = uColor;" +
                "}";

            var fs =
                "precision mediump float;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "uniform sampler2D texture0;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                "}";

            this.flatTex3DShader = RenderContext.createShaderProgram(vs, fs);
            if (!this.flatTex3DShader)
                return false;

            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var uv0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0];
            this.flatTex3DBuffer = RenderContext.createVertexBuffer(new Float32Array(vertices), undefined, new Float32Array(uv0s));
            if (!this.flatTex3DBuffer)
                return false;

            this.flatTex3DTexture = RenderContext.createTexture(RenderContext.TextureTarget.Target2D, 0,
                0, 0, RenderContext.InternalFormat.RGBA, RenderContext.Format.RGBA, RenderContext.Type.UnsignedByte, null, true);
            if (!this.flatTex3DTexture)
                return false;

            return true;
        }

        public initGourandTex3D(): boolean {
            var vsSource =
                "attribute vec3 aPosition;" +
                "attribute vec4 aColor;" +
                "attribute vec2 aTexCoord0;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vTexCoord0 = aTexCoord0;" +
                "	vColor = uColor * aColor;" +
                "}";

            var fsSource =
                "precision mediump float;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "uniform sampler2D texture0;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                "}";

            this.gourandTex3DShader = RenderContext.createShaderProgram(vsSource, fsSource);
            if (!this.gourandTex3DShader)
                return false;

            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var uv0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0];
            this.gourandTex3DBuffer = RenderContext.createVertexBuffer(
                new Float32Array(vertices),
                new Float32Array(colors),
                new Float32Array(uv0s)
            );
            if (!this.gourandTex3DBuffer)
                return false;

            this.gourandTex3DTexture = RenderContext.createTexture(RenderContext.TextureTarget.Target2D, 0,
                0, 0, RenderContext.InternalFormat.RGBA, RenderContext.Format.RGBA, RenderContext.Type.UnsignedByte, null, true);
            if (!this.gourandTex3DTexture)
                return false;

            return true;
        }

        construct(): boolean {
            if (!this.initFlat3D())
                return false;

            if (!this.initGourand3D())
                return false;

            if (!this.initFlatTex3D())
                return false;

            if (!this.initGourandTex3D())
                return false;
            return true;
        }

        destruct() {
            if (this.flat3DShader) {
                RenderContext.deleteShaderProgram(this.flat3DShader);
            }
            if (this.flat3DBuffer) {
                RenderContext.deleteVertexBuffer(this.flat3DBuffer);
            }
            if (this.flatTex3DShader) {
                RenderContext.deleteShaderProgram(this.flatTex3DShader);
            }
            if (this.flatTex3DBuffer) {
                RenderContext.deleteVertexBuffer(this.flatTex3DBuffer);
            }
            if (this.gourand3DShader) {
                RenderContext.deleteShaderProgram(this.gourand3DShader);
            }
            if (this.gourand3DBuffer) {
                RenderContext.deleteVertexBuffer(this.gourand3DBuffer);
            }
            if (this.gourandTex3DShader) {
                RenderContext.deleteShaderProgram(this.gourandTex3DShader);
            }
            if (this.gourandTex3DBuffer) {
                RenderContext.deleteVertexBuffer(this.gourandTex3DBuffer);
            }
        }

        public testDrawScene(renderParam: Video.RenderParam) {
            RenderContext.clearColor(0.0, 0.0, 0.0, 1.0);
            RenderContext.enable(RenderContext.EnableFlags.DepthTest);

            RenderContext.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            RenderContext.clear(RenderContext.ClearFlags.ColorBuffer | RenderContext.ClearFlags.DepthBuffer);

            this.ang++;

            var mMatrix = new Matrix4();
            var vMatrix = renderParam.viewTransform;
            var pMatrix = renderParam.camera.getProjectionTransform();
            var pvmMatrix = new Matrix4();

            ///////////////////////////////////////////////////////////////////////
            RenderContext.setShaderProgram(this.flat3DShader);
            RenderContext.setVertexBuffer(this.flat3DBuffer);
            mMatrix.initTranslateRotZXYScale(-1.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Matrix4.mul(pMatrix, Matrix4.mul(vMatrix, mMatrix));
            RenderContext.setUniform4f("uColor", 0.0, 0.0, 1.0, 1.0);
            RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            RenderContext.drawArrays(RenderContext.PrimitiveMode.TriangleStrip);

            ///////////////////////////////////////////////////////////////////////
            RenderContext.setShaderProgram(this.gourand3DShader);
            RenderContext.setVertexBuffer(this.gourand3DBuffer);
            mMatrix.initTranslateRotZXYScale(-0.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Matrix4.mul(pMatrix, Matrix4.mul(vMatrix, mMatrix));
            RenderContext.setUniform4f("uColor", 1.0, 1.0, 1.0, 1.0);
            RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            RenderContext.drawArrays(RenderContext.PrimitiveMode.TriangleStrip);

            ///////////////////////////////////////////////////////////////////////
            RenderContext.setShaderProgram(this.flatTex3DShader);
            RenderContext.setVertexBuffer(this.flatTex3DBuffer);
            RenderContext.setTexture(0, this.flatTex3DTexture);
            mMatrix.initTranslateRotZXYScale(0.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Matrix4.mul(pMatrix, Matrix4.mul(vMatrix, mMatrix));
            RenderContext.setUniform4f("uColor", 0.0, 0.0, 1.0, 1.0);
            RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            RenderContext.setUniform1i("texture0", 0);
            RenderContext.drawArrays(RenderContext.PrimitiveMode.TriangleStrip);

            ///////////////////////////////////////////////////////////////////////
            RenderContext.setShaderProgram(this.gourandTex3DShader);
            RenderContext.setVertexBuffer(this.gourandTex3DBuffer);
            RenderContext.setTexture(0, this.flatTex3DTexture);
            mMatrix.initTranslateRotZXYScale(1.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Matrix4.mul(pMatrix, Matrix4.mul(vMatrix, mMatrix));
            RenderContext.setUniform4f("uColor", 1.0, 1.0, 1.0, 1.0);
            RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            RenderContext.setUniform1i("texture0", 0);
            RenderContext.drawArrays(RenderContext.PrimitiveMode.TriangleStrip);
        }
    };

    ///////////////////////////////////////////////////////////////////
    export class Test extends Component {
    }

    export namespace Test {
        export class Renderer extends Magnum.Renderer {
            private renderTest: RenderTest;
            private shaderProgram1: ShaderProgram;
            private shaderProgram2: ShaderProgram;
            private test2DFile1: Texture2DFile;
            private test2DFile2: Texture2DFile;
            private test2DFile3: Texture2DFile;

            public constructor(gameObject : GameObject) {
                super(gameObject);

                this.renderTest = new RenderTest();
                this.shaderProgram1 = null;
                this.shaderProgram2 = null;
                this.test2DFile1 = null;
                this.test2DFile2 = null;
                this.test2DFile3 = null;                
            }

            public destructor() {
            }                

            public static ClassName()
            {
                return "Test.Renderer";
            }                    

            public onConstruct(): boolean {
                if (!super.onConstruct())
                    return false;

                if (!this.renderTest.construct())
                    return false;

                this.test2DFile1 = new Texture2DFile("fx1_1");
                if (!this.test2DFile1.construct())
                    return false;

                this.test2DFile2 = new Texture2DFile("fx2_1");
                if (!this.test2DFile2.construct())
                    return false;

                this.test2DFile3 = new Texture2DFile("fx2_2");
                if (!this.test2DFile3.construct())
                    return false;

                this.shaderProgram1 = new ShaderProgram("1");
                if (!this.shaderProgram1.construct())
                    return false;

                this.shaderProgram2 = new ShaderProgram("2");
                if (!this.shaderProgram2.construct())
                    return false;

                return true;
            }

            public onDestruct(): void				//	called after all constructors
            {
                super.onDestruct();

                this.renderTest.destruct();

                this.test2DFile1.destruct();
                this.test2DFile2.destruct();
                this.test2DFile3.destruct();
                this.shaderProgram2.destruct();
                this.shaderProgram1.destruct();
            }

            getOrder(): number {
                return 1;
            }

            render(renderParam: Video.RenderParam): void {
                this.renderTest.testDrawScene(renderParam);
            }
        };
    };
};