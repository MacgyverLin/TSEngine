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
    export class Vector2 {
        static Zero = new Vector2([0, 0]);
        static One = new Vector2([1, 1]);
        static Half = new Vector2([0.5, 0.5]);
        static UnitX = new Vector2([1, 0]);
        static UnitY = new Vector2([0, 1]);

        private m: Array<number>;

        public constructor(v?: Array<number>) {
            this.set(v);
        }

        public destructor() {
            this.m = null;
        }        

        public set(v: Array<number>) {
            this.m = new Array<number>(2);
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

        public toArray(): Array<number> {
            return this.m;
        };

        public toString(): string {
            return this.m.toString();
        };

        // arithmetic operations
        public static add(v1: Vector2, v2: Vector2): Vector2 {
            return new Vector2([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1]]);
        }

        public static sub(v1: Vector2, v2: Vector2): Vector2 {
            return new Vector2([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1]]);
        }

        public static mul(v1: Vector2, v2: Vector2): Vector2 {
            return new Vector2([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1]]);
        }

        public static neg(v: Vector2): Vector2 {
            return new Vector2([-v.m[0], -v.m[1]]);
        }

        public static scale(v1: Vector2, scale: number): Vector2 {
            return new Vector2([v1.m[0] * scale, v1.m[1] * scale]);
        }

        /*
        public add(v: Vector2): Vector2 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];

            return this;
        }

        public sub(v: Vector2): Vector2 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];

            return this;
        }

        public mul(v: Vector2): Vector2 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];

            return this;
        }

        public neg(): Vector2 {
            this.m[0] *= -1;
            this.m[1] *= -1;

            return this;
        }

        public scale(scale: number): Vector2 {
            this.m[0] *= scale;
            this.m[1] *= scale;

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

        public dot(v: Vector2): number {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1];
        }

        public dotPerpendicular(v: Vector2): number {
            return this.m[0] * v.m[1] - this.m[1] * v.m[0];
        }

        public normalize(): number {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                return len;
            }
        }

        // The cross products are computed using the right-handed rule.  Be aware
        // that some graphics APIs use a left-handed rule.  If you have to compute
        // a cross product with these functions and send the result to the API
        // that expects left-handed, you will need to change sign on the vector
        // (replace each component value c by -c).
        public perpendicular(): Vector2 {
            return new Vector2([this.m[1], -this.m[0]]);
        }

        public unitPerpendicular(): Vector2 {
            var perp = this.perpendicular();
            perp.normalize();
            return perp;
        }

        // Compute the barycentric coordinates of the point with respect to the
        // triangle <V0,V1,V2>, P = b0*V0 + b1*V1 + b2*V2, where b0 + b1 + b2 = 1.
        public getBarycentrics(v0: Vector2, v1: Vector2, v2: Vector2, bary: Array<number>) {
            // compute the vectors relative to V2 of the triangle
            var akDiff =
                [
                    Vector2.sub(v0, v2),
                    Vector2.sub(v1, v2),
                    Vector2.sub(this, v2)
                ];

            // If the vertices have large magnitude, the linear system of equations
            // for computing barycentric coordinates can be ill-conditioned.  To avoid
            // this, uniformly scale the triangle edges to be of order 1.  The scaling
            // of all differences does not change the barycentric coordinates.
            var fMax = 0.0;
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 2; j++) {
                    var fValue = Math.abs(akDiff[i].m[j]);
                    if (fValue > fMax) {
                        fMax = fValue;
                    }
                }
            }

            // scale down only large data
            if (fMax > 1.0) {
                var fInvMax = 1.0 / fMax;
                for (i = 0; i < 3; i++) {
                    akDiff[i] = Vector2.scale(akDiff[i], fInvMax);
                }
            }

            var fDet = akDiff[0].dotPerpendicular(akDiff[1]);
            if (Math.abs(fDet) > 0.000001) {
                var fInvDet = 1.0 / fDet;
                bary[0] = akDiff[2].dotPerpendicular(akDiff[1]) * fInvDet;
                bary[1] = akDiff[0].dotPerpendicular(akDiff[2]) * fInvDet;
                bary[2] = 1.0 - bary[0] - bary[1];
            }
            else {
                // The triangle is a sliver.  Determine the longest edge and
                // compute barycentric coordinates with respect to that edge.
                var kE2 = Vector2.sub(v0, v1);
                var fMaxSqrLength = kE2.squaredLength();
                var iMaxIndex = 2;
                var fSqrLength = akDiff[1].squaredLength();
                if (fSqrLength > fMaxSqrLength) {
                    iMaxIndex = 1;
                    fMaxSqrLength = fSqrLength;
                }
                fSqrLength = akDiff[0].squaredLength();
                if (fSqrLength > fMaxSqrLength) {
                    iMaxIndex = 0;
                    fMaxSqrLength = fSqrLength;
                }

                if (fMaxSqrLength > 0.0000001) {
                    var fInvSqrLength = 1.0 / fMaxSqrLength;
                    if (iMaxIndex == 0) {
                        // P-V2 = t(V0-V2)
                        bary[0] = akDiff[2].dot(akDiff[0]) * fInvSqrLength;
                        bary[1] = 0.0;
                        bary[2] = 1.0 - bary[0];
                    }
                    else if (iMaxIndex == 1) {
                        // P-V2 = t(V1-V2)
                        bary[0] = 0.0;
                        bary[1] = akDiff[2].dot(akDiff[1]) * fInvSqrLength;
                        bary[2] = 1.0 - bary[1];
                    }
                    else {
                        // P-V1 = t(V0-V1)
                        akDiff[2] = Vector2.sub(this, v1);
                        bary[0] = akDiff[2].dot(kE2) * fInvSqrLength;
                        bary[1] = 1.0 - bary[0];
                        bary[2] = 0.0;
                    }
                }
                else {
                    // triangle is a nearly a point, just return equal weights
                    bary[0] = 1.0 / 3.0;
                    bary[1] = bary[0];
                    bary[2] = bary[0];
                }
            }
        }

        // Gram-Schmidt orthonormalization.  Take linearly independent vectors U
        // and V and compute an orthonormal set (unit length, mutually
        // perpendicular).
        public static orthonormalize(u: Vector2, v: Vector2): void {
            // If the input vectors are v0 and v1, then the Gram-Schmidt
            // orthonormalization produces vectors u0 and u1 as follows,
            //
            //   u0 = v0/|v0|
            //   u1 = (v1-(u0*v1)u0)/|v1-(u0*v1)u0|
            //
            // where |A| indicates length of vector A and A*B indicates dot
            // product of vectors A and B.

            // compute u0
            u.normalize();

            // compute u1
            var fDot0 = u.dot(v);
            v = Vector2.sub(v, Vector2.scale(u, fDot0))

            v.normalize();
        }


        // Input V must be initialized to a nonzero vector, output is {U,V}, an
        // orthonormal basis.  A hint is provided about whether or not V is
        // already unit length.
        public static generateOrthonormalBasis(u: Vector2, v: Vector2, bUnitLengthV: boolean): void {
            if (!bUnitLengthV) {
                v.normalize();
            }

            u = v.perpendicular();
        }

        // Compute the extreme values.
        public static computeExtremes(akPoints: Array<Vector2>, rkMin: Vector2, rkMax: Vector2): void {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i < akPoints.length; i++) {
                var rkPoint = akPoints[i];
                for (var j = 0; j < 2; j++) {
                    if (rkPoint[j] < rkMin[j]) {
                        rkMin[j] = rkPoint[j];
                    }
                    else if (rkPoint[j] > rkMax[j]) {
                        rkMax[j] = rkPoint[j];
                    }
                }
            }
        }
    };

    export namespace Vector2 {
    };
};