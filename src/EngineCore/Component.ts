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
    export class Component {
        private guid: number;
        private name: string;
        private active: boolean;

        private static selected: Component = null;
        private gameObject: GameObject = null;

        public constructor(gameObject: GameObject) {
            this.guid = 0;
            this.name = "";
            this.active = true;
            this.gameObject = gameObject;
            this.gameObject.addComponent(this);
        }

        public destructor() {
        }

        get GUID() {
            return this.guid;
        }

        set Name(value) {
            this.name = value;
        }

        get Name() {
            return this.name;
        }

        set Active(value) {
            this.active = value;
        }

        get Active() {
            return this.active;
        }

        get GameObject() {
            return this.gameObject;
        }

        public construct(): boolean {
            return this.onConstruct();
        }

        public start() {
            this.onStart();
        }

        public update() {
            this.onUpdate();
        }

        public pause() {
            this.onPause();
        }

        public resume() {
            this.onResume();
        }

        public stop() {
            this.onStop();
        }

        public destruct() {
            this.onDestruct();
        }

        public debugRender() {
            this.onDebugRender();
        }

        public onConstruct(): boolean {
            return true;
        }

        public onStart(): void {
        }

        public onUpdate(): void {
        }

        public onPause(): void {
        }

        public onResume(): void {
        }

        public onStop(): void {
        }

        public onDestruct(): void {
        }

        public onDebugRender(): void {
        }

        public static findComponentByName(name: string, className): Component {
            return Component.Manager.getInstance().findComponentByName(name, className);
        }

        public static findComponentByGUID(guid: number, className): Component {
            return Component.Manager.getInstance().findComponentByGUID(guid, className);
        }

        public select(): void {
            Component.selected = this;
        }

        public unselect(): void {
            if (Component.selected == this) {
                Component.selected = this;
            }
        }

        public isSelected(): boolean {
            return Component.selected == this;
        }

        public static getSelected(): Component {
            return Component.selected;
        }
    };

    export namespace Component {
        interface ComponentClassInterface<T extends Component> {
            new(gameObject: GameObject): T;
            ClassName(): string;
        }

        export class ICreator {
            protected activeComponents: Array<Component>;
            protected inactiveComponents: Array<Component>;

            constructor() {
                this.activeComponents = new Array<Component>();
                this.inactiveComponents = new Array<Component>();
            }

            public destructor() {
            }

            ClassName(): string {
                return "";
            }

            public create<T extends Component>(gameObject: GameObject, name: string): T {
                return null;
            }

            public release(component: Component): boolean {
                return true;
            }

            public contains(component: Component): boolean {
                return this.activeComponents.indexOf(component) != -1;
            }

            public getComponentsCount(): number {
                return this.activeComponents.length;
            }

            public getComponent(i: number): Component {
                return this.activeComponents[i];
            }

            protected deleteActiveComponents(): void {
                this.activeComponents = [];
            }

            protected deleteInActiveComponents(): void {
                this.inactiveComponents = [];
            }

            public findComponentByName(name: string): Component {
                for (const component of this.activeComponents) {
                    if (component.Name == name)
                        return component;
                }

                return null;
            }

            public findComponentByGUID(guid: number): Component {
                for (const component of this.activeComponents) {
                    if (component.GUID == guid)
                        return component;
                }

                return null;
            }

            public recycle() {
                this.deleteInActiveComponents();
            }

            public update(): void {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.update();
                //}
            }

            public pause(): void {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.pause();
                //}

                //for (const activeComponent of this.activeComponents) {
                //activeComponent.pause();
                //}
            }

            public resume(): void {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.resume();
                //}

                //for (const activeComponent of this.activeComponents) {
                //activeComponent.resume();
                //}
            }

            public clear(): void {
                this.deleteActiveComponents();
                this.deleteInActiveComponents();
            }
        };

        //////////////////////////////////////////////////////////////////////////////////////
        export class Creator<T extends Component> extends ICreator {
            private componentClassInterface: ComponentClassInterface<T>;

            public constructor(componentClassInterface: ComponentClassInterface<T>) {
                super();

                this.componentClassInterface = componentClassInterface;
            }

            public destructor() {
            }

            ClassName(): string {
                return this.componentClassInterface.ClassName();
            }

            public create<T extends Component>(gameObject: GameObject, name: string): T {
                var component;
                component = new this.componentClassInterface(gameObject);
                if (component == null)
                    return null;

                component.guid = Component.Manager.getInstance().getNextUniqueID();
                component.Name = name;
                if (!component.construct())
                    return null;

                component.start();

                this.activeComponents.push(component);

                return component;
            }

            public release(component: Component): boolean {
                if (!this.contains(component))
                    return false;

                component.unselect();

                component.stop();

                component.destruct();

                var idx = this.activeComponents.indexOf(component);
                this.inactiveComponents.push(this.activeComponents[idx]);
                this.activeComponents.splice(idx, 1);

                return true;
            }
        };

        export class Manager {
            private static instance: Component.Manager = null;
            private creators: Array<ICreator>;
            private nextGUID: number;

            private constructor() {
                this.creators = new Array<ICreator>();
                this.nextGUID = 1;
            }

            public destructor() {
            }

            public static getInstance(): Component.Manager {
                if (Component.Manager.instance == null) {
                    Component.Manager.instance = new Component.Manager();
                }
                return Component.Manager.instance;
            }

            public register<T extends Component>(componentClassInterface: ComponentClassInterface<T>) {
                this.creators.push(new Component.Creator(componentClassInterface));
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
                return this.nextGUID++;
            }

            public findComponentByName(name: string, className: string) {
                if (className != undefined) {
                    var creator = this.findCreator(className);
                    if (creator != null)
                        return creator.findComponentByName(name);
                    else
                        return null;
                }
                else {
                    for (const creator of this.creators) {
                        var gameObject = creator.findComponentByName(name);
                        if (gameObject != null)
                            return gameObject;
                    }
                    return null;
                }
            }

            public findComponentByGUID(guid: number, className: string) {
                if (className != undefined) {
                    var creator = this.findCreator(className);
                    if (creator != null)
                        return creator.findComponentByGUID(guid);
                    else
                        return null;
                }
                else {
                    for (const creator of this.creators) {
                        var gameObject = creator.findComponentByGUID(guid);
                        if (gameObject != null)
                            return gameObject;
                    }
                    return null;
                }
            }

            public create<T extends Component>(componentClassInterface: ComponentClassInterface<T>, gameObject: GameObject, name: string): T {
                var creator = this.findCreator(componentClassInterface.ClassName());
                if (creator == null)
                    return null;

                return creator.create(gameObject, name);
            }

            public release(component: Component): boolean {
                var creator = this.findCreatorByComponent(component);
                if (creator == null)
                    return false;

                creator.release(component);
                return true;
            }

            public getCreatorsCount(): number {
                return this.creators.length;
            }

            public getCreator(i: number): ICreator {
                return this.creators[i];
            }

            public findCreatorByComponent(component: Component): ICreator {
                for (const creator of this.creators) {
                    if (creator.contains(component))
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
};