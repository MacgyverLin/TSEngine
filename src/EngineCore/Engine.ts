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
/// <reference path = "Input.ts" /> 
/// <reference path = "Service.ts" /> 

namespace Magnum {
    export class Engine {
        public constructor() {
        }

        public destructor() {
        }            

        public setRawAssetRootDirectory(rawAssetRootDirectory_: string): void {
            Stage.setRawAssetRootDirectory(rawAssetRootDirectory_);
        }

        public setAssetRootDirectory(assetRootDirectory_: string): void {
            Stage.setAssetRootDirectory(assetRootDirectory_);
        }

        public setDocumentDirectory(documentDirectory_: string): void {
            Stage.setDocumentDirectory(documentDirectory_);
        }

        public setExternalDirectory(externalDirectory_: string): void {
            Stage.setExternalDirectory(externalDirectory_);
        }

        public setInitialScene(initialScene_: string): void {
            Stage.setInitialScene(initialScene_);
        }

        public setGetCurrentTimeMSFunc(getCurrentTimeMSFunc_): void {
            Stage.setGetCurrentTimeMSFunc(getCurrentTimeMSFunc_);
        }

        public setConsoleMessageFunc(consoleVarboseFunc_, consoleDebugFunc_, consoleInfoFunc_,
            consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_): void {
            Stage.setConsoleMessageFunc(consoleVarboseFunc_, consoleDebugFunc_, consoleInfoFunc_,
                consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_);
        }

        public onInitialize(width_: number, height_: number): boolean {
            Stage.setStartTime();
            Stage.setScreenSize(width_, height_);

            if (!Service.Manager.getInstance().initiate())
                return false;

            if (!Scene.Manager.getInstance().find(Stage.getInitialScene()))
                return false;

            if (!Scene.Manager.getInstance().goto(Stage.getInitialScene()))
                return false;

            return true;
        }

        public onUpdate(): void {
            Stage.step();

            Service.Manager.getInstance().update();
        }

        public onPause(): void {
            Service.Manager.getInstance().pause();
        }

        public onResume(): void {
            Service.Manager.getInstance().resume();
        }

        public onTerminate(): void {
            Service.Manager.getInstance().terminate();
        }

        public onInputCache(inputCache: InputCache): void {
            for (var i = 0; i < inputCache.mouseDownCnt; i++)
                this.onTouchpadDown(inputCache.mouseDownModifiers[i], inputCache.mouseDownID[i], inputCache.mouseDownX[i], inputCache.mouseDownY[i]);
                inputCache.mouseDownCnt = 0;

            for (var i = 0; i < inputCache.mouseMoveCnt; i++)
                this.onTouchpadMoved(inputCache.mouseMoveModifiers[i], inputCache.mouseMoveID[i], inputCache.mouseMoveX[i], inputCache.mouseMoveY[i]);
                inputCache.mouseMoveCnt = 0;

            for (var i = 0; i < inputCache.mouseUpCnt; i++)
                this.onTouchpadUp(inputCache.mouseUpModifiers[i], inputCache.mouseUpID[i], inputCache.mouseUpX[i], inputCache.mouseUpY[i]);
            inputCache.mouseUpCnt = 0;

            for (var i = 0; i < inputCache.wheelCnt; i++)
                this.onTouchpadScrolled(inputCache.wheelModifiers[i], inputCache.wheelX[i], inputCache.wheelY[i], inputCache.wheelAxis[i], inputCache.wheelRotation[i]);
            inputCache.wheelCnt = 0;

            for (var i = 0; i < inputCache.keyDownCount; i++)
                this.onGamePadKeyDown(inputCache.keyDownModifiers[i], inputCache.keyDownCodes[i]);
            inputCache.keyDownCount = 0;

            for (var i = 0; i < inputCache.keyUpCount; i++)
                this.onGamePadKeyUp(inputCache.keyUpModifiers[i], inputCache.keyUpCodes[i]);
            inputCache.keyUpCount = 0;

            if (inputCache.hasAcc)
                this.onAccelerationUpdate(inputCache.accX, inputCache.accY, inputCache.accZ);
            inputCache.hasAcc = false;

            for (var i = 0; i < inputCache.messageCount; i++)
                this.onMessageReceived(inputCache.messageModifiers[i], inputCache.messages[i]);
            inputCache.messageCount = 0;
        }

        public onTouchpadDown(modifier: number, fingerID: number, x: number, y: number): void {
            Input.Manager.getInstance().onTouchpadEvent(modifier, Input.EventType.MouseDown, fingerID, x, y);
        }

        public onTouchpadUp(modifier: number, fingerID: number, x: number, y: number): void {
            Input.Manager.getInstance().onTouchpadEvent(modifier, Input.EventType.MouseUp, fingerID, x, y);
        }

        public onTouchpadMoved(modifier: number, fingerID: number, x: number, y: number): void {
            Input.Manager.getInstance().onTouchpadEvent(modifier, Input.EventType.MouseMove, fingerID, x, y);
        }

        public onTouchpadScrolled(modifier, x, y, axis, rotation): void {
            Input.Manager.getInstance().onTouchpadScrollEvent(modifier, Input.EventType.MouseMove, x, y, axis, rotation);
        }

        public onGamePadKeyDown(modifier: number, keyCode): void {
            Input.Manager.getInstance().onGamePadEvent(modifier, Input.EventType.GamepadKeyDown, keyCode);
        }

        public onGamePadKeyUp(modifier: number, keyCode): void {
            Input.Manager.getInstance().onGamePadEvent(modifier, Input.EventType.GamepadKeyUp, keyCode);
        }

        public onAccelerationUpdate(x, y, z): void {
            Input.Manager.getInstance().onAccelerationEvent(Input.EventType.AcceleratorUpdate, x, y, z);
        }

        public onMessageReceived(modifier: number, message): void {
            Input.Manager.getInstance().onMessageEvent(modifier, Input.EventType.MessageReceived, message);
        }
    }
}