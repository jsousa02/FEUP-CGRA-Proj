import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../MySphere.js";

export class MyHead extends CGFobject {
    constructor(scene, sphereAppearance) {
        super(scene);
        this.sphere = new MySphere(scene, 10, 10);
        this.sphereAppearance = sphereAppearance;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, 1, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.sphere.sphereAppearance = this.sphereAppearance;
        this.sphere.display();
        this.scene.popMatrix();
    }
}