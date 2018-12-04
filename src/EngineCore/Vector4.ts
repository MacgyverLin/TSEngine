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
    export class Vector4 {
        static Zero  = new Vector4([0, 0, 0, 0]);
        static UnitX = new Vector4([1, 0, 0, 0]);
        static UnitY = new Vector4([0, 1, 0, 0]);
        static UnitZ = new Vector4([0, 0, 1, 0]);
        static UnitW = new Vector4([0, 0, 0, 1]);
        static One   = new Vector4([1, 1, 1, 1]);

        private m: Array<number>;

        public constructor(v?: Array<number>) {
            this.set(v);
        }

        public destructor() {
            this.m = null;
        }            

        public set(v: Array<number>) {
            this.m = new Array<number>(4);
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

        public get X() {
            return this.m[0];
        }

        public set X(value: number) {
            this.m[0] = value;
        }

        public get Y() {
            return this.m[1];
        }

        public set Y(value: number) {
            this.m[1] = value;
        }

        public get Z() {
            return this.m[2];
        }

        public set Z(value: number) {
            this.m[2] = value;
        }

        public get W() {
            return this.m[3];
        }

        public set W(value: number) {
            this.m[3] = value;
        }

        public toArray(): Array<number> {
            return this.m;
        };

        public toString() : string {
            return this.m.toString();
        };        

        // comparison

        // arithmetic operations
        public static add(v1: Vector4, v2: Vector4): Vector4 {
            return new Vector4([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1], v1.m[2] + v2.m[2], v1.m[3] + v2.m[3]]);
        }

        public static sub(v1: Vector4, v2: Vector4): Vector4 {
            return new Vector4([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1], v1.m[2] - v2.m[2], v1.m[3] - v2.m[3]]);
        }

        public static mul(v1: Vector4, v2: Vector4): Vector4 {
            return new Vector4([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1], v1.m[2] * v2.m[2], v1.m[3] * v2.m[3]]);
        }

        public static neg(v: Vector4): Vector4 {
            return new Vector4([-v.m[0], -v.m[1], -v.m[2], -v.m[3]]);
        }        

        public static scale(v1: Vector4, scale: number): Vector4 {
            return new Vector4([v1.m[0] * scale, v1.m[1] * scale, v1.m[2] * scale, v1.m[3] * scale]);
        }

        /*
        public add(v: Vector4): Vector4 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];
            this.m[2] += v.m[2];
            this.m[3] += v.m[3];

            return this;
        }

        public sub(v: Vector4): Vector4 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];
            this.m[2] -= v.m[2];
            this.m[3] -= v.m[3];

            return this;
        }

        public mul(v: Vector4): Vector4 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];
            this.m[2] *= v.m[2];
            this.m[3] *= v.m[3];

            return this;
        }

        public neg(): Vector4 {
            this.m[0] *= -1;
            this.m[1] *= -1;
            this.m[2] *= -1;
            this.m[3] *= -1;

            return this;
        }       

        public scale(scale: number): Vector4 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            return this;
        }
        */

        // vector operations
        public length(): number {
            return Math.sqrt(this.squaredLength());
        }

        public squaredLength(): number {
            return this.dot(this);
        }

        public dot(v: Vector4): number {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1] + this.m[2] * v.m[2] + this.m[3] * v.m[3];
        }

        public normalize(): number {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                this.m[2] = 0.0;
                this.m[3] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                this.m[2] *= len;
                this.m[3] *= len;
                return len;
            }
        }

        // Compute the extreme values.
        public static computeExtremes(akPoints : Array<Vector4>, rkMin : Vector4, rkMax : Vector4) : void
        {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i <akPoints.length; i++)
            {
                var rkPoint = akPoints[i];
                for(var j = 0; j < 4; j++)
                {
                    if (rkPoint.m[j] < rkMin.m[j])
                    {
                        rkMin.m[j] = rkPoint.m[j];
                    }
                    else if (rkPoint.m[j] > rkMax.m[j])
                    {
                        rkMax.m[j] = rkPoint.m[j];
                    }
                }
            }            
        }
    };

    export namespace Vector4 {
    };
};