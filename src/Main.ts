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

namespace Magnum {
    ///////////////////////////////////////////////////////////////////////////////////
    // Engine Globals
    var serviceManager = Service.Manager.getInstance();
    var resourceAccessManager = ResourceAccess.Manager.getInstance();
    var sceneManager = Scene.Manager.getInstance();
    var inputManager = Input.Manager.getInstance()
    var physics2Manager = Physics2.Manager.getInstance();
    var physics3Manager = Physics3.Manager.getInstance();
    var videoManager = Video.Manager.getInstance();
    var audioManager = Audio.Manager.getInstance();
    var gameObjectManager = GameObject.Manager.getInstance();
    var componentManager = Component.Manager.getInstance();

    var inputCache = new InputCache();
    var engine: Engine = null;

    ///////////////////////////////////////////////////////////////////////////////////
    // Services
    Service.Manager.getInstance().register(Scene.Service);
    Service.Manager.getInstance().register(ResourceAccess.Service);
    Service.Manager.getInstance().register(Input.Service);
    Service.Manager.getInstance().register(Physics3.Service);
    Service.Manager.getInstance().register(Physics2.Service);
    Service.Manager.getInstance().register(Video.Service);
    Service.Manager.getInstance().register(Audio.Service);

    ///////////////////////////////////////////////////////////////////////////////////
    // ResourcesImporter Creator

    ///////////////////////////////////////////////////////////////////////////////////
    // Resources Creator
    ResourceAccess.Manager.getInstance().register(TestComponent1.Resource);
    ResourceAccess.Manager.getInstance().register(TestComponent2.Resource);
    ResourceAccess.Manager.getInstance().register(Texture2DFile.Resource);
    ResourceAccess.Manager.getInstance().register(TextureCubeFile.Resource);
    ResourceAccess.Manager.getInstance().register(ShaderProgram.Resource);

    ///////////////////////////////////////////////////////////////////////////////////
    // Scene Creators
    Scene.Manager.getInstance().register(Test1Scene);
    Scene.Manager.getInstance().register(Test2Scene);
    Scene.Manager.getInstance().register(Test3Scene);
    Scene.Manager.getInstance().register(Test4Scene);
    Scene.Manager.getInstance().register(TestClothScene);

    ///////////////////////////////////////////////////////////////////////////////////
    // GameObject Creators
    GameObject.Manager.getInstance().register(GameObject);

    ///////////////////////////////////////////////////////////////////////////////////
    // Component Creators  
    Component.Manager.getInstance().register(Component1);
    Component.Manager.getInstance().register(Component2);
    Component.Manager.getInstance().register(TestComponent1);
    Component.Manager.getInstance().register(TestComponent2);
    Component.Manager.getInstance().register(Test.Renderer);
    Component.Manager.getInstance().register(PerspectiveCamera);
    Component.Manager.getInstance().register(OrthoCamera);
    Component.Manager.getInstance().register(Geometry);
    Component.Manager.getInstance().register(Geometry.Renderer);
    Component.Manager.getInstance().register(Sprite);
    Component.Manager.getInstance().register(Sprite.Renderer);

    ///////////////////////////////////////////////////////////////////////////////////
    function initialize(width: number, height: number): boolean {
        engine = new Engine();

        engine.setRawAssetRootDirectory("rawassets/");
        engine.setAssetRootDirectory("assets/");
        engine.setDocumentDirectory("documents/");
        engine.setExternalDirectory("externals/");
        //engine.setInitialScene("Test3");
        engine.setInitialScene("TestCloth");
        engine.setGetCurrentTimeMSFunc(function () 
        { 
            return new Date().getTime() / 1000;
        });
        engine.setConsoleMessageFunc(
            function (msg: string) {
                console.log("Verbose: " + msg);
            },
            function (msg: string) {
                console.log("Debug  : " + msg);
            },
            function (msg: string) {
                console.log("Info   : " + msg);
            },
            function (msg: string) {
                console.log("Warning: " + msg);
            },
            function (msg: string) {
                alert("Error  : " + msg);
            },
            function (msg: string) {
                alert("Assert : " + msg);
            });

        return engine.onInitialize(width, height);
    }

    function update(): void {
        requestAnimationFrame(update);

        engine.onInputCache(inputCache);
        engine.onUpdate();
    }

    function terminate(): void {
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
    }

    document.body.onresize = function () {
        var c = document.getElementById("glCanvas");
        var b = document.body;

        c.setAttribute("width", b.clientWidth.toString());
        c.setAttribute("height", b.clientHeight.toString());
        
        console.log("Resize!!!! canvas:(" + c.clientWidth + " ," + c.clientHeight + ")", "body:(" + b.clientWidth + " ," + b.clientHeight + ")");
    }    

    document.body.onclose = function () {
        terminate();
    }

    document.onmousedown = function (event: MouseEvent) {
        inputCache.addMouseDown(InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    }

    document.onmouseup = function (event: MouseEvent) {
        inputCache.addMouseUp(InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    }

    document.onmousemove = function (event: MouseEvent) {
        inputCache.addMouseMove(InputCache.getModifier(event.shiftKey, event.altKey, event.ctrlKey), event.button, event.clientX, event.clientY);
    }
}



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