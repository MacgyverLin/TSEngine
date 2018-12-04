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
    export class Test3Scene extends Scene {
        touchpadMethod: Input.TouchpadMethod;

        cameras: Array<GameObject>;
        geometrys: Array<GameObject>;

        objectRotation: number;
        cookieRotation: number;
        lightTarget: Vector3;
        lightPosition: Vector3;
        lightFov: number;
        lightAnimT: number;

        static Name() {
            return "Test3";
        }

        public constructor() {
            super();

            this.touchpadMethod = null;

            this.cameras = new Array<GameObject>();
            this.geometrys = new Array<GameObject>();

            this.objectRotation = 0;
            this.cookieRotation = 0;
            this.lightTarget = new Vector3();
            this.lightPosition = new Vector3();
            this.lightFov = 0;
            this.lightAnimT = 0;
        }

        public destructor() {
            super.destructor();
        }

        protected onConstruct(): boolean				//	called after all constructors
        {
            this.touchpadMethod = Input.Manager.getInstance().addTouchpadMethod(this.onTouchPad);

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

        protected onEnter(): void				//	called after all constructors
        {
        }

        public updateGeometry0(): void {
            this.geometrys[0].initTranslate(0, -10, 0);
        }

        public updateGeometry1(): void {
            this.objectRotation += 45 * Stage.elpase();
            this.geometrys[1].initTranslateRotZXYScale(
                0.0, 0.0, 0.0,
                this.objectRotation / 2, 0.0, this.objectRotation,
                0.5);
        }

        public updateLight(): void {
            this.lightAnimT += Stage.elpase();
            this.cookieRotation = 0;
            this.lightTarget.X = 10 * Math.cos(this.lightAnimT / 10 * Math.PI * 2.0);
            this.lightTarget.Y = 0;
            this.lightTarget.Z = 10 * Math.sin(this.lightAnimT / 20 * Math.PI * 2.0);
            this.lightPosition = new Vector3([40, 40, 40]);
            this.lightFov = 30.0;

            for (var i = 0; i < this.geometrys.length; i++) {
                var geometry = this.geometrys[i].getComponentByName(this.geometrys[i].Name + "Component0") as Geometry;
                var shaderProgram = geometry.getShaderProgram();

                var matSpotLightShadow = new Matrix4();
                matSpotLightShadow.initPerspectiveFovShadow(
                    this.cookieRotation,
                    this.lightPosition, this.lightTarget, Vector3.UnitY,
                    this.lightFov, 1.0, 1.0, 1000);

                shaderProgram.setUniformMatrix4fv("uCookiePVMMatrix", matSpotLightShadow);
            }
        }

        protected onUpdate(): void				//	called after all constructors
        {
            this.updateLight();
            this.updateGeometry0();
            this.updateGeometry1();

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

            for (var i = 0; i < this.geometrys.length; i++) {
                GameObject.Manager.getInstance().release(this.geometrys[i]);
            }

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
            cameraComponent.FarPlane = 1000;
            cameraComponent.GameObject.initLookAt(new Vector3([40, 40, 40]), Vector3.Zero, Vector3.UnitY);
            cameraComponent.ClearFlags = Camera.ClearFlag.Color | Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);

            return true;
        }

        public addGeometry0(textureName0, textureName1, shaderName): boolean {
            var idx = this.geometrys.length;
            var texture0 = new Texture2DFile(textureName0);
            if (!texture0.construct())
                return false;

            var texture1 = new Texture2DFile(textureName1);
            if (!texture1.construct())
                return false;

            var shaderProgram = new ShaderProgram(shaderName);
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
                1.0, 0.0];

            var geometry = GameObject.Manager.getInstance().create("geometry" + idx)
            this.geometrys.push(geometry);

            var geometryComponent0 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "Component0");
            geometryComponent0.init(RenderContext.PrimitiveMode.TriangleStrip,
                new Float32Array(vertices),
                new Float32Array(colors),
                new Float32Array(texcoord0s));
            geometryComponent0.setShaderProgram(shaderProgram);
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);

            var geometryRendererComponent = Component.Manager.getInstance().create(Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            geometryRendererComponent.addGeometry(geometryComponent0, new Vector3([0, 0, 0]));

            return true;
        }

        public addGeometry1(textureName0, textureName1, shaderName): boolean {
            var idx = this.geometrys.length;
            var texture0 = new Texture2DFile(textureName0);
            if (!texture0.construct())
                return false;

            var texture1 = new Texture2DFile(textureName1);
            if (!texture1.construct())
                return false;

            var shaderProgram = new ShaderProgram(shaderName);
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


            var geometry = GameObject.Manager.getInstance().create("geometry" + idx)
            this.geometrys.push(geometry);

            var geometryComponent0 = Component.Manager.getInstance().create(Geometry, geometry, geometry.Name + "Component0");
            geometryComponent0.init(RenderContext.PrimitiveMode.Triangles,
                new Float32Array(vertices),
                new Float32Array(colors),
                new Float32Array(texcoord0s));
            geometryComponent0.setShaderProgram(shaderProgram);
            geometryComponent0.setTexture(0, texture0);
            geometryComponent0.setTexture(1, texture1);

            var geometryRendererComponent = Component.Manager.getInstance().create(Geometry.Renderer, geometry, geometry.Name + "RendererComponent");
            geometryRendererComponent.addGeometry(geometryComponent0, new Vector3([0, 0, 0]));

            return true;
        }

        protected onTouchPad(event: Input.TouchpadEvent): void				//	called after all constructors
        {
            if (event.event == Input.EventType.MouseDown) {
                Console.debug("Test3Scene.onTouchPad:  goto(Test4)");

                Scene.goto("Test4");
            }
        }
    }
}