import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../MySphere.js";


export class MyEye extends CGFobject {
    constructor(scene, sphereAppearance) {
        super(scene);
        this.sphere = new MySphere(scene, 10, 10);
        this.sphereAppearance = sphereAppearance;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.sphere.sphereAppearance = this.sphereAppearance;
        this.sphere.display();
        this.scene.popMatrix();
    }
}