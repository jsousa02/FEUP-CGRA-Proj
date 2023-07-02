import { CGFobject } from "../../../lib/CGF.js";
import { toRadians } from "../../utils/utils.js";
import { MyTriangleSmall } from "../../components/MyTriangleSmall.js";

export class MyPawBack extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangleSmall(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 0);
        this.scene.rotate(toRadians(30), 0, 0, 1);
        this.scene.rotate(toRadians(-90), 0, 1, 0);
        this.scene.rotate(toRadians(90), 1, 0, 0);
        this.scene.scale(0.05, 0.15, 0.1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}