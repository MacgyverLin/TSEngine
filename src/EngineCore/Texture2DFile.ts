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

namespace Magnum {
    export class Texture2DFile extends Texture2D {
        resource: Texture2DFile.Resource;
        path: string;

        public constructor(path) {
            super();

            this.resource = null;
            this.path = path;
        }

        public destructor() {
        }

        public onConstruct(): boolean {
            this.resource = Texture2DFile.Resource.get(this.path);
            this.resource.addRef();
            return true;
        }

        public onDestruct(): void {
            Texture2DFile.Resource.release(this.resource);
            this.resource = null;
        }

        public get Width(): number {
            if (!this.getTextureCtx())
                return super.Width;
            else
                return this.resource.Width;
        }

        public get Height(): number {
            if (!this.getTextureCtx())
                return super.Height;
            else
                return this.resource.Height;
        }

        public get PowerOf2(): boolean {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.PowerOf2;
        }

        public get Mipmap(): boolean {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.Mipmap;
        }

        public get MinFilter() {
            if (!this.getTextureCtx())
                return super.MinFilter;
            else
                return this.resource.MinFilter;
        }

        public set MinFilter(value: RenderContext.MinFilter) {
            if (!this.getTextureCtx())
                super.MinFilter = value;
            else
                this.resource.MinFilter = value;
        }

        public get MagFilter() {
            if (!this.getTextureCtx())
                return super.MagFilter;
            else
                return this.resource.MagFilter;
        }

        public set MagFilter(value: RenderContext.MagFilter) {
            if (!this.getTextureCtx())
                super.MagFilter = value;
            else
                this.resource.MagFilter = value;
        }

        public get WrapS() {
            if (!this.getTextureCtx())
                return super.WrapS;
            else
                return this.resource.WrapS;
        }

        public set WrapS(value: RenderContext.Wrap) {
            if (!this.getTextureCtx())
                super.WrapS = value;
            else
                this.resource.WrapS = value;
        }

        public get WrapT() {
            if (!this.getTextureCtx())
                return super.WrapT;
            else
                return this.resource.WrapT;
        }

        public set WrapT(value: RenderContext.Wrap) {
            if (!this.getTextureCtx())
                super.WrapT = value;
            else
                this.resource.WrapT = value;
        }

        public getTextureCtx() {
            if (!this.resource)
                return null;
            else
                return this.resource.getTextureCtx();
        }
    };

    export namespace Texture2DFile {
        export class Data {
            public constructor() {
            }

            public destructor() {
            }
        };

        export class Resource extends ResourceAccess {
            private ctx: RenderContext.Texture;

            public constructor(name: string) {
                super(name);

                this.ctx = null;
            }

            public destructor() {
                super.destructor();

                this.ctx = null;
            }

            protected onConstruct(): boolean {
                console.log("Texture2DFile.Resource.onConstruct ");
                return true;
            }

            protected onParse(blob: Blob): void {
                Console.debug("Texture2DFile.Resource.onParse");

                var img = new Image();
                img.onload = function () {
                    this.ctx = RenderContext.createTexture(RenderContext.TextureTarget.Target2D, 0,
                        img.width, img.height, RenderContext.InternalFormat.RGBA, RenderContext.Format.RGBA,
                        RenderContext.Type.UnsignedByte, img, true);
                    //this.texture.MinFilter = RenderContext.MinFilter.NearestMipmapLinear;

                    if (this.ctx == null)
                        this.setParseFailed();
                    else
                        this.setParseSucceed();
                }.bind(this);
                img.src = window.URL.createObjectURL(blob); //document.getElementsByTagName("body")[0].appendChild(img);
            }

            protected onDestruct(): void {
                Console.debug("Texture2DFile.Resource.onDestruct");

                if (this.ctx) {
                    RenderContext.deleteTexture(this.ctx);
                    this.ctx = null;
                }
            }

            public getTextureCtx(): RenderContext.Texture {
                return this.ctx;
            }

            public get Width(): number {
                return this.ctx.Width;
            }

            public get Height(): number {
                return this.ctx.Height;
            }

            public get PowerOf2(): boolean {
                return this.ctx.PowerOf2;
            }

            public get Mipmap(): boolean {
                return this.ctx.Mipmap;
            }

            public get MinFilter() {
                return this.ctx.MinFilter;
            }

            public set MinFilter(value: RenderContext.MinFilter) {
                this.ctx.MinFilter = value;
            }

            public get MagFilter() {
                return this.ctx.MagFilter;
            }

            public set MagFilter(value: RenderContext.MagFilter) {
                this.ctx.MagFilter = value;
            }

            public get WrapS() {
                return this.ctx.WrapS;
            }

            public set WrapS(value: RenderContext.Wrap) {
                this.ctx.WrapS = value;
            }

            public get WrapT() {
                return this.ctx.WrapT;
            }

            public set WrapT(value: RenderContext.Wrap) {
                this.ctx.WrapT = value;
            }

            public static extensionTag(): string {
                return "png";
            }

            public extension(): string {
                return Texture2DFile.Resource.extensionTag();
            }

            public static get(path: string): Texture2DFile.Resource {
                return ResourceAccess.get(path, Texture2DFile.Resource.extensionTag()) as Texture2DFile.Resource;
            }
        };

        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }

        public destructor() {
        }                
        };
        */
    };
};