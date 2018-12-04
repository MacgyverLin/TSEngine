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
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Matrix4.ts" /> 

namespace Magnum {
    export class Frame3 {
        private parent: Frame3;
        private children: Array<Frame3>;

        private localTransform: Matrix4;
        private globalTransform: Matrix4;
        private validGlobal: boolean;

        constructor() {
            this.parent = null;
            this.children = new Array<Frame3>();
    
            this.localTransform = new Matrix4();
            this.localTransform.initIdentity();
            this.globalTransform = new Matrix4();
            this.globalTransform.initIdentity();
            this.validGlobal = true;            
        }

        destructor(): void {
        }

        initZero(): void {
            this.localTransform.initZero();
            this.inValidateGlobal();
        }

        initIdentity(): void {
            this.localTransform.initIdentity();
            this.inValidateGlobal();
        }

        public initTranslate(x: number, y: number, z: number): void {
            this.localTransform.initTranslate(x, y, z);

            this.inValidateGlobal();
        }

        public initRotateX(angle: number): void {
            this.localTransform.initRotateX(angle);

            this.inValidateGlobal();
        }

        public initRotateY(angle: number): void {
            this.localTransform.initRotateY(angle);

            this.inValidateGlobal();
        }

        public initRotateZ(angle: number): void {
            this.localTransform.initRotateZ(angle);

            this.inValidateGlobal();
        }

        public initRotateZXY(z: number, x: number, y: number): void {
            this.localTransform.initRotateZXY(z, x, y);

            this.inValidateGlobal();
        }

        public initRotateZYX(z: number, y: number, x: number): void {
            this.localTransform.initRotateZYX(z, y, x);

            this.inValidateGlobal();
        }

        public initRotateAxisAngle(axis: Vector3, angle: number): void {
            this.localTransform.initRotateAxisAngle(axis, angle);

            this.inValidateGlobal();
        }

        public initScale(x: number, y: number, z: number): void {
            this.localTransform.initScale(x, y, z);

            this.inValidateGlobal();
        }

        public initTranslateRotZXYScale(tx: number, ty: number, tz: number, rz: number, rx: number, ry: number, scale: number): void {
            this.localTransform.initTranslateRotZXYScale(tx, ty, tz, rz, rx, ry, scale);

            this.inValidateGlobal();
        }

        public initTranslateRotZYXScale(tx: number, ty: number, tz: number, rz: number, ry: number, rx: number, scale: number): void {
            this.localTransform.initTranslateRotZYXScale(tx, ty, tz, rz, ry, rx, scale);

            this.inValidateGlobal();
        }

        public initTranslateRotAxisAngleScale(tx: number, ty: number, tz: number, axis: Vector3, angle: number, scale: number): void {
            this.localTransform.initTranslateRotAxisAngleScale(tx, ty, tz, axis, angle, scale);

            this.inValidateGlobal();
        }

        public initTranslateScale(tx: number, ty: number, tz: number, scale: number): void {
            this.localTransform.initTranslateScale(tx, ty, tz, scale);

            this.inValidateGlobal();
        }

        public initLookAt(position: Vector3, object: Vector3, upward: Vector3): void {
            this.localTransform.initLookAt(position, object, upward);

            this.inValidateGlobal();
        }

        public initLookAtScale(position: Vector3, object: Vector3, upward: Vector3, scale: number): void {
            this.localTransform.initLookAtScale(position, object, upward, scale);

            this.inValidateGlobal();
        }

        public initStandOn(position: Vector3, object: Vector3, upward: Vector3): void {
            this.localTransform.initStandOn(position, object, upward);

            this.inValidateGlobal();
        }

        public initStandOnScale(position: Vector3, object: Vector3, upward: Vector3, scale: number): void {
            this.localTransform.initStandOnScale(position, object, upward, scale);

            this.inValidateGlobal();
        }

        // setter
        public setLocalTransform(localtransform: Matrix4): void {
            this.localTransform = localtransform;

            this.inValidateGlobal();
        }

        public setLocalPosition(localposition: Vector3): void {
            this.localTransform.setTranslate(localposition);

            this.inValidateGlobal();
        }

        public setGlobalTransform(globalTransform: Matrix4): void {
            if (this.getParent())
                this.localTransform = Matrix4.mul(this.getParent().getGlobalTransform().inverse(), this.globalTransform);
            else
                this.localTransform = globalTransform;

            this.inValidateGlobal();
        }

        public setGlobalPosition(globalposition: Vector3): void {
            //validateGlobal(); // can remove ?, yes can

            var localposition;
            if (this.getParent())
                localposition = this.getParent().getGlobalTransform().inverse().mulVector3(globalposition);
            else
                localposition = globalposition;

            this.localTransform.setTranslate(localposition);

            this.inValidateGlobal();
        }

        // getter
        public getLocalTransform(): Matrix4 {
            return this.localTransform;
        }

        public getLocalPosition(): Vector3 {
            return this.localTransform.getTranslate();
        }

        public getLocalXAxis(): Vector3 {
            return this.localTransform.getXAxis();
        }

        public getLocalYAxis(): Vector3 {
            return this.localTransform.getYAxis();
        }

        public getLocalZAxis(): Vector3 {
            return this.localTransform.getZAxis();
        }

        public getGlobalTransform(): Matrix4 {
            this.validateGlobal();

            return this.globalTransform;
        }

        public getGlobalPosition(): Vector3 {
            this.validateGlobal();

            return this.globalTransform.getTranslate();
        }

        public getGlobalXAxis(): Vector3 {
            this.validateGlobal();

            return this.globalTransform.getXAxis();
        }

        public getGlobalYAxis(): Vector3 {
            this.validateGlobal();

            return this.globalTransform.getYAxis();
        }

        public getGlobalZAxis(): Vector3 {
            this.validateGlobal();

            return this.globalTransform.getZAxis();
        }

        public getGlobalTransformInverse(): Matrix4 {
            this.validateGlobal();

            return this.globalTransform.inverse();
        }

        public getParentGlobalTransform(): Matrix4 {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform();
            }
            else
                return Matrix4.Identity;
        }

        public getParentGlobalPosition(): Vector3 {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getTranslate();
            }
            else
                return Vector3.Zero;
        }

        public getParentGlobalXAxis(): Vector3 {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getXAxis();
            }
            else
                return Vector3.UnitX;
        }

        public getParentGlobalYAxis(): Vector3 {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getYAxis();
            }
            else
                return Vector3.UnitY;
        }


        public getParentGlobalZAxis(): Vector3 {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getZAxis();
            }
            else
                return Vector3.UnitZ;
        }

        // setter
        public addChild(child: Frame3): void 
        {
            Console.assert(child.getParent() == null); // not child already
                
            this.children.push(child);
            child.parent  = this;
            child.inValidateGlobal();
        }

        public setChild(child: Frame3, index: number): void
        {
            Console.assert( child.getParent() == null ); // not child already
            Console.assert( index>=0 && index < this.children.length ); // index in range
        
            this.removeChild(child);
        
            this.insertChild(child, index);
        }
        
        public insertChild(child: Frame3, index: number): void
        {
            Console.assert( child.getParent() == null ); // not child already

            this.children.splice(index, 0, child);
            
            child.parent  = this;
            child.inValidateGlobal();
        }

        public removeAllChildren(): void 
        {
            while(this.children.length>0)
            {
                this.removeChild(this.children[0]);
            };
        }

        public removeChild(child: Frame3): void 
        {
            var idx = this.children.indexOf(child);
            if(idx!=-1)
            {
                child.parent  = null;
                child.inValidateGlobal();
                //child_->inValidateGlobalInverse();
        
                this.children.splice(idx, 1);
            }            
        }

        // getter
        public getAllChildren(children: Array<Frame3>): number 
        {
            children = this.children;

            return children.length;
        }

        public getChild(index: number): Frame3 
        {
            Console.assert( index>=0 && index<this.children.length );

            return this.children[index];
        }

        public indexOfChild(child: Frame3): number 
        {
            return this.children.indexOf(child);
        }

        public getNumChildren(): number 
        {
            return this.children.length;
        }
        
        public getParent(): Frame3 
        {
            return this.parent;
        }

        protected validateGlobal(): void {
            if (this.validGlobal)
                return;

            this.globalTransform = Matrix4.mul(this.getParentGlobalTransform(), this.localTransform);

            this.validGlobal = true;
        }

        protected inValidateGlobal(): void {
            this.validGlobal = false;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].inValidateGlobal();
            }
        }

        protected isValidGlobal(): boolean {
            return this.validGlobal;
        }
    };

    export namespace Frame3 {
    };
};