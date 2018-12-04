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
/// <reference path = "../EngineCore/ResourceAccess.ts" /> 
/// <reference path = "../EngineCore/Component.ts" /> 

namespace Magnum {
    export class TestComponent1 extends Component
    {
        public constructor(gameObject : GameObject) 
        {
            super(gameObject);
        }

        public destructor() {
        }        

        public static ClassName()
        {
            return "TestComponent1";
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
    };

    export namespace TestComponent1 {
        export class Data
        {
            public constructor() 
            {
            }

            public destructor() {
            }            
        };
        
        export class Resource extends ResourceAccess
        {
            public constructor(name : string)
            {
                super(name);
            }

            public destructor()
            {
                super.destructor();
            }    

            protected onConstruct(): boolean {
                console.log("TestComponent1.Resource.onConstruct ");   
                return true;            
            }            

            protected onParse(data : Blob): void {
                console.log("TestComponent1.Resource.onParse " + data.size + " " + data.type);   

                this.setParseSucceed();
            }

            protected onDestruct() {
                console.log("TestComponent1.Resource.onDestroy");
            }            
    
            public static extensionTag(): string {
                return "txt";
            }
    
            public extension(): string 
            {
                return TestComponent1.Resource.extensionTag();
            }            
            
            public static get(path : string) : TestComponent1.Resource	
            {	
                return ResourceAccess.get(path, this.extensionTag()) as TestComponent1.Resource;		
            }
        };    

        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }
        };
        */
    };
};