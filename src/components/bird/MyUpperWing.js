import { CGFobject } from "../../../lib/CGF.js";
import { MyQuad } from "../../components/MyQuad.js";

export class MyUpperWing extends CGFobject {

    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(scene);
    }

    display() {
        this.quad.display();
    }
}