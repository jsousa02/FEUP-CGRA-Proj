import { CGFobject } from "../../lib/CGF.js";
import { toRadians } from "../utils/utils.js";
import { MyPlane } from "./MyPlane.js";

export class MyNest extends CGFobject {

    constructor(scene, position = {x: 0, z: 0}) {
        super(scene);
        this.position = position;
        this.plane = new MyPlane(scene, 10);
        this.eggPlaces = [
            {x: position.x - 2, z: position.z + 2, occupied: false},
            {x: position.x + 2, z: position.z + 3, occupied: false},
            {x: position.x - 5, z: position.z - 2, occupied: false},
            {x: position.x + 3, z: position.z - 3, occupied: false}
        ];
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }

    getEggPlaces() {
        return this.eggPlaces;
    }

    markPlaceAsOccupied(place) {
        let p = this.eggPlaces.find(p => p.x === place.x && p.z === place.z)
        p.occupied = true;
    }

    getAvailablePlace() {
        return this.eggPlaces.find(place => place.occupied === false);
    }

    display() {
        this.scene.rotate(toRadians(-90), 1, 0, 0);
        this.scene.scale(15, 15, 15);
        this.plane.display();
    }
}