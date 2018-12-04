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
/// <reference path = "FileIO.ts" /> 
/// <reference path = "Stage.ts" /> 
/// <reference path = "Console.ts" /> 

namespace Magnum {
    export class ResourceAccess {
        private name: String;
        private file: FileIO;
        private valid: boolean;
        private refCount: number;
        private state: ResourceAccess.State;
        private parseStatus: ResourceAccess.ParseStatus;

        public constructor(name: string) {
            this.name = name;
            this.file = null;
            this.valid = true;
            this.refCount = 0;
            this.state = ResourceAccess.State.Idle;
            this.parseStatus = ResourceAccess.ParseStatus.Parsing;

            this.onConstruct();
        }

        public destructor() {
            this.onDestruct();
            this.closeFile();
        }

        protected onConstruct(): boolean {
            return true;
        }

        protected onParse(data: Blob): void {
        }

        protected onDestruct(): void {
        }

        get Name() {
            return this.name;
        }

        /////////////////////
        // state
        public setIdleState(): void {
            if (this.file) {
                this.file.close();
                this.file = null;
            }

            this.valid = true;
            this.state = ResourceAccess.State.Idle;
        }

        public setLoadingState(): void {
            this.openFile();

            this.onDestruct();

            this.file.read();

            this.state = ResourceAccess.State.Loading;
        }

        public setParsingState(): void {
            this.onParse(this.file.getBlob());

            this.parseStatus = ResourceAccess.ParseStatus.Parsing;
            this.state = ResourceAccess.State.Parsing;
        }

        public setFailedState(): void {
            this.closeFile();
            this.state = ResourceAccess.State.Failed;
        }

        public setReadyState(): void {
            this.closeFile();
            this.state = ResourceAccess.State.Ready;
        }

        public getState(): ResourceAccess.State {
            return this.state;
        }

        public isIdle(): boolean {
            return this.state == ResourceAccess.State.Idle;
        }

        public isLoading(): boolean {
            return this.state == ResourceAccess.State.Loading;
        }

        public isFailed(): boolean {
            return this.state == ResourceAccess.State.Failed;
        }

        public isReady(): boolean {
            return this.state == ResourceAccess.State.Ready;
        }

        public isLoadingFinished(): boolean {
            return this.file.isSucceededStatus();
        }

        public isLoadingTimeOut(): boolean {
            return this.file.isClientErrorStatus() || this.file.isServerErrorStatus();
        }

        ////////////////////
        // parse State
        public isParsing(): boolean {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.Parsing;
        }

        public isParseSucceed(): boolean {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.ParseSucceed;
        }

        public isParseFailed(): boolean {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.ParseFailed;
        }

        protected setParsing(): void {
            this.parseStatus = ResourceAccess.ParseStatus.Parsing;
        }

        protected setParseSucceed(): void {
            this.parseStatus = ResourceAccess.ParseStatus.ParseSucceed;
        }

        protected setParseFailed(): void {
            this.parseStatus = ResourceAccess.ParseStatus.ParseFailed;
        }

        ////////////////////
        // valid
        public invalidate() {
            this.valid = false;
        }

        public validate() {
            this.valid = true;
        }

        public isValid(): boolean {
            return this.valid;
        }

        /////////////////////
        // reference count
        public addRef(): void {
            this.refCount++;
        }

        public getRefCount(): number {
            return this.refCount;
        }

        public release(): void {
            this.refCount--;
        }

        private openFile(): boolean {
            var path = Stage.getAssetRootDirectory() + this.name + "." + this.extension();
            //var path = Stage.getDocumentDirectory() + this.name + "." + this.extension();
            //var path = Stage.getExternalDirectory() + this.name + "." + this.extension();
            this.file = new FileIO();
            if (!this.file.open(path, "b")) {
                Console.debug("failed to open files " + path);
                return false;
            }

            return true;
        }

        private closeFile() {
            if (this.file) {
                this.file.close();
                this.file = null;
            }
        }

        public static extensionTag(): string {
            return "";
        }

        public extension(): string {
            return "";
        }

        static get(name: string, extension: string): ResourceAccess {
            var creator = ResourceAccess.Manager.getInstance().find(extension);
            if (creator) {
                return creator.get(name);
            }
            else
                return null;
        }

        static release(resourceAccess: ResourceAccess) {
            var creator = ResourceAccess.Manager.getInstance().find(resourceAccess.extension());
            if (creator)
                return creator.release(resourceAccess);
            else
                return null;
        }
    }

    export namespace ResourceAccess {
        export enum ParseStatus {
            Parsing = 0,
            ParseSucceed,
            ParseFailed
        };

        export enum State {
            Idle = 0,
            Loading,
            Parsing,
            Failed,
            Ready,
        };

        export class ICreator {
            protected resources: Array<ResourceAccess>;
            protected extension: string;

            public constructor(extension: string) {
                this.resources = new Array<ResourceAccess>(0)
                this.extension = extension;
            }

            public destructor() {
                for (var i = 0; i < this.resources.length; i++) {
                    this.resources[i].destructor();
                    this.resources[i] = null;
                }
                this.resources = null;
            }

            public find(name: string): ResourceAccess {
                for (var i = 0; i < this.resources.length; i++) {
                    if (this.resources[i].Name == name)
                        return this.resources[i];
                }

                return null;
            }

            public get(name: string): ResourceAccess {
                return null;
            }

            public create(name: string): ResourceAccess {
                return null;
            }

            public release(resourceAccess: ResourceAccess): void {
                resourceAccess.release();
            }

            public initiate(): boolean {
                return true;
            }

            get Extension() {
                return this.extension;
            }

            public update(): void {
                var garbageResources = new Array<ResourceAccess>(0);

                for (var i = 0; i < this.resources.length; i++) {
                    switch (this.resources[i].getState()) {
                        case ResourceAccess.State.Idle:
                            this.resources[i].setLoadingState();
                            break;

                        case ResourceAccess.State.Loading:
                            if (this.resources[i].isLoadingFinished())
                                this.resources[i].setParsingState();
                            else if (this.resources[i].isLoadingTimeOut())
                                this.resources[i].setFailedState();
                            break;

                        case ResourceAccess.State.Parsing:
                            if (this.resources[i].isParseSucceed())
                                this.resources[i].setReadyState();
                            else if (this.resources[i].isParseFailed())
                                this.resources[i].setFailedState();
                            break;

                        case ResourceAccess.State.Failed:
                            if (this.resources[i].getRefCount() == 0) {
                                garbageResources.push(this.resources[i]);
                            }
                            else if (!this.resources[i].isValid()) {
                                this.resources[i].setLoadingState();
                                this.resources[i].validate();
                            }
                            break;

                        case ResourceAccess.State.Ready:
                            if (this.resources[i].getRefCount() == 0) {
                                garbageResources.push(this.resources[i]);
                            }
                            else if (!this.resources[i].isValid()) {
                                this.resources[i].setLoadingState();
                                this.resources[i].validate();
                            }
                            break;
                    }
                }

                for (var i = 0; i < garbageResources.length; i++) {
                    var idx = this.resources.indexOf(garbageResources[i]);
                    garbageResources[i].destructor();
                    garbageResources[i] = null;

                    if (idx != -1)
                        this.resources.splice(idx, 1);
                }
                garbageResources = null;
            }

            public pause(): void {
            }

            public resume(): void {
            }

            public terminate(): void {
            }

            public isReady(): boolean {
                for (var i = 0; i < this.resources.length; i++) {
                    if(!this.resources[i].isReady())
                        return false;
                }

                return true;
            }
        };

        //////////////////////////////////////////////////////////////////////////////////////
        interface ResourceAccessInterface<T extends ResourceAccess> {
            new(name: string): T;
            extensionTag(): string;
            get(path: string): ResourceAccess
        }

        export class Creator<T extends ResourceAccess> extends ICreator {
            private resourceAccessInterface: ResourceAccessInterface<T>;

            public constructor(resourceAccessInterface: ResourceAccessInterface<T>) {
                super(resourceAccessInterface.extensionTag());

                this.resourceAccessInterface = resourceAccessInterface;
            }

            public destructor() {
                super.destructor();
            }

            public get(name: string): ResourceAccess {
                var resource = this.find(name);
                if (resource)
                    return resource;
                else
                    return this.create(name);
            }

            public create(name: string): ResourceAccess {
                var resource = new this.resourceAccessInterface(name);
                resource.setIdleState();

                this.resources.push(resource);
                return resource;
            }
        };

        export class Manager {
            private static instance: Manager = null;
            private creators: Array<ICreator>;

            private newReourceFiles: Array<string>;
            private reloadResourceFiles: Array<string>;
            private deleteReourceFiles: Array<string>;
            private updateAssets: boolean;

            private constructor() {
                this.creators = new Array<ICreator>(0);

                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
                this.updateAssets = false;
            }

            public destructor() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }
                this.creators = null;

                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
            }

            public static getInstance(): ResourceAccess.Manager {
                if (ResourceAccess.Manager.instance == null) {
                    ResourceAccess.Manager.instance = new ResourceAccess.Manager();
                }
                return ResourceAccess.Manager.instance;
            }

            public register<T extends ResourceAccess>(resourceAccessInterface: ResourceAccessInterface<T>) {
                this.creators.push(new ResourceAccess.Creator(resourceAccessInterface));
            }

            public find(extension: string): ICreator {
                for (var i = 0; i < this.creators.length; i++) {
                    if (this.creators[i].Extension == extension)
                        return this.creators[i];
                }

                Console.debug("ResourceAccess::Factory cannot find creator " + extension);
                return null;
            }

            public beginUpdateResources(newReourceFiles: Array<string>,
                reloadResourceFiles: Array<string>,
                deleteReourceFiles: Array<string>) {
                this.newReourceFiles = newReourceFiles;
                this.reloadResourceFiles = reloadResourceFiles;
                this.deleteReourceFiles = deleteReourceFiles;

                this.updateAssets = true;
            }

            public endUpdateResources(): void {
                this.updateAssets = false;
            }

            public isUpdatingResources(): boolean {
                return this.updateAssets;
            }

            public initiate(): boolean {
                for (var i = 0; i < this.creators.length; i++) {
                    if (!this.creators[i].initiate())
                        return false;
                }

                return true;
            }

            public update(): void {
                if (this.isUpdatingResources()) {
                    this.endUpdateResources();
                }

                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].update();
                }
            }

            public pause(): void {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].pause();
                }
            }

            public resume(): void {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].resume();
                }
            }

            public terminate(): void {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].terminate();
                }

                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
            }

            public isReady(): boolean {
                for (var i = 0; i < this.creators.length; i++) {
                    if (!this.creators[i].isReady())
                        return false;
                }

                return true;
            }            
        };

        export class Service {
            static Name(): string {
                return "ResourceAccess";
            }

            static initiate(): boolean {
                return ResourceAccess.Manager.getInstance().initiate();
            }

            static update(): void {
                ResourceAccess.Manager.getInstance().update();
            }

            static pause(): void {
                ResourceAccess.Manager.getInstance().pause();
            }

            static resume(): void {
                ResourceAccess.Manager.getInstance().resume();
            }

            static terminate(): void {
                ResourceAccess.Manager.getInstance().terminate();
            }
        };
    }
}