import { CGFobject } from "../../lib/CGF.js";

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCilinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];

        let alpha = 2 * Math.PI / this.slices;

        for(let j = 0; j <= 1; j += 1 / this.stacks) {

            for(let i = 0; i < this.slices; i++) {
                this.vertices.push(Math.cos(i * alpha), Math.sin(i * alpha), j);
            }
        }

		//Counter-clockwise reference of vertices
		this.indices = [];

        for(let j = 0; j < this.stacks; j++) {
            for(let i = 0; i < this.slices; i++) {
                this.indices.push(
                    i + j * this.slices,
                    (i + 1 + j * this.slices) % (this.slices) + j * this.slices,
                    (i + (j + 1) * this.slices)
                );

                this.indices.push(
                    i + (j + 1) * this.slices,
                    (i + 1 + j * this.slices) % (this.slices) + j * this.slices,
                    (i + 1 + (j + 1) * this.slices) % (this.slices) + (j + 1) * this.slices
                );
            }
        }

        this.normals = [];

        for(let j = 0; j <= 1; j += 1 / this.stacks) {
            for(let i = 0; i < this.slices; i++) {
                this.normals.push(Math.cos(i * alpha), Math.sin(i * alpha), 0);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        //this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        //this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

