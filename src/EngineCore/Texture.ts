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
namespace Magnum {
    export class Texture {
        constructor()
        {
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
        }

        public getTextureCtx(): RenderContext.Texture {
            return null;
        }        

        public get Width(): number {
            return 0;
        }

        public get Height(): number {
            return 0;
        }

        public get PowerOf2() : boolean
        {
            return false;
        }

        public get Mipmap(): boolean {
            return false;
        }           

        public getTextureTarget(): RenderContext.TextureTarget {
            return RenderContext.TextureTarget.Target2D;
        }

        public get MinFilter() {
            return RenderContext.MinFilter.Linear;
        }

        public set MinFilter(value: RenderContext.MinFilter) {
        }

        public get MagFilter() {
            return RenderContext.MagFilter.Linear;
        }

        public set MagFilter(value: RenderContext.MagFilter) {
        }

        public get WrapS() {
            return RenderContext.Wrap.Repeat;
        }

        public set WrapS(value: RenderContext.Wrap) {
        }

        public get WrapT() {
            return RenderContext.Wrap.Repeat;
        }

        public set WrapT(value: RenderContext.Wrap) {
        }
    };
};