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
/// <reference path = "Component.ts" /> 
/// <reference path = "Color4.ts" /> 
/// <reference path = "Rectangle.ts" /> 

namespace Magnum {
    export class Camera extends Component {
        private order: number;
        private targetLayer: number;
        private clearFlags: number;
        private clearColor: Color4;
        private clearDepth: number;
        private clearStencil: number;
        private viewport: Rectangle;
        private projectTransform: Matrix4;
        private projectTransformValid: boolean;

        public constructor(gameObject: GameObject) {
            super(gameObject);

            this.order = 0;
            this.targetLayer = 0;
            this.clearFlags = 0;
            this.clearColor = new Color4();
            this.clearDepth = 1.0;
            this.clearStencil = 0;
            this.viewport = new Rectangle();
            this.projectTransform = Matrix4.Identity;
            this.projectTransformValid = false;            
            Video.Manager.getInstance().addCamera(this);            
        }

        public destructor() {
        }            

        public static ClassName()
        {
            return "Camera";
        } 

        onConstruct(): boolean {

            return true;
        }

        onDestruct() {
            Video.Manager.getInstance().removeCamera(this);
        }

        getOrder(): number {
            return 0;
        }

        public get Order() {
            return this.order;
        }

        public set Order(value: number) {
            this.order = value;
        }

        public get TargetLayer() {
            return this.targetLayer;
        }

        public set TargetLayer(value: number) {
            this.targetLayer = value;
        }

        public get ClearFlags() {
            return this.clearFlags;
        }

        public set ClearFlags(value: number) {
            this.clearFlags = value;
        }

        public get ClearColor() {
            return this.clearColor;
        }

        public set ClearColor(value: Color4) {
            this.clearColor = value;
        }

        public get ClearDepth() {
            return this.clearDepth;
        }

        public set ClearDepth(value: number) {
            this.clearDepth = value;
        }

        public get ClearStencil() {
            return this.clearStencil;
        }

        public set ClearStencil(value: number) {
            this.clearStencil = value;
        }

        public get Viewport() {
            return this.viewport;
        }

        public set Viewport(value: Rectangle) {
            this.viewport = value;
        }

        public getProjectionTransform() : Matrix4 {
            this.validateProjectionTransform();

            return this.projectTransform;
        }

        protected inValidateProjectionTransform(): void {
            this.projectTransformValid = false;
        }

        protected validateProjectionTransform() {
            if (this.projectTransformValid)
                return;

            this.projectTransform = this.onValidateProjectionTransform();

            this.projectTransformValid = true;
        }

        protected isProjectionTransformValid() {
            return this.projectTransformValid;
        }

        protected onValidateProjectionTransform(): Matrix4 {
            return Matrix4.Identity;
        }
    }

    export namespace Camera {
        export enum ClearFlag {
            None = 0x00,
            Color = 0x01,
            Depth = 0x02,
            Stecil = 0x04,
            SkyBox = 0x08
        };
    }
};