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
    export class Color4{
        static Black    = new Color4([0, 0, 0, 1]);
        static Blue     = new Color4([0, 0, 1, 1]);
        static Green    = new Color4([0, 1, 0, 1]);
        static Cyan     = new Color4([0, 1, 1, 1]);
        static Red      = new Color4([1, 0, 0, 1]);
        static Mangenta = new Color4([1, 0, 1, 1]);
        static Yellow   = new Color4([1, 1, 0, 1]);
        static White    = new Color4([1, 1, 1, 1]);

        private m = [];

        public constructor(v? : Array<number>){
            if(v!=undefined)
                this.m = v;
            else
                this.m = [255, 255, 255, 255];
        }

        public destructor() {
        }            

        public get R() {
            return this.m[0];
        }

        public set R(value: number) {
            this.m[0] = value;
        }

        public get G() {
            return this.m[1];
        }

        public set G(value: number) {
            this.m[1] = value;
        }
        
        public get B() {
            return this.m[2];
        }

        public set B(value: number) {
            this.m[2] = value;
        }
        
        public get A() {
            return this.m[3];
        }

        public set A(value: number) {
            this.m[3] = value;
        }
        
        public getValue(i : number) {
            return this.m[i];
        }

        public setValue(i, value: number) {
            this.m[i] = value;
        }
    };

    export namespace Color4{
    };
};