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
    export class Audio {
        public constructor() {
        }

        public destructor() {
        }            
    }

    export namespace Audio {
        export class Listener
        {
            name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class Source
        {
            name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class ReverbZone
        {
            name : string;

            public constructor() {
            }

            public destructor() {
            }                

            get Name() {
                return this.name;
            }

            set Name(value) {
                this.name = value;
            }

            public update(): void {
            }

            public pause(): void {
            }

            public resume(): void {
            }
        }

        export class Manager {
            private static instance: Audio.Manager = null;
            private listeners : Array<Audio.Listener>;
            private sources : Array<Audio.Source>;
            private reverbZones : Array<Audio.ReverbZone>;

            private constructor() {
                this.listeners = new Array<Audio.Listener>();
                this.sources = new Array<Audio.Source>();
                this.reverbZones = new Array<Audio.ReverbZone>();                
            }

            public destructor() {
                this.listeners = null;
                this.sources = null;
                this.reverbZones = null;
            }            

            public static getInstance(): Audio.Manager {
                if (Audio.Manager.instance == null) {
                    Audio.Manager.instance = new Audio.Manager();
                }

                return Audio.Manager.instance;
            }

            public addListener(listener: Audio.Listener) {
                this.listeners.push(listener);
            }

            public removeListener(listener: Audio.Listener) {
                var idx = idx = this.listeners.indexOf(listener);
                if (idx != -1)
                    this.listeners.splice(idx, 1);
            }

            public findListener(name: string): Audio.Listener {
                for (const listener of this.listeners) {
                    if (listener.Name == name) {
                        return listener;
                    }
                }
                return null;
            }

            public addSource(source: Audio.Source) {
                this.sources.push(source);
            }

            public removeSource(source: Audio.Source) {
                var idx = idx = this.sources.indexOf(source);
                if (idx != -1)
                    this.sources.splice(idx, 1);
            }

            public findSource(name: string): Audio.Source {
                for (const source of this.sources) {
                    if (source.Name == name) {
                        return source;
                    }
                }
                return null;
            }

            public addReverbZone(reverbZone: Audio.ReverbZone) {
                this.reverbZones.push(reverbZone);
            }

            public removeReverbZone(reverbZone: Audio.ReverbZone) {
                var idx = idx = this.reverbZones.indexOf(reverbZone);
                if (idx != -1)
                    this.reverbZones.splice(idx, 1);
            }

            public findReverbZone(name: string): Audio.ReverbZone {
                for (const reverbZone of this.reverbZones) {
                    if (reverbZone.Name == name) {
                        return reverbZone;
                    }
                }
                return null;
            }

            ///////////////////////////////////////////////////////////////
            public initiate(): boolean {
                return true;
            }

            public update(): void {
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

            public pause(): void {
            }

            public resume(): void {
            }

            public terminate(): void {
            }
        }

        export class Service
        {
            static Name() : string
            {
                return "Audio";
            }

            static initiate(): boolean {
                return Audio.Manager.getInstance().initiate();
            }

            static update(): void {
                Audio.Manager.getInstance().update();
            }

            static pause(): void {
                Audio.Manager.getInstance().pause();
            }

            static resume(): void {
                Audio.Manager.getInstance().resume();
            }

            static terminate(): void {
                Audio.Manager.getInstance().terminate();
            }
        };
    }
}