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
    export class Sprite extends Component {
        private vertexBuffer: RenderContext.VertexBuffer;
        private texture: Magnum.Texture;
        private shaderProgram: Magnum.ShaderProgram;

        public constructor(gameObject: GameObject) {
            super(gameObject);

            this.vertexBuffer = null;
            this.texture = null;
            this.shaderProgram = null;
        }

        public destructor() {
            this.onDestruct();
        }

        public static ClassName() {
            return "Sprite";
        }

        public onConstruct(): boolean {
            return true;
        }

        public init(textureName: string): boolean {
            var positions = [
                -0.5, +0.5, 0.0,
                +0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, -0.5, 0.0,
            ];
            var colors = [
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var texcoord0s = [
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0];

            this.vertexBuffer = RenderContext.createVertexBuffer(
                new Float32Array(positions), new Float32Array(colors),
                new Float32Array(texcoord0s), undefined, undefined, undefined,
                undefined, undefined, undefined, undefined,
                RenderContext.Usage.DynamicDraw);
            if (!this.vertexBuffer)
                return false;

            this.shaderProgram = new ShaderProgram("default/image");
            if (!this.shaderProgram.construct())
                return false;

            this.texture = new Texture2DFile(textureName);
            if (!this.texture.construct())
                return false;

            return true;
        }

        public getVertexBuffer(): RenderContext.VertexBuffer {
            return this.vertexBuffer;
        }

        public getTexture(): Magnum.Texture {
            return this.texture;
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

            if (this.texture) {
                this.texture.destruct();
                this.texture = null;
            }

            if (this.shaderProgram) {
                this.shaderProgram.destruct();
                this.shaderProgram = null;
            }
        }
    }

    export namespace Sprite {
        export class Renderer extends Magnum.Renderer {
            private sprites: Array<Sprite>;

            public constructor(gameObject) {
                super(gameObject);

                this.sprites = new Array<Sprite>(0);
            }

            public destructor() {
                this.sprites = [];
            }

            public static ClassName() {
                return "Sprite.Renderer";
            }

            public onConstruct(): boolean {
                if (!super.onConstruct())
                    return false;

                return true;
            }

            public onDestruct(): void				//	called after all constructors
            {
                super.onDestruct();

                this.sprites = [];
            }

            public addSprite(sprite: Sprite) {
                this.sprites.push(sprite);
            }

            public getOrder(): number {
                return 1;
            }

            private updateDefaultUniforms(renderParam: Video.RenderParam, textureCtx : RenderContext.Texture, color: Color4) {
                var scaleMat = new Matrix4();
                scaleMat.initScale(textureCtx.Width, textureCtx.Height, 1);
                var matM = Matrix4.mul(this.GameObject.getGlobalTransform(), scaleMat);
                var matVM = Matrix4.mul(renderParam.viewTransform, matM);
                var matPVM = Matrix4.mul(renderParam.camera.getProjectionTransform(), matVM);

                RenderContext.setUniformMatrix4fv("uPVMMatrix", matPVM);
                RenderContext.setUniform4f("uColor", color.R, color.G, color.B, color.A);
                RenderContext.setUniform1i("texture0", 0);
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////
            public renderSprite(renderParam: Video.RenderParam, sprite: Sprite): void {
                var shaderProgram = sprite.getShaderProgram();
                var shaderCtx = shaderProgram.getShaderCtx();
                var texture = sprite.getTexture();
                var textureCtx = texture.getTextureCtx();

                if (shaderCtx && textureCtx) {
                    RenderContext.setShaderProgram(shaderCtx);
                    RenderContext.setTexture(0, textureCtx);

                    RenderContext.setVertexBuffer(sprite.getVertexBuffer());

                    RenderContext.disable(RenderContext.EnableFlags.DepthTest);
                    RenderContext.disable(RenderContext.EnableFlags.CullFace);
                    RenderContext.cullFace(RenderContext.Face.Back);
                    RenderContext.frontFace(RenderContext.FrontFace.CCW);

                    this.updateDefaultUniforms(renderParam, textureCtx, new Color4([1, 1, 1, 1]));
                    shaderProgram.updateUniforms();

                    RenderContext.drawArrays(RenderContext.PrimitiveMode.TriangleStrip);
                }
            }

            public render(renderParam: Video.RenderParam): void {
                for (var i = 0; i < this.sprites.length; i++) {
                    if (this.sprites[i].getShaderProgram() && this.sprites[i].getTexture())
                        this.renderSprite(renderParam, this.sprites[i]);
                }
            }
        };
    };
};