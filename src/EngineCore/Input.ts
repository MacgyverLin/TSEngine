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

namespace Magnum {
    export class Input {
        public constructor() {
        }

        public destructor() {
        }
    };

    export namespace Input {
        export enum EventType {
            MouseDown = 0,
            MouseUp,
            MouseMove,
            MouseWheel,
            GamepadKeyDown,
            GamepadKeyUp,
            AcceleratorUpdate,
            MessageReceived,
        };

        export enum Modifier {
            Shift = 0x01,
            Ctrl = 0x02,
            Alt = 0x04,
        };

        export class Event {
            event: EventType;
            modifier: number;

            constructor() {
            }

            public destructor() {
            }

            public isAltDown(): boolean {
                return (this.modifier & Input.Modifier.Alt) != 0;
            }

            public isCtrlDown(): boolean {
                return (this.modifier & Input.Modifier.Ctrl) != 0;
            }

            public isShiftDown(): boolean {
                return (this.modifier & Input.Modifier.Shift) != 0;
            }
        };

        export class TouchpadEvent extends Event {
            fingerID: number;
            position: Vector2;
            wheelAxis: number;
            wheelRotation: number;

            constructor() {
                super();
            }

            public destructor() {
                super.destructor();
            }                
        };
        export class TouchpadMethod {
            cb: (TouchpadEvent) => void;

            constructor(cb: (TouchpadEvent) => void) {
                this.cb = cb;
            }

            public destructor() {
            }
        };

        export class GamepadEvent extends Event {
            keyCode: number;

            constructor() {
                super();
            }

            public destructor() {
                super.destructor();
            }                

        };
        export class GamepadMethod {
            cb: (GamepadEvent) => void;

            constructor(cb: (GamepadEvent) => void) {
                this.cb = cb;
            }

            public destructor() {
            }                

        };

        export class AcceleratorEvent extends Event {
            acceleration: Vector3;

            constructor() {
                super();
            }

            public destructor() {
                super.destructor();
            }                

        };
        export class AcceleratorMethod {
            cb: (AcceleratorEvent) => void;

            constructor(cb: (AcceleratorEvent) => void) {
                this.cb = cb;
            }

            public destructor() {
            }                

        };

        export class MessageEvent extends Event {
            message: string;

            constructor() {
                super();
            }

            public destructor() {
                super.destructor();
            }                

        };
        export class MessageMethod {
            cb: (MessageEvent) => void;

            constructor(cb: (MessageEvent) => void) {
                this.cb = cb;
            }

            public destructor() {
            }
        };

        //////////////////////////////////////////////////////////////////////////////////////////////
        export class Manager {
            private static instance: Input.Manager = null;

            private touchpadMethods: Array<Input.TouchpadMethod>;
            private touchpadEvents: Array<Input.TouchpadEvent>;

            private gamepadMethods: Array<Input.GamepadMethod>;
            private gamepadEvents: Array<Input.GamepadEvent>;

            private acceleratorMethods: Array<Input.AcceleratorMethod>;
            private acceleratorEvents: Array<Input.AcceleratorEvent>;

            private messageMethods: Array<Input.MessageMethod>;
            private messageEvents: Array<Input.MessageEvent>;

            private constructor() {
                this.touchpadMethods = new Array<Input.TouchpadMethod>();
                this.touchpadEvents = new Array<Input.TouchpadEvent>();

                this.gamepadMethods = new Array<Input.GamepadMethod>();
                this.gamepadEvents = new Array<Input.GamepadEvent>();

                this.acceleratorMethods = new Array<Input.AcceleratorMethod>();
                this.acceleratorEvents = new Array<Input.AcceleratorEvent>();

                this.messageMethods = new Array<Input.MessageMethod>();
                this.messageEvents = new Array<Input.MessageEvent>();
            }

            private destructor() {
                this.messageEvents = null;
                this.messageMethods = null;

                this.acceleratorEvents = null;
                this.acceleratorMethods = null;

                this.gamepadEvents = null;
                this.gamepadMethods = null;

                this.touchpadEvents = null;
                this.touchpadMethods = null;
            }

            public static getInstance(): Input.Manager {
                if (Input.Manager.instance == null) {
                    Input.Manager.instance = new Input.Manager();
                }

                return Input.Manager.instance;
            }

            public addTouchpadMethod(cb: (TouchpadEvent) => void): TouchpadMethod {
                var touchpadMethod = new TouchpadMethod(cb);

                this.touchpadMethods.push(touchpadMethod);

                return touchpadMethod;
            }

            public removeTouchpadMethod(touchpadMethod: TouchpadMethod): void {
                var idx = this.touchpadMethods.indexOf(touchpadMethod);
                if (idx != -1)
                    this.touchpadMethods.splice(idx, 1);
            }

            public onTouchpadEvent(modifier: number, event: Input.EventType, fingerID: number, x: number, y: number): void {
                var touchpadEvent = new Input.TouchpadEvent();

                touchpadEvent.event = event;
                touchpadEvent.modifier = modifier;
                touchpadEvent.fingerID = fingerID;
                touchpadEvent.position = new Vector2([x, y]);

                touchpadEvent.wheelAxis = 0;
                touchpadEvent.wheelRotation = 0;

                this.touchpadEvents.push(touchpadEvent);
            }

            public onTouchpadScrollEvent(modifier: number, event: Input.EventType, x, y, axis, rotation): void {
                var touchpadEvent = new Input.TouchpadEvent();

                touchpadEvent.event = event;
                touchpadEvent.modifier = modifier;
                touchpadEvent.fingerID = 0;
                touchpadEvent.position = new Vector2([x, y]);

                touchpadEvent.wheelAxis = axis;
                touchpadEvent.wheelRotation = rotation;

                this.touchpadEvents.push(touchpadEvent);
            }

            public onGamePadEvent(modifier: number, event: Input.EventType, keyCode): void {
                var gamepadEvent = new Input.GamepadEvent();

                gamepadEvent.event = event;
                gamepadEvent.modifier = modifier;
                gamepadEvent.keyCode = keyCode;

                this.gamepadEvents.push(gamepadEvent);
            }

            public onAccelerationEvent(event: Input.EventType, x, y, z): void {
                var acceleratorEvent = new Input.AcceleratorEvent();

                acceleratorEvent.event = event;
                acceleratorEvent.acceleration = new Vector3([x, y, z]);

                this.acceleratorEvents.push(acceleratorEvent);
            }

            public onMessageEvent(modifier: number, event: Input.EventType, message: string) {
                var messageEvent = new Input.MessageEvent();

                messageEvent.event = event;
                messageEvent.modifier = modifier;
                messageEvent.message = message;

                this.messageEvents.push(messageEvent);
            }

            public initiate(): boolean {
                return true;
            }

            public update(): void {
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

            public pause(): void {
            }

            public resume(): void {
            }

            public terminate(): void {
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

        ///////////////////////////////////////////////////////////////
        export class Service {
            static Name(): string {
                return "Input";
            }

            static initiate(): boolean {
                return Input.Manager.getInstance().initiate();
            }

            static update(): void {
                Input.Manager.getInstance().update();
            }

            static pause(): void {
                Input.Manager.getInstance().pause();
            }

            static resume(): void {
                Input.Manager.getInstance().resume();
            }

            static terminate(): void {
                Input.Manager.getInstance().terminate();
            }
        };
    }
}