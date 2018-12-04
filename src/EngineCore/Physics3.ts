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

/// <reference path = "Service.ts" /> 
/// <reference path = "Stack.ts" /> 

namespace Magnum {
    export class Physics3 {
        public constructor() {
        }

        public destructor() {
        }            
    }

    export namespace Physics3 {
        export class World
        {
            private name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class Rigidbody
        {
            name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class Joint
        {
            name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class Manager {
            private static instance: Physics3.Manager = null;
            private worlds : Array<Physics3.World>;
            private rigidbodies : Array<Physics3.Rigidbody>;
            private joints : Array<Physics3.Joint>;

            private constructor() {
                this.worlds = new Array<Physics3.World>();
                this.rigidbodies = new Array<Physics3.Rigidbody>();
                this.joints = new Array<Physics3.Joint>();                
            }

            public destructor() {
                this.worlds = null;
                this.rigidbodies = null;
                this.joints = null;
            }        

            public static getInstance(): Physics3.Manager {
                if (Physics3.Manager.instance == null) {
                    Physics3.Manager.instance = new Physics3.Manager();
                }

                return Physics3.Manager.instance;
            }

            public addWorld(world: Physics3.World) {
                this.worlds.push(world);
            }

            public removeWorld(world: Physics3.World) {
                var idx = idx = this.worlds.indexOf(world);
                if (idx != -1)
                    this.worlds.splice(idx, 1);
            }

            public findWorld(name: string): Physics3.World {
                for (const world of this.worlds) {
                    if (world.Name == name) {
                        return world;
                    }
                }
                return null;
            }

            public addRigidbody(rigidbody: Physics3.Rigidbody) {
                this.rigidbodies.push(rigidbody);
            }

            public removeRigidbody(rigidbody: Physics3.Rigidbody) {
                var idx = idx = this.rigidbodies.indexOf(rigidbody);
                if (idx != -1)
                    this.rigidbodies.splice(idx, 1);
            }

            public findRigidbody(name: string): Physics3.Rigidbody {
                for (const rigidbody of this.rigidbodies) {
                    if (rigidbody.Name == name) {
                        return rigidbody;
                    }
                }
                return null;
            }

            public addJoint(joint: Physics3.Joint) {
                this.joints.push(joint);
            }

            public removeJoint(joint: Physics3.Joint) {
                var idx = idx = this.joints.indexOf(joint);
                if (idx != -1)
                    this.joints.splice(idx, 1);
            }

            public findJoint(name: string): Physics3.Joint {
                for (const joint of this.joints) {
                    if (joint.Name == name) {
                        return joint;
                    }
                }
                return null;
            }

            public initiate(): boolean {
                return true;
            }

            public update(): void {
                for (const world of this.worlds) {
                    world.update();
                }

                for (const rigidbody of this.rigidbodies) {
                    rigidbody.update();
                }

                for (const joint of this.joints) {
                    joint.update();
                }
            }

            public pause(): void {
                for (const world of this.worlds) {
                    world.pause();
                }

                for (const rigidbody of this.rigidbodies) {
                    rigidbody.pause();
                }

                for (const joint of this.joints) {
                    joint.pause();
                }
            }

            public resume(): void {
                for (const world of this.worlds) {
                    world.resume();
                }

                for (const rigidbody of this.rigidbodies) {
                    rigidbody.resume();
                }

                for (const joint of this.joints) {
                    joint.resume();
                }
            }

            public terminate(): void {
                this.rigidbodies = [];
                this.joints = [];
                this.worlds = [];
            }
        }

        export class Service
        {
            static Name() : string
            {
                return "Physics3";
            }

            static initiate(): boolean {
                return Physics3.Manager.getInstance().initiate();
            }

            static update(): void {
                Physics3.Manager.getInstance().update();
            }

            static pause(): void {
                Physics3.Manager.getInstance().pause();
            }

            static resume(): void {
                Physics3.Manager.getInstance().resume();
            }

            static terminate(): void {
                Physics3.Manager.getInstance().terminate();
            }
        };
    }
}