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

namespace Magnum {
    export class Test1Scene extends Scene {
        touchpadMethod: Input.TouchpadMethod;
        go: GameObject;
        component1: Component1;
        component2: Component2;
        testResource1_1: TestComponent1.Resource;
        testResource1_2: TestComponent1.Resource;
        testResource2_1: TestComponent2.Resource;
        testResource2_2: TestComponent2.Resource;

        cameras: Array<GameObject>;
        geometrys: Array<GameObject>;
        texture0s: Array<Texture2DFile>;
        texture1s: Array<Texture2DFile>;

        ang: number;

        static Name() {
            return "Test1";
        }

        public constructor() {
            super();

            this.touchpadMethod = null;
            this.go = null;
            this.component1 = null;
            this.component2 = null;
            this.testResource1_1 = null;
            this.testResource1_2 = null;
            this.testResource2_1 = null;
            this.testResource2_2 = null;

            this.cameras = new Array<GameObject>();
            this.geometrys = new Array<GameObject>();
            this.texture0s = new Array<Texture2DFile>();
            this.texture1s = new Array<Texture2DFile>();

            this.ang = 0;
        }

        public destructor() {
            super.destructor();
        }

        protected onConstruct(): boolean				//	called after all constructors
        {
            this.touchpadMethod = Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);
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

        protected onEnter(): void				//	called after all constructors
        {
        }

        protected onUpdate(): void				//	called after all constructors
        {
            this.ang++;
            for (var i = 0; i < this.geometrys.length; i++)
                this.geometrys[i].initTranslateRotZXYScale(0.0, 0.0, i * 3 / this.geometrys.length, this.ang + i * 360 / this.geometrys.length, 0, 0, 0.5);

            GameObject.Manager.getInstance().update();
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
            for (var i = 0; i < this.cameras.length; i++)
                GameObject.Manager.getInstance().release(this.cameras[i]);

            for (var i = 0; i < this.geometrys.length; i++)
                GameObject.Manager.getInstance().release(this.geometrys[i]);

            for (var i = 0; i < this.texture0s.length; i++)
                this.texture0s[i].destruct();

            for (var i = 0; i < this.texture1s.length; i++)
                this.texture1s[i].destruct();

            GameObject.Manager.getInstance().clear();
            Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }


        public addCamera(x: number, y: number, maxX: number, maxY: number): boolean {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);

            var cameraComponent = Component.Manager.getInstance().create(PerspectiveCamera, camera, camera.Name + "Component");
            cameraComponent.Fovy = 45;
            cameraComponent.Aspect = Stage.getScreenWidth() / Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 100;
            cameraComponent.GameObject.initLookAt(new Vector3([3, 3, 3]), new Vector3([0, 0, 0]), Vector3.UnitY);
            cameraComponent.ClearFlags = Camera.ClearFlag.Color | Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);

            return true;
        }

        public addGeometry(textureName0, textureName1): boolean {
            var idx = this.texture0s.length;
            var texture0 = new Texture2DFile(textureName0);
            this.texture0s.push(texture0);
            if (!texture0.construct())
                return false;

            var texture1 = new Texture2DFile(textureName1);
            this.texture1s.push(texture1);
            if (!texture1.construct())
                return false;

            var vertices = [
                -0.5, +0.5, 0.0,
                -0.5, -0.5, 0.0,
                +0.5, +0.5, 0.0,
                +0.5, -0.5, 0.0];
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
                1.0, 0.0];
            var texcoord1s = [
                0.0, 1.0,
                0.0, 0.0,
                1.0, 1.0,
                1.0, 0.0];

            var geometry = GameObject.Manager.getInstance().create("geometry" + idx)
            this.geometrys.push(geometry);

            var geometryRendererComponent = Component.Manager.getInstance().create(Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            var geometryComponent0 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "RendererComponent0");
            var geometryComponent1 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "RendererComponent1");
            var geometryComponent2 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "RendererComponent2");
            var geometryComponent3 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "RendererComponent3");

            geometryComponent0.init(RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices));
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);

            geometryComponent1.init(RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors));
            geometryComponent1.setTexture(0, texture0);
            geometryComponent1.setTexture(1, texture1);

            geometryComponent2.init(RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s));
            geometryComponent2.setTexture(0, texture0);
            geometryComponent2.setTexture(1, texture1);

            geometryComponent3.init(RenderContext.PrimitiveMode.TriangleStrip, new Float32Array(vertices), new Float32Array(colors), new Float32Array(texcoord0s), new Float32Array(texcoord0s));
            geometryComponent3.setTexture(0, texture0);
            geometryComponent3.setTexture(1, texture1);

            geometryRendererComponent.addGeometry(geometryComponent0, new Vector3([-2, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent1, new Vector3([-1, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent2, new Vector3([0, 0, 0]));
            geometryRendererComponent.addGeometry(geometryComponent3, new Vector3([1, 0, 0]));

            return true;
        }

        protected onTouchPad(event: Input.TouchpadEvent): void				//	called after all constructors
        {
            if (event.event == Input.EventType.MouseDown) {
                Console.debug("Test1Scene.onTouchPad:  call(Test2)");

                Scene.call("Test2");
            }
        }
    }
}