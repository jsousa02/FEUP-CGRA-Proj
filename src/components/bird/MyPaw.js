import { CGFobject } from "../../../lib/CGF.js";
import { MyPawBack } from "./MyPawBack.js";
import { MyPawFront } from "./MyPawFront.js";

export class MyPaw extends CGFobject {
    constructor(scene) {
        super(scene);
        this.front = new MyPawFront(scene);
        this.back = new MyPawBack(scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.02, 0);
        this.front.display();
        this.back.display();
        this.scene.popMatrix();
    }
}