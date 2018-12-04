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
	export class InputCache {
		mouseDownCnt: number = 0;
		mouseDownID = [];
		mouseDownModifiers = [];
		mouseDownX = [];
		mouseDownY = [];

		mouseMoveCnt;
		mouseMoveID = [];
		mouseMoveModifiers = [];
		mouseMoveX = [];
		mouseMoveY = [];

		mouseUpCnt: number = 0;
		mouseUpID = [];
		mouseUpModifiers = [];
		mouseUpX = [];
		mouseUpY = [];

		wheelCnt: number = 0;
		wheelModifiers = [];
		wheelX = [];
		wheelY = [];
		wheelAxis = [];
		wheelRotation = [];

		hasAcc: boolean = false;
		accX: number;
		accY: number;
		accZ: number;

		keyDownCount: number = 0;
		keyDownModifiers = [];
		keyDownCodes = [];

		keyUpCount: number = 0;
		keyUpModifiers = [];
		keyUpCodes = [];

		messageCount: number = 0;
		messageModifiers = [];
		messages = [];

		MOUSE_EVENT_CNT = 64;
		KEY_EVENT_CNT = 64;
		MESSAGE_CNT = 512;

		constructor() {
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

        public destructor() {
        }		

		addMouseDown(modifier: number, fingerid: number, x: number, y: number): void {
			// assert(mouseDownCnt+1<MOUSE_EVENT_CNT);

			this.mouseDownModifiers[this.mouseDownCnt] = modifier;
			this.mouseDownID[this.mouseDownCnt] = fingerid;
			this.mouseDownX[this.mouseDownCnt] = x;
			this.mouseDownY[this.mouseDownCnt] = y;

			this.mouseDownCnt++;
		}

		addMouseMove(modifier: number, fingerid: number, x: number, y: number): void {
			// assert(mouseMoveCnt+1<MOUSE_EVENT_CNT);

			this.mouseMoveModifiers[this.mouseMoveCnt] = modifier;
			this.mouseMoveID[this.mouseMoveCnt] = fingerid;
			this.mouseMoveX[this.mouseMoveCnt] = x;
			this.mouseMoveY[this.mouseMoveCnt] = y;

			this.mouseMoveCnt++;
		}

		addMouseUp(modifier: number, fingerid: number, x: number, y: number): void {
			// assert(mouseUpCnt+1<MOUSE_EVENT_CNT);

			this.mouseUpModifiers[this.mouseMoveCnt] = modifier;
			this.mouseUpID[this.mouseUpCnt] = fingerid;
			this.mouseUpX[this.mouseUpCnt] = x;
			this.mouseUpY[this.mouseUpCnt] = y;

			this.mouseUpCnt++;
		}

		addWheelMotion(modifier: number, x: number, y: number, axis: number, rotation: number): void {
			// assert(wheelCnt+1<MOUSE_EVENT_CNT);

			this.wheelModifiers[this.wheelCnt] = modifier;
			this.wheelX[this.wheelCnt] = x;
			this.wheelY[this.wheelCnt] = y;
			this.wheelAxis[this.wheelCnt] = axis;
			this.wheelRotation[this.wheelCnt] = rotation;

			this.wheelCnt++;
		}

		setAcc(x: number, y: number, z: number): void {
			this.hasAcc = true;

			this.accX = x;
			this.accY = y;
			this.accZ = z;
		}

		addKeyDown(modifier: number, keyDownCode: number): void {
			// assert(keyDownCount+1<KEY_EVENT_CNT);

			this.keyDownModifiers[this.keyDownCount] = modifier;
			this.keyDownCodes[this.keyDownCount] = keyDownCode;

			this.keyDownCount++;
		}

		addKeyUp(modifier: number, keyUpCode: number): void {
			//assert(keyUpCount+1<KEY_EVENT_CNT);

			this.keyUpModifiers[this.keyUpCount] = modifier;
			this.keyUpCodes[this.keyUpCount] = keyUpCode;

			this.keyUpCount++;
		}

		addMessage(modifier: number, message: string): void {
			//assert(keyUpCount+1<KEY_EVENT_CNT);

			this.messageModifiers[this.messageCount] = modifier;
			this.messages[this.messageCount] = message;

			this.messageCount++;
		}

		addJoyPadKeyDown(keyDownCode: number): void {
		}

		addJoyPadKeyup(keyUpCode: number): void {
		}

		setJoyPadInfo(info: InputCache.JoypadInfo): void {
		}

		public static getModifier(shiftKey: boolean, altKey: boolean, ctrlKey: boolean) : number {
			var rval = 0;

			if (shiftKey)
				rval |= Input.Modifier.Shift;
			if (altKey)
				rval |= Input.Modifier.Alt;
			if (ctrlKey)
				rval |= Input.Modifier.Ctrl;

			return rval;
		}
	};

	export namespace InputCache {
		export class JoypadInfo {
			keys: number;
			x1: number;
			y1: number;
			x2: number;
			y2: number;
		};
	};
};