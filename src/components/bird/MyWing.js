import { CGFobject } from "../../../lib/CGF.js";
import { MyUpperWing } from "./MyUpperWing.js";
import { MyLowerWing } from "./MyLowerWing.js";
import { toRadians } from "../../utils/utils.js";

export class MyWing extends CGFobject {
    constructor(scene) {
        super(scene);
        this.lowerWing = new MyLowerWing(scene);
        this.upperWing = new MyUpperWing(scene);
        this.position = 0;
        this.velocity = 0;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(toRadians(this.position), 1, 0, 0);
        this.scene.translate(0, 0, -0.38);
        this.scene.rotate(toRadians(-130), 1, 0, 0);
        this.scene.scale(0.25, 0.25, 0.25);
        this.lowerWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-toRadians(this.position), 1, 0, 0);
        this.scene.scale(0.5, 0.5, 0.5);
        this.scene.rotate(toRadians(-50), 1, 0, 0);
        this.upperWing.display();
        this.scene.popMatrix();
    }

    setPosition(t) {
        this.position += Math.sin(2 * Math.PI * t + this.velocity);
    }

    accelerate(v) {
        this.velocity += v;
        if(this.velocity < 0)
            this.velocity = 0;
    }
}
