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
/// <reference path = "Texture2D.ts" /> 
/// <reference path = "Video.ts" /> 

namespace Magnum {
    export class ShaderProgram {
        private resource: ShaderProgram.Resource;
        private path: string;
        private uniformsValues : Array<any>;
        
        public constructor(path) {
            this.resource = null;
            this.path = path;
            this.uniformsValues = new Array<any>();
        }

        public construct(): boolean {
            return this.onConstruct();
        }

        public destruct(): void {
            this.onDestruct();
        }

        public onConstruct(): boolean {
            this.resource = ShaderProgram.Resource.get(this.path);
            this.resource.addRef();
            return true;
        }

        public onDestruct(): void {
            ShaderProgram.Resource.release(this.resource);
            this.resource = null;
        }

        public setUniform1i(name: string, value1: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1) {
                RenderContext.setUniform1i(name, value1);
            }.bind(this, name, value1));
        }

        public setUniform2i(name: string, value1: number, value2: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2) {
                RenderContext.setUniform2i(name, value1, value2);
            }.bind(this, name, value1, value2));
        }

        public setUniform3i(name: string, value1: number, value2: number, value3: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2, value3) {
                RenderContext.setUniform3i(name, value1, value2, value3);
            }.bind(this, name, value1, value2, value3));
        }

        public setUniform4i(name: string, value1: number, value2: number, value3: number, value4: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                RenderContext.setUniform4i(name, value1, value2, value3, value4);
            }.bind(this, name, value1, value2, value3, value4));
        }

        public setUniform1f(name: string, value1: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1) {
                RenderContext.setUniform1f(name, value1);
            }.bind(this, name, value1));
        }

        public setUniform2f(name: string, value1: number, value2: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2) {
                RenderContext.setUniform2f(name, value1, value2);
            }.bind(this, name, value1, value2));
        }

        public setUniform3f(name: string, value1: number, value2: number, value3: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2, value3) {
                RenderContext.setUniform3f(name, value1, value2, value3);
            }.bind(this, name, value1, value2, value3));
        }

        public setUniform4f(name: string, value1: number, value2: number, value3: number, value4: number) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                RenderContext.setUniform4f(name, value1, value2, value3, value4);
            }.bind(this, name, value1, value2, value3, value4));
        }

        public setUniform1iv(name: string, count: number, value1: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1) {
                RenderContext.setUniform1iv(name, count, value1);
            }.bind(this, name, count, value1));
        }

        public setUniform2iv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2) {
                RenderContext.setUniform2iv(name, count, value1, value2);
            }.bind(this, name, count, value1, value2));
        }

        public setUniform3iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2, value3) {
                RenderContext.setUniform3iv(name, count, value1, value2, value3);
            }.bind(this, name, count, value1, value2, value3));
        }

        public setUniform4iv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                RenderContext.setUniform4iv(name, count, value1, value2, value3, value4);
            }.bind(this, name, count, value1, value2, value3, value4));
        }

        public setUniform1fv(name: string, count: number, value1: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1) {
                RenderContext.setUniform1fv(name, count, value1);
            }.bind(this, name, count, value1));
        }

        public setUniform2fv(name: string, count: number, value1: Array<number>, value2: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2) {
                RenderContext.setUniform2fv(name, count, value1, value2);
            }.bind(this, name, count, value1, value2));
        }

        public setUniform3fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2, value3) {
                RenderContext.setUniform3fv(name, count, value1, value2, value3);
            }.bind(this, name, count, value1, value2, value3));
        }

        public setUniform4fv(name: string, count: number, value1: Array<number>, value2: Array<number>, value3: Array<number>, value4: Array<number>) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                RenderContext.setUniform4fv(name, count, value1, value2, value3, value4);
            }.bind(this, name, count, value1, value2, value3, value4));
        }

        public setUniformMatrix2fv(name: string, mat: Matrix2) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, mat) {
                RenderContext.setUniformMatrix2fv(name, mat);
            }.bind(this, name, mat));
        }

        public setUniformMatrix3fv(name: string, mat: Matrix3) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, mat) {
                RenderContext.setUniformMatrix3fv(name, mat);
            }.bind(this, name, mat));
        }

        public setUniformMatrix4fv(name: string, mat: Matrix4) {
            if (!this.getShaderCtx())
                return;

            this.uniformsValues.push(function (name, mat) {
                RenderContext.setUniformMatrix4fv(name, mat);
            }.bind(this, name, mat));
        }

        public updateUniforms() {
            if (!this.getShaderCtx())
                return;

            for (var i=0; i<this.uniformsValues.length; i++) {
                this.uniformsValues[i]();
            }

            this.uniformsValues = [];
        }

        public getShaderCtx() {
            if(!this.resource)
                return null;
            else
                return this.resource.getShaderCtx();
        }
    };

    export namespace ShaderProgram {
        export class Data {
            public constructor() {
            }

            public destructor() {
            }
        };

        export class Resource extends ResourceAccess {
            private shaderCtx: RenderContext.ShaderProgram;

            public constructor(name: string) {
                super(name);

                this.shaderCtx = null;
            }

            public destructor() {
                super.destructor();

                this.shaderCtx = null;
            }

            public getAttributes() {
                if (!this.shaderCtx)
                    return null;

                return this.shaderCtx.getAttributes();
            }

            public getUniforms() {
                if (!this.shaderCtx)
                    return null;

                return this.shaderCtx.getUniforms();
            }

            public getAttributesCount() {
                if (!this.shaderCtx)
                    return 0;

                return this.shaderCtx.getAttributesCount();
            }

            public getUniformsCount() {
                if (!this.shaderCtx)
                    return 0;

                return this.shaderCtx.getUniformsCount();
            }

            public getAttribute(name: string) {
                if (!this.shaderCtx)
                    return null;

                return this.shaderCtx.getAttribute(name);
            }

            public getUniform(name: string) {
                if (!this.shaderCtx)
                    return null;

                return this.shaderCtx.getUniform(name);
            }

            public getShaderCtx(): RenderContext.ShaderProgram {
                return this.shaderCtx;
            }

            protected onConstruct(): boolean {
                console.log("ShaderProgram.Resource.onConstruct ");
                return true;
            }

            protected onParse(blob: Blob): void {
                Console.debug("ShaderProgram.Resource.onParse");
                var fr = new FileReader();
                fr.onload = function (evt) {
                    var json = JSON.parse(fr.result as string);
                    var vertexShaderSource = json["vertexshader"];
                    vertexShaderSource = vertexShaderSource.join("");
                    var fragmentShaderSource = json["fragmentshader"];
                    fragmentShaderSource = fragmentShaderSource.join("");

                    this.shaderCtx = RenderContext.createShaderProgram(vertexShaderSource, fragmentShaderSource);
                    if (this.shaderCtx == null)
                        this.setParseFailed();
                    else
                        this.setParseSucceed();
                }.bind(this);

                fr.readAsText(blob);
            }

            protected onDestruct(): void {
                Console.debug("ShaderProgram.Resource.onDestruct");
                if (this.shaderCtx) {
                    RenderContext.deleteShaderProgram(this.shaderCtx);
                    this.shaderCtx = null;
                }
            }

            public static extensionTag(): string {
                return "shader";
            }

            public extension(): string {
                return ShaderProgram.Resource.extensionTag();
            }

            public static get(path: string): ShaderProgram.Resource {
                return ResourceAccess.get(path, ShaderProgram.Resource.extensionTag()) as ShaderProgram.Resource;
            }
        };

        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }
        };
        */
    };
};