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
    export class Matrix3 {
        static Zero = new Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
        static Identity = new Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);

        private m: Array<number>;

        // Create a matrix from an array of numbers.  The input array is
        // interpreted based on the Boolean input as
        //   true:  entry[0..8]={m00,m01,m02,
        //                       m10,m11,m12,
        //                       m20,m21,m22,
        //                       } [row major]
        //   false: entry[0..8]={m00,m10,m20,
        //                       m01,m11,m21,
        //                       m02,m12,m22,
        //                       } [col major]        
        public constructor(v?: Array<number>, rowMajor?: boolean) {
            this.set(v, rowMajor);
        }

        public destructor() {
        }

        public set(v: Array<number>, rowMajor?: boolean) {
            this.m = new Array<number>(9);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 3; c++) {
                        for (var r = 0; r < 3; r++) {
                            this.m[r * 3 + c] = v[i];
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
                this.m[0], this.m[3], this.m[6],
                this.m[1], this.m[4], this.m[7],
                this.m[2], this.m[5], this.m[8]
            ];
        };

        public toString(): string {
            return this.m.toString();
        };

        public initZero() {
            this.m[0] = 0; this.m[1] = 0; this.m[2] = 0;
            this.m[3] = 0; this.m[4] = 0; this.m[5] = 0;
            this.m[6] = 0; this.m[7] = 0; this.m[8] = 0;
        }

        public initIdentity() {
            this.m[0] = 1; this.m[1] = 0; this.m[2] = 0;
            this.m[3] = 0; this.m[4] = 1; this.m[5] = 0;
            this.m[6] = 0; this.m[7] = 0; this.m[8] = 1;
        }

        public initTranslate(x: number, y: number) {
            this.initIdentity();
            this.m[2] = x;
            this.m[5] = y;
        }

        public initRotate(angle: number) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);

            this.m[0] = cosine;
            this.m[3] = sine;
            this.m[1] = -sine;
            this.m[4] = cosine;
        }

        public initScale(x: number, y: number) {
            this.m[0] = x; this.m[1] = 0; this.m[2] = 0;
            this.m[3] = 0; this.m[4] = y; this.m[5] = 0;
            this.m[6] = 0; this.m[7] = 0; this.m[8] = 1;
        }

        public initTranslateRotScale(tx: number, ty: number, r: number, scale: number) {
            var deg2rad = Math.PI / 180.0;
            var rad = r * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);

            this.m[0] = cosine * scale; this.m[1] = -sine * scale; this.m[2] = tx;
            this.m[3] = sine * scale; this.m[4] = cosine * scale; this.m[5] = ty;
            this.m[6] = 0; this.m[7] = 0; this.m[8] = 1;
        }

        public initTranslateScale(tx: number, ty: number, s: number) {
            this.m[0] = s; this.m[1] = 0; this.m[2] = tx;
            this.m[3] = 0; this.m[4] = s; this.m[5] = ty;
            this.m[6] = 0; this.m[7] = 0; this.m[8] = 1;
        }

        public initLookAt(position: Vector2, object: Vector2, up: Vector2) {
            this.initLookAtScale(position, object, up, 1.0);
        }

        public initLookAtScale(position: Vector2, object: Vector2, up: Vector2, scale: number) {
            var xaxis = Vector2.sub(position, object); xaxis.normalize();
            var yaxis = xaxis.unitPerpendicular();

            xaxis = Vector2.scale(xaxis, scale);
            if (yaxis.dot(up) <= 0)
                yaxis = Vector2.scale(yaxis, -scale);
            else
                yaxis = Vector2.scale(yaxis, scale);

            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = position.X;
            this.m[3] = xaxis.Y;
            this.m[4] = yaxis.Y;
            this.m[5] = position.Y;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }

        public initStandOn(position: Vector2, object: Vector2, upward: Vector2) {
            this.initStandOnScale(position, object, upward, 1.0);
        }

        public initStandOnScale(position: Vector2, object: Vector2, upward: Vector2, scale: number) {
            var yaxis = upward; yaxis.normalize();
            var xaxis = yaxis.unitPerpendicular();
            var dir = Vector2.sub(position, object); dir.normalize();

            yaxis = Vector2.scale(yaxis, scale);
            if(xaxis.dot(dir) <= 0)
                xaxis = Vector2.scale(xaxis, -scale);
            else
                xaxis = Vector2.scale(xaxis, scale);

            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = position.X;
            this.m[3] = xaxis.Y;
            this.m[4] = yaxis.Y;
            this.m[5] = position.Y;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }

        public setRow(i: number, values: Array<number>) {
            var idx = i * 3;

            this.m[idx + 0] = values[0];
            this.m[idx + 1] = values[1];
            this.m[idx + 2] = values[2];
        }

        public getRow(i: number): Array<number> {
            var idx = i * 3;

            return [this.m[idx + 0], this.m[idx + 1], this.m[idx + 2]];
        }

        public setColumn(i: number, values: Array<number>) {
            var idx = i;

            this.m[idx + 0] = values[0];
            this.m[idx + 3] = values[1];
            this.m[idx + 6] = values[2];
        }

        public getColumn(i: number): Array<number> {
            var idx = i;

            return [this.m[idx + 0], this.m[idx + 3], this.m[idx + 6]];
        }

        public setXAxis(v: Vector2) {
            this.m[0] = v.X;
            this.m[3] = v.Y;
        }

        public getXAxis(): Vector2 {
            return new Vector2([this.m[0], this.m[3]]);
        }

        public setYAxis(v: Vector2) {
            this.m[1] = v.X;
            this.m[4] = v.Y;
        }

        public getYAxis(): Vector2 {
            return new Vector2([this.m[1], this.m[4]]);
        }

        public setTranslate(v: Vector2) {
            this.m[2] = v.X;
            this.m[5] = v.Y;
        }

        public getTranslate(): Vector2 {
            return new Vector2([this.m[2], this.m[5]]);
        }

        // arithmetic operations
        public static add(m1: Matrix3, m2: Matrix3): Matrix3 {
            return new Matrix3(
                [m1.m[0] + m2.m[0], m1.m[1] + m2.m[1], m1.m[2] + m2.m[2],
                 m1.m[3] + m2.m[3], m1.m[4] + m2.m[4], m1.m[5] + m2.m[5],
                 m1.m[6] + m2.m[6], m1.m[7] + m2.m[7], m1.m[8] + m2.m[8]
                ]);
        }

        public static substract(m1: Matrix3, m2: Matrix3): Matrix3 {
            return new Matrix3(
                [m1.m[0] - m2.m[0], m1.m[1] - m2.m[1], m1.m[2] - m2.m[2], 
                 m1.m[3] - m2.m[3], m1.m[4] - m2.m[4], m1.m[5] - m2.m[5], 
                 m1.m[6] - m2.m[6], m1.m[7] - m2.m[7], m1.m[8] - m2.m[8]
                ]);
        }

        public static mul(m1: Matrix3, m2: Matrix3): Matrix3 {
            var mat = new Matrix3();

            mat.m[0] = m1.m[0] * m2.m[0] + m1.m[1] * m2.m[3] + m1.m[2] * m2.m[6];
            mat.m[1] = m1.m[0] * m2.m[1] + m1.m[1] * m2.m[4] + m1.m[2] * m2.m[7];
            mat.m[2] = m1.m[0] * m2.m[2] + m1.m[1] * m2.m[5] + m1.m[2] * m2.m[8];

            mat.m[3] = m1.m[3] * m2.m[0] + m1.m[4] * m2.m[3] + m1.m[5] * m2.m[6];
            mat.m[4] = m1.m[3] * m2.m[1] + m1.m[4] * m2.m[4] + m1.m[5] * m2.m[7];
            mat.m[5] = m1.m[3] * m2.m[2] + m1.m[4] * m2.m[5] + m1.m[5] * m2.m[8];
            
            mat.m[6] = m1.m[6] * m2.m[0] + m1.m[7] * m2.m[3] + m1.m[8] * m2.m[6];
            mat.m[7] = m1.m[6] * m2.m[1] + m1.m[7] * m2.m[4] + m1.m[8] * m2.m[7];
            mat.m[8] = m1.m[6] * m2.m[2] + m1.m[7] * m2.m[5] + m1.m[8] * m2.m[8];

            return mat;
        }

        public static neg(m: Matrix3): Matrix3 {
            return new Matrix3(
                [
                    -m.m[0], -m.m[1], -m.m[2], 
                    -m.m[3], -m.m[4], -m.m[5], 
                    -m.m[6], -m.m[7], -m.m[8]
                ]);
        }

        public static scale(mat: Matrix3, scale: number): Matrix3 {
            return new Matrix3(
                [
                    mat.m[0] * scale, mat.m[1] * scale, mat.m[2] * scale, 
                    mat.m[3] * scale, mat.m[4] * scale, mat.m[5] * scale, 
                    mat.m[6] * scale, mat.m[7] * scale, mat.m[8] * scale
                ]);
        }

        /*
        public add(m: Matrix3): Matrix3 {
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

        public sub(m: Matrix3): Matrix3 {
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
        
        public mul(m: Matrix3): Matrix3 {
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

        public neg(): Matrix3 {
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

        public scale(scale: number): Matrix3 {
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
        public mulVector3(v: Vector3): Vector3  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1] + this.m[5] * v[2];
            var m2 = this.m[6] * v[0] + this.m[7] * v[1] + this.m[8] * v[2];

            return new Vector3([m0, m1, m2]);
        }

        public mulVector2(v: Vector2): Vector2  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1];

            return new Vector2([m0, m1]);
        }

        public mulPositionVector2(v: Vector2): Vector2  // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * 1;
            var m1 = this.m[3] * v[0] + this.m[4] * v[1] + this.m[5] * 1;

            return new Vector2([m0, m1]);
        }

        public mulDirectionVector2(v: Vector2): Vector2 // M * v
        {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1];
            var m2 = this.m[6] * v[0] + this.m[7] * v[1];

            return new Vector2([m0, m1]);
        }

        // other operations
        public transpose()  // M^T
        {
            var temp = this.m.slice(0);

            this.m[0] = temp[0];
            this.m[1] = temp[3];
            this.m[2] = temp[6];

            this.m[3] = temp[1];
            this.m[4] = temp[4]
            this.m[5] = temp[7];

            this.m[6] = temp[2];
            this.m[7] = temp[5];
            this.m[8] = temp[8];
        }

        public transposeMutiply(m: Matrix3)  // this^T * M
        {
            var temp = this.m.slice(0);
        }

        public mutiplyTranspose(m: Matrix3)  // this * M^T
        {
            var temp = this.m.slice(0);

            return this;
        }

        public inverse(): Matrix3 {
            var a = Matrix3.Identity;
            return a;
        }

        public adjoint(): void {
        }

        determinant(): number {
            return 0.0;
        }
    };

    export namespace Matrix3 {
    };
};