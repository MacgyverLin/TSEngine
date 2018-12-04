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
    export class Stage {
        static initialScene : string;
        static rawAssetRootDirectory : string;
        static assetRootDirectory : string;
        static documentDirectory : string;
        static externalDirectory : string;
        static currentTimeMSFunc;
        static consoleVerboseFunc;
        static consoleDebugFunc;
        static consoleInfoFunc;
        static consoleWarningFunc;
        static consoleErrorFunc;
        static consoleAssertFunc;
        static width : number;
        static height : number;
        static currentTime : number;
        static deltaTime : number;
        static lasterror : string;
        static isEditorMode : boolean = false;

        public constructor() {
        }

        public destructor() {
        }            

        public static setRawAssetRootDirectory(rawAssetRootDirectory_: string): void {
            Stage.rawAssetRootDirectory = rawAssetRootDirectory_;
        }

        public static getRawAssetRootDirectory(): string {
            return Stage.rawAssetRootDirectory;
        }                         

        public static setAssetRootDirectory(assetRootDirectory_: string): void {
            Stage.assetRootDirectory = assetRootDirectory_;
        }

        public static getAssetRootDirectory(): string {
            return Stage.assetRootDirectory;
        }                        

        public static setDocumentDirectory(documentDirectory_: string): void {
            Stage.documentDirectory = documentDirectory_;
        }

        public static getDocumentDirectory(): string {
            return Stage.documentDirectory;
        }                

        public static setExternalDirectory(externalDirectory_: string): void {
            Stage.externalDirectory = externalDirectory_;
        }

        public static getExternalDirectory(): string {
            return Stage.externalDirectory;
        }        

        public static setInitialScene(initialScene_: string): void {
            Stage.initialScene = initialScene_;
        }

        public static getInitialScene(): string {
            return Stage.initialScene;
        }        

        public static setGetCurrentTimeMSFunc(currentTimeMSFunc_): void {
            Stage.currentTimeMSFunc = currentTimeMSFunc_;
        }

        public static setConsoleMessageFunc(consoleVerboseFunc_, consoleDebugFunc_, consoleInfoFunc_, 
                                            consoleWarningFunc_, consoleErrorFunc_, consoleAssertFunc_): void {
            Stage.consoleVerboseFunc = consoleVerboseFunc_;
            Stage.consoleDebugFunc = consoleDebugFunc_;
            Stage.consoleInfoFunc = consoleInfoFunc_;
            Stage.consoleWarningFunc = consoleWarningFunc_;
            Stage.consoleErrorFunc = consoleErrorFunc_;
            Stage.consoleAssertFunc = consoleAssertFunc_;
        }

        public static setScreenSize(width_: number, height_: number): void {
            Stage.width = width_;
            Stage.height = height_;
        }

        public static getScreenWidth(): number {
            return Stage.width;
        }        

        public static getScreenHeight(): number {
            return Stage.height;
        }                

        public static setStartTime(): void {
            Stage.currentTime = Stage.currentTimeMSFunc();
        }

        /////////////////////////////////////////////////////////////////////
        public static step() : void {
            var time = Stage.currentTimeMSFunc();

            Stage.deltaTime = time - Stage.currentTime;

            Stage.currentTime = time;
        }

        public static elpase() : number {
            return Stage.deltaTime;
        }

        public static lastError(lasterror : string) 
        {
            Stage.lasterror = lasterror;
        }
    }
}