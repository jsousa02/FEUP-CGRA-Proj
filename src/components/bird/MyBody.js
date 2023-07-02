import { CGFobject } from "../../../lib/CGF.js";
import { MySphere } from "../MySphere.js";


export class MyBody extends CGFobject {
    constructor(scene, sphereAppearance) {
        super(scene);
        this.sphere = new MySphere(scene, 10, 10);
        this.sphereAppearance = sphereAppearance
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.61, 0.61, 0.61);
        this.sphere.sphereAppearance = this.sphereAppearance;
        this.sphere.display();
        this.scene.popMatrix();
    }
}