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

/// <reference path = "Stage.ts" /> 
namespace Magnum {
    export interface ServiceInterface<T extends IService> {
        Name() : string;        
        initiate(): boolean;
        update(): void;
        pause(): void;            
        resume(): void;
        terminate(): void;
    }

    export class IService{
        public constructor() {
        }

        public destructor() {
        }

        public Name(): string
        {
            return "";
        }

        public initiate(): boolean
        {
            return true;
        }

        public update(): void
        {
        }

        public pause(): void
        {
        }

        public resume(): void
        {
        }

        public terminate(): void
        {
        }
    };

    export class Service<T extends IService> extends IService{
        protected serviceInterface: ServiceInterface<T>;

        public constructor(serviceInterface: ServiceInterface<T>) {
            super();

            this.serviceInterface = serviceInterface; 
        }

        public destructor() 
        {
        }            

        public Name(): string
        {
            return this.serviceInterface.Name();
        }

        public initiate(): boolean
        {
            return this.serviceInterface.initiate();
        }

        public update(): void
        {
            this.serviceInterface.update();
        }

        public pause(): void
        {
            this.serviceInterface.pause();
        }

        public resume(): void
        {
            this.serviceInterface.resume();
        }

        public terminate(): void
        {
            this.serviceInterface.terminate();
        }
    };

    export namespace Service {
        export class Manager {
            private static instance: Service.Manager = null;
            private services : Array<IService>;

            private constructor() {
                this.services = new Array<IService>();
            }

            public destructor() {
                for (var i = 0; i < this.services.length; i++) 
                {
                    this.services[i].destructor();
                    this.services[i] = null;
                }
                this.services = null;
            }

            public static getInstance(): Service.Manager {
                if (Service.Manager.instance == null) {
                    Service.Manager.instance = new Service.Manager();
                }

                return Manager.instance;
            }

            public register<T extends IService>(serviceInterface: ServiceInterface<T>)
            {
                this.services.push(new Service(serviceInterface));
            }

            public initiate(): boolean {
                for (const service of this.services) {
                    Console.info("Service: " + service.Name() + "...\n");

                    if( !service.initiate() )
                    {
                        Stage.lastError("Service: Error in Initialiing Service");
                        return false;
                    }
                }
                return true;
            }

            public update(): void {
                for (const service of this.services) {
                    service.update();
                }
            }

            public pause(): void {
                for (const service of this.services) {
                    service.pause();
                }
            }

            public resume(): void {
                for (const service of this.services) {
                    service.resume();
                }
            }

            public terminate(): void {
                for (const service of this.services) {
                    service.terminate();
                }
            }
        }
    }
}