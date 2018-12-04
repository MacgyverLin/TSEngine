namespace Magnum {
    export class FileIO {
        private filename: string;
        private blob: Blob;
        private xhr: XMLHttpRequest;

        public constructor() {
            this.filename = "";
            this.blob = null;
            this.xhr = null;
        }

        public destructor() {
        }            

        public isInformationStatus(): boolean {
            return this.xhr.status >= 100 && this.xhr.status <= 199;
        }

        public isSucceededStatus(): boolean {
            return this.xhr.status >= 200 && this.xhr.status <= 299;
        }

        public isRedirectionStatus(): boolean {
            return this.xhr.status >= 300 && this.xhr.status <= 399;
        }

        public isClientErrorStatus(): boolean {
            return this.xhr.status >= 400 && this.xhr.status <= 499;
        }

        public isServerErrorStatus(): boolean {
            return this.xhr.status >= 500 && this.xhr.status <= 599;
        }

        public isTimeout(): boolean {
            return this.xhr.status == 408;
        }

        public getReadyState(): number {
            return this.xhr.readyState;
        }

        public isUninitialized(): boolean {
            return this.xhr.readyState == FileIO.State.Uninitialized;
        }

        public isOpen(): boolean {
            return this.xhr.readyState == FileIO.State.Open;
        }

        public isSent(): boolean {
            return this.xhr.readyState == FileIO.State.Sent;
        }

        public isReceiving(): boolean {
            return this.xhr.readyState == FileIO.State.Receiving;
        }

        public isLoaded(): boolean {
            return this.xhr.readyState == FileIO.State.Loaded;
        }

        public getBlob(): Blob {
            return this.blob;
        }

        public open(filename, mode): boolean {
            this.filename = filename;
            this.blob = null;
            this.xhr = new XMLHttpRequest();

            return true;
        }

        public close() {
            this.filename = "";
            this.blob = null;

            if (this.xhr) {
                this.xhr.abort();
                this.xhr = null;
            }
        }

        public read() {
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
    };

    // inner class
    export namespace FileIO {
        export enum State {
            Uninitialized = 0,
            Open = 1,
            Sent = 2,
            Receiving = 3,
            Loaded = 4
        };
    };
};