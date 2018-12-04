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
    export class Scene {
        public constructor() 
        {
        }

        public destructor() {
        }

        protected onConstruct(): boolean				//	called after all constructors
        {
            return true;
        }

        protected onEnter(): void				//	called after all constructors
        {
        }

        protected onUpdate(): void				//	called after all constructors
        {
        }

        protected onPause(): void				//	called after all constructors
        {
        }

        protected onResume(): void				//	called after all constructors
        {
        }

        protected onExit(): void				//	called after all constructors
        {
        }

        protected onDestruct(): void				//	called after all constructors
        {
        }

        construct(): boolean				//	called after all constructors
        {
            return this.onConstruct();
        }

        enter(): void				//	called after all constructors
        {
            this.onEnter();
        }

        update(): void				//	called after all constructors
        {
            this.onUpdate();
        }

        pause(): void				//	called after all constructors
        {
            this.onPause();
        }

        resume(): void				//	called after all constructors
        {
            this.onResume();
        }

        exit(): void				//	called after all constructors
        {
            this.onExit();
        }

        destruct(): void				//	called after all constructors
        {
            this.onDestruct();
        }

        public isCurrent(): boolean			//	returns true if name matches (ignore case) current scene 
        {
            return Scene.Manager.getInstance().isCurrent(this);
        }

        public static goto(name: string): boolean {
            return Scene.Manager.getInstance().goto(name);
        }

        public static call(name: string): boolean {
            return Scene.Manager.getInstance().call(name);
        }

        public static return(): boolean {
            return Scene.Manager.getInstance().return();
        }

        public static getPreviousSceneName(): string {
            return Scene.Manager.getInstance().getPreviousSceneName();
        }
    }

    export namespace Scene {
        export interface SceneInterface<T extends Scene> {
            new(): T;

            Name() : string;
            goto(name: string): boolean;
            call(name: string): boolean;
            return(): boolean;
        }

        export class ICreator {
            public constructor() {
            }

            public destructor()
            {
            }

            public Name() : string
            {
                return "";
            }            

            public create() {
                return null;
            }
        };

        export class Creator<T extends Scene> extends ICreator {
            private sceneInterface: SceneInterface<T>;

            public constructor(sceneInterface: SceneInterface<T>) {
                super();

                this.sceneInterface = sceneInterface;
            }

            public destructor()
            {
                super.destructor();
            }            

            public Name() : string
            {
                return this.sceneInterface.Name();
            }

            public create() {
                return new this.sceneInterface();
            }
        };

        enum Command {
            Update = 0,
            Goto,
            Call,
            Return,
        };

        /**
         * @brief This is the Scene Factor
         */
        export class Manager {
            private static instance: Manager = null;
            private creators : Array<ICreator>;
            private creatorsStack : Stack<ICreator>;

            private currentScene: Scene;
            private nextCommand: Command;
            private nextSceneName: string;
            private previousSceneName: string;

            private constructor() {
                this.creators = new Array<ICreator>();
                this.creatorsStack = new Stack<ICreator>();
                
                this.currentScene = null;
                this.nextCommand = Command.Update;
                this.nextSceneName = "";
                this.previousSceneName = "";
            }

            public destructor() {
                this.previousSceneName = "";    
                this.nextSceneName = "";
                this.nextCommand = Command.Update;

                if(this.currentScene)
                {
                    this.currentScene.destructor();
                    this.currentScene = null;
                }

                this.creatorsStack = null;
                                
                for (var i=0; i<this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }
                this.creators = null;
            }

            public static getInstance(): Scene.Manager {
                if (Scene.Manager.instance == null) {
                    Scene.Manager.instance = new Scene.Manager();
                }
                return Scene.Manager.instance;
            }

            public register<T extends Scene>(sceneInterface: SceneInterface<T>)
            {
                this.creators.push(new Scene.Creator(sceneInterface));
            }

            public find(nextSceneName: string): ICreator {
                for (const creator of this.creators) {
                    if (creator.Name() == nextSceneName) {
                        return creator;
                    }
                }
                return null;
            }

            protected create(nextSceneName: string): Scene {
                var sceneCreator = this.find(this.nextSceneName);
                if (sceneCreator == null)
                    return null;

                return sceneCreator.create();
            }

            public isCurrent(scene: Scene): boolean			//	returns true if name matches (ignore case) current scene 
            {
                return this.currentScene == scene;
            }

            public goto(nextSceneName: string) {
                var nextSceneCreator = this.find(nextSceneName);
                if (nextSceneCreator == null) {
                    Console.debug("Scene " + nextSceneName + " not available, Cannot goto Scene");
                    return false;
                }

                this.nextSceneName = nextSceneName;
                this.nextCommand = Command.Goto;

                return true;
            }

            public call(nextSceneName: string) {
                var nextSceneCreator = this.find(nextSceneName);
                if (nextSceneCreator == null) {
                    Console.debug("Scene " + nextSceneName + " not available, Cannot push Scene");
                    return false;
                }

                this.nextSceneName = nextSceneName;
                this.nextCommand = Command.Call;

                return true;
            }

            public return() {
                if (this.creatorsStack.empty()) {
                    Console.debug("Scene Stack Empty, Cannot pop Scene");
                    return false;
                }

                this.nextSceneName = "";
                this.nextCommand = Command.Return;

                return true;
            }

            public getPreviousSceneName(): string {
                return this.previousSceneName;
            }

            public initiate(): boolean {
                return true;
            }

            public update(): void {
                var nextSceneName = this.nextSceneName;
                var nextCommand = this.nextCommand;

                switch (nextCommand) {
                    case Command.Update:
                        if (this.currentScene) {
                            this.currentScene.update();
                        }
                        break;

                    case Command.Goto:
                        if (this.currentScene) {
                            this.currentScene.exit();
                            this.currentScene.destruct();
                            this.currentScene = null;

                            var previousCreator = this.creatorsStack.pop();
                            this.previousSceneName = previousCreator.Name();
                        }

                        var nextSceneCreator = this.find(nextSceneName);
                        this.currentScene = nextSceneCreator.create();
                        if (this.currentScene) {
                            if (this.currentScene.construct()) {
                                this.currentScene.enter();
                                this.creatorsStack.push(nextSceneCreator);
                            }
                            else {
                                Console.error("currentScene.construct() return false");
                            }
                        }

                        this.nextCommand = Command.Update;

                        break;

                    case Command.Call:
                        var nextSceneName = this.nextSceneName;

                        if (this.currentScene) {
                            this.currentScene.exit();
                            this.currentScene.destruct();
                            this.currentScene = null;

                            var previousCreator = this.creatorsStack.top();
                            this.previousSceneName = previousCreator.Name();
                        }

                        var nextSceneCreator = this.find(nextSceneName);
                        this.currentScene = nextSceneCreator.create();
                        if (this.currentScene) {
                            if (this.currentScene.construct()) {
                                this.currentScene.enter();
                                this.creatorsStack.push(nextSceneCreator);
                            }
                            else {
                                Console.error("currentScene.construct() return false");
                            }
                        }

                        this.nextCommand = Command.Update;

                        break;

                    case Command.Return:
                        if (this.currentScene) {
                            this.currentScene.exit();
                            this.currentScene.destruct();
                            this.currentScene = null;

                            var previousCreator = this.creatorsStack.pop();
                            this.previousSceneName = previousCreator.Name();
                        }

                        var nextSceneCreator = this.creatorsStack.pop();
                        this.currentScene = nextSceneCreator.create();
                        if (this.currentScene) {
                            if (this.currentScene.construct()) {
                                this.currentScene.enter();
                                this.creatorsStack.push(nextSceneCreator);
                            }
                            else {
                                Console.error("currentScene.construct() return false");
                            }
                        }

                        this.nextCommand = Command.Update;

                        break;
                };
            }

            public pause(): void {
                if (this.currentScene) {
                    this.currentScene.pause();
                }
            }

            public resume(): void {
                if (this.currentScene) {
                    this.currentScene.resume();
                }
            }

            public terminate(): void {
                if (this.currentScene) {
                    this.currentScene.exit();
                    this.currentScene.destruct();

                    this.currentScene = null;
                }
            }
        }

        export class Service {
            static Name() : string
            {
                return "Scene";
            }

            static initiate(): boolean {
                return Scene.Manager.getInstance().initiate();
            }

            static update(): void {
                Scene.Manager.getInstance().update();
            }

            static pause(): void {
                Scene.Manager.getInstance().pause();
            }

            static resume(): void {
                Scene.Manager.getInstance().resume();
            }

            static terminate(): void {
                Scene.Manager.getInstance().terminate();
            }
        };
    }
}