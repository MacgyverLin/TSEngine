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
namespace Magnum {
    export class Video {
        public constructor() {
        }

        public destructor() {
        }            
    }

    export namespace Video {
        export class RenderParam {
            public camera: Camera;
            public viewTransform: Matrix4;
            public projTransform: Matrix4;
            public projViewTransform: Matrix4;
            public viewTransformInverse: Matrix4;
            public projTransformInverse: Matrix4;
            public projViewTransformInverse: Matrix4;

            constructor(camera: Camera) {
                this.camera                     = camera;

                this.viewTransform				= camera.GameObject.getGlobalTransformInverse();
                this.projTransform				= camera.getProjectionTransform();
                this.projViewTransform			= Matrix4.mul(this.projTransform, this.viewTransform);
                this.viewTransformInverse		= this.viewTransform.inverse();
                this.projTransformInverse		= this.projTransform.inverse();
                this.projViewTransformInverse	= this.projViewTransform.inverse();
            }

            public destructor() {
            }                
        };

        export class Manager {
            private static instance: Video.Manager = null;
            private cameras : Array<Camera>;
            private renderers : Array<Renderer>;

            private constructor() {
                this.cameras = new Array<Camera>();
                this.renderers = new Array<Renderer>();     
            }

            public destructor() {
                this.cameras = null;
                this.renderers = null;
            }

            public static getInstance(): Video.Manager {
                if (Video.Manager.instance == null) {
                    Video.Manager.instance = new Video.Manager();
                }
                return Video.Manager.instance;
            }

            public addCamera(camera: Camera) {
                this.cameras.push(camera);
            }

            public removeCamera(camera: Camera) {
                var idx = idx = this.cameras.indexOf(camera);
                if (idx != -1)
                    this.cameras.splice(idx, 1);
            }

            public findCamera(name: string): Camera {
                for (const camera of this.cameras) {
                    if (camera.Name == name) {
                        return camera;
                    }
                }
                return null;
            }

            public addRenderer(render: Renderer) {
                this.renderers.push(render);
            }

            public removeRenderer(renderer: Renderer) {
                var idx = idx = this.renderers.indexOf(renderer);
                if (idx != -1)
                    this.renderers.splice(idx, 1);
            }

            public findRenderers(name: string): Camera {
                for (const camera of this.cameras) {
                    if (camera.Name == name) {
                        return camera;
                    }
                }
                return null;
            }

            public initiate(): boolean {
                if(!RenderContext.initiate(Stage.getScreenWidth(), Stage.getScreenHeight() ))
                    return false;

                return true;
            }

            public update(): void {
                var sortedCameras = this.cameras.sort(function (a: Camera, b: Camera): number {
                    return a.getOrder() - b.getOrder();
                });

                //this.renderEditorCameras(sortedCameras);
                this.renderGameCameras(sortedCameras);

                RenderContext.flush();
                RenderContext.finish();
            }

            renderEditorCameras(cameras: Array<Camera>): void {
                var sortedRenderers = this.renderers.sort(function (a: Renderer, b: Renderer): number {
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

            renderGameCameras(cameras: Array<Camera>): void {
                var offsety = 0;
                var sortedRenderers = this.renderers.sort(function (a: Renderer, b: Renderer): number {
                    return a.getOrder() - b.getOrder();
                });

                for (var i = 0; i < cameras.length; i++) {
                    var camera = cameras[i];

                    if (camera.Active/* && !camera.isEditorModeActive()*/) {
                        var param = new Video.RenderParam(camera);

                        if (Stage.isEditorMode)
                            this.beginRender(camera, 0.8, offsety, 0.2, 0.2);
                        else
                            this.beginRender(camera, 0.0, 0.0, 1.0, 1.0);

                        for (var j = 0; j < sortedRenderers.length; j++) {
                            var renderer = sortedRenderers[j];

                            if (renderer.Active)
                            {
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

                        if (Stage.isEditorMode)
                            this.renderViewportBoundary(camera);

                        offsety += 0.2;

                        this.endRender(camera);
                    }
                }
            }

            beginRender(camera: Camera, offsetX: number, offsetY: number, scaleX: number, scaleY: number): void {
                //if(renderTargetTexture)
                //renderTargetTexture->beginRender();

                if (camera.ClearFlags == Camera.ClearFlag.None)
                    return;
                else if (camera.ClearFlags == Camera.ClearFlag.SkyBox) {
                    // do sky box
                    return;
                }
                else {
                    var mask = 0;
                    if (camera.ClearFlags & Camera.ClearFlag.Color) {
                        var clearColor = camera.ClearColor;
                        RenderContext.clearColor(clearColor.R, clearColor.G, clearColor.B, clearColor.A);

                        mask = mask | RenderContext.ClearFlags.ColorBuffer;
                    }
                    if (camera.ClearFlags & Camera.ClearFlag.Depth) {
                        var clearDepth = camera.ClearDepth;
                        RenderContext.clearDepth(clearDepth);

                        mask = mask | RenderContext.ClearFlags.DepthBuffer;
                    }
                    if (camera.ClearFlags & Camera.ClearFlag.Stecil) {
                        var clearStencil = camera.ClearStencil;
                        RenderContext.clearStencil(clearStencil)

                        mask = mask | RenderContext.ClearFlags.StencilBuffer;
                    }

                    if (Stage.isEditorMode) {
                        var viewport = camera.Viewport;

                        var viewportX = (viewport.X * scaleX + offsetX) * Stage.getScreenWidth();
                        var viewportY = (viewport.Y * scaleY + offsetY) * Stage.getScreenHeight();
                        var viewportWidth = (viewport.Width * scaleX) * Stage.getScreenWidth();
                        var viewportHeight = (viewport.Height * scaleY) * Stage.getScreenHeight();

                        var previewClipX = (0 * scaleX + offsetX) * Stage.getScreenWidth();
                        var previewClipY = (0 * scaleY + offsetY) * Stage.getScreenHeight();
                        var previewClipWidth = (1 * scaleX) * Stage.getScreenWidth();
                        var previewClipHeight = (1 * scaleY) * Stage.getScreenHeight();

                        RenderContext.viewport(previewClipX, previewClipY, previewClipWidth, previewClipHeight);
                        RenderContext.enable(RenderContext.EnableFlags.ScissorTest);
                        RenderContext.scissor(previewClipX, previewClipY, previewClipWidth, previewClipHeight);
                        RenderContext.clear(mask)
                    }
                    else 
                    {
                        var viewport = camera.Viewport;

                        var viewportX = (viewport.X * scaleX + offsetX) * Stage.getScreenWidth();
                        var viewportY = (viewport.Y * scaleY + offsetY) * Stage.getScreenHeight();
                        var viewportWidth = (viewport.Width * scaleX) * Stage.getScreenWidth();
                        var viewportHeight = (viewport.Height * scaleY) * Stage.getScreenHeight();

                        RenderContext.viewport(viewportX, viewportY, viewportWidth, viewportHeight);
                        RenderContext.enable(RenderContext.EnableFlags.ScissorTest);
                        RenderContext.scissor(viewportX, viewportY, viewportWidth, viewportHeight);
                        RenderContext.clear(mask)
                    }
                }
            }

            renderViewportBoundary(camera: Camera): void {
                var projMat = new Matrix4();
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

            endRender(camera: Camera): void {
                RenderContext.flush();

                //if(renderTargetTexture)
                //renderTargetTexture->endRender();
            }

            public pause(): void {
            }

            public resume(): void {
            }

            public terminate(): void {
            }
        }

        export class Service {
            static Name() : string
            {
                return "Video";
            }

            static initiate(): boolean {
                return Video.Manager.getInstance().initiate();
            }

            static update(): void {
                Video.Manager.getInstance().update();
            }

            static pause(): void {
                Video.Manager.getInstance().pause();
            }

            static resume(): void {
                Video.Manager.getInstance().resume();
            }

            static terminate(): void {
                Video.Manager.getInstance().terminate();
            }
        };
    }
}