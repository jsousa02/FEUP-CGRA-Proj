import { CGFobject } from "../../../lib/CGF.js";
import { MyParallelogram } from "../../components/MyParallelogram.js";
import { toRadians } from "../../utils/utils.js";

export class MyTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.parallelogram = new MyParallelogram(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.33, 0.33, 0.33);
        this.scene.rotate(toRadians(-90), 1, 0, 0);
        this.scene.translate(-4.5, -1, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}