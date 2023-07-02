import {CGFobject} from "../../lib/CGF.js";
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture, position) {
        super(scene);

        this.texture = texture;
        this.position = position;

        this.initBuffers();
    }
    
    initBuffers() {
        this.sphere = new MySphere(this.scene, 36, 18, true);
        this.sphere.sphereAppearance.setTexture(this.texture);
    }

    update(pos) {
        this.position = pos;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.scale(200, 200, 200);
        this.scene.appearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }
}