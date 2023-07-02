import { CGFobject } from "../../lib/CGF.js";

/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene, coords) {
        super(scene);
        this.initBuffers();
        if(coords != undefined)
            this.updateTexCoords(coords);
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,    // 0
            2, 0, 0,    // 1
            1, 1, 0,    // 2
            3, 1, 0     // 3
        ];

        this.indices = [
            0, 1, 2,
            1, 3, 2,
            2, 1, 0,
            2, 3, 1
        ];

        this.texCoords = [
            0.25, 0.75,
            0.75, 0.75,
            0.5, 1,
            1, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
