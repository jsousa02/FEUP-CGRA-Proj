import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
// import { vec3 } from '../../lib/CGF/resources/utils/matrix.js';
import { MyQuad } from "../../tp4/MyQuad.js";

export class MyBillboard extends CGFobject {

    constructor(scene, texture = "textures/billboardtree.png", position = {x: 0, y: -98, z: 0}, scale = 1) {
        super(scene);
        this.quad = new MyQuad(scene);
        this.texture = texture;
        this.position = position;
        this.scale = scale;
        this.initMaterials();
    }

    initMaterials() {
        this.treeTex = new CGFtexture(this.scene, this.texture);
        this.treeAppearance = new CGFappearance(this.scene);
        this.treeAppearance.setTexture(this.treeTex);
    }

    display() {
        const billboardPosition = vec3.fromValues(this.position.x, this.position.y, this.position.z);
        const cameraPosition = vec3.fromValues(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);

        let viewVector = vec3.create();
        vec3.subtract(viewVector, cameraPosition, billboardPosition);
        viewVector[1] = 0;  // Ignore the vertical component
        vec3.normalize(viewVector, viewVector);

        const billboardNormal = vec3.fromValues(0, 0, 1);
        const angle = Math.acos(vec3.dot(billboardNormal, viewVector));

        let rotationAxis = vec3.create();
        vec3.cross(rotationAxis, billboardNormal, viewVector);

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(angle, rotationAxis[0], rotationAxis[1], rotationAxis[2]);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.treeAppearance.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
