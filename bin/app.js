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
var Magnum;
(function (Magnum) {
    class InputCache {
        constructor() {
            this.mouseDownCnt = 0;
            this.mouseDownID = [];
            this.mouseDownModifiers = [];
            this.mouseDownX = [];
            this.mouseDownY = [];
            this.mouseMoveID = [];
            this.mouseMoveModifiers = [];
            this.mouseMoveX = [];
            this.mouseMoveY = [];
            this.mouseUpCnt = 0;
            this.mouseUpID = [];
            this.mouseUpModifiers = [];
            this.mouseUpX = [];
            this.mouseUpY = [];
            this.wheelCnt = 0;
            this.wheelModifiers = [];
            this.wheelX = [];
            this.wheelY = [];
            this.wheelAxis = [];
            this.wheelRotation = [];
            this.hasAcc = false;
            this.keyDownCount = 0;
            this.keyDownModifiers = [];
            this.keyDownCodes = [];
            this.keyUpCount = 0;
            this.keyUpModifiers = [];
            this.keyUpCodes = [];
            this.messageCount = 0;
            this.messageModifiers = [];
            this.messages = [];
            this.MOUSE_EVENT_CNT = 64;
            this.KEY_EVENT_CNT = 64;
            this.MESSAGE_CNT = 512;
            this.mouseDownCnt = 0;
            this.mouseDownModifiers.length = this.MOUSE_EVENT_CNT;
            this.mouseDownID.length = this.MOUSE_EVENT_CNT;
            this.mouseDownX.length = this.MOUSE_EVENT_CNT;
            this.mouseDownY.length = this.MOUSE_EVENT_CNT;
            for (var i = 0; i < this.mouseDownID.length; i++) {
                this.mouseDownID[i] = 0;
                this.mouseDownModifiers[i] = 0;
                this.mouseDownX[i] = 0;
                this.mouseDownY[i] = 0;
            }
            this.mouseMoveCnt = 0;
            this.mouseMoveModifiers.length = this.MOUSE_EVENT_CNT;
            this.mouseMoveID.length = this.MOUSE_EVENT_CNT;
            this.mouseMoveX.length = this.MOUSE_EVENT_CNT;
            this.mouseMoveY.length = this.MOUSE_EVENT_CNT;
            for (var i = 0; i < this.mouseMoveID.length; i++) {
                this.mouseMoveID[i] = 0;
                this.mouseMoveModifiers[i] = 0;
                this.mouseMoveX[i] = 0;
                this.mouseMoveY[i] = 0;
            }
            this.mouseUpCnt = 0;
            this.mouseUpModifiers.length = this.MOUSE_EVENT_CNT;
            this.mouseUpID.length = this.MOUSE_EVENT_CNT;
            this.mouseUpX.length = this.MOUSE_EVENT_CNT;
            this.mouseUpY.length = this.MOUSE_EVENT_CNT;
            for (var i = 0; i < this.mouseUpID.length; i++) {
                this.mouseUpID[i] = 0;
                this.mouseUpModifiers[i] = 0;
                this.mouseUpX[i] = 0;
                this.mouseUpY[i] = 0;
            }
            this.hasAcc = false;
            this.accX = 0;
            this.accY = 0;
            this.accZ = 0;
            this.keyDownCount = 0;
            this.keyDownModifiers.length = this.KEY_EVENT_CNT;
            this.keyDownCodes.length = this.KEY_EVENT_CNT;
            for (var i = 0; i < this.keyDownCodes.length; i++) {
                this.keyDownModifiers[i] = 0;
                this.keyDownCodes[i] = 0;
            }
            this.keyUpCount = 0;
            this.keyUpModifiers.length = this.KEY_EVENT_CNT;
            this.keyUpCodes.length = this.KEY_EVENT_CNT;
            for (var i = 0; i < this.keyUpCodes.length; i++) {
                this.keyUpModifiers[i] = 0;
                this.keyUpCodes[i] = 0;
            }
            this.messageCount = 0;
            this.messageModifiers.length = this.MESSAGE_CNT;
            this.messages.length = this.MESSAGE_CNT;
            for (var i = 0; i < this.messages.length; i++) {
                this.messageModifiers[i] = 0;
                this.messages[i] = "";
            }
        }
        destructor() {
        }
        addMouseDown(modifier, fingerid, x, y) {
            // assert(mouseDownCnt+1<MOUSE_EVENT_CNT);
            this.mouseDownModifiers[this.mouseDownCnt] = modifier;
            this.mouseDownID[this.mouseDownCnt] = fingerid;
            this.mouseDownX[this.mouseDownCnt] = x;
            this.mouseDownY[this.mouseDownCnt] = y;
            this.mouseDownCnt++;
        }
        addMouseMove(modifier, fingerid, x, y) {
            // assert(mouseMoveCnt+1<MOUSE_EVENT_CNT);
            this.mouseMoveModifiers[this.mouseMoveCnt] = modifier;
            this.mouseMoveID[this.mouseMoveCnt] = fingerid;
            this.mouseMoveX[this.mouseMoveCnt] = x;
            this.mouseMoveY[this.mouseMoveCnt] = y;
            this.mouseMoveCnt++;
        }
        addMouseUp(modifier, fingerid, x, y) {
            // assert(mouseUpCnt+1<MOUSE_EVENT_CNT);
            this.mouseUpModifiers[this.mouseMoveCnt] = modifier;
            this.mouseUpID[this.mouseUpCnt] = fingerid;
            this.mouseUpX[this.mouseUpCnt] = x;
            this.mouseUpY[this.mouseUpCnt] = y;
            this.mouseUpCnt++;
        }
        addWheelMotion(modifier, x, y, axis, rotation) {
            // assert(wheelCnt+1<MOUSE_EVENT_CNT);
            this.wheelModifiers[this.wheelCnt] = modifier;
            this.wheelX[this.wheelCnt] = x;
            this.wheelY[this.wheelCnt] = y;
            this.wheelAxis[this.wheelCnt] = axis;
            this.wheelRotation[this.wheelCnt] = rotation;
            this.wheelCnt++;
        }
        setAcc(x, y, z) {
            this.hasAcc = true;
            this.accX = x;
            this.accY = y;
            this.accZ = z;
        }
        addKeyDown(modifier, keyDownCode) {
            // assert(keyDownCount+1<KEY_EVENT_CNT);
            this.keyDownModifiers[this.keyDownCount] = modifier;
            this.keyDownCodes[this.keyDownCount] = keyDownCode;
            this.keyDownCount++;
        }
        addKeyUp(modifier, keyUpCode) {
            //assert(keyUpCount+1<KEY_EVENT_CNT);
            this.keyUpModifiers[this.keyUpCount] = modifier;
            this.keyUpCodes[this.keyUpCount] = keyUpCode;
            this.keyUpCount++;
        }
        addMessage(modifier, message) {
            //assert(keyUpCount+1<KEY_EVENT_CNT);
            this.messageModifiers[this.messageCount] = modifier;
            this.messages[this.messageCount] = message;
            this.messageCount++;
        }
        addJoyPadKeyDown(keyDownCode) {
        }
        addJoyPadKeyup(keyUpCode) {
        }
        setJoyPadInfo(info) {
        }
        static getModifier(shiftKey, altKey, ctrlKey) {
            var rval = 0;
            if (shiftKey)
                rval |= Magnum.Input.Modifier.Shift;
            if (altKey)
                rval |= Magnum.Input.Modifier.Alt;
            if (ctrlKey)
                rval |= Magnum.Input.Modifier.Ctrl;
            return rval;
        }
    }
    Magnum.InputCache = InputCache;
    ;
    (function (InputCache) {
        class JoypadInfo {
        }
        InputCache.JoypadInfo = JoypadInfo;
        ;
    })(InputCache = Magnum.InputCache || (Magnum.InputCache = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Stage {
        constructor() {
        }
        destructor() {
        }
        static setRawAssetRootDirectory(rawAssetRootDirectory_) {
            Stage.rawAssetRootDirectory = rawAssetRootDirectory_;
        }
        static getRawAssetRootDirectory() {
            return Stage.rawAssetRootDirectory;
        }
        static setAssetRootDirectory(assetRootDirectory_) {
            Stage.assetRootDirectory = assetRootDirectory_;
        }
        static getAssetRootDirectory() {
            return Stage.assetRootDirectory;
        }
        static setDocumentDirectory(documentDirectory_) {
            Stage.documentDirectory = documentDirectory_;
        }
        static getDocumentDirectory() {
            return Stage.documentDirectory;
        }
        static setExternalDirectory(externalDirectory_) {
            Stage.externalDirectory = externalDirectory_;
        }
        static getExternalDirectory() {
            return Stage.externalDirectory;
        }
        static setInitialScene(initialScene_) {
            Stage.initialScene = initialScene_;
        }
        static getInitialScene() {
            return Stage.initialScene;
        }
        static setGetCurrentTimeMSFunc(currentTimeMSFunc_) {
            Stage.currentTimeMSFunc = currentTimeMSFunc_;
        }
        static setConsoleMessageFunc(consoleVerboseFunc_, consoleDebugFunc_, consoleInfoFunc_, consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_) {
            Stage.consoleVerboseFunc = consoleVerboseFunc_;
            Stage.consoleDebugFunc = consoleDebugFunc_;
            Stage.consoleInfoFunc = consoleInfoFunc_;
            Stage.consoleWarningFunc = consoleWarningFunc_;
            Stage.consoleErrorFunc = consoleErrorFunc_;
            Stage.consoleAssertFunc = consoleAssertFunc_;
        }
        static setScreenSize(width_, height_) {
            Stage.width = width_;
            Stage.height = height_;
        }
        static getScreenWidth() {
            return Stage.width;
        }
        static getScreenHeight() {
            return Stage.height;
        }
        static setStartTime() {
            Stage.currentTime = Stage.currentTimeMSFunc();
        }
        /////////////////////////////////////////////////////////////////////
        static step() {
            var time = Stage.currentTimeMSFunc();
            Stage.deltaTime = time - Stage.currentTime;
            Stage.currentTime = time;
        }
        static elpase() {
            return Stage.deltaTime;
        }
        static lastError(lasterror) {
            Stage.lasterror = lasterror;
        }
    }
    Stage.isEditorMode = false;
    Magnum.Stage = Stage;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Input {
        constructor() {
        }
        destructor() {
        }
    }
    Magnum.Input = Input;
    ;
    (function (Input) {
        let EventType;
        (function (EventType) {
            EventType[EventType["MouseDown"] = 0] = "MouseDown";
            EventType[EventType["MouseUp"] = 1] = "MouseUp";
            EventType[EventType["MouseMove"] = 2] = "MouseMove";
            EventType[EventType["MouseWheel"] = 3] = "MouseWheel";
            EventType[EventType["GamepadKeyDown"] = 4] = "GamepadKeyDown";
            EventType[EventType["GamepadKeyUp"] = 5] = "GamepadKeyUp";
            EventType[EventType["AcceleratorUpdate"] = 6] = "AcceleratorUpdate";
            EventType[EventType["MessageReceived"] = 7] = "MessageReceived";
        })(EventType = Input.EventType || (Input.EventType = {}));
        ;
        let Modifier;
        (function (Modifier) {
            Modifier[Modifier["Shift"] = 1] = "Shift";
            Modifier[Modifier["Ctrl"] = 2] = "Ctrl";
            Modifier[Modifier["Alt"] = 4] = "Alt";
        })(Modifier = Input.Modifier || (Input.Modifier = {}));
        ;
        class Event {
            constructor() {
            }
            destructor() {
            }
            isAltDown() {
                return (this.modifier & Input.Modifier.Alt) != 0;
            }
            isCtrlDown() {
                return (this.modifier & Input.Modifier.Ctrl) != 0;
            }
            isShiftDown() {
                return (this.modifier & Input.Modifier.Shift) != 0;
            }
        }
        Input.Event = Event;
        ;
        class TouchpadEvent extends Event {
            constructor() {
                super();
            }
            destructor() {
                super.destructor();
            }
        }
        Input.TouchpadEvent = TouchpadEvent;
        ;
        class TouchpadMethod {
            constructor(cb) {
                this.cb = cb;
            }
            destructor() {
            }
        }
        Input.TouchpadMethod = TouchpadMethod;
        ;
        class GamepadEvent extends Event {
            constructor() {
                super();
            }
            destructor() {
                super.destructor();
            }
        }
        Input.GamepadEvent = GamepadEvent;
        ;
        class GamepadMethod {
            constructor(cb) {
                this.cb = cb;
            }
            destructor() {
            }
        }
        Input.GamepadMethod = GamepadMethod;
        ;
        class AcceleratorEvent extends Event {
            constructor() {
                super();
            }
            destructor() {
                super.destructor();
            }
        }
        Input.AcceleratorEvent = AcceleratorEvent;
        ;
        class AcceleratorMethod {
            constructor(cb) {
                this.cb = cb;
            }
            destructor() {
            }
        }
        Input.AcceleratorMethod = AcceleratorMethod;
        ;
        class MessageEvent extends Event {
            constructor() {
                super();
            }
            destructor() {
                super.destructor();
            }
        }
        Input.MessageEvent = MessageEvent;
        ;
        class MessageMethod {
            constructor(cb) {
                this.cb = cb;
            }
            destructor() {
            }
        }
        Input.MessageMethod = MessageMethod;
        ;
        //////////////////////////////////////////////////////////////////////////////////////////////
        class Manager {
            constructor() {
                this.touchpadMethods = new Array();
                this.touchpadEvents = new Array();
                this.gamepadMethods = new Array();
                this.gamepadEvents = new Array();
                this.acceleratorMethods = new Array();
                this.acceleratorEvents = new Array();
                this.messageMethods = new Array();
                this.messageEvents = new Array();
            }
            destructor() {
                this.messageEvents = null;
                this.messageMethods = null;
                this.acceleratorEvents = null;
                this.acceleratorMethods = null;
                this.gamepadEvents = null;
                this.gamepadMethods = null;
                this.touchpadEvents = null;
                this.touchpadMethods = null;
            }
            static getInstance() {
                if (Input.Manager.instance == null) {
                    Input.Manager.instance = new Input.Manager();
                }
                return Input.Manager.instance;
            }
            addTouchpadMethod(cb) {
                var touchpadMethod = new TouchpadMethod(cb);
                this.touchpadMethods.push(touchpadMethod);
                return touchpadMethod;
            }
            removeTouchpadMethod(touchpadMethod) {
                var idx = this.touchpadMethods.indexOf(touchpadMethod);
                if (idx != -1)
                    this.touchpadMethods.splice(idx, 1);
            }
            onTouchpadEvent(modifier, event, fingerID, x, y) {
                var touchpadEvent = new Input.TouchpadEvent();
                touchpadEvent.event = event;
                touchpadEvent.modifier = modifier;
                touchpadEvent.fingerID = fingerID;
                touchpadEvent.position = new Magnum.Vector2([x, y]);
                touchpadEvent.wheelAxis = 0;
                touchpadEvent.wheelRotation = 0;
                this.touchpadEvents.push(touchpadEvent);
            }
            onTouchpadScrollEvent(modifier, event, x, y, axis, rotation) {
                var touchpadEvent = new Input.TouchpadEvent();
                touchpadEvent.event = event;
                touchpadEvent.modifier = modifier;
                touchpadEvent.fingerID = 0;
                touchpadEvent.position = new Magnum.Vector2([x, y]);
                touchpadEvent.wheelAxis = axis;
                touchpadEvent.wheelRotation = rotation;
                this.touchpadEvents.push(touchpadEvent);
            }
            onGamePadEvent(modifier, event, keyCode) {
                var gamepadEvent = new Input.GamepadEvent();
                gamepadEvent.event = event;
                gamepadEvent.modifier = modifier;
                gamepadEvent.keyCode = keyCode;
                this.gamepadEvents.push(gamepadEvent);
            }
            onAccelerationEvent(event, x, y, z) {
                var acceleratorEvent = new Input.AcceleratorEvent();
                acceleratorEvent.event = event;
                acceleratorEvent.acceleration = new Magnum.Vector3([x, y, z]);
                this.acceleratorEvents.push(acceleratorEvent);
            }
            onMessageEvent(modifier, event, message) {
                var messageEvent = new Input.MessageEvent();
                messageEvent.event = event;
                messageEvent.modifier = modifier;
                messageEvent.message = message;
                this.messageEvents.push(messageEvent);
            }
            initiate() {
                return true;
            }
            update() {
                for (const touchpadEvent of this.touchpadEvents) {
                    for (const touchpadMethod of this.touchpadMethods) {
                        touchpadMethod.cb(touchpadEvent);
                    }
                }
                for (const gamepadEvent of this.gamepadEvents) {
                    for (const gamepadMethod of this.gamepadMethods) {
                        gamepadMethod.cb(gamepadEvent);
                    }
                }
                for (const acceleratorEvent of this.acceleratorEvents) {
                    for (const acceleratorMethod of this.acceleratorMethods) {
                        acceleratorMethod.cb(acceleratorEvent);
                    }
                }
                for (const messageEvent of this.messageEvents) {
                    for (const messageMethod of this.messageMethods) {
                        messageMethod.cb(messageEvent);
                    }
                }
                this.touchpadEvents = [];
                this.gamepadEvents = [];
                this.acceleratorEvents = [];
                this.messageEvents = [];
            }
            pause() {
            }
            resume() {
            }
            terminate() {
                this.touchpadMethods = [];
                this.touchpadEvents = [];
                this.gamepadMethods = [];
                this.gamepadEvents = [];
                this.acceleratorMethods = [];
                this.acceleratorEvents = [];
                this.messageMethods = [];
                this.messageEvents = [];
            }
        }
        Manager.instance = null;
        Input.Manager = Manager;
        ///////////////////////////////////////////////////////////////
        class Service {
            static Name() {
                return "Input";
            }
            static initiate() {
                return Input.Manager.getInstance().initiate();
            }
            static update() {
                Input.Manager.getInstance().update();
            }
            static pause() {
                Input.Manager.getInstance().pause();
            }
            static resume() {
                Input.Manager.getInstance().resume();
            }
            static terminate() {
                Input.Manager.getInstance().terminate();
            }
        }
        Input.Service = Service;
        ;
    })(Input = Magnum.Input || (Magnum.Input = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class IService {
        constructor() {
        }
        destructor() {
        }
        Name() {
            return "";
        }
        initiate() {
            return true;
        }
        update() {
        }
        pause() {
        }
        resume() {
        }
        terminate() {
        }
    }
    Magnum.IService = IService;
    ;
    class Service extends IService {
        constructor(serviceInterface) {
            super();
            this.serviceInterface = serviceInterface;
        }
        destructor() {
        }
        Name() {
            return this.serviceInterface.Name();
        }
        initiate() {
            return this.serviceInterface.initiate();
        }
        update() {
            this.serviceInterface.update();
        }
        pause() {
            this.serviceInterface.pause();
        }
        resume() {
            this.serviceInterface.resume();
        }
        terminate() {
            this.serviceInterface.terminate();
        }
    }
    Magnum.Service = Service;
    ;
    (function (Service) {
        class Manager {
            constructor() {
                this.services = new Array();
            }
            destructor() {
                for (var i = 0; i < this.services.length; i++) {
                    this.services[i].destructor();
                    this.services[i] = null;
                }
                this.services = null;
            }
            static getInstance() {
                if (Service.Manager.instance == null) {
                    Service.Manager.instance = new Service.Manager();
                }
                return Manager.instance;
            }
            register(serviceInterface) {
                this.services.push(new Service(serviceInterface));
            }
            initiate() {
                for (const service of this.services) {
                    Magnum.Console.info("Service: " + service.Name() + "...\n");
                    if (!service.initiate()) {
                        Magnum.Stage.lastError("Service: Error in Initialiing Service");
                        return false;
                    }
                }
                return true;
            }
            update() {
                for (const service of this.services) {
                    service.update();
                }
            }
            pause() {
                for (const service of this.services) {
                    service.pause();
                }
            }
            resume() {
                for (const service of this.services) {
                    service.resume();
                }
            }
            terminate() {
                for (const service of this.services) {
                    service.terminate();
                }
            }
        }
        Manager.instance = null;
        Service.Manager = Manager;
    })(Service = Magnum.Service || (Magnum.Service = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Engine {
        constructor() {
        }
        destructor() {
        }
        setRawAssetRootDirectory(rawAssetRootDirectory_) {
            Magnum.Stage.setRawAssetRootDirectory(rawAssetRootDirectory_);
        }
        setAssetRootDirectory(assetRootDirectory_) {
            Magnum.Stage.setAssetRootDirectory(assetRootDirectory_);
        }
        setDocumentDirectory(documentDirectory_) {
            Magnum.Stage.setDocumentDirectory(documentDirectory_);
        }
        setExternalDirectory(externalDirectory_) {
            Magnum.Stage.setExternalDirectory(externalDirectory_);
        }
        setInitialScene(initialScene_) {
            Magnum.Stage.setInitialScene(initialScene_);
        }
        setGetCurrentTimeMSFunc(getCurrentTimeMSFunc_) {
            Magnum.Stage.setGetCurrentTimeMSFunc(getCurrentTimeMSFunc_);
        }
        setConsoleMessageFunc(consoleVarboseFunc_, consoleDebugFunc_, consoleInfoFunc_, consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_) {
            Magnum.Stage.setConsoleMessageFunc(consoleVarboseFunc_, consoleDebugFunc_, consoleInfoFunc_, consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_);
        }
        onInitialize(width_, height_) {
            Magnum.Stage.setStartTime();
            Magnum.Stage.setScreenSize(width_, height_);
            if (!Magnum.Service.Manager.getInstance().initiate())
                return false;
            if (!Magnum.Scene.Manager.getInstance().find(Magnum.Stage.getInitialScene()))
                return false;
            if (!Magnum.Scene.Manager.getInstance().goto(Magnum.Stage.getInitialScene()))
                return false;
            return true;
        }
        onUpdate() {
            Magnum.Stage.step();
            Magnum.Service.Manager.getInstance().update();
        }
        onPause() {
            Magnum.Service.Manager.getInstance().pause();
        }
        onResume() {
            Magnum.Service.Manager.getInstance().resume();
        }
        onTerminate() {
            Magnum.Service.Manager.getInstance().terminate();
        }
        onInputCache(inputCache) {
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
        onTouchpadDown(modifier, fingerID, x, y) {
            Magnum.Input.Manager.getInstance().onTouchpadEvent(modifier, Magnum.Input.EventType.MouseDown, fingerID, x, y);
        }
        onTouchpadUp(modifier, fingerID, x, y) {
            Magnum.Input.Manager.getInstance().onTouchpadEvent(modifier, Magnum.Input.EventType.MouseUp, fingerID, x, y);
        }
        onTouchpadMoved(modifier, fingerID, x, y) {
            Magnum.Input.Manager.getInstance().onTouchpadEvent(modifier, Magnum.Input.EventType.MouseMove, fingerID, x, y);
        }
        onTouchpadScrolled(modifier, x, y, axis, rotation) {
            Magnum.Input.Manager.getInstance().onTouchpadScrollEvent(modifier, Magnum.Input.EventType.MouseMove, x, y, axis, rotation);
        }
        onGamePadKeyDown(modifier, keyCode) {
            Magnum.Input.Manager.getInstance().onGamePadEvent(modifier, Magnum.Input.EventType.GamepadKeyDown, keyCode);
        }
        onGamePadKeyUp(modifier, keyCode) {
            Magnum.Input.Manager.getInstance().onGamePadEvent(modifier, Magnum.Input.EventType.GamepadKeyUp, keyCode);
        }
        onAccelerationUpdate(x, y, z) {
            Magnum.Input.Manager.getInstance().onAccelerationEvent(Magnum.Input.EventType.AcceleratorUpdate, x, y, z);
        }
        onMessageReceived(modifier, message) {
            Magnum.Input.Manager.getInstance().onMessageEvent(modifier, Magnum.Input.EventType.MessageReceived, message);
        }
    }
    Magnum.Engine = Engine;
})(Magnum || (Magnum = {}));
var Magnum;
(function (Magnum) {
    class FileIO {
        constructor() {
            this.filename = "";
            this.blob = null;
            this.xhr = null;
        }
        destructor() {
        }
        isInformationStatus() {
            return this.xhr.status >= 100 && this.xhr.status <= 199;
        }
        isSucceededStatus() {
            return this.xhr.status >= 200 && this.xhr.status <= 299;
        }
        isRedirectionStatus() {
            return this.xhr.status >= 300 && this.xhr.status <= 399;
        }
        isClientErrorStatus() {
            return this.xhr.status >= 400 && this.xhr.status <= 499;
        }
        isServerErrorStatus() {
            return this.xhr.status >= 500 && this.xhr.status <= 599;
        }
        isTimeout() {
            return this.xhr.status == 408;
        }
        getReadyState() {
            return this.xhr.readyState;
        }
        isUninitialized() {
            return this.xhr.readyState == FileIO.State.Uninitialized;
        }
        isOpen() {
            return this.xhr.readyState == FileIO.State.Open;
        }
        isSent() {
            return this.xhr.readyState == FileIO.State.Sent;
        }
        isReceiving() {
            return this.xhr.readyState == FileIO.State.Receiving;
        }
        isLoaded() {
            return this.xhr.readyState == FileIO.State.Loaded;
        }
        getBlob() {
            return this.blob;
        }
        open(filename, mode) {
            this.filename = filename;
            this.blob = null;
            this.xhr = new XMLHttpRequest();
            return true;
        }
        close() {
            this.filename = "";
            this.blob = null;
            if (this.xhr) {
                this.xhr.abort();
                this.xhr = null;
            }
        }
        read() {
            this.blob = null;
            this.xhr = new XMLHttpRequest();
            this.xhr.open("GET", this.filename, true);
            this.xhr.responseType = "blob";
            this.xhr.onreadystatechange = function () {
                if (this.xhr.readyState === 4) {
                    this.blob = this.xhr.response;
                }
            }.bind(this);
            this.xhr.onprogress = function (event) {
                if (event.lengthComputable) {
                    var percentComplete = event.loaded / event.total;
                }
            }.bind(this);
            this.xhr.send();
        }
    }
    Magnum.FileIO = FileIO;
    ;
    // inner class
    (function (FileIO) {
        let State;
        (function (State) {
            State[State["Uninitialized"] = 0] = "Uninitialized";
            State[State["Open"] = 1] = "Open";
            State[State["Sent"] = 2] = "Sent";
            State[State["Receiving"] = 3] = "Receiving";
            State[State["Loaded"] = 4] = "Loaded";
        })(State = FileIO.State || (FileIO.State = {}));
        ;
    })(FileIO = Magnum.FileIO || (Magnum.FileIO = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Console {
        constructor() {
        }
        destructor() {
        }
        static verbose(msg) {
            Magnum.Stage.consoleVerboseFunc(msg);
        }
        static debug(msg) {
            Magnum.Stage.consoleDebugFunc(msg);
        }
        static info(msg) {
            Magnum.Stage.consoleInfoFunc(msg);
        }
        static warning(msg) {
            Magnum.Stage.consoleWarningFunc(msg);
        }
        static error(msg) {
            Magnum.Stage.consoleErrorFunc(msg);
        }
        static assert(value, msg) {
            if (!value) {
                Magnum.Stage.consoleAssertFunc(msg);
            }
        }
    }
    Magnum.Console = Console;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class ResourceAccess {
        constructor(name) {
            this.name = name;
            this.file = null;
            this.valid = true;
            this.refCount = 0;
            this.state = ResourceAccess.State.Idle;
            this.parseStatus = ResourceAccess.ParseStatus.Parsing;
            this.onConstruct();
        }
        destructor() {
            this.onDestruct();
            this.closeFile();
        }
        onConstruct() {
            return true;
        }
        onParse(data) {
        }
        onDestruct() {
        }
        get Name() {
            return this.name;
        }
        /////////////////////
        // state
        setIdleState() {
            if (this.file) {
                this.file.close();
                this.file = null;
            }
            this.valid = true;
            this.state = ResourceAccess.State.Idle;
        }
        setLoadingState() {
            this.openFile();
            this.onDestruct();
            this.file.read();
            this.state = ResourceAccess.State.Loading;
        }
        setParsingState() {
            this.onParse(this.file.getBlob());
            this.parseStatus = ResourceAccess.ParseStatus.Parsing;
            this.state = ResourceAccess.State.Parsing;
        }
        setFailedState() {
            this.closeFile();
            this.state = ResourceAccess.State.Failed;
        }
        setReadyState() {
            this.closeFile();
            this.state = ResourceAccess.State.Ready;
        }
        getState() {
            return this.state;
        }
        isIdle() {
            return this.state == ResourceAccess.State.Idle;
        }
        isLoading() {
            return this.state == ResourceAccess.State.Loading;
        }
        isFailed() {
            return this.state == ResourceAccess.State.Failed;
        }
        isReady() {
            return this.state == ResourceAccess.State.Ready;
        }
        isLoadingFinished() {
            return this.file.isSucceededStatus();
        }
        isLoadingTimeOut() {
            return this.file.isClientErrorStatus() || this.file.isServerErrorStatus();
        }
        ////////////////////
        // parse State
        isParsing() {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.Parsing;
        }
        isParseSucceed() {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.ParseSucceed;
        }
        isParseFailed() {
            return this.state == ResourceAccess.State.Parsing && this.parseStatus == ResourceAccess.ParseStatus.ParseFailed;
        }
        setParsing() {
            this.parseStatus = ResourceAccess.ParseStatus.Parsing;
        }
        setParseSucceed() {
            this.parseStatus = ResourceAccess.ParseStatus.ParseSucceed;
        }
        setParseFailed() {
            this.parseStatus = ResourceAccess.ParseStatus.ParseFailed;
        }
        ////////////////////
        // valid
        invalidate() {
            this.valid = false;
        }
        validate() {
            this.valid = true;
        }
        isValid() {
            return this.valid;
        }
        /////////////////////
        // reference count
        addRef() {
            this.refCount++;
        }
        getRefCount() {
            return this.refCount;
        }
        release() {
            this.refCount--;
        }
        openFile() {
            var path = Magnum.Stage.getAssetRootDirectory() + this.name + "." + this.extension();
            //var path = Stage.getDocumentDirectory() + this.name + "." + this.extension();
            //var path = Stage.getExternalDirectory() + this.name + "." + this.extension();
            this.file = new Magnum.FileIO();
            if (!this.file.open(path, "b")) {
                Magnum.Console.debug("failed to open files " + path);
                return false;
            }
            return true;
        }
        closeFile() {
            if (this.file) {
                this.file.close();
                this.file = null;
            }
        }
        static extensionTag() {
            return "";
        }
        extension() {
            return "";
        }
        static get(name, extension) {
            var creator = ResourceAccess.Manager.getInstance().find(extension);
            if (creator) {
                return creator.get(name);
            }
            else
                return null;
        }
        static release(resourceAccess) {
            var creator = ResourceAccess.Manager.getInstance().find(resourceAccess.extension());
            if (creator)
                return creator.release(resourceAccess);
            else
                return null;
        }
    }
    Magnum.ResourceAccess = ResourceAccess;
    (function (ResourceAccess) {
        let ParseStatus;
        (function (ParseStatus) {
            ParseStatus[ParseStatus["Parsing"] = 0] = "Parsing";
            ParseStatus[ParseStatus["ParseSucceed"] = 1] = "ParseSucceed";
            ParseStatus[ParseStatus["ParseFailed"] = 2] = "ParseFailed";
        })(ParseStatus = ResourceAccess.ParseStatus || (ResourceAccess.ParseStatus = {}));
        ;
        let State;
        (function (State) {
            State[State["Idle"] = 0] = "Idle";
            State[State["Loading"] = 1] = "Loading";
            State[State["Parsing"] = 2] = "Parsing";
            State[State["Failed"] = 3] = "Failed";
            State[State["Ready"] = 4] = "Ready";
        })(State = ResourceAccess.State || (ResourceAccess.State = {}));
        ;
        class ICreator {
            constructor(extension) {
                this.resources = new Array(0);
                this.extension = extension;
            }
            destructor() {
                for (var i = 0; i < this.resources.length; i++) {
                    this.resources[i].destructor();
                    this.resources[i] = null;
                }
                this.resources = null;
            }
            find(name) {
                for (var i = 0; i < this.resources.length; i++) {
                    if (this.resources[i].Name == name)
                        return this.resources[i];
                }
                return null;
            }
            get(name) {
                return null;
            }
            create(name) {
                return null;
            }
            release(resourceAccess) {
                resourceAccess.release();
            }
            initiate() {
                return true;
            }
            get Extension() {
                return this.extension;
            }
            update() {
                var garbageResources = new Array(0);
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
            pause() {
            }
            resume() {
            }
            terminate() {
            }
            isReady() {
                for (var i = 0; i < this.resources.length; i++) {
                    if (!this.resources[i].isReady())
                        return false;
                }
                return true;
            }
        }
        ResourceAccess.ICreator = ICreator;
        ;
        class Creator extends ICreator {
            constructor(resourceAccessInterface) {
                super(resourceAccessInterface.extensionTag());
                this.resourceAccessInterface = resourceAccessInterface;
            }
            destructor() {
                super.destructor();
            }
            get(name) {
                var resource = this.find(name);
                if (resource)
                    return resource;
                else
                    return this.create(name);
            }
            create(name) {
                var resource = new this.resourceAccessInterface(name);
                resource.setIdleState();
                this.resources.push(resource);
                return resource;
            }
        }
        ResourceAccess.Creator = Creator;
        ;
        class Manager {
            constructor() {
                this.creators = new Array(0);
                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
                this.updateAssets = false;
            }
            destructor() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }
                this.creators = null;
                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
            }
            static getInstance() {
                if (ResourceAccess.Manager.instance == null) {
                    ResourceAccess.Manager.instance = new ResourceAccess.Manager();
                }
                return ResourceAccess.Manager.instance;
            }
            register(resourceAccessInterface) {
                this.creators.push(new ResourceAccess.Creator(resourceAccessInterface));
            }
            find(extension) {
                for (var i = 0; i < this.creators.length; i++) {
                    if (this.creators[i].Extension == extension)
                        return this.creators[i];
                }
                Magnum.Console.debug("ResourceAccess::Factory cannot find creator " + extension);
                return null;
            }
            beginUpdateResources(newReourceFiles, reloadResourceFiles, deleteReourceFiles) {
                this.newReourceFiles = newReourceFiles;
                this.reloadResourceFiles = reloadResourceFiles;
                this.deleteReourceFiles = deleteReourceFiles;
                this.updateAssets = true;
            }
            endUpdateResources() {
                this.updateAssets = false;
            }
            isUpdatingResources() {
                return this.updateAssets;
            }
            initiate() {
                for (var i = 0; i < this.creators.length; i++) {
                    if (!this.creators[i].initiate())
                        return false;
                }
                return true;
            }
            update() {
                if (this.isUpdatingResources()) {
                    this.endUpdateResources();
                }
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].update();
                }
            }
            pause() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].pause();
                }
            }
            resume() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].resume();
                }
            }
            terminate() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].terminate();
                }
                this.newReourceFiles = null;
                this.reloadResourceFiles = null;
                this.deleteReourceFiles = null;
            }
            isReady() {
                for (var i = 0; i < this.creators.length; i++) {
                    if (!this.creators[i].isReady())
                        return false;
                }
                return true;
            }
        }
        Manager.instance = null;
        ResourceAccess.Manager = Manager;
        ;
        class Service {
            static Name() {
                return "ResourceAccess";
            }
            static initiate() {
                return ResourceAccess.Manager.getInstance().initiate();
            }
            static update() {
                ResourceAccess.Manager.getInstance().update();
            }
            static pause() {
                ResourceAccess.Manager.getInstance().pause();
            }
            static resume() {
                ResourceAccess.Manager.getInstance().resume();
            }
            static terminate() {
                ResourceAccess.Manager.getInstance().terminate();
            }
        }
        ResourceAccess.Service = Service;
        ;
    })(ResourceAccess = Magnum.ResourceAccess || (Magnum.ResourceAccess = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Stack {
        constructor() {
            this.values = new Array(0);
        }
        destructor() {
            this.values = null;
        }
        push(t) {
            this.values.push(t);
        }
        pop() {
            return this.values.pop();
        }
        top() {
            if (this.values.length == 0)
                return null;
            else
                return this.values[this.values.length - 1];
        }
        length() {
            return this.values.length;
        }
        empty() {
            return this.values.length == 0;
        }
    }
    Magnum.Stack = Stack;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Scene {
        constructor() {
        }
        destructor() {
        }
        onConstruct() {
            return true;
        }
        onEnter() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
        }
        construct() {
            return this.onConstruct();
        }
        enter() {
            this.onEnter();
        }
        update() {
            this.onUpdate();
        }
        pause() {
            this.onPause();
        }
        resume() {
            this.onResume();
        }
        exit() {
            this.onExit();
        }
        destruct() {
            this.onDestruct();
        }
        isCurrent() {
            return Scene.Manager.getInstance().isCurrent(this);
        }
        static goto(name) {
            return Scene.Manager.getInstance().goto(name);
        }
        static call(name) {
            return Scene.Manager.getInstance().call(name);
        }
        static return() {
            return Scene.Manager.getInstance().return();
        }
        static getPreviousSceneName() {
            return Scene.Manager.getInstance().getPreviousSceneName();
        }
    }
    Magnum.Scene = Scene;
    (function (Scene) {
        class ICreator {
            constructor() {
            }
            destructor() {
            }
            Name() {
                return "";
            }
            create() {
                return null;
            }
        }
        Scene.ICreator = ICreator;
        ;
        class Creator extends ICreator {
            constructor(sceneInterface) {
                super();
                this.sceneInterface = sceneInterface;
            }
            destructor() {
                super.destructor();
            }
            Name() {
                return this.sceneInterface.Name();
            }
            create() {
                return new this.sceneInterface();
            }
        }
        Scene.Creator = Creator;
        ;
        let Command;
        (function (Command) {
            Command[Command["Update"] = 0] = "Update";
            Command[Command["Goto"] = 1] = "Goto";
            Command[Command["Call"] = 2] = "Call";
            Command[Command["Return"] = 3] = "Return";
        })(Command || (Command = {}));
        ;
        /**
         * @brief This is the Scene Factor
         */
        class Manager {
            constructor() {
                this.creators = new Array();
                this.creatorsStack = new Magnum.Stack();
                this.currentScene = null;
                this.nextCommand = Command.Update;
                this.nextSceneName = "";
                this.previousSceneName = "";
            }
            destructor() {
                this.previousSceneName = "";
                this.nextSceneName = "";
                this.nextCommand = Command.Update;
                if (this.currentScene) {
                    this.currentScene.destructor();
                    this.currentScene = null;
                }
                this.creatorsStack = null;
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }
                this.creators = null;
            }
            static getInstance() {
                if (Scene.Manager.instance == null) {
                    Scene.Manager.instance = new Scene.Manager();
                }
                return Scene.Manager.instance;
            }
            register(sceneInterface) {
                this.creators.push(new Scene.Creator(sceneInterface));
            }
            find(nextSceneName) {
                for (const creator of this.creators) {
                    if (creator.Name() == nextSceneName) {
                        return creator;
                    }
                }
                return null;
            }
            create(nextSceneName) {
                var sceneCreator = this.find(this.nextSceneName);
                if (sceneCreator == null)
                    return null;
                return sceneCreator.create();
            }
            isCurrent(scene) {
                return this.currentScene == scene;
            }
            goto(nextSceneName) {
                var nextSceneCreator = this.find(nextSceneName);
                if (nextSceneCreator == null) {
                    Magnum.Console.debug("Scene " + nextSceneName + " not available, Cannot goto Scene");
                    return false;
                }
                this.nextSceneName = nextSceneName;
                this.nextCommand = Command.Goto;
                return true;
            }
            call(nextSceneName) {
                var nextSceneCreator = this.find(nextSceneName);
                if (nextSceneCreator == null) {
                    Magnum.Console.debug("Scene " + nextSceneName + " not available, Cannot push Scene");
                    return false;
                }
                this.nextSceneName = nextSceneName;
                this.nextCommand = Command.Call;
                return true;
            }
            return() {
                if (this.creatorsStack.empty()) {
                    Magnum.Console.debug("Scene Stack Empty, Cannot pop Scene");
                    return false;
                }
                this.nextSceneName = "";
                this.nextCommand = Command.Return;
                return true;
            }
            getPreviousSceneName() {
                return this.previousSceneName;
            }
            initiate() {
                return true;
            }
            update() {
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
                                Magnum.Console.error("currentScene.construct() return false");
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
                                Magnum.Console.error("currentScene.construct() return false");
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
                                Magnum.Console.error("currentScene.construct() return false");
                            }
                        }
                        this.nextCommand = Command.Update;
                        break;
                }
                ;
            }
            pause() {
                if (this.currentScene) {
                    this.currentScene.pause();
                }
            }
            resume() {
                if (this.currentScene) {
                    this.currentScene.resume();
                }
            }
            terminate() {
                if (this.currentScene) {
                    this.currentScene.exit();
                    this.currentScene.destruct();
                    this.currentScene = null;
                }
            }
        }
        Manager.instance = null;
        Scene.Manager = Manager;
        class Service {
            static Name() {
                return "Scene";
            }
            static initiate() {
                return Scene.Manager.getInstance().initiate();
            }
            static update() {
                Scene.Manager.getInstance().update();
            }
            static pause() {
                Scene.Manager.getInstance().pause();
            }
            static resume() {
                Scene.Manager.getInstance().resume();
            }
            static terminate() {
                Scene.Manager.getInstance().terminate();
            }
        }
        Scene.Service = Service;
        ;
    })(Scene = Magnum.Scene || (Magnum.Scene = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Physics2 {
        constructor() {
        }
        destructor() {
        }
    }
    Magnum.Physics2 = Physics2;
    (function (Physics2) {
        class World {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics2.World = World;
        class Rigidbody {
            constructor() {
                var world = new World();
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics2.Rigidbody = Rigidbody;
        class Joint {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics2.Joint = Joint;
        class Manager {
            constructor() {
                this.worlds = new Array();
                this.rigidbodies = new Array();
                this.joints = new Array();
            }
            destructor() {
                this.joints = null;
                this.rigidbodies = null;
                this.worlds = null;
            }
            static getInstance() {
                if (Physics2.Manager.instance == null) {
                    Physics2.Manager.instance = new Physics2.Manager();
                }
                return Physics2.Manager.instance;
            }
            addWorld(world) {
                this.worlds.push(world);
            }
            removeWorld(world) {
                var idx = idx = this.worlds.indexOf(world);
                if (idx != -1)
                    this.worlds.splice(idx, 1);
            }
            findWorld(name) {
                for (const world of this.worlds) {
                    if (world.Name == name) {
                        return world;
                    }
                }
                return null;
            }
            addRigidbody(rigidbody) {
                this.rigidbodies.push(rigidbody);
            }
            removeRigidbody(rigidbody) {
                var idx = idx = this.rigidbodies.indexOf(rigidbody);
                if (idx != -1)
                    this.rigidbodies.splice(idx, 1);
            }
            findRigidbody(name) {
                for (const rigidbody of this.rigidbodies) {
                    if (rigidbody.Name == name) {
                        return rigidbody;
                    }
                }
                return null;
            }
            addJoint(joint) {
                this.joints.push(joint);
            }
            removeJoint(joint) {
                var idx = idx = this.joints.indexOf(joint);
                if (idx != -1)
                    this.joints.splice(idx, 1);
            }
            findJoint(name) {
                for (const joint of this.joints) {
                    if (joint.Name == name) {
                        return joint;
                    }
                }
                return null;
            }
            initiate() {
                return true;
            }
            update() {
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
            pause() {
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
            resume() {
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
            terminate() {
                this.rigidbodies = [];
                this.joints = [];
                this.worlds = [];
            }
        }
        Manager.instance = null;
        Physics2.Manager = Manager;
        class Service {
            static Name() {
                return "Physics2";
            }
            static initiate() {
                return Physics2.Manager.getInstance().initiate();
            }
            static update() {
                Physics2.Manager.getInstance().update();
            }
            static pause() {
                Physics2.Manager.getInstance().pause();
            }
            static resume() {
                Physics2.Manager.getInstance().resume();
            }
            static terminate() {
                Physics2.Manager.getInstance().terminate();
            }
        }
        Physics2.Service = Service;
        ;
    })(Physics2 = Magnum.Physics2 || (Magnum.Physics2 = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Physics3 {
        constructor() {
        }
        destructor() {
        }
    }
    Magnum.Physics3 = Physics3;
    (function (Physics3) {
        class World {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics3.World = World;
        class Rigidbody {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics3.Rigidbody = Rigidbody;
        class Joint {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Physics3.Joint = Joint;
        class Manager {
            constructor() {
                this.worlds = new Array();
                this.rigidbodies = new Array();
                this.joints = new Array();
            }
            destructor() {
                this.worlds = null;
                this.rigidbodies = null;
                this.joints = null;
            }
            static getInstance() {
                if (Physics3.Manager.instance == null) {
                    Physics3.Manager.instance = new Physics3.Manager();
                }
                return Physics3.Manager.instance;
            }
            addWorld(world) {
                this.worlds.push(world);
            }
            removeWorld(world) {
                var idx = idx = this.worlds.indexOf(world);
                if (idx != -1)
                    this.worlds.splice(idx, 1);
            }
            findWorld(name) {
                for (const world of this.worlds) {
                    if (world.Name == name) {
                        return world;
                    }
                }
                return null;
            }
            addRigidbody(rigidbody) {
                this.rigidbodies.push(rigidbody);
            }
            removeRigidbody(rigidbody) {
                var idx = idx = this.rigidbodies.indexOf(rigidbody);
                if (idx != -1)
                    this.rigidbodies.splice(idx, 1);
            }
            findRigidbody(name) {
                for (const rigidbody of this.rigidbodies) {
                    if (rigidbody.Name == name) {
                        return rigidbody;
                    }
                }
                return null;
            }
            addJoint(joint) {
                this.joints.push(joint);
            }
            removeJoint(joint) {
                var idx = idx = this.joints.indexOf(joint);
                if (idx != -1)
                    this.joints.splice(idx, 1);
            }
            findJoint(name) {
                for (const joint of this.joints) {
                    if (joint.Name == name) {
                        return joint;
                    }
                }
                return null;
            }
            initiate() {
                return true;
            }
            update() {
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
            pause() {
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
            resume() {
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
            terminate() {
                this.rigidbodies = [];
                this.joints = [];
                this.worlds = [];
            }
        }
        Manager.instance = null;
        Physics3.Manager = Manager;
        class Service {
            static Name() {
                return "Physics3";
            }
            static initiate() {
                return Physics3.Manager.getInstance().initiate();
            }
            static update() {
                Physics3.Manager.getInstance().update();
            }
            static pause() {
                Physics3.Manager.getInstance().pause();
            }
            static resume() {
                Physics3.Manager.getInstance().resume();
            }
            static terminate() {
                Physics3.Manager.getInstance().terminate();
            }
        }
        Physics3.Service = Service;
        ;
    })(Physics3 = Magnum.Physics3 || (Magnum.Physics3 = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Component {
        constructor(gameObject) {
            this.gameObject = null;
            this.guid = 0;
            this.name = "";
            this.active = true;
            this.gameObject = gameObject;
            this.gameObject.addComponent(this);
        }
        destructor() {
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
        construct() {
            return this.onConstruct();
        }
        start() {
            this.onStart();
        }
        update() {
            this.onUpdate();
        }
        pause() {
            this.onPause();
        }
        resume() {
            this.onResume();
        }
        stop() {
            this.onStop();
        }
        destruct() {
            this.onDestruct();
        }
        debugRender() {
            this.onDebugRender();
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
        static findComponentByName(name, className) {
            return Component.Manager.getInstance().findComponentByName(name, className);
        }
        static findComponentByGUID(guid, className) {
            return Component.Manager.getInstance().findComponentByGUID(guid, className);
        }
        select() {
            Component.selected = this;
        }
        unselect() {
            if (Component.selected == this) {
                Component.selected = this;
            }
        }
        isSelected() {
            return Component.selected == this;
        }
        static getSelected() {
            return Component.selected;
        }
    }
    Component.selected = null;
    Magnum.Component = Component;
    ;
    (function (Component) {
        class ICreator {
            constructor() {
                this.activeComponents = new Array();
                this.inactiveComponents = new Array();
            }
            destructor() {
            }
            ClassName() {
                return "";
            }
            create(gameObject, name) {
                return null;
            }
            release(component) {
                return true;
            }
            contains(component) {
                return this.activeComponents.indexOf(component) != -1;
            }
            getComponentsCount() {
                return this.activeComponents.length;
            }
            getComponent(i) {
                return this.activeComponents[i];
            }
            deleteActiveComponents() {
                this.activeComponents = [];
            }
            deleteInActiveComponents() {
                this.inactiveComponents = [];
            }
            findComponentByName(name) {
                for (const component of this.activeComponents) {
                    if (component.Name == name)
                        return component;
                }
                return null;
            }
            findComponentByGUID(guid) {
                for (const component of this.activeComponents) {
                    if (component.GUID == guid)
                        return component;
                }
                return null;
            }
            recycle() {
                this.deleteInActiveComponents();
            }
            update() {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.update();
                //}
            }
            pause() {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.pause();
                //}
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.pause();
                //}
            }
            resume() {
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.resume();
                //}
                //for (const activeComponent of this.activeComponents) {
                //activeComponent.resume();
                //}
            }
            clear() {
                this.deleteActiveComponents();
                this.deleteInActiveComponents();
            }
        }
        Component.ICreator = ICreator;
        ;
        //////////////////////////////////////////////////////////////////////////////////////
        class Creator extends ICreator {
            constructor(componentClassInterface) {
                super();
                this.componentClassInterface = componentClassInterface;
            }
            destructor() {
            }
            ClassName() {
                return this.componentClassInterface.ClassName();
            }
            create(gameObject, name) {
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
            release(component) {
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
        }
        Component.Creator = Creator;
        ;
        class Manager {
            constructor() {
                this.creators = new Array();
                this.nextGUID = 1;
            }
            destructor() {
            }
            static getInstance() {
                if (Component.Manager.instance == null) {
                    Component.Manager.instance = new Component.Manager();
                }
                return Component.Manager.instance;
            }
            register(componentClassInterface) {
                this.creators.push(new Component.Creator(componentClassInterface));
            }
            update() {
                for (const creator of this.creators) {
                    creator.update();
                }
                for (const creator of this.creators) {
                    creator.recycle();
                }
            }
            pause() {
                for (const creator of this.creators) {
                    creator.pause();
                }
            }
            resume() {
                for (const creator of this.creators) {
                    creator.resume();
                }
            }
            clear() {
                this.nextGUID = 1;
                for (const creator of this.creators) {
                    creator.clear();
                }
            }
            ////////////////////////////////////////////////////////////////////
            getNextUniqueID() {
                return this.nextGUID++;
            }
            findComponentByName(name, className) {
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
            findComponentByGUID(guid, className) {
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
            create(componentClassInterface, gameObject, name) {
                var creator = this.findCreator(componentClassInterface.ClassName());
                if (creator == null)
                    return null;
                return creator.create(gameObject, name);
            }
            release(component) {
                var creator = this.findCreatorByComponent(component);
                if (creator == null)
                    return false;
                creator.release(component);
                return true;
            }
            getCreatorsCount() {
                return this.creators.length;
            }
            getCreator(i) {
                return this.creators[i];
            }
            findCreatorByComponent(component) {
                for (const creator of this.creators) {
                    if (creator.contains(component))
                        return creator;
                }
                return null;
            }
            findCreator(className) {
                for (const creator of this.creators) {
                    if (creator.ClassName() == className)
                        return creator;
                }
                return null;
            }
        }
        Manager.instance = null;
        Component.Manager = Manager;
        ;
    })(Component = Magnum.Component || (Magnum.Component = {}));
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Color4 {
        constructor(v) {
            this.m = [];
            if (v != undefined)
                this.m = v;
            else
                this.m = [255, 255, 255, 255];
        }
        destructor() {
        }
        get R() {
            return this.m[0];
        }
        set R(value) {
            this.m[0] = value;
        }
        get G() {
            return this.m[1];
        }
        set G(value) {
            this.m[1] = value;
        }
        get B() {
            return this.m[2];
        }
        set B(value) {
            this.m[2] = value;
        }
        get A() {
            return this.m[3];
        }
        set A(value) {
            this.m[3] = value;
        }
        getValue(i) {
            return this.m[i];
        }
        setValue(i, value) {
            this.m[i] = value;
        }
    }
    Color4.Black = new Color4([0, 0, 0, 1]);
    Color4.Blue = new Color4([0, 0, 1, 1]);
    Color4.Green = new Color4([0, 1, 0, 1]);
    Color4.Cyan = new Color4([0, 1, 1, 1]);
    Color4.Red = new Color4([1, 0, 0, 1]);
    Color4.Mangenta = new Color4([1, 0, 1, 1]);
    Color4.Yellow = new Color4([1, 1, 0, 1]);
    Color4.White = new Color4([1, 1, 1, 1]);
    Magnum.Color4 = Color4;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Rectangle {
        constructor(v) {
            this.set(v);
        }
        destructor() {
        }
        set(v) {
            this.m = new Array(4);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get X() {
            return this.m[0];
        }
        set X(value) {
            this.m[0] = value;
        }
        get Y() {
            return this.m[1];
        }
        set Y(value) {
            this.m[1] = value;
        }
        get Width() {
            return this.m[2];
        }
        set Width(value) {
            this.m[2] = value;
        }
        get Height() {
            return this.m[3];
        }
        set Height(value) {
            this.m[3] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
    }
    Rectangle.Zero = new Rectangle([0, 0, 0, 0]);
    Rectangle.One = new Rectangle([-0.5, -0.5, 1, 1]);
    Magnum.Rectangle = Rectangle;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Component.ts" /> 
/// <reference path = "Color4.ts" /> 
/// <reference path = "Rectangle.ts" /> 
var Magnum;
(function (Magnum) {
    class Camera extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
            this.order = 0;
            this.targetLayer = 0;
            this.clearFlags = 0;
            this.clearColor = new Magnum.Color4();
            this.clearDepth = 1.0;
            this.clearStencil = 0;
            this.viewport = new Magnum.Rectangle();
            this.projectTransform = Magnum.Matrix4.Identity;
            this.projectTransformValid = false;
            Magnum.Video.Manager.getInstance().addCamera(this);
        }
        destructor() {
        }
        static ClassName() {
            return "Camera";
        }
        onConstruct() {
            return true;
        }
        onDestruct() {
            Magnum.Video.Manager.getInstance().removeCamera(this);
        }
        getOrder() {
            return 0;
        }
        get Order() {
            return this.order;
        }
        set Order(value) {
            this.order = value;
        }
        get TargetLayer() {
            return this.targetLayer;
        }
        set TargetLayer(value) {
            this.targetLayer = value;
        }
        get ClearFlags() {
            return this.clearFlags;
        }
        set ClearFlags(value) {
            this.clearFlags = value;
        }
        get ClearColor() {
            return this.clearColor;
        }
        set ClearColor(value) {
            this.clearColor = value;
        }
        get ClearDepth() {
            return this.clearDepth;
        }
        set ClearDepth(value) {
            this.clearDepth = value;
        }
        get ClearStencil() {
            return this.clearStencil;
        }
        set ClearStencil(value) {
            this.clearStencil = value;
        }
        get Viewport() {
            return this.viewport;
        }
        set Viewport(value) {
            this.viewport = value;
        }
        getProjectionTransform() {
            this.validateProjectionTransform();
            return this.projectTransform;
        }
        inValidateProjectionTransform() {
            this.projectTransformValid = false;
        }
        validateProjectionTransform() {
            if (this.projectTransformValid)
                return;
            this.projectTransform = this.onValidateProjectionTransform();
            this.projectTransformValid = true;
        }
        isProjectionTransformValid() {
            return this.projectTransformValid;
        }
        onValidateProjectionTransform() {
            return Magnum.Matrix4.Identity;
        }
    }
    Magnum.Camera = Camera;
    (function (Camera) {
        let ClearFlag;
        (function (ClearFlag) {
            ClearFlag[ClearFlag["None"] = 0] = "None";
            ClearFlag[ClearFlag["Color"] = 1] = "Color";
            ClearFlag[ClearFlag["Depth"] = 2] = "Depth";
            ClearFlag[ClearFlag["Stecil"] = 4] = "Stecil";
            ClearFlag[ClearFlag["SkyBox"] = 8] = "SkyBox";
        })(ClearFlag = Camera.ClearFlag || (Camera.ClearFlag = {}));
        ;
    })(Camera = Magnum.Camera || (Magnum.Camera = {}));
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Component.ts" /> 
var Magnum;
(function (Magnum) {
    class Renderer extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        onConstruct() {
            Magnum.Video.Manager.getInstance().addRenderer(this);
            return true;
        }
        onDestruct() {
            Magnum.Video.Manager.getInstance().removeRenderer(this);
        }
        getOrder() {
            return 0;
        }
        render(renderParam) {
        }
    }
    Magnum.Renderer = Renderer;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Vector3 {
        constructor(v) {
            this.set(v);
        }
        destructor() {
            this.m = null;
        }
        set(v) {
            this.m = new Array(3);
            if (v != undefined) {
                this.m[0] = v[0];
                this.m[1] = v[1];
                this.m[2] = v[2];
            }
            else {
                this.m[0] = 0;
                this.m[1] = 0;
                this.m[2] = 0;
            }
        }
        get X() {
            return this.m[0];
        }
        set X(value) {
            this.m[0] = value;
        }
        get Y() {
            return this.m[1];
        }
        set Y(value) {
            this.m[1] = value;
        }
        get Z() {
            return this.m[2];
        }
        set Z(value) {
            this.m[2] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        // comparison
        // arithmetic operations
        static add(v1, v2) {
            return new Vector3([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1], v1.m[2] + v2.m[2]]);
        }
        static sub(v1, v2) {
            return new Vector3([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1], v1.m[2] - v2.m[2]]);
        }
        static mul(v1, v2) {
            return new Vector3([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1], v1.m[2] * v2.m[2]]);
        }
        static neg(v) {
            return new Vector3([-v.m[0], -v.m[1], -v.m[2]]);
        }
        static scale(v1, scale) {
            return new Vector3([v1.m[0] * scale, v1.m[1] * scale, v1.m[2] * scale]);
        }
        /*
        public add(v: Vector3): Vector3 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];
            this.m[2] += v.m[2];

            return this;
        }

        public sub(v: Vector3): Vector3 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];
            this.m[2] -= v.m[2];

            return this;
        }

        public mul(v: Vector3): Vector3 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];
            this.m[2] *= v.m[2];

            return this;
        }

        public neg(): Vector3 {
            this.m[0] *= -1;
            this.m[1] *= -1;
            this.m[2] *= -1;

            return this;
        }

        public scale(scale: number): Vector3 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;

            return this;
        }
        */
        // vector operations
        length() {
            return Math.sqrt(this.squaredLength());
        }
        squaredLength() {
            return this.dot(this);
        }
        dot(v) {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1] + this.m[2] * v.m[2];
        }
        normalize() {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                this.m[2] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                this.m[2] *= len;
                return len;
            }
        }
        // The cross products are computed using the right-handed rule.  Be aware
        // that some graphics APIs use a left-handed rule.  If you have to compute
        // a cross product with these functions and send the result to the API
        // that expects left-handed, you will need to change sign on the vector
        // (replace each component value c by -c).
        cross(v) {
            return new Vector3([this.m[1] * v.m[2] - this.m[2] * v.m[1],
                this.m[2] * v.m[0] - this.m[0] * v.m[2],
                this.m[0] * v.m[1] - this.m[1] * v.m[0]]);
        }
        unitCross(v) {
            var cross = this.cross(v);
            cross.normalize();
            return cross;
        }
        // Compute the barycentric coordinates of the point with respect to the
        // tetrahedron <V0,V1,V2,V3>, P = b0*V0 + b1*V1 + b2*V2 + b3*V3, where
        // b0 + b1 + b2 + b3 = 1.
        getBarycentrics(v0, v1, v2, v3, bary) {
            // compute the vectors relative to V3 of the tetrahedron
            var akDiff = [
                Vector3.sub(v0, v3),
                Vector3.sub(v1, v3),
                Vector3.sub(v2, v3),
                Vector3.sub(this, v3)
            ];
            // If the vertices have large magnitude, the linear system of
            // equations for computing barycentric coordinates can be
            // ill-conditioned.  To avoid this, uniformly scale the tetrahedron
            // edges to be of order 1.  The scaling of all differences does not
            // change the barycentric coordinates.
            var fMax = 0.0;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var fValue = Math.abs(akDiff[i].m[j]);
                    if (fValue > fMax) {
                        fMax = fValue;
                    }
                }
            }
            // scale down only large data
            if (fMax > 1.0) {
                var fInvMax = 1.0 / fMax;
                for (var i = 0; i < 4; i++) {
                    akDiff[i] = Vector3.scale(akDiff[i], fInvMax);
                }
            }
            var fDet = akDiff[0].dot(akDiff[1].cross(akDiff[2]));
            var kE1cE2 = akDiff[1].cross(akDiff[2]);
            var kE2cE0 = akDiff[2].cross(akDiff[0]);
            var kE0cE1 = akDiff[0].cross(akDiff[1]);
            if (Math.abs(fDet) > 0.000001) {
                var fInvDet = 1.0 / fDet;
                bary[0] = akDiff[3].dot(kE1cE2) * fInvDet;
                bary[1] = akDiff[3].dot(kE2cE0) * fInvDet;
                bary[2] = akDiff[3].dot(kE0cE1) * fInvDet;
                bary[3] = 1.0 - bary[0] - bary[1] - bary[2];
            }
            else {
                // The tetrahedron is potentially flat.  Determine the face of
                // maximum area and compute barycentric coordinates with respect
                // to that face.
                var kE02 = Vector3.sub(v0, v2);
                var kE12 = Vector3.sub(v1, v2);
                var kE02cE12 = kE02.cross(kE12);
                var fMaxSqrArea = kE02cE12.squaredLength();
                var iMaxIndex = 3;
                var fSqrArea = kE0cE1.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 0;
                    fMaxSqrArea = fSqrArea;
                }
                fSqrArea = kE1cE2.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 1;
                    fMaxSqrArea = fSqrArea;
                }
                fSqrArea = kE2cE0.squaredLength();
                if (fSqrArea > fMaxSqrArea) {
                    iMaxIndex = 2;
                    fMaxSqrArea = fSqrArea;
                }
                if (fMaxSqrArea > 0.0000001) {
                    var fInvSqrArea = 1.0 / fMaxSqrArea;
                    var kTmp;
                    if (iMaxIndex == 0) {
                        kTmp = akDiff[3].cross(akDiff[1]);
                        bary[0] = kE0cE1.dot(kTmp) * fInvSqrArea;
                        kTmp = akDiff[0].cross(akDiff[3]);
                        bary[1] = kE0cE1.dot(kTmp) * fInvSqrArea;
                        bary[2] = 0.0;
                        bary[3] = 1.0 - bary[0] - bary[1];
                    }
                    else if (iMaxIndex == 1) {
                        bary[0] = 0.0;
                        kTmp = akDiff[3].cross(akDiff[2]);
                        bary[1] = kE1cE2.dot(kTmp) * fInvSqrArea;
                        kTmp = akDiff[1].cross(akDiff[3]);
                        bary[2] = kE1cE2.dot(kTmp) * fInvSqrArea;
                        bary[3] = 1.0 - bary[1] - bary[2];
                    }
                    else if (iMaxIndex == 2) {
                        kTmp = akDiff[2].cross(akDiff[3]);
                        bary[0] = kE2cE0.dot(kTmp) * fInvSqrArea;
                        bary[1] = 0.0;
                        kTmp = akDiff[3].cross(akDiff[0]);
                        bary[2] = kE2cE0.dot(kTmp) * fInvSqrArea;
                        bary[3] = 1.0 - bary[0] - bary[2];
                    }
                    else {
                        akDiff[3] = Vector3.sub(this, v2);
                        kTmp = akDiff[3].cross(kE12);
                        bary[0] = kE02cE12.dot(kTmp) * fInvSqrArea;
                        kTmp = kE02.cross(akDiff[3]);
                        bary[1] = kE02cE12.dot(kTmp) * fInvSqrArea;
                        bary[2] = 1.0 - bary[0] - bary[1];
                        bary[3] = 0.0;
                    }
                }
                else {
                    // The tetrahedron is potentially a sliver.  Determine the edge of
                    // maximum length and compute barycentric coordinates with respect
                    // to that edge.
                    var fMaxSqrLength = akDiff[0].squaredLength();
                    iMaxIndex = 0; // <V0,V3>
                    var fSqrLength = akDiff[1].squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 1; // <V1,V3>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = akDiff[2].squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 2; // <V2,V3>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = kE02.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 3; // <V0,V2>
                        fMaxSqrLength = fSqrLength;
                    }
                    fSqrLength = kE12.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 4; // <V1,V2>
                        fMaxSqrLength = fSqrLength;
                    }
                    var kE01 = Vector3.sub(v0, v1);
                    fSqrLength = kE01.squaredLength();
                    if (fSqrLength > fMaxSqrLength) {
                        iMaxIndex = 5; // <V0,V1>
                        fMaxSqrLength = fSqrLength;
                    }
                    if (fMaxSqrLength > 0.0000001) {
                        var fInvSqrLength = 1.0 / fMaxSqrLength;
                        if (iMaxIndex == 0) {
                            // P-V3 = t*(V0-V3)
                            bary[0] = akDiff[3].dot(akDiff[0]) * fInvSqrLength;
                            bary[1] = 0.0;
                            bary[2] = 0.0;
                            bary[3] = 1.0 - bary[0];
                        }
                        else if (iMaxIndex == 1) {
                            // P-V3 = t*(V1-V3)
                            bary[0] = 0.0;
                            bary[1] = akDiff[3].dot(akDiff[1]) * fInvSqrLength;
                            bary[2] = 0.0;
                            bary[3] = 1.0 - bary[1];
                        }
                        else if (iMaxIndex == 2) {
                            // P-V3 = t*(V2-V3)
                            bary[0] = 0.0;
                            bary[1] = 0.0;
                            bary[2] = akDiff[3].dot(akDiff[2]) * fInvSqrLength;
                            bary[3] = 1.0 - bary[2];
                        }
                        else if (iMaxIndex == 3) {
                            // P-V2 = t*(V0-V2)
                            akDiff[3] = Vector3.sub(this, v2);
                            bary[0] = akDiff[3].dot(kE02) * fInvSqrLength;
                            bary[1] = 0.0;
                            bary[2] = 1.0 - bary[0];
                            bary[3] = 0.0;
                        }
                        else if (iMaxIndex == 4) {
                            // P-V2 = t*(V1-V2)
                            akDiff[3] = Vector3.sub(this, v2);
                            bary[0] = 0.0;
                            bary[1] = akDiff[3].dot(kE12) * fInvSqrLength;
                            bary[2] = 1.0 - bary[1];
                            bary[3] = 0.0;
                        }
                        else {
                            // P-V1 = t*(V0-V1)
                            akDiff[3] = Vector3.sub(this, v1);
                            bary[0] = akDiff[3].dot(kE01) * fInvSqrLength;
                            bary[1] = 1.0 - bary[0];
                            bary[2] = 0.0;
                            bary[3] = 0.0;
                        }
                    }
                    else {
                        // tetrahedron is a nearly a point, just return equal weights
                        bary[0] = 0.25;
                        bary[1] = bary[0];
                        bary[2] = bary[0];
                        bary[3] = bary[0];
                    }
                }
            }
        }
        // Gram-Schmidt orthonormalization.  Take linearly independent vectors
        // U, V, and W and compute an orthonormal set (unit length, mutually
        // perpendicular).
        static orthonormalize(u, v, w) {
            // If the input vectors are v0, v1, and v2, then the Gram-Schmidt
            // orthonormalization produces vectors u0, u1, and u2 as follows,
            //
            //   u0 = v0/|v0|
            //   u1 = (v1-(u0*v1)u0)/|v1-(u0*v1)u0|
            //   u2 = (v2-(u0*v2)u0-(u1*v2)u1)/|v2-(u0*v2)u0-(u1*v2)u1|
            //
            // where |A| indicates length of vector A and A*B indicates dot
            // product of vectors A and B.
            // compute u0
            u.normalize();
            // compute u1
            var fDot0 = u.dot(v);
            v = Vector3.sub(v, Vector3.scale(u, fDot0));
            v.normalize();
            // compute u2
            var fDot1 = v.dot(w);
            fDot0 = u.dot(w);
            w = Vector3.sub(w, Vector3.scale(u, fDot0));
            w = Vector3.sub(v, Vector3.scale(v, fDot1));
            w.normalize();
        }
        // Input W must be initialized to a nonzero vector, output is {U,V,W},
        // an orthonormal basis.  A hint is provided about whether or not W
        // is already unit length.
        static generateOrthonormalBasis(u, v, w, unitLengthW) {
            if (!unitLengthW) {
                w.normalize();
            }
            var fInvLength;
            if (Math.abs(w.m[0]) >= Math.abs(w.m[1])) {
                // W.x or W.z is the largest magnitude component, swap them
                fInvLength = 1.0 / Math.sqrt(w.m[0] * w.m[0] + w.m[2] * w.m[2]);
                u.m[0] = -w.m[2] * fInvLength;
                u.m[1] = 0.0;
                u.m[2] = +w.m[0] * fInvLength;
                v.m[0] = w.m[1] * u.m[2];
                v.m[1] = w.m[2] * u.m[0] - w.m[0] * u.m[2];
                v.m[2] = -w.m[1] * u.m[0];
            }
            else {
                // W.y or W.z is the largest magnitude component, swap them
                fInvLength = 1.0 / Math.sqrt(w.m[1] * w.m[1] + w.m[2] * w.m[2]);
                u.m[0] = 0.0;
                u.m[1] = +w.m[2] * fInvLength;
                u.m[2] = -w.m[1] * fInvLength;
                v.m[0] = w.m[1] * u.m[2] - w.m[2] * u.m[1];
                v.m[1] = -w.m[0] * u.m[2];
                v.m[2] = w.m[0] * u.m[1];
            }
        }
        // Compute the extreme values.
        static computeExtremes(akPoints, rkMin, rkMax) {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i < akPoints.length; i++) {
                var rkPoint = akPoints[i];
                for (var j = 0; j < 3; j++) {
                    if (rkPoint.m[j] < rkMin.m[j]) {
                        rkMin.m[j] = rkPoint.m[j];
                    }
                    else if (rkPoint.m[j] > rkMax.m[j]) {
                        rkMax.m[j] = rkPoint.m[j];
                    }
                }
            }
        }
    }
    Vector3.Zero = new Vector3([0, 0, 0]);
    Vector3.UnitX = new Vector3([1, 0, 0]);
    Vector3.UnitY = new Vector3([0, 1, 0]);
    Vector3.UnitZ = new Vector3([0, 0, 1]);
    Vector3.One = new Vector3([1, 1, 1]);
    Magnum.Vector3 = Vector3;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Vector4 {
        constructor(v) {
            this.set(v);
        }
        destructor() {
            this.m = null;
        }
        set(v) {
            this.m = new Array(4);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get X() {
            return this.m[0];
        }
        set X(value) {
            this.m[0] = value;
        }
        get Y() {
            return this.m[1];
        }
        set Y(value) {
            this.m[1] = value;
        }
        get Z() {
            return this.m[2];
        }
        set Z(value) {
            this.m[2] = value;
        }
        get W() {
            return this.m[3];
        }
        set W(value) {
            this.m[3] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        // comparison
        // arithmetic operations
        static add(v1, v2) {
            return new Vector4([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1], v1.m[2] + v2.m[2], v1.m[3] + v2.m[3]]);
        }
        static sub(v1, v2) {
            return new Vector4([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1], v1.m[2] - v2.m[2], v1.m[3] - v2.m[3]]);
        }
        static mul(v1, v2) {
            return new Vector4([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1], v1.m[2] * v2.m[2], v1.m[3] * v2.m[3]]);
        }
        static neg(v) {
            return new Vector4([-v.m[0], -v.m[1], -v.m[2], -v.m[3]]);
        }
        static scale(v1, scale) {
            return new Vector4([v1.m[0] * scale, v1.m[1] * scale, v1.m[2] * scale, v1.m[3] * scale]);
        }
        /*
        public add(v: Vector4): Vector4 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];
            this.m[2] += v.m[2];
            this.m[3] += v.m[3];

            return this;
        }

        public sub(v: Vector4): Vector4 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];
            this.m[2] -= v.m[2];
            this.m[3] -= v.m[3];

            return this;
        }

        public mul(v: Vector4): Vector4 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];
            this.m[2] *= v.m[2];
            this.m[3] *= v.m[3];

            return this;
        }

        public neg(): Vector4 {
            this.m[0] *= -1;
            this.m[1] *= -1;
            this.m[2] *= -1;
            this.m[3] *= -1;

            return this;
        }

        public scale(scale: number): Vector4 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            return this;
        }
        */
        // vector operations
        length() {
            return Math.sqrt(this.squaredLength());
        }
        squaredLength() {
            return this.dot(this);
        }
        dot(v) {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1] + this.m[2] * v.m[2] + this.m[3] * v.m[3];
        }
        normalize() {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                this.m[2] = 0.0;
                this.m[3] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                this.m[2] *= len;
                this.m[3] *= len;
                return len;
            }
        }
        // Compute the extreme values.
        static computeExtremes(akPoints, rkMin, rkMax) {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i < akPoints.length; i++) {
                var rkPoint = akPoints[i];
                for (var j = 0; j < 4; j++) {
                    if (rkPoint.m[j] < rkMin.m[j]) {
                        rkMin.m[j] = rkPoint.m[j];
                    }
                    else if (rkPoint.m[j] > rkMax.m[j]) {
                        rkMax.m[j] = rkPoint.m[j];
                    }
                }
            }
        }
    }
    Vector4.Zero = new Vector4([0, 0, 0, 0]);
    Vector4.UnitX = new Vector4([1, 0, 0, 0]);
    Vector4.UnitY = new Vector4([0, 1, 0, 0]);
    Vector4.UnitZ = new Vector4([0, 0, 1, 0]);
    Vector4.UnitW = new Vector4([0, 0, 0, 1]);
    Vector4.One = new Vector4([1, 1, 1, 1]);
    Magnum.Vector4 = Vector4;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Vector3.ts" /> 
var Magnum;
(function (Magnum) {
    class Quaternion {
        constructor(v) {
            this.set(v);
        }
        destructor() {
        }
        set(v) {
            this.m = new Array(4);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get W() {
            return this.m[0];
        }
        set W(value) {
            this.m[0] = value;
        }
        get X() {
            return this.m[1];
        }
        set X(value) {
            this.m[1] = value;
        }
        get Y() {
            return this.m[2];
        }
        set Y(value) {
            this.m[2] = value;
        }
        set Z(value) {
            this.m[3] = value;
        }
        get Z() {
            return this.m[3];
        }
        member() {
            return this.m;
        }
        ;
        // arithmetic operations
        static add(q1, q2) {
            return new Quaternion([q1.m[0] + q2.m[0], q1.m[1] + q2.m[1], q1.m[2] + q2.m[2], q1.m[3] + q2.m[3]]);
        }
        static sub(q1, q2) {
            return new Quaternion([q1.m[0] - q2.m[0], q1.m[1] - q2.m[1], q1.m[2] - q2.m[2], q1.m[3] - q2.m[3]]);
        }
        static mul(q1, q2) {
            var kProd = new Quaternion();
            kProd.m[0] =
                q1.m[0] * q2.m[0] -
                    q1.m[1] * q2.m[1] -
                    q1.m[2] * q2.m[2] -
                    q1.m[3] * q2.m[3];
            kProd.m[1] =
                q1.m[0] * q2.m[1] +
                    q1.m[1] * q2.m[0] +
                    q1.m[2] * q2.m[3] -
                    q1.m[3] * q2.m[2];
            kProd.m[2] =
                q1.m[0] * q2.m[2] +
                    q1.m[2] * q2.m[0] +
                    q1.m[3] * q2.m[1] -
                    q1.m[1] * q2.m[3];
            kProd.m[3] =
                q1.m[0] * q2.m[3] +
                    q1.m[3] * q2.m[0] +
                    q1.m[1] * q2.m[2] -
                    q1.m[2] * q2.m[1];
            return kProd;
        }
        static neg(q) {
            return new Quaternion([-q.m[0], -q.m[1], -q.m[2], -q.m[3]]);
        }
        static scale(q, scale) {
            return new Quaternion([q.m[0] * scale, q.m[1] * scale, q.m[2] * scale, q.m[3] * scale]);
        }
        /*
        public add(q: Quaternion): Quaternion {
            this.m[0] += q.m[0];
            this.m[1] += q.m[1];
            this.m[2] += q.m[2];
            this.m[3] += q.m[3];

            return this;
        }

        public sub(q: Quaternion): Quaternion {
            this.m[0] -= q.m[0];
            this.m[1] -= q.m[1];
            this.m[2] -= q.m[2];
            this.m[3] -= q.m[3];

            return this;
        }

        public mul(q: Quaternion): Quaternion {
            var temp = this;

            this.m[0] =
                temp.m[0] * q.m[0] -
                temp.m[1] * q.m[1] -
                temp.m[2] * q.m[2] -
                temp.m[3] * q.m[3];

            this.m[1] =
                temp.m[0] * q.m[1] +
                temp.m[1] * q.m[0] +
                temp.m[2] * q.m[3] -
                temp.m[3] * q.m[2];

            this.m[2] =
                temp.m[0] * q.m[2] +
                temp.m[2] * q.m[0] +
                temp.m[3] * q.m[1] -
                temp.m[1] * q.m[3];

            this.m[3] =
                temp.m[0] * q.m[3] +
                temp.m[3] * q.m[0] +
                temp.m[1] * q.m[2] -
                temp.m[2] * q.m[1];

            return this;
        }

        public neg(): Quaternion {
            this.m[0] = -this.m[0];
            this.m[1] = -this.m[1];
            this.m[2] = -this.m[2];
            this.m[3] = -this.m[3];

            return this;
        }


        public scale(scale: number): Quaternion {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            return this;
        }
        */
        // conversion between quaternions, matrices, and axis-angle
        /*
        public ToMatrix(): Matrix4
        {
        }

        public ToAxisAngle(): AxisAngle
        {
        }

        public ToEuler(): Euler
        {
        }
        */
        // vector operations
        length() {
            return Math.sqrt(this.squaredLength());
        }
        squaredLength() {
            return this.dot(this);
        }
        dot(v) {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1] + this.m[2] * v.m[2] + this.m[3] * v.m[3];
        }
        normalize() {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                this.m[2] = 0.0;
                this.m[3] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] /= len;
                this.m[1] /= len;
                this.m[2] /= len;
                this.m[3] /= len;
                return len;
            }
        }
        inverse() {
            var kInverse = new Quaternion();
            var fNorm = 0.0;
            for (var i = 0; i < 4; i++) {
                fNorm += this.m[i] * this.m[i];
            }
            if (fNorm > 0.00001) {
                var fInvNorm = 1.0 / fNorm;
                kInverse.m[0] = this.m[0] * fInvNorm;
                kInverse.m[1] = -this.m[1] * fInvNorm;
                kInverse.m[2] = -this.m[2] * fInvNorm;
                kInverse.m[3] = -this.m[3] * fInvNorm;
            }
            else {
                kInverse.m[0] = 0.0;
                kInverse.m[1] = 0.0;
                kInverse.m[2] = 0.0;
                kInverse.m[3] = 0.0;
            }
            return kInverse;
        }
        conjugate() {
            return new Quaternion([this.m[0], -this.m[1], -this.m[2], -this.m[3]]);
        }
        exp() {
            // If q = A*(x*i+y*j+z*k) where (x,y,z) is unit length, then
            // exp(q) = cos(A)+sin(A)*(x*i+y*j+z*k).  If sin(A) is near zero,
            // use exp(q) = cos(A)+A*(x*i+y*j+z*k) since A/sin(A) has limit 1.
            var kResult = new Quaternion();
            var fAngle = Math.sqrt(this.m[1] * this.m[1] + this.m[2] * this.m[2] + this.m[3] * this.m[3]);
            var fSin = Math.sin(fAngle);
            kResult.m[0] = Math.cos(fAngle);
            if (Math.abs(fSin) >= 0.000001) {
                var fCoeff = fSin / fAngle;
                for (var i = 1; i <= 3; i++) {
                    kResult.m[i] = fCoeff * this.m[i];
                }
            }
            else {
                for (i = 1; i <= 3; i++) {
                    kResult.m[i] = this.m[i];
                }
            }
            return kResult;
        }
        log() {
            // If q = cos(A)+sin(A)*(x*i+y*j+z*k) where (x,y,z) is unit length, then
            // log(q) = A*(x*i+y*j+z*k).  If sin(A) is near zero, use log(q) =
            // sin(A)*(x*i+y*j+z*k) since sin(A)/A has limit 1.
            var kResult = new Quaternion();
            kResult.m[0] = 0.0;
            if (Math.abs(this.m[0]) < 1.0) {
                var fAngle = Math.cos(this.m[0]);
                var fSin = Math.sin(fAngle);
                if (Math.abs(fSin) >= 0.0000001) {
                    var fCoeff = fAngle / fSin;
                    for (var i = 1; i <= 3; i++) {
                        kResult.m[0] = fCoeff * this.m[0];
                    }
                    return kResult;
                }
            }
            for (var i = 1; i <= 3; i++) {
                kResult.m[i] = this.m[i];
            }
            return kResult;
        }
        // rotation of a vector by a quaternion
        rotate(rkVector) {
            // Given a vector u = (x0,y0,z0) and a unit length quaternion
            // q = <w,x,y,z>, the vector v = (x1,y1,z1) which represents the
            // rotation of u by q is v = q*u*q^{-1} where * indicates quaternion
            // multiplication and where u is treated as the quaternion <0,x0,y0,z0>.
            // Note that q^{-1} = <w,-x,-y,-z>, so no float work is required to
            // invert q.  Now
            //
            //   q*u*q^{-1} = q*<0,x0,y0,z0>*q^{-1}
            //     = q*(x0*i+y0*j+z0*k)*q^{-1}
            //     = x0*(q*i*q^{-1})+y0*(q*j*q^{-1})+z0*(q*k*q^{-1})
            //
            // As 3-vectors, q*i*q^{-1}, q*j*q^{-1}, and 2*k*q^{-1} are the columns
            // of the rotation matrix computed in Quaternion::ToRotationMatrix.
            // The vector v is obtained as the product of that rotation matrix with
            // vector u.  As such, the quaternion representation of a rotation
            // matrix requires less space than the matrix and more time to compute
            // the rotated vector.  Typical space-time tradeoff...
            // var kRot = this.toMatrix();
            // return kRot.multiply(rkVector);
            return Magnum.Vector3.Zero;
        }
        // spherical linear interpolation
        static slerp(t, p, q) {
            var fCos = p.dot(q);
            var fAngle = Math.acos(fCos);
            if (Math.abs(fAngle) >= 0.000001) {
                var fSin = Math.sin(fAngle);
                var fInvSin = 1.0 / fSin;
                var fCoeff0 = Math.sin((1.0 - t) * fAngle) * fInvSin;
                var fCoeff1 = Math.sin(t * fAngle) * fInvSin;
                return Quaternion.add(Quaternion.scale(p, fCoeff0), Quaternion.scale(q, fCoeff1));
            }
            else {
                return new Quaternion([p.m[0], p.m[1], p.m[2], p.m[3]]);
            }
        }
        static slerpExtraSpins(t, p, q, extraSpin) {
            var fCos = p.dot(q);
            var fAngle = Math.acos(fCos);
            if (Math.abs(fAngle) >= 0.000001) {
                var fSin = Math.sin(fAngle);
                var fPhase = Math.PI * extraSpin * t;
                var fInvSin = 1.0 / fSin;
                var fCoeff0 = Math.sin((1.0 - t) * fAngle - fPhase) * fInvSin;
                var fCoeff1 = Math.sin(t * fAngle + fPhase) * fInvSin;
                return Quaternion.add(Quaternion.scale(p, fCoeff0), Quaternion.scale(q, fCoeff1));
            }
            else {
                return new Quaternion([p.m[0], p.m[1], p.m[2], p.m[3]]);
            }
        }
        // intermediate terms for spherical quadratic interpolation
        static intermediate(q0, q1, q2) {
            // assert:  Q0, Q1, Q2 all unit-length
            var kQ1Inv = q1.conjugate();
            var kP0 = Quaternion.mul(kQ1Inv, q0);
            var kP2 = Quaternion.mul(kQ1Inv, q2);
            var kArg = Quaternion.scale(Quaternion.add(kP0.log(), kP2.log()), -0.25);
            var kA = Quaternion.mul(q1, kArg.exp());
            return kA;
        }
        // spherical quadratic interpolation
        static squad(t, q0, a0, a1, q1) {
            var fSlerpT = 2 * t * (1.0 - t);
            var kSlerpP = Quaternion.slerp(t, q0, q1);
            var kSlerpQ = Quaternion.slerp(t, a0, a1);
            return Quaternion.slerp(t, kSlerpP, kSlerpQ);
        }
        // Compute a quaternion that rotates unit-length vector V1 to unit-length
        // vector V2.  The rotation is about the axis perpendicular to both V1 and
        // V2, with angle of that between V1 and V2.  If V1 and V2 are parallel,
        // any axis of rotation will do, such as the permutation (z2,x2,y2), where
        // V2 = (x2,y2,z2).
        static align(v1, v2) {
            // If V1 and V2 are not parallel, the axis of rotation is the unit-length
            // vector U = Cross(V1,V2)/Length(Cross(V1,V2)).  The angle of rotation,
            // A, is the angle between V1 and V2.  The quaternion for the rotation is
            // q = cos(A/2) + sin(A/2)*(ux*i+uy*j+uz*k) where U = (ux,uy,uz).
            //
            // (1) Rather than extract A = acos(Dot(V1,V2)), multiply by 1/2, then
            //     compute sin(A/2) and cos(A/2), we reduce the computational costs by
            //     computing the bisector B = (V1+V2)/Length(V1+V2), so cos(A/2) =
            //     Dot(V1,B).
            //
            // (2) The rotation axis is U = Cross(V1,B)/Length(Cross(V1,B)), but
            //     Length(Cross(V1,B)) = Length(V1)*Length(B)*sin(A/2) = sin(A/2), in
            //     which case sin(A/2)*(ux*i+uy*j+uz*k) = (cx*i+cy*j+cz*k) where
            //     C = Cross(V1,B).
            //
            // If V1 = V2, then B = V1, cos(A/2) = 1, and U = (0,0,0).  If V1 = -V2,
            // then B = 0.  This can happen even if V1 is approximately -V2 using
            // floating point arithmetic, since Vector3::Normalize checks for
            // closeness to zero and returns the zero vector accordingly.  The test
            // for exactly zero is usually not recommend for floating point
            // arithmetic, but the implementation of Vector3::Normalize guarantees
            // the comparison is robust.  In this case, the A = pi and any axis
            // perpendicular to V1 may be used as the rotation axis.
            var kResult = new Quaternion();
            var kBisector = Magnum.Vector3.add(v1, v2);
            kBisector.normalize();
            var fCosHalfAngle = v1.dot(kBisector);
            kResult.m[0] = fCosHalfAngle;
            if (fCosHalfAngle != 0.0) {
                var kCross = v1.cross(kBisector);
                kResult.m[1] = kCross.X;
                kResult.m[2] = kCross.Y;
                kResult.m[3] = kCross.Z;
            }
            else {
                var fInvLength;
                if (Math.abs(v1[0]) >= Math.abs(v1[1])) {
                    // V1.x or V1.z is the largest magnitude component
                    fInvLength = 1.0 / Math.sqrt(v1[0] * v1[0] + v1[2] * v1[2]);
                    kResult.m[1] = -v1[2] * fInvLength;
                    kResult.m[2] = 0.0;
                    kResult.m[3] = +v1[0] * fInvLength;
                }
                else {
                    // V1.y or V1.z is the largest magnitude component
                    fInvLength = 1.0 / Math.sqrt(v1[1] * v1[1] + v1[2] * v1[2]);
                    kResult.m[1] = 0.0;
                    kResult.m[2] = +v1[2] * fInvLength;
                    kResult.m[3] = -v1[1] * fInvLength;
                }
            }
            return kResult;
        }
        // Decompose a quaternion into q = q_twist * q_swing, where q is 'this'
        // quaternion.  If V1 is the input axis and V2 is the rotation of V1 by
        // q, q_swing represents the rotation about the axis perpendicular to
        // V1 and V2 (see Quaternion::Align), and q_twist is a rotation about V1.
        decomposeTwistTimesSwing(v1, qTwist, qSwing) {
            // var v2 = this.rotate(v1);
            // qSwing = this.align(v1, v2);
            // qTwist = this.multiply(qSwing.conjugate());
        }
        // Decompose a quaternion into q = q_swing * q_twist, where q is 'this'
        // quaternion.  If V1 is the input axis and V2 is the rotation of V1 by
        // q, q_swing represents the rotation about the axis perpendicular to
        // V1 and V2 (see Quaternion::Align), and q_twist is a rotation about V1.
        decomposeSwingTimesTwist(v1, qSwing, qTwist) {
            // var v2 = this.rotate(v1);
            // qSwing = this.align(v1, v2);
            // qTwist = qSwing.conjugate().multiply(this);         
        }
    }
    Quaternion.Zero = new Quaternion([0, 0, 0, 0]);
    Quaternion.Identity = new Quaternion([1, 0, 0, 0]);
    Magnum.Quaternion = Quaternion;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Quaternion.ts" /> 
var Magnum;
(function (Magnum) {
    class Matrix4 {
        // Create a matrix from an array of numbers.  The input array is
        // interpreted based on the Boolean input as
        //   true:  entry[0..15]={m00,m01,m02,m03,m10,m11,m12,m13,m20,m21,m22,
        //                        m23,m30,m31,m32,m33} [row major]
        //   false: entry[0..15]={m00,m10,m20,m30,m01,m11,m21,m31,m02,m12,m22,
        //                        m32,m03,m13,m23,m33} [col major]        
        constructor(v, rowMajor) {
            this.set(v, rowMajor);
        }
        destructor() {
        }
        set(v, rowMajor) {
            this.m = new Array(16);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 4; c++) {
                        for (var r = 0; r < 4; r++) {
                            this.m[r * 4 + c] = v[i];
                            i++;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        ;
        toArray() {
            return this.m.slice(0);
        }
        ;
        toArrayTranpose() {
            return [
                this.m[0], this.m[4], this.m[8], this.m[12],
                this.m[1], this.m[5], this.m[9], this.m[13],
                this.m[2], this.m[6], this.m[10], this.m[14],
                this.m[3], this.m[7], this.m[11], this.m[15]
            ];
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        initZero() {
            this.m[0] = 0;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = 0;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = 0;
            this.m[11] = 0;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 0;
        }
        initIdentity() {
            this.m[0] = 1;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = 1;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = 1;
            this.m[11] = 0;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }
        initTranslate(x, y, z) {
            this.initIdentity();
            this.m[3] = x;
            this.m[7] = y;
            this.m[11] = z;
        }
        initRotateX(angle) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);
            this.m[5] = cosine;
            this.m[9] = sine;
            this.m[6] = -sine;
            this.m[10] = cosine;
        }
        initRotateY(angle) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);
            this.m[0] = cosine;
            this.m[8] = -sine;
            this.m[2] = sine;
            this.m[10] = cosine;
        }
        initRotateZ(angle) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);
            this.m[0] = cosine;
            this.m[4] = sine;
            this.m[1] = -sine;
            this.m[5] = cosine;
        }
        initRotateZXY(rz, rx, ry) {
            this.initTranslateRotZYXScale(0, 0, 0, rz, ry, rx, 1);
        }
        initRotateZYX(rz, ry, rx) {
            this.initTranslateRotZYXScale(0, 0, 0, rz, ry, rx, 1);
        }
        initRotateAxisAngle(axis, angle) {
            var radian = angle * Math.PI / 180.0;
            var fCos = Math.cos(-radian);
            var fSin = Math.sin(-radian);
            var fOneMinusCos = 1.0 - fCos;
            var fX2 = axis.X * axis.X;
            var fY2 = axis.Y * axis.Y;
            var fZ2 = axis.Z * axis.Z;
            var fXYM = axis.X * axis.Y * fOneMinusCos;
            var fXZM = axis.X * axis.Z * fOneMinusCos;
            var fYZM = axis.Y * axis.Z * fOneMinusCos;
            var fXSin = axis.X * fSin;
            var fYSin = axis.Y * fSin;
            var fZSin = axis.Z * fSin;
            this.initIdentity();
            this.m[0] = fX2 * fOneMinusCos + fCos;
            this.m[1] = fXYM + fZSin;
            this.m[2] = fXZM - fYSin;
            this.m[4] = fXYM - fZSin;
            this.m[5] = fY2 * fOneMinusCos + fCos;
            this.m[6] = fYZM + fXSin;
            this.m[8] = fXZM + fYSin;
            this.m[9] = fYZM - fXSin;
            this.m[10] = fZ2 * fOneMinusCos + fCos;
        }
        initScale(x, y, z) {
            this.m[0] = x;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = y;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = z;
            this.m[11] = 0;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }
        initTranslateRotZXYScale(tx, ty, tz, rz, rx, ry, scale) {
            this.fromEulerAnglesZXY(rz, rx, ry);
            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;
            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;
            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;
            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }
        initTranslateRotZYXScale(tx, ty, tz, rz, ry, rx, scale) {
            this.fromEulerAnglesZYX(rz, rx, ry);
            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;
            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;
            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;
            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }
        initTranslateRotAxisAngleScale(tx, ty, tz, axis, angle, scale) {
            this.initRotateAxisAngle(axis, angle);
            this.m[0] *= scale;
            this.m[4] *= scale;
            this.m[8] *= scale;
            this.m[1] *= scale;
            this.m[5] *= scale;
            this.m[9] *= scale;
            this.m[2] *= scale;
            this.m[6] *= scale;
            this.m[10] *= scale;
            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }
        initTranslateScale(tx, ty, tz, scale) {
            this.initScale(scale, scale, scale);
            this.m[3] = tx;
            this.m[7] = ty;
            this.m[11] = tz;
        }
        initLookAt(position, object, upward) {
            this.initLookAtScale(position, object, upward, 1.0);
        }
        initLookAtScale(position, object, upward, scale) {
            var zaxis = Magnum.Vector3.sub(position, object);
            zaxis.normalize();
            var yaxis = Magnum.Vector3.sub(upward, Magnum.Vector3.scale(zaxis, upward.dot(zaxis)));
            yaxis.normalize();
            var xaxis = yaxis.cross(zaxis);
            if (scale != 1.0) {
                xaxis = Magnum.Vector3.scale(xaxis, scale);
                yaxis = Magnum.Vector3.scale(yaxis, scale);
                zaxis = Magnum.Vector3.scale(zaxis, scale);
            }
            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = zaxis.X;
            this.m[3] = position.X;
            this.m[4] = xaxis.Y;
            this.m[5] = yaxis.Y;
            this.m[6] = zaxis.Y;
            this.m[7] = position.Y;
            this.m[8] = xaxis.Z;
            this.m[9] = yaxis.Z;
            this.m[10] = zaxis.Z;
            this.m[11] = position.Z;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }
        initStandOn(position, object, upward) {
            this.initStandOnScale(position, object, upward, 1.0);
        }
        initStandOnScale(position, object, upward, scale) {
            var yaxis = upward;
            yaxis.normalize();
            var zaxis = Magnum.Vector3.sub(position, object);
            var dot0 = zaxis.dot(yaxis);
            zaxis = Magnum.Vector3.sub(zaxis, Magnum.Vector3.scale(yaxis, -dot0));
            zaxis.normalize();
            var xaxis = yaxis.cross(zaxis);
            xaxis = Magnum.Vector3.scale(xaxis, scale);
            yaxis = Magnum.Vector3.scale(yaxis, scale);
            zaxis = Magnum.Vector3.scale(zaxis, scale);
            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = zaxis.X;
            this.m[3] = position.X;
            this.m[4] = xaxis.Y;
            this.m[5] = yaxis.Y;
            this.m[6] = zaxis.Y;
            this.m[7] = position.Y;
            this.m[8] = xaxis.Z;
            this.m[9] = yaxis.Z;
            this.m[10] = zaxis.Z;
            this.m[11] = position.Z;
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }
        initPerspective(w, h, n, f) {
            this.initPerspectiveOffCenter(-w / 2, w / 2, -h / 2, h / 2, n, f);
        }
        initPerspectiveFov(fovy, aspect, n, f) {
            var deg2rad = Math.PI / 180.0;
            var tanHalfFovY = Math.tan(fovy / 2 * deg2rad);
            var t = n * tanHalfFovY;
            var r = t * aspect;
            this.initPerspectiveOffCenter(-r, r, -t, t, n, f);
        }
        initPerspectiveOffCenter(l, r, b, t, n, f) {
            this.m[0] = 2 * n / (r - l);
            this.m[1] = 0;
            this.m[2] = (r + l) / (r - l);
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = 2 * n / (t - b);
            this.m[6] = (t + b) / (t - b);
            this.m[7] = 0;
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = -(f + n) / (f - n);
            this.m[11] = -2 * f * n / (f - n);
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = -1;
            this.m[15] = 0;
        }
        initOrthogonal(w, h, n, f) {
            this.initOrthogonalOffCenter(-w / 2, w / 2, -h / 2, h / 2, n, f);
        }
        initOrthogonalOffCenter(l, r, b, t, n, f) {
            this.m[0] = 2 / (r - l);
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = -(r + l) / (r - l);
            this.m[4] = 0;
            this.m[5] = 2 / (t - b);
            this.m[6] = 0;
            this.m[7] = -(t + b) / (t - b);
            this.m[8] = 0;
            this.m[9] = 0;
            this.m[10] = -2 / (f - n);
            this.m[11] = -(f + n) / (f - n);
            this.m[12] = 0;
            this.m[13] = 0;
            this.m[14] = 0;
            this.m[15] = 1;
        }
        initPerspectiveFovShadow(roll, position, object, upward, fovy, aspect, near, far) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);
            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);
            var matCookieP = new Matrix4();
            matCookieP.initPerspectiveFov(fovy, aspect, near, far);
            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);
            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));
            for (var i = 0; i < 16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }
        initPerspectiveShadow(roll, position, object, upward, left, right, bottom, top, near, far) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);
            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);
            var matCookieP = new Matrix4();
            matCookieP.initPerspectiveOffCenter(left, right, bottom, top, near, far);
            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);
            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));
            for (var i = 0; i < 16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }
        initOrthogonalShadow(roll, position, object, upward, left, right, bottom, top, near, far) {
            var matCookieM = new Matrix4();
            matCookieM.initRotateZ(roll);
            var matCookieV = new Matrix4();
            matCookieV.initLookAt(position, object, upward);
            var matCookieP = new Matrix4();
            matCookieP.initOrthogonalOffCenter(left, right, bottom, top, near, far);
            var matBias = new Matrix4();
            matBias.initTranslateScale(0.5, 0.5, 0, 0.5);
            var matCookieBiasPVM = Matrix4.mul(matBias, Matrix4.mul(matCookieP, Matrix4.mul(matCookieV, matCookieM).inverse()));
            for (var i = 0; i < 16; i++)
                this.m[i] = matCookieBiasPVM.m[i];
        }
        setRow(i, values) {
            var idx = i * 4;
            this.m[idx + 0] = values[0];
            this.m[idx + 1] = values[1];
            this.m[idx + 2] = values[2];
            this.m[idx + 3] = values[3];
        }
        getRow(i) {
            var idx = i * 4;
            return [this.m[idx + 0], this.m[idx + 1], this.m[idx + 2], this.m[idx + 3]];
        }
        setColumn(i, values) {
            var idx = i;
            this.m[idx + 0] = values[0];
            this.m[idx + 4] = values[1];
            this.m[idx + 8] = values[2];
            this.m[idx + 12] = values[3];
        }
        getColumn(i) {
            var idx = i;
            return [this.m[idx + 0], this.m[idx + 4], this.m[idx + 8], this.m[idx + 12]];
        }
        setXAxis(v) {
            this.m[0] = v.X;
            this.m[4] = v.Y;
            this.m[8] = v.Z;
        }
        getXAxis() {
            return new Magnum.Vector3([this.m[0], this.m[4], this.m[8]]);
        }
        setYAxis(v) {
            this.m[1] = v.X;
            this.m[5] = v.Y;
            this.m[9] = v.Z;
        }
        getYAxis() {
            return new Magnum.Vector3([this.m[1], this.m[5], this.m[9]]);
        }
        setZAxis(v) {
            this.m[2] = v.X;
            this.m[6] = v.Y;
            this.m[10] = v.Z;
        }
        getZAxis() {
            return new Magnum.Vector3([this.m[2], this.m[6], this.m[10]]);
        }
        setTranslate(v) {
            this.m[3] = v.X;
            this.m[7] = v.Y;
            this.m[11] = v.Z;
        }
        getTranslate() {
            return new Magnum.Vector3([this.m[3], this.m[7], this.m[11]]);
        }
        // arithmetic operations
        static add(m1, m2) {
            return new Matrix4([m1.m[0] + m2.m[0], m1.m[1] + m2.m[1], m1.m[2] + m2.m[2], m1.m[3] + m2.m[3],
                m1.m[4] + m2.m[4], m1.m[5] + m2.m[5], m1.m[6] + m2.m[6], m1.m[7] + m2.m[7],
                m1.m[8] + m2.m[8], m1.m[9] + m2.m[9], m1.m[10] + m2.m[10], m1.m[11] + m2.m[11],
                m1.m[12] + m2.m[12], m1.m[13] + m2.m[13], m1.m[14] + m2.m[14], m1.m[15] + m2.m[15]
            ]);
        }
        static substract(m1, m2) {
            return new Matrix4([m1.m[0] - m2.m[0], m1.m[1] - m2.m[1], m1.m[2] - m2.m[2], m1.m[3] - m2.m[3],
                m1.m[4] - m2.m[4], m1.m[5] - m2.m[5], m1.m[6] - m2.m[6], m1.m[7] - m2.m[7],
                m1.m[8] - m2.m[8], m1.m[9] - m2.m[9], m1.m[10] - m2.m[10], m1.m[11] - m2.m[11],
                m1.m[12] - m2.m[12], m1.m[13] - m2.m[13], m1.m[14] - m2.m[14], m1.m[15] - m2.m[15]
            ]);
        }
        static mul(m1, m2) {
            var mat = new Matrix4();
            mat.m[0] = m1.m[0] * m2.m[0] + m1.m[1] * m2.m[4] + m1.m[2] * m2.m[8] + m1.m[3] * m2.m[12];
            mat.m[1] = m1.m[0] * m2.m[1] + m1.m[1] * m2.m[5] + m1.m[2] * m2.m[9] + m1.m[3] * m2.m[13];
            mat.m[2] = m1.m[0] * m2.m[2] + m1.m[1] * m2.m[6] + m1.m[2] * m2.m[10] + m1.m[3] * m2.m[14];
            mat.m[3] = m1.m[0] * m2.m[3] + m1.m[1] * m2.m[7] + m1.m[2] * m2.m[11] + m1.m[3] * m2.m[15];
            mat.m[4] = m1.m[4] * m2.m[0] + m1.m[5] * m2.m[4] + m1.m[6] * m2.m[8] + m1.m[7] * m2.m[12];
            mat.m[5] = m1.m[4] * m2.m[1] + m1.m[5] * m2.m[5] + m1.m[6] * m2.m[9] + m1.m[7] * m2.m[13];
            mat.m[6] = m1.m[4] * m2.m[2] + m1.m[5] * m2.m[6] + m1.m[6] * m2.m[10] + m1.m[7] * m2.m[14];
            mat.m[7] = m1.m[4] * m2.m[3] + m1.m[5] * m2.m[7] + m1.m[6] * m2.m[11] + m1.m[7] * m2.m[15];
            mat.m[8] = m1.m[8] * m2.m[0] + m1.m[9] * m2.m[4] + m1.m[10] * m2.m[8] + m1.m[11] * m2.m[12];
            mat.m[9] = m1.m[8] * m2.m[1] + m1.m[9] * m2.m[5] + m1.m[10] * m2.m[9] + m1.m[11] * m2.m[13];
            mat.m[10] = m1.m[8] * m2.m[2] + m1.m[9] * m2.m[6] + m1.m[10] * m2.m[10] + m1.m[11] * m2.m[14];
            mat.m[11] = m1.m[8] * m2.m[3] + m1.m[9] * m2.m[7] + m1.m[10] * m2.m[11] + m1.m[11] * m2.m[15];
            mat.m[12] = m1.m[12] * m2.m[0] + m1.m[13] * m2.m[4] + m1.m[14] * m2.m[8] + m1.m[15] * m2.m[12];
            mat.m[13] = m1.m[12] * m2.m[1] + m1.m[13] * m2.m[5] + m1.m[14] * m2.m[9] + m1.m[15] * m2.m[13];
            mat.m[14] = m1.m[12] * m2.m[2] + m1.m[13] * m2.m[6] + m1.m[14] * m2.m[10] + m1.m[15] * m2.m[14];
            mat.m[15] = m1.m[12] * m2.m[3] + m1.m[13] * m2.m[7] + m1.m[14] * m2.m[11] + m1.m[15] * m2.m[15];
            return mat;
        }
        static neg(m) {
            return new Matrix4([
                -m.m[0], -m.m[1], -m.m[2], -m.m[3],
                -m.m[4], -m.m[5], -m.m[6], -m.m[7],
                -m.m[8], -m.m[9], -m.m[10], -m.m[11],
                -m.m[12], -m.m[13], -m.m[14], -m.m[15]
            ]);
        }
        static scale(mat, scale) {
            return new Matrix4([
                mat.m[0] * scale, mat.m[1] * scale, mat.m[2] * scale, mat.m[3] * scale,
                mat.m[4] * scale, mat.m[5] * scale, mat.m[6] * scale, mat.m[7] * scale,
                mat.m[8] * scale, mat.m[9] * scale, mat.m[10] * scale, mat.m[11] * scale,
                mat.m[12] * scale, mat.m[13] * scale, mat.m[14] * scale, mat.m[15] * scale
            ]);
        }
        /*
        public add(m: Matrix4): Matrix4 {
            this.m[0] += m.m[0];
            this.m[1] += m.m[1];
            this.m[2] += m.m[2];
            this.m[3] += m.m[3];

            this.m[4] += m.m[4];
            this.m[5] += m.m[5];
            this.m[6] += m.m[6];
            this.m[7] += m.m[7];

            this.m[8] += m.m[8];
            this.m[9] += m.m[9];
            this.m[10] += m.m[10];
            this.m[11] += m.m[11];

            this.m[12] += m.m[12];
            this.m[13] += m.m[13];
            this.m[14] += m.m[14];
            this.m[15] += m.m[15];

            return this;
        }

        public sub(m: Matrix4): Matrix4 {
            this.m[0] -= m.m[0];
            this.m[1] -= m.m[1];
            this.m[2] -= m.m[2];
            this.m[3] -= m.m[3];

            this.m[4] -= m.m[4];
            this.m[5] -= m.m[5];
            this.m[6] -= m.m[6];
            this.m[7] -= m.m[7];

            this.m[8] -= m.m[8];
            this.m[9] -= m.m[9];
            this.m[10] -= m.m[10];
            this.m[11] -= m.m[11];

            this.m[12] -= m.m[12];
            this.m[13] -= m.m[13];
            this.m[14] -= m.m[14];
            this.m[15] -= m.m[15];

            return this;
        }
        

        public mul(m: Matrix4): Matrix4 {
            var temp = this;

            this.m[0] = temp[0] * m.m[0] + temp[1] * m.m[4] + temp[2] * m.m[8] + temp[3] * m.m[12];
            this.m[1] = temp[0] * m.m[1] + temp[1] * m.m[5] + temp[2] * m.m[9] + temp[3] * m.m[13];
            this.m[2] = temp[0] * m.m[2] + temp[1] * m.m[6] + temp[2] * m.m[10] + temp[3] * m.m[14];
            this.m[3] = temp[0] * m.m[3] + temp[1] * m.m[7] + temp[2] * m.m[11] + temp[3] * m.m[15];

            this.m[4] = temp[4] * m.m[0] + temp[5] * m.m[4] + temp[6] * m.m[8] + temp[7] * m.m[12];
            this.m[5] = temp[4] * m.m[1] + temp[5] * m.m[5] + temp[6] * m.m[9] + temp[7] * m.m[13];
            this.m[6] = temp[4] * m.m[2] + temp[5] * m.m[6] + temp[6] * m.m[10] + temp[7] * m.m[14];
            this.m[7] = temp[4] * m.m[3] + temp[5] * m.m[7] + temp[6] * m.m[11] + temp[7] * m.m[15];

            this.m[8] = temp[8] * m.m[0] + temp[9] * m.m[4] + temp[10] * m.m[8] + temp[11] * m.m[12];
            this.m[9] = temp[8] * m.m[1] + temp[9] * m.m[5] + temp[10] * m.m[9] + temp[11] * m.m[13];
            this.m[10] = temp[8] * m.m[2] + temp[9] * m.m[6] + temp[10] * m.m[10] + temp[11] * m.m[14];
            this.m[11] = temp[8] * m.m[3] + temp[9] * m.m[7] + temp[10] * m.m[11] + temp[11] * m.m[15];

            this.m[12] = temp[12] * m.m[0] + temp[13] * m.m[4] + temp[14] * m.m[8] + temp[15] * m.m[12];
            this.m[13] = temp[12] * m.m[1] + temp[13] * m.m[5] + temp[14] * m.m[9] + temp[15] * m.m[13];
            this.m[14] = temp[12] * m.m[2] + temp[13] * m.m[6] + temp[14] * m.m[10] + temp[15] * m.m[14];
            this.m[15] = temp[12] * m.m[3] + temp[13] * m.m[7] + temp[14] * m.m[11] + temp[15] * m.m[15];

            return this;
        }


        public neg(): Matrix4 {
            this.m[0] = -this.m[0];
            this.m[1] = -this.m[1];
            this.m[2] = -this.m[2];
            this.m[3] = -this.m[3];

            this.m[4] = -this.m[4];
            this.m[5] = -this.m[5];
            this.m[6] = -this.m[6];
            this.m[7] = -this.m[7];

            this.m[8] = -this.m[8];
            this.m[9] = -this.m[9];
            this.m[10] = -this.m[10];
            this.m[11] = -this.m[11];

            this.m[12] = -this.m[12];
            this.m[13] = -this.m[13];
            this.m[14] = -this.m[14];
            this.m[15] = -this.m[15];

            return this;
        }

        public scale(scale: number): Matrix4 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            this.m[4] *= scale;
            this.m[5] *= scale;
            this.m[6] *= scale;
            this.m[7] *= scale;

            this.m[8] *= scale;
            this.m[9] *= scale;
            this.m[10] *= scale;
            this.m[11] *= scale;

            this.m[12] *= scale;
            this.m[13] *= scale;
            this.m[14] *= scale;
            this.m[15] *= scale;

            return this;
        }
        */
        // matrix times vector
        mulVector4(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3] * v[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7] * v[3];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11] * v[3];
            var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15] * v[3];
            return new Magnum.Vector4([m0, m1, m2, m3]);
        }
        mulVector3(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];
            return new Magnum.Vector3([m0, m1, m2]);
        }
        mulPositionVector3(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2] + this.m[3];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2] + this.m[7];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2] + this.m[11];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];
            return new Magnum.Vector3([m0, m1, m2]);
        }
        mulDirectionVector3(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2];
            var m1 = this.m[4] * v[0] + this.m[5] * v[1] + this.m[6] * v[2];
            var m2 = this.m[8] * v[0] + this.m[9] * v[1] + this.m[10] * v[2];
            //var m3 = this.m[12] * v[0] + this.m[13] * v[1] + this.m[14] * v[2] + this.m[15];
            return new Magnum.Vector3([m0, m1, m2]);
        }
        // other operations
        transpose() {
            var temp = this.m.slice(0);
            this.m[0] = temp[0];
            this.m[1] = temp[4];
            this.m[2] = temp[8];
            this.m[3] = temp[12];
            this.m[4] = temp[1];
            this.m[5] = temp[5];
            this.m[6] = temp[9];
            this.m[7] = temp[13];
            this.m[8] = temp[2];
            this.m[9] = temp[6];
            this.m[10] = temp[10];
            this.m[11] = temp[14];
            this.m[12] = temp[3];
            this.m[13] = temp[7];
            this.m[14] = temp[11];
            this.m[15] = temp[15];
        }
        transposeMutiply(m) {
            var temp = this.m.slice(0);
            this.m[0] = temp[0] * m.m[0] + temp[4] * m.m[4] + temp[8] * m.m[8] + temp[12] * m.m[12];
            this.m[1] = temp[0] * m.m[1] + temp[4] * m.m[5] + temp[8] * m.m[9] + temp[12] * m.m[13];
            this.m[2] = temp[0] * m.m[2] + temp[4] * m.m[6] + temp[8] * m.m[10] + temp[12] * m.m[14];
            this.m[3] = temp[0] * m.m[3] + temp[4] * m.m[7] + temp[8] * m.m[11] + temp[12] * m.m[15];
            this.m[4] = temp[1] * m.m[0] + temp[5] * m.m[4] + temp[9] * m.m[8] + temp[13] * m.m[12];
            this.m[5] = temp[1] * m.m[1] + temp[5] * m.m[5] + temp[9] * m.m[9] + temp[13] * m.m[13];
            this.m[6] = temp[1] * m.m[2] + temp[5] * m.m[6] + temp[9] * m.m[10] + temp[13] * m.m[14];
            this.m[7] = temp[1] * m.m[3] + temp[5] * m.m[7] + temp[9] * m.m[11] + temp[13] * m.m[15];
            this.m[8] = temp[2] * m.m[0] + temp[6] * m.m[4] + temp[10] * m.m[8] + temp[14] * m.m[12];
            this.m[9] = temp[2] * m.m[1] + temp[6] * m.m[5] + temp[10] * m.m[9] + temp[14] * m.m[13];
            this.m[10] = temp[2] * m.m[2] + temp[6] * m.m[6] + temp[10] * m.m[10] + temp[14] * m.m[14];
            this.m[11] = temp[2] * m.m[3] + temp[6] * m.m[7] + temp[10] * m.m[11] + temp[14] * m.m[15];
            this.m[12] = temp[3] * m.m[0] + temp[7] * m.m[4] + temp[11] * m.m[8] + temp[15] * m.m[12];
            this.m[13] = temp[3] * m.m[1] + temp[7] * m.m[5] + temp[11] * m.m[9] + temp[15] * m.m[13];
            this.m[14] = temp[3] * m.m[2] + temp[7] * m.m[6] + temp[11] * m.m[10] + temp[15] * m.m[14];
            this.m[15] = temp[3] * m.m[3] + temp[7] * m.m[7] + temp[11] * m.m[11] + temp[15] * m.m[15];
        }
        mutiplyTranspose(m) {
            var temp = this.m.slice(0);
            this.m[0] = temp[0] * m.m[0] + temp[1] * m.m[1] + temp[2] * m.m[2] + temp[3] * m.m[3];
            this.m[1] = temp[0] * m.m[4] + temp[1] * m.m[5] + temp[2] * m.m[6] + temp[3] * m.m[7];
            this.m[2] = temp[0] * m.m[8] + temp[1] * m.m[9] + temp[2] * m.m[10] + temp[3] * m.m[11];
            this.m[3] = temp[0] * m.m[12] + temp[1] * m.m[13] + temp[2] * m.m[14] + temp[3] * m.m[15];
            this.m[4] = temp[4] * m.m[0] + temp[5] * m.m[1] + temp[6] * m.m[2] + temp[7] * m.m[3];
            this.m[5] = temp[4] * m.m[4] + temp[5] * m.m[5] + temp[6] * m.m[6] + temp[7] * m.m[7];
            this.m[6] = temp[4] * m.m[8] + temp[5] * m.m[9] + temp[6] * m.m[10] + temp[7] * m.m[11];
            this.m[7] = temp[4] * m.m[12] + temp[5] * m.m[13] + temp[6] * m.m[14] + temp[7] * m.m[15];
            this.m[8] = temp[8] * m.m[0] + temp[9] * m.m[1] + temp[10] * m.m[2] + temp[11] * m.m[3];
            this.m[9] = temp[8] * m.m[4] + temp[9] * m.m[5] + temp[10] * m.m[6] + temp[11] * m.m[7];
            this.m[10] = temp[8] * m.m[8] + temp[9] * m.m[9] + temp[10] * m.m[10] + temp[11] * m.m[11];
            this.m[11] = temp[8] * m.m[12] + temp[9] * m.m[13] + temp[10] * m.m[14] + temp[11] * m.m[15];
            this.m[12] = temp[12] * m.m[0] + temp[13] * m.m[1] + temp[14] * m.m[2] + temp[15] * m.m[3];
            this.m[13] = temp[12] * m.m[4] + temp[13] * m.m[5] + temp[14] * m.m[6] + temp[15] * m.m[7];
            this.m[14] = temp[12] * m.m[8] + temp[13] * m.m[9] + temp[14] * m.m[10] + temp[15] * m.m[11];
            this.m[15] = temp[12] * m.m[12] + temp[13] * m.m[13] + temp[14] * m.m[14] + temp[15] * m.m[15];
            return this;
        }
        inverse() {
            var fA0 = this.m[0] * this.m[5] - this.m[1] * this.m[4];
            var fA1 = this.m[0] * this.m[6] - this.m[2] * this.m[4];
            var fA2 = this.m[0] * this.m[7] - this.m[3] * this.m[4];
            var fA3 = this.m[1] * this.m[6] - this.m[2] * this.m[5];
            var fA4 = this.m[1] * this.m[7] - this.m[3] * this.m[5];
            var fA5 = this.m[2] * this.m[7] - this.m[3] * this.m[6];
            var fB0 = this.m[8] * this.m[13] - this.m[9] * this.m[12];
            var fB1 = this.m[8] * this.m[14] - this.m[10] * this.m[12];
            var fB2 = this.m[8] * this.m[15] - this.m[11] * this.m[12];
            var fB3 = this.m[9] * this.m[14] - this.m[10] * this.m[13];
            var fB4 = this.m[9] * this.m[15] - this.m[11] * this.m[13];
            var fB5 = this.m[10] * this.m[15] - this.m[11] * this.m[14];
            var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            if (Math.abs(fDet) <= 0.000001) {
                return Matrix4.Zero;
            }
            var kInv = new Matrix4();
            kInv.m[0] = +this.m[5] * fB5 - this.m[6] * fB4 + this.m[7] * fB3;
            kInv.m[4] = -this.m[4] * fB5 + this.m[6] * fB2 - this.m[7] * fB1;
            kInv.m[8] = +this.m[4] * fB4 - this.m[5] * fB2 + this.m[7] * fB0;
            kInv.m[12] = -this.m[4] * fB3 + this.m[5] * fB1 - this.m[6] * fB0;
            kInv.m[1] = -this.m[1] * fB5 + this.m[2] * fB4 - this.m[3] * fB3;
            kInv.m[5] = +this.m[0] * fB5 - this.m[2] * fB2 + this.m[3] * fB1;
            kInv.m[9] = -this.m[0] * fB4 + this.m[1] * fB2 - this.m[3] * fB0;
            kInv.m[13] = +this.m[0] * fB3 - this.m[1] * fB1 + this.m[2] * fB0;
            kInv.m[2] = +this.m[13] * fA5 - this.m[14] * fA4 + this.m[15] * fA3;
            kInv.m[6] = -this.m[12] * fA5 + this.m[14] * fA2 - this.m[15] * fA1;
            kInv.m[10] = +this.m[12] * fA4 - this.m[13] * fA2 + this.m[15] * fA0;
            kInv.m[14] = -this.m[12] * fA3 + this.m[13] * fA1 - this.m[14] * fA0;
            kInv.m[3] = -this.m[9] * fA5 + this.m[10] * fA4 - this.m[11] * fA3;
            kInv.m[7] = +this.m[8] * fA5 - this.m[10] * fA2 + this.m[11] * fA1;
            kInv.m[11] = -this.m[8] * fA4 + this.m[9] * fA2 - this.m[11] * fA0;
            kInv.m[15] = +this.m[8] * fA3 - this.m[9] * fA1 + this.m[10] * fA0;
            var fInvDet = 1.0 / fDet;
            var a = Matrix4.scale(kInv, fInvDet);
            return a;
        }
        adjoint() {
            var temp = this.m.slice(0);
            var fA0 = temp[0] * temp[5] - temp[1] * temp[4];
            var fA1 = temp[0] * temp[6] - temp[2] * temp[4];
            var fA2 = temp[0] * temp[7] - temp[3] * temp[4];
            var fA3 = temp[1] * temp[6] - temp[2] * temp[5];
            var fA4 = temp[1] * temp[7] - temp[3] * temp[5];
            var fA5 = temp[2] * temp[7] - temp[3] * temp[6];
            var fB0 = temp[8] * temp[13] - temp[9] * temp[12];
            var fB1 = temp[8] * temp[14] - temp[10] * temp[12];
            var fB2 = temp[8] * temp[15] - temp[11] * temp[12];
            var fB3 = temp[9] * temp[14] - temp[10] * temp[13];
            var fB4 = temp[9] * temp[15] - temp[11] * temp[13];
            var fB5 = temp[10] * temp[15] - temp[11] * temp[14];
            this.m[0] = temp[5] * fB5 - temp[6] * fB4 + temp[7] * fB3;
            this.m[1] = temp[4] * fB5 + temp[6] * fB2 - temp[7] * fB1;
            this.m[2] = temp[4] * fB4 - temp[5] * fB2 + temp[7] * fB0;
            this.m[3] = temp[4] * fB3 + temp[5] * fB1 - temp[6] * fB0;
            this.m[4] = temp[1] * fB5 + temp[2] * fB4 - temp[3] * fB3;
            this.m[5] = temp[0] * fB5 - temp[2] * fB2 + temp[3] * fB1;
            this.m[6] = temp[0] * fB4 + temp[1] * fB2 - temp[3] * fB0;
            this.m[7] = temp[0] * fB3 - temp[1] * fB1 + temp[2] * fB0;
            this.m[8] = temp[13] * fA5 - temp[14] * fA4 + temp[15] * fA3;
            this.m[9] = temp[12] * fA5 + temp[14] * fA2 - temp[15] * fA1;
            this.m[10] = temp[12] * fA4 - temp[13] * fA2 + temp[15] * fA0;
            this.m[11] = temp[12] * fA3 + temp[13] * fA1 - temp[14] * fA0;
            this.m[12] = temp[9] * fA5 + temp[10] * fA4 - temp[11] * fA3;
            this.m[13] = temp[8] * fA5 - temp[10] * fA2 + temp[11] * fA1;
            this.m[14] = temp[8] * fA4 + temp[9] * fA2 - temp[11] * fA0;
            this.m[15] = temp[8] * fA3 - temp[9] * fA1 + temp[10] * fA0;
        }
        determinant() {
            var fA0 = this.m[0] * this.m[5] - this.m[1] * this.m[4];
            var fA1 = this.m[0] * this.m[6] - this.m[2] * this.m[4];
            var fA2 = this.m[0] * this.m[7] - this.m[3] * this.m[4];
            var fA3 = this.m[1] * this.m[6] - this.m[2] * this.m[5];
            var fA4 = this.m[1] * this.m[7] - this.m[3] * this.m[5];
            var fA5 = this.m[2] * this.m[7] - this.m[3] * this.m[6];
            var fB0 = this.m[8] * this.m[13] - this.m[9] * this.m[12];
            var fB1 = this.m[8] * this.m[14] - this.m[10] * this.m[12];
            var fB2 = this.m[8] * this.m[15] - this.m[11] * this.m[12];
            var fB3 = this.m[9] * this.m[14] - this.m[10] * this.m[13];
            var fB4 = this.m[9] * this.m[15] - this.m[11] * this.m[13];
            var fB5 = this.m[10] * this.m[15] - this.m[11] * this.m[14];
            var fDet = fA0 * fB5 - fA1 * fB4 + fA2 * fB3 + fA3 * fB2 - fA4 * fB1 + fA5 * fB0;
            return fDet;
        }
        fromEulerAnglesYZX(ry, rz, rx) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }
        fromEulerAnglesZXY(rz, rx, ry) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }
        fromEulerAnglesZYX(rz, ry, rx) {
            var fCos, fSin;
            var deg2rad = Math.PI / 180.0;
            fCos = Math.cos(rx * deg2rad);
            fSin = Math.sin(rx * deg2rad);
            var matX = new Matrix4([
                1.0, 0.0, 0.0, 0.0,
                0.0, fCos, -fSin, 0.0,
                0.0, fSin, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(ry * deg2rad);
            fSin = Math.sin(ry * deg2rad);
            var matY = new Matrix4([
                fCos, 0.0, fSin, 0.0,
                0.0, 1.0, 0.0, 0.0,
                -fSin, 0.0, fCos, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            fCos = Math.cos(rz * deg2rad);
            fSin = Math.sin(rz * deg2rad);
            var matZ = new Matrix4([
                fCos, -fSin, 0.0, 0.0,
                fSin, fCos, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]);
            var result = Matrix4.mul(Matrix4.mul(matZ, matX), matY);
            this.m = result.m;
        }
    }
    Matrix4.Zero = new Matrix4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    Matrix4.Identity = new Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    Magnum.Matrix4 = Matrix4;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var gl = null;
var extensions = null;
var Magnum;
(function (Magnum) {
    class mat4 {
        constructor() {
            this.values = Array(16);
        }
        destructor() {
        }
        static create() {
            return new mat4().identity();
        }
        transpose() {
            var temp = this;
            this.values[0] = temp.values[0];
            this.values[1] = temp.values[4];
            this.values[2] = temp.values[8];
            this.values[3] = temp.values[12];
            this.values[4] = temp.values[1];
            this.values[5] = temp.values[5];
            this.values[6] = temp.values[9];
            this.values[7] = temp.values[13];
            this.values[8] = temp.values[2];
            this.values[9] = temp.values[6];
            this.values[10] = temp.values[10];
            this.values[11] = temp.values[14];
            this.values[12] = temp.values[3];
            this.values[13] = temp.values[7];
            this.values[14] = temp.values[11];
            this.values[15] = temp.values[15];
        }
        identity() {
            this.values[0] = 1;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = 1;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = 0;
            this.values[9] = 0;
            this.values[10] = 1;
            this.values[11] = 0;
            this.values[12] = 0;
            this.values[13] = 0;
            this.values[14] = 0;
            this.values[15] = 1;
            return this;
        }
        perspective(a, b, c, d) {
            a = c * Math.tan(a * Math.PI / 360);
            b = a * b;
            return this.frustum(-b, b, -a, a, c, d);
        }
        ;
        frustum(a, b, c, d, e, g) {
            var h = b - a;
            var i = d - c;
            var j = g - e;
            this.values[0] = e * 2 / h;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = e * 2 / i;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = (b + a) / h;
            this.values[9] = (d + c) / i;
            this.values[10] = -(g + e) / j;
            this.values[11] = -1;
            this.values[12] = 0;
            this.values[13] = 0;
            this.values[14] = -(g * e * 2) / j;
            this.values[15] = 0;
            return this;
        }
        ;
        ortho(a, b, c, d, e, g) {
            var h = b - a;
            var i = d - c;
            var j = g - e;
            this.values[0] = 2 / h;
            this.values[1] = 0;
            this.values[2] = 0;
            this.values[3] = 0;
            this.values[4] = 0;
            this.values[5] = 2 / i;
            this.values[6] = 0;
            this.values[7] = 0;
            this.values[8] = 0;
            this.values[9] = 0;
            this.values[10] = -2 / j;
            this.values[11] = 0;
            this.values[12] = -(a + b) / h;
            this.values[13] = -(d + c) / i;
            this.values[14] = -(g + e) / j;
            this.values[15] = 1;
            return this;
        }
        ;
        translate(b) {
            var d = b[0];
            var e = b[1];
            b = b[2];
            this.values[12] = this.values[0] * d + this.values[4] * e + this.values[8] * b + this.values[12];
            this.values[13] = this.values[1] * d + this.values[5] * e + this.values[9] * b + this.values[13];
            this.values[14] = this.values[2] * d + this.values[6] * e + this.values[10] * b + this.values[14];
            this.values[15] = this.values[3] * d + this.values[7] * e + this.values[11] * b + this.values[15];
            return this;
        }
        ;
        scale(b) {
            var d = b[0], e = b[1];
            b = b[2];
            this.values[0] *= d;
            this.values[1] *= d;
            this.values[2] *= d;
            this.values[3] *= d;
            this.values[4] *= e;
            this.values[5] *= e;
            this.values[6] *= e;
            this.values[7] *= e;
            this.values[8] *= b;
            this.values[9] *= b;
            this.values[10] *= b;
            this.values[11] *= b;
        }
        ;
        rotate(b, c) {
            var e = c[0], g = c[1];
            c = c[2];
            var f = Math.sqrt(e * e + g * g + c * c);
            if (f != 1) {
                f = 1 / f;
                e *= f;
                g *= f;
                c *= f;
            }
            var radB = b * Math.PI / 180.0;
            var h = Math.sin(radB), i = Math.cos(radB), j = 1 - i;
            b = this.values[0];
            f = this.values[1];
            var k = this.values[2], l = this.values[3], o = this.values[4], m = this.values[5], n = this.values[6], p = this.values[7], r = this.values[8], s = this.values[9], A = this.values[10], B = this.values[11], t = e * e * j + i, u = g * e * j + c * h, v = c * e * j - g * h, w = e * g * j - c * h, x = g * g * j + i, y = c * g * j + e * h, z = e * c * j + g * h;
            e = g * c * j - e * h;
            g = c * c * j + i;
            this.values[0] = b * t + o * u + r * v;
            this.values[1] = f * t + m * u + s * v;
            this.values[2] = k * t + n * u + A * v;
            this.values[3] = l * t + p * u + B * v;
            this.values[4] = b * w + o * x + r * y;
            this.values[5] = f * w + m * x + s * y;
            this.values[6] = k * w + n * x + A * y;
            this.values[7] = l * w + p * x + B * y;
            this.values[8] = b * z + o * e + r * g;
            this.values[9] = f * z + m * e + s * g;
            this.values[10] = k * z + n * e + A * g;
            this.values[11] = l * z + p * e + B * g;
        }
        ;
    }
    Magnum.mat4 = mat4;
    ;
    class RenderContext {
        constructor() {
        }
        destructor() {
        }
        static getWebGLContext(canvas) {
            return canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("moz-webgl") || canvas.getContext("webkit-3d");
        }
        static initiateContext(canvasName, width, height) {
            var canvas = document.getElementById("glCanvas"); // Handle to canvas tag
            // Initialize WebGL rendering context, if available
            if (gl = this.getWebGLContext(canvas)) {
                Magnum.Console.info("WebGL is initialized.");
                // Ensure WebGL viewport is resized to match canvas dimensions
                gl.viewportWidth = width;
                gl.viewportHeight = height;
                // Output the WebGL rendering context object
                // to console for reference
                Magnum.Console.info(gl);
                // List available extensions
                Magnum.Console.info(extensions = gl.getSupportedExtensions());
                this.currentShaderProgram = null;
                this.currentVertexBuffer = null;
                this.currentIndexBuffer = null;
                this.currentTextures = new Array(8);
                return true;
            }
            else {
                Magnum.Console.error("Your browser doesn't support WebGL.");
                return false;
            }
        }
        static initiate(width, height) {
            if (!this.initiateContext("glCanvas", width, height))
                return false;
            return true;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Per-Fragment Operations 
        static blendColor(red, green, blue, alpha) {
            gl.blendColor(red, green, blue, alpha);
        }
        static blendEquation(mode) {
            var modes = [
                gl.FUNC_ADD,
                gl.FUNC_SUBTRACT,
                gl.FUNC_REVERSE_SUBTRACT
            ];
            gl.blendEquation(modes[mode]);
        }
        static blendEquationSeparate(mode, modeAlpha) {
            var modes = [
                gl.FUNC_ADD,
                gl.FUNC_SUBTRACT,
                gl.FUNC_REVERSE_SUBTRACT
            ];
            gl.blendEquationSeparate(modes[mode], modes[modeAlpha]);
        }
        static blendFunc(srcFactor, dstFactor) {
            var srcFactors = [
                gl.ZERO,
                gl.ONE,
                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,
                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA,
                gl.SRC_ALPHA_SATURATE
            ];
            var dstFactors = [
                gl.ZERO,
                gl.ONE,
                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,
                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA
            ];
            gl.blendFunc(srcFactors[srcFactor], dstFactors[dstFactor]);
        }
        static blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha) {
            var srcFactors = [
                gl.ZERO,
                gl.ONE,
                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,
                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA,
                gl.SRC_ALPHA_SATURATE
            ];
            var dstFactors = [
                gl.ZERO,
                gl.ONE,
                gl.SRC_COLOR,
                gl.SRC_ALPHA,
                gl.CONSTANT_COLOR,
                gl.DST_COLOR,
                gl.DST_ALPHA,
                gl.CONSTANT_ALPHA,
                gl.ONE_MINUS_SRC_COLOR,
                gl.ONE_MINUS_SRC_ALPHA,
                gl.ONE_MINUS_CONSTANT_COLOR,
                gl.ONE_MINUS_DST_COLOR,
                gl.ONE_MINUS_DST_ALPHA,
                gl.ONE_MINUS_CONSTANT_ALPHA
            ];
            gl.blendFuncSeparate(srcFactors[srcRGB], dstFactors[dstRGB], srcFactors[srcAlpha], dstFactors[dstAlpha]);
        }
        static depthFunc(func) {
            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];
            gl.depthFunc(funcs[func]);
        }
        static sampleCoverage(value, invert) {
            gl.SampleCoverage(value, invert);
        }
        static stencilFunc(func, ref, mask) {
            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];
            gl.stencilFunc(funcs[func], ref, mask);
        }
        static stencilFuncSeparate(face, func, ref, mask) {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];
            var funcs = [
                gl.NEVER,
                gl.ALWAYS,
                gl.LESS,
                gl.LEQUAL,
                gl.EQUAL,
                gl.GEQUAL,
                gl.GREATER,
                gl.NOTEQUAL
            ];
            gl.stencilFunc(faces[face], funcs[func], ref, mask);
        }
        static stencilOp(fail, zfail, zpass) {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];
            var ops = [
                gl.KEEP,
                gl.ZERO,
                gl.REPLACE,
                gl.INCR,
                gl.DECR,
                gl.INVERT,
                gl.INCR_WRAP,
                gl.DECR_WRAP
            ];
            gl.stencilOp(ops[fail], ops[zfail], ops[zpass]);
        }
        static stencilOpSeparate(face, fail, zfail, zpass) {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];
            var ops = [
                gl.KEEP,
                gl.ZERO,
                gl.REPLACE,
                gl.INCR,
                gl.DECR,
                gl.INVERT,
                gl.INCR_WRAP,
                gl.DECR_WRAP
            ];
            gl.stencilOpSeparate(faces[face], ops[fail], ops[zfail], ops[zpass]);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // ArrayBuffer and Typed Arrays
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Whole Framebuffer Operations 
        static clear(value) {
            var bit = 0;
            if (value & RenderContext.ClearFlags.ColorBuffer)
                bit |= gl.COLOR_BUFFER_BIT;
            if (value & RenderContext.ClearFlags.DepthBuffer)
                bit |= gl.DEPTH_BUFFER_BIT;
            if (value & RenderContext.ClearFlags.StencilBuffer)
                bit |= gl.STENCIL_BUFFER_BIT;
            gl.clear(bit);
        }
        static clearColor(r, g, b, a) {
            gl.clearColor(r, g, b, a);
        }
        static clearDepth(depth) {
            gl.clearDepth(depth);
        }
        static clearStencil(depth) {
            gl.clearStencil(depth);
        }
        static colorMask(rMask, gMask, bMask, aMask) {
            gl.colorMask(rMask, gMask, bMask, aMask);
        }
        static depthMask(mask) {
            gl.depthMask(mask);
        }
        static stencilMask(bit) {
            gl.stencilMask(bit);
        }
        static stencilMaskSeparate(face, mask) {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];
            gl.stencilMaskSeparate(faces[face], mask);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Buffer Object
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Rasterization
        static cullFace(face) {
            var faces = [
                gl.FRONT,
                gl.BACK,
                gl.FRONT_AND_BACK
            ];
            gl.cullFace(faces[face]);
        }
        static frontFace(frontface) {
            var frontfaces = [
                gl.CW,
                gl.CCW
            ];
            gl.frontFace(frontfaces[frontface]);
        }
        static lineWidth(width) {
            gl.lineWidth(width);
        }
        static polygonOffset(factor, units) {
            gl.polygonOffset(factor, units);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // View And Clip        
        static depthRange(zNear, zFar) {
            gl.depthRange(zNear, zFar);
        }
        static scissor(x, y, width, height) {
            gl.scissor(x, y, width, height);
        }
        static viewport(x, y, width, height) {
            gl.viewport(x, y, width, height);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Programs and Shaders
        static createShaderProgram(vs, fs, gs, ts, hs) {
            var shaderProgram = new RenderContext.ShaderProgram();
            if (!shaderProgram.construct(vs, fs, gs, ts, hs))
                return null;
            return shaderProgram;
        }
        static deleteShaderProgram(shaderProgram) {
            if (shaderProgram) {
                shaderProgram.destruct();
                shaderProgram.destructor();
            }
        }
        static setShaderProgram(shaderProgram) {
            if (shaderProgram && shaderProgram.getHandle()) {
                this.currentShaderProgram = shaderProgram;
                gl.useProgram(this.currentShaderProgram.getHandle());
            }
        }
        static getShaderProgram() {
            return this.currentShaderProgram;
        }
        static createVertexBuffer(positions, colors, texcoord0, texcoord1, texcoord2, texcoord3, texcoord4, texcoord5, texcoord6, texcoord7, usage) {
            if (usage == undefined) {
                usage = RenderContext.Usage.StaticDraw;
            }
            var vertexBuffer = new RenderContext.VertexBuffer();
            if (!vertexBuffer.construct())
                return null;
            if (positions && !vertexBuffer.setPosition(positions, usage))
                return null;
            if (colors && !vertexBuffer.setColor(colors, usage))
                return null;
            if (texcoord0 && !vertexBuffer.setTexCoord(0, texcoord0, 2, usage))
                return null;
            if (texcoord1 && !vertexBuffer.setTexCoord(1, texcoord1, 2, usage))
                return null;
            if (texcoord2 && !vertexBuffer.setTexCoord(2, texcoord2, 2, usage))
                return null;
            if (texcoord3 && !vertexBuffer.setTexCoord(3, texcoord3, 2, usage))
                return null;
            if (texcoord4 && !vertexBuffer.setTexCoord(4, texcoord4, 2, usage))
                return null;
            if (texcoord5 && !vertexBuffer.setTexCoord(5, texcoord5, 2, usage))
                return null;
            if (texcoord6 && !vertexBuffer.setTexCoord(6, texcoord6, 2, usage))
                return null;
            if (texcoord7 && !vertexBuffer.setTexCoord(7, texcoord7, 2, usage))
                return null;
            return vertexBuffer;
        }
        static deleteVertexBuffer(vertexBuffer) {
            if (vertexBuffer) {
                vertexBuffer.destruct();
                vertexBuffer.destructor();
            }
        }
        static setVertexBuffer(vertexBuffer) {
            this.currentVertexBuffer = vertexBuffer;
        }
        static getVertexBuffer() {
            return this.currentVertexBuffer;
        }
        static setIndexBuffer(indexBuffer) {
            this.currentIndexBuffer = indexBuffer;
        }
        static getIndexBuffer() {
            return this.currentIndexBuffer;
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Uniforms and Attributes
        static setUniform1i(name, value) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform1i(uniform.location, value);
        }
        static setUniform2i(name, value1, value2) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform2i(uniform.location, value1, value2);
        }
        static setUniform3i(name, value1, value2, value3) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform3i(uniform.location, value1, value2, value3);
        }
        static setUniform4i(name, value1, value2, value3, value4) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform4i(uniform.location, value1, value2, value3, value4);
        }
        static setUniform1f(name, value) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform1f(uniform.location, value);
        }
        static setUniform2f(name, value1, value2) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform2f(uniform.location, value1, value2);
        }
        static setUniform3f(name, value1, value2, value3) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform3f(uniform.location, value1, value2, value3);
        }
        static setUniform4f(name, value1, value2, value3, value4) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform4f(uniform.location, value1, value2, value3, value4);
        }
        static setUniform1iv(name, count, value) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform1iv(uniform.location, count, value);
        }
        static setUniform2iv(name, count, value1, value2) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform2iv(uniform.location, count, value1, value2);
        }
        static setUniform3iv(name, count, value1, value2, value3) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform3iv(uniform.location, count, value1, value2, value3);
        }
        static setUniform4iv(name, count, value1, value2, value3, value4) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform4iv(uniform.location, value1, value2, value3, value4);
        }
        static setUniform1fv(name, count, value) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform1fv(uniform.location, count, value);
        }
        static setUniform2fv(name, count, value1, value2) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform2fv(uniform.location, count, value1, value2);
        }
        static setUniform3fv(name, count, value1, value2, value3) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform3fv(uniform.location, count, value1, value2, value3);
        }
        static setUniform4fv(name, count, value1, value2, value3, value4) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniform4fv(uniform.location, value1, value2, value3, value4);
        }
        static setUniformMatrix2fv(name, mat) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniformMatrix2fv(uniform.location, false, mat.toArrayTranpose());
        }
        static setUniformMatrix3fv(name, mat) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniformMatrix3fv(uniform.location, false, mat.toArrayTranpose());
        }
        static setUniformMatrix4fv(name, mat) {
            if (!this.currentShaderProgram)
                return;
            var uniform = this.currentShaderProgram.getUniform(name);
            if (!uniform)
                return;
            gl.uniformMatrix4fv(uniform.location, false, mat.toArrayTranpose());
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Texture Objects
        static createTexture(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap) {
            var texture = new RenderContext.Texture();
            if (!texture.construct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap))
                return null;
            return texture;
        }
        static deleteTexture(texture) {
            if (texture)
                texture.destruct();
        }
        static setTexture(textureStage, texture) {
            var minFilters = [
                gl.NEAREST,
                gl.LINEAR,
                gl.NEAREST_MIPMAP_NEAREST,
                gl.LINEAR_MIPMAP_NEAREST,
                gl.NEAREST_MIPMAP_LINEAR,
                gl.LINEAR_MIPMAP_LINEAR
            ];
            var magFilters = [
                gl.NEAREST,
                gl.LINEAR
            ];
            var wraps = [
                gl.CLAMP_TO_EDGE,
                gl.MIRRORED_REPEAT,
                gl.REPEAT
            ];
            var textureTargets = [
                gl.TEXTURE_2D,
                gl.TEXTURE_CUBE_MAP,
            ];
            if (texture && texture.getHandle()) {
                gl.activeTexture(gl.TEXTURE0 + textureStage);
                var textureTarget = textureTargets[texture.TextureTarget];
                var minFilter = minFilters[texture.MinFilter];
                var magFilter = magFilters[texture.MagFilter];
                var wrapS = wraps[texture.WrapS];
                var wrapT = wraps[texture.WrapT];
                gl.bindTexture(textureTarget, texture.getHandle());
                gl.texParameteri(textureTarget, gl.TEXTURE_MAG_FILTER, magFilter);
                gl.texParameteri(textureTarget, gl.TEXTURE_MIN_FILTER, minFilter);
                gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_S, wrapS);
                gl.texParameteri(textureTarget, gl.TEXTURE_WRAP_T, wrapT);
                this.currentTextures[textureStage] = texture;
            }
        }
        static getTexture(textureStage) {
            return this.currentTextures[textureStage];
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Writing to the Draw Buffer  
        static drawArrays(mode, first, count) {
            if (!this.currentShaderProgram)
                return;
            if (!this.currentVertexBuffer)
                return;
            var attributes = this.currentShaderProgram.getAttributes();
            var modes = [
                gl.POINTS,
                gl.LINES,
                gl.LINE_LOOP,
                gl.LINE_STRIP,
                gl.TRIANGLES,
                gl.TRIANGLE_STRIP,
                gl.TRIANGLE_FAN,
            ];
            for (var i = 0; i < 8; i++)
                gl.disableVertexAttribArray(i);
            var position = this.currentVertexBuffer.getPosition();
            if (position && attributes.hasOwnProperty("aPosition")) {
                var attribute = attributes["aPosition"];
                gl.bindBuffer(gl.ARRAY_BUFFER, position.handle);
                gl.vertexAttribPointer(attribute.location, position.itemSize, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(attribute.location);
            }
            var color = this.currentVertexBuffer.getColor();
            if (color && attributes.hasOwnProperty("aColor")) {
                var attribute = attributes["aColor"];
                gl.bindBuffer(gl.ARRAY_BUFFER, color.handle);
                gl.vertexAttribPointer(attribute.location, color.itemSize, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(attribute.location);
            }
            for (var i = 0; i < 8; i++) {
                var texCoord = this.currentVertexBuffer.getTexCoord(i);
                var name = "aTexCoord" + i;
                if (texCoord && attributes.hasOwnProperty(name)) {
                    var attribute = attributes[name];
                    gl.bindBuffer(gl.ARRAY_BUFFER, texCoord.handle);
                    gl.vertexAttribPointer(attribute.location, texCoord.itemSize, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(attribute.location);
                }
            }
            if (!first)
                first = 0;
            if (!count)
                count = position.numItems;
            gl.drawArrays(modes[mode], first, count);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // Special Functions
        static enable(value) {
            if (value & RenderContext.EnableFlags.Blend)
                gl.enable(gl.BLEND);
            if (value & RenderContext.EnableFlags.CullFace)
                gl.enable(gl.CULL_FACE);
            if (value & RenderContext.EnableFlags.DepthTest)
                gl.enable(gl.DEPTH_TEST);
            if (value & RenderContext.EnableFlags.Dither)
                gl.enable(gl.DITHER);
            if (value & RenderContext.EnableFlags.PolygonOffsetFill)
                gl.enable(gl.POLYGON_OFFSET_FILL);
            if (value & RenderContext.EnableFlags.SampleAlphaToCoverage)
                gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            if (value & RenderContext.EnableFlags.SampleCoverage)
                gl.enable(gl.SAMPLE_COVERAGE);
            if (value & RenderContext.EnableFlags.ScissorTest)
                gl.enable(gl.SCISSOR_TEST);
            if (value & RenderContext.EnableFlags.StencilTest)
                gl.enable(gl.STENCIL_TEST);
        }
        static disable(value) {
            if (value & RenderContext.EnableFlags.Blend)
                gl.disable(gl.BLEND);
            if (value & RenderContext.EnableFlags.CullFace)
                gl.disable(gl.CULL_FACE);
            if (value & RenderContext.EnableFlags.DepthTest)
                gl.disable(gl.DEPTH_TEST);
            if (value & RenderContext.EnableFlags.Dither)
                gl.disable(gl.DITHER);
            if (value & RenderContext.EnableFlags.PolygonOffsetFill)
                gl.disable(gl.POLYGON_OFFSET_FILL);
            if (value & RenderContext.EnableFlags.SampleAlphaToCoverage)
                gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            if (value & RenderContext.EnableFlags.SampleCoverage)
                gl.disable(gl.SAMPLE_COVERAGE);
            if (value & RenderContext.EnableFlags.ScissorTest)
                gl.disable(gl.SCISSOR_TEST);
            if (value & RenderContext.EnableFlags.StencilTest)
                gl.disable(gl.STENCIL_TEST);
        }
        static isEnabled(cap) {
            var caps = [
                gl.BLEND,
                gl.CULL_FACE,
                gl.DEPTH_TEST,
                gl.DITHER,
                gl.POLYGON_OFFSET_FILL,
                gl.SAMPLE_ALPHA_TO_COVERAGE,
                gl.SAMPLE_COVERAGE,
                gl.SCISSOR_TEST,
                gl.STENCIL_TEST
            ];
            return gl.isEnabled(caps[cap]);
        }
        static flush() {
            gl.flush();
        }
        static finish() {
            gl.finish();
        }
        static getError() {
            return 0;
        }
        /*
        // Returns: OUT_OF_MEMORY, INVALID_{ENUM, OPERATION, FRAMEBUFFER_OPERATION, VALUE}, NO_ERROR,  CONTEXT_LOST_WEBGL
        //getParameter(enum pname)
        pname: {
        ALPHA, RED, GREEN, BLUE, SUBPIXEL}_BITS,
        ACTIVE_TEXTURE,
        ALIASED_{LINE_WIDTH, POINT_SIZE}_RANGE,
        ARRAY_BUFFER_BINDING,
        BLEND_DST_{ALPHA, RGB},
        BLEND_EQUATION_{ALPHA, RGB},
        BLEND_SRC_{ALPHA, RGB},
        BLEND[_COLOR],
        COLOR_{CLEAR_VALUE, WRITEMASK},
        [NUM_]COMPRESSED_TEXTURE_FORMATS,
        CULL_FACE[_MODE],
        CURRENT_PROGRAM,
        DEPTH_{BITS, CLEAR_VALUE, FUNC, RANGE, TEST,WRITEMASK},
        ELEMENT_ARRAY_BUFFER_BINDING,
        DITHER,
        FRAMEBUFFER_BINDING,
        FRONT_FACE,
        GENERATE_MIPMAP_HINT,
        LINE_WIDTH,
        MAX_[COMBINED_]TEXTURE_IMAGE_UNITS,
        MAX_{CUBE_MAP_TEXTURE, RENDERBUFFER, TEXTURE}_SIZE,
        MAX_VARYING_VECTORS,
        MAX_VERTEX_{ATTRIBS,  TEXTURE_IMAGE_UNITS, UNIFORM_VECTORS},
        MAX_VIEWPORT_DIMS, PACK_ALIGNMENT,
        POLYGON_OFFSET_{FACTOR, FILL, UNITS},
        RENDERBUFFER_BINDING,
        RENDERER,
        SAMPLE_BUFFERS,
        SAMPLE_COVERAGE_{INVERT, VALUE},
        SAMPLES,
        SCISSOR_{BOX, TEST},
        SHADING_LANGUAGE_VERSION,
        STENCIL_{BITS, CLEAR_VALUE, TEST},
        STENCIL_[BACK_]{FAIL, FUNC, REF,VALUE_MASK, WRITEMASK},
        STENCIL_[BACK_]PASS_DEPTH_{FAIL, PASS},
        TEXTURE_BINDING_{2D, CUBE_MAP},
        UNPACK_ALIGNMENT,
        UNPACK_{COLORSPACE_CONVERSION_WEBGL,
        FLIP_Y_WEBGL,
        PREMULTIPLY_ALPHA_WEBGL},
        VENDOR, VERSION,
        VIEWPORT
        */
        static hint(target, mode) {
            var targets = [
                gl.GENERATE_MIPMAP_HINT
            ];
            var modes = [
                gl.FASTEST,
                gl.NICEST,
                gl.DONT_CARE
            ];
            gl.hint(targets[target], modes[mode]);
        }
        static pixelStorei(pname, param) {
            var pnames = [
                gl.UNPACK_ALIGNMENT,
                gl.UNPACK_FLIP_Y_WEBGL,
                gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                gl.PACK_FLIP_Y_WEBGL,
                gl.PACK_ALIGNMENT,
                gl.PACK_PREMULTIPLY_ALPHA_WEBGL,
                gl.UNPACK_COLORSPACE_CONVERSION_WEBGL
            ];
            gl.pixelStorei(pnames[pname], param);
        }
    }
    RenderContext.currentShaderProgram = null;
    RenderContext.currentVertexBuffer = null;
    RenderContext.currentIndexBuffer = null;
    RenderContext.currentTextures = null;
    Magnum.RenderContext = RenderContext;
    ;
    (function (RenderContext) {
        let BlendMode;
        (function (BlendMode) {
            BlendMode[BlendMode["Add"] = 1] = "Add";
            BlendMode[BlendMode["Subtract"] = 2] = "Subtract";
            BlendMode[BlendMode["ReverseSubtract"] = 3] = "ReverseSubtract";
        })(BlendMode = RenderContext.BlendMode || (RenderContext.BlendMode = {}));
        ;
        let ClearFlags;
        (function (ClearFlags) {
            ClearFlags[ClearFlags["None"] = 0] = "None";
            ClearFlags[ClearFlags["ColorBuffer"] = 1] = "ColorBuffer";
            ClearFlags[ClearFlags["DepthBuffer"] = 2] = "DepthBuffer";
            ClearFlags[ClearFlags["StencilBuffer"] = 4] = "StencilBuffer";
            ClearFlags[ClearFlags["All"] = 7] = "All";
        })(ClearFlags = RenderContext.ClearFlags || (RenderContext.ClearFlags = {}));
        ;
        let DepthFunc;
        (function (DepthFunc) {
            DepthFunc[DepthFunc["Never"] = 0] = "Never";
            DepthFunc[DepthFunc["Always"] = 1] = "Always";
            DepthFunc[DepthFunc["Less"] = 2] = "Less";
            DepthFunc[DepthFunc["Lequal"] = 3] = "Lequal";
            DepthFunc[DepthFunc["Equal"] = 4] = "Equal";
            DepthFunc[DepthFunc["GEqual"] = 5] = "GEqual";
            DepthFunc[DepthFunc["Greater"] = 6] = "Greater";
            DepthFunc[DepthFunc["NotEqual"] = 7] = "NotEqual";
        })(DepthFunc = RenderContext.DepthFunc || (RenderContext.DepthFunc = {}));
        ;
        let DstFactor;
        (function (DstFactor) {
            DstFactor[DstFactor["Zero"] = 0] = "Zero";
            DstFactor[DstFactor["One"] = 1] = "One";
            DstFactor[DstFactor["SrcColor"] = 2] = "SrcColor";
            DstFactor[DstFactor["SrcAlpha"] = 3] = "SrcAlpha";
            DstFactor[DstFactor["ConstantColor"] = 4] = "ConstantColor";
            DstFactor[DstFactor["DstColor"] = 5] = "DstColor";
            DstFactor[DstFactor["DstAlpha"] = 6] = "DstAlpha";
            DstFactor[DstFactor["ConstantAlpha"] = 7] = "ConstantAlpha";
            DstFactor[DstFactor["OnMinusSrcColor"] = 8] = "OnMinusSrcColor";
            DstFactor[DstFactor["OnMinusSrcAlpha"] = 9] = "OnMinusSrcAlpha";
            DstFactor[DstFactor["OnMinusConstantColor"] = 10] = "OnMinusConstantColor";
            DstFactor[DstFactor["OnMinusDstColor"] = 11] = "OnMinusDstColor";
            DstFactor[DstFactor["OnMinusDstAlpha"] = 12] = "OnMinusDstAlpha";
            DstFactor[DstFactor["OnMinusConstantAlpha"] = 13] = "OnMinusConstantAlpha";
        })(DstFactor = RenderContext.DstFactor || (RenderContext.DstFactor = {}));
        ;
        let EnableFlags;
        (function (EnableFlags) {
            EnableFlags[EnableFlags["None"] = 0] = "None";
            EnableFlags[EnableFlags["Blend"] = 1] = "Blend";
            EnableFlags[EnableFlags["CullFace"] = 2] = "CullFace";
            EnableFlags[EnableFlags["DepthTest"] = 4] = "DepthTest";
            EnableFlags[EnableFlags["Dither"] = 8] = "Dither";
            EnableFlags[EnableFlags["PolygonOffsetFill"] = 16] = "PolygonOffsetFill";
            EnableFlags[EnableFlags["SampleAlphaToCoverage"] = 32] = "SampleAlphaToCoverage";
            EnableFlags[EnableFlags["SampleCoverage"] = 64] = "SampleCoverage";
            EnableFlags[EnableFlags["ScissorTest"] = 128] = "ScissorTest";
            EnableFlags[EnableFlags["StencilTest"] = 256] = "StencilTest";
            EnableFlags[EnableFlags["All"] = 511] = "All";
        })(EnableFlags = RenderContext.EnableFlags || (RenderContext.EnableFlags = {}));
        ;
        let Face;
        (function (Face) {
            Face[Face["Front"] = 0] = "Front";
            Face[Face["Back"] = 1] = "Back";
            Face[Face["FrontAndBack"] = 2] = "FrontAndBack";
        })(Face = RenderContext.Face || (RenderContext.Face = {}));
        ;
        let FrontFace;
        (function (FrontFace) {
            FrontFace[FrontFace["CW"] = 0] = "CW";
            FrontFace[FrontFace["CCW"] = 1] = "CCW";
        })(FrontFace = RenderContext.FrontFace || (RenderContext.FrontFace = {}));
        ;
        let HintTarget;
        (function (HintTarget) {
            HintTarget[HintTarget["GenerateMipMapHint"] = 0] = "GenerateMipMapHint";
        })(HintTarget = RenderContext.HintTarget || (RenderContext.HintTarget = {}));
        ;
        let HintMode;
        (function (HintMode) {
            HintMode[HintMode["Fastest"] = 0] = "Fastest";
            HintMode[HintMode["Nicest"] = 1] = "Nicest";
            HintMode[HintMode["DontCare"] = 2] = "DontCare";
        })(HintMode = RenderContext.HintMode || (RenderContext.HintMode = {}));
        ;
        let PrimitiveMode;
        (function (PrimitiveMode) {
            PrimitiveMode[PrimitiveMode["Points"] = 0] = "Points";
            PrimitiveMode[PrimitiveMode["Lines"] = 1] = "Lines";
            PrimitiveMode[PrimitiveMode["LineLoop"] = 2] = "LineLoop";
            PrimitiveMode[PrimitiveMode["LineStrip"] = 3] = "LineStrip";
            PrimitiveMode[PrimitiveMode["Triangles"] = 4] = "Triangles";
            PrimitiveMode[PrimitiveMode["TriangleStrip"] = 5] = "TriangleStrip";
            PrimitiveMode[PrimitiveMode["TriangleFan"] = 6] = "TriangleFan";
        })(PrimitiveMode = RenderContext.PrimitiveMode || (RenderContext.PrimitiveMode = {}));
        ;
        let SrcFactor;
        (function (SrcFactor) {
            SrcFactor[SrcFactor["Zero"] = 0] = "Zero";
            SrcFactor[SrcFactor["One"] = 1] = "One";
            SrcFactor[SrcFactor["SrcColor"] = 2] = "SrcColor";
            SrcFactor[SrcFactor["SrcAlpha"] = 3] = "SrcAlpha";
            SrcFactor[SrcFactor["ConstantColor"] = 4] = "ConstantColor";
            SrcFactor[SrcFactor["DstColor"] = 5] = "DstColor";
            SrcFactor[SrcFactor["DstAlpha"] = 6] = "DstAlpha";
            SrcFactor[SrcFactor["ConstantAlpha"] = 7] = "ConstantAlpha";
            SrcFactor[SrcFactor["OnMinusSrcColor"] = 8] = "OnMinusSrcColor";
            SrcFactor[SrcFactor["OnMinusSrcAlpha"] = 9] = "OnMinusSrcAlpha";
            SrcFactor[SrcFactor["OnMinusConstantColor"] = 10] = "OnMinusConstantColor";
            SrcFactor[SrcFactor["OnMinusDstColor"] = 11] = "OnMinusDstColor";
            SrcFactor[SrcFactor["OnMinusDstAlpha"] = 12] = "OnMinusDstAlpha";
            SrcFactor[SrcFactor["OnMinusConstantAlpha"] = 13] = "OnMinusConstantAlpha";
            SrcFactor[SrcFactor["SrcAlphaSaturate"] = 14] = "SrcAlphaSaturate";
        })(SrcFactor = RenderContext.SrcFactor || (RenderContext.SrcFactor = {}));
        ;
        let StencilFunc;
        (function (StencilFunc) {
            StencilFunc[StencilFunc["Never"] = 0] = "Never";
            StencilFunc[StencilFunc["Always"] = 1] = "Always";
            StencilFunc[StencilFunc["Less"] = 2] = "Less";
            StencilFunc[StencilFunc["Lequal"] = 3] = "Lequal";
            StencilFunc[StencilFunc["Equal"] = 4] = "Equal";
            StencilFunc[StencilFunc["GEqual"] = 5] = "GEqual";
            StencilFunc[StencilFunc["Greater"] = 6] = "Greater";
            StencilFunc[StencilFunc["NotEqual"] = 7] = "NotEqual";
        })(StencilFunc = RenderContext.StencilFunc || (RenderContext.StencilFunc = {}));
        ;
        let StencilOp;
        (function (StencilOp) {
            StencilOp[StencilOp["Keep"] = 0] = "Keep";
            StencilOp[StencilOp["Zero"] = 1] = "Zero";
            StencilOp[StencilOp["Replace"] = 2] = "Replace";
            StencilOp[StencilOp["Increase"] = 3] = "Increase";
            StencilOp[StencilOp["Decrease"] = 4] = "Decrease";
            StencilOp[StencilOp["Invert"] = 5] = "Invert";
            StencilOp[StencilOp["IncreaseWrap"] = 6] = "IncreaseWrap";
            StencilOp[StencilOp["DecreaseWrap"] = 7] = "DecreaseWrap";
        })(StencilOp = RenderContext.StencilOp || (RenderContext.StencilOp = {}));
        ;
        let PixelStore;
        (function (PixelStore) {
            PixelStore[PixelStore["UNPACK_ALIGNMENT"] = 0] = "UNPACK_ALIGNMENT";
            PixelStore[PixelStore["UNPACK_FLIP_Y_WEBGL"] = 1] = "UNPACK_FLIP_Y_WEBGL";
            PixelStore[PixelStore["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 2] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
            PixelStore[PixelStore["PACK_ALIGNMENT"] = 3] = "PACK_ALIGNMENT";
            PixelStore[PixelStore["PACK_FLIP_Y_WEBGL"] = 4] = "PACK_FLIP_Y_WEBGL";
            PixelStore[PixelStore["PACK_PREMULTIPLY_ALPHA_WEBGL"] = 5] = "PACK_PREMULTIPLY_ALPHA_WEBGL";
            PixelStore[PixelStore["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 6] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
        })(PixelStore = RenderContext.PixelStore || (RenderContext.PixelStore = {}));
        ;
        let MinFilter;
        (function (MinFilter) {
            MinFilter[MinFilter["Nearest"] = 0] = "Nearest";
            MinFilter[MinFilter["Linear"] = 1] = "Linear";
            MinFilter[MinFilter["NearestMipmapNearest"] = 2] = "NearestMipmapNearest";
            MinFilter[MinFilter["LinearMipmapNearest"] = 3] = "LinearMipmapNearest";
            MinFilter[MinFilter["NearestMipmapLinear"] = 4] = "NearestMipmapLinear";
            MinFilter[MinFilter["LinearMipmapLinear"] = 5] = "LinearMipmapLinear"; // Chooses the two mipmaps that most closely match the size of the pixel being textured and uses the GL_LINEAR criterion (a weighted average of the four texture elements that are closest to the center of the pixel) to produce a texture value from each mipmap. The final texture value is a weighted average of those two values.
        })(MinFilter = RenderContext.MinFilter || (RenderContext.MinFilter = {}));
        ;
        let MagFilter;
        (function (MagFilter) {
            MagFilter[MagFilter["Nearest"] = 0] = "Nearest";
            MagFilter[MagFilter["Linear"] = 1] = "Linear";
        })(MagFilter = RenderContext.MagFilter || (RenderContext.MagFilter = {}));
        ;
        let Wrap;
        (function (Wrap) {
            Wrap[Wrap["ClampToEdge"] = 0] = "ClampToEdge";
            Wrap[Wrap["Mirror"] = 1] = "Mirror";
            Wrap[Wrap["Repeat"] = 2] = "Repeat";
        })(Wrap = RenderContext.Wrap || (RenderContext.Wrap = {}));
        ;
        let TextureTarget;
        (function (TextureTarget) {
            TextureTarget[TextureTarget["Target2D"] = 0] = "Target2D";
            TextureTarget[TextureTarget["TargetCubeMap"] = 1] = "TargetCubeMap";
        })(TextureTarget = RenderContext.TextureTarget || (RenderContext.TextureTarget = {}));
        ;
        let TextureFace;
        (function (TextureFace) {
            TextureFace[TextureFace["Texture2D"] = 0] = "Texture2D";
            TextureFace[TextureFace["CubeMapPositiveX"] = 1] = "CubeMapPositiveX";
            TextureFace[TextureFace["CubeMapPositiveY"] = 2] = "CubeMapPositiveY";
            TextureFace[TextureFace["CubeMapPositiveZ"] = 3] = "CubeMapPositiveZ";
            TextureFace[TextureFace["CubeMapNegativeX"] = 1] = "CubeMapNegativeX";
            TextureFace[TextureFace["CubeMapNegativeY"] = 2] = "CubeMapNegativeY";
            TextureFace[TextureFace["CubeMapNegativeZ"] = 3] = "CubeMapNegativeZ";
        })(TextureFace = RenderContext.TextureFace || (RenderContext.TextureFace = {}));
        ;
        let InternalFormat;
        (function (InternalFormat) {
            InternalFormat[InternalFormat["Alpha"] = 0] = "Alpha";
            InternalFormat[InternalFormat["Luminance"] = 1] = "Luminance";
            InternalFormat[InternalFormat["LuminanceAlpha"] = 2] = "LuminanceAlpha";
            InternalFormat[InternalFormat["RGB"] = 3] = "RGB";
            InternalFormat[InternalFormat["RGBA"] = 4] = "RGBA";
        })(InternalFormat = RenderContext.InternalFormat || (RenderContext.InternalFormat = {}));
        ;
        let Format;
        (function (Format) {
            Format[Format["Alpha"] = 0] = "Alpha";
            Format[Format["RGB"] = 1] = "RGB";
            Format[Format["RGBA"] = 2] = "RGBA";
            Format[Format["Luminance"] = 3] = "Luminance";
            Format[Format["LuminanceAlpha"] = 4] = "LuminanceAlpha";
        })(Format = RenderContext.Format || (RenderContext.Format = {}));
        ;
        let Type;
        (function (Type) {
            Type[Type["UnsignedByte"] = 0] = "UnsignedByte";
            Type[Type["UnsignedShort565"] = 1] = "UnsignedShort565";
            Type[Type["UnsignedShort4444"] = 2] = "UnsignedShort4444";
            Type[Type["UnsignedShort5551"] = 3] = "UnsignedShort5551";
        })(Type = RenderContext.Type || (RenderContext.Type = {}));
        ;
        let FVF;
        (function (FVF) {
            FVF[FVF["None"] = 0] = "None";
            FVF[FVF["Position"] = 1] = "Position";
            FVF[FVF["Color"] = 2] = "Color";
            FVF[FVF["TexCoord0"] = 4] = "TexCoord0";
            FVF[FVF["TexCoord1"] = 8] = "TexCoord1";
            FVF[FVF["TexCoord2"] = 16] = "TexCoord2";
            FVF[FVF["TexCoord3"] = 32] = "TexCoord3";
            FVF[FVF["TexCoord4"] = 64] = "TexCoord4";
            FVF[FVF["TexCoord5"] = 128] = "TexCoord5";
            FVF[FVF["TexCoord6"] = 256] = "TexCoord6";
            FVF[FVF["TexCoord7"] = 512] = "TexCoord7";
        })(FVF = RenderContext.FVF || (RenderContext.FVF = {}));
        ;
        let Usage;
        (function (Usage) {
            Usage[Usage["StaticDraw"] = 0] = "StaticDraw";
            Usage[Usage["StreamDraw"] = 1] = "StreamDraw";
            Usage[Usage["DynamicDraw"] = 2] = "DynamicDraw";
        })(Usage = RenderContext.Usage || (RenderContext.Usage = {}));
        ;
        class ShaderProgram {
            constructor() {
                this.handle = null;
                this.attributes = null;
                this.uniforms = null;
                this.uniformsValues = new Array();
            }
            destructor() {
            }
            construct(vs, fs, gs, ts, hs) {
                return this.onConstruct(vs, fs, gs, ts, hs);
            }
            destruct() {
                this.onDestruct();
            }
            onConstruct(vs, fs, gs, ts, hs) {
                this.attributes = {};
                this.uniforms = {};
                var vertexShader = this.getShader(gl.VERTEX_SHADER, vs);
                if (!vertexShader) {
                    console.log("Error in creating Vertex Shader");
                    return false;
                }
                var fragmentShader = this.getShader(gl.FRAGMENT_SHADER, fs);
                if (!fragmentShader) {
                    console.log("Error in creating Fragment Shader");
                    return false;
                }
                var currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
                this.handle = gl.createProgram();
                gl.attachShader(this.handle, vertexShader);
                gl.attachShader(this.handle, fragmentShader);
                gl.linkProgram(this.handle);
                if (!gl.getProgramParameter(this.handle, gl.LINK_STATUS)) {
                    console.log("Error in creating linking Shader Program");
                    return false;
                }
                gl.useProgram(this.handle);
                var numActiveUniforms = gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS);
                for (var i = 0; i < numActiveUniforms; i++) {
                    var uniform = gl.getActiveUniform(this.handle, i);
                    uniform.location = gl.getUniformLocation(this.handle, uniform.name);
                    this.uniforms[uniform.name] = uniform;
                }
                var numActiveAttributes = gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES);
                for (var i = 0; i < numActiveAttributes; i++) {
                    var attribute = gl.getActiveAttrib(this.handle, i);
                    attribute.location = gl.getAttribLocation(this.handle, attribute.name);
                    this.attributes[attribute.name] = attribute;
                }
                if (vertexShader) {
                    gl.deleteShader(vertexShader);
                    vertexShader = null;
                }
                if (fragmentShader) {
                    gl.deleteShader(fragmentShader);
                    fragmentShader = null;
                }
                if (currentProgram)
                    gl.useProgram(currentProgram);
                return true;
            }
            onDestruct() {
                if (this.handle) {
                    gl.deleteProgram(this.handle);
                    this.handle = null;
                }
            }
            setUniform1i(name, value1) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1) {
                    RenderContext.setUniform1i(name, value1);
                }.bind(this, name, value1));
            }
            setUniform2i(name, value1, value2) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2) {
                    RenderContext.setUniform2i(name, value1, value2);
                }.bind(this, name, value1, value2));
            }
            setUniform3i(name, value1, value2, value3) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2, value3) {
                    RenderContext.setUniform3i(name, value1, value2, value3);
                }.bind(this, name, value1, value2, value3));
            }
            setUniform4i(name, value1, value2, value3, value4) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                    RenderContext.setUniform4i(name, value1, value2, value3, value4);
                }.bind(this, name, value1, value2, value3, value4));
            }
            setUniform1f(name, value1) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1) {
                    RenderContext.setUniform1f(name, value1);
                }.bind(this, name, value1));
            }
            setUniform2f(name, value1, value2) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2) {
                    RenderContext.setUniform2f(name, value1, value2);
                }.bind(this, name, value1, value2));
            }
            setUniform3f(name, value1, value2, value3) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2, value3) {
                    RenderContext.setUniform3f(name, value1, value2, value3);
                }.bind(this, name, value1, value2, value3));
            }
            setUniform4f(name, value1, value2, value3, value4) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                    RenderContext.setUniform4f(name, value1, value2, value3, value4);
                }.bind(this, name, value1, value2, value3, value4));
            }
            setUniform1iv(name, count, value1) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1) {
                    RenderContext.setUniform1iv(name, count, value1);
                }.bind(this, name, count, value1));
            }
            setUniform2iv(name, count, value1, value2) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2) {
                    RenderContext.setUniform2iv(name, count, value1, value2);
                }.bind(this, name, count, value1, value2));
            }
            setUniform3iv(name, count, value1, value2, value3) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2, value3) {
                    RenderContext.setUniform3iv(name, count, value1, value2, value3);
                }.bind(this, name, count, value1, value2, value3));
            }
            setUniform4iv(name, count, value1, value2, value3, value4) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                    RenderContext.setUniform4iv(name, count, value1, value2, value3, value4);
                }.bind(this, name, count, value1, value2, value3, value4));
            }
            setUniform1fv(name, count, value1) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1) {
                    RenderContext.setUniform1fv(name, count, value1);
                }.bind(this, name, count, value1));
            }
            setUniform2fv(name, count, value1, value2) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2) {
                    RenderContext.setUniform2fv(name, count, value1, value2);
                }.bind(this, name, count, value1, value2));
            }
            setUniform3fv(name, count, value1, value2, value3) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2, value3) {
                    RenderContext.setUniform3fv(name, count, value1, value2, value3);
                }.bind(this, name, count, value1, value2, value3));
            }
            setUniform4fv(name, count, value1, value2, value3, value4) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                    RenderContext.setUniform4fv(name, count, value1, value2, value3, value4);
                }.bind(this, name, count, value1, value2, value3, value4));
            }
            setUniformMatrix2fv(name, mat) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix2fv(name, mat);
                }.bind(this, name, mat));
            }
            setUniformMatrix3fv(name, mat) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix3fv(name, mat);
                }.bind(this, name, mat));
            }
            setUniformMatrix4fv(name, mat) {
                if (!this.handle)
                    return;
                this.uniformsValues.push(function (name, mat) {
                    RenderContext.setUniformMatrix4fv(name, mat);
                }.bind(this, name, mat));
            }
            updateUniforms() {
                if (!this.handle)
                    return;
                for (var i = 0; i < this.uniformsValues.length; i++) {
                    this.uniformsValues[i]();
                }
                this.uniformsValues = [];
            }
            getAttributes() {
                return this.attributes;
            }
            getUniforms() {
                return this.uniforms;
            }
            getAttributesCount() {
                return this.attributes.length;
            }
            getUniformsCount() {
                return this.uniforms.length;
            }
            getAttribute(name) {
                return this.attributes[name];
            }
            getUniform(name) {
                return this.uniforms[name];
            }
            getHandle() {
                return this.handle;
            }
            getShader(type, source) {
                var shader;
                if (type == gl.VERTEX_SHADER)
                    shader = gl.createShader(gl.VERTEX_SHADER);
                else if (type == gl.FRAGMENT_SHADER)
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                else
                    return null;
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    console.log(gl.getShaderInfoLog(shader));
                    return null;
                }
                return shader;
            }
            setUniforms(camera, translate, rotateAngle, rotateAxis, scale, color, texture) {
                var projectionViewMat = camera.getProjectionViewMatrix();
                gl.uniformMatrix4fv(this.uniforms["uPMatrix"], false, projectionViewMat);
                var modelMat = new mat4();
                modelMat.identity();
                modelMat.translate(translate);
                modelMat.rotate(rotateAngle * Math.PI / 180, rotateAxis);
                modelMat.scale(scale);
                gl.uniformMatrix4fv(this.uniforms["uMVMatrix"], false, modelMat);
                gl.uniform4fv(this.uniforms["uColor"], color);
                gl.uniform1i(this.uniforms["uTexture0"], 0);
            }
        }
        RenderContext.ShaderProgram = ShaderProgram;
        ;
        class VertexBuffer {
            constructor() {
                this.attributes = {};
                this.fvf = RenderContext.FVF.None;
            }
            destructor() {
            }
            construct() {
                return this.onConstruct();
            }
            destruct() {
                this.onDestruct();
            }
            onConstruct() {
                return true;
            }
            onDestruct() {
                for (var key in this.attributes) {
                    var attribute = this.attributes[key];
                    if (attribute.handle) {
                        gl.deleteBuffer(attribute.handle);
                        attribute.handle = null;
                    }
                }
                this.attributes = {};
            }
            getFVF() {
                return this.fvf;
            }
            createVertexAttribute(data, itemSize, usage) {
                var usages = [
                    gl.STATIC_DRAW,
                    gl.STREAM_DRAW,
                    gl.DYNAMIC_DRAW
                ];
                var attibute = { handle: null, itemSize: 0, numItems: 0 };
                attibute.handle = gl.createBuffer();
                if (!attibute.handle)
                    return null;
                if (!usage)
                    usage = RenderContext.Usage.StaticDraw;
                gl.bindBuffer(gl.ARRAY_BUFFER, attibute.handle);
                gl.bufferData(gl.ARRAY_BUFFER, data, usages[usage]);
                attibute.itemSize = itemSize;
                attibute.numItems = data.length / attibute.itemSize;
                return attibute;
            }
            getAttributes() {
                return this.attributes;
            }
            setAttribute(attribute, data, itemSize, usage) {
                this.attributes[attribute] = this.createVertexAttribute(data, itemSize, usage);
                this.fvf |= attribute;
                return this.attributes[attribute] != null;
            }
            getAttribute(attribute) {
                return this.attributes[attribute];
            }
            setPosition(positions, usage) {
                return this.setAttribute(RenderContext.FVF.Position, positions, 3, usage);
            }
            getPosition() {
                return this.getAttribute(RenderContext.FVF.Position);
            }
            setColor(colors, usage) {
                return this.setAttribute(RenderContext.FVF.Color, colors, 4, usage);
            }
            getColor() {
                return this.getAttribute(RenderContext.FVF.Color);
            }
            setTexCoord(i, texcoords, itemSize, usage) {
                return this.setAttribute(RenderContext.FVF.TexCoord0 << i, texcoords, 2, usage);
            }
            getTexCoord(i) {
                return this.getAttribute(RenderContext.FVF.TexCoord0 << i);
            }
        }
        RenderContext.VertexBuffer = VertexBuffer;
        ;
        class IndexBuffer {
            constructor() {
                this.indexAttribute = {};
            }
            destructor() {
            }
            construct() {
                return this.onConstruct();
            }
            destruct() {
                this.onDestruct();
            }
            onConstruct() {
                return true;
            }
            onDestruct() {
                if (this.indexAttribute.handle) {
                    gl.deleteBuffer(this.indexAttribute.handle);
                    this.indexAttribute.handle = null;
                }
                this.indexAttribute = {};
            }
            createIndexAttribute(data, usage) {
                var usages = [
                    gl.STATIC_DRAW,
                    gl.STREAM_DRAW,
                    gl.DYNAMIC_DRAW
                ];
                var attibute = { handle: null, itemSize: 0, numItems: 0 };
                attibute.handle = gl.createBuffer();
                if (!attibute.handle)
                    return null;
                if (!usage)
                    usage = RenderContext.Usage.StaticDraw;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attibute.handle);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usages[usage]);
                attibute.itemSize = 2;
                attibute.numItems = data.length / attibute.itemSize;
                return attibute;
            }
            setIndices(indices, usage) {
                this.indexAttribute = this.createIndexAttribute(indices, usage);
                return this.indexAttribute != null;
            }
            getIndices() {
                return this.indexAttribute.buffer;
            }
        }
        RenderContext.IndexBuffer = IndexBuffer;
        ;
        class Texture {
            constructor() {
                this.handle = null;
                this.width = 0;
                this.height = 0;
                this.mipmap = false;
                this.textureTarget = RenderContext.TextureTarget.Target2D;
                this.minFilter = RenderContext.MinFilter.Linear;
                this.magFilter = RenderContext.MagFilter.Linear;
                this.wrapS = RenderContext.Wrap.Repeat;
                this.wrapT = RenderContext.Wrap.Repeat;
            }
            static pot(n) {
                return (n > 0) && (n & (n - 1)) == 0;
            }
            destructor() {
            }
            construct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap) {
                return this.onConstruct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap);
            }
            destruct() {
                this.onDestruct();
            }
            onConstruct(textureTarget, level, width, height, internalFormat, format, type, object, genMipmap) {
                var textureTargets = [
                    gl.TEXTURE_2D,
                    gl.TEXTURE_CUBE_MAP,
                ];
                var textureFaces = [
                    gl.TEXTURE_2D,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                    gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                    gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
                ];
                var internalFormats = [
                    gl.ALPHA,
                    gl.LUMINANCE,
                    gl.LUMINANCE_ALPHA,
                    gl.RGB,
                    gl.RGBA
                ];
                var formats = [
                    gl.ALPHA,
                    gl.RGB,
                    gl.RGBA,
                    gl.LUMINANCE,
                    gl.LUMINANCE_ALPHA
                ];
                var types = [
                    gl.UNSIGNED_BYTE,
                    gl.UNSIGNED_SHORT_5_6_5,
                    gl.UNSIGNED_SHORT_4_4_4_4,
                    gl.UNSIGNED_SHORT_5_5_5_1
                ];
                var bindings = [
                    gl.TEXTURE_BINDING_2D,
                    gl.TEXTURE_BINDING_CUBE_MAP,
                    gl.TEXTURE_BINDING_CUBE_MAP,
                    gl.TEXTURE_BINDING_CUBE_MAP,
                    gl.TEXTURE_BINDING_CUBE_MAP,
                    gl.TEXTURE_BINDING_CUBE_MAP,
                    gl.TEXTURE_BINDING_CUBE_MAP
                ];
                if (!object) {
                    var currentTexture;
                    currentTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);
                    this.handle = gl.createTexture();
                    if (!this.handle)
                        return false;
                    var data = new Int8Array(256 * 256 * 4);
                    var idx = 0;
                    for (var j = 0; j < 256; j++) {
                        for (var i = 0; i < 256; i++) {
                            var a = (i % 64) < 32;
                            var b = (j % 64) < 32;
                            if ((a && !b) || (!a && b)) {
                                data[idx++] = 255;
                                data[idx++] = 255;
                                data[idx++] = 255;
                            }
                            data[idx++] = 255;
                        }
                    }
                    gl.bindTexture(gl.TEXTURE_2D, this.handle);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                    gl.generateMipmap(gl.TEXTURE_2D);
                    this.textureTarget = textureTarget;
                    this.width = 256;
                    this.height = 256;
                    this.mipmap = true;
                    if (currentTexture)
                        gl.bindTexture(gl.TEXTURE_2D, currentTexture);
                    /*
                    var img = new Image();
                    img.onload = function () {
                        var oldBindedTexture;
                        oldBindedTexture = gl.getParameter(gl.TEXTURE_BINDING_2D);

                        this.ctx = gl.createTexture();
                        if (!this.ctx)
                            return false;

                        gl.bindTexture(gl.TEXTURE_2D, this.ctx);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

                        this.textureTarget = textureTarget;
                        this.width = img.width;
                        this.height = img.height;
                        if (Texture.pot(img.width) && Texture.pot(img.height) && genMipmap) {
                            gl.generateMipmap(gl.TEXTURE_2D);
                            this.mipmap = true;
                        }
                        else {
                            this.mipmap = false;
                        }

                        gl.bindTexture(gl.TEXTURE_2D, oldBindedTexture);
                    }.bind(this);
                    img.src = "assets/block.png";
                    */
                }
                else {
                    var image = object;
                    var currentTexture;
                    currentTexture = gl.getParameter(bindings[textureTarget]);
                    this.handle = gl.createTexture();
                    if (!this.handle)
                        return false;
                    gl.bindTexture(textureTargets[textureTarget], this.handle);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_WRAP_S, gl.REPEAT);
                    gl.texParameteri(textureTargets[textureTarget], gl.TEXTURE_WRAP_T, gl.REPEAT);
                    gl.texImage2D(textureFaces[0], 0, internalFormats[internalFormat], formats[format], types[type], image);
                    this.textureTarget = textureTarget;
                    this.width = image.width;
                    this.height = image.height;
                    if (Texture.pot(image.width) && Texture.pot(image.height) && genMipmap) {
                        gl.generateMipmap(textureTargets[textureTarget]);
                        this.mipmap = true;
                    }
                    else {
                        this.mipmap = false;
                    }
                    if (currentTexture)
                        gl.bindTexture(textureTargets[textureTarget], currentTexture);
                }
                return true;
            }
            onDestruct() {
                if (this.handle) {
                    gl.deleteTexture(this.handle);
                    this.handle = null;
                }
            }
            getHandle() {
                return this.handle;
            }
            get Width() {
                return this.width;
            }
            get Height() {
                return this.height;
            }
            get PowerOf2() {
                return Texture.pot(this.width) && Texture.pot(this.height);
            }
            get Mipmap() {
                return this.mipmap;
            }
            get TextureTarget() {
                return this.textureTarget;
            }
            get MinFilter() {
                return this.minFilter;
            }
            set MinFilter(value) {
                this.minFilter = value;
            }
            get MagFilter() {
                return this.magFilter;
            }
            set MagFilter(value) {
                this.magFilter = value;
            }
            get WrapS() {
                return this.wrapS;
            }
            set WrapS(value) {
                this.wrapS = value;
            }
            get WrapT() {
                return this.wrapT;
            }
            set WrapT(value) {
                this.wrapT = value;
            }
        }
        RenderContext.Texture = Texture;
        ;
    })(RenderContext = Magnum.RenderContext || (Magnum.RenderContext = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Camera.ts" /> 
/// <reference path = "Renderer.ts" /> 
/// <reference path = "Matrix4.ts" /> 
/// <reference path = "RenderContext.ts" /> 
////////////////////////////////////////////////////////////////////////////////////////////////
var Magnum;
(function (Magnum) {
    class Video {
        constructor() {
        }
        destructor() {
        }
    }
    Magnum.Video = Video;
    (function (Video) {
        class RenderParam {
            constructor(camera) {
                this.camera = camera;
                this.viewTransform = camera.GameObject.getGlobalTransformInverse();
                this.projTransform = camera.getProjectionTransform();
                this.projViewTransform = Magnum.Matrix4.mul(this.projTransform, this.viewTransform);
                this.viewTransformInverse = this.viewTransform.inverse();
                this.projTransformInverse = this.projTransform.inverse();
                this.projViewTransformInverse = this.projViewTransform.inverse();
            }
            destructor() {
            }
        }
        Video.RenderParam = RenderParam;
        ;
        class Manager {
            constructor() {
                this.cameras = new Array();
                this.renderers = new Array();
            }
            destructor() {
                this.cameras = null;
                this.renderers = null;
            }
            static getInstance() {
                if (Video.Manager.instance == null) {
                    Video.Manager.instance = new Video.Manager();
                }
                return Video.Manager.instance;
            }
            addCamera(camera) {
                this.cameras.push(camera);
            }
            removeCamera(camera) {
                var idx = idx = this.cameras.indexOf(camera);
                if (idx != -1)
                    this.cameras.splice(idx, 1);
            }
            findCamera(name) {
                for (const camera of this.cameras) {
                    if (camera.Name == name) {
                        return camera;
                    }
                }
                return null;
            }
            addRenderer(render) {
                this.renderers.push(render);
            }
            removeRenderer(renderer) {
                var idx = idx = this.renderers.indexOf(renderer);
                if (idx != -1)
                    this.renderers.splice(idx, 1);
            }
            findRenderers(name) {
                for (const camera of this.cameras) {
                    if (camera.Name == name) {
                        return camera;
                    }
                }
                return null;
            }
            initiate() {
                if (!Magnum.RenderContext.initiate(Magnum.Stage.getScreenWidth(), Magnum.Stage.getScreenHeight()))
                    return false;
                return true;
            }
            update() {
                var sortedCameras = this.cameras.sort(function (a, b) {
                    return a.getOrder() - b.getOrder();
                });
                //this.renderEditorCameras(sortedCameras);
                this.renderGameCameras(sortedCameras);
                Magnum.RenderContext.flush();
                Magnum.RenderContext.finish();
            }
            renderEditorCameras(cameras) {
                var sortedRenderers = this.renderers.sort(function (a, b) {
                    return a.getOrder() - b.getOrder();
                });
                for (var i = 0; i < cameras.length; i++) {
                    var camera = cameras[i];
                    if (camera.Active /*&& camera.isEditorModeActive() && Stage::isEditorMode*/) // draw editor camera
                     {
                        var param = new Video.RenderParam(camera);
                        this.beginRender(camera, 0, 0, 1, 1);
                        for (var j = 0; j < sortedRenderers.length; j++) {
                            var renderer = sortedRenderers[j];
                            if (renderer.Active) {
                                renderer.render(param);
                            }
                        }
                        /*
                        if(camera.getRenderTargetTexture())
                        {
                            for(int i=0; i<camera.filters.length(); i++)
                            {
                                Video::BaseFilter &filter = *camera.getFilter(i);
                                if( filter.getEnabled() )
                                {
                                    filter.prepare(param);
                                    filter.render(param);
                                    filter.restore(param);
                                }
                            }
                        }
                        */
                        this.renderViewportBoundary(camera);
                        this.endRender(camera);
                    }
                }
            }
            renderGameCameras(cameras) {
                var offsety = 0;
                var sortedRenderers = this.renderers.sort(function (a, b) {
                    return a.getOrder() - b.getOrder();
                });
                for (var i = 0; i < cameras.length; i++) {
                    var camera = cameras[i];
                    if (camera.Active /* && !camera.isEditorModeActive()*/) {
                        var param = new Video.RenderParam(camera);
                        if (Magnum.Stage.isEditorMode)
                            this.beginRender(camera, 0.8, offsety, 0.2, 0.2);
                        else
                            this.beginRender(camera, 0.0, 0.0, 1.0, 1.0);
                        for (var j = 0; j < sortedRenderers.length; j++) {
                            var renderer = sortedRenderers[j];
                            if (renderer.Active) {
                                renderer.render(param);
                            }
                        }
                        /*
                        if(camera.getRenderTargetTexture())
                        {
                            for(int i=0; i<camera.filters.length(); i++)
                            {
                                Video::BaseFilter &filter = *camera.getFilter(i);
                                if( filter.getEnabled() )
                                {
                                    filter.prepare(param);
                                    filter.render(param);
                                    filter.restore(param);
                                }
                            }
                        }
                        */
                        if (Magnum.Stage.isEditorMode)
                            this.renderViewportBoundary(camera);
                        offsety += 0.2;
                        this.endRender(camera);
                    }
                }
            }
            beginRender(camera, offsetX, offsetY, scaleX, scaleY) {
                //if(renderTargetTexture)
                //renderTargetTexture->beginRender();
                if (camera.ClearFlags == Magnum.Camera.ClearFlag.None)
                    return;
                else if (camera.ClearFlags == Magnum.Camera.ClearFlag.SkyBox) {
                    // do sky box
                    return;
                }
                else {
                    var mask = 0;
                    if (camera.ClearFlags & Magnum.Camera.ClearFlag.Color) {
                        var clearColor = camera.ClearColor;
                        Magnum.RenderContext.clearColor(clearColor.R, clearColor.G, clearColor.B, clearColor.A);
                        mask = mask | Magnum.RenderContext.ClearFlags.ColorBuffer;
                    }
                    if (camera.ClearFlags & Magnum.Camera.ClearFlag.Depth) {
                        var clearDepth = camera.ClearDepth;
                        Magnum.RenderContext.clearDepth(clearDepth);
                        mask = mask | Magnum.RenderContext.ClearFlags.DepthBuffer;
                    }
                    if (camera.ClearFlags & Magnum.Camera.ClearFlag.Stecil) {
                        var clearStencil = camera.ClearStencil;
                        Magnum.RenderContext.clearStencil(clearStencil);
                        mask = mask | Magnum.RenderContext.ClearFlags.StencilBuffer;
                    }
                    if (Magnum.Stage.isEditorMode) {
                        var viewport = camera.Viewport;
                        var viewportX = (viewport.X * scaleX + offsetX) * Magnum.Stage.getScreenWidth();
                        var viewportY = (viewport.Y * scaleY + offsetY) * Magnum.Stage.getScreenHeight();
                        var viewportWidth = (viewport.Width * scaleX) * Magnum.Stage.getScreenWidth();
                        var viewportHeight = (viewport.Height * scaleY) * Magnum.Stage.getScreenHeight();
                        var previewClipX = (0 * scaleX + offsetX) * Magnum.Stage.getScreenWidth();
                        var previewClipY = (0 * scaleY + offsetY) * Magnum.Stage.getScreenHeight();
                        var previewClipWidth = (1 * scaleX) * Magnum.Stage.getScreenWidth();
                        var previewClipHeight = (1 * scaleY) * Magnum.Stage.getScreenHeight();
                        Magnum.RenderContext.viewport(previewClipX, previewClipY, previewClipWidth, previewClipHeight);
                        Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.ScissorTest);
                        Magnum.RenderContext.scissor(previewClipX, previewClipY, previewClipWidth, previewClipHeight);
                        Magnum.RenderContext.clear(mask);
                    }
                    else {
                        var viewport = camera.Viewport;
                        var viewportX = (viewport.X * scaleX + offsetX) * Magnum.Stage.getScreenWidth();
                        var viewportY = (viewport.Y * scaleY + offsetY) * Magnum.Stage.getScreenHeight();
                        var viewportWidth = (viewport.Width * scaleX) * Magnum.Stage.getScreenWidth();
                        var viewportHeight = (viewport.Height * scaleY) * Magnum.Stage.getScreenHeight();
                        Magnum.RenderContext.viewport(viewportX, viewportY, viewportWidth, viewportHeight);
                        Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.ScissorTest);
                        Magnum.RenderContext.scissor(viewportX, viewportY, viewportWidth, viewportHeight);
                        Magnum.RenderContext.clear(mask);
                    }
                }
            }
            renderViewportBoundary(camera) {
                var projMat = new Magnum.Matrix4();
                projMat.initOrthogonalOffCenter(0, 1, 0, 1, 1, 100);
                /*
                var pos =
                    [
                        new Vector3([0.0, 0.0, -1.0]),
                        new Vector3([1.0, 0.0, -1.0]),
                        new Vector3([1.0, 1.0, -1.0]),
                        new Vector3([0.0, 1.0, -1.0]),
                        new Vector3([0.0, 0.0, -1.0]),
                    ];
                */
                /*
                RenderContext.draw(
                    GXDrawMode::LineStrip, projMat, Matrix4::IDENTITY, Matrix4::IDENTITY, &pos[0], ColorRGBA(1, 1, 1, 1), 5
                );*/
            }
            endRender(camera) {
                Magnum.RenderContext.flush();
                //if(renderTargetTexture)
                //renderTargetTexture->endRender();
            }
            pause() {
            }
            resume() {
            }
            terminate() {
            }
        }
        Manager.instance = null;
        Video.Manager = Manager;
        class Service {
            static Name() {
                return "Video";
            }
            static initiate() {
                return Video.Manager.getInstance().initiate();
            }
            static update() {
                Video.Manager.getInstance().update();
            }
            static pause() {
                Video.Manager.getInstance().pause();
            }
            static resume() {
                Video.Manager.getInstance().resume();
            }
            static terminate() {
                Video.Manager.getInstance().terminate();
            }
        }
        Video.Service = Service;
        ;
    })(Video = Magnum.Video || (Magnum.Video = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Audio {
        constructor() {
        }
        destructor() {
        }
    }
    Magnum.Audio = Audio;
    (function (Audio) {
        class Listener {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Audio.Listener = Listener;
        class Source {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Audio.Source = Source;
        class ReverbZone {
            constructor() {
            }
            destructor() {
            }
            get Name() {
                return this.name;
            }
            set Name(value) {
                this.name = value;
            }
            update() {
            }
            pause() {
            }
            resume() {
            }
        }
        Audio.ReverbZone = ReverbZone;
        class Manager {
            constructor() {
                this.listeners = new Array();
                this.sources = new Array();
                this.reverbZones = new Array();
            }
            destructor() {
                this.listeners = null;
                this.sources = null;
                this.reverbZones = null;
            }
            static getInstance() {
                if (Audio.Manager.instance == null) {
                    Audio.Manager.instance = new Audio.Manager();
                }
                return Audio.Manager.instance;
            }
            addListener(listener) {
                this.listeners.push(listener);
            }
            removeListener(listener) {
                var idx = idx = this.listeners.indexOf(listener);
                if (idx != -1)
                    this.listeners.splice(idx, 1);
            }
            findListener(name) {
                for (const listener of this.listeners) {
                    if (listener.Name == name) {
                        return listener;
                    }
                }
                return null;
            }
            addSource(source) {
                this.sources.push(source);
            }
            removeSource(source) {
                var idx = idx = this.sources.indexOf(source);
                if (idx != -1)
                    this.sources.splice(idx, 1);
            }
            findSource(name) {
                for (const source of this.sources) {
                    if (source.Name == name) {
                        return source;
                    }
                }
                return null;
            }
            addReverbZone(reverbZone) {
                this.reverbZones.push(reverbZone);
            }
            removeReverbZone(reverbZone) {
                var idx = idx = this.reverbZones.indexOf(reverbZone);
                if (idx != -1)
                    this.reverbZones.splice(idx, 1);
            }
            findReverbZone(name) {
                for (const reverbZone of this.reverbZones) {
                    if (reverbZone.Name == name) {
                        return reverbZone;
                    }
                }
                return null;
            }
            ///////////////////////////////////////////////////////////////
            initiate() {
                return true;
            }
            update() {
                for (const listener of this.listeners) {
                    listener.update();
                }
                for (const source of this.sources) {
                    source.update();
                }
                for (const reverbZone of this.reverbZones) {
                    reverbZone.update();
                }
            }
            pause() {
            }
            resume() {
            }
            terminate() {
            }
        }
        Manager.instance = null;
        Audio.Manager = Manager;
        class Service {
            static Name() {
                return "Audio";
            }
            static initiate() {
                return Audio.Manager.getInstance().initiate();
            }
            static update() {
                Audio.Manager.getInstance().update();
            }
            static pause() {
                Audio.Manager.getInstance().pause();
            }
            static resume() {
                Audio.Manager.getInstance().resume();
            }
            static terminate() {
                Audio.Manager.getInstance().terminate();
            }
        }
        Audio.Service = Service;
        ;
    })(Audio = Magnum.Audio || (Magnum.Audio = {}));
})(Magnum || (Magnum = {}));
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
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Matrix4.ts" /> 
var Magnum;
(function (Magnum) {
    class Frame3 {
        constructor() {
            this.parent = null;
            this.children = new Array();
            this.localTransform = new Magnum.Matrix4();
            this.localTransform.initIdentity();
            this.globalTransform = new Magnum.Matrix4();
            this.globalTransform.initIdentity();
            this.validGlobal = true;
        }
        destructor() {
        }
        initZero() {
            this.localTransform.initZero();
            this.inValidateGlobal();
        }
        initIdentity() {
            this.localTransform.initIdentity();
            this.inValidateGlobal();
        }
        initTranslate(x, y, z) {
            this.localTransform.initTranslate(x, y, z);
            this.inValidateGlobal();
        }
        initRotateX(angle) {
            this.localTransform.initRotateX(angle);
            this.inValidateGlobal();
        }
        initRotateY(angle) {
            this.localTransform.initRotateY(angle);
            this.inValidateGlobal();
        }
        initRotateZ(angle) {
            this.localTransform.initRotateZ(angle);
            this.inValidateGlobal();
        }
        initRotateZXY(z, x, y) {
            this.localTransform.initRotateZXY(z, x, y);
            this.inValidateGlobal();
        }
        initRotateZYX(z, y, x) {
            this.localTransform.initRotateZYX(z, y, x);
            this.inValidateGlobal();
        }
        initRotateAxisAngle(axis, angle) {
            this.localTransform.initRotateAxisAngle(axis, angle);
            this.inValidateGlobal();
        }
        initScale(x, y, z) {
            this.localTransform.initScale(x, y, z);
            this.inValidateGlobal();
        }
        initTranslateRotZXYScale(tx, ty, tz, rz, rx, ry, scale) {
            this.localTransform.initTranslateRotZXYScale(tx, ty, tz, rz, rx, ry, scale);
            this.inValidateGlobal();
        }
        initTranslateRotZYXScale(tx, ty, tz, rz, ry, rx, scale) {
            this.localTransform.initTranslateRotZYXScale(tx, ty, tz, rz, ry, rx, scale);
            this.inValidateGlobal();
        }
        initTranslateRotAxisAngleScale(tx, ty, tz, axis, angle, scale) {
            this.localTransform.initTranslateRotAxisAngleScale(tx, ty, tz, axis, angle, scale);
            this.inValidateGlobal();
        }
        initTranslateScale(tx, ty, tz, scale) {
            this.localTransform.initTranslateScale(tx, ty, tz, scale);
            this.inValidateGlobal();
        }
        initLookAt(position, object, upward) {
            this.localTransform.initLookAt(position, object, upward);
            this.inValidateGlobal();
        }
        initLookAtScale(position, object, upward, scale) {
            this.localTransform.initLookAtScale(position, object, upward, scale);
            this.inValidateGlobal();
        }
        initStandOn(position, object, upward) {
            this.localTransform.initStandOn(position, object, upward);
            this.inValidateGlobal();
        }
        initStandOnScale(position, object, upward, scale) {
            this.localTransform.initStandOnScale(position, object, upward, scale);
            this.inValidateGlobal();
        }
        // setter
        setLocalTransform(localtransform) {
            this.localTransform = localtransform;
            this.inValidateGlobal();
        }
        setLocalPosition(localposition) {
            this.localTransform.setTranslate(localposition);
            this.inValidateGlobal();
        }
        setGlobalTransform(globalTransform) {
            if (this.getParent())
                this.localTransform = Magnum.Matrix4.mul(this.getParent().getGlobalTransform().inverse(), this.globalTransform);
            else
                this.localTransform = globalTransform;
            this.inValidateGlobal();
        }
        setGlobalPosition(globalposition) {
            //validateGlobal(); // can remove ?, yes can
            var localposition;
            if (this.getParent())
                localposition = this.getParent().getGlobalTransform().inverse().mulVector3(globalposition);
            else
                localposition = globalposition;
            this.localTransform.setTranslate(localposition);
            this.inValidateGlobal();
        }
        // getter
        getLocalTransform() {
            return this.localTransform;
        }
        getLocalPosition() {
            return this.localTransform.getTranslate();
        }
        getLocalXAxis() {
            return this.localTransform.getXAxis();
        }
        getLocalYAxis() {
            return this.localTransform.getYAxis();
        }
        getLocalZAxis() {
            return this.localTransform.getZAxis();
        }
        getGlobalTransform() {
            this.validateGlobal();
            return this.globalTransform;
        }
        getGlobalPosition() {
            this.validateGlobal();
            return this.globalTransform.getTranslate();
        }
        getGlobalXAxis() {
            this.validateGlobal();
            return this.globalTransform.getXAxis();
        }
        getGlobalYAxis() {
            this.validateGlobal();
            return this.globalTransform.getYAxis();
        }
        getGlobalZAxis() {
            this.validateGlobal();
            return this.globalTransform.getZAxis();
        }
        getGlobalTransformInverse() {
            this.validateGlobal();
            return this.globalTransform.inverse();
        }
        getParentGlobalTransform() {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform();
            }
            else
                return Magnum.Matrix4.Identity;
        }
        getParentGlobalPosition() {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getTranslate();
            }
            else
                return Magnum.Vector3.Zero;
        }
        getParentGlobalXAxis() {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getXAxis();
            }
            else
                return Magnum.Vector3.UnitX;
        }
        getParentGlobalYAxis() {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getYAxis();
            }
            else
                return Magnum.Vector3.UnitY;
        }
        getParentGlobalZAxis() {
            if (this.getParent()) {
                return this.getParent().getGlobalTransform().getZAxis();
            }
            else
                return Magnum.Vector3.UnitZ;
        }
        // setter
        addChild(child) {
            Magnum.Console.assert(child.getParent() == null); // not child already
            this.children.push(child);
            child.parent = this;
            child.inValidateGlobal();
        }
        setChild(child, index) {
            Magnum.Console.assert(child.getParent() == null); // not child already
            Magnum.Console.assert(index >= 0 && index < this.children.length); // index in range
            this.removeChild(child);
            this.insertChild(child, index);
        }
        insertChild(child, index) {
            Magnum.Console.assert(child.getParent() == null); // not child already
            this.children.splice(index, 0, child);
            child.parent = this;
            child.inValidateGlobal();
        }
        removeAllChildren() {
            while (this.children.length > 0) {
                this.removeChild(this.children[0]);
            }
            ;
        }
        removeChild(child) {
            var idx = this.children.indexOf(child);
            if (idx != -1) {
                child.parent = null;
                child.inValidateGlobal();
                //child_->inValidateGlobalInverse();
                this.children.splice(idx, 1);
            }
        }
        // getter
        getAllChildren(children) {
            children = this.children;
            return children.length;
        }
        getChild(index) {
            Magnum.Console.assert(index >= 0 && index < this.children.length);
            return this.children[index];
        }
        indexOfChild(child) {
            return this.children.indexOf(child);
        }
        getNumChildren() {
            return this.children.length;
        }
        getParent() {
            return this.parent;
        }
        validateGlobal() {
            if (this.validGlobal)
                return;
            this.globalTransform = Magnum.Matrix4.mul(this.getParentGlobalTransform(), this.localTransform);
            this.validGlobal = true;
        }
        inValidateGlobal() {
            this.validGlobal = false;
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].inValidateGlobal();
            }
        }
        isValidGlobal() {
            return this.validGlobal;
        }
    }
    Magnum.Frame3 = Frame3;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class GameObject extends Magnum.Frame3 {
        constructor() {
            super();
            this.guid = 0;
            this.name = "";
            this.tag = "";
            this.layer = 0;
            this.active = true;
            this.isstatic = true;
            this.components = new Array();
            //this.creator = null;
        }
        destructor() {
        }
        static ClassName() {
            return "GameObject";
        }
        static testJSON(jsonString) {
            var go = GameObject.Manager.getInstance().create("TestGameObject");
            var component1 = Magnum.Component.Manager.getInstance().create(Magnum.Component1, go, "TestComponent1");
            var component2 = Magnum.Component.Manager.getInstance().create(Magnum.Component1, go, "TestComponent1");
            go.addComponent(component1);
            go.addComponent(component2);
            Magnum.Component.Manager.getInstance().release(component1);
            Magnum.Component.Manager.getInstance().release(component2);
            GameObject.Manager.getInstance().release(go);
            //delete component1.gameObject; // remove cyclic dependence
            //delete component2.gameObject;
            var goJson = JSON.stringify(go);
            var goObj = JSON.parse(goJson);
            Magnum.Console.debug(goJson);
            Magnum.Console.debug(goObj);
            var component1Json = JSON.stringify(component1);
            var component1Obj = JSON.parse(component1Json);
            Magnum.Console.debug(component1Json);
            Magnum.Console.debug(component1Obj);
            var component2Json = JSON.stringify(component2);
            var component2Obj = JSON.parse(component2Json);
            Magnum.Console.debug(component2Json);
            Magnum.Console.debug(component2Obj);
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
        getNumComponents() {
            return this.components.length;
        }
        getComponent(i) {
            return this.components[i];
        }
        addComponent(component) {
            if (this.components.indexOf(component) == -1)
                this.components.push(component);
        }
        removeComponent(component) {
            var idx = this.components.indexOf(component);
            if (idx != -1)
                this.components.splice(idx, 1);
        }
        getComponentByName(name) {
            for (const component of this.components) {
                if (component.Name == name) {
                    return component;
                }
            }
            return null;
        }
        select() {
            GameObject.selected = this;
        }
        unselect() {
            if (GameObject.selected == this)
                GameObject.selected = null;
        }
        isSelected() {
            return GameObject.selected == this;
        }
        static getSelected() {
            return GameObject.selected;
        }
        construct() {
            for (const component of this.components) {
                if (!component.construct())
                    return false;
            }
            return this.onConstruct();
        }
        start() {
            for (const component of this.components) {
                component.start();
            }
            this.onStart();
        }
        update() {
            for (const component of this.components) {
                component.update();
            }
            this.onUpdate();
        }
        pause() {
            for (const component of this.components) {
                component.pause();
            }
            this.onPause();
        }
        resume() {
            for (const component of this.components) {
                component.resume();
            }
            this.onResume();
        }
        stop() {
            this.onStop();
            for (const component of this.components) {
                component.stop();
            }
        }
        destruct() {
            this.onDestruct();
            for (const component of this.components) {
                component.destruct();
            }
        }
        debugRender() {
            this.onDebugRender();
            for (const component of this.components) {
                component.debugRender();
            }
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
        static findGameObjectByName(name, className = "GameObject") {
            return GameObject.Manager.getInstance().findGameObjectByName(name, className);
        }
        static findGameObjectByTag(tag, className = "GameObject") {
            return GameObject.Manager.getInstance().findGameObjectByTag(name, className);
        }
        static findGameObjectByGUID(guid, className = "GameObject") {
            return GameObject.Manager.getInstance().findGameObjectByGUID(guid, className);
        }
    }
    GameObject.selected = null;
    Magnum.GameObject = GameObject;
    (function (GameObject) {
        class ICreator {
            constructor() {
                this.activeGameObjects = new Array();
                this.inactiveGameObjects = new Array();
            }
            destructor() {
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
            ClassName() {
                return "";
            }
            create(name) {
                return null;
            }
            release(gameObject) {
                return true;
            }
            contains(gameObject) {
                return this.activeGameObjects.indexOf(gameObject) != -1;
            }
            getGameObjectsCount() {
                return this.activeGameObjects.length;
            }
            getGameObject(i) {
                return this.activeGameObjects[i];
            }
            deleteActiveGameObjects() {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    this.activeGameObjects[i].destructor();
                    this.activeGameObjects[i] = null;
                }
                this.activeGameObjects = new Array();
            }
            deleteInActiveGameObjects() {
                for (var i = 0; i < this.inactiveGameObjects.length; i++) {
                    this.inactiveGameObjects[i].destructor();
                    this.inactiveGameObjects[i] = null;
                }
                this.inactiveGameObjects = new Array();
            }
            findGameObjectByName(name) {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].Name == name)
                        return this.activeGameObjects[i];
                }
                return null;
            }
            findGameObjectByTag(tag) {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].Tag == tag)
                        return this.activeGameObjects[i];
                }
                return null;
            }
            findGameObjectByGUID(guid) {
                for (var i = 0; i < this.activeGameObjects.length; i++) {
                    if (this.activeGameObjects[i].GUID == guid)
                        return this.activeGameObjects[i];
                }
                return null;
            }
            recycle() {
                this.deleteInActiveGameObjects();
            }
            update() {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.update();
                }
            }
            pause() {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.pause();
                }
                for (const inactiveGameObject of this.inactiveGameObjects) {
                    inactiveGameObject.pause();
                }
            }
            resume() {
                for (const activeGameObject of this.activeGameObjects) {
                    activeGameObject.resume();
                }
                for (const inactiveGameObject of this.inactiveGameObjects) {
                    inactiveGameObject.resume();
                }
            }
            clear() {
                this.deleteActiveGameObjects();
                this.deleteInActiveGameObjects();
            }
        }
        GameObject.ICreator = ICreator;
        ;
        class Creator extends ICreator {
            constructor(gameObjectClassInterface) {
                super();
                this.gameObjectClassInterface = gameObjectClassInterface;
            }
            destructor() {
                super.destructor();
            }
            ClassName() {
                return this.gameObjectClassInterface.ClassName();
            }
            create(name) {
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
            release(gameObject) {
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
        }
        GameObject.Creator = Creator;
        ;
        class Manager {
            constructor() {
                this.creators = new Array();
                this.nextGUID = 1;
            }
            destructor() {
                for (var i = 0; i < this.creators.length; i++) {
                    this.creators[i].destructor();
                    this.creators[i] = null;
                }
                this.creators = null;
            }
            static getInstance() {
                if (GameObject.Manager.instance == null) {
                    GameObject.Manager.instance = new Manager();
                }
                return GameObject.Manager.instance;
            }
            register(gameObjectClassInterface) {
                this.creators.push(new GameObject.Creator(gameObjectClassInterface));
            }
            update() {
                for (const creator of this.creators) {
                    creator.update();
                }
                for (const creator of this.creators) {
                    creator.recycle();
                }
            }
            pause() {
                for (const creator of this.creators) {
                    creator.pause();
                }
            }
            resume() {
                for (const creator of this.creators) {
                    creator.resume();
                }
            }
            clear() {
                this.nextGUID = 1;
                for (const creator of this.creators) {
                    creator.clear();
                }
            }
            ////////////////////////////////////////////////////////////////////
            getNextUniqueID() {
                var rval = this.nextGUID;
                this.nextGUID = this.nextGUID + 1;
                return rval;
            }
            findGameObjectByName(name, className) {
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
            findGameObjectByTag(name, className) {
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
            findGameObjectByGUID(guid, className) {
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
            create(name, gameObjectClassInterface) {
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
            release(gameObject) {
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
            getCreatorsCount() {
                return this.creators.length;
            }
            getCreator(i) {
                return this.creators[i];
            }
            findCreatorByGameObject(gameObject) {
                for (const creator of this.creators) {
                    if (creator.contains(gameObject))
                        return creator;
                }
                return null;
            }
            findCreator(className) {
                for (const creator of this.creators) {
                    if (creator.ClassName() == className)
                        return creator;
                }
                return null;
            }
        }
        Manager.instance = null;
        GameObject.Manager = Manager;
        ;
    })(GameObject = Magnum.GameObject || (Magnum.GameObject = {}));
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class TestComponent1 extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "TestComponent1";
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
    }
    Magnum.TestComponent1 = TestComponent1;
    ;
    (function (TestComponent1) {
        class Data {
            constructor() {
            }
            destructor() {
            }
        }
        TestComponent1.Data = Data;
        ;
        class Resource extends Magnum.ResourceAccess {
            constructor(name) {
                super(name);
            }
            destructor() {
                super.destructor();
            }
            onConstruct() {
                console.log("TestComponent1.Resource.onConstruct ");
                return true;
            }
            onParse(data) {
                console.log("TestComponent1.Resource.onParse " + data.size + " " + data.type);
                this.setParseSucceed();
            }
            onDestruct() {
                console.log("TestComponent1.Resource.onDestroy");
            }
            static extensionTag() {
                return "txt";
            }
            extension() {
                return TestComponent1.Resource.extensionTag();
            }
            static get(path) {
                return Magnum.ResourceAccess.get(path, this.extensionTag());
            }
        }
        TestComponent1.Resource = Resource;
        ;
        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }
        };
        */
    })(TestComponent1 = Magnum.TestComponent1 || (Magnum.TestComponent1 = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class TestComponent2 extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "TestComponent2";
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
    }
    Magnum.TestComponent2 = TestComponent2;
    ;
    (function (TestComponent2) {
        class Data {
            constructor() {
            }
            destructor() {
            }
        }
        TestComponent2.Data = Data;
        ;
        class Resource extends Magnum.ResourceAccess {
            constructor(name) {
                super(name);
            }
            destructor() {
                super.destructor();
            }
            onConstruct() {
                console.log("TestComponent2.Resource.onConstruct ");
                return true;
            }
            onParse(data) {
                console.log("TestComponent2.Resource.onParse " + data.size + " " + data.type);
                this.setParseSucceed();
            }
            onDestruct() {
                console.log("TestComponent2.Resource.onDestroy");
            }
            static extensionTag() {
                return "txt.txt";
            }
            extension() {
                return TestComponent2.Resource.extensionTag();
            }
            static get(path) {
                return Magnum.ResourceAccess.get(path, this.extensionTag());
            }
        }
        TestComponent2.Resource = Resource;
        ;
    })(TestComponent2 = Magnum.TestComponent2 || (Magnum.TestComponent2 = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Texture {
        constructor() {
        }
        destructor() {
        }
        construct() {
            return this.onConstruct();
        }
        destruct() {
            this.onDestruct();
        }
        onConstruct() {
            return true;
        }
        onDestruct() {
        }
        getTextureCtx() {
            return null;
        }
        get Width() {
            return 0;
        }
        get Height() {
            return 0;
        }
        get PowerOf2() {
            return false;
        }
        get Mipmap() {
            return false;
        }
        getTextureTarget() {
            return Magnum.RenderContext.TextureTarget.Target2D;
        }
        get MinFilter() {
            return Magnum.RenderContext.MinFilter.Linear;
        }
        set MinFilter(value) {
        }
        get MagFilter() {
            return Magnum.RenderContext.MagFilter.Linear;
        }
        set MagFilter(value) {
        }
        get WrapS() {
            return Magnum.RenderContext.Wrap.Repeat;
        }
        set WrapS(value) {
        }
        get WrapT() {
            return Magnum.RenderContext.Wrap.Repeat;
        }
        set WrapT(value) {
        }
    }
    Magnum.Texture = Texture;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Texture.ts" /> 
var Magnum;
(function (Magnum) {
    class Texture2D extends Magnum.Texture {
        constructor() {
            super();
        }
        destructor() {
        }
    }
    Magnum.Texture2D = Texture2D;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Texture2D.ts" /> 
var Magnum;
(function (Magnum) {
    class Texture2DFile extends Magnum.Texture2D {
        constructor(path) {
            super();
            this.resource = null;
            this.path = path;
        }
        destructor() {
        }
        onConstruct() {
            this.resource = Texture2DFile.Resource.get(this.path);
            this.resource.addRef();
            return true;
        }
        onDestruct() {
            Texture2DFile.Resource.release(this.resource);
            this.resource = null;
        }
        get Width() {
            if (!this.getTextureCtx())
                return super.Width;
            else
                return this.resource.Width;
        }
        get Height() {
            if (!this.getTextureCtx())
                return super.Height;
            else
                return this.resource.Height;
        }
        get PowerOf2() {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.PowerOf2;
        }
        get Mipmap() {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.Mipmap;
        }
        get MinFilter() {
            if (!this.getTextureCtx())
                return super.MinFilter;
            else
                return this.resource.MinFilter;
        }
        set MinFilter(value) {
            if (!this.getTextureCtx())
                super.MinFilter = value;
            else
                this.resource.MinFilter = value;
        }
        get MagFilter() {
            if (!this.getTextureCtx())
                return super.MagFilter;
            else
                return this.resource.MagFilter;
        }
        set MagFilter(value) {
            if (!this.getTextureCtx())
                super.MagFilter = value;
            else
                this.resource.MagFilter = value;
        }
        get WrapS() {
            if (!this.getTextureCtx())
                return super.WrapS;
            else
                return this.resource.WrapS;
        }
        set WrapS(value) {
            if (!this.getTextureCtx())
                super.WrapS = value;
            else
                this.resource.WrapS = value;
        }
        get WrapT() {
            if (!this.getTextureCtx())
                return super.WrapT;
            else
                return this.resource.WrapT;
        }
        set WrapT(value) {
            if (!this.getTextureCtx())
                super.WrapT = value;
            else
                this.resource.WrapT = value;
        }
        getTextureCtx() {
            if (!this.resource)
                return null;
            else
                return this.resource.getTextureCtx();
        }
    }
    Magnum.Texture2DFile = Texture2DFile;
    ;
    (function (Texture2DFile) {
        class Data {
            constructor() {
            }
            destructor() {
            }
        }
        Texture2DFile.Data = Data;
        ;
        class Resource extends Magnum.ResourceAccess {
            constructor(name) {
                super(name);
                this.ctx = null;
            }
            destructor() {
                super.destructor();
                this.ctx = null;
            }
            onConstruct() {
                console.log("Texture2DFile.Resource.onConstruct ");
                return true;
            }
            onParse(blob) {
                Magnum.Console.debug("Texture2DFile.Resource.onParse");
                var img = new Image();
                img.onload = function () {
                    this.ctx = Magnum.RenderContext.createTexture(Magnum.RenderContext.TextureTarget.Target2D, 0, img.width, img.height, Magnum.RenderContext.InternalFormat.RGBA, Magnum.RenderContext.Format.RGBA, Magnum.RenderContext.Type.UnsignedByte, img, true);
                    //this.texture.MinFilter = RenderContext.MinFilter.NearestMipmapLinear;
                    if (this.ctx == null)
                        this.setParseFailed();
                    else
                        this.setParseSucceed();
                }.bind(this);
                img.src = window.URL.createObjectURL(blob); //document.getElementsByTagName("body")[0].appendChild(img);
            }
            onDestruct() {
                Magnum.Console.debug("Texture2DFile.Resource.onDestruct");
                if (this.ctx) {
                    Magnum.RenderContext.deleteTexture(this.ctx);
                    this.ctx = null;
                }
            }
            getTextureCtx() {
                return this.ctx;
            }
            get Width() {
                return this.ctx.Width;
            }
            get Height() {
                return this.ctx.Height;
            }
            get PowerOf2() {
                return this.ctx.PowerOf2;
            }
            get Mipmap() {
                return this.ctx.Mipmap;
            }
            get MinFilter() {
                return this.ctx.MinFilter;
            }
            set MinFilter(value) {
                this.ctx.MinFilter = value;
            }
            get MagFilter() {
                return this.ctx.MagFilter;
            }
            set MagFilter(value) {
                this.ctx.MagFilter = value;
            }
            get WrapS() {
                return this.ctx.WrapS;
            }
            set WrapS(value) {
                this.ctx.WrapS = value;
            }
            get WrapT() {
                return this.ctx.WrapT;
            }
            set WrapT(value) {
                this.ctx.WrapT = value;
            }
            static extensionTag() {
                return "png";
            }
            extension() {
                return Texture2DFile.Resource.extensionTag();
            }
            static get(path) {
                return Magnum.ResourceAccess.get(path, Texture2DFile.Resource.extensionTag());
            }
        }
        Texture2DFile.Resource = Resource;
        ;
        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }

        public destructor() {
        }
        };
        */
    })(Texture2DFile = Magnum.Texture2DFile || (Magnum.Texture2DFile = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Texture2D.ts" /> 
/// <reference path = "Video.ts" /> 
var Magnum;
(function (Magnum) {
    class ShaderProgram {
        constructor(path) {
            this.resource = null;
            this.path = path;
            this.uniformsValues = new Array();
        }
        construct() {
            return this.onConstruct();
        }
        destruct() {
            this.onDestruct();
        }
        onConstruct() {
            this.resource = ShaderProgram.Resource.get(this.path);
            this.resource.addRef();
            return true;
        }
        onDestruct() {
            ShaderProgram.Resource.release(this.resource);
            this.resource = null;
        }
        setUniform1i(name, value1) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1) {
                Magnum.RenderContext.setUniform1i(name, value1);
            }.bind(this, name, value1));
        }
        setUniform2i(name, value1, value2) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2) {
                Magnum.RenderContext.setUniform2i(name, value1, value2);
            }.bind(this, name, value1, value2));
        }
        setUniform3i(name, value1, value2, value3) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2, value3) {
                Magnum.RenderContext.setUniform3i(name, value1, value2, value3);
            }.bind(this, name, value1, value2, value3));
        }
        setUniform4i(name, value1, value2, value3, value4) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                Magnum.RenderContext.setUniform4i(name, value1, value2, value3, value4);
            }.bind(this, name, value1, value2, value3, value4));
        }
        setUniform1f(name, value1) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1) {
                Magnum.RenderContext.setUniform1f(name, value1);
            }.bind(this, name, value1));
        }
        setUniform2f(name, value1, value2) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2) {
                Magnum.RenderContext.setUniform2f(name, value1, value2);
            }.bind(this, name, value1, value2));
        }
        setUniform3f(name, value1, value2, value3) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2, value3) {
                Magnum.RenderContext.setUniform3f(name, value1, value2, value3);
            }.bind(this, name, value1, value2, value3));
        }
        setUniform4f(name, value1, value2, value3, value4) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, value1, value2, value3, value4) {
                Magnum.RenderContext.setUniform4f(name, value1, value2, value3, value4);
            }.bind(this, name, value1, value2, value3, value4));
        }
        setUniform1iv(name, count, value1) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1) {
                Magnum.RenderContext.setUniform1iv(name, count, value1);
            }.bind(this, name, count, value1));
        }
        setUniform2iv(name, count, value1, value2) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2) {
                Magnum.RenderContext.setUniform2iv(name, count, value1, value2);
            }.bind(this, name, count, value1, value2));
        }
        setUniform3iv(name, count, value1, value2, value3) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2, value3) {
                Magnum.RenderContext.setUniform3iv(name, count, value1, value2, value3);
            }.bind(this, name, count, value1, value2, value3));
        }
        setUniform4iv(name, count, value1, value2, value3, value4) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                Magnum.RenderContext.setUniform4iv(name, count, value1, value2, value3, value4);
            }.bind(this, name, count, value1, value2, value3, value4));
        }
        setUniform1fv(name, count, value1) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1) {
                Magnum.RenderContext.setUniform1fv(name, count, value1);
            }.bind(this, name, count, value1));
        }
        setUniform2fv(name, count, value1, value2) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2) {
                Magnum.RenderContext.setUniform2fv(name, count, value1, value2);
            }.bind(this, name, count, value1, value2));
        }
        setUniform3fv(name, count, value1, value2, value3) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2, value3) {
                Magnum.RenderContext.setUniform3fv(name, count, value1, value2, value3);
            }.bind(this, name, count, value1, value2, value3));
        }
        setUniform4fv(name, count, value1, value2, value3, value4) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, count, value1, value2, value3, value4) {
                Magnum.RenderContext.setUniform4fv(name, count, value1, value2, value3, value4);
            }.bind(this, name, count, value1, value2, value3, value4));
        }
        setUniformMatrix2fv(name, mat) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, mat) {
                Magnum.RenderContext.setUniformMatrix2fv(name, mat);
            }.bind(this, name, mat));
        }
        setUniformMatrix3fv(name, mat) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, mat) {
                Magnum.RenderContext.setUniformMatrix3fv(name, mat);
            }.bind(this, name, mat));
        }
        setUniformMatrix4fv(name, mat) {
            if (!this.getShaderCtx())
                return;
            this.uniformsValues.push(function (name, mat) {
                Magnum.RenderContext.setUniformMatrix4fv(name, mat);
            }.bind(this, name, mat));
        }
        updateUniforms() {
            if (!this.getShaderCtx())
                return;
            for (var i = 0; i < this.uniformsValues.length; i++) {
                this.uniformsValues[i]();
            }
            this.uniformsValues = [];
        }
        getShaderCtx() {
            if (!this.resource)
                return null;
            else
                return this.resource.getShaderCtx();
        }
    }
    Magnum.ShaderProgram = ShaderProgram;
    ;
    (function (ShaderProgram) {
        class Data {
            constructor() {
            }
            destructor() {
            }
        }
        ShaderProgram.Data = Data;
        ;
        class Resource extends Magnum.ResourceAccess {
            constructor(name) {
                super(name);
                this.shaderCtx = null;
            }
            destructor() {
                super.destructor();
                this.shaderCtx = null;
            }
            getAttributes() {
                if (!this.shaderCtx)
                    return null;
                return this.shaderCtx.getAttributes();
            }
            getUniforms() {
                if (!this.shaderCtx)
                    return null;
                return this.shaderCtx.getUniforms();
            }
            getAttributesCount() {
                if (!this.shaderCtx)
                    return 0;
                return this.shaderCtx.getAttributesCount();
            }
            getUniformsCount() {
                if (!this.shaderCtx)
                    return 0;
                return this.shaderCtx.getUniformsCount();
            }
            getAttribute(name) {
                if (!this.shaderCtx)
                    return null;
                return this.shaderCtx.getAttribute(name);
            }
            getUniform(name) {
                if (!this.shaderCtx)
                    return null;
                return this.shaderCtx.getUniform(name);
            }
            getShaderCtx() {
                return this.shaderCtx;
            }
            onConstruct() {
                console.log("ShaderProgram.Resource.onConstruct ");
                return true;
            }
            onParse(blob) {
                Magnum.Console.debug("ShaderProgram.Resource.onParse");
                var fr = new FileReader();
                fr.onload = function (evt) {
                    var json = JSON.parse(fr.result);
                    var vertexShaderSource = json["vertexshader"];
                    vertexShaderSource = vertexShaderSource.join("");
                    var fragmentShaderSource = json["fragmentshader"];
                    fragmentShaderSource = fragmentShaderSource.join("");
                    this.shaderCtx = Magnum.RenderContext.createShaderProgram(vertexShaderSource, fragmentShaderSource);
                    if (this.shaderCtx == null)
                        this.setParseFailed();
                    else
                        this.setParseSucceed();
                }.bind(this);
                fr.readAsText(blob);
            }
            onDestruct() {
                Magnum.Console.debug("ShaderProgram.Resource.onDestruct");
                if (this.shaderCtx) {
                    Magnum.RenderContext.deleteShaderProgram(this.shaderCtx);
                    this.shaderCtx = null;
                }
            }
            static extensionTag() {
                return "shader";
            }
            extension() {
                return ShaderProgram.Resource.extensionTag();
            }
            static get(path) {
                return Magnum.ResourceAccess.get(path, ShaderProgram.Resource.extensionTag());
            }
        }
        ShaderProgram.Resource = Resource;
        ;
        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }
        };
        */
    })(ShaderProgram = Magnum.ShaderProgram || (Magnum.ShaderProgram = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Renderer.ts" /> 
/// <reference path = "RenderContext.ts" /> 
var Magnum;
(function (Magnum) {
    class RenderTest {
        constructor() {
            this.ang = 0.0;
        }
        initFlat3D() {
            var vs = "attribute vec3 aPosition;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "" +
                "void main(void) " +
                "{" +
                "    gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "    vColor = uColor;" +
                "}";
            var fs = "precision mediump float;" +
                "varying vec4 vColor;" +
                "" +
                "void main(void)" +
                "{" +
                "    gl_FragColor = vColor;" +
                "}";
            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            this.flat3DBuffer = Magnum.RenderContext.createVertexBuffer(new Float32Array(vertices));
            if (!this.flat3DBuffer)
                return false;
            this.flat3DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
            if (!this.flat3DShader)
                return false;
            return true;
        }
        initGourand3D() {
            var vs = "attribute vec3 aPosition;" +
                "attribute vec4 aColor;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vColor = uColor * aColor;" +
                "}";
            var fs = "precision mediump float;" +
                "varying vec4 vColor;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor;" +
                "}";
            this.gourand3DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
            if (!this.gourand3DShader)
                return false;
            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            this.gourand3DBuffer = Magnum.RenderContext.createVertexBuffer(new Float32Array(vertices), new Float32Array(colors));
            if (!this.gourand3DBuffer)
                return false;
            return true;
        }
        initFlatTex3D() {
            var vs = "attribute vec3 aPosition;" +
                "attribute vec2 aTexCoord0;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vTexCoord0 = aTexCoord0;" +
                "	vColor = uColor;" +
                "}";
            var fs = "precision mediump float;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "uniform sampler2D texture0;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                "}";
            this.flatTex3DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
            if (!this.flatTex3DShader)
                return false;
            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var uv0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0
            ];
            this.flatTex3DBuffer = Magnum.RenderContext.createVertexBuffer(new Float32Array(vertices), undefined, new Float32Array(uv0s));
            if (!this.flatTex3DBuffer)
                return false;
            this.flatTex3DTexture = Magnum.RenderContext.createTexture(Magnum.RenderContext.TextureTarget.Target2D, 0, 0, 0, Magnum.RenderContext.InternalFormat.RGBA, Magnum.RenderContext.Format.RGBA, Magnum.RenderContext.Type.UnsignedByte, null, true);
            if (!this.flatTex3DTexture)
                return false;
            return true;
        }
        initGourandTex3D() {
            var vsSource = "attribute vec3 aPosition;" +
                "attribute vec4 aColor;" +
                "attribute vec2 aTexCoord0;" +
                "uniform mat4 uPVMMatrix;" +
                "uniform vec4 uColor;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "void main(void)" +
                "{" +
                "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                "	vTexCoord0 = aTexCoord0;" +
                "	vColor = uColor * aColor;" +
                "}";
            var fsSource = "precision mediump float;" +
                "varying vec4 vColor;" +
                "varying vec2 vTexCoord0;" +
                "uniform sampler2D texture0;" +
                "void main(void)" +
                "{" +
                "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                "}";
            this.gourandTex3DShader = Magnum.RenderContext.createShaderProgram(vsSource, fsSource);
            if (!this.gourandTex3DShader)
                return false;
            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var uv0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0
            ];
            this.gourandTex3DBuffer = Magnum.RenderContext.createVertexBuffer(new Float32Array(vertices), new Float32Array(colors), new Float32Array(uv0s));
            if (!this.gourandTex3DBuffer)
                return false;
            this.gourandTex3DTexture = Magnum.RenderContext.createTexture(Magnum.RenderContext.TextureTarget.Target2D, 0, 0, 0, Magnum.RenderContext.InternalFormat.RGBA, Magnum.RenderContext.Format.RGBA, Magnum.RenderContext.Type.UnsignedByte, null, true);
            if (!this.gourandTex3DTexture)
                return false;
            return true;
        }
        construct() {
            if (!this.initFlat3D())
                return false;
            if (!this.initGourand3D())
                return false;
            if (!this.initFlatTex3D())
                return false;
            if (!this.initGourandTex3D())
                return false;
            return true;
        }
        destruct() {
            if (this.flat3DShader) {
                Magnum.RenderContext.deleteShaderProgram(this.flat3DShader);
            }
            if (this.flat3DBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.flat3DBuffer);
            }
            if (this.flatTex3DShader) {
                Magnum.RenderContext.deleteShaderProgram(this.flatTex3DShader);
            }
            if (this.flatTex3DBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.flatTex3DBuffer);
            }
            if (this.gourand3DShader) {
                Magnum.RenderContext.deleteShaderProgram(this.gourand3DShader);
            }
            if (this.gourand3DBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.gourand3DBuffer);
            }
            if (this.gourandTex3DShader) {
                Magnum.RenderContext.deleteShaderProgram(this.gourandTex3DShader);
            }
            if (this.gourandTex3DBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.gourandTex3DBuffer);
            }
        }
        testDrawScene(renderParam) {
            Magnum.RenderContext.clearColor(0.0, 0.0, 0.0, 1.0);
            Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.DepthTest);
            Magnum.RenderContext.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            Magnum.RenderContext.clear(Magnum.RenderContext.ClearFlags.ColorBuffer | Magnum.RenderContext.ClearFlags.DepthBuffer);
            this.ang++;
            var mMatrix = new Magnum.Matrix4();
            var vMatrix = renderParam.viewTransform;
            var pMatrix = renderParam.camera.getProjectionTransform();
            var pvmMatrix = new Magnum.Matrix4();
            ///////////////////////////////////////////////////////////////////////
            Magnum.RenderContext.setShaderProgram(this.flat3DShader);
            Magnum.RenderContext.setVertexBuffer(this.flat3DBuffer);
            mMatrix.initTranslateRotZXYScale(-1.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Magnum.Matrix4.mul(pMatrix, Magnum.Matrix4.mul(vMatrix, mMatrix));
            Magnum.RenderContext.setUniform4f("uColor", 0.0, 0.0, 1.0, 1.0);
            Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            Magnum.RenderContext.drawArrays(Magnum.RenderContext.PrimitiveMode.TriangleStrip);
            ///////////////////////////////////////////////////////////////////////
            Magnum.RenderContext.setShaderProgram(this.gourand3DShader);
            Magnum.RenderContext.setVertexBuffer(this.gourand3DBuffer);
            mMatrix.initTranslateRotZXYScale(-0.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Magnum.Matrix4.mul(pMatrix, Magnum.Matrix4.mul(vMatrix, mMatrix));
            Magnum.RenderContext.setUniform4f("uColor", 1.0, 1.0, 1.0, 1.0);
            Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            Magnum.RenderContext.drawArrays(Magnum.RenderContext.PrimitiveMode.TriangleStrip);
            ///////////////////////////////////////////////////////////////////////
            Magnum.RenderContext.setShaderProgram(this.flatTex3DShader);
            Magnum.RenderContext.setVertexBuffer(this.flatTex3DBuffer);
            Magnum.RenderContext.setTexture(0, this.flatTex3DTexture);
            mMatrix.initTranslateRotZXYScale(0.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Magnum.Matrix4.mul(pMatrix, Magnum.Matrix4.mul(vMatrix, mMatrix));
            Magnum.RenderContext.setUniform4f("uColor", 0.0, 0.0, 1.0, 1.0);
            Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            Magnum.RenderContext.setUniform1i("texture0", 0);
            Magnum.RenderContext.drawArrays(Magnum.RenderContext.PrimitiveMode.TriangleStrip);
            ///////////////////////////////////////////////////////////////////////
            Magnum.RenderContext.setShaderProgram(this.gourandTex3DShader);
            Magnum.RenderContext.setVertexBuffer(this.gourandTex3DBuffer);
            Magnum.RenderContext.setTexture(0, this.flatTex3DTexture);
            mMatrix.initTranslateRotZXYScale(1.5, 0.0, 0.0, this.ang, 0, 0, 0.5);
            pvmMatrix = Magnum.Matrix4.mul(pMatrix, Magnum.Matrix4.mul(vMatrix, mMatrix));
            Magnum.RenderContext.setUniform4f("uColor", 1.0, 1.0, 1.0, 1.0);
            Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", pvmMatrix);
            Magnum.RenderContext.setUniform1i("texture0", 0);
            Magnum.RenderContext.drawArrays(Magnum.RenderContext.PrimitiveMode.TriangleStrip);
        }
    }
    Magnum.RenderTest = RenderTest;
    ;
    ///////////////////////////////////////////////////////////////////
    class Test extends Magnum.Component {
    }
    Magnum.Test = Test;
    (function (Test) {
        class Renderer extends Magnum.Renderer {
            constructor(gameObject) {
                super(gameObject);
                this.renderTest = new RenderTest();
                this.shaderProgram1 = null;
                this.shaderProgram2 = null;
                this.test2DFile1 = null;
                this.test2DFile2 = null;
                this.test2DFile3 = null;
            }
            destructor() {
            }
            static ClassName() {
                return "Test.Renderer";
            }
            onConstruct() {
                if (!super.onConstruct())
                    return false;
                if (!this.renderTest.construct())
                    return false;
                this.test2DFile1 = new Magnum.Texture2DFile("fx1_1");
                if (!this.test2DFile1.construct())
                    return false;
                this.test2DFile2 = new Magnum.Texture2DFile("fx2_1");
                if (!this.test2DFile2.construct())
                    return false;
                this.test2DFile3 = new Magnum.Texture2DFile("fx2_2");
                if (!this.test2DFile3.construct())
                    return false;
                this.shaderProgram1 = new Magnum.ShaderProgram("1");
                if (!this.shaderProgram1.construct())
                    return false;
                this.shaderProgram2 = new Magnum.ShaderProgram("2");
                if (!this.shaderProgram2.construct())
                    return false;
                return true;
            }
            onDestruct() {
                super.onDestruct();
                this.renderTest.destruct();
                this.test2DFile1.destruct();
                this.test2DFile2.destruct();
                this.test2DFile3.destruct();
                this.shaderProgram2.destruct();
                this.shaderProgram1.destruct();
            }
            getOrder() {
                return 1;
            }
            render(renderParam) {
                this.renderTest.testDrawScene(renderParam);
            }
        }
        Test.Renderer = Renderer;
        ;
    })(Test = Magnum.Test || (Magnum.Test = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Input.ts" /> 
/// <reference path = "../Components/TestComponent1.ts" /> 
/// <reference path = "../Components/TestComponent2.ts" /> 
/// <reference path = "../EngineCore/Texture2DFile.ts" /> 
/// <reference path = "../EngineCore/ShaderProgram.ts" /> 
/// <reference path = "../EngineCore/Renderer.ts" /> 
/// <reference path = "../EngineCore/Camera.ts" /> 
/// <reference path = "../EngineCore/Test.ts" /> 
var Magnum;
(function (Magnum) {
    class Test1Scene extends Magnum.Scene {
        constructor() {
            super();
            this.touchpadMethod = null;
            this.go = null;
            this.component1 = null;
            this.component2 = null;
            this.testResource1_1 = null;
            this.testResource1_2 = null;
            this.testResource2_1 = null;
            this.testResource2_2 = null;
            this.cameras = new Array();
            this.geometrys = new Array();
            this.texture0s = new Array();
            this.texture1s = new Array();
            this.ang = 0;
        }
        static Name() {
            return "Test1";
        }
        destructor() {
            super.destructor();
        }
        onConstruct() {
            this.touchpadMethod = Magnum.Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
            // this.go = GameObject.testJSON("test");
            // this.go = GameObject.Manager.getInstance().create("test1");
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    if (!this.addCamera(x, y, 4, 4))
                        return false;
                }
            }
            for (var i = 0; i < 10; i++) {
                if (!this.addGeometry("test1/block1", "test1/block2"))
                    return false;
            }
            return true;
        }
        onEnter() {
        }
        onUpdate() {
            this.ang++;
            for (var i = 0; i < this.geometrys.length; i++)
                this.geometrys[i].initTranslateRotZXYScale(0.0, 0.0, i * 3 / this.geometrys.length, this.ang + i * 360 / this.geometrys.length, 0, 0, 0.5);
            Magnum.GameObject.Manager.getInstance().update();
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
            for (var i = 0; i < this.cameras.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.cameras[i]);
            for (var i = 0; i < this.geometrys.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.geometrys[i]);
            for (var i = 0; i < this.texture0s.length; i++)
                this.texture0s[i].destruct();
            for (var i = 0; i < this.texture1s.length; i++)
                this.texture1s[i].destruct();
            Magnum.GameObject.Manager.getInstance().clear();
            Magnum.Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }
        addCamera(x, y, maxX, maxY) {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = Magnum.GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);
            var cameraComponent = Magnum.Component.Manager.getInstance().create(Magnum.PerspectiveCamera, camera, camera.Name + "Component");
            cameraComponent.Fovy = 45;
            cameraComponent.Aspect = Magnum.Stage.getScreenWidth() / Magnum.Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 100;
            cameraComponent.GameObject.initLookAt(new Magnum.Vector3([3, 3, 3]), new Magnum.Vector3([0, 0, 0]), Magnum.Vector3.UnitY);
            cameraComponent.ClearFlags = Magnum.Camera.ClearFlag.Color | Magnum.Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Magnum.Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Magnum.Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);
            return true;
        }
        addGeometry(textureName0, textureName1) {
            var idx = this.texture0s.length;
            var texture0 = new Magnum.Texture2DFile(textureName0);
            this.texture0s.push(texture0);
            if (!texture0.construct())
                return false;
            var texture1 = new Magnum.Texture2DFile(textureName1);
            this.texture1s.push(texture1);
            if (!texture1.construct())
                return false;
            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0
            ];
            var geometry = Magnum.GameObject.Manager.getInstance().create("geometry" + idx);
            this.geometrys.push(geometry);
            var geometryRendererComponent = Magnum.Component.Manager.getInstance().create(Magnum.Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            var geometryComponent0 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent0");
            var geometryComponent1 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent1");
            var geometryComponent2 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent2");
            var geometryComponent3 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent3");
            geometryComponent0.init(Magnum.RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices));
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);
            geometryComponent1.init(Magnum.RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors));
            geometryComponent1.setTexture(0, texture0);
            geometryComponent1.setTexture(1, texture1);
            geometryComponent2.init(Magnum.RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s));
            geometryComponent2.setTexture(0, texture0);
            geometryComponent2.setTexture(1, texture1);
            geometryComponent3.init(Magnum.RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord0s));
            geometryComponent3.setTexture(0, texture0);
            geometryComponent3.setTexture(1, texture1);
            geometryRendererComponent.addGeometry(geometryComponent0, new Magnum.Vector3([-2, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent1, new Magnum.Vector3([-1, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent2, new Magnum.Vector3([0, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent3, new Magnum.Vector3([1, 0, 0]));
            return true;
        }
        onTouchPad(event) {
            if (event.event == Magnum.Input.EventType.MouseDown) {
                Magnum.Console.debug("Test1Scene.onTouchPad:  call(Test2)");
                Magnum.Scene.call("Test2");
            }
        }
    }
    Magnum.Test1Scene = Test1Scene;
})(Magnum || (Magnum = {}));
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
/// <reference path = "../EngineCore/Input.ts" /> 
/// <reference path = "../Components/TestComponent1.ts" /> 
/// <reference path = "../Components/TestComponent2.ts" /> 
/// <reference path = "../EngineCore/Texture2DFile.ts" /> 
/// <reference path = "../EngineCore/ShaderProgram.ts" /> 
/// <reference path = "../EngineCore/Renderer.ts" /> 
/// <reference path = "../EngineCore/Camera.ts" /> 
/// <reference path = "../EngineCore/Test.ts" /> 
var Magnum;
(function (Magnum) {
    class Test2Scene extends Magnum.Scene {
        constructor() {
            super();
            this.touchpadMethod = null;
            this.go = null;
            this.component1 = null;
            this.component2 = null;
            this.testResource1_1 = null;
            this.testResource1_2 = null;
            this.testResource2_1 = null;
            this.testResource2_2 = null;
            this.cameras = new Array();
            this.geometrys = new Array();
            this.texture0s = new Array();
            this.texture1s = new Array();
            this.ang = 0;
        }
        static Name() {
            return "Test2";
        }
        destructor() {
            super.destructor();
        }
        onConstruct() {
            this.touchpadMethod = Magnum.Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
            // this.go = GameObject.testJSON("test");
            // this.go = GameObject.Manager.getInstance().create("Test2");
            for (var y = 0; y < 2; y++) {
                for (var x = 0; x < 2; x++) {
                    if (!this.addCamera(x, y, 2, 2))
                        return false;
                }
            }
            if (!this.addPoint())
                return false;
            if (!this.addLines())
                return false;
            if (!this.addLineLoop())
                return false;
            if (!this.addLineStrip())
                return false;
            if (!this.addTriangleStrip())
                return false;
            if (!this.addTriangleFan())
                return false;
            if (!this.addTriangles())
                return false;
            return true;
        }
        onEnter() {
        }
        onUpdate() {
            this.ang++;
            for (var i = 0; i < this.geometrys.length; i++)
                this.geometrys[i].initTranslateRotZXYScale(0.0, 0.0, i * 3 / this.geometrys.length, this.ang + i * 360 / this.geometrys.length, 0, 0, 0.5);
            Magnum.GameObject.Manager.getInstance().update();
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
            for (var i = 0; i < this.cameras.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.cameras[i]);
            for (var i = 0; i < this.geometrys.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.geometrys[i]);
            for (var i = 0; i < this.texture0s.length; i++)
                this.texture0s[i].destruct();
            for (var i = 0; i < this.texture1s.length; i++)
                this.texture1s[i].destruct();
            Magnum.GameObject.Manager.getInstance().clear();
            Magnum.Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }
        addCamera(x, y, maxX, maxY) {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = Magnum.GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);
            var cameraComponent = Magnum.Component.Manager.getInstance().create(Magnum.PerspectiveCamera, camera, camera.Name + "Component");
            cameraComponent.Fovy = 45;
            cameraComponent.Aspect = Magnum.Stage.getScreenWidth() / Magnum.Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 100;
            cameraComponent.GameObject.initLookAt(new Magnum.Vector3([3, 3, 3]), new Magnum.Vector3([0, 0, 0]), Magnum.Vector3.UnitY);
            cameraComponent.ClearFlags = Magnum.Camera.ClearFlag.Color | Magnum.Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Magnum.Color4([1, 0, 0, 1]);
            cameraComponent.Viewport = new Magnum.Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);
            return true;
        }
        addPrimitive(primitiveMode, offsets, vertices, colors, texcoord0s, texcoord1s, texture0Name, texture1Name) {
            var idx = this.texture0s.length;
            var texture0 = new Magnum.Texture2DFile(texture0Name);
            if (!texture0.construct())
                return false;
            this.texture0s.push(texture0);
            var texture1 = new Magnum.Texture2DFile(texture1Name);
            if (!texture1.construct())
                return false;
            this.texture1s.push(texture1);
            var geometry = Magnum.GameObject.Manager.getInstance().create("geometry" + idx);
            this.geometrys.push(geometry);
            var geometryRendererComponent = Magnum.Component.Manager.getInstance().create(Magnum.Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            var geometryComponent0 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent0");
            var geometryComponent1 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent1");
            var geometryComponent2 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent2");
            var geometryComponent3 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "RendererComponent3");
            geometryComponent0.init(primitiveMode, vertices);
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);
            geometryComponent1.init(primitiveMode, vertices, colors);
            geometryComponent1.setTexture(0, texture0);
            geometryComponent1.setTexture(1, texture1);
            geometryComponent2.init(primitiveMode, vertices, colors, texcoord0s);
            geometryComponent2.setTexture(0, texture0);
            geometryComponent2.setTexture(1, texture1);
            geometryComponent3.init(primitiveMode, vertices, colors, texcoord0s, texcoord0s);
            geometryComponent3.setTexture(0, texture0);
            geometryComponent3.setTexture(1, texture1);
            geometryRendererComponent.addGeometry(geometryComponent0, offsets[0]);
            geometryRendererComponent.addGeometry(geometryComponent1, offsets[1]);
            geometryRendererComponent.addGeometry(geometryComponent2, offsets[2]);
            geometryRendererComponent.addGeometry(geometryComponent3, offsets[3]);
            return true;
        }
        addPoint() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.Points, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "test2/block0", "test2/block1");
        }
        addLines() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
                +0.5, 0.0, +0.5,
                -0.5, 0.0, +0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 1.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 1.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.Lines, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        addLineLoop() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.LineLoop, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        addLineStrip() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
                -0.5, 0.0, +0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                1.0, 1.0,
                0.0, 1.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.LineStrip, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        addTriangles() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
                +0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, -0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.Triangles, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        addTriangleStrip() {
            var vertices = [
                -0.5, 0.0, +0.5,
                -0.5, 0.0, -0.5,
                +0.5, 0.0, +0.5,
                +0.5, 0.0, -0.5,
            ];
            var colors = [
                1.0, 0.0, 0.0, 1.0,
                0.0, 1.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
            ];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.TriangleStrip, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        addTriangleFan() {
            var vertices = [
                -0.5, 0.0, -0.5,
                -0.5, 0.0, +0.5,
                +0.5, 0.0, +0.5,
                +0.5, 0.0, -0.5,
            ];
            var colors = [
                0.0, 1.0, 0.0, 1.0,
                1.0, 0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
            ];
            var texcoord0s = [
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
            ];
            var texcoord1s = [
                0.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                1.0, 0.0,
            ];
            return this.addPrimitive(Magnum.RenderContext.PrimitiveMode.TriangleFan, [new Magnum.Vector3([-2, 0, 0]), new Magnum.Vector3([-1, 0, 0]), new Magnum.Vector3([0, 0, 0]), new Magnum.Vector3([1, 0, 0])], new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord1s), "block0", "block1");
        }
        onTouchPad(event) {
            if (event.event == Magnum.Input.EventType.MouseDown) {
                if (Magnum.Scene.getPreviousSceneName() == "Test1") {
                    Magnum.Console.debug("Test2Scene.onTouchPad:  call(Test3)");
                    Magnum.Scene.call("Test3");
                }
                else if (Magnum.Scene.getPreviousSceneName() == "Test3") {
                    Magnum.Console.error("fuck Test3???");
                }
                else if (Magnum.Scene.getPreviousSceneName() == "Test4") {
                    Magnum.Console.debug("Test2Scene.onTouchPad:  return()");
                    Magnum.Scene.return();
                }
            }
        }
    }
    Magnum.Test2Scene = Test2Scene;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Test3Scene extends Magnum.Scene {
        constructor() {
            super();
            this.touchpadMethod = null;
            this.cameras = new Array();
            this.geometrys = new Array();
            this.objectRotation = 0;
            this.cookieRotation = 0;
            this.lightTarget = new Magnum.Vector3();
            this.lightPosition = new Magnum.Vector3();
            this.lightFov = 0;
            this.lightAnimT = 0;
        }
        static Name() {
            return "Test3";
        }
        destructor() {
            super.destructor();
        }
        onConstruct() {
            this.touchpadMethod = Magnum.Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
            for (var y = 0; y < 1; y++) {
                for (var x = 0; x < 1; x++) {
                    if (!this.addCamera(x, y, 1, 1))
                        return false;
                }
            }
            if (!this.addGeometry0("test3/block0", "test3/cookie2", "test3/cookie"))
                return false;
            if (!this.addGeometry1("test3/block1", "test3/cookie2", "test3/cookie"))
                return false;
            return true;
        }
        onEnter() {
        }
        updateGeometry0() {
            this.geometrys[0].initTranslate(0, -10, 0);
        }
        updateGeometry1() {
            this.objectRotation += 45 * Magnum.Stage.elpase();
            this.geometrys[1].initTranslateRotZXYScale(0.0, 0.0, 0.0, this.objectRotation / 2, 0.0, this.objectRotation, 0.5);
        }
        updateLight() {
            this.lightAnimT += Magnum.Stage.elpase();
            this.cookieRotation = 0;
            this.lightTarget.X = 10 * Math.cos(this.lightAnimT / 10 * Math.PI * 2.0);
            this.lightTarget.Y = 0;
            this.lightTarget.Z = 10 * Math.sin(this.lightAnimT / 20 * Math.PI * 2.0);
            this.lightPosition = new Magnum.Vector3([40, 40, 40]);
            this.lightFov = 30.0;
            for (var i = 0; i < this.geometrys.length; i++) {
                var geometry = this.geometrys[i].getComponentByName(this.geometrys[i].Name + "Component0");
                var shaderProgram = geometry.getShaderProgram();
                var matSpotLightShadow = new Magnum.Matrix4();
                matSpotLightShadow.initPerspectiveFovShadow(this.cookieRotation, this.lightPosition, this.lightTarget, Magnum.Vector3.UnitY, this.lightFov, 1.0, 1.0, 1000);
                shaderProgram.setUniformMatrix4fv("uCookiePVMMatrix", matSpotLightShadow);
            }
        }
        onUpdate() {
            this.updateLight();
            this.updateGeometry0();
            this.updateGeometry1();
            Magnum.GameObject.Manager.getInstance().update();
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
            for (var i = 0; i < this.cameras.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.cameras[i]);
            for (var i = 0; i < this.geometrys.length; i++) {
                Magnum.GameObject.Manager.getInstance().release(this.geometrys[i]);
            }
            Magnum.GameObject.Manager.getInstance().clear();
            Magnum.Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }
        addCamera(x, y, maxX, maxY) {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = Magnum.GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);
            var cameraComponent = Magnum.Component.Manager.getInstance().create(Magnum.PerspectiveCamera, camera, camera.Name + "Component");
            cameraComponent.Fovy = 45;
            cameraComponent.Aspect = Magnum.Stage.getScreenWidth() / Magnum.Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 1000;
            cameraComponent.GameObject.initLookAt(new Magnum.Vector3([40, 40, 40]), Magnum.Vector3.Zero, Magnum.Vector3.UnitY);
            cameraComponent.ClearFlags = Magnum.Camera.ClearFlag.Color | Magnum.Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Magnum.Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Magnum.Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);
            return true;
        }
        addGeometry0(textureName0, textureName1, shaderName) {
            var idx = this.geometrys.length;
            var texture0 = new Magnum.Texture2DFile(textureName0);
            if (!texture0.construct())
                return false;
            var texture1 = new Magnum.Texture2DFile(textureName1);
            if (!texture1.construct())
                return false;
            var shaderProgram = new Magnum.ShaderProgram(shaderName);
            if (!shaderProgram.construct())
                return false;
            var vertices = [
                -0.5 * 50, 0.0, +0.5 * 50,
                +0.5 * 50, 0.0, +0.5 * 50,
                -0.5 * 50, 0.0, -0.5 * 50,
                +0.5 * 50, 0.0, -0.5 * 50
            ];
            var colors = [
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0
            ];
            var texcoord0s = [
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ];
            var geometry = Magnum.GameObject.Manager.getInstance().create("geometry" + idx);
            this.geometrys.push(geometry);
            var geometryComponent0 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "Component0");
            geometryComponent0.init(Magnum.RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s));
            geometryComponent0.setShaderProgram(shaderProgram);
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);
            var geometryRendererComponent = Magnum.Component.Manager.getInstance().create(Magnum.Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            geometryRendererComponent.addGeometry(geometryComponent0, new Magnum.Vector3([0, 0, 0]));
            return true;
        }
        addGeometry1(textureName0, textureName1, shaderName) {
            var idx = this.geometrys.length;
            var texture0 = new Magnum.Texture2DFile(textureName0);
            if (!texture0.construct())
                return false;
            var texture1 = new Magnum.Texture2DFile(textureName1);
            if (!texture1.construct())
                return false;
            var shaderProgram = new Magnum.ShaderProgram(shaderName);
            if (!shaderProgram.construct())
                return false;
            var vertices = [
                -10, 8.0, +10,
                +10, 8.0, +10,
                -10, 8.0, -10,
                -10, 8.0, -10,
                +10, 8.0, +10,
                +10, 8.0, -10,
                -10, 0.0, +10,
                -10, 0.0, -10,
                +10, 0.0, +10,
                +10, 0.0, +10,
                -10, 0.0, -10,
                +10, 0.0, -10,
                +10, 0.0, +10,
                +10, 0.0, -10,
                +10, 8.0, +10,
                +10, 8.0, +10,
                +10, 0.0, -10,
                +10, 8.0, -10,
                -10, 0.0, +10,
                -10, 8.0, +10,
                -10, 0.0, -10,
                -10, 8.0, +10,
                -10, 8.0, -10,
                -10, 0.0, -10,
                +10, 0.0, +10,
                +10, 8.0, +10,
                -10, 0.0, +10,
                -10, 0.0, +10,
                +10, 8.0, +10,
                -10, 8.0, +10,
                +10, 0.0, -10,
                -10, 0.0, -10,
                +10, 8.0, -10,
                +10, 8.0, -10,
                -10, 0.0, -10,
                -10, 8.0, -10,
            ];
            var colors = [
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
                0.5, 0.5, 0.5, 1.0,
            ];
            var texcoord0s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0,
                0.0, 0.0,
            ];
            var geometry = Magnum.GameObject.Manager.getInstance().create("geometry" + idx);
            this.geometrys.push(geometry);
            var geometryComponent0 = Magnum.Component.Manager.getInstance().create(Magnum.Geometry, geometry, geometry.Name + "Component0");
            geometryComponent0.init(Magnum.RenderContext.PrimitiveMode.Triangles, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s));
            geometryComponent0.setShaderProgram(shaderProgram);
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);
            var geometryRendererComponent = Magnum.Component.Manager.getInstance().create(Magnum.Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            geometryRendererComponent.addGeometry(geometryComponent0, new Magnum.Vector3([0, 0, 0]));
            return true;
        }
        onTouchPad(event) {
            if (event.event == Magnum.Input.EventType.MouseDown) {
                Magnum.Console.debug("Test3Scene.onTouchPad:  goto(Test4)");
                Magnum.Scene.goto("Test4");
            }
        }
    }
    Magnum.Test3Scene = Test3Scene;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class Test4Scene extends Magnum.Scene {
        constructor() {
            super();
            this.touchpadMethod = null;
        }
        static Name() {
            return "Test4";
        }
        destructor() {
            super.destructor();
        }
        onConstruct() {
            this.touchpadMethod = Magnum.Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
            return true;
        }
        onEnter() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
            Magnum.Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }
        onTouchPad(event) {
            if (event.event == Magnum.Input.EventType.MouseDown) {
                Magnum.Console.debug("Test4Scene.onTouchPad:  return");
                Magnum.Scene.return();
            }
        }
    }
    Magnum.Test4Scene = Test4Scene;
})(Magnum || (Magnum = {}));
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
var Magnum;
(function (Magnum) {
    class TestClothScene extends Magnum.Scene {
        constructor() {
            super();
            this.touchpadMethod = null;
            this.cameras = new Array();
            this.sprites = new Array();
        }
        static Name() {
            return "TestCloth";
        }
        destructor() {
            super.destructor();
        }
        onConstruct() {
            this.touchpadMethod = Magnum.Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
            for (var y = 0; y < 1; y++) {
                for (var x = 0; x < 1; x++) {
                    if (!this.addCamera(x, y, 1, 1))
                        return false;
                }
            }
            if (!this.addSprite("default/block0"))
                return false;
            return true;
        }
        onEnter() {
        }
        onUpdate() {
            Magnum.GameObject.Manager.getInstance().update();
        }
        onPause() {
        }
        onResume() {
        }
        onExit() {
        }
        onDestruct() {
            for (var i = 0; i < this.cameras.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.cameras[i]);
            for (var i = 0; i < this.sprites.length; i++)
                Magnum.GameObject.Manager.getInstance().release(this.sprites[i]);
            Magnum.GameObject.Manager.getInstance().clear();
            Magnum.Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }
        addCamera(x, y, maxX, maxY) {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = Magnum.GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);
            var cameraComponent = Magnum.Component.Manager.getInstance().create(Magnum.OrthoCamera, camera, camera.Name + "Component");
            cameraComponent.Width = Magnum.Stage.getScreenWidth();
            cameraComponent.Height = Magnum.Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 1000;
            cameraComponent.GameObject.initLookAt(new Magnum.Vector3([0, 0, 1]), Magnum.Vector3.Zero, Magnum.Vector3.UnitY);
            cameraComponent.ClearFlags = Magnum.Camera.ClearFlag.Color | Magnum.Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Magnum.Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Magnum.Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);
            return true;
        }
        addSprite(textureName0) {
            var spriteGO = Magnum.GameObject.Manager.getInstance().create("Sprite" + 0);
            this.sprites.push(spriteGO);
            var spriteComp = Magnum.Component.Manager.getInstance().create(Magnum.Sprite, spriteGO, spriteGO.Name + "Sprite0");
            spriteComp.init(textureName0);
            var spriteRendererComp = Magnum.Component.Manager.getInstance().create(Magnum.Sprite.Renderer, spriteGO, spriteGO.Name + "Renderer0");
            spriteRendererComp.addSprite(spriteComp);
            spriteGO.setLocalPosition(new Magnum.Vector3([256, 256, 0]));
            return true;
        }
        onTouchPad(event) {
            if (event.event == Magnum.Input.EventType.MouseDown) {
                Magnum.Console.debug("Test3Scene.onTouchPad:  goto(Test4)");
                Magnum.Scene.goto("Test4");
            }
        }
    }
    Magnum.TestClothScene = TestClothScene;
})(Magnum || (Magnum = {}));
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
/// <reference path = "Texture2D.ts" /> 
var Magnum;
(function (Magnum) {
    class TextureCubeFile extends Magnum.Texture2D {
        constructor(path) {
            super();
            this.resource = null;
            this.path = path;
        }
        destructor() {
        }
        onConstruct() {
            this.resource = TextureCubeFile.Resource.get(this.path);
            this.resource.addRef();
            return true;
        }
        onDestruct() {
            TextureCubeFile.Resource.release(this.resource);
            this.resource = null;
        }
        get Width() {
            if (!this.getTextureCtx())
                return super.Width;
            else
                return this.resource.Width;
        }
        get Height() {
            if (!this.getTextureCtx())
                return super.Height;
            else
                return this.resource.Height;
        }
        get PowerOf2() {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.PowerOf2;
        }
        get Mipmap() {
            if (!this.getTextureCtx())
                return false;
            else
                return this.resource.Mipmap;
        }
        get MinFilter() {
            if (!this.getTextureCtx())
                return super.MinFilter;
            else
                return this.resource.MinFilter;
        }
        set MinFilter(value) {
            if (!this.getTextureCtx())
                super.MinFilter = value;
            else
                this.resource.MinFilter = value;
        }
        get MagFilter() {
            if (!this.getTextureCtx())
                return super.MagFilter;
            else
                return this.resource.MagFilter;
        }
        set MagFilter(value) {
            if (!this.getTextureCtx())
                super.MagFilter = value;
            else
                this.resource.MagFilter = value;
        }
        get WrapS() {
            if (!this.getTextureCtx())
                return super.WrapS;
            else
                return this.resource.WrapS;
        }
        set WrapS(value) {
            if (!this.getTextureCtx())
                super.WrapS = value;
            else
                this.resource.WrapS = value;
        }
        get WrapT() {
            if (!this.getTextureCtx())
                return super.WrapT;
            else
                return this.resource.WrapT;
        }
        set WrapT(value) {
            if (!this.getTextureCtx())
                super.WrapT = value;
            else
                this.resource.WrapT = value;
        }
        getTextureCtx() {
            if (!this.resource)
                return null;
            else
                return this.resource.getTextureCtx();
        }
    }
    Magnum.TextureCubeFile = TextureCubeFile;
    ;
    (function (TextureCubeFile) {
        class Data {
            constructor() {
            }
            destructor() {
            }
        }
        TextureCubeFile.Data = Data;
        ;
        class Resource extends Magnum.ResourceAccess {
            constructor(name) {
                super(name);
                this.ctx = null;
            }
            destructor() {
                super.destructor();
                this.ctx = null;
            }
            onConstruct() {
                console.log("TextureCubeFile.Resource.onConstruct ");
                return true;
            }
            onParse(blob) {
                Magnum.Console.debug("TextureCubeFile.Resource.onParse");
                var img = new Image();
                img.onload = function () {
                    this.ctx = Magnum.RenderContext.createTexture(Magnum.RenderContext.TextureTarget.TargetCubeMap, 0, img.width, img.height, Magnum.RenderContext.InternalFormat.RGBA, Magnum.RenderContext.Format.RGBA, Magnum.RenderContext.Type.UnsignedByte, img, true);
                    //this.texture.MinFilter = RenderContext.MinFilter.NearestMipmapLinear;
                    if (this.ctx == null)
                        this.setParseFailed();
                    else
                        this.setParseSucceed();
                }.bind(this);
                img.src = window.URL.createObjectURL(blob); //document.getElementsByTagName("body")[0].appendChild(img);
            }
            onDestruct() {
                Magnum.Console.debug("TextureCubeFile.Resource.onDestruct");
                if (this.ctx) {
                    Magnum.RenderContext.deleteTexture(this.ctx);
                    this.ctx = null;
                }
            }
            getTextureCtx() {
                return this.ctx;
            }
            get Width() {
                return this.ctx.Width;
            }
            get Height() {
                return this.ctx.Height;
            }
            get PowerOf2() {
                return this.ctx.PowerOf2;
            }
            get Mipmap() {
                return this.ctx.Mipmap;
            }
            get MinFilter() {
                return this.ctx.MinFilter;
            }
            set MinFilter(value) {
                this.ctx.MinFilter = value;
            }
            get MagFilter() {
                return this.ctx.MagFilter;
            }
            set MagFilter(value) {
                this.ctx.MagFilter = value;
            }
            get WrapS() {
                return this.ctx.WrapS;
            }
            set WrapS(value) {
                this.ctx.WrapS = value;
            }
            get WrapT() {
                return this.ctx.WrapT;
            }
            set WrapT(value) {
                this.ctx.WrapT = value;
            }
            static extensionTag() {
                return "png";
            }
            extension() {
                return TextureCubeFile.Resource.extensionTag();
            }
            static get(path) {
                return Magnum.ResourceAccess.get(path, TextureCubeFile.Resource.extensionTag());
            }
        }
        TextureCubeFile.Resource = Resource;
        ;
        /*
        export class ResourceImport extends ResourceImport
        {
            public constructor(name : string)
            {
                super(name);
            }

        public destructor() {
        }
        };
        */
    })(TextureCubeFile = Magnum.TextureCubeFile || (Magnum.TextureCubeFile = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Component.ts" /> 
var Magnum;
(function (Magnum) {
    class Component1 extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "Component1";
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
    }
    Magnum.Component1 = Component1;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Component.ts" /> 
var Magnum;
(function (Magnum) {
    class Component2 extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "Component2";
        }
        onConstruct() {
            return true;
        }
        onStart() {
        }
        onUpdate() {
        }
        onPause() {
        }
        onResume() {
        }
        onStop() {
        }
        onDestruct() {
        }
        onDebugRender() {
        }
    }
    Magnum.Component2 = Component2;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Camera.ts" /> 
var Magnum;
(function (Magnum) {
    class PerspectiveCamera extends Magnum.Camera {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "PerspectiveCamera";
        }
        onConstruct() {
            this.fovy = 90;
            this.aspect = 1;
            this.nearPlane = 0.1;
            this.farPlane = 10000.0;
            return true;
        }
        onDestruct() {
        }
        onDebugRender() {
        }
        get Fovy() {
            return this.fovy;
        }
        set Fovy(fovy) {
            this.fovy = fovy;
            this.inValidateProjectionTransform();
        }
        get Aspect() {
            return this.aspect;
        }
        set Aspect(aspect) {
            this.aspect = aspect;
            this.inValidateProjectionTransform();
        }
        get NearPlane() {
            return this.nearPlane;
        }
        set NearPlane(nearPlane) {
            this.nearPlane = nearPlane;
            this.inValidateProjectionTransform();
        }
        get FarPlane() {
            return this.farPlane;
        }
        set FarPlane(farPlane) {
            this.farPlane = farPlane;
            this.inValidateProjectionTransform();
        }
        onValidateProjectionTransform() {
            var m = new Magnum.Matrix4();
            m.initPerspectiveFov(this.fovy, this.aspect, this.nearPlane, this.farPlane);
            return m;
        }
    }
    Magnum.PerspectiveCamera = PerspectiveCamera;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Camera.ts" /> 
var Magnum;
(function (Magnum) {
    class OrthoCamera extends Magnum.Camera {
        constructor(gameObject) {
            super(gameObject);
        }
        destructor() {
        }
        static ClassName() {
            return "OrthoCamera";
        }
        onConstruct() {
            this.width = Magnum.Stage.getScreenWidth();
            this.height = Magnum.Stage.getScreenHeight();
            this.nearPlane = 0.1;
            this.farPlane = 1000.0;
            return true;
        }
        onDestruct() {
        }
        onDebugRender() {
        }
        get Width() {
            return this.width;
        }
        set Width(width) {
            this.width = width;
            this.inValidateProjectionTransform();
        }
        get Height() {
            return this.height;
        }
        set Height(height) {
            this.height = height;
            this.inValidateProjectionTransform();
        }
        get NearPlane() {
            return this.nearPlane;
        }
        set NearPlane(nearPlane) {
            this.nearPlane = nearPlane;
            this.inValidateProjectionTransform();
        }
        get FarPlane() {
            return this.farPlane;
        }
        set FarPlane(farPlane) {
            this.farPlane = farPlane;
            this.inValidateProjectionTransform();
        }
        onValidateProjectionTransform() {
            var m = new Magnum.Matrix4();
            m.initOrthogonalOffCenter(0, this.width, 0, this.height, this.nearPlane, this.farPlane);
            return m;
        }
    }
    Magnum.OrthoCamera = OrthoCamera;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Renderer.ts" /> 
/// <reference path = "../EngineCore/RenderContext.ts" /> 
var Magnum;
(function (Magnum) {
    ///////////////////////////////////////////////////////////////////
    class Geometry extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
            this.primitiveMode = Magnum.RenderContext.PrimitiveMode.Triangles;
            this.vertexBuffer = null;
            this.textures = new Array(8);
            this.shaderProgram = null;
        }
        destructor() {
            if (this.vertexBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
            this.textures = null;
            this.shaderProgram = null;
        }
        static ClassName() {
            return "Geometry";
        }
        onConstruct() {
            return true;
        }
        init(primitiveMode, positions, colors, texcoord0, texcoord1, texcoord2, texcoord3, texcoord4, texcoord5, texcoord6, texcoord7, usage) {
            this.primitiveMode = primitiveMode;
            this.vertexBuffer = Magnum.RenderContext.createVertexBuffer(positions, colors, texcoord0, texcoord1, texcoord2, texcoord3, texcoord4, texcoord5, texcoord6, texcoord7, usage);
            if (!this.vertexBuffer)
                return false;
            return true;
        }
        setPrimitiveMode(primitiveMode) {
            this.primitiveMode = primitiveMode;
        }
        getPrimitiveMode() {
            return this.primitiveMode;
        }
        getVertexBuffer() {
            return this.vertexBuffer;
        }
        setTexture(textureStage, texture) {
            this.textures[textureStage] = texture;
        }
        getTexture(textureStage) {
            return this.textures[textureStage];
        }
        setShaderProgram(shaderProgram) {
            this.shaderProgram = shaderProgram;
        }
        getShaderProgram() {
            return this.shaderProgram;
        }
        onDestruct() {
            if (this.vertexBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
        }
    }
    Magnum.Geometry = Geometry;
    (function (Geometry) {
        class Renderer extends Magnum.Renderer {
            constructor(gameObject) {
                super(gameObject);
                this.flat3DShader = null;
                this.gourand3DShader = null;
                this.flatTex03DShader = null;
                this.gourandTex03DShader = null;
                this.flatTex1Tex03DShader = null;
                this.gourandTex1Tex03DShader = null;
                this.geometries = new Array(0);
                this.offsets = new Array(0);
            }
            destructor() {
            }
            static ClassName() {
                return "Geometry.Renderer";
            }
            onConstruct() {
                if (!super.onConstruct())
                    return false;
                if (!this.initFlat3D())
                    return false;
                if (!this.initGourand3D())
                    return false;
                if (!this.initFlatTex03D())
                    return false;
                if (!this.initGourandTex03D())
                    return false;
                if (!this.initFlatTex1Tex03D())
                    return false;
                if (!this.initGourandTex1Tex03D())
                    return false;
                return true;
            }
            onDestruct() {
                super.onDestruct();
                if (this.flat3DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.flat3DShader);
                    this.flat3DShader = null;
                }
                if (this.gourand3DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.gourand3DShader);
                    this.gourand3DShader = null;
                }
                if (this.flatTex03DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.flatTex03DShader);
                    this.flatTex03DShader = null;
                }
                if (this.gourandTex03DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.gourandTex03DShader);
                    this.gourandTex03DShader = null;
                }
                if (this.flatTex1Tex03DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.flatTex1Tex03DShader);
                    this.flatTex1Tex03DShader = null;
                }
                if (this.gourandTex1Tex03DShader) {
                    Magnum.RenderContext.deleteShaderProgram(this.gourandTex1Tex03DShader);
                    this.gourandTex1Tex03DShader = null;
                }
            }
            addGeometry(geometry, offset) {
                this.geometries.push(geometry);
                if (offset == undefined)
                    this.offsets.push(Magnum.Vector3.Zero);
                else
                    this.offsets.push(offset);
            }
            getOrder() {
                return 1;
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////
            findShaderProgram(fvf) {
                if (!(fvf & Magnum.RenderContext.FVF.Position)) {
                    return null;
                }
                else {
                    if (!(fvf & Magnum.RenderContext.FVF.Color)) {
                        if (!(fvf & Magnum.RenderContext.FVF.TexCoord0) && !(fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.flat3DShader;
                        }
                        else if ((fvf & Magnum.RenderContext.FVF.TexCoord0) && !(fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.flatTex03DShader;
                        }
                        else if (!(fvf & Magnum.RenderContext.FVF.TexCoord0) && (fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            Magnum.Console.assert(false, "TexCoord1 Must have TexCoord0");
                        }
                        else if ((fvf & Magnum.RenderContext.FVF.TexCoord0) && (fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.flatTex1Tex03DShader;
                        }
                    }
                    else {
                        if (!(fvf & Magnum.RenderContext.FVF.TexCoord0) && !(fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.gourand3DShader;
                        }
                        else if ((fvf & Magnum.RenderContext.FVF.TexCoord0) && !(fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.gourandTex03DShader;
                        }
                        else if (!(fvf & Magnum.RenderContext.FVF.TexCoord0) && (fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            Magnum.Console.assert(false, "TexCoord1 Must have TexCoord0");
                        }
                        else if ((fvf & Magnum.RenderContext.FVF.TexCoord0) && (fvf & Magnum.RenderContext.FVF.TexCoord1)) {
                            return this.gourandTex1Tex03DShader;
                        }
                    }
                }
            }
            updateDefaultUniforms(renderParam, offset, color) {
                var offsetMat = new Magnum.Matrix4();
                offsetMat.initTranslate(offset.X, offset.Y, offset.Z);
                offsetMat.initIdentity();
                var matM = Magnum.Matrix4.mul(this.GameObject.getGlobalTransform(), offsetMat);
                var matVM = Magnum.Matrix4.mul(renderParam.viewTransform, matM);
                var matPVM = Magnum.Matrix4.mul(renderParam.camera.getProjectionTransform(), matVM);
                Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", matPVM);
                Magnum.RenderContext.setUniformMatrix4fv("uMMatrix", matM);
                Magnum.RenderContext.setUniform4f("uColor", color.R, color.G, color.B, color.A);
                for (var i = 0; i < 8; i++) {
                    var uniformName = "texture" + i;
                    Magnum.RenderContext.setUniform1i(uniformName, i);
                }
            }
            renderByDefaultShader(renderParam, geometry, offset) {
                var renderCtxShaderProgram = this.findShaderProgram(geometry.getVertexBuffer().getFVF());
                Magnum.RenderContext.setShaderProgram(renderCtxShaderProgram);
                Magnum.RenderContext.setVertexBuffer(geometry.getVertexBuffer());
                this.updateDefaultUniforms(renderParam, offset, new Magnum.Color4([1, 1, 1, 1]));
                Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.DepthTest);
                Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.CullFace);
                Magnum.RenderContext.cullFace(Magnum.RenderContext.Face.Back);
                Magnum.RenderContext.frontFace(Magnum.RenderContext.FrontFace.CCW);
                for (var i = 0; i < 8; i++) {
                    var texture = geometry.getTexture(i);
                    if (texture) {
                        var textureCtx = texture.getTextureCtx();
                        if (textureCtx) {
                            Magnum.RenderContext.setTexture(i, textureCtx);
                        }
                    }
                }
                Magnum.RenderContext.drawArrays(geometry.getPrimitiveMode());
            }
            renderByCustomShader(renderParam, geometry, offset) {
                var shaderProgram = geometry.getShaderProgram();
                var shaderCtx = shaderProgram.getShaderCtx();
                Magnum.RenderContext.setShaderProgram(shaderCtx);
                Magnum.RenderContext.setVertexBuffer(geometry.getVertexBuffer());
                Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.DepthTest);
                Magnum.RenderContext.enable(Magnum.RenderContext.EnableFlags.CullFace);
                Magnum.RenderContext.cullFace(Magnum.RenderContext.Face.Back);
                Magnum.RenderContext.frontFace(Magnum.RenderContext.FrontFace.CCW);
                this.updateDefaultUniforms(renderParam, offset, new Magnum.Color4([1, 1, 1, 1]));
                shaderProgram.updateUniforms();
                for (var i = 0; i < 8; i++) {
                    var texture = geometry.getTexture(i);
                    if (texture) {
                        var textureCtx = texture.getTextureCtx();
                        if (textureCtx) {
                            Magnum.RenderContext.setTexture(i, textureCtx);
                            texture.MagFilter = Magnum.RenderContext.MagFilter.Linear;
                            texture.MinFilter = Magnum.RenderContext.MinFilter.LinearMipmapLinear;
                            texture.WrapS = Magnum.RenderContext.Wrap.ClampToEdge;
                            texture.WrapT = Magnum.RenderContext.Wrap.ClampToEdge;
                        }
                    }
                }
                Magnum.RenderContext.drawArrays(geometry.getPrimitiveMode());
            }
            render(renderParam) {
                for (var i = 0; i < this.geometries.length; i++) {
                    if (this.geometries[i].getShaderProgram())
                        this.renderByCustomShader(renderParam, this.geometries[i], this.offsets[i]);
                    else
                        this.renderByDefaultShader(renderParam, this.geometries[i], this.offsets[i]);
                }
            }
            ///////////////////////////////////////////////////////////////////////////
            initFlat3D() {
                var vs = "attribute vec3 aPosition;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "" +
                    "void main(void) " +
                    "{" +
                    "    gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "    vColor = uColor;" +
                    "}";
                var fs = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "" +
                    "void main(void)" +
                    "{" +
                    "    gl_FragColor = vColor;" +
                    "}";
                this.flat3DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
                if (!this.flat3DShader)
                    return false;
                return true;
            }
            initGourand3D() {
                var vs = "attribute vec3 aPosition;" +
                    "attribute vec4 aColor;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vColor = uColor * aColor;" +
                    "}";
                var fs = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor;" +
                    "}";
                this.gourand3DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
                if (!this.gourand3DShader)
                    return false;
                return true;
            }
            initFlatTex03D() {
                var vs = "attribute vec3 aPosition;" +
                    "attribute vec2 aTexCoord0;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vColor = uColor;" +
                    "}";
                var fs = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "uniform sampler2D texture0;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                    "}";
                this.flatTex03DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
                if (!this.flatTex03DShader)
                    return false;
                return true;
            }
            initGourandTex03D() {
                var vsSource = "attribute vec3 aPosition;" +
                    "attribute vec4 aColor;" +
                    "attribute vec2 aTexCoord0;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vColor = uColor * aColor;" +
                    "}";
                var fsSource = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "uniform sampler2D texture0;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0);" +
                    "}";
                this.gourandTex03DShader = Magnum.RenderContext.createShaderProgram(vsSource, fsSource);
                if (!this.gourandTex03DShader)
                    return false;
                return true;
            }
            initFlatTex1Tex03D() {
                var vs = "attribute vec3 aPosition;" +
                    "attribute vec2 aTexCoord0;" +
                    "attribute vec2 aTexCoord1;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vTexCoord1 = aTexCoord1;" +
                    "	vColor = uColor;" +
                    "}";
                var fs = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "uniform sampler2D texture0;" +
                    "uniform sampler2D texture1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0) * texture2D(texture1, vTexCoord1);" +
                    "}";
                this.flatTex1Tex03DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
                if (!this.flatTex03DShader)
                    return false;
                return true;
            }
            initGourandTex1Tex03D() {
                var vs = "attribute vec3 aPosition;" +
                    "attribute vec4 aColor;" +
                    "attribute vec2 aTexCoord0;" +
                    "attribute vec2 aTexCoord1;" +
                    "uniform mat4 uPVMMatrix;" +
                    "uniform vec4 uColor;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_Position = uPVMMatrix * vec4(aPosition, 1.0);" +
                    "	vTexCoord0 = aTexCoord0;" +
                    "	vTexCoord1 = aTexCoord1;" +
                    "	vColor = uColor * aColor;" +
                    "}";
                var fs = "precision mediump float;" +
                    "varying vec4 vColor;" +
                    "varying vec2 vTexCoord0;" +
                    "varying vec2 vTexCoord1;" +
                    "uniform sampler2D texture0;" +
                    "uniform sampler2D texture1;" +
                    "void main(void)" +
                    "{" +
                    "	gl_FragColor = vColor * texture2D(texture0, vTexCoord0) * texture2D(texture1, vTexCoord1);" +
                    "}";
                this.gourandTex1Tex03DShader = Magnum.RenderContext.createShaderProgram(vs, fs);
                if (!this.gourandTex1Tex03DShader)
                    return false;
                return true;
            }
        }
        Geometry.Renderer = Renderer;
        ;
    })(Geometry = Magnum.Geometry || (Magnum.Geometry = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "../EngineCore/Renderer.ts" /> 
/// <reference path = "../EngineCore/RenderContext.ts" /> 
var Magnum;
(function (Magnum) {
    ///////////////////////////////////////////////////////////////////
    class Sprite extends Magnum.Component {
        constructor(gameObject) {
            super(gameObject);
            this.vertexBuffer = null;
            this.texture = null;
            this.shaderProgram = null;
        }
        destructor() {
            this.onDestruct();
        }
        static ClassName() {
            return "Sprite";
        }
        onConstruct() {
            return true;
        }
        init(textureName) {
            var positions = [
                -0.5, +0.5, 0.0,
                +0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, -0.5, 0.0,
            ];
            var colors = [
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 1.0, 1.0, 1.0
            ];
            var texcoord0s = [
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0
            ];
            this.vertexBuffer = Magnum.RenderContext.createVertexBuffer(new Float32Array(positions), new Float32Array(colors), new Float32Array(texcoord0s), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Magnum.RenderContext.Usage.DynamicDraw);
            if (!this.vertexBuffer)
                return false;
            this.shaderProgram = new Magnum.ShaderProgram("default/image");
            if (!this.shaderProgram.construct())
                return false;
            this.texture = new Magnum.Texture2DFile(textureName);
            if (!this.texture.construct())
                return false;
            return true;
        }
        getVertexBuffer() {
            return this.vertexBuffer;
        }
        getTexture() {
            return this.texture;
        }
        setShaderProgram(shaderProgram) {
            this.shaderProgram = shaderProgram;
        }
        getShaderProgram() {
            return this.shaderProgram;
        }
        onDestruct() {
            if (this.vertexBuffer) {
                Magnum.RenderContext.deleteVertexBuffer(this.vertexBuffer);
                this.vertexBuffer = null;
            }
            if (this.texture) {
                this.texture.destruct();
                this.texture = null;
            }
            if (this.shaderProgram) {
                this.shaderProgram.destruct();
                this.shaderProgram = null;
            }
        }
    }
    Magnum.Sprite = Sprite;
    (function (Sprite) {
        class Renderer extends Magnum.Renderer {
            constructor(gameObject) {
                super(gameObject);
                this.sprites = new Array(0);
            }
            destructor() {
                this.sprites = [];
            }
            static ClassName() {
                return "Sprite.Renderer";
            }
            onConstruct() {
                if (!super.onConstruct())
                    return false;
                return true;
            }
            onDestruct() {
                super.onDestruct();
                this.sprites = [];
            }
            addSprite(sprite) {
                this.sprites.push(sprite);
            }
            getOrder() {
                return 1;
            }
            updateDefaultUniforms(renderParam, textureCtx, color) {
                var scaleMat = new Magnum.Matrix4();
                scaleMat.initScale(textureCtx.Width, textureCtx.Height, 1);
                var matM = Magnum.Matrix4.mul(this.GameObject.getGlobalTransform(), scaleMat);
                var matVM = Magnum.Matrix4.mul(renderParam.viewTransform, matM);
                var matPVM = Magnum.Matrix4.mul(renderParam.camera.getProjectionTransform(), matVM);
                Magnum.RenderContext.setUniformMatrix4fv("uPVMMatrix", matPVM);
                Magnum.RenderContext.setUniform4f("uColor", color.R, color.G, color.B, color.A);
                Magnum.RenderContext.setUniform1i("texture0", 0);
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////
            renderSprite(renderParam, sprite) {
                var shaderProgram = sprite.getShaderProgram();
                var shaderCtx = shaderProgram.getShaderCtx();
                var texture = sprite.getTexture();
                var textureCtx = texture.getTextureCtx();
                if (shaderCtx && textureCtx) {
                    Magnum.RenderContext.setShaderProgram(shaderCtx);
                    Magnum.RenderContext.setTexture(0, textureCtx);
                    Magnum.RenderContext.setVertexBuffer(sprite.getVertexBuffer());
                    Magnum.RenderContext.disable(Magnum.RenderContext.EnableFlags.DepthTest);
                    Magnum.RenderContext.disable(Magnum.RenderContext.EnableFlags.CullFace);
                    Magnum.RenderContext.cullFace(Magnum.RenderContext.Face.Back);
                    Magnum.RenderContext.frontFace(Magnum.RenderContext.FrontFace.CCW);
                    this.updateDefaultUniforms(renderParam, textureCtx, new Magnum.Color4([1, 1, 1, 1]));
                    shaderProgram.updateUniforms();
                    Magnum.RenderContext.drawArrays(Magnum.RenderContext.PrimitiveMode.TriangleStrip);
                }
            }
            render(renderParam) {
                for (var i = 0; i < this.sprites.length; i++) {
                    if (this.sprites[i].getShaderProgram() && this.sprites[i].getTexture())
                        this.renderSprite(renderParam, this.sprites[i]);
                }
            }
        }
        Sprite.Renderer = Renderer;
        ;
    })(Sprite = Magnum.Sprite || (Magnum.Sprite = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "EngineCore/InputCache.ts" /> 
/// <reference path = "EngineCore/Stage.ts" /> 
/// <reference path = "EngineCore/Engine.ts" /> 
/// <reference path = "EngineCore/Service.ts" /> 
/// <reference path = "EngineCore/ResourceAccess.ts" /> 
/// <reference path = "EngineCore/Scene.ts" /> 
/// <reference path = "EngineCore/Input.ts" /> 
/// <reference path = "EngineCore/Physics2.ts" /> 
/// <reference path = "EngineCore/Physics3.ts" /> 
/// <reference path = "EngineCore/Video.ts" /> 
/// <reference path = "EngineCore/Audio.ts" /> 
/// <reference path = "EngineCore/GameObject.ts" /> 
/// <reference path = "EngineCore/Component.ts" /> 
/////////////////////////////////////////////////////////////////////
// Scenes
/// <reference path = "Scenes/Test1Scene.ts" /> 
/// <reference path = "Scenes/Test2Scene.ts" /> 
/// <reference path = "Scenes/Test3Scene.ts" /> 
/// <reference path = "Scenes/Test4Scene.ts" /> 
/// <reference path = "Scenes/TestClothScene.ts" /> 
/////////////////////////////////////////////////////////////////////
// Resources and Component
/// <reference path = "EngineCore/Texture2DFile.ts" /> 
/// <reference path = "EngineCore/TextureCubeFile.ts" /> 
/// <reference path = "EngineCore/ShaderProgram.ts" /> 
/// <reference path = "Components/TestComponent1.ts" /> 
/// <reference path = "Components/TestComponent2.ts" /> 
/// <reference path = "Components/Component1.ts" /> 
/// <reference path = "Components/Component2.ts" /> 
/// <reference path = "Components/PerspectiveCamera.ts" /> 
/// <reference path = "Components/OrthoCamera.ts" /> 
/// <reference path = "Components/Geometry.ts" /> 
/// <reference path = "Components/Sprite.ts" /> 
var Magnum;
(function (Magnum) {
    ///////////////////////////////////////////////////////////////////////////////////
    // Engine Globals
    var serviceManager = Magnum.Service.Manager.getInstance();
    var resourceAccessManager = Magnum.ResourceAccess.Manager.getInstance();
    var sceneManager = Magnum.Scene.Manager.getInstance();
    var inputManager = Magnum.Input.Manager.getInstance();
    var physics2Manager = Magnum.Physics2.Manager.getInstance();
    var physics3Manager = Magnum.Physics3.Manager.getInstance();
    var videoManager = Magnum.Video.Manager.getInstance();
    var audioManager = Magnum.Audio.Manager.getInstance();
    var gameObjectManager = Magnum.GameObject.Manager.getInstance();
    var componentManager = Magnum.Component.Manager.getInstance();
    var inputCache = new Magnum.InputCache();
    var engine = null;
    ///////////////////////////////////////////////////////////////////////////////////
    // Services
    Magnum.Service.Manager.getInstance().register(Magnum.Scene.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.ResourceAccess.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.Input.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.Physics3.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.Physics2.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.Video.Service);
    Magnum.Service.Manager.getInstance().register(Magnum.Audio.Service);
    ///////////////////////////////////////////////////////////////////////////////////
    // ResourcesImporter Creator
    ///////////////////////////////////////////////////////////////////////////////////
    // Resources Creator
    Magnum.ResourceAccess.Manager.getInstance().register(Magnum.TestComponent1.Resource);
    Magnum.ResourceAccess.Manager.getInstance().register(Magnum.TestComponent2.Resource);
    Magnum.ResourceAccess.Manager.getInstance().register(Magnum.Texture2DFile.Resource);
    Magnum.ResourceAccess.Manager.getInstance().register(Magnum.TextureCubeFile.Resource);
    Magnum.ResourceAccess.Manager.getInstance().register(Magnum.ShaderProgram.Resource);
    ///////////////////////////////////////////////////////////////////////////////////
    // Scene Creators
    Magnum.Scene.Manager.getInstance().register(Magnum.Test1Scene);
    Magnum.Scene.Manager.getInstance().register(Magnum.Test2Scene);
    Magnum.Scene.Manager.getInstance().register(Magnum.Test3Scene);
    Magnum.Scene.Manager.getInstance().register(Magnum.Test4Scene);
    Magnum.Scene.Manager.getInstance().register(Magnum.TestClothScene);
    ///////////////////////////////////////////////////////////////////////////////////
    // GameObject Creators
    Magnum.GameObject.Manager.getInstance().register(Magnum.GameObject);
    ///////////////////////////////////////////////////////////////////////////////////
    // Component Creators  
    Magnum.Component.Manager.getInstance().register(Magnum.Component1);
    Magnum.Component.Manager.getInstance().register(Magnum.Component2);
    Magnum.Component.Manager.getInstance().register(Magnum.TestComponent1);
    Magnum.Component.Manager.getInstance().register(Magnum.TestComponent2);
    Magnum.Component.Manager.getInstance().register(Magnum.Test.Renderer);
    Magnum.Component.Manager.getInstance().register(Magnum.PerspectiveCamera);
    Magnum.Component.Manager.getInstance().register(Magnum.OrthoCamera);
    Magnum.Component.Manager.getInstance().register(Magnum.Geometry);
    Magnum.Component.Manager.getInstance().register(Magnum.Geometry.Renderer);
    Magnum.Component.Manager.getInstance().register(Magnum.Sprite);
    Magnum.Component.Manager.getInstance().register(Magnum.Sprite.Renderer);
    ///////////////////////////////////////////////////////////////////////////////////
    function initialize(width, height) {
        engine = new Magnum.Engine();
        engine.setRawAssetRootDirectory("rawassets/");
        engine.setAssetRootDirectory("assets/");
        engine.setDocumentDirectory("documents/");
        engine.setExternalDirectory("externals/");
        //engine.setInitialScene("Test3");
        engine.setInitialScene("TestCloth");
        engine.setGetCurrentTimeMSFunc(function () {
            return new Date().getTime() / 1000;
        });
        engine.setConsoleMessageFunc(function (msg) {
            console.log("Verbose: " + msg);
        }, function (msg) {
            console.log("Debug  : " + msg);
        }, function (msg) {
            console.log("Info   : " + msg);
        }, function (msg) {
            console.log("Warning: " + msg);
        }, function (msg) {
            alert("Error  : " + msg);
        }, function (msg) {
            alert("Assert : " + msg);
        });
        return engine.onInitialize(width, height);
    }
    function update() {
        requestAnimationFrame(update);
        engine.onInputCache(inputCache);
        engine.onUpdate();
    }
    function terminate() {
        engine.onTerminate();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    var loaded = false;
    document.body.onload = function () {
        if (!loaded) {
            var canvas = document.getElementById("glCanvas");
            initialize(canvas.clientWidth, canvas.clientHeight);
            requestAnimationFrame(update);
            loaded = true;
        }
    };
    document.body.onresize = function () {
        var c = document.getElementById("glCanvas");
        var b = document.body;
        c.setAttribute("width", b.clientWidth.toString());
        c.setAttribute("height", b.clientHeight.toString());
        console.log("Resize!!!! canvas:(" + c.clientWidth + " ," + c.clientHeight + ")", "body:(" + b.clientWidth + " ," + b.clientHeight + ")");
    };
    document.body.onclose = function () {
        terminate();
    };
    document.onmousedown = function (event) {
        inputCache.addMouseDown(Magnum.InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    };
    document.onmouseup = function (event) {
        inputCache.addMouseUp(Magnum.InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    };
    document.onmousemove = function (event) {
        inputCache.addMouseMove(Magnum.InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    };
})(Magnum || (Magnum = {}));
/*
initUpload();

//初始化上传
function initUpload() {
    var chunk = 100 * 1024;   //每片大小
    var input = document.getElementById("file");    //input file
    input.onchange = function (e) {
        var file = this.files[0];
        var query = {};
        var chunks = [];
        if (!!file) {
            var start = 0;
            //文件分片
            for (var i = 0; i < Math.ceil(file.size / chunk); i++) {
                var end = start + chunk;
                chunks[i] = file.slice(start , end);
                start = end;
            }
            
            // 采用post方法上传文件
            // url query上拼接以下参数，用于记录上传偏移
            // post body中存放本次要上传的二进制数据
            query = {
                fileSize: file.size,
                dataSize: chunk,
                nextOffset: 0
            }

            upload(chunks, query, successPerUpload);
        }
    }
}

// 执行上传
function upload(chunks, query, cb) {
    var queryStr = Object.getOwnPropertyNames(query).map(key => {
        return key + "=" + query[key];
    }).join("&");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://xxxx/opload?" + queryStr);
    xhr.overrideMimeType("application/octet-stream");
    
    //获取post body中二进制数据
    var index = Math.floor(query.nextOffset / query.dataSize);
    getFileBinary(chunks[index], function (binary) {
        if (xhr.sendAsBinary) {
            xhr.sendAsBinary(binary);
        } else {
            xhr.send(binary);
        }

    });

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var resp = JSON.parse(xhr.responseText);
                // 接口返回nextoffset
                // resp = {
                //     isFinish:false,
                //     offset:100*1024
                // }
                if (typeof cb === "function") {
                    cb.call(this, resp, chunks, query)
                }
            }
        }
    }
}

// 每片上传成功后执行
function successPerUpload(resp, chunks, query) {
    if (resp.isFinish === true) {
        alert("上传成功");
    } else {
        //未上传完毕
        query.offset = resp.offset;
        upload(chunks, query, successPerUpload);
    }
}

// 获取文件二进制数据
function getFileBinary(file, cb) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
        if (typeof cb === "function") {
            cb.call(this, this.result);
        }
    }
}


createDownload("download.txt","download file");

function createDownload(fileName, content){
    var blob = new Blob([content]);
    var link = document.createElement("a");
    link.innerHTML = fileName;
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    document.getElementsByTagName("body")[0].appendChild(link);
}


application/msword doc
application/pdf pdf
application/rtf rtf
application/vnd.ms-excel xls
application/vnd.ms-powerpoint ppt
application/x-rar-compressed rar
application/x-shockwave-flash swf
application/zip zip
audio/midi mid midi kar
audio/mpeg mp3
audio/ogg ogg
audio/x-m4a m4a
audio/x-realaudio ra
image/gif gif
image/jpeg jpeg jpg
image/png png
image/tiff tif tiff
image/vnd.wap.wbmp wbmp
image/x-icon ico
image/x-jng jng
image/x-ms-bmp bmp
image/svg+xml svg svgz
image/webp webp
text/css css
text/html html htm shtml
text/plain txt
text/xml xml
video/3gpp 3gpp 3gp
video/mp4 mp4
video/mpeg mpeg mpg
video/quicktime mov
video/webm webm
video/x-flv flv
video/x-m4v m4v
video/x-ms-wmv wmv
video/x-msvideo avi

作者：Amy_LuLu__
链接：https://www.jianshu.com/p/d70eb31e7a69
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
*/ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Copyright © 2018 <copyright holders>
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
;
class Base {
    constructor() {
        var z1 = 1;
        var z2;
        var z3 = 1;
        var z4;
        this.a = 1;
        this.b = 1;
        this.c = "1";
        this.d = "1";
        var str = '1';
        z3 = str; //str is now of type number 
        console.log(z3);
        this.d = undefined;
        this.d = null;
    }
    destructor() {
    }
    test() {
    }
}
;
class Derived extends Base {
    constructor() {
        super();
    }
    destructor() {
    }
    test() {
    }
    static test1() {
        return "1";
    }
    static test2() {
        return 1;
    }
}
;
var TestEnum;
(function (TestEnum) {
    TestEnum[TestEnum["TEST1"] = 0] = "TEST1";
    TestEnum[TestEnum["TEST2"] = 1] = "TEST2";
})(TestEnum || (TestEnum = {}));
;
function testFunc(myNumber, myString, myBoolean, rate = 0.50, ...nums) {
    switch (myNumber) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
    }
    ;
    var a = 1;
    let b = 2;
    var c = "1";
    let d = "2";
    if (myNumber) {
    }
    else if (myNumber) {
    }
    else {
    }
    for (var i = 0; i < 10; i++) {
    }
    for (var n in nums) {
        console.log(n);
    }
    while (i < 10) {
        continue;
    }
    do {
        continue;
    } while (i < 10);
    var g = null;
    var h = false;
    var j = true;
    const k = true;
    var derived = new Derived();
    //type 	
    //instanceof 
    var x = typeof (derived);
    console.log(typeof (derived));
    console.log(typeof (Derived));
    console.log(typeof (derived) == typeof (Derived));
    console.log(typeof (typeof (derived)));
    var isInstance = derived instanceof Derived;
    var foo = (x) => 10 + x;
    console.log(foo(100)); //outputs 110 
    var num = new Number(1);
    console.log("TypeScript Number Properties: " + num.toString());
    console.log("Maximum value that a number variable can hold: " + Number.MAX_VALUE);
    console.log("The least value that a number variable can hold: " + Number.MIN_VALUE);
    console.log("Value of Negative Infinity: " + Number.NEGATIVE_INFINITY);
    console.log("Value of Negative Infinity:" + Number.POSITIVE_INFINITY);
    var str = new String("asdassd");
    var numlist = [2, 4, 6, 8];
    var alphas;
    alphas = ["1", "2", "3", "4"];
    console.log(alphas[0]);
    console.log(alphas[1]);
    var arr_names = new Array(4);
    for (var i = 0; i < arr_names.length; i++) {
        arr_names[i] = i * 2;
        console.log(arr_names[i]);
    }
    var names = new Array("Mary", "Tom", "Jack", "Jill");
    for (var i = 0; i < names.length; i++) {
        console.log(names[i]);
    }
    var val;
    val = 12;
    console.log("numeric value of val " + val);
    val = "This is a string";
    console.log("string value of val " + val);
    var customer = {
        firstName: "Tom",
        lastName: "Hanks",
        sayHi: () => { return "Hi there"; }
    };
    console.log("Customer Object ");
    console.log(customer.firstName);
    console.log(customer.lastName);
    console.log(customer.sayHi());
    var employee = {
        firstName: "Jim",
        lastName: "Blakes",
        sayHi: () => { return "Hello!!!"; }
    };
    console.log("Employee  Object ");
    return 1;
    /*
    throw
    try
    catch
    finally
    */
    /*
    module
    export
    as
    any
    get
    */
    /*
    package
    yield
    */
}
/*
function identity<T>(arg: T): T {
    console.log(arg);
    return arg;
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity({ length: 10, value: 3 });

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
//getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

function create<T>(c: { new(): T; }): T {
    return new c();
}

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

identity<number>(1);
identity<string>("12");
identity<boolean>(true);
*/ 
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
var Magnum;
(function (Magnum) {
    class Box {
        constructor(v) {
            this.set(v);
        }
        destructor() {
        }
        set(v) {
            this.m = new Array(6);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get X() {
            return this.m[0];
        }
        set X(value) {
            this.m[0] = value;
        }
        get Y() {
            return this.m[1];
        }
        set Y(value) {
            this.m[1] = value;
        }
        get Z() {
            return this.m[2];
        }
        set Z(value) {
            this.m[2] = value;
        }
        get Width() {
            return this.m[3];
        }
        set Width(value) {
            this.m[3] = value;
        }
        get Height() {
            return this.m[4];
        }
        set Height(value) {
            this.m[4] = value;
        }
        get Depth() {
            return this.m[5];
        }
        set Depth(value) {
            this.m[5] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
    }
    Box.Zero = new Box([0, 0, 0, 0, 0, 0]);
    Box.One = new Box([-0.5, -0.5, -0.5, 1, 1, 1]);
    Magnum.Box = Box;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Color3 {
        constructor(v) {
            this.m = [];
            if (v != undefined)
                this.m = v;
            else
                this.m = [255, 255, 255];
        }
        destructor() {
        }
        get R() {
            return this.m[0];
        }
        set R(value) {
            this.m[0] = value;
        }
        get G() {
            return this.m[1];
        }
        set G(value) {
            this.m[1] = value;
        }
        get B() {
            return this.m[2];
        }
        set B(value) {
            this.m[2] = value;
        }
        get A() {
            return 255;
        }
        set A(value) {
        }
        getValue(i) {
            return this.m[i];
        }
        setValue(i, value) {
            this.m[i] = value;
        }
    }
    Color3.Black = new Color3([0, 0, 0]);
    Color3.Blue = new Color3([0, 0, 1]);
    Color3.Green = new Color3([0, 1, 0]);
    Color3.Cyan = new Color3([0, 1, 1]);
    Color3.Red = new Color3([1, 0, 0]);
    Color3.Mangenta = new Color3([1, 0, 1]);
    Color3.Yellow = new Color3([1, 1, 0]);
    Color3.White = new Color3([1, 1, 1]);
    Magnum.Color3 = Color3;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Frustum {
        constructor(v) {
            this.set(v);
        }
        destructor() {
        }
        set(v) {
            this.m = new Array(6);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get Left() {
            return this.m[0];
        }
        set Left(value) {
            this.m[0] = value;
        }
        get Right() {
            return this.m[1];
        }
        set Right(value) {
            this.m[1] = value;
        }
        get Top() {
            return this.m[2];
        }
        set Top(value) {
            this.m[2] = value;
        }
        get Bottom() {
            return this.m[3];
        }
        set Bottom(value) {
            this.m[3] = value;
        }
        get Near() {
            return this.m[4];
        }
        set Near(value) {
            this.m[4] = value;
        }
        get Far() {
            return this.m[5];
        }
        set Far(value) {
            this.m[5] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
    }
    Frustum.Zero = new Frustum([0, 0, 0, 0, 0, 0]);
    Frustum.One = new Frustum([-0.5, -0.5, -0.5, -0.5, 0.1, 1.1]);
    Magnum.Frustum = Frustum;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class IndexBuffer {
        constructor() {
            this.buffer = {};
        }
        destructor() {
        }
        construct() {
            return this.onConstruct();
        }
        destruct() {
            this.onDestruct();
        }
        onConstruct() {
            return true;
        }
        onDestruct() {
            if (this.buffer) {
                gl.deleteBuffer(this.buffer);
                this.buffer = null;
            }
        }
        createBufferObject(data, usage) {
            var usages = [
                gl.STATIC_DRAW,
                gl.STREAM_DRAW,
                gl.DYNAMIC_DRAW
            ];
            var attibutes = { buffer: null, itemSize: 0, numItems: 0 };
            attibutes.buffer = gl.createBuffer();
            if (!attibutes.buffer)
                return null;
            if (!usage)
                usage = IndexBuffer.Usage.StaticDraw;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attibutes.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, usages[usage]);
            attibutes.itemSize = 2;
            attibutes.numItems = data.length / attibutes.itemSize;
            return attibutes;
        }
        setIndices(indices, usage) {
            this.buffer = this.createBufferObject(indices, usage);
            return this.buffer != null;
        }
        getIndices() {
            return this.buffer;
        }
    }
    Magnum.IndexBuffer = IndexBuffer;
    ;
    (function (IndexBuffer) {
        let Usage;
        (function (Usage) {
            Usage[Usage["StaticDraw"] = 0] = "StaticDraw";
            Usage[Usage["StreamDraw"] = 1] = "StreamDraw";
            Usage[Usage["DynamicDraw"] = 2] = "DynamicDraw";
        })(Usage = IndexBuffer.Usage || (IndexBuffer.Usage = {}));
        ;
    })(IndexBuffer = Magnum.IndexBuffer || (Magnum.IndexBuffer = {}));
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Quaternion.ts" /> 
var Magnum;
(function (Magnum) {
    class Matrix2 {
        constructor(v, rowMajor) {
            this.set(v, rowMajor);
        }
        destructor() {
        }
        set(v, rowMajor) {
            this.m = new Array(4);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 2; c++) {
                        for (var r = 0; r < 2; r++) {
                            this.m[r * 2 + c] = v[i];
                            i++;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        ;
        toArray() {
            return this.m.slice(0);
        }
        ;
        toArrayTranpose() {
            return [
                this.m[0], this.m[2],
                this.m[1], this.m[3]
            ];
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        initZero() {
            this.m[0] = 0;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
        }
        initIdentity() {
            this.m[0] = 1;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 1;
        }
    }
    Matrix2.Zero = new Matrix2([0, 0, 0, 0]);
    Matrix2.Identity = new Matrix2([1, 0, 0, 1]);
    Magnum.Matrix2 = Matrix2;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Vector3.ts" /> 
/// <reference path = "Vector4.ts" /> 
/// <reference path = "Quaternion.ts" /> 
var Magnum;
(function (Magnum) {
    class Matrix3 {
        // Create a matrix from an array of numbers.  The input array is
        // interpreted based on the Boolean input as
        //   true:  entry[0..8]={m00,m01,m02,
        //                       m10,m11,m12,
        //                       m20,m21,m22,
        //                       } [row major]
        //   false: entry[0..8]={m00,m10,m20,
        //                       m01,m11,m21,
        //                       m02,m12,m22,
        //                       } [col major]        
        constructor(v, rowMajor) {
            this.set(v, rowMajor);
        }
        destructor() {
        }
        set(v, rowMajor) {
            this.m = new Array(9);
            if (v != undefined) {
                if (rowMajor || rowMajor == undefined) {
                    for (var i = 0; i < this.m.length; i++) {
                        this.m[i] = v[i];
                    }
                }
                else {
                    var i = 0;
                    for (var c = 0; c < 3; c++) {
                        for (var r = 0; r < 3; r++) {
                            this.m[r * 3 + c] = v[i];
                            i++;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        ;
        toArray() {
            return this.m.slice(0);
        }
        ;
        toArrayTranpose() {
            return [
                this.m[0], this.m[3], this.m[6],
                this.m[1], this.m[4], this.m[7],
                this.m[2], this.m[5], this.m[8]
            ];
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        initZero() {
            this.m[0] = 0;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 0;
            this.m[5] = 0;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 0;
        }
        initIdentity() {
            this.m[0] = 1;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = 1;
            this.m[5] = 0;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        initTranslate(x, y) {
            this.initIdentity();
            this.m[2] = x;
            this.m[5] = y;
        }
        initRotate(angle) {
            this.initIdentity();
            var deg2rad = Math.PI / 180.0;
            var rad = angle * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);
            this.m[0] = cosine;
            this.m[3] = sine;
            this.m[1] = -sine;
            this.m[4] = cosine;
        }
        initScale(x, y) {
            this.m[0] = x;
            this.m[1] = 0;
            this.m[2] = 0;
            this.m[3] = 0;
            this.m[4] = y;
            this.m[5] = 0;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        initTranslateRotScale(tx, ty, r, scale) {
            var deg2rad = Math.PI / 180.0;
            var rad = r * deg2rad;
            var cosine = Math.cos(rad);
            var sine = Math.sin(rad);
            this.m[0] = cosine * scale;
            this.m[1] = -sine * scale;
            this.m[2] = tx;
            this.m[3] = sine * scale;
            this.m[4] = cosine * scale;
            this.m[5] = ty;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        initTranslateScale(tx, ty, s) {
            this.m[0] = s;
            this.m[1] = 0;
            this.m[2] = tx;
            this.m[3] = 0;
            this.m[4] = s;
            this.m[5] = ty;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        initLookAt(position, object, up) {
            this.initLookAtScale(position, object, up, 1.0);
        }
        initLookAtScale(position, object, up, scale) {
            var xaxis = Magnum.Vector2.sub(position, object);
            xaxis.normalize();
            var yaxis = xaxis.unitPerpendicular();
            xaxis = Magnum.Vector2.scale(xaxis, scale);
            if (yaxis.dot(up) <= 0)
                yaxis = Magnum.Vector2.scale(yaxis, -scale);
            else
                yaxis = Magnum.Vector2.scale(yaxis, scale);
            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = position.X;
            this.m[3] = xaxis.Y;
            this.m[4] = yaxis.Y;
            this.m[5] = position.Y;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        initStandOn(position, object, upward) {
            this.initStandOnScale(position, object, upward, 1.0);
        }
        initStandOnScale(position, object, upward, scale) {
            var yaxis = upward;
            yaxis.normalize();
            var xaxis = yaxis.unitPerpendicular();
            var dir = Magnum.Vector2.sub(position, object);
            dir.normalize();
            yaxis = Magnum.Vector2.scale(yaxis, scale);
            if (xaxis.dot(dir) <= 0)
                xaxis = Magnum.Vector2.scale(xaxis, -scale);
            else
                xaxis = Magnum.Vector2.scale(xaxis, scale);
            this.m[0] = xaxis.X;
            this.m[1] = yaxis.X;
            this.m[2] = position.X;
            this.m[3] = xaxis.Y;
            this.m[4] = yaxis.Y;
            this.m[5] = position.Y;
            this.m[6] = 0;
            this.m[7] = 0;
            this.m[8] = 1;
        }
        setRow(i, values) {
            var idx = i * 3;
            this.m[idx + 0] = values[0];
            this.m[idx + 1] = values[1];
            this.m[idx + 2] = values[2];
        }
        getRow(i) {
            var idx = i * 3;
            return [this.m[idx + 0], this.m[idx + 1], this.m[idx + 2]];
        }
        setColumn(i, values) {
            var idx = i;
            this.m[idx + 0] = values[0];
            this.m[idx + 3] = values[1];
            this.m[idx + 6] = values[2];
        }
        getColumn(i) {
            var idx = i;
            return [this.m[idx + 0], this.m[idx + 3], this.m[idx + 6]];
        }
        setXAxis(v) {
            this.m[0] = v.X;
            this.m[3] = v.Y;
        }
        getXAxis() {
            return new Magnum.Vector2([this.m[0], this.m[3]]);
        }
        setYAxis(v) {
            this.m[1] = v.X;
            this.m[4] = v.Y;
        }
        getYAxis() {
            return new Magnum.Vector2([this.m[1], this.m[4]]);
        }
        setTranslate(v) {
            this.m[2] = v.X;
            this.m[5] = v.Y;
        }
        getTranslate() {
            return new Magnum.Vector2([this.m[2], this.m[5]]);
        }
        // arithmetic operations
        static add(m1, m2) {
            return new Matrix3([m1.m[0] + m2.m[0], m1.m[1] + m2.m[1], m1.m[2] + m2.m[2],
                m1.m[3] + m2.m[3], m1.m[4] + m2.m[4], m1.m[5] + m2.m[5],
                m1.m[6] + m2.m[6], m1.m[7] + m2.m[7], m1.m[8] + m2.m[8]
            ]);
        }
        static substract(m1, m2) {
            return new Matrix3([m1.m[0] - m2.m[0], m1.m[1] - m2.m[1], m1.m[2] - m2.m[2],
                m1.m[3] - m2.m[3], m1.m[4] - m2.m[4], m1.m[5] - m2.m[5],
                m1.m[6] - m2.m[6], m1.m[7] - m2.m[7], m1.m[8] - m2.m[8]
            ]);
        }
        static mul(m1, m2) {
            var mat = new Matrix3();
            mat.m[0] = m1.m[0] * m2.m[0] + m1.m[1] * m2.m[3] + m1.m[2] * m2.m[6];
            mat.m[1] = m1.m[0] * m2.m[1] + m1.m[1] * m2.m[4] + m1.m[2] * m2.m[7];
            mat.m[2] = m1.m[0] * m2.m[2] + m1.m[1] * m2.m[5] + m1.m[2] * m2.m[8];
            mat.m[3] = m1.m[3] * m2.m[0] + m1.m[4] * m2.m[3] + m1.m[5] * m2.m[6];
            mat.m[4] = m1.m[3] * m2.m[1] + m1.m[4] * m2.m[4] + m1.m[5] * m2.m[7];
            mat.m[5] = m1.m[3] * m2.m[2] + m1.m[4] * m2.m[5] + m1.m[5] * m2.m[8];
            mat.m[6] = m1.m[6] * m2.m[0] + m1.m[7] * m2.m[3] + m1.m[8] * m2.m[6];
            mat.m[7] = m1.m[6] * m2.m[1] + m1.m[7] * m2.m[4] + m1.m[8] * m2.m[7];
            mat.m[8] = m1.m[6] * m2.m[2] + m1.m[7] * m2.m[5] + m1.m[8] * m2.m[8];
            return mat;
        }
        static neg(m) {
            return new Matrix3([
                -m.m[0], -m.m[1], -m.m[2],
                -m.m[3], -m.m[4], -m.m[5],
                -m.m[6], -m.m[7], -m.m[8]
            ]);
        }
        static scale(mat, scale) {
            return new Matrix3([
                mat.m[0] * scale, mat.m[1] * scale, mat.m[2] * scale,
                mat.m[3] * scale, mat.m[4] * scale, mat.m[5] * scale,
                mat.m[6] * scale, mat.m[7] * scale, mat.m[8] * scale
            ]);
        }
        /*
        public add(m: Matrix3): Matrix3 {
            this.m[0] += m.m[0];
            this.m[1] += m.m[1];
            this.m[2] += m.m[2];
            this.m[3] += m.m[3];

            this.m[4] += m.m[4];
            this.m[5] += m.m[5];
            this.m[6] += m.m[6];
            this.m[7] += m.m[7];

            this.m[8] += m.m[8];
            this.m[9] += m.m[9];
            this.m[10] += m.m[10];
            this.m[11] += m.m[11];

            this.m[12] += m.m[12];
            this.m[13] += m.m[13];
            this.m[14] += m.m[14];
            this.m[15] += m.m[15];

            return this;
        }

        public sub(m: Matrix3): Matrix3 {
            this.m[0] -= m.m[0];
            this.m[1] -= m.m[1];
            this.m[2] -= m.m[2];
            this.m[3] -= m.m[3];

            this.m[4] -= m.m[4];
            this.m[5] -= m.m[5];
            this.m[6] -= m.m[6];
            this.m[7] -= m.m[7];

            this.m[8] -= m.m[8];
            this.m[9] -= m.m[9];
            this.m[10] -= m.m[10];
            this.m[11] -= m.m[11];

            this.m[12] -= m.m[12];
            this.m[13] -= m.m[13];
            this.m[14] -= m.m[14];
            this.m[15] -= m.m[15];

            return this;
        }
        
        public mul(m: Matrix3): Matrix3 {
            var temp = this;

            this.m[0] = temp[0] * m.m[0] + temp[1] * m.m[4] + temp[2] * m.m[8] + temp[3] * m.m[12];
            this.m[1] = temp[0] * m.m[1] + temp[1] * m.m[5] + temp[2] * m.m[9] + temp[3] * m.m[13];
            this.m[2] = temp[0] * m.m[2] + temp[1] * m.m[6] + temp[2] * m.m[10] + temp[3] * m.m[14];
            this.m[3] = temp[0] * m.m[3] + temp[1] * m.m[7] + temp[2] * m.m[11] + temp[3] * m.m[15];

            this.m[4] = temp[4] * m.m[0] + temp[5] * m.m[4] + temp[6] * m.m[8] + temp[7] * m.m[12];
            this.m[5] = temp[4] * m.m[1] + temp[5] * m.m[5] + temp[6] * m.m[9] + temp[7] * m.m[13];
            this.m[6] = temp[4] * m.m[2] + temp[5] * m.m[6] + temp[6] * m.m[10] + temp[7] * m.m[14];
            this.m[7] = temp[4] * m.m[3] + temp[5] * m.m[7] + temp[6] * m.m[11] + temp[7] * m.m[15];

            this.m[8] = temp[8] * m.m[0] + temp[9] * m.m[4] + temp[10] * m.m[8] + temp[11] * m.m[12];
            this.m[9] = temp[8] * m.m[1] + temp[9] * m.m[5] + temp[10] * m.m[9] + temp[11] * m.m[13];
            this.m[10] = temp[8] * m.m[2] + temp[9] * m.m[6] + temp[10] * m.m[10] + temp[11] * m.m[14];
            this.m[11] = temp[8] * m.m[3] + temp[9] * m.m[7] + temp[10] * m.m[11] + temp[11] * m.m[15];

            this.m[12] = temp[12] * m.m[0] + temp[13] * m.m[4] + temp[14] * m.m[8] + temp[15] * m.m[12];
            this.m[13] = temp[12] * m.m[1] + temp[13] * m.m[5] + temp[14] * m.m[9] + temp[15] * m.m[13];
            this.m[14] = temp[12] * m.m[2] + temp[13] * m.m[6] + temp[14] * m.m[10] + temp[15] * m.m[14];
            this.m[15] = temp[12] * m.m[3] + temp[13] * m.m[7] + temp[14] * m.m[11] + temp[15] * m.m[15];

            return this;
        }

        public neg(): Matrix3 {
            this.m[0] = -this.m[0];
            this.m[1] = -this.m[1];
            this.m[2] = -this.m[2];
            this.m[3] = -this.m[3];

            this.m[4] = -this.m[4];
            this.m[5] = -this.m[5];
            this.m[6] = -this.m[6];
            this.m[7] = -this.m[7];

            this.m[8] = -this.m[8];
            this.m[9] = -this.m[9];
            this.m[10] = -this.m[10];
            this.m[11] = -this.m[11];

            this.m[12] = -this.m[12];
            this.m[13] = -this.m[13];
            this.m[14] = -this.m[14];
            this.m[15] = -this.m[15];

            return this;
        }

        public scale(scale: number): Matrix3 {
            this.m[0] *= scale;
            this.m[1] *= scale;
            this.m[2] *= scale;
            this.m[3] *= scale;

            this.m[4] *= scale;
            this.m[5] *= scale;
            this.m[6] *= scale;
            this.m[7] *= scale;

            this.m[8] *= scale;
            this.m[9] *= scale;
            this.m[10] *= scale;
            this.m[11] *= scale;

            this.m[12] *= scale;
            this.m[13] *= scale;
            this.m[14] *= scale;
            this.m[15] *= scale;

            return this;
        }
        */
        // matrix times vector
        mulVector3(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * v[2];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1] + this.m[5] * v[2];
            var m2 = this.m[6] * v[0] + this.m[7] * v[1] + this.m[8] * v[2];
            return new Magnum.Vector3([m0, m1, m2]);
        }
        mulVector2(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1];
            return new Magnum.Vector2([m0, m1]);
        }
        mulPositionVector2(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1] + this.m[2] * 1;
            var m1 = this.m[3] * v[0] + this.m[4] * v[1] + this.m[5] * 1;
            return new Magnum.Vector2([m0, m1]);
        }
        mulDirectionVector2(v) {
            var m0 = this.m[0] * v[0] + this.m[1] * v[1];
            var m1 = this.m[3] * v[0] + this.m[4] * v[1];
            var m2 = this.m[6] * v[0] + this.m[7] * v[1];
            return new Magnum.Vector2([m0, m1]);
        }
        // other operations
        transpose() {
            var temp = this.m.slice(0);
            this.m[0] = temp[0];
            this.m[1] = temp[3];
            this.m[2] = temp[6];
            this.m[3] = temp[1];
            this.m[4] = temp[4];
            this.m[5] = temp[7];
            this.m[6] = temp[2];
            this.m[7] = temp[5];
            this.m[8] = temp[8];
        }
        transposeMutiply(m) {
            var temp = this.m.slice(0);
        }
        mutiplyTranspose(m) {
            var temp = this.m.slice(0);
            return this;
        }
        inverse() {
            var a = Matrix3.Identity;
            return a;
        }
        adjoint() {
        }
        determinant() {
            return 0.0;
        }
    }
    Matrix3.Zero = new Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    Matrix3.Identity = new Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    Magnum.Matrix3 = Matrix3;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
/// <reference path = "Texture.ts" /> 
var Magnum;
(function (Magnum) {
    class TextureCube extends Magnum.Texture {
        constructor() {
            super();
        }
        destructor() {
        }
    }
    Magnum.TextureCube = TextureCube;
    ;
    ;
})(Magnum || (Magnum = {}));
;
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
var Magnum;
(function (Magnum) {
    class Vector2 {
        constructor(v) {
            this.set(v);
        }
        destructor() {
            this.m = null;
        }
        set(v) {
            this.m = new Array(2);
            if (v != undefined) {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = v[i];
                }
            }
            else {
                for (var i = 0; i < this.m.length; i++) {
                    this.m[i] = 0;
                }
            }
        }
        get X() {
            return this.m[0];
        }
        set X(value) {
            this.m[0] = value;
        }
        get Y() {
            return this.m[1];
        }
        set Y(value) {
            this.m[1] = value;
        }
        toArray() {
            return this.m;
        }
        ;
        toString() {
            return this.m.toString();
        }
        ;
        // arithmetic operations
        static add(v1, v2) {
            return new Vector2([v1.m[0] + v2.m[0], v1.m[1] + v2.m[1]]);
        }
        static sub(v1, v2) {
            return new Vector2([v1.m[0] - v2.m[0], v1.m[1] - v2.m[1]]);
        }
        static mul(v1, v2) {
            return new Vector2([v1.m[0] * v2.m[0], v1.m[1] * v2.m[1]]);
        }
        static neg(v) {
            return new Vector2([-v.m[0], -v.m[1]]);
        }
        static scale(v1, scale) {
            return new Vector2([v1.m[0] * scale, v1.m[1] * scale]);
        }
        /*
        public add(v: Vector2): Vector2 {
            this.m[0] += v.m[0];
            this.m[1] += v.m[1];

            return this;
        }

        public sub(v: Vector2): Vector2 {
            this.m[0] -= v.m[0];
            this.m[1] -= v.m[1];

            return this;
        }

        public mul(v: Vector2): Vector2 {
            this.m[0] *= v.m[0];
            this.m[1] *= v.m[1];

            return this;
        }

        public neg(): Vector2 {
            this.m[0] *= -1;
            this.m[1] *= -1;

            return this;
        }

        public scale(scale: number): Vector2 {
            this.m[0] *= scale;
            this.m[1] *= scale;

            return this;
        }
        */
        // vector operations
        length() {
            return Math.sqrt(this.squaredLength());
        }
        squaredLength() {
            return this.dot(this);
        }
        dot(v) {
            return this.m[0] * v.m[0] + this.m[1] * v.m[1];
        }
        dotPerpendicular(v) {
            return this.m[0] * v.m[1] - this.m[1] * v.m[0];
        }
        normalize() {
            var sqrLen = this.squaredLength();
            if (sqrLen <= 0.000001) {
                this.m[0] = 0.0;
                this.m[1] = 0.0;
                return 0;
            }
            else {
                var len = 1.0 / Math.sqrt(sqrLen);
                this.m[0] *= len;
                this.m[1] *= len;
                return len;
            }
        }
        // The cross products are computed using the right-handed rule.  Be aware
        // that some graphics APIs use a left-handed rule.  If you have to compute
        // a cross product with these functions and send the result to the API
        // that expects left-handed, you will need to change sign on the vector
        // (replace each component value c by -c).
        perpendicular() {
            return new Vector2([this.m[1], -this.m[0]]);
        }
        unitPerpendicular() {
            var perp = this.perpendicular();
            perp.normalize();
            return perp;
        }
        // Compute the barycentric coordinates of the point with respect to the
        // triangle <V0,V1,V2>, P = b0*V0 + b1*V1 + b2*V2, where b0 + b1 + b2 = 1.
        getBarycentrics(v0, v1, v2, bary) {
            // compute the vectors relative to V2 of the triangle
            var akDiff = [
                Vector2.sub(v0, v2),
                Vector2.sub(v1, v2),
                Vector2.sub(this, v2)
            ];
            // If the vertices have large magnitude, the linear system of equations
            // for computing barycentric coordinates can be ill-conditioned.  To avoid
            // this, uniformly scale the triangle edges to be of order 1.  The scaling
            // of all differences does not change the barycentric coordinates.
            var fMax = 0.0;
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 2; j++) {
                    var fValue = Math.abs(akDiff[i].m[j]);
                    if (fValue > fMax) {
                        fMax = fValue;
                    }
                }
            }
            // scale down only large data
            if (fMax > 1.0) {
                var fInvMax = 1.0 / fMax;
                for (i = 0; i < 3; i++) {
                    akDiff[i] = Vector2.scale(akDiff[i], fInvMax);
                }
            }
            var fDet = akDiff[0].dotPerpendicular(akDiff[1]);
            if (Math.abs(fDet) > 0.000001) {
                var fInvDet = 1.0 / fDet;
                bary[0] = akDiff[2].dotPerpendicular(akDiff[1]) * fInvDet;
                bary[1] = akDiff[0].dotPerpendicular(akDiff[2]) * fInvDet;
                bary[2] = 1.0 - bary[0] - bary[1];
            }
            else {
                // The triangle is a sliver.  Determine the longest edge and
                // compute barycentric coordinates with respect to that edge.
                var kE2 = Vector2.sub(v0, v1);
                var fMaxSqrLength = kE2.squaredLength();
                var iMaxIndex = 2;
                var fSqrLength = akDiff[1].squaredLength();
                if (fSqrLength > fMaxSqrLength) {
                    iMaxIndex = 1;
                    fMaxSqrLength = fSqrLength;
                }
                fSqrLength = akDiff[0].squaredLength();
                if (fSqrLength > fMaxSqrLength) {
                    iMaxIndex = 0;
                    fMaxSqrLength = fSqrLength;
                }
                if (fMaxSqrLength > 0.0000001) {
                    var fInvSqrLength = 1.0 / fMaxSqrLength;
                    if (iMaxIndex == 0) {
                        // P-V2 = t(V0-V2)
                        bary[0] = akDiff[2].dot(akDiff[0]) * fInvSqrLength;
                        bary[1] = 0.0;
                        bary[2] = 1.0 - bary[0];
                    }
                    else if (iMaxIndex == 1) {
                        // P-V2 = t(V1-V2)
                        bary[0] = 0.0;
                        bary[1] = akDiff[2].dot(akDiff[1]) * fInvSqrLength;
                        bary[2] = 1.0 - bary[1];
                    }
                    else {
                        // P-V1 = t(V0-V1)
                        akDiff[2] = Vector2.sub(this, v1);
                        bary[0] = akDiff[2].dot(kE2) * fInvSqrLength;
                        bary[1] = 1.0 - bary[0];
                        bary[2] = 0.0;
                    }
                }
                else {
                    // triangle is a nearly a point, just return equal weights
                    bary[0] = 1.0 / 3.0;
                    bary[1] = bary[0];
                    bary[2] = bary[0];
                }
            }
        }
        // Gram-Schmidt orthonormalization.  Take linearly independent vectors U
        // and V and compute an orthonormal set (unit length, mutually
        // perpendicular).
        static orthonormalize(u, v) {
            // If the input vectors are v0 and v1, then the Gram-Schmidt
            // orthonormalization produces vectors u0 and u1 as follows,
            //
            //   u0 = v0/|v0|
            //   u1 = (v1-(u0*v1)u0)/|v1-(u0*v1)u0|
            //
            // where |A| indicates length of vector A and A*B indicates dot
            // product of vectors A and B.
            // compute u0
            u.normalize();
            // compute u1
            var fDot0 = u.dot(v);
            v = Vector2.sub(v, Vector2.scale(u, fDot0));
            v.normalize();
        }
        // Input V must be initialized to a nonzero vector, output is {U,V}, an
        // orthonormal basis.  A hint is provided about whether or not V is
        // already unit length.
        static generateOrthonormalBasis(u, v, bUnitLengthV) {
            if (!bUnitLengthV) {
                v.normalize();
            }
            u = v.perpendicular();
        }
        // Compute the extreme values.
        static computeExtremes(akPoints, rkMin, rkMax) {
            rkMin = akPoints[0];
            rkMax = rkMin;
            for (var i = 1; i < akPoints.length; i++) {
                var rkPoint = akPoints[i];
                for (var j = 0; j < 2; j++) {
                    if (rkPoint[j] < rkMin[j]) {
                        rkMin[j] = rkPoint[j];
                    }
                    else if (rkPoint[j] > rkMax[j]) {
                        rkMax[j] = rkPoint[j];
                    }
                }
            }
        }
    }
    Vector2.Zero = new Vector2([0, 0]);
    Vector2.One = new Vector2([1, 1]);
    Vector2.Half = new Vector2([0.5, 0.5]);
    Vector2.UnitX = new Vector2([1, 0]);
    Vector2.UnitY = new Vector2([0, 1]);
    Magnum.Vector2 = Vector2;
    ;
    ;
})(Magnum || (Magnum = {}));
;
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs, require, define;
!function (global, setTimeout) { var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.3.6", commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1; function commentReplace(e, t) { return t || ""; } function isFunction(e) { return "[object Function]" === ostring.call(e); } function isArray(e) { return "[object Array]" === ostring.call(e); } function each(e, t) { var i; if (e)
    for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1)
        ; } function eachReverse(e, t) { var i; if (e)
    for (i = e.length - 1; -1 < i && (!e[i] || !t(e[i], i, e)); i -= 1)
        ; } function hasProp(e, t) { return hasOwn.call(e, t); } function getOwn(e, t) { return hasProp(e, t) && e[t]; } function eachProp(e, t) { var i; for (i in e)
    if (hasProp(e, i) && t(e[i], i))
        break; } function mixin(i, e, r, n) { return e && eachProp(e, function (e, t) { !r && hasProp(i, t) || (!n || "object" != typeof e || !e || isArray(e) || isFunction(e) || e instanceof RegExp ? i[t] = e : (i[t] || (i[t] = {}), mixin(i[t], e, r, n))); }), i; } function bind(e, t) { return function () { return t.apply(e, arguments); }; } function scripts() { return document.getElementsByTagName("script"); } function defaultOnError(e) { throw e; } function getGlobal(e) { if (!e)
    return e; var t = global; return each(e.split("."), function (e) { t = t[e]; }), t; } function makeError(e, t, i, r) { var n = new Error(t + "\nhttps://requirejs.org/docs/errors.html#" + e); return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n; } if (void 0 === define) {
    if (void 0 !== requirejs) {
        if (isFunction(requirejs))
            return;
        cfg = requirejs, requirejs = void 0;
    }
    void 0 === require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) { var n, o, a = defContextName; return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []), o && o.context && (a = o.context), (n = getOwn(contexts, a)) || (n = contexts[a] = req.s.newContext(a)), o && n.configure(o), n.require(e, t, i); }, req.config = function (e) { return req(e); }, req.nextTick = void 0 !== setTimeout ? function (e) { setTimeout(e, 4); } : function (e) { e(); }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = { contexts: contexts, newContext: newContext }, req({}), each(["toUrl", "undef", "defined", "specified"], function (t) { req[t] = function () { var e = contexts[defContextName]; return e.require[t].apply(e, arguments); }; }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, i) { var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"); return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r; }, req.load = function (t, i, r) { var e, n = t && t.config || {}; if (isBrowser)
        return (e = req.createNode(n, i, r)).setAttribute("data-requirecontext", t.contextName), e.setAttribute("data-requiremodule", i), !e.attachEvent || e.attachEvent.toString && e.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (e.addEventListener("load", t.onScriptLoad, !1), e.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, e.attachEvent("onreadystatechange", t.onScriptLoad)), e.src = r, n.onNodeCreated && n.onNodeCreated(e, n, i, r), currentlyAddingScript = e, baseElement ? head.insertBefore(e, baseElement) : head.appendChild(e), currentlyAddingScript = null, e; if (isWebWorker)
        try {
            setTimeout(function () { }, 0), importScripts(r), t.completeLoad(i);
        }
        catch (e) {
            t.onError(makeError("importscripts", "importScripts failed for " + i + " at " + r, e, [i]));
        } }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) { if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main"))
        return mainScript = dataMain, cfg.baseUrl || -1 !== mainScript.indexOf("!") || (mainScript = (src = mainScript.split("/")).pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0; }), define = function (e, i, t) { var r, n; "string" != typeof e && (t = i, i = e, e = null), isArray(i) || (t = i, i = null), !i && isFunction(t) && (i = [], t.length && (t.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (e, t) { i.push(t); }), i = (1 === t.length ? ["require"] : ["require", "exports", "module"]).concat(i))), useInteractive && (r = currentlyAddingScript || getInteractiveScript()) && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")]), n ? (n.defQueue.push([e, i, t]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, i, t]); }, define.amd = { jQuery: !0 }, req.exec = function (text) { return eval(text); }, req(cfg);
} function newContext(u) { var i, e, l, c, d, g = { waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {} }, p = {}, f = {}, r = {}, h = [], m = {}, n = {}, v = {}, x = 1, b = 1; function q(e, t, i) { var r, n, o, a, s, u, c, d, p, f, l = t && t.split("/"), h = g.map, m = h && h["*"]; if (e && (u = (e = e.split("/")).length - 1, g.nodeIdCompat && jsSuffixRegExp.test(e[u]) && (e[u] = e[u].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && l && (e = l.slice(0, l.length - 1).concat(e)), function (e) { var t, i; for (t = 0; t < e.length; t++)
    if ("." === (i = e[t]))
        e.splice(t, 1), t -= 1;
    else if (".." === i) {
        if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1])
            continue;
        0 < t && (e.splice(t - 1, 2), t -= 2);
    } }(e), e = e.join("/")), i && h && (l || m)) {
    e: for (o = (n = e.split("/")).length; 0 < o; o -= 1) {
        if (s = n.slice(0, o).join("/"), l)
            for (a = l.length; 0 < a; a -= 1)
                if ((r = getOwn(h, l.slice(0, a).join("/"))) && (r = getOwn(r, s))) {
                    c = r, d = o;
                    break e;
                }
        !p && m && getOwn(m, s) && (p = getOwn(m, s), f = o);
    }
    !c && p && (c = p, d = f), c && (n.splice(0, d, c), e = n.join("/"));
} return getOwn(g.pkgs, e) || e; } function E(t) { isBrowser && each(scripts(), function (e) { if (e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === l.contextName)
    return e.parentNode.removeChild(e), !0; }); } function w(e) { var t = getOwn(g.paths, e); if (t && isArray(t) && 1 < t.length)
    return t.shift(), l.require.undef(e), l.makeRequire(null, { skipMap: !0 })([e]), !0; } function y(e) { var t, i = e ? e.indexOf("!") : -1; return -1 < i && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]; } function S(e, t, i, r) { var n, o, a, s, u = null, c = t ? t.name : null, d = e, p = !0, f = ""; return e || (p = !1, e = "_@r" + (x += 1)), u = (s = y(e))[0], e = s[1], u && (u = q(u, c, r), o = getOwn(m, u)), e && (u ? f = i ? e : o && o.normalize ? o.normalize(e, function (e) { return q(e, c, r); }) : -1 === e.indexOf("!") ? q(e, c, r) : e : (u = (s = y(f = q(e, c, r)))[0], f = s[1], i = !0, n = l.nameToUrl(f))), { prefix: u, name: f, parentMap: t, unnormalized: !!(a = !u || o || i ? "" : "_unnormalized" + (b += 1)), url: n, originalName: d, isDefine: p, id: (u ? u + "!" + f : f) + a }; } function k(e) { var t = e.id, i = getOwn(p, t); return i || (i = p[t] = new l.Module(e)), i; } function M(e, t, i) { var r = e.id, n = getOwn(p, r); !hasProp(m, r) || n && !n.defineEmitComplete ? (n = k(e)).error && "error" === t ? i(n.error) : n.on(t, i) : "defined" === t && i(m[r]); } function O(i, e) { var t = i.requireModules, r = !1; e ? e(i) : (each(t, function (e) { var t = getOwn(p, e); t && (t.error = i, t.events.error && (r = !0, t.emit("error", i))); }), r || req.onError(i)); } function j() { globalDefQueue.length && (each(globalDefQueue, function (e) { var t = e[0]; "string" == typeof t && (l.defQueueMap[t] = !0), h.push(e); }), globalDefQueue = []); } function P(e) { delete p[e], delete f[e]; } function R() { var e, r, t = 1e3 * g.waitSeconds, n = t && l.startTime + t < (new Date).getTime(), o = [], a = [], s = !1, u = !0; if (!i) {
    if (i = !0, eachProp(f, function (e) { var t = e.map, i = t.id; if (e.enabled && (t.isDefine || a.push(e), !e.error))
        if (!e.inited && n)
            w(i) ? s = r = !0 : (o.push(i), E(i));
        else if (!e.inited && e.fetched && t.isDefine && (s = !0, !t.prefix))
            return u = !1; }), n && o.length)
        return (e = makeError("timeout", "Load timeout for modules: " + o, null, o)).contextName = l.contextName, O(e);
    u && each(a, function (e) { !function n(o, a, s) { var e = o.map.id; o.error ? o.emit("error", o.error) : (a[e] = !0, each(o.depMaps, function (e, t) { var i = e.id, r = getOwn(p, i); !r || o.depMatched[t] || s[i] || (getOwn(a, i) ? (o.defineDep(t, m[i]), o.check()) : n(r, a, s)); }), s[e] = !0); }(e, {}, {}); }), n && !r || !s || !isBrowser && !isWebWorker || d || (d = setTimeout(function () { d = 0, R(); }, 50)), i = !1;
} } function a(e) { hasProp(m, e[0]) || k(S(e[0], null, !0)).init(e[1], e[2]); } function o(e, t, i, r) { e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1); } function s(e) { var t = e.currentTarget || e.srcElement; return o(t, l.onScriptLoad, "load", "onreadystatechange"), o(t, l.onScriptError, "error"), { node: t, id: t && t.getAttribute("data-requiremodule") }; } function T() { var e; for (j(); h.length;) {
    if (null === (e = h.shift())[0])
        return O(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
    a(e);
} l.defQueueMap = {}; } return c = { require: function (e) { return e.require ? e.require : e.require = l.makeRequire(e.map); }, exports: function (e) { if (e.usingExports = !0, e.map.isDefine)
        return e.exports ? m[e.map.id] = e.exports : e.exports = m[e.map.id] = {}; }, module: function (e) { return e.module ? e.module : e.module = { id: e.map.id, uri: e.map.url, config: function () { return getOwn(g.config, e.map.id) || {}; }, exports: e.exports || (e.exports = {}) }; } }, (e = function (e) { this.events = getOwn(r, e.id) || {}, this.map = e, this.shim = getOwn(g.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0; }).prototype = { init: function (e, t, i, r) { r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) { this.emit("error", e); })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check()); }, defineDep: function (e, t) { this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t); }, fetch: function () { if (!this.fetched) {
        this.fetched = !0, l.startTime = (new Date).getTime();
        var e = this.map;
        if (!this.shim)
            return e.prefix ? this.callPlugin() : this.load();
        l.makeRequire(this.map, { enableBuildCallback: !0 })(this.shim.deps || [], bind(this, function () { return e.prefix ? this.callPlugin() : this.load(); }));
    } }, load: function () { var e = this.map.url; n[e] || (n[e] = !0, l.load(this.map.id, e)); }, check: function () { if (this.enabled && !this.enabling) {
        var t, e, i = this.map.id, r = this.depExports, n = this.exports, o = this.factory;
        if (this.inited) {
            if (this.error)
                this.emit("error", this.error);
            else if (!this.defining) {
                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                    if (isFunction(o)) {
                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError)
                            try {
                                n = l.execCb(i, o, r, n);
                            }
                            catch (e) {
                                t = e;
                            }
                        else
                            n = l.execCb(i, o, r, n);
                        if (this.map.isDefine && void 0 === n && ((e = this.module) ? n = e.exports : this.usingExports && (n = this.exports)), t)
                            return t.requireMap = this.map, t.requireModules = this.map.isDefine ? [this.map.id] : null, t.requireType = this.map.isDefine ? "define" : "require", O(this.error = t);
                    }
                    else
                        n = o;
                    if (this.exports = n, this.map.isDefine && !this.ignore && (m[i] = n, req.onResourceLoad)) {
                        var a = [];
                        each(this.depMaps, function (e) { a.push(e.normalizedMap || e); }), req.onResourceLoad(l, this.map, a);
                    }
                    P(i), this.defined = !0;
                }
                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0);
            }
        }
        else
            hasProp(l.defQueueMap, i) || this.fetch();
    } }, callPlugin: function () { var u = this.map, c = u.id, e = S(u.prefix); this.depMaps.push(e), M(e, "defined", bind(this, function (e) { var o, t, i, r = getOwn(v, this.map.id), n = this.map.name, a = this.map.parentMap ? this.map.parentMap.name : null, s = l.makeRequire(u.parentMap, { enableBuildCallback: !0 }); return this.map.unnormalized ? (e.normalize && (n = e.normalize(n, function (e) { return q(e, a, !0); }) || ""), M(t = S(u.prefix + "!" + n, this.map.parentMap, !0), "defined", bind(this, function (e) { this.map.normalizedMap = t, this.init([], function () { return e; }, null, { enabled: !0, ignore: !0 }); })), void ((i = getOwn(p, t.id)) && (this.depMaps.push(t), this.events.error && i.on("error", bind(this, function (e) { this.emit("error", e); })), i.enable()))) : r ? (this.map.url = l.nameToUrl(r), void this.load()) : ((o = bind(this, function (e) { this.init([], function () { return e; }, null, { enabled: !0 }); })).error = bind(this, function (e) { this.inited = !0, (this.error = e).requireModules = [c], eachProp(p, function (e) { 0 === e.map.id.indexOf(c + "_unnormalized") && P(e.map.id); }), O(e); }), o.fromText = bind(this, function (e, t) { var i = u.name, r = S(i), n = useInteractive; t && (e = t), n && (useInteractive = !1), k(r), hasProp(g.config, c) && (g.config[i] = g.config[c]); try {
        req.exec(e);
    }
    catch (e) {
        return O(makeError("fromtexteval", "fromText eval for " + c + " failed: " + e, e, [c]));
    } n && (useInteractive = !0), this.depMaps.push(r), l.completeLoad(i), s([i], o); }), void e.load(u.name, s, o, g)); })), l.enable(e, this), this.pluginMaps[e.id] = e; }, enable: function () { (f[this.map.id] = this).enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) { var i, r, n; if ("string" == typeof e) {
        if (e = S(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(c, e.id))
            return void (this.depExports[t] = n(this));
        this.depCount += 1, M(e, "defined", bind(this, function (e) { this.undefed || (this.defineDep(t, e), this.check()); })), this.errback ? M(e, "error", bind(this, this.errback)) : this.events.error && M(e, "error", bind(this, function (e) { this.emit("error", e); }));
    } i = e.id, r = p[i], hasProp(c, i) || !r || r.enabled || l.enable(e, this); })), eachProp(this.pluginMaps, bind(this, function (e) { var t = getOwn(p, e.id); t && !t.enabled && l.enable(e, this); })), this.enabling = !1, this.check(); }, on: function (e, t) { var i = this.events[e]; i || (i = this.events[e] = []), i.push(t); }, emit: function (e, t) { each(this.events[e], function (e) { e(t); }), "error" === e && delete this.events[e]; } }, (l = { config: g, contextName: u, registry: p, defined: m, urlFetched: n, defQueue: h, defQueueMap: {}, Module: e, makeModuleMap: S, nextTick: req.nextTick, onError: O, configure: function (e) { if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
        var i = e.urlArgs;
        e.urlArgs = function (e, t) { return (-1 === t.indexOf("?") ? "?" : "&") + i; };
    } var r = g.shim, n = { paths: !0, bundles: !0, config: !0, map: !0 }; eachProp(e, function (e, t) { n[t] ? (g[t] || (g[t] = {}), mixin(g[t], e, !0, !0)) : g[t] = e; }), e.bundles && eachProp(e.bundles, function (e, t) { each(e, function (e) { e !== t && (v[e] = t); }); }), e.shim && (eachProp(e.shim, function (e, t) { isArray(e) && (e = { deps: e }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = l.makeShimExports(e)), r[t] = e; }), g.shim = r), e.packages && each(e.packages, function (e) { var t; t = (e = "string" == typeof e ? { name: e } : e).name, e.location && (g.paths[t] = e.location), g.pkgs[t] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, ""); }), eachProp(p, function (e, t) { e.inited || e.map.unnormalized || (e.map = S(t, null, !0)); }), (e.deps || e.callback) && l.require(e.deps || [], e.callback); }, makeShimExports: function (t) { return function () { var e; return t.init && (e = t.init.apply(global, arguments)), e || t.exports && getGlobal(t.exports); }; }, makeRequire: function (o, a) { function s(e, t, i) { var r, n; return a.enableBuildCallback && t && isFunction(t) && (t.__requireJsBuild = !0), "string" == typeof e ? isFunction(t) ? O(makeError("requireargs", "Invalid require call"), i) : o && hasProp(c, e) ? c[e](p[o.id]) : req.get ? req.get(l, e, o, s) : (r = S(e, o, !1, !0).id, hasProp(m, r) ? m[r] : O(makeError("notloaded", 'Module name "' + r + '" has not been loaded yet for context: ' + u + (o ? "" : ". Use require([])")))) : (T(), l.nextTick(function () { T(), (n = k(S(null, o))).skipMap = a.skipMap, n.init(e, t, i, { enabled: !0 }), R(); }), s); } return a = a || {}, mixin(s, { isBrowser: isBrowser, toUrl: function (e) { var t, i = e.lastIndexOf("."), r = e.split("/")[0]; return -1 !== i && (!("." === r || ".." === r) || 1 < i) && (t = e.substring(i, e.length), e = e.substring(0, i)), l.nameToUrl(q(e, o && o.id, !0), t, !0); }, defined: function (e) { return hasProp(m, S(e, o, !1, !0).id); }, specified: function (e) { return e = S(e, o, !1, !0).id, hasProp(m, e) || hasProp(p, e); } }), o || (s.undef = function (i) { j(); var e = S(i, o, !0), t = getOwn(p, i); t.undefed = !0, E(i), delete m[i], delete n[e.url], delete r[i], eachReverse(h, function (e, t) { e[0] === i && h.splice(t, 1); }), delete l.defQueueMap[i], t && (t.events.defined && (r[i] = t.events), P(i)); }), s; }, enable: function (e) { getOwn(p, e.id) && k(e).enable(); }, completeLoad: function (e) { var t, i, r, n = getOwn(g.shim, e) || {}, o = n.exports; for (j(); h.length;) {
        if (null === (i = h.shift())[0]) {
            if (i[0] = e, t)
                break;
            t = !0;
        }
        else
            i[0] === e && (t = !0);
        a(i);
    } if (l.defQueueMap = {}, r = getOwn(p, e), !t && !hasProp(m, e) && r && !r.inited) {
        if (!(!g.enforceDefine || o && getGlobal(o)))
            return w(e) ? void 0 : O(makeError("nodefine", "No define call for " + e, null, [e]));
        a([e, n.deps || [], n.exportsFn]);
    } R(); }, nameToUrl: function (e, t, i) { var r, n, o, a, s, u, c = getOwn(g.pkgs, e); if (c && (e = c), u = getOwn(v, e))
        return l.nameToUrl(u, t, i); if (req.jsExtRegExp.test(e))
        a = e + (t || "");
    else {
        for (r = g.paths, o = (n = e.split("/")).length; 0 < o; o -= 1)
            if (s = getOwn(r, n.slice(0, o).join("/"))) {
                isArray(s) && (s = s[0]), n.splice(0, o, s);
                break;
            }
        a = n.join("/"), a = ("/" === (a += t || (/^data\:|^blob\:|\?/.test(a) || i ? "" : ".js")).charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "" : g.baseUrl) + a;
    } return g.urlArgs && !/^blob\:/.test(a) ? a + g.urlArgs(e, a) : a; }, load: function (e, t) { req.load(l, e, t); }, execCb: function (e, t, i, r) { return t.apply(r, i); }, onScriptLoad: function (e) { if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
        interactiveScript = null;
        var t = s(e);
        l.completeLoad(t.id);
    } }, onScriptError: function (e) { var i = s(e); if (!w(i.id)) {
        var r = [];
        return eachProp(p, function (e, t) { 0 !== t.indexOf("_@r") && each(e.depMaps, function (e) { if (e.id === i.id)
            return r.push(t), !0; }); }), O(makeError("scripterror", 'Script error for "' + i.id + (r.length ? '", needed by: ' + r.join(", ") : '"'), e, [i.id]));
    } } }).require = l.makeRequire(), l; } function getInteractiveScript() { return interactiveScript && "interactive" === interactiveScript.readyState || eachReverse(scripts(), function (e) { if ("interactive" === e.readyState)
    return interactiveScript = e; }), interactiveScript; } }(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);
//# sourceMappingURL=app.js.map