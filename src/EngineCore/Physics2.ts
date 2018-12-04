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
    export class Physics2 {
        public constructor() {
        }

        public destructor() {
        }        
    }

    export namespace Physics2 {
        export class World {
            name: string;

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

        export class Rigidbody {
            name: string;

            public constructor() {
                var world = new World();
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

        export class Joint {
            name: string;

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
            private static instance: Physics2.Manager = null;

            private worlds : Array<Physics2.World>;
            private rigidbodies : Array<Physics2.Rigidbody>;
            private joints : Array<Physics2.Joint>;

            private constructor() {
                this.worlds = new Array<Physics2.World>();
                this.rigidbodies = new Array<Physics2.Rigidbody>();
                this.joints = new Array<Physics2.Joint>();                
            }

            public destructor() {
                this.joints = null;
                this.rigidbodies = null;
                this.worlds = null;                  
            }

            public static getInstance(): Physics2.Manager {
                if (Physics2.Manager.instance == null) {
                    Physics2.Manager.instance = new Physics2.Manager();
                }

                return Physics2.Manager.instance;
            }

            public addWorld(world: Physics2.World) {
                this.worlds.push(world);
            }

            public removeWorld(world: Physics2.World) {
                var idx = idx = this.worlds.indexOf(world);
                if (idx != -1)
                    this.worlds.splice(idx, 1);
            }

            public findWorld(name: string): Physics2.World {
                for (const world of this.worlds) {
                    if (world.Name == name) {
                        return world;
                    }
                }
                return null;
            }

            public addRigidbody(rigidbody: Physics2.Rigidbody) {
                this.rigidbodies.push(rigidbody);
            }

            public removeRigidbody(rigidbody: Physics2.Rigidbody) {
                var idx = idx = this.rigidbodies.indexOf(rigidbody);
                if (idx != -1)
                    this.rigidbodies.splice(idx, 1);
            }

            public findRigidbody(name: string): Physics2.Rigidbody {
                for (const rigidbody of this.rigidbodies) {
                    if (rigidbody.Name == name) {
                        return rigidbody;
                    }
                }
                return null;
            }

            public addJoint(joint: Physics2.Joint) {
                this.joints.push(joint);
            }

            public removeJoint(joint: Physics2.Joint) {
                var idx = idx = this.joints.indexOf(joint);
                if (idx != -1)
                    this.joints.splice(idx, 1);
            }

            public findJoint(name: string): Physics2.Joint {
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

        export class Service {
            static Name() : string
            {
                return "Physics2";
            }

            static initiate(): boolean {
                return Physics2.Manager.getInstance().initiate();
            }

            static update(): void {
                Physics2.Manager.getInstance().update();
            }

            static pause(): void {
                Physics2.Manager.getInstance().pause();
            }

            static resume(): void {
                Physics2.Manager.getInstance().resume();
            }

            static terminate(): void {
                Physics2.Manager.getInstance().terminate();
            }
        };
    }
}