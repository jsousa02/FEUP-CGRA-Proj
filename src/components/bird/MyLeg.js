import { CGFobject } from "../../../lib/CGF.js";
import { toRadians } from "../../utils/utils.js";
import { MyCilinder } from "../../components/MyCylinder.js";

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder = new MyCilinder(scene, 10, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.05, 0.5, 0.05);
        this.scene.rotate(toRadians(-90), 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}