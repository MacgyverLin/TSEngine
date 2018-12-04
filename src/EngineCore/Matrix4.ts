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
    export class Matrix4 {
        static Zero = new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        static Identity = new Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        private m: Array<number>;

        // Create a matrix from an array of numbers.  The input array is
        // interpreted based on the Boolean input as
        //   true:  entry[0..15]={m00,m01,m02,m03,m10,m11,m12,m13,m20,m21,m22,
        //                        m23,m30,m31,m32,m33} [row major]
        //   false: entry[0..15]={m00,m10,m20,m30,m01,m11,m21,m31,m02,m12,m22,
        //                        m32,m03,m13,m23,m33} [col major]        
        public constructor(v?: Array<number>, rowMajor?: boolean) {
            this.set(v, rowMajor);
        }

        public destructor() {
        }

        public set(v: Array<number>, rowMajor?: boolean) {
            this.m = new Array<number>(16);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 4; c++) {
                        for (var r = 0; r < 4; r++) {
                            this.m[r * 4 + c] = v[i];
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
                this.m[0], this.m[4], this.m[8], this.m[12],
                this.m[1], this.m[5], this.m[9], this.m[13],
                this.m[2], this.m[6], this.m[10], this.m[14],
                this.m[3], this.m[7], this.m[11], this.m[15]
            ];
        };

        public toString(): string {
            return this.m.toString();
        };

        public initZero() {
            this.m[0] = 0; this.m[1] = 0; this.m[2] = 0; this.m[3] = 0;
            this.m[4] = 0; this.m[5] = 0; this.m[6] = 0; this.m[7] = 0;
            this.m[8] = 0; this.m[9] = 0; this.m[10] = 0; this.m[11] = 0;
            this.m[12] = 0; this.m[13] = 0; this.m[14] = 0; this.m[15] = 0;
        }

        public initIdentity() {
            this.m[0] = 1; this.m[1] = 0; this.m[2] = 0; this.m[3] = 0;
            this.m[4] = 0; this.m[5] = 1; this.m[6] = 0; this.m[7] = 0;
            this.m[8] = 0; this.m[9] = 0; this.m[10] = 1; this.m[11] = 0;
            this.m[12] = 0; this.m[13] = 0; this.m[14] = 0; this.m[15] = 1;
        }

        public initTranslate(x: number, y: number, z: number) {
            this.initIdentity();
            this.m[3] = x;
            this.m[7] = y;
            this.m[11] = z;
        }

        public initRotateX(angle: number) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);

            this.m[5] = cosine;
            this.m[9] = sine;
            this.m[6] = -sine;
            this.m[10] = cosine;
        }

        public initRotateY(angle: number) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);

            this.m[0] = cosine;
            this.m[8] = -sine;
            this.m[2] = sine;
            this.m[10] = cosine;
        }

        public initRotateZ(angle: number) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);

            this.m[0] = cosine;
            this.m[4] = sine;
            this.m[1] = -sine;
            this.m[5] = cosine;
        }

        public initRotateZXY(rz: number, rx: number, ry: number) {
            this.initTranslateRotZYXScale(0, 0, 0, rz, ry, rx, 1);
        }

        public initRotateZYX(rz: number, ry: number, rx: number) {
            this.initTranslateRotZYXScale(0, 0, 0, rz, ry, rx, 1);
        }

        public initRotateAxisAngle(axis: Vector3, angle: number) {
            var radian = angle * Math.PI / 180.0;
            var fCos = Math.cos(-radian);
            var fSin = Math.sin(-radian);
            var fOneMinusCos = 1.0 - fCos;
            var fX2 = axis.X * axis.X;
            var fY2 = axis.Y * axis.Y;
            var fZ2 = axis.Z * axis.Z;
            var fXYM = axis.X * axis.Y * fOneMinusCos;
            var fXZM = axis.X * axis.Z * fOneMinusCos;
            var fYZM = axis.Y * axis.Z * fOneMinusCos;
            var fXSin = axis.X * fSin;
            var fYSin = axis.Y * fSin;
            var fZSin = axis.Z * fSin;

            this.initIdentity();
            this.m[0] = fX2 * fOneMinusCos + fCos;
            this.m[1] = fXYM + fZSin;
            this.m[2] = fXZM - fYSin;

            this.m[4] = fXYM - fZSin;
            this.m[5] = fY2 * fOneMinusCos + fCos;
            this.m[6] = fYZM + fXSin;

            this.m[8] = fXZM + fYSin;
            this.m[9] = fYZM - fXSin;
            this.m[10] = fZ2 * fOneMinusCos + fCos;
        }

        public initScale(x: number, y: number, z: number) {
            this.m[0] = x; this.m[1] = 0; this.m[2] = 0; this.m[3] = 0;
            this.m[4] = 0; this.m[5] = y; this.m[6] = 0; this.m[7] = 0;
            this.m[8] = 0; this.m[9] = 0; this.m[10] = z; this.m[11] = 0;
            this.m[12] = 0; this.m[13] = 0; this.m[14] = 0; this.m[15] = 1;
        }

        public initTranslateRotZXYScale(tx: number, ty: number, tz: number, rz: number, rx: number, ry: number, scale: number) {
            this.fromEulerAnglesZXY(rz, rx, ry);
            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;

            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;

            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;

            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }

        public initTranslateRotZYXScale(tx: number, ty: number, tz: number, rz: number, ry: number, rx: number, scale: number) {
            this.fromEulerAnglesZYX(rz, rx, ry);
            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;

            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;

            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;

            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }

        public initTranslateRotAxisAngleScale(tx: number, ty: number, tz: number, axis: Vector3, angle: number, scale: number) {
            this.initRotateAxisAngle(axis, angle);

            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;

            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;

            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;

            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }

        public initTranslateScale(tx: number, ty: number, tz: number, scale: number) {
            this.initScale(scale, scale, scale);

            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }

        public initLookAt(position: Vector3, object: Vector3, upward: Vector3) {
            this.initLookAtScale(position, object, upward, 1.0);
        }

        public initLookAtScale(position: Vector3, object: Vector3, upward: Vector3, scale: number) {
            var zaxis = Vector3.sub(position, object); zaxis.normalize();
            var yaxis = Vector3.sub(upward, Vector3.scale(zaxis, upward.dot(zaxis))); yaxis.normalize();
            var xaxis = yaxis.cross(zaxis);

            if (scale != 1.0) {
                xaxis = Vector3.scale(xaxis, scale);
                yaxis = Vector3.scale(yaxis, scale);
                zaxis = Vector3.scale(zaxis, scale);
            }

            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = zaxis.X;
            this.m[3] = position.X;
            this.m[4] = xaxis.Y;
            this.m[5] = yaxis.Y;
            this.m[6] = zaxis.Y;
            this.m[7] = position.Y;
            this.m[8] = xaxis.Z;
            this.m[9] = yaxis.Z;
            this.m[10] = zaxis.Z;
            this.m[11] = position.Z;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }

        public initStandOn(position: Vector3, object: Vector3, upward: Vector3) {
            this.initStandOnScale(position, object, upward, 1.0);
        }

        public initStandOnScale(position: Vector3, object: Vector3, upward: Vector3, scale: number) {
            var yaxis = upward; yaxis.normalize();
            var zaxis = Vector3.sub(position, object);
            var dot0 = zaxis.dot(yaxis);
            zaxis = Vector3.sub(zaxis, Vector3.scale(yaxis, -dot0)); zaxis.normalize();
            var xaxis = yaxis.cross(zaxis);

            xaxis = Vector3.scale(xaxis, scale);
            yaxis = Vector3.scale(yaxis, scale);
            zaxis = Vector3.scale(zaxis, scale);

            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = zaxis.X;
            this.m[3] = position.X;
            this.m[4] = xaxis.Y;
            this.m[5] = yaxis.Y;
            this.m[6] = zaxis.Y;
            this.m[7] = position.Y;
            this.m[8] = xaxis.Z;
            this.m[9] = yaxis.Z;
            this.m[10] = zaxis.Z;
            this.m[11] = position.Z;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }

        public initPerspective(w: number, h: number, n: number, f: number) {
            this.initPerspectiveOffCenter(-w / 2, w / 2, -h / 2, h / 2, n, f);
        }

        public initPerspectiveFov(fovy: number, aspect: number, n: number, f: number) {
            var deg2rad = Math.PI / 180.0
            var tanHalfFovY = Math.tan(fovy / 2 * deg2rad);
            var t = n * tanHalfFovY;
            var r = t * aspect;

            this.initPerspectiveOffCenter(-r, r, -t, t, n, f);
        }

        public initPerspectiveOffCenter(l: number, r: number, b: number, t: number, n: number, f: number) {
            this.m[0] = 2 * n / (r - l);
            this.m[1] = 0;
            this.m[2] = (r + l) / (r - l);
            this.m[3] = 0;

            this.m[4] = 0;
            this.m[5] = 2 * n / (t - b);
            this.m[6] = (t + b) / (t - b);
            this.m[7] = 0;

            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = -(f + n) / (f - n);
            this.m[11] = -2 * f * n / (f - n);

            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = -1;
            this.m[15] = 0;
        }

        public initOrthogonal(w: number, h: number, n: number, f: number) {
            this.initOrthogonalOffCenter(-w / 2, w / 2, -h / 2, h / 2, n, f);
        }

        public initOrthogonalOffCenter(l: number, r: number, b: number, t: number, n: number, f: number) {
            this.m[0] = 2 / (r - l);
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = -(r + l) / (r - l);

            this.m[4] = 0;
            this.m[5] = 2 / (t - b);
            this.m[6] = 0;
            this.m[7] = -(t + b) / (t - b);

            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = -2 / (f - n);
            this.m[11] = -(f + n) / (f - n);

            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }

        public initPerspectiveFovShadow(roll : number, position: Vector3, object: Vector3, upward: Vector3,
            fovy: number, aspect: number, near: number, far: number) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);

            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);

            var matCookieP = new Matrix4();
            matCookieP.initPerspectiveFov(fovy, aspect, near, far);

            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);

            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));

            for(var i=0; i<16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }        

        public initPerspectiveShadow(roll : number, position: Vector3, object: Vector3, upward: Vector3,
            left: number, right : number, bottom: number, top: number, near: number, far: number) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);

            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);

            var matCookieP = new Matrix4();
            matCookieP.initPerspectiveOffCenter(left, right, bottom, top, near , far);

            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);

            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));

            for(var i=0; i<16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }

        public initOrthogonalShadow(roll : number, position: Vector3, object: Vector3, upward: Vector3,
            left: number, right : number, bottom: number, top: number, near: number, far: number) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);

            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);

            var matCookieP = new Matrix4();
            matCookieP.initOrthogonalOffCenter(left, right, bottom, top, near , far);

            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);

            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));

            for(var i=0; i<16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }        

        public setRow(i: number, values: Array<number>) {
            var idx = i * 4;

            this.m[idx + 0] = values[0];
            this.m[idx + 1] = values[1];
            this.m[idx + 2] = values[2];
            this.m[idx + 3] = values[3];
        }

        public getRow(i: number): Array<number> {
            var idx = i * 4;

            return [this.m[idx + 0], this.m[idx + 1], this.m[idx + 2], this.m[idx + 3]];
        }

        public setColumn(i: number, values: Array<number>) {
            var idx = i;

            this.m[idx + 0] = values[0];
            this.m[idx + 4] = values[1];
            this.m[idx + 8] = values[2];
            this.m[idx + 12] = values[3];
        }

        public getColumn(i: number): Array<number> {
            var idx = i;

            return [this.m[idx + 0], this.m[idx + 4], this.m[idx + 8], this.m[idx + 12]];
        }

        public setXAxis(v: Vector3) {
            this.m[0] = v.X;
            this.m[4] = v.Y;
            this.m[8] = v.Z;
        }

        public getXAxis(): Vector3 {
            return new Vector3([this.m[0], this.m[4], this.m[8]]);
        }

        public setYAxis(v: Vector3) {
            this.m[1] = v.X;
            this.m[5] = v.Y;
            this.m[9] = v.Z;
        }

        public getYAxis(): Vector3 {
            return new Vector3([this.m[1], this.m[5], this.m[9]]);
        }

        public setZAxis(v: Vector3) {
            this.m[2] = v.X;
            this.m[6] = v.Y;
            this.m[10] = v.Z;
        }

        public getZAxis(): Vector3 {
            return new Vector3([this.m[2], this.m[6], this.m[10]]);
        }

        public setTranslate(v: Vector3) {
            this.m[3] = v.X;
            this.m[7] = v.Y;
            this.m[11] = v.Z;
        }

        public getTranslate(): Vector3 {
            return new Vector3([this.m[3], this.m[7], this.m[11]]);
        }

        // arithmetic operations
        public static add(m1: Matrix4, m2: Matrix4): Matrix4 {
            return new Matrix4(
                [m1.m[0] + m2.m[0], m1.m[1] + m2.m[1], m1.m[2] + m2.m[2], m1.m[3] + m2.m[3],
                m1.m[4] + m2.m[4], m1.m[5] + m2.m[5], m1.m[6] + m2.m[6], m1.m[7] + m2.m[7],
                m1.m[8] + m2.m[8], m1.m[9] + m2.m[9], m1.m[10] + m2.m[10], m1.m[11] + m2.m[11],
                m1.m[12] + m2.m[12], m1.m[13] + m2.m[13], m1.m[14] + m2.m[14], m1.m[15] + m2.m[15]
                ]);
        }

        public static substract(m1: Matrix4, m2: Matrix4): Matrix4 {
            return new Matrix4(
                [m1.m[0] - m2.m[0], m1.m[1] - m2.m[1], m1.m[2] - m2.m[2], m1.m[3] - m2.m[3],
                m1.m[4] - m2.m[4], m1.m[5] - m2.m[5], m1.m[6] - m2.m[6], m1.m[7] - m2.m[7],
                m1.m[8] - m2.m[8], m1.m[9] - m2.m[9], m1.m[10] - m2.m[10], m1.m[11] - m2.m[11],
                m1.m[12] - m2.m[12], m1.m[13] - m2.m[13], m1.m[14] - m2.m[14], m1.m[15] - m2.m[15]
                ]);
        }

        public static mul(m1: Matrix4, m2: Matrix4): Matrix4 {
            var mat = new Matrix4();

            mat.m[0] = m1.m[0] * m2.m[0] + m1.m[1] * m2.m[4] + m1.m[2] * m2.m[8] + m1.m[3] * m2.m[12];
            mat.m[1] = m1.m[0] * m2.m[1] + m1.m[1] * m2.m[5] + m1.m[2] * m2.m[9] + m1.m[3] * m2.m[13];
            mat.m[2] = m1.m[0] * m2.m[2] + m1.m[1] * m2.m[6] + m1.m[2] * m2.m[10] + m1.m[3] * m2.m[14];
            mat.m[3] = m1.m[0] * m2.m[3] + m1.m[1] * m2.m[7] + m1.m[2] * m2.m[11] + m1.m[3] * m2.m[15];

            mat.m[4] = m1.m[4] * m2.m[0] + m1.m[5] * m2.m[4] + m1.m[6] * m2.m[8] + m1.m[7] * m2.m[12];
            mat.m[5] = m1.m[4] * m2.m[1] + m1.m[5] * m2.m[5] + m1.m[6] * m2.m[9] + m1.m[7] * m2.m[13];
            mat.m[6] = m1.m[4] * m2.m[2] + m1.m[5] * m2.m[6] + m1.m[6] * m2.m[10] + m1.m[7] * m2.m[14];
            mat.m[7] = m1.m[4] * m2.m[3] + m1.m[5] * m2.m[7] + m1.m[6] * m2.m[11] + m1.m[7] * m2.m[15];

            mat.m[8] = m1.m[8] * m2.m[0] + m1.m[9] * m2.m[4] + m1.m[10] * m2.m[8] + m1.m[11] * m2.m[12];
            mat.m[9] = m1.m[8] * m2.m[1] + m1.m[9] * m2.m[5] + m1.m[10] * m2.m[9] + m1.m[11] * m2.m[13];
            mat.m[10] = m1.m[8] * m2.m[2] + m1.m[9] * m2.m[6] + m1.m[10] * m2.m[10] + m1.m[11] * m2.m[14];
            mat.m[11] = m1.m[8] * m2.m[3] + m1.m[9] * m2.m[7] + m1.m[10] * m2.m[11] + m1.m[11] * m2.m[15];

            mat.m[12] = m1.m[12] * m2.m[0] + m1.m[13] * m2.m[4] + m1.m[14] * m2.m[8] + m1.m[15] * m2.m[12];
            mat.m[13] = m1.m[12] * m2.m[1] + m1.m[13] * m2.m[5] + m1.m[14] * m2.m[9] + m1.m[15] * m2.m[13];
            mat.m[14] = m1.m[12] * m2.m[2] + m1.m[13] * m2.m[6] + m1.m[14] * m2.m[10] + m1.m[15] * m2.m[14];
            mat.m[15] = m1.m[12] * m2.m[3] + m1.m[13] * m2.m[7] + m1.m[14] * m2.m[11] + m1.m[15] * m2.m[15];

            return mat;
        }

        public static neg(m: Matrix4): Matrix4 {
            return new Matrix4(
                [
                    -m.m[0], -m.m[1], -m.m[2], -m.m[3],
                    -m.m[4], -m.m[5], -m.m[6], -m.m[7],
                    -m.m[8], -m.m[9], -m.m[10], -m.m[11],
                    -m.m[12], -m.m[13], -m.m[14], -m.m[15]
                ]);
        }

        public static scale(mat: Matrix4, scale: number): Matrix4 {
            return new Matrix4(
                [
                    mat.m[0] * scale, mat.m[1] * scale, mat.m[2] * scale, mat.m[3] * scale,
                    mat.m[4] * scale, mat.m[5] * scale, mat.m[6] * scale, mat.m[7] * scale,
                    mat.m[8] * scale, mat.m[9] * scale, mat.m[10] * scale, mat.m[11] * scale,
                    mat.m[12] * scale, mat.m[13] * scale, mat.m[14] * scale, mat.m[15] * scale
                ]);
        }

        /*
        public add(m: Matrix4): Matrix4 {
            this.m[0] += m.m[0];
            this.m[1] += m.m[1];
            this.m[2] += m.m[2];
            this.m[3] += m.m[3];

            this.m[4] += m.m[4];
            this.m[5] += m.m[5];
            this.m[6] += m.m[6];
            this.m[7] += m.m[7];

            this.m[8] += m.m[8];
            this.m[9] += m.m[9];
            this.m[10] += m.m[10];
            this.m[11] += m.m[11];

            this.m[12] += m.m[12];
            this.m[13] += m.m[13];
            this.m[14] += m.m[14];
            this.m[15] += m.m[15];

            return this;
        }

        public sub(m: Matrix4): Matrix4 {
            this.m[0] -= m.m[0];
            this.m[1] -= m.m[1];
            this.m[2] -= m.m[2];
            this.m[3] -= m.m[3];

            this.m[4] -= m.m[4];
            this.m[5] -= m.m[5];
            this.m[6] -= m.m[6];
            this.m[7] -= m.m[7];

            this.m[8] -= m.m[8];
            this.m[9] -= m.m[9];
            this.m[10] -= m.m[10];
            this.m[11] -= m.m[11];

            this.m[12] -= m.m[12];
            this.m[13] -= m.m[13];
            this.m[14] -= m.m[14];
            this.m[15] -= m.m[15];

            return this;
        }
        

        public mul(m: Matrix4): Matrix4 {
            var temp = this;

            this.m[0] = temp[0] * m.m[0] + temp[1] * m.m[4] + temp[2] * m.m[8] + temp[3] * m.m[12];
            this.m[1] = temp[0] * m.m[1] + temp[1] * m.m[5] + temp[2] * m.m[9] + temp[3] * m.m[13];
            this.m[2] = temp[0] * m.m[2] + temp[1] * m.m[6] + temp[2] * m.m[10] + temp[3] * m.m[14];
            this.m[3] = temp[0] * m.m[3] + temp[1] * m.m[7] + temp[2] * m.m[11] + temp[3] * m.m[15];

            this.m[4] = temp[4] * m.m[0] + temp[5] * m.m[4] + temp[6] * m.m[8] + temp[7] * m.m[12];
            this.m[5] = temp[4] * m.m[1] + temp[5] * m.m[5] + temp[6] * m.m[9] + temp[7] * m.m[13];
            this.m[6] = temp[4] * m.m[2] + temp[5] * m.m[6] + temp[6] * m.m[10] + temp[7] * m.m[14];
            this.m[7] = temp[4] * m.m[3] + temp[5] * m.m[7] + temp[6] * m.m[11] + temp[7] * m.m[15];

            this.m[8] = temp[8] * m.m[0] + temp[9] * m.m[4] + temp[10] * m.m[8] + temp[11] * m.m[12];
            this.m[9] = temp[8] * m.m[1] + temp[9] * m.m[5] + temp[10] * m.m[9] + temp[11] * m.m[13];
            this.m[10] = temp[8] * m.m[2] + temp[9] * m.m[6] + temp[10] * m.m[10] + temp[11] * m.m[14];
            this.m[11] = temp[8] * m.m[3] + temp[9] * m.m[7] + temp[10] * m.m[11] + temp[11] * m.m[15];

            this.m[12] = temp[12] * m.m[0] + temp[13] * m.m[4] + temp[14] * m.m[8] + temp[15] * m.m[12];
            this.m[13] = temp[12] * m.m[1] + temp[13] * m.m[5] + temp[14] * m.m[9] + temp[15] * m.m[13];
            this.m[14] = temp[12] * m.m[2] + temp[13] * m.m[6] + temp[14] * m.m[10] + temp[15] * m.m[14];
            this.m[15] = temp[12] * m.m[3] + temp[13] * m.m[7] + temp[14] * m.m[11] + temp[15] * m.m[15];

            return this;
        }


        public neg(): Matrix4 {
            this.m[0] = -this.m[0];
            this.m[1] = -this.m[1];
            this.m[2] = -this.m[2];
            this.m[3] = -this.m[3];

            this.m[4] = -this.m[4];
            this.m[5] = -this.m[5];
            this.m[6] = -this.m[6];
            this.m[7] = -this.m[7];

            this.m[8] = -this.m[8];
            this.m[9] = -this.m[9];
            this.m[10] = -this.m[10];
            this.m[11] = -this.m[11];

            this.m[12] = -this.m[12];
            this.m[13] = -this.m[13];
            this.m[14] = -this.m[14];
            this.m[15] = -this.m[15];

            return this;
        }        

        public scale(scale: number): Matrix4 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            this.m[4] *= scale;
            this.m[5] *= scale;
            this.m[6] *= scale;
            this.m[7] *= scale;

            this.m[8] *= scale;
            this.m[9] *= scale;
            this.m[10] *= scale;
            this.m[11] *= scale;

            this.m[12] *= scale;
            this.m[13] *= scale;
            this.m[14] *= scale;
            this.m[15] *= scale;

            return this;
        }
        */

        // matrix times vector
        public mulVector4(v: Vector4): Vector4  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3] * v[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7] * v[3];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11] * v[3];
            var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15] * v[3];

            return new Vector4([m0, m1, m2, m3]);
        }

        public mulVector3(v: Vector3): Vector3  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];

            return new Vector3([m0, m1, m2]);
        }

        public mulPositionVector3(v: Vector3): Vector3  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];

            return new Vector3([m0, m1, m2]);
        }

        public mulDirectionVector3(v: Vector3): Vector3 // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];

            return new Vector3([m0, m1, m2]);
        }

        // other operations
        public transpose()  // M^T
        {
            var temp = this.m.slice(0);

            this.m[0] = temp[0];
            this.m[1] = temp[4];
            this.m[2] = temp[8];
            this.m[3] = temp[12];

            this.m[4] = temp[1]
            this.m[5] = temp[5];
            this.m[6] = temp[9];
            this.m[7] = temp[13];

            this.m[8] = temp[2];
            this.m[9] = temp[6];
            this.m[10] = temp[10];
            this.m[11] = temp[14];

            this.m[12] = temp[3];
            this.m[13] = temp[7];
            this.m[14] = temp[11];
            this.m[15] = temp[15];
        }

        public transposeMutiply(m: Matrix4)  // this^T * M
        {
            var temp = this.m.slice(0);

            this.m[0] = temp[0] * m.m[0] + temp[4] * m.m[4] + temp[8] * m.m[8] + temp[12] * m.m[12];
            this.m[1] = temp[0] * m.m[1] + temp[4] * m.m[5] + temp[8] * m.m[9] + temp[12] * m.m[13];
            this.m[2] = temp[0] * m.m[2] + temp[4] * m.m[6] + temp[8] * m.m[10] + temp[12] * m.m[14];
            this.m[3] = temp[0] * m.m[3] + temp[4] * m.m[7] + temp[8] * m.m[11] + temp[12] * m.m[15];

            this.m[4] = temp[1] * m.m[0] + temp[5] * m.m[4] + temp[9] * m.m[8] + temp[13] * m.m[12];
            this.m[5] = temp[1] * m.m[1] + temp[5] * m.m[5] + temp[9] * m.m[9] + temp[13] * m.m[13];
            this.m[6] = temp[1] * m.m[2] + temp[5] * m.m[6] + temp[9] * m.m[10] + temp[13] * m.m[14];
            this.m[7] = temp[1] * m.m[3] + temp[5] * m.m[7] + temp[9] * m.m[11] + temp[13] * m.m[15];

            this.m[8] = temp[2] * m.m[0] + temp[6] * m.m[4] + temp[10] * m.m[8] + temp[14] * m.m[12];
            this.m[9] = temp[2] * m.m[1] + temp[6] * m.m[5] + temp[10] * m.m[9] + temp[14] * m.m[13];
            this.m[10] = temp[2] * m.m[2] + temp[6] * m.m[6] + temp[10] * m.m[10] + temp[14] * m.m[14];
            this.m[11] = temp[2] * m.m[3] + temp[6] * m.m[7] + temp[10] * m.m[11] + temp[14] * m.m[15];

            this.m[12] = temp[3] * m.m[0] + temp[7] * m.m[4] + temp[11] * m.m[8] + temp[15] * m.m[12];
            this.m[13] = temp[3] * m.m[1] + temp[7] * m.m[5] + temp[11] * m.m[9] + temp[15] * m.m[13];
            this.m[14] = temp[3] * m.m[2] + temp[7] * m.m[6] + temp[11] * m.m[10] + temp[15] * m.m[14];
            this.m[15] = temp[3] * m.m[3] + temp[7] * m.m[7] + temp[11] * m.m[11] + temp[15] * m.m[15];
        }

        public mutiplyTranspose(m: Matrix4)  // this * M^T
        {
            var temp = this.m.slice(0);

            this.m[0] = temp[0] * m.m[0] + temp[1] * m.m[1] + temp[2] * m.m[2] + temp[3] * m.m[3];
            this.m[1] = temp[0] * m.m[4] + temp[1] * m.m[5] + temp[2] * m.m[6] + temp[3] * m.m[7];
            this.m[2] = temp[0] * m.m[8] + temp[1] * m.m[9] + temp[2] * m.m[10] + temp[3] * m.m[11];
            this.m[3] = temp[0] * m.m[12] + temp[1] * m.m[13] + temp[2] * m.m[14] + temp[3] * m.m[15];

            this.m[4] = temp[4] * m.m[0] + temp[5] * m.m[1] + temp[6] * m.m[2] + temp[7] * m.m[3];
            this.m[5] = temp[4] * m.m[4] + temp[5] * m.m[5] + temp[6] * m.m[6] + temp[7] * m.m[7];
            this.m[6] = temp[4] * m.m[8] + temp[5] * m.m[9] + temp[6] * m.m[10] + temp[7] * m.m[11];
            this.m[7] = temp[4] * m.m[12] + temp[5] * m.m[13] + temp[6] * m.m[14] + temp[7] * m.m[15];

            this.m[8] = temp[8] * m.m[0] + temp[9] * m.m[1] + temp[10] * m.m[2] + temp[11] * m.m[3];
            this.m[9] = temp[8] * m.m[4] + temp[9] * m.m[5] + temp[10] * m.m[6] + temp[11] * m.m[7];
            this.m[10] = temp[8] * m.m[8] + temp[9] * m.m[9] + temp[10] * m.m[10] + temp[11] * m.m[11];
            this.m[11] = temp[8] * m.m[12] + temp[9] * m.m[13] + temp[10] * m.m[14] + temp[11] * m.m[15];

            this.m[12] = temp[12] * m.m[0] + temp[13] * m.m[1] + temp[14] * m.m[2] + temp[15] * m.m[3];
            this.m[13] = temp[12] * m.m[4] + temp[13] * m.m[5] + temp[14] * m.m[6] + temp[15] * m.m[7];
            this.m[14] = temp[12] * m.m[8] + temp[13] * m.m[9] + temp[14] * m.m[10] + temp[15] * m.m[11];
            this.m[15] = temp[12] * m.m[12] + temp[13] * m.m[13] + temp[14] * m.m[14] + temp[15] * m.m[15];

            return this;
        }

        public inverse(): Matrix4 {
            var fA0 = this.m[0] * this.m[5] - this.m[1] * this.m[4];
            var fA1 = this.m[0] * this.m[6] - this.m[2] * this.m[4];
            var fA2 = this.m[0] * this.m[7] - this.m[3] * this.m[4];
            var fA3 = this.m[1] * this.m[6] - this.m[2] * this.m[5];
            var fA4 = this.m[1] * this.m[7] - this.m[3] * this.m[5];
            var fA5 = this.m[2] * this.m[7] - this.m[3] * this.m[6];
            var fB0 = this.m[8] * this.m[13] - this.m[9] * this.m[12];
            var fB1 = this.m[8] * this.m[14] - this.m[10] * this.m[12];
            var fB2 = this.m[8] * this.m[15] - this.m[11] * this.m[12];
            var fB3 = this.m[9] * this.m[14] - this.m[10] * this.m[13];
            var fB4 = this.m[9] * this.m[15] - this.m[11] * this.m[13];
            var fB5 = this.m[10] * this.m[15] - this.m[11] * this.m[14];

            var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            if (Math.abs(fDet) <= 0.000001) {
                return Matrix4.Zero;
            }

            var kInv = new Matrix4();
            kInv.m[0] = + this.m[5] * fB5 - this.m[6] * fB4 + this.m[7] * fB3;
            kInv.m[4] = - this.m[4] * fB5 + this.m[6] * fB2 - this.m[7] * fB1;
            kInv.m[8] = + this.m[4] * fB4 - this.m[5] * fB2 + this.m[7] * fB0;
            kInv.m[12] = - this.m[4] * fB3 + this.m[5] * fB1 - this.m[6] * fB0;
            kInv.m[1] = - this.m[1] * fB5 + this.m[2] * fB4 - this.m[3] * fB3;
            kInv.m[5] = + this.m[0] * fB5 - this.m[2] * fB2 + this.m[3] * fB1;
            kInv.m[9] = - this.m[0] * fB4 + this.m[1] * fB2 - this.m[3] * fB0;
            kInv.m[13] = + this.m[0] * fB3 - this.m[1] * fB1 + this.m[2] * fB0;
            kInv.m[2] = + this.m[13] * fA5 - this.m[14] * fA4 + this.m[15] * fA3;
            kInv.m[6] = - this.m[12] * fA5 + this.m[14] * fA2 - this.m[15] * fA1;
            kInv.m[10] = + this.m[12] * fA4 - this.m[13] * fA2 + this.m[15] * fA0;
            kInv.m[14] = - this.m[12] * fA3 + this.m[13] * fA1 - this.m[14] * fA0;
            kInv.m[3] = - this.m[9] * fA5 + this.m[10] * fA4 - this.m[11] * fA3;
            kInv.m[7] = + this.m[8] * fA5 - this.m[10] * fA2 + this.m[11] * fA1;
            kInv.m[11] = - this.m[8] * fA4 + this.m[9] * fA2 - this.m[11] * fA0;
            kInv.m[15] = + this.m[8] * fA3 - this.m[9] * fA1 + this.m[10] * fA0;

            var fInvDet = 1.0 / fDet;
            var a = Matrix4.scale(kInv, fInvDet);
            return a;
        }

        public adjoint(): void {
            var temp = this.m.slice(0);

            var fA0 = temp[0] * temp[5] - temp[1] * temp[4];
            var fA1 = temp[0] * temp[6] - temp[2] * temp[4];
            var fA2 = temp[0] * temp[7] - temp[3] * temp[4];
            var fA3 = temp[1] * temp[6] - temp[2] * temp[5];
            var fA4 = temp[1] * temp[7] - temp[3] * temp[5];
            var fA5 = temp[2] * temp[7] - temp[3] * temp[6];
            var fB0 = temp[8] * temp[13] - temp[9] * temp[12];
            var fB1 = temp[8] * temp[14] - temp[10] * temp[12];
            var fB2 = temp[8] * temp[15] - temp[11] * temp[12];
            var fB3 = temp[9] * temp[14] - temp[10] * temp[13];
            var fB4 = temp[9] * temp[15] - temp[11] * temp[13];
            var fB5 = temp[10] * temp[15] - temp[11] * temp[14];

            this.m[0] = temp[5] * fB5 - temp[6] * fB4 + temp[7] * fB3;
            this.m[1] = temp[4] * fB5 + temp[6] * fB2 - temp[7] * fB1;
            this.m[2] = temp[4] * fB4 - temp[5] * fB2 + temp[7] * fB0;
            this.m[3] = temp[4] * fB3 + temp[5] * fB1 - temp[6] * fB0;
            this.m[4] = temp[1] * fB5 + temp[2] * fB4 - temp[3] * fB3;
            this.m[5] = temp[0] * fB5 - temp[2] * fB2 + temp[3] * fB1;
            this.m[6] = temp[0] * fB4 + temp[1] * fB2 - temp[3] * fB0;
            this.m[7] = temp[0] * fB3 - temp[1] * fB1 + temp[2] * fB0;
            this.m[8] = temp[13] * fA5 - temp[14] * fA4 + temp[15] * fA3;
            this.m[9] = temp[12] * fA5 + temp[14] * fA2 - temp[15] * fA1;
            this.m[10] = temp[12] * fA4 - temp[13] * fA2 + temp[15] * fA0;
            this.m[11] = temp[12] * fA3 + temp[13] * fA1 - temp[14] * fA0;
            this.m[12] = temp[9] * fA5 + temp[10] * fA4 - temp[11] * fA3;
            this.m[13] = temp[8] * fA5 - temp[10] * fA2 + temp[11] * fA1;
            this.m[14] = temp[8] * fA4 + temp[9] * fA2 - temp[11] * fA0;
            this.m[15] = temp[8] * fA3 - temp[9] * fA1 + temp[10] * fA0;
        }

        determinant(): number {
            var fA0 = this.m[0] * this.m[5] - this.m[1] * this.m[4];
            var fA1 = this.m[0] * this.m[6] - this.m[2] * this.m[4];
            var fA2 = this.m[0] * this.m[7] - this.m[3] * this.m[4];
            var fA3 = this.m[1] * this.m[6] - this.m[2] * this.m[5];
            var fA4 = this.m[1] * this.m[7] - this.m[3] * this.m[5];
            var fA5 = this.m[2] * this.m[7] - this.m[3] * this.m[6];
            var fB0 = this.m[8] * this.m[13] - this.m[9] * this.m[12];
            var fB1 = this.m[8] * this.m[14] - this.m[10] * this.m[12];
            var fB2 = this.m[8] * this.m[15] - this.m[11] * this.m[12];
            var fB3 = this.m[9] * this.m[14] - this.m[10] * this.m[13];
            var fB4 = this.m[9] * this.m[15] - this.m[11] * this.m[13];
            var fB5 = this.m[10] * this.m[15] - this.m[11] * this.m[14];
            var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;

            return fDet;
        }

        public fromEulerAnglesYZX(ry: number, rz: number, rx: number) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }

        public fromEulerAnglesZXY(rz: number, rx: number, ry: number) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }

        public fromEulerAnglesZYX(rz: number, ry: number, rx: number) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0]
            );

            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }
    };

    export namespace Matrix4 {
    };
};