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
/// <reference path = "../EngineCore/Renderer.ts" /> 
/// <reference path = "../EngineCore/RenderContext.ts" /> 

namespace Magnum {
    ///////////////////////////////////////////////////////////////////
    export class Geometry extends Component {
        private primitiveMode: RenderContext.PrimitiveMode;
        private vertexBuffer: RenderContext.VertexBuffer;
        private textures: Array<Magnum.Texture>;
        private shaderProgram: Magnum.ShaderProgram;

        public constructor(gameObject: GameObject) {
            super(gameObject);

            this.primitiveMode = RenderContext.PrimitiveMode.Triangles;
            this.vertexBuffer = null;
            this.textures = new Array<Magnum.Texture>(8);
            this.shaderProgram = null;
        }

        public destructor() {
            if (this.vertexBuffer) {
                RenderContext.deleteVertexBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }

            this.textures = null;
            this.shaderProgram = null;
        }

        public static ClassName() {
            return "Geometry";
        }

        public onConstruct(): boolean {
            return true;
        }

        public init(primitiveMode: RenderContext.PrimitiveMode, positions: Float32Array, colors?: Float32Array,
            texcoord0?: Float32Array, texcoord1?: Float32Array, texcoord2?: Float32Array, texcoord3?: Float32Array,
            texcoord4?: Float32Array, texcoord5?: Float32Array, texcoord6?: Float32Array, texcoord7?: Float32Array,
            usage?: RenderContext.Usage): boolean {

            this.primitiveMode = primitiveMode;
            this.vertexBuffer = RenderContext.createVertexBuffer(
                positions, colors,
                texcoord0, texcoord1, texcoord2, texcoord3,
                texcoord4, texcoord5, texcoord6, texcoord7,
                usage);

            if (!this.vertexBuffer)
                return false;

            return true;
        }

        public setPrimitiveMode(primitiveMode: RenderContext.PrimitiveMode): void {
            this.primitiveMode = primitiveMode;
        }

        public getPrimitiveMode(): RenderContext.PrimitiveMode {
            return this.primitiveMode;
        }

        public getVertexBuffer(): RenderContext.VertexBuffer {
            return this.vertexBuffer;
        }

        public setTexture(textureStage: number, texture: Magnum.Texture) {
            this.textures[textureStage] = texture;
        }

        public getTexture(textureStage: number): Magnum.Texture {
            return this.textures[textureStage];
        }

        public setShaderProgram(shaderProgram: Magnum.ShaderProgram) {
            this.shaderProgram = shaderProgram;
        }

        public getShaderProgram(): Magnum.ShaderProgram {
            return this.shaderProgram;
        }

        public onDestruct(): void {
            if (this.vertexBuffer) {
                RenderContext.deleteVertexBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
        }
    }

    export namespace Geometry {
        export class Renderer extends Magnum.Renderer {
            private flat3DShader: RenderContext.ShaderProgram;
            private gourand3DShader: RenderContext.ShaderProgram;

            private flatTex03DShader: RenderContext.ShaderProgram;
            private gourandTex03DShader: RenderContext.ShaderProgram;

            private flatTex1Tex03DShader: RenderContext.ShaderProgram;
            private gourandTex1Tex03DShader: RenderContext.ShaderProgram;

            private geometries: Array<Geometry>;
            private offsets: Array<Vector3>;

            public constructor(gameObject) {
                super(gameObject);

                this.flat3DShader = null;
                this.gourand3DShader = null;

                this.flatTex03DShader = null;
                this.gourandTex03DShader = null;

                this.flatTex1Tex03DShader = null;
                this.gourandTex1Tex03DShader = null;

                this.geometries = new Array<Geometry>(0);
                this.offsets = new Array<Vector3>(0);
            }

            public destructor() {
            }

            public static ClassName() {
                return "Geometry.Renderer";
            }

            public onConstruct(): boolean {
                if (!super.onConstruct())
                    return false;

                if (!this.initFlat3D())
                    return false;

                if (!this.initGourand3D())
                    return false;

                if (!this.initFlatTex03D())
                    return false;

                if (!this.initGourandTex03D())
                    return false;

                if (!this.initFlatTex1Tex03D())
                    return false;

                if (!this.initGourandTex1Tex03D())
                    return false;

                return true;
            }

            public onDestruct(): void				//	called after all constructors
            {
                super.onDestruct();

                if (this.flat3DShader) {
                    RenderContext.deleteShaderProgram(this.flat3DShader);
                    this.flat3DShader = null;
                }

                if (this.gourand3DShader) {
                    RenderContext.deleteShaderProgram(this.gourand3DShader);
                    this.gourand3DShader = null;
                }

                if (this.flatTex03DShader) {
                    RenderContext.deleteShaderProgram(this.flatTex03DShader);
                    this.flatTex03DShader = null;
                }

                if (this.gourandTex03DShader) {
                    RenderContext.deleteShaderProgram(this.gourandTex03DShader);
                    this.gourandTex03DShader = null;
                }

                if (this.flatTex1Tex03DShader) {
                    RenderContext.deleteShaderProgram(this.flatTex1Tex03DShader);
                    this.flatTex1Tex03DShader = null;
                }

                if (this.gourandTex1Tex03DShader) {
                    RenderContext.deleteShaderProgram(this.gourandTex1Tex03DShader);
                    this.gourandTex1Tex03DShader = null;
                }
            }

            public addGeometry(geometry: Geometry, offset?: Vector3) {
                this.geometries.push(geometry);

                if (offset == undefined)
                    this.offsets.push(Vector3.Zero);
                else
                    this.offsets.push(offset);
            }

            public getOrder(): number {
                return 1;
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////
            private findShaderProgram(fvf: number): RenderContext.ShaderProgram {
                if (!(fvf & RenderContext.FVF.Position)) {
                    return null;
                }
                else {
                    if (!(fvf & RenderContext.FVF.Color)) {
                        if (!(fvf & RenderContext.FVF.TexCoord0) && !(fvf & RenderContext.FVF.TexCoord1)) {
                            return this.flat3DShader;
                        }
                        else if ((fvf & RenderContext.FVF.TexCoord0) && !(fvf & RenderContext.FVF.TexCoord1)) {
                            return this.flatTex03DShader;
                        }
                        else if (!(fvf & RenderContext.FVF.TexCoord0) && (fvf & RenderContext.FVF.TexCoord1)) {
                            Console.assert(false, "TexCoord1 Must have TexCoord0");
                        }
                        else if ((fvf & RenderContext.FVF.TexCoord0) && (fvf & RenderContext.FVF.TexCoord1)) {
                            return this.flatTex1Tex03DShader;
                        }
                    }
                    else {
                        if (!(fvf & RenderContext.FVF.TexCoord0) && !(fvf & RenderContext.FVF.TexCoord1)) {
                            return this.gourand3DShader;
                        }
                        else if ((fvf & RenderContext.FVF.TexCoord0) && !(fvf & RenderContext.FVF.TexCoord1)) {
                            return this.gourandTex03DShader;
                        }
                        else if (!(fvf & RenderContext.FVF.TexCoord0) && (fvf & RenderContext.FVF.TexCoord1)) {
                            Console.assert(false, "TexCoord1 Must have TexCoord0");
                        }
                        else if ((fvf & RenderContext.FVF.TexCoord0) && (fvf & RenderContext.FVF.TexCoord1)) {
                            return this.gourandTex1Tex03DShader;
                        }
                    }
                }
            }

            private updateDefaultUniforms(renderParam: Video.RenderParam, offset: Vector3, color: Color4) {
                var offsetMat = new Matrix4();
                offsetMat.initTranslate(offset.X, offset.Y, offset.Z);
                offsetMat.initIdentity();

                var matM = Matrix4.mul(this.GameObject.getGlobalTransform(), offsetMat);
                var matVM = Matrix4.mul(renderParam.viewTransform, matM);
                var matPVM = Matrix4.mul(renderParam.camera.getProjectionTransform(), matVM);

                RenderContext.setUniformMatrix4fv("uPVMMatrix", matPVM);
                RenderContext.setUniformMatrix4fv("uMMatrix", matM);
                RenderContext.setUniform4f("uColor", color.R, color.G, color.B, color.A);

                for (var i = 0; i < 8; i++) {
                    var uniformName = "texture" + i;
                    RenderContext.setUniform1i(uniformName, i);
                }
            }

            renderByDefaultShader(renderParam: Video.RenderParam, geometry: Geometry, offset: Vector3): void {
                var renderCtxShaderProgram = this.findShaderProgram(geometry.getVertexBuffer().getFVF());
                RenderContext.setShaderProgram(renderCtxShaderProgram);
                RenderContext.setVertexBuffer(geometry.getVertexBuffer());

                this.updateDefaultUniforms(renderParam, offset, new Color4([1, 1, 1, 1]));

                RenderContext.enable(RenderContext.EnableFlags.DepthTest);
                RenderContext.enable(RenderContext.EnableFlags.CullFace);
                RenderContext.cullFace(RenderContext.Face.Back);
                RenderContext.frontFace(RenderContext.FrontFace.CCW);        

                for (var i = 0; i < 8; i++) {
                    var texture = geometry.getTexture(i);
                    if (texture) {
                        var textureCtx = texture.getTextureCtx();
                        if (textureCtx) {
                            RenderContext.setTexture(i, textureCtx);
                        }
                    }
                }

                RenderContext.drawArrays(geometry.getPrimitiveMode());
            }

            renderByCustomShader(renderParam: Video.RenderParam, geometry: Geometry, offset: Vector3): void {
                var shaderProgram = geometry.getShaderProgram();
                var shaderCtx = shaderProgram.getShaderCtx();

                RenderContext.setShaderProgram(shaderCtx);

                RenderContext.setVertexBuffer(geometry.getVertexBuffer());

                RenderContext.enable(RenderContext.EnableFlags.DepthTest);
                RenderContext.enable(RenderContext.EnableFlags.CullFace);
                RenderContext.cullFace(RenderContext.Face.Back);
                RenderContext.frontFace(RenderContext.FrontFace.CCW);                

                this.updateDefaultUniforms(renderParam, offset, new Color4([1, 1, 1, 1]));
                shaderProgram.updateUniforms();

                for (var i = 0; i < 8; i++) {
                    var texture = geometry.getTexture(i);
                    if (texture) {
                        var textureCtx = texture.getTextureCtx();
                        if (textureCtx) {
                            RenderContext.setTexture(i, textureCtx);
                            texture.MagFilter = RenderContext.MagFilter.Linear;
                            texture.MinFilter = RenderContext.MinFilter.LinearMipmapLinear;
                            texture.WrapS = RenderContext.Wrap.ClampToEdge;
                            texture.WrapT = RenderContext.Wrap.ClampToEdge;
                        }
                    }
                }

                RenderContext.drawArrays(geometry.getPrimitiveMode());
            }

            render(renderParam: Video.RenderParam): void {
                for (var i = 0; i < this.geometries.length; i++) {
                    if (this.geometries[i].getShaderProgram())
                        this.renderByCustomShader(renderParam, this.geometries[i], this.offsets[i]);
                    else
                        this.renderByDefaultShader(renderParam, this.geometries[i], this.offsets[i]);
                }
            }

            ///////////////////////////////////////////////////////////////////////////
            private initFlat3D(): boolean {
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

                this.flat3DShader = RenderContext.createShaderProgram(vs, fs);
                if (!this.flat3DShader)
                    return false;

                return true;
            }

            private initGourand3D(): boolean {
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

                return true;
            }

            private initFlatTex03D(): boolean {
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

                this.flatTex03DShader = RenderContext.createShaderProgram(vs, fs);
                if (!this.flatTex03DShader)
                    return false;

                return true;
            }

            private initGourandTex03D(): boolean {
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

                this.gourandTex03DShader = RenderContext.createShaderProgram(vsSource, fsSource);
                if (!this.gourandTex03DShader)
                    return false;

                return true;
            }

            private initFlatTex1Tex03D(): boolean {
                var vs =
                    "attribute vec3 aPosition;" +
                    "attribute vec2 aTexCoord0;" +
                    "attribute vec2 aTexCoord1;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vTexCoord1 = aTexCoord1;" +
                    "	vColor = uColor;" +
                    "}";

                var fs =
                    "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "uniform sampler2D texture0;" +
                    "uniform sampler2D texture1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0) * texture2D(texture1, vTexCoord1);" +
                    "}";

                this.flatTex1Tex03DShader = RenderContext.createShaderProgram(vs, fs);
                if (!this.flatTex03DShader)
                    return false;

                return true;
            }

            private initGourandTex1Tex03D(): boolean {
                var vs =
                    "attribute vec3 aPosition;" +
                    "attribute vec4 aColor;" +
                    "attribute vec2 aTexCoord0;" +
                    "attribute vec2 aTexCoord1;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vTexCoord1 = aTexCoord1;" +
                    "	vColor = uColor * aColor;" +
                    "}";

                var fs =
                    "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "uniform sampler2D texture0;" +
                    "uniform sampler2D texture1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0) * texture2D(texture1, vTexCoord1);" +
                    "}";

                this.gourandTex1Tex03DShader = RenderContext.createShaderProgram(vs, fs);
                if (!this.gourandTex1Tex03DShader)
                    return false;

                return true;
            }
        };
    };
};