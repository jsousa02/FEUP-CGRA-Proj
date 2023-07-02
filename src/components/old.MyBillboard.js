import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { toRadians } from "../../tp3/utils.js";
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

        // const cameraPos = this.scene.camera.position;
        // const directionVec = [this.x - cameraPos[0], this.z - cameraPos[2]];

        // const vec = vec3.fromValues(directionVec[0], 0, directionVec[1]);
        // const normalizedVec = vec3.create();
        // vec3.normalize(normalizedVec, vec);

        // const rotY = Math.atan2(-normalizedVec[0], -normalizedVec[1]);

        let square_normals = [0,0,1];
        let cameraPosition = [this.scene.camera.position[0], 0, this.scene.camera.position[2]];
        //this.viewVector = [this.cameraPos[0] - this.x,0,this.cameraPos[2] - this.z];
        let angle = Math.acos((vec3.dot(square_normals, cameraPosition))* (Math.PI/180));
        let axis = [0,0,1];
        vec3.cross(axis, square_normals, cameraPosition);


        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(angle, 0, axis[1], axis[2]);
        this.scene.scale(this.scale, this.scale, this.scale);
        // this.scene.rotate(rotY, 0, 1, 0);
        this.treeAppearance.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}