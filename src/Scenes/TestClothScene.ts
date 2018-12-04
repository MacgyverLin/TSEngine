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
    export class TestClothScene extends Scene {
        touchpadMethod: Input.TouchpadMethod;

        cameras: Array<GameObject>;
        sprites: Array<GameObject>;

        static Name() {
            return "TestCloth";
        }

        public constructor() {
            super();

            this.touchpadMethod = null;

            this.cameras = new Array<GameObject>();
            this.sprites = new Array<GameObject>();
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

            if(!this.addSprite("default/block0"))
                return false;

            return true;
        }

        protected onEnter(): void				//	called after all constructors
        {
        }

        protected onUpdate(): void				//	called after all constructors
        {
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

            for (var i = 0; i < this.sprites.length; i++)
                GameObject.Manager.getInstance().release(this.sprites[i]);

            GameObject.Manager.getInstance().clear();
            Input.Manager.getInstance().removeTouchpadMethod(this.touchpadMethod);
        }

        public addCamera(x: number, y: number, maxX: number, maxY: number): boolean {
            var idx = y * maxX + x;
            var cameraName = "camera" + idx;
            var camera = GameObject.Manager.getInstance().create(cameraName);
            this.cameras.push(camera);

            var cameraComponent = Component.Manager.getInstance().create(OrthoCamera, camera, camera.Name + "Component");
            cameraComponent.Width = Stage.getScreenWidth();
            cameraComponent.Height = Stage.getScreenHeight();
            cameraComponent.NearPlane = 0.1;
            cameraComponent.FarPlane = 1000;
            cameraComponent.GameObject.initLookAt(new Vector3([0, 0, 1]), Vector3.Zero, Vector3.UnitY);
            cameraComponent.ClearFlags = Camera.ClearFlag.Color | Camera.ClearFlag.Depth;
            cameraComponent.ClearColor = new Color4([0, 0, 0, 1]);
            cameraComponent.Viewport = new Rectangle([x / maxX, y / maxY, 1.0 / maxX, 1.0 / maxY]);

            return true;
        }

        public addSprite(textureName0): boolean {
            var spriteGO = GameObject.Manager.getInstance().create("Sprite" + 0)
            this.sprites.push(spriteGO);

            var spriteComp = Component.Manager.getInstance().create(Sprite, spriteGO, spriteGO.Name + "Sprite0");
            spriteComp.init(textureName0);

            var spriteRendererComp = Component.Manager.getInstance().create(Sprite.Renderer, spriteGO, spriteGO.Name + "Renderer0");
            spriteRendererComp.addSprite(spriteComp);

            spriteGO.setLocalPosition(new Vector3([256, 256, 0]));

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