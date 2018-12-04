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
    export class PerspectiveCamera extends Camera {
        private fovy : number;
        private aspect : number;
        private nearPlane : number;
        private farPlane : number;

        public constructor(gameObject: GameObject) {
            super(gameObject);
        }

        public destructor() {
        }        

        public static ClassName()
        {
            return "PerspectiveCamera";
        }                

        onConstruct(): boolean {
            this.fovy = 90;
            this.aspect = 1;
            this.nearPlane = 0.1;
            this.farPlane  = 10000.0;

            return true;
        }

        onDestruct() {
        }

        public onDebugRender() : void
        {
        }
        
        public get Fovy() {
            return this.fovy;
        }

        public set Fovy(fovy: number) {
            this.fovy = fovy;

            this.inValidateProjectionTransform();
        }

        public get Aspect() {
            return this.aspect;
        }

        public set Aspect(aspect: number) {
            this.aspect = aspect;

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
            m.initPerspectiveFov(this.fovy, this.aspect, this.nearPlane, this.farPlane);

            return m;
        }
    }

    export namespace PerspectiveCamera {
    }
};