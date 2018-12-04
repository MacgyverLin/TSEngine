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
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Quaternion.ts" /> 

namespace Magnum {
    export class Matrix2 {
        static Zero = new Matrix2([0, 0, 0, 0]);
        static Identity = new Matrix2([1, 0, 0, 1]);

        private m: Array<number>;

        public constructor(v?: Array<number>, rowMajor?: boolean) {
            this.set(v, rowMajor);
        }

        public destructor() {
        }

        public set(v: Array<number>, rowMajor?: boolean) {
            this.m = new Array<number>(4);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 2; c++) {
                        for (var r = 0; r < 2; r++) {
                            this.m[r * 2 + c] = v[i];
                            i++;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        };

        public toArray(): Array<number> {
            return this.m.slice(0);
        };

        public toArrayTranpose(): Array<number> {
            return [
                this.m[0], this.m[2],
                this.m[1], this.m[3]
            ];
        };

        public toString(): string {
            return this.m.toString();
        };

        public initZero() {
            this.m[0] = 0; this.m[1] = 0; 
            this.m[2] = 0; this.m[3] = 0; 
        }

        public initIdentity() {
            this.m[0] = 1; this.m[1] = 0; 
            this.m[2] = 0; this.m[3] = 1; 
        }
    };

    export namespace Matrix2 {
    };
};