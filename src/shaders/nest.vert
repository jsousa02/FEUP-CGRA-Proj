attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float normScale;

varying vec2 vTextureCoord;

void main() {
	vec4 vertex = vec4(aVertexPosition + aVertexNormal * 0.1, 1.0);
	vec4 map = texture2D(uSampler2, aTextureCoord);
	vec3 offset = aVertexNormal * map.r * 0.2;
	
	vTextureCoord = aTextureCoord;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

