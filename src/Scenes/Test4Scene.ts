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

/// <reference path = "../EngineCore/Scene.ts" /> 

namespace Magnum {
    export class Test4Scene extends Scene{
        touchpadMethod: Input.TouchpadMethod = null;
 
        static Name()
        {
            return "Test4";
        }

        public constructor() {
            super();
        }

        public destructor() {
            super.destructor();
        }        

        protected onConstruct(): boolean				//	called after all constructors
        {
            this.touchpadMethod = Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);

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
            Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }

        protected onTouchPad(event: Input.TouchpadEvent): void				//	called after all constructors
        {
            if (event.event == Input.EventType.MouseDown) {
                Console.debug("Test4Scene.onTouchPad:  return");
            
                Scene.return();
            }
        }
    }
}