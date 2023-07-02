import {CGFobject, CGFappearance, CGFtexture} from "../../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param  {integer} slices - number of slices around Y axis
 * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, invert = false) {
		super(scene);

        this.latDivs = slices * 2
        this.longDivs = stacks
        this.invert = invert;

        this.sphereAppearance = new CGFappearance(scene);
        this.sphereAppearance.setAmbient(0, 0, 0, 1);
        this.sphereAppearance.setDiffuse(0, 0, 0, 1);
        this.sphereAppearance.setSpecular(0, 0, 0, 1);
        this.sphereAppearance.setEmission(1, 1, 1, 1);

        var texture = new CGFtexture(scene, "images/earth.jpg");

        this.sphereAppearance.setTexture(texture);

		this.initBuffers();
	}
	
	initBuffers() {
            this.vertices = [];
            this.indices = [];
            this.normals = [];
            this.texCoords = [];

            var phi = 0;
            var theta = 0;
            var phiInc = Math.PI / this.latDivs;
            var thetaInc = (2 * Math.PI) / this.longDivs;
            var latVertices = this.longDivs + 1;

            for (let latitude = 0; latitude <= this.latDivs; ++latitude) {
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                theta = 0;
                for (let longitude = 0; longitude <= this.longDivs; ++longitude) {
                    //--- Vertex coordinates
                    var x = Math.cos(theta) * sinPhi;
                    var y = cosPhi;
                    var z = Math.sin(-theta) * sinPhi;
                    this.vertices.push(x, y, z);

                    //--- Indexes
                    if (latitude < this.latDivs && longitude < this.longDivs) {
                        var current = latitude * latVertices + longitude;
                        var next = current + latVertices;

                        if (this.invert) {
                            this.indices.push(current, current + 1, next);
                            this.indices.push(next, current + 1, next + 1);
                        } else {
                            this.indices.push(current + 1, current, next);
                            this.indices.push(current + 1, next, next + 1);
                        }
                    }

                //--- Normals
                if (this.invert)
                    this.normals.push(-x, -y, -z);
                else
                    this.normals.push(x, y, z);

                theta += thetaInc;

                this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs)
            }

            phi += phiInc;
        }

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();     
	}

	setFillMode() { 
		this.primitiveType=this.scene.gl.TRIANGLE_STRIP;
	}

	setLineMode() { 
		this.primitiveType=this.scene.gl.LINES;
	};

    display() {
        this.sphereAppearance.apply();
        super.display();
    }
}