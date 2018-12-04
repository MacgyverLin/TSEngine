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
    export class Frustum {
        static Zero  = new Frustum([0, 0, 0, 0, 0, 0]);
        static One   = new Frustum([-0.5, -0.5, -0.5, -0.5, 0.1, 1.1]);

        private m: Array<number>;
        public constructor(v?: Array<number>) {
            this.set(v);
        }

        public destructor() {
        }            

        public set(v: Array<number>) {
            this.m = new Array<number>(6);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }

        public get Left() {
            return this.m[0];
        }

        public set Left(value: number) {
            this.m[0] = value;
        }

        public get Right() {
            return this.m[1];
        }

        public set Right(value: number) {
            this.m[1] = value;
        }

        public get Top() {
            return this.m[2];
        }

        public set Top(value: number) {
            this.m[2] = value;
        }        

        public get Bottom() {
            return this.m[3];
        }

        public set Bottom(value: number) {
            this.m[3] = value;
        }

        public get Near() {
            return this.m[4];
        }

        public set Near(value: number) {
            this.m[4] = value;
        }

        public get Far() {
            return this.m[5];
        }

        public set Far(value: number) {
            this.m[5] = value;
        }

        public toArray(): Array<number> {
            return this.m;
        };

        public toString(): string {
            return this.m.toString();
        };    
    };

    export namespace Frustum {
    };
};