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
/// <reference path = "Component.ts" /> 
/// <reference path = "Frame3.ts" /> 

namespace Magnum {
    export class GameObject extends Frame3 {
        private guid: number;
        private name: string;
        private tag: string;
        private layer: number;
        private active: boolean;
        private isstatic: boolean;
        private components: Array<Component>;

        private static selected: GameObject = null;

        public constructor() {
            super();

            this.guid = 0;
            this.name = "";
            this.tag = "";
            this.layer = 0;
            this.active = true;
            this.isstatic = true;
            this.components = new Array<Component>();

            //this.creator = null;
        }

        public destructor() {
        }

        static ClassName(): string {
            return "GameObject";
        }

        public static testJSON(jsonString: string): GameObject {
            var go = GameObject.Manager.getInstance().create("TestGameObject");
            var component1 = Component.Manager.getInstance().create(Component1, go, "TestComponent1");
            var component2 = Component.Manager.getInstance().create(Component1, go, "TestComponent1");

            go.addComponent(component1);
            go.addComponent(component2);

            Component.Manager.getInstance().release(component1);
            Component.Manager.getInstance().release(component2);
            GameObject.Manager.getInstance().release(go);

            //delete component1.gameObject; // remove cyclic dependence
            //delete component2.gameObject;

            var goJson = JSON.stringify(go);
            var goObj = JSON.parse(goJson);
            Console.debug(goJson);
            Console.debug(goObj);

            var component1Json = JSON.stringify(component1);
            var component1Obj = JSON.parse(component1Json);
            Console.debug(component1Json);
            Console.debug(component1Obj);

            var component2Json = JSON.stringify(component2);
            var component2Obj = JSON.parse(component2Json);
            Console.debug(component2Json);
            Console.debug(component2Obj);

            return go;
        }

        set Name(value) {
            this.name = value;
        }

        get Name() {
            return this.name;
        }

        set Tag(value) {
            this.tag = value;
        }

        get Tag() {
            return this.tag;
        }

        set Layer(value) {
            this.layer = value;
        }

        get Layer() {
            return this.layer;
        }

        set Active(value) {
            this.active = value;
        }

        get Active() {
            return this.active;
        }

        set Static(value) {
            this.isstatic = value;
        }

        get Static() {
            return this.isstatic;
        }

        get GUID() {
            return this.guid;
        }

        public getNumComponents(): number {
            return this.components.length;
        }

        public getComponent(i: number): Component {
            return this.components[i];
        }

        public addComponent(component: Component): void {
            if (this.components.indexOf(component) == -1)
                this.components.push(component);
        }

        public removeComponent(component: Component): void {
            var idx = this.components.indexOf(component);
            if (idx != -1)
                this.components.splice(idx, 1);
        }

        public getComponentByName(name: string): Component {
            for (const component of this.components) {
                if (component.Name == name) {
                    return component;
                }
            }

            return null;
        }

        public select(): void {
            GameObject.selected = this;
        }

        public unselect(): void {
            if (GameObject.selected == this)
                GameObject.selected = null;
        }

        public isSelected(): boolean {
            return GameObject.selected == this;
        }

        public static getSelected(): GameObject {
            return GameObject.selected;
        }

        public construct(): boolean {
            for (const component of this.components) {
                if (!component.construct())
                    return false;
            }

            return this.onConstruct();
        }

        public start(): void {
            for (const component of this.components) {
                component.start();
            }

            this.onStart();
        }

        update(): void {
            for (const component of this.components) {
                component.update();
            }

            this.onUpdate();
        }

        pause(): void {
            for (const component of this.components) {
                component.pause();
            }

            this.onPause();
        }

        resume(): void {
            for (const component of this.components) {
                component.resume();
            }

            this.onResume();
        }

        stop(): void {
            this.onStop();

            for (const component of this.components) {
                component.stop();
            }
        }

        destruct(): void {
            this.onDestruct();

            for (const component of this.components) {
                component.destruct();
            }
        }

        debugRender(): void {
            this.onDebugRender();

            for (const component of this.components) {
                component.debugRender();
            }
        }

        protected onConstruct(): boolean {
            return true;
        }

        onStart(): void {
        }

        onUpdate(): void {
        }

        onPause(): void {
        }

        onResume(): void {
        }

        protected onStop(): void {
        }

        protected onDestruct(): void {
        }

        protected onDebugRender(): void {
        }

        public static findGameObjectByName(name: string, className: string = "GameObject"): GameObject {
            return GameObject.Manager.getInstance().findGameObjectByName(name, className);
        }

        public static findGameObjectByTag(tag: string, className: string = "GameObject"): GameObject {
            return GameObject.Manager.getInstance().findGameObjectByTag(name, className);
        }

        public static findGameObjectByGUID(guid: number, className: string = "GameObject"): GameObject {
            return GameObject.Manager.getInstance().findGameObjectByGUID(guid, className);
        }
    }

    export namespace GameObject {
        export class ICreator {
            protected activeGameObjects: Array<GameObject>;
            protected inactiveGameObjects: Array<GameObject>;

            constructor() {
                this.activeGameObjects = new Array<GameObject>();
                this.inactiveGameObjects = new Array<GameObject>();
            }

            public destructor() {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    this.activeGameObjects[i].destructor();
                    this.activeGameObjects[i] = null;
                }
                this.activeGameObjects = null;

                for (var i = 0; i < this.inactiveGameObjects.length; i++) {
                    this.inactiveGameObjects[i].destructor();
                    this.inactiveGameObjects[i] = null;
                }
                this.inactiveGameObjects = null;
            }

            public ClassName(): string {
                return "";
            }

            public create<T extends GameObject>(name: string): T {
                return null;
            }

            public release(gameObject: GameObject): boolean {
                return true;
            }

            public contains(gameObject: GameObject): boolean {
                return this.activeGameObjects.indexOf(gameObject) != -1;
            }

            public getGameObjectsCount(): number {
                return this.activeGameObjects.length;
            }

            public getGameObject(i: number): GameObject {
                return this.activeGameObjects[i];
            }

            protected deleteActiveGameObjects(): void {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    this.activeGameObjects[i].destructor();
                    this.activeGameObjects[i] = null;
                }

                this.activeGameObjects = new Array<GameObject>();
            }

            protected deleteInActiveGameObjects(): void {
                for (var i = 0; i < this.inactiveGameObjects.length; i++) {
                    this.inactiveGameObjects[i].destructor();
                    this.inactiveGameObjects[i] = null;
                }

                this.inactiveGameObjects = new Array<GameObject>();
            }

            public findGameObjectByName(name: string): GameObject {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].Name == name)
                        return this.activeGameObjects[i];
                }

                return null;
            }

            public findGameObjectByTag(tag: string): GameObject {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].Tag == tag)
                        return this.activeGameObjects[i];
                }

                return null;
            }

            public findGameObjectByGUID(guid: number): GameObject {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].GUID == guid)
                        return this.activeGameObjects[i];
                }

                return null;
            }

            public recycle() {
                this.deleteInActiveGameObjects();
            }

            public update(): void {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.update();
                }
            }

            public pause(): void {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.pause();
                }

                for (const inactiveGameObject of this.inactiveGameObjects) {
                    inactiveGameObject.pause();
                }
            }

            public resume(): void {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.resume();
                }

                for (const inactiveGameObject of this.inactiveGameObjects) {
                    inactiveGameObject.resume();
                }
            }

            public clear(): void {
                this.deleteActiveGameObjects();
                this.deleteInActiveGameObjects();
            }
        };

        //////////////////////////////////////////////////////////////////////////////////////
        interface GameObjectClassInterface<T extends GameObject> {
            new(): T;
            ClassName(): string;
        }

        export class Creator<T extends GameObject> extends ICreator {
            private gameObjectClassInterface: GameObjectClassInterface<T>;

            public constructor(gameObjectClassInterface: GameObjectClassInterface<T>) {
                super();

                this.gameObjectClassInterface = gameObjectClassInterface;
            }

            public destructor() {
                super.destructor();
            }

            public ClassName(): string {
                return this.gameObjectClassInterface.ClassName();
            }

            public create<T extends GameObject>(name: string): T {
                var gameObject;

                gameObject = new this.gameObjectClassInterface();
                if (gameObject == null)
                    return null;

                gameObject.guid = GameObject.Manager.getInstance().getNextUniqueID();
                gameObject.Name = name;
                if (!gameObject.construct())
                    return null;

                gameObject.start();

                this.activeGameObjects.push(gameObject);

                return gameObject;
            }

            public release(gameObject: GameObject): boolean {
                if (!this.contains(gameObject))
                    return false;

                gameObject.unselect();

                gameObject.stop();

                gameObject.destruct();

                var idx = this.activeGameObjects.indexOf(gameObject);
                this.inactiveGameObjects.push(this.activeGameObjects[idx]);
                this.activeGameObjects.splice(idx, 1);

                return true;
            }
        };

        export class Manager {
            private static instance: Manager = null;
            private creators: Array<ICreator>;
            private nextGUID: number;

            private constructor() {
                this.creators = new Array<ICreator>();
                this.nextGUID = 1;
            }

            public destructor() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }

                this.creators = null;
            }

            public static getInstance(): GameObject.Manager {
                if (GameObject.Manager.instance == null) {
                    GameObject.Manager.instance = new Manager();
                }
                return GameObject.Manager.instance;
            }

            public register<T extends GameObject>(gameObjectClassInterface: GameObjectClassInterface<T>) {
                this.creators.push(new GameObject.Creator(gameObjectClassInterface));
            }

            public update(): void {
                for (const creator of this.creators) {
                    creator.update();
                }

                for (const creator of this.creators) {
                    creator.recycle();
                }
            }

            public pause(): void {
                for (const creator of this.creators) {
                    creator.pause();
                }
            }

            public resume(): void {
                for (const creator of this.creators) {
                    creator.resume();
                }
            }

            public clear(): void {
                this.nextGUID = 1;
                for (const creator of this.creators) {
                    creator.clear();
                }
            }

            ////////////////////////////////////////////////////////////////////
            public getNextUniqueID(): number {
                var rval = this.nextGUID;
                this.nextGUID = this.nextGUID + 1;
                return rval;
            }

            public findGameObjectByName(name: string, className: string) {
                if (className != undefined) {
                    var creator = this.findCreator(className);
                    if (creator != null)
                        return creator.findGameObjectByName(name);
                    else
                        return null;
                }
                else {
                    for (const creator of this.creators) {
                        var gameObject = creator.findGameObjectByName(name);
                        if (gameObject != null)
                            return gameObject;
                    }
                    return null;
                }
            }

            public findGameObjectByTag(name: string, className: string) {
                if (className != undefined) {
                    var creator = this.findCreator(className);
                    if (creator != null)
                        return creator.findGameObjectByTag(name);
                    else
                        return null;
                }
                else {
                    for (const creator of this.creators) {
                        var gameObject = creator.findGameObjectByTag(name);
                        if (gameObject != null)
                            return gameObject;
                    }
                    return null;
                }
            }

            public findGameObjectByGUID(guid: number, className: string) {
                if (className != undefined) {
                    var creator = this.findCreator(className);
                    if (creator != null)
                        return creator.findGameObjectByGUID(guid);
                    else
                        return null;
                }
                else {
                    for (const creator of this.creators) {
                        var gameObject = creator.findGameObjectByGUID(guid);
                        if (gameObject != null)
                            return gameObject;
                    }
                    return null;
                }
            }

            public create<T extends GameObject>(name: string, gameObjectClassInterface?: GameObjectClassInterface<T>, ): T {
                var creator;
                if (gameObjectClassInterface == undefined) {
                    creator = this.findCreator(GameObject.ClassName());
                    if (creator == null)
                        return null;
                }
                else {
                    creator = this.findCreator(gameObjectClassInterface.ClassName());
                    if (creator == null)
                        return null;
                }

                return creator.create(name);
            }

            public release(gameObject: GameObject): boolean {
                var creator = this.findCreatorByGameObject(gameObject);
                if (creator == null)
                    return false;

                creator.release(gameObject);
                return true;
            }

            /*
            public createCore(name: string, className: string): GameObject {
                var creator = this.findCreator(className);
                if (creator == null)
                    return null;

                return creator.create(name);
            }

            public releaseCore(gameObject: GameObject): boolean {
                var creator = this.findCreatorByGameObject(gameObject);
                if (creator == null)
                    return false;

                creator.release(gameObject);
                return true;
            }
            */

            public getCreatorsCount(): number {
                return this.creators.length;
            }

            public getCreator(i: number): ICreator {
                return this.creators[i];
            }

            public findCreatorByGameObject(gameObject: GameObject): ICreator {
                for (const creator of this.creators) {
                    if (creator.contains(gameObject))
                        return creator;
                }

                return null;
            }

            public findCreator(className: string): ICreator {
                for (const creator of this.creators) {
                    if (creator.ClassName() == className)
                        return creator;
                }

                return null;
            }
        };
    }
}