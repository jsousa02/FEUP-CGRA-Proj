import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupPatch extends CGFobject {
  constructor(scene, minX, maxX, minZ, maxZ) {
    super(scene);
    this.trees = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let xRandPos = minX + Math.random() * (maxX - minX);
        let zRandPos = minZ + Math.random() * (maxZ - minZ);
        let randScale = 7 + Math.random() * 9;
  
        let randTexture = this.scene.billboardTextures[Math.floor(Math.random() * this.scene.billboardTextures.length)];
  
        this.trees.push(new MyBillboard(scene, randTexture, {x: xRandPos, y: -64, z:zRandPos}, randScale));
      }
    }
  }

  getTrees() {
    return this.trees;
  }
}
