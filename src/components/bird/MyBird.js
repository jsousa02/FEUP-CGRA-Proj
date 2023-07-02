import { CGFappearance, CGFobject } from "../../../lib/CGF.js";
import { MyWing } from "./MyWing.js";
import { MyEye } from "./MyEye.js";
import { MyBeak } from "./MyBeak.js";
import { MyTail } from "./MyTail.js";
import { MyBody } from "./MyBody.js";
import { MyHead } from "./MyHead.js";
import { toRadians } from "../../utils/utils.js";
import { MyLeg } from "./MyLeg.js";
import { MyPaw } from "./MyPaw.js";

export class MyBird extends CGFobject {

    constructor(scene, orientation = 0, position = {x: 0, y: 0, z: 0}, velocity = 0) {
        super(scene);
        this.initMaterials(scene);
        this.leftWing = new MyWing(scene);
        this.rightWing = new MyWing(scene);
        this.leftEye = new MyEye(scene, this.black);
        this.rightEye = new MyEye(scene, this.black);
        this.beak = new MyBeak(scene);
        this.tail = new MyTail(scene);
        this.body = new MyBody(scene, this.blue);
        this.head = new MyHead(scene, this.blue);
        this.leftLeg = new MyLeg(scene);
        this.rightLeg = new MyLeg(scene);
        this.leftPaw = new MyPaw(scene);
        this.rightPaw = new MyPaw(scene);
        this.position = position;
        this.orientation = orientation;
        this.turnAngle = 0;
        this.velocity = velocity;
        this.wingsPosition = 0;
        this.legPosition = 0;
        this.wingsUp = true;
        this.turningLeft = null;
        this.sf = 1;
        this.isDescending = false;
        this.egg = null;
    }

    initMaterials(scene) {
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.11, 0.61, 0.94, 1.0);
        this.blue.setDiffuse(0.11, 0.61, 0.94, 1.0);
        this.blue.setSpecular(0.11, 0.61, 0.94, 1.0);
        this.blue.setShininess(10.0);

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1.0, 0.82, 0, 1.0);
        this.yellow.setDiffuse(1.0, 0.82, 0, 1.0);
        this.yellow.setSpecular(1.0, 0.82, 0, 1.0);
        this.yellow.setShininess(10.0);

        this.black = new CGFappearance(scene);
        this.black.setAmbient(0, 0, 0, 1.0);
        this.black.setDiffuse(0, 0, 0, 1.0);
        this.black.setSpecular(0, 0, 0, 1.0);
        this.black.setShininess(10.0);
    }

    setWingPosition(sf) {
        if(this.wingsPosition >= 30)
            this.wingsUp = false;
        else if (this.wingsPosition <= -30)
            this.wingsUp = true;

        if(this.wingsUp)
            this.wingsPosition += 5 + this.velocity + sf;
        else
            this.wingsPosition -= 5 + this.velocity + sf;
    }

    setPosition(p) {
        this.position = p;
    }

    getPosition() {
        return this.position;
    }

    setOrientation(o) {
        this.orientation = o;
    }

    getOrientation() {
        return this.orientation;
    }

    turn(v) {
        this.orientation += v;
    }

    sideTurn(angle, left = true) {
        this.turnAngle += angle;
        if(left) {
            this.turningLeft = true;
            if(this.turnAngle <= -30)
                this.turnAngle = -30;
            if(this.turnAngle >= 0)
                this.turnAngle = 0;
        } else {
            this.turningLeft = false;
            if(this.turnAngle >= 30)
                this.turnAngle = 30;
            if(this.turnAngle <= 0)
                this.turnAngle = 0;
        }
    }

    setTurnAngle(a) {
        this.turnAngle = a;
    }

    accelerate(v) {
        this.velocity += v;
        if(this.velocity >= 1)
            this.velocity = 1;
        if(this.velocity < 0)
            this.velocity = 0;
        this.setLegPosition(v);
    }

    setVelocity(v) {
        this.velocity = v;
    }

    getVelocity() {
        return this.velocity;
    }

    setLegPosition(v) {
        this.legPosition += v * 20;
        if(this.legPosition <= 0)
            this.legPosition = 0;
        else if (this.legPosition >= 40)
            this.legPosition = 40;
    }

    scale(sf) {
        this.sf = sf;
    }

    descendAnimation() {
        this.isDescending = true;
    }

    stopDescendAnimation() {
        this.isDescending = false;
    }

    pickEgg(egg) {
        this.egg = egg;
    }

    dropEgg() {
        this.egg = null;
    }

    hasEgg() {
        return this.egg !== null;
    }

    getEgg() {
        return this.egg;
    }

    update(scaleFactor, speedFactor) {
        this.setWingPosition(speedFactor);
        this.scale(scaleFactor);
        
        let { x, y, z } = this.getPosition();
        let birdVelocity = this.getVelocity();

        this.setPosition({
            x: x + birdVelocity * Math.cos(this.getOrientation()), 
            y: y,
            z: z + birdVelocity * -Math.sin(this.getOrientation())
        });
        
        if(this.hasEgg())
            this.egg.setPosition({x: this.position.x, y: this.position.y - 2.6, z: this.position.z});
    }
    
    display() {
        if(this.hasEgg()) {
            this.egg.display();
        }

        let { x, y, z } = this.position;
        this.scene.translate(x, y, z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(toRadians(this.turnAngle), 1, 0, 0);
        
        // EYES
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.translate(0.55, 1.15, -0.45);
        this.rightEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.translate(0.55, 1.15, 0.45);
        this.leftEye.display();
        this.scene.popMatrix();

        // WINGS
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(toRadians(this.wingsPosition), 1, 0, 0);
        this.scene.translate(0, 0.3, -0.7);
        this.blue.apply();
        this.leftWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(toRadians(-this.wingsPosition), 1, 0, 0);
        this.scene.scale(1, 1, -1);
        this.scene.translate(0, 0.3, -0.7);
        this.rightWing.display();
        this.scene.popMatrix();

        // TAIL
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.blue.apply();
        this.tail.display();
        this.scene.popMatrix();

        // BEAK
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.yellow.apply();
        this.beak.display();
        this.scene.popMatrix();

        // HEAD
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.head.display();
        this.scene.popMatrix();
        
        // BODY
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.body.display();
        this.scene.popMatrix();

        // LEGS
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(-toRadians(this.legPosition), 0, 0, 1);
        this.scene.translate(0, -1, -0.2);
        this.yellow.apply();
        this.leftLeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(-toRadians(this.legPosition), 0, 0, 1);
        this.scene.translate(0, -1, 0.2);
        this.yellow.apply();
        this.rightLeg.display();
        this.scene.popMatrix();

        // PAWS
        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(-toRadians(this.legPosition), 0, 0, 1);
        this.scene.translate(0, 0, 0.2)
        this.leftPaw.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(this.sf, this.sf, this.sf);
        this.scene.rotate(-toRadians(this.legPosition), 0, 0, 1);
        this.scene.translate(0, 0, -0.2)
        this.rightPaw.display();
        this.scene.popMatrix();
    }
};