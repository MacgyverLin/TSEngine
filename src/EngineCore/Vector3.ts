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
    export class Vector3 {
        static readonly Zero = new Vector3([0, 0, 0]);
        static readonly UnitX = new Vector3([1, 0, 0]);
        static readonly UnitY = new Vector3([0, 1, 0]);
        static readonly UnitZ = new Vector3([0, 0, 1]);
        static readonly One = new Vector3([1, 1, 1]);

        private m: Array<number>;

        public constructor(v?: Array<number>) {
            this.set(v);
        }

        public destructor() {
            this.m = null;
        }            

        public set(v: Array<number>) {
            this.m = new Array<number>(3);
            if (v != undefined) {
                this.m[0] = v[0];
                this.m[1] = v[1];
                this.m[2] = v[2];
            }
            else {
                this.m[0] = 0;
                this.m[1] = 0;
                this.m[2] = 0;
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

        public toArray(): Array<number> {
            return this.m;
        };

        public toString() : string {
            return this.m.toString();
        };

        // comparison

        // arithmetic operations
        public static add(v1: Vector3, v2: Vector3): Vector3 {
            return new Vector3([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1], v1.m[2] + v2.m[2]]);
        }

        public static sub(v1: Vector3, v2: Vector3): Vector3 {
            return new Vector3([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1], v1.m[2] - v2.m[2]]);
        }

        public static mul(v1: Vector3, v2: Vector3): Vector3 {
            return new Vector3([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1], v1.m[2] * v2.m[2]]);
        }

        public static neg(v: Vector3): Vector3 {
            return new Vector3([-v.m[0], -v.m[1], -v.m[2]]);
        }        

        public static scale(v1: Vector3, scale: number): Vector3 {
            return new Vector3([v1.m[0] * scale, v1.m[1] * scale, v1.m[2] * scale]);
        }

        /*
        public add(v: Vector3): Vector3 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];
            this.m[2] += v.m[2];

            return this;
        }

        public sub(v: Vector3): Vector3 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];
            this.m[2] -= v.m[2];

            return this;
        }

        public mul(v: Vector3): Vector3 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];
            this.m[2] *= v.m[2];

            return this;
        }

        public neg(): Vector3 {
            this.m[0] *= -1;
            this.m[1] *= -1;
            this.m[2] *= -1;

            return this;
        }        

        public scale(scale: number): Vector3 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;

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

        public dot(v: Vector3): number {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1] + this.m[2] * v.m[2];
        }

        public normalize(): number {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                this.m[2] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                this.m[2] *= len;
                return len;
            }
        }

        // The cross products are computed using the right-handed rule.  Be aware
        // that some graphics APIs use a left-handed rule.  If you have to compute
        // a cross product with these functions and send the result to the API
        // that expects left-handed, you will need to change sign on the vector
        // (replace each component value c by -c).
        public cross(v: Vector3): Vector3 {
            return new Vector3([this.m[1] * v.m[2] - this.m[2] * v.m[1],
                                this.m[2] * v.m[0] - this.m[0] * v.m[2],
                                this.m[0] * v.m[1] - this.m[1] * v.m[0]]);
        }

        public unitCross(v: Vector3): Vector3 {
            var cross = this.cross(v);
            cross.normalize();
            
            return cross;
        }

        // Compute the barycentric coordinates of the point with respect to the
        // tetrahedron <V0,V1,V2,V3>, P = b0*V0 + b1*V1 + b2*V2 + b3*V3, where
        // b0 + b1 + b2 + b3 = 1.
        public getBarycentrics(v0: Vector3, v1: Vector3, v2: Vector3, v3: Vector3, bary: Array<number>): void {
            // compute the vectors relative to V3 of the tetrahedron
            var akDiff =
                [
                    Vector3.sub(v0, v3),
                    Vector3.sub(v1, v3),
                    Vector3.sub(v2, v3),
                    Vector3.sub(this, v3)
                ];

            // If the vertices have large magnitude, the linear system of
            // equations for computing barycentric coordinates can be
            // ill-conditioned.  To avoid this, uniformly scale the tetrahedron
            // edges to be of order 1.  The scaling of all differences does not
            // change the barycentric coordinates.
            var fMax = 0.0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var fValue = Math.abs(akDiff[i].m[j]);
                    if (fValue > fMax) {
                        fMax = fValue;
                    }
                }
            }

            // scale down only large data
            if (fMax > 1.0) {
                var fInvMax = 1.0 / fMax;
                for (var i = 0; i < 4; i++) {
                    akDiff[i] = Vector3.scale(akDiff[i], fInvMax);
                }
            }

            var fDet = akDiff[0].dot(akDiff[1].cross(akDiff[2]));
            var kE1cE2 = akDiff[1].cross(akDiff[2]);
            var kE2cE0 = akDiff[2].cross(akDiff[0]);
            var kE0cE1 = akDiff[0].cross(akDiff[1]);
            if (Math.abs(fDet) > 0.000001) {
                var fInvDet = 1.0 / fDet;
                bary[0] = akDiff[3].dot(kE1cE2) * fInvDet;
                bary[1] = akDiff[3].dot(kE2cE0) * fInvDet;
                bary[2] = akDiff[3].dot(kE0cE1) * fInvDet;
                bary[3] = 1.0 - bary[0] - bary[1] - bary[2];
            }
            else {
                // The tetrahedron is potentially flat.  Determine the face of
                // maximum area and compute barycentric coordinates with respect
                // to that face.
                var kE02 = Vector3.sub(v0, v2);
                var kE12 = Vector3.sub(v1, v2);
                var kE02cE12 = kE02.cross(kE12);
                var fMaxSqrArea = kE02cE12.squaredLength();
                var iMaxIndex = 3;
                var fSqrArea = kE0cE1.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 0;
                    fMaxSqrArea = fSqrArea;
                }
                fSqrArea = kE1cE2.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 1;
                    fMaxSqrArea = fSqrArea;
                }
                fSqrArea = kE2cE0.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 2;
                    fMaxSqrArea = fSqrArea;
                }

                if (fMaxSqrArea > 0.0000001) {
                    var fInvSqrArea = 1.0 / fMaxSqrArea;
                    var kTmp: Vector3;
                    if (iMaxIndex == 0) {
                        kTmp = akDiff[3].cross(akDiff[1]);
                        bary[0] = kE0cE1.dot(kTmp) * fInvSqrArea;
                        kTmp = akDiff[0].cross(akDiff[3]);
                        bary[1] = kE0cE1.dot(kTmp) * fInvSqrArea;
                        bary[2] = 0.0;
                        bary[3] = 1.0 - bary[0] - bary[1];
                    }
                    else if (iMaxIndex == 1) {
                        bary[0] = 0.0;
                        kTmp = akDiff[3].cross(akDiff[2]);
                        bary[1] = kE1cE2.dot(kTmp) * fInvSqrArea;
                        kTmp = akDiff[1].cross(akDiff[3]);
                        bary[2] = kE1cE2.dot(kTmp) * fInvSqrArea;
                        bary[3] = 1.0 - bary[1] - bary[2];
                    }
                    else if (iMaxIndex == 2) {
                        kTmp = akDiff[2].cross(akDiff[3]);
                        bary[0] = kE2cE0.dot(kTmp) * fInvSqrArea;
                        bary[1] = 0.0;
                        kTmp = akDiff[3].cross(akDiff[0]);
                        bary[2] = kE2cE0.dot(kTmp) * fInvSqrArea;
                        bary[3] = 1.0 - bary[0] - bary[2];
                    }
                    else {
                        akDiff[3] = Vector3.sub(this, v2);
                        kTmp = akDiff[3].cross(kE12);
                        bary[0] = kE02cE12.dot(kTmp) * fInvSqrArea;
                        kTmp = kE02.cross(akDiff[3]);
                        bary[1] = kE02cE12.dot(kTmp) * fInvSqrArea;
                        bary[2] = 1.0 - bary[0] - bary[1];
                        bary[3] = 0.0;
                    }
                }
                else {
                    // The tetrahedron is potentially a sliver.  Determine the edge of
                    // maximum length and compute barycentric coordinates with respect
                    // to that edge.
                    var fMaxSqrLength = akDiff[0].squaredLength();
                    iMaxIndex = 0;  // <V0,V3>
                    var fSqrLength = akDiff[1].squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 1;  // <V1,V3>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = akDiff[2].squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 2;  // <V2,V3>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = kE02.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 3;  // <V0,V2>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = kE12.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 4;  // <V1,V2>
                        fMaxSqrLength = fSqrLength;
                    }
                    var kE01 = Vector3.sub(v0, v1);
                    fSqrLength = kE01.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 5;  // <V0,V1>
                        fMaxSqrLength = fSqrLength;
                    }

                    if (fMaxSqrLength > 0.0000001) {
                        var fInvSqrLength = 1.0 / fMaxSqrLength;
                        if (iMaxIndex == 0) {
                            // P-V3 = t*(V0-V3)
                            bary[0] = akDiff[3].dot(akDiff[0]) * fInvSqrLength;
                            bary[1] = 0.0;
                            bary[2] = 0.0;
                            bary[3] = 1.0 - bary[0];
                        }
                        else if (iMaxIndex == 1) {
                            // P-V3 = t*(V1-V3)
                            bary[0] = 0.0;
                            bary[1] = akDiff[3].dot(akDiff[1]) * fInvSqrLength;
                            bary[2] = 0.0;
                            bary[3] = 1.0 - bary[1];
                        }
                        else if (iMaxIndex == 2) {
                            // P-V3 = t*(V2-V3)
                            bary[0] = 0.0;
                            bary[1] = 0.0;
                            bary[2] = akDiff[3].dot(akDiff[2]) * fInvSqrLength;
                            bary[3] = 1.0 - bary[2];
                        }
                        else if (iMaxIndex == 3) {
                            // P-V2 = t*(V0-V2)
                            akDiff[3] = Vector3.sub(this, v2);
                            bary[0] = akDiff[3].dot(kE02) * fInvSqrLength;
                            bary[1] = 0.0;
                            bary[2] = 1.0 - bary[0];
                            bary[3] = 0.0;
                        }
                        else if (iMaxIndex == 4) {
                            // P-V2 = t*(V1-V2)
                            akDiff[3] = Vector3.sub(this, v2);
                            bary[0] = 0.0;
                            bary[1] = akDiff[3].dot(kE12) * fInvSqrLength;
                            bary[2] = 1.0 - bary[1];
                            bary[3] = 0.0;
                        }
                        else {
                            // P-V1 = t*(V0-V1)
                            akDiff[3] = Vector3.sub(this, v1);
                            bary[0] = akDiff[3].dot(kE01) * fInvSqrLength;
                            bary[1] = 1.0 - bary[0];
                            bary[2] = 0.0;
                            bary[3] = 0.0;
                        }
                    }
                    else {
                        // tetrahedron is a nearly a point, just return equal weights
                        bary[0] = 0.25;
                        bary[1] = bary[0];
                        bary[2] = bary[0];
                        bary[3] = bary[0];
                    }
                }
            }
        }

        // Gram-Schmidt orthonormalization.  Take linearly independent vectors
        // U, V, and W and compute an orthonormal set (unit length, mutually
        // perpendicular).
        public static orthonormalize(u : Vector3, v : Vector3, w : Vector3) : void
        {
            // If the input vectors are v0, v1, and v2, then the Gram-Schmidt
            // orthonormalization produces vectors u0, u1, and u2 as follows,
            //
            //   u0 = v0/|v0|
            //   u1 = (v1-(u0*v1)u0)/|v1-(u0*v1)u0|
            //   u2 = (v2-(u0*v2)u0-(u1*v2)u1)/|v2-(u0*v2)u0-(u1*v2)u1|
            //
            // where |A| indicates length of vector A and A*B indicates dot
            // product of vectors A and B.

            // compute u0
            u.normalize();

            // compute u1
            var fDot0 = u.dot(v);
            v = Vector3.sub(v, Vector3.scale(u, fDot0));
            v.normalize();

            // compute u2
            var fDot1 = v.dot(w);
            fDot0 = u.dot(w);
            w = Vector3.sub(w, Vector3.scale(u, fDot0));
            w = Vector3.sub(v, Vector3.scale(v, fDot1));
            w.normalize();
        }

        // Input W must be initialized to a nonzero vector, output is {U,V,W},
        // an orthonormal basis.  A hint is provided about whether or not W
        // is already unit length.
        public static generateOrthonormalBasis(u : Vector3, v : Vector3, w : Vector3, unitLengthW : boolean) : void
        {
            if (!unitLengthW)
            {
                w.normalize();
            }
        
            var fInvLength;
            if (Math.abs(w.m[0]) >= Math.abs(w.m[1]) )
            {
                // W.x or W.z is the largest magnitude component, swap them
                fInvLength = 1.0 / Math.sqrt(w.m[0] * w.m[0] + w.m[2] * w.m[2]);
                u.m[0] = -w.m[2] * fInvLength;
                u.m[1] = 0.0;
                u.m[2] = +w.m[0] * fInvLength;
                v.m[0] =  w.m[1] * u.m[2];
                v.m[1] =  w.m[2] * u.m[0] - w.m[0]*u.m[2];
                v.m[2] = -w.m[1] * u.m[0];
            }
            else
            {
                // W.y or W.z is the largest magnitude component, swap them
                fInvLength = 1.0 / Math.sqrt(w.m[1] * w.m[1] + w.m[2] * w.m[2]);
                u.m[0] = 0.0;
                u.m[1] = +w.m[2] * fInvLength;
                u.m[2] = -w.m[1] * fInvLength;
                v.m[0] =  w.m[1] * u.m[2] - w.m[2] * u.m[1];
                v.m[1] = -w.m[0] * u.m[2];
                v.m[2] =  w.m[0] * u.m[1];
            }            
        }

        // Compute the extreme values.
        public static computeExtremes(akPoints : Array<Vector3>, rkMin : Vector3, rkMax : Vector3) : void
        {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i <akPoints.length; i++)
            {
                var rkPoint = akPoints[i];
                for(var j = 0; j < 3; j++)
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

    export namespace Vector3 {
    };
};