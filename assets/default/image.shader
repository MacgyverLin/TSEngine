{
    "vertexshader": [
        "attribute vec3 aPosition;",
        "attribute vec4 aColor;",
        "attribute vec2 aTexCoord0;",
        "uniform mat4 uPVMMatrix;",
        "uniform vec4 uColor;",
        "varying vec4 vColor;",
        "varying vec2 vTexCoord0;",
        "void main(void)",
        "{",
                    "gl_Position = uPVMMatrix * vec4(aPosition, 1.0);",
                    "vTexCoord0 = aTexCoord0;",
                    "vColor = uColor * aColor;",
        "}"
    ],

    "fragmentshader": [
        "precision mediump float;",
        "varying vec4 vColor;",
        "varying vec2 vTexCoord0;",
        "uniform sampler2D texture0;",
        "void main(void)",
        "{",
        "gl_FragColor = vColor * texture2D(texture0, vTexCoord0);",
        "}"
    ]
}