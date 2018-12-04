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
    export class IndexBuffer {
        private buffer;

        constructor() {
            this.buffer = {};
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
            if(this.buffer)
            {
                gl.deleteBuffer(this.buffer);
                this.buffer = null;
            }
        }

        private createBufferObject(data: Int16Array, usage: IndexBuffer.Usage): Object {
            var usages = [
                gl.STATIC_DRAW,
                gl.STREAM_DRAW,
                gl.DYNAMIC_DRAW
            ];

            var attibutes = { buffer: null, itemSize: 0, numItems: 0 };
            attibutes.buffer = gl.createBuffer();
            if (!attibutes.buffer)
                return null;

            if (!usage)
                usage = IndexBuffer.Usage.StaticDraw;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attibutes.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usages[usage]);
            attibutes.itemSize = 2;
            attibutes.numItems = data.length / attibutes.itemSize;

            return attibutes;
        }

        public setIndices(indices: Int16Array, usage?: IndexBuffer.Usage): boolean {
            this.buffer = this.createBufferObject(indices, usage);

            return this.buffer != null;
        }

        public getIndices() {
            return this.buffer;
        }
    };

    export namespace IndexBuffer {
        export enum Usage {
            StaticDraw = 0,
            StreamDraw = 1,
            DynamicDraw = 2
        };
    };
};