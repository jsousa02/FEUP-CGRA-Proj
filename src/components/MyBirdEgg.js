import { CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyBirdEgg extends CGFobject {

    constructor(scene, texture, position = {x: 0, y: -98, z: 0}) {
        super(scene);
        this.texture = texture;
        this.egg = new MySphere(this.scene, 10, 10);
        this.position = position;
        this.initialPosition = null;
        this.finalPosition = null;
        this.acceleration = vec3.fromValues(0.0, -4.9, 0.0);
        this.initialVelocity = null;
        this.initMaterials();
    }

    initMaterials() {
        this.tex = new CGFtexture(this.scene, this.texture);

        this.egg.sphereAppearance.setTexture(this.tex);
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }

    setInitialVelocity(v) {
        this.initialVelocity = v;
    }

    getInitialVelocity() {
        return this.initialVelocity;
    }

    setInitialPosition(p) {
        this.initialPosition = p;
    }

    getInitialPosition() {
        return this.initialPosition;
    }

    getAcceleration() {
        return this.acceleration;
    }

    setFinalPosition(p) {
        this.finalPosition = p;
    }

    getFinalPosition() {
        return this.finalPosition;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(1, 1.2, 1);
        this.egg.display();
        this.scene.popMatrix();
    }
}