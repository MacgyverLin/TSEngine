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
/// <reference path = "../EngineCore/Camera.ts" /> 

namespace Magnum {
    export class OrthoCamera extends Camera {
        private width : number;
        private height : number;
        private nearPlane : number;
        private farPlane : number;

        public constructor(gameObject: GameObject) {
            super(gameObject);
        }

        public destructor() {
        }        

        public static ClassName()
        {
            return "OrthoCamera";
        }                

        onConstruct(): boolean {
            this.width = Stage.getScreenWidth();
            this.height = Stage.getScreenHeight();
            this.nearPlane = 0.1;
            this.farPlane  = 1000.0;

            return true;
        }

        onDestruct() {
        }

        public onDebugRender() : void
        {
        }
        
        public get Width() {
            return this.width;
        }

        public set Width(width: number) {
            this.width = width;

            this.inValidateProjectionTransform();
        }

        public get Height() {
            return this.height;
        }

        public set Height(height: number) {
            this.height = height;

            this.inValidateProjectionTransform();
        }

        public get NearPlane() {
            return this.nearPlane;
        }

        public set NearPlane(nearPlane: number) {
            this.nearPlane = nearPlane;

            this.inValidateProjectionTransform();
        }

        public get FarPlane() {
            return this.farPlane;
        }

        public set FarPlane(farPlane: number) {
            this.farPlane = farPlane;

            this.inValidateProjectionTransform();
        }

        public onValidateProjectionTransform() : Matrix4
        {
            var m = new Matrix4();
            m.initOrthogonalOffCenter(0, this.width, 0, this.height, this.nearPlane, this.farPlane);

            return m;
        }
    }

    export namespace OrthoCamera {
    }
};