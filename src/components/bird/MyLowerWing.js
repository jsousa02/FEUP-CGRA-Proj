import { CGFobject } from "../../../lib/CGF.js";
import { MyTriangle } from "../../components/MyTriangle.js";

export class MyLowerWing extends CGFobject {

    constructor(scene) {
        super(scene);
        this.triangle = new MyTriangle(scene);
    }

    display() {
        this.triangle.display();
    }
}