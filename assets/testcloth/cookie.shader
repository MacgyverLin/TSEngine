{
    "vertexshader": [
        "attribute vec3 aPosition;",
        "attribute vec4 aColor;",
        "attribute vec2 aTexCoord0;",
        "uniform mat4 uMMatrix;",
        "uniform mat4 uPVMMatrix;",
        "uniform mat4 uCookiePVMMatrix;",
        "uniform vec4 uColor;",
        "varying vec4 vColor;",
        "varying vec2 vTexCoord0;",
        "varying vec4 vTexCoord1;",
        "void main(void)",
        "{",
                    "vec4 worldpos = uMMatrix * vec4(aPosition, 1.0);",
                    "gl_Position = uPVMMatrix * vec4(aPosition, 1.0);",
                    "vTexCoord0 = aTexCoord0;",
                    "vTexCoord1 = uCookiePVMMatrix * vec4(worldpos.xyz, 1.0);",
                    "vColor = uColor * aColor;",
        "}"
    ],

    "fragmentshader": [
        "precision mediump float;",
        "varying vec4 vColor;",
        "varying vec2 vTexCoord0;",
        "varying vec4 vTexCoord1;",
        "uniform sampler2D texture0;",
        "uniform sampler2D texture1;",
        "void main(void)",
        "{",
        "vec4 cookie = texture2DProj(texture1, vTexCoord1);",
        "gl_FragColor = vColor * texture2D(texture0, vTexCoord0) + cookie * cookie.a;",
        "}"
    ]
}