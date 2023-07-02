import { CGFobject } from "../../../lib/CGF.js";
import { toRadians } from "../../utils/utils.js";
import { MyCone } from "../MyCone.js";

export class MyBeak extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cone = new MyCone(scene, 10, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.2, 0.125, 0.125);
        this.scene.translate(5, 8, 0);
        this.scene.rotate(toRadians(-90), 0, 0, 1);
        this.cone.display();
        this.scene.popMatrix();
    }
}