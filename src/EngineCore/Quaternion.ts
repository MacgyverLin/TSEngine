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

namespace Magnum {
    export class Quaternion {
        static Zero = new Quaternion([0, 0, 0, 0]);
        static Identity = new Quaternion([1, 0, 0, 0]);

        private m: Array<number>;

        public constructor(v?: Array<number>) {
            this.set(v);
        }

        public destructor() {
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

        public get W() {
            return this.m[0];
        }

        public set W(value: number) {
            this.m[0] = value;
        }

        public get X() {
            return this.m[1];
        }

        public set X(value: number) {
            this.m[1] = value;
        }

        public get Y() {
            return this.m[2];
        }

        public set Y(value: number) {
            this.m[2] = value;
        }

        public set Z(value: number) {
            this.m[3] = value;
        }

        public get Z() {
            return this.m[3];
        }

        public member(): Array<number> {
            return this.m;
        };

        // arithmetic operations
        public static add(q1: Quaternion, q2: Quaternion): Quaternion {
            return new Quaternion([q1.m[0] + q2.m[0], q1.m[1] + q2.m[1], q1.m[2] + q2.m[2], q1.m[3] + q2.m[3]]);
        }

        public static sub(q1: Quaternion, q2: Quaternion): Quaternion {
            return new Quaternion([q1.m[0] - q2.m[0], q1.m[1] - q2.m[1], q1.m[2] - q2.m[2], q1.m[3] - q2.m[3]]);
        }

        public static mul(q1: Quaternion, q2: Quaternion): Quaternion {
            var kProd = new Quaternion();

            kProd.m[0] =
                q1.m[0] * q2.m[0] -
                q1.m[1] * q2.m[1] -
                q1.m[2] * q2.m[2] -
                q1.m[3] * q2.m[3];

            kProd.m[1] =
                q1.m[0] * q2.m[1] +
                q1.m[1] * q2.m[0] +
                q1.m[2] * q2.m[3] -
                q1.m[3] * q2.m[2];

            kProd.m[2] =
                q1.m[0] * q2.m[2] +
                q1.m[2] * q2.m[0] +
                q1.m[3] * q2.m[1] -
                q1.m[1] * q2.m[3];

            kProd.m[3] =
                q1.m[0] * q2.m[3] +
                q1.m[3] * q2.m[0] +
                q1.m[1] * q2.m[2] -
                q1.m[2] * q2.m[1];

            return kProd;
        }

        public static neg(q: Quaternion): Quaternion {
            return new Quaternion([-q.m[0], -q.m[1], -q.m[2], -q.m[3]]);
        }

        public static scale(q: Quaternion, scale: number): Quaternion {
            return new Quaternion([q.m[0] * scale, q.m[1] * scale, q.m[2] * scale, q.m[3] * scale]);
        }

        /*
        public add(q: Quaternion): Quaternion {
            this.m[0] += q.m[0];
            this.m[1] += q.m[1];
            this.m[2] += q.m[2];
            this.m[3] += q.m[3];

            return this;
        }

        public sub(q: Quaternion): Quaternion {
            this.m[0] -= q.m[0];
            this.m[1] -= q.m[1];
            this.m[2] -= q.m[2];
            this.m[3] -= q.m[3];

            return this;
        }

        public mul(q: Quaternion): Quaternion {
            var temp = this;

            this.m[0] =
                temp.m[0] * q.m[0] -
                temp.m[1] * q.m[1] -
                temp.m[2] * q.m[2] -
                temp.m[3] * q.m[3];

            this.m[1] =
                temp.m[0] * q.m[1] +
                temp.m[1] * q.m[0] +
                temp.m[2] * q.m[3] -
                temp.m[3] * q.m[2];

            this.m[2] =
                temp.m[0] * q.m[2] +
                temp.m[2] * q.m[0] +
                temp.m[3] * q.m[1] -
                temp.m[1] * q.m[3];

            this.m[3] =
                temp.m[0] * q.m[3] +
                temp.m[3] * q.m[0] +
                temp.m[1] * q.m[2] -
                temp.m[2] * q.m[1];

            return this;
        }

        public neg(): Quaternion {
            this.m[0] = -this.m[0];
            this.m[1] = -this.m[1];
            this.m[2] = -this.m[2];
            this.m[3] = -this.m[3];

            return this;
        }


        public scale(scale: number): Quaternion {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            return this;
        }
        */

        // conversion between quaternions, matrices, and axis-angle
        /*
        public ToMatrix(): Matrix4
        {
        }

        public ToAxisAngle(): AxisAngle
        {
        }

        public ToEuler(): Euler
        {
        }
        */

        // vector operations
        public length(): number {
            return Math.sqrt(this.squaredLength());
        }

        public squaredLength(): number {
            return this.dot(this);
        }

        public dot(v: Quaternion): number {
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
                this.m[0] /= len;
                this.m[1] /= len;
                this.m[2] /= len;
                this.m[3] /= len;
                return len;
            }
        }

        public inverse(): Quaternion {
            var kInverse = new Quaternion();

            var fNorm = 0.0;
            for (var i = 0; i < 4; i++) {
                fNorm += this.m[i] * this.m[i];
            }

            if (fNorm > 0.00001) {
                var fInvNorm = 1.0 / fNorm;
                kInverse.m[0] = this.m[0] * fInvNorm;
                kInverse.m[1] = -this.m[1] * fInvNorm;
                kInverse.m[2] = -this.m[2] * fInvNorm;
                kInverse.m[3] = -this.m[3] * fInvNorm;
            }
            else {
                kInverse.m[0] = 0.0;
                kInverse.m[1] = 0.0;
                kInverse.m[2] = 0.0;
                kInverse.m[3] = 0.0;
            }

            return kInverse;
        }

        public conjugate(): Quaternion {
            return new Quaternion([this.m[0], -this.m[1], -this.m[2], -this.m[3]]);
        }

        public exp(): Quaternion   // apply to quaternion with w = 0
        {
            // If q = A*(x*i+y*j+z*k) where (x,y,z) is unit length, then
            // exp(q) = cos(A)+sin(A)*(x*i+y*j+z*k).  If sin(A) is near zero,
            // use exp(q) = cos(A)+A*(x*i+y*j+z*k) since A/sin(A) has limit 1.
            var kResult = new Quaternion();
            var fAngle = Math.sqrt(this.m[1] * this.m[1] + this.m[2] * this.m[2] + this.m[3] * this.m[3]);

            var fSin = Math.sin(fAngle);
            kResult.m[0] = Math.cos(fAngle);
            if (Math.abs(fSin) >= 0.000001) {
                var fCoeff = fSin / fAngle;
                for (var i = 1; i <= 3; i++) {
                    kResult.m[i] = fCoeff * this.m[i];
                }
            }
            else {
                for (i = 1; i <= 3; i++) {
                    kResult.m[i] = this.m[i];
                }
            }

            return kResult;
        }

        public log(): Quaternion   // apply to quaternion with w = 0
        {
            // If q = cos(A)+sin(A)*(x*i+y*j+z*k) where (x,y,z) is unit length, then
            // log(q) = A*(x*i+y*j+z*k).  If sin(A) is near zero, use log(q) =
            // sin(A)*(x*i+y*j+z*k) since sin(A)/A has limit 1.
            var kResult = new Quaternion();
            kResult.m[0] = 0.0;

            if (Math.abs(this.m[0]) < 1.0) {
                var fAngle = Math.cos(this.m[0]);
                var fSin = Math.sin(fAngle);
                if (Math.abs(fSin) >= 0.0000001) {
                    var fCoeff = fAngle / fSin;
                    for (var i = 1; i <= 3; i++) {
                        kResult.m[0] = fCoeff * this.m[0];
                    }
                    return kResult;
                }
            }

            for (var i = 1; i <= 3; i++) {
                kResult.m[i] = this.m[i];
            }

            return kResult;
        }

        // rotation of a vector by a quaternion
        public rotate(rkVector: Vector3): Vector3 {
            // Given a vector u = (x0,y0,z0) and a unit length quaternion
            // q = <w,x,y,z>, the vector v = (x1,y1,z1) which represents the
            // rotation of u by q is v = q*u*q^{-1} where * indicates quaternion
            // multiplication and where u is treated as the quaternion <0,x0,y0,z0>.
            // Note that q^{-1} = <w,-x,-y,-z>, so no float work is required to
            // invert q.  Now
            //
            //   q*u*q^{-1} = q*<0,x0,y0,z0>*q^{-1}
            //     = q*(x0*i+y0*j+z0*k)*q^{-1}
            //     = x0*(q*i*q^{-1})+y0*(q*j*q^{-1})+z0*(q*k*q^{-1})
            //
            // As 3-vectors, q*i*q^{-1}, q*j*q^{-1}, and 2*k*q^{-1} are the columns
            // of the rotation matrix computed in Quaternion::ToRotationMatrix.
            // The vector v is obtained as the product of that rotation matrix with
            // vector u.  As such, the quaternion representation of a rotation
            // matrix requires less space than the matrix and more time to compute
            // the rotated vector.  Typical space-time tradeoff...
            // var kRot = this.toMatrix();
            // return kRot.multiply(rkVector);
            return Vector3.Zero;
        }

        // spherical linear interpolation
        public static slerp(t: number, p: Quaternion, q: Quaternion): Quaternion {
            var fCos = p.dot(q);
            var fAngle = Math.acos(fCos);

            if (Math.abs(fAngle) >= 0.000001) {
                var fSin = Math.sin(fAngle);
                var fInvSin = 1.0 / fSin;
                var fCoeff0 = Math.sin((1.0 - t) * fAngle) * fInvSin;
                var fCoeff1 = Math.sin(t * fAngle) * fInvSin;
                return Quaternion.add(Quaternion.scale(p, fCoeff0), Quaternion.scale(q, fCoeff1));
            }
            else {
                return new Quaternion([p.m[0], p.m[1], p.m[2], p.m[3]]);
            }
        }

        public static slerpExtraSpins(t: number, p: Quaternion, q: Quaternion, extraSpin: number): Quaternion {
            var fCos = p.dot(q);
            var fAngle = Math.acos(fCos);

            if (Math.abs(fAngle) >= 0.000001) {
                var fSin = Math.sin(fAngle);
                var fPhase = Math.PI * extraSpin * t;
                var fInvSin = 1.0 / fSin;
                var fCoeff0 = Math.sin((1.0 - t) * fAngle - fPhase) * fInvSin;
                var fCoeff1 = Math.sin(t * fAngle + fPhase) * fInvSin;
                return Quaternion.add(Quaternion.scale(p, fCoeff0), Quaternion.scale(q, fCoeff1));
            }
            else {
                return new Quaternion([p.m[0], p.m[1], p.m[2], p.m[3]]);
            }
        }

        // intermediate terms for spherical quadratic interpolation
        public static intermediate(q0: Quaternion, q1: Quaternion, q2: Quaternion): Quaternion {
            // assert:  Q0, Q1, Q2 all unit-length
            var kQ1Inv = q1.conjugate();
            var kP0 = Quaternion.mul(kQ1Inv, q0);
            var kP2 = Quaternion.mul(kQ1Inv, q2);
            var kArg = Quaternion.scale(Quaternion.add(kP0.log(), kP2.log()), -0.25);
            var kA = Quaternion.mul(q1, kArg.exp());

            return kA;
        }

        // spherical quadratic interpolation
        public static squad(t: number, q0: Quaternion, a0: Quaternion, a1: Quaternion, q1: Quaternion): Quaternion {
            var fSlerpT = 2 * t * (1.0 - t);
            var kSlerpP = Quaternion.slerp(t, q0, q1);
            var kSlerpQ = Quaternion.slerp(t, a0, a1);

            return Quaternion.slerp(t, kSlerpP, kSlerpQ);
        }

        // Compute a quaternion that rotates unit-length vector V1 to unit-length
        // vector V2.  The rotation is about the axis perpendicular to both V1 and
        // V2, with angle of that between V1 and V2.  If V1 and V2 are parallel,
        // any axis of rotation will do, such as the permutation (z2,x2,y2), where
        // V2 = (x2,y2,z2).
        public static align(v1: Vector3, v2: Vector3): Quaternion {
            // If V1 and V2 are not parallel, the axis of rotation is the unit-length
            // vector U = Cross(V1,V2)/Length(Cross(V1,V2)).  The angle of rotation,
            // A, is the angle between V1 and V2.  The quaternion for the rotation is
            // q = cos(A/2) + sin(A/2)*(ux*i+uy*j+uz*k) where U = (ux,uy,uz).
            //
            // (1) Rather than extract A = acos(Dot(V1,V2)), multiply by 1/2, then
            //     compute sin(A/2) and cos(A/2), we reduce the computational costs by
            //     computing the bisector B = (V1+V2)/Length(V1+V2), so cos(A/2) =
            //     Dot(V1,B).
            //
            // (2) The rotation axis is U = Cross(V1,B)/Length(Cross(V1,B)), but
            //     Length(Cross(V1,B)) = Length(V1)*Length(B)*sin(A/2) = sin(A/2), in
            //     which case sin(A/2)*(ux*i+uy*j+uz*k) = (cx*i+cy*j+cz*k) where
            //     C = Cross(V1,B).
            //
            // If V1 = V2, then B = V1, cos(A/2) = 1, and U = (0,0,0).  If V1 = -V2,
            // then B = 0.  This can happen even if V1 is approximately -V2 using
            // floating point arithmetic, since Vector3::Normalize checks for
            // closeness to zero and returns the zero vector accordingly.  The test
            // for exactly zero is usually not recommend for floating point
            // arithmetic, but the implementation of Vector3::Normalize guarantees
            // the comparison is robust.  In this case, the A = pi and any axis
            // perpendicular to V1 may be used as the rotation axis.
            var kResult = new Quaternion();
            var kBisector = Vector3.add(v1, v2);
            kBisector.normalize();

            var fCosHalfAngle = v1.dot(kBisector);
            kResult.m[0] = fCosHalfAngle;

            if (fCosHalfAngle != 0.0) {
                var kCross = v1.cross(kBisector);
                kResult.m[1] = kCross.X;
                kResult.m[2] = kCross.Y;
                kResult.m[3] = kCross.Z;
            }
            else {
                var fInvLength;
                if (Math.abs(v1[0]) >= Math.abs(v1[1])) {
                    // V1.x or V1.z is the largest magnitude component
                    fInvLength = 1.0 / Math.sqrt(v1[0] * v1[0] + v1[2] * v1[2]);
                    kResult.m[1] = -v1[2] * fInvLength;
                    kResult.m[2] = 0.0;
                    kResult.m[3] = +v1[0] * fInvLength;
                }
                else {
                    // V1.y or V1.z is the largest magnitude component
                    fInvLength = 1.0 / Math.sqrt(v1[1] * v1[1] + v1[2] * v1[2]);
                    kResult.m[1] = 0.0;
                    kResult.m[2] = +v1[2] * fInvLength;
                    kResult.m[3] = -v1[1] * fInvLength;
                }
            }

            return kResult;
        }


        // Decompose a quaternion into q = q_twist * q_swing, where q is 'this'
        // quaternion.  If V1 is the input axis and V2 is the rotation of V1 by
        // q, q_swing represents the rotation about the axis perpendicular to
        // V1 and V2 (see Quaternion::Align), and q_twist is a rotation about V1.
        public decomposeTwistTimesSwing(v1: Vector3, qTwist: Quaternion, qSwing: Quaternion): void {
            // var v2 = this.rotate(v1);
            // qSwing = this.align(v1, v2);

            // qTwist = this.multiply(qSwing.conjugate());
        }

        // Decompose a quaternion into q = q_swing * q_twist, where q is 'this'
        // quaternion.  If V1 is the input axis and V2 is the rotation of V1 by
        // q, q_swing represents the rotation about the axis perpendicular to
        // V1 and V2 (see Quaternion::Align), and q_twist is a rotation about V1.
        decomposeSwingTimesTwist(v1: Vector3, qSwing: Quaternion, qTwist: Quaternion): void {
            // var v2 = this.rotate(v1);
            // qSwing = this.align(v1, v2);

            // qTwist = qSwing.conjugate().multiply(this);         
        }
    };

    export namespace Quaternion {
    };
};