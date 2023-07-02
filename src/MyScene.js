import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./components/MySphere.js";
import { MyPanorama } from "./components/MyPanorama.js";
import { MyBird } from "./components/bird/MyBird.js";
import { MyPlane } from "./components/MyPlane.js";
import { MyBirdEgg } from "./components/MyBirdEgg.js";
import { MyNest } from "./components/MyNest.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBillboard } from "./components/MyBillboard.js";
import { MyTreeGroupPatch } from "./components/MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./components/MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.billboardTextures = [
        "textures/billboardtree.png",
        "textures/billboardtree2.png",
        "textures/billboardtree3.png",
    ];

    //Initialize scene objects
    this.axis = new CGFaxis(this);

    var texture = new CGFtexture(this, "images/panorama4.jpg");

    this.panorama = new MyPanorama(this, texture, {
      x: this.camera.position[0],
      y: this.camera.position[1],
      z: this.camera.position[2]
    });

    this.plane = new MyPlane(this,30);
    this.bird = new MyBird(this, 0, {x: 0, y: -55, z: 0});
    this.nest = new MyNest(this, {x: 70, z: 0});
    this.billboard = new MyBillboard(this);

    this.NUM_OF_EGGS = 4; 

    this.eggs = [];

    for(let i = 0; i < this.NUM_OF_EGGS; i++)
      this.eggs.push(this.createEgg(95, 65, 25, -25));  

    this.treeGroupPatch = new MyTreeGroupPatch(this, 65, 95, -25, 25);
    this.treeRowPatch = new MyTreeRowPatch(this, 65, 95, -25, 25);
    this.treeGroup = this.treeGroupPatch.getTrees();
    this.treeRow = this.treeRowPatch.getTrees();

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.followBird = true;

    this.appStartTime = Date.now();
    this.animStartTimeSecs = 2;
    this.timer = null;
    this.elapsedTimeSecs = 0;
    this.timeAux = 0;

    // animation values
    this.birdAnimation = 0;
    this.eggDropping = null;

    this.enableTextures(true);

    this.terrain = new MyTerrain(this);
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.nestTex = new CGFtexture(this, "textures/nest.jpg");
    this.nestShader = new CGFshader(this.gl, "shaders/nest.vert", "shaders/nest.frag");
    this.nestMap = new CGFtexture(this, "textures/nestMap.png");
    this.nestShader.setUniformsValues({ uSampler2: 1 });

    this.treeTex = new CGFtexture(this, "textures/billboardtree.png");

    this.setUpdatePeriod(30);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {
    this.panorama.update({
      x: this.camera.position[0],
      y: this.camera.position[1],
      z: this.camera.position[2]
    });

    this.delta = (t - this.appStartTime) / 1000.0;

    if(this.lastTime != null) this.timer = (t - this.lastTime) / 1000.0;
    
    this.lastTime = t;

    if(this.bird.isDescending) {

      if(!this.bird.hasEgg()) this.checkEgg();
      
      this.elapsedTimeSecs += this.timer;
      
      if(this.elapsedTimeSecs > 0 && this.elapsedTimeSecs <= 1) this.birdAnimation -= (1 / 3);

      else if(this.elapsedTimeSecs > 1 && this.elapsedTimeSecs <= 2) this.birdAnimation += (1 / 3);
      
      else if(this.elapsedTimeSecs > 2) {
        this.bird.stopDescendAnimation();
        this.elapsedTimeSecs = 0;
      }

    } else this.birdAnimation = -2 + 1 * Math.sin(this.delta * Math.PI * 2 * this.speedFactor);

    this.bird.update(this.scaleFactor, this.speedFactor, this.birdAnimation);

    if(this.followBird) this.trackBird();

    if(this.eggDropping) {
      this.dropEggAnimation(this.eggDropping, this.timer);
    }
  
    this.checkKeys();
  }

  trackBird() {
    if(this.bird.isDescending) {
      this.camera.setPosition(
        vec3.fromValues(
          this.bird.getPosition().x - 10 * Math.cos(this.bird.getOrientation()),
          this.bird.getPosition().y + 5 + this.birdAnimation,
          this.bird.getPosition().z + 10 * Math.sin(this.bird.getOrientation())
        )
      );

      this.camera.setTarget(vec3.fromValues(
        this.bird.getPosition().x,
        this.bird.getPosition().y + this.birdAnimation,
        this.bird.getPosition().z
      ));

    } else {
      this.camera.setPosition(
        vec3.fromValues(
          this.bird.getPosition().x - 10 * Math.cos(this.bird.getOrientation()),
          this.bird.getPosition().y + 5,
          this.bird.getPosition().z + 10 * Math.sin(this.bird.getOrientation())
        )
      );

      this.camera.setTarget(vec3.fromValues(
        this.bird.getPosition().x,
        this.bird.getPosition().y,
        this.bird.getPosition().z
      ));
    }
  }

  checkEgg() {
    let { x, y, z } = this.bird.getPosition();
    let actualPosition = {x, y: y + this.birdAnimation, z};

    for(const egg of this.eggs) {
      let eggPosition = egg.getPosition();
      let occupiedPlaces = this.nest.getEggPlaces().filter(
        place => place.occupied && place.x === eggPosition.x && place.z === eggPosition.z
      );
      
      let distance = (eggPosition.x - actualPosition.x) ** 2 + (eggPosition.z - actualPosition.z) ** 2 + (actualPosition.y + 67) ** 2;

      if(distance <= 10) {
        for(const place of occupiedPlaces)
          place.occupied = false;
        this.bird.pickEgg(egg);
        this.eggs.splice(this.eggs.indexOf(egg), 1);
        this.calculateValues(egg);

        break;
      }
    }
  }

  canDropEgg() {
    if(this.bird.hasEgg()) {
      let { x, z } = this.bird.getPosition();
      let nestPosition = this.nest.getPosition();
      let area = {
        minX: nestPosition.x - 15,
        maxX: nestPosition.x + 15,
        minZ: nestPosition.z - 15,
        maxZ: nestPosition.z + 15
      };

      return (x >= area.minX && x <= area.maxX && z >= area.minZ && z <= area.maxZ);
    }

    return false;
  }

  createEgg(maxX, minX, maxZ, minZ) {
    let x = Math.random() * (maxX - (minX)) + minX;
    let y = -67; 
    let z = Math.random() * (maxZ - (minZ)) + minZ;

    return new MyBirdEgg(this, "textures/egg.jpg", { x, y, z });
  }

  calculateValues(egg) {
    let birdPosition = this.bird.getPosition();
    let place = this.nest.getAvailablePlace();
    let acceleration = vec3.fromValues(0.0, -4.9, 0.0);
    let initialPosition = vec3.fromValues(birdPosition.x, birdPosition.y, birdPosition.z);
    let finalPosition = vec3.fromValues(place.x, -67, place.z);
    let aux = vec3.fromValues(finalPosition[0] - initialPosition[0], initialPosition[1], finalPosition[2] - initialPosition[2]);
    let aux2 = vec3.create();
    vec3.sub(aux2, finalPosition, initialPosition);
    vec3.sub(aux2, aux2, acceleration);
    vec3.normalize(aux, aux);

    let k = aux2[0] / aux[0];
    let initialVelocity = vec3.create();
    vec3.mul(initialVelocity, aux, vec3.fromValues(k, k, k));

    egg.setInitialPosition(initialPosition);
    egg.setInitialVelocity(initialVelocity);
    egg.setFinalPosition(place);
  }

  dropEggAnimation(egg, dt) {
    this.timeAux += dt;
    let pos = vec3.create();
    let v = vec3.create();
    let a = vec3.create();
    let t = vec3.fromValues(this.timeAux, this.timeAux, this.timeAux);
    let tSquared = vec3.fromValues(this.timeAux ** 2, this.timeAux ** 2, this.timeAux ** 2);

    vec3.mul(v, egg.getInitialVelocity(), t);
    vec3.mul(a, egg.getAcceleration(), tSquared);
    vec3.add(pos, v, a);
    vec3.add(pos, pos, egg.getInitialPosition());

    egg.setPosition({
      x: pos[0],
      y: pos[1],
      z: pos[2]
    });

    if(egg.getPosition().y < -67) {
      this.bird.dropEgg();
      let finalPosition = egg.getFinalPosition();
      egg.setPosition({
        x: finalPosition.x,
        y: -67,
        z: finalPosition.z
      });
      this.eggs.push(egg);

      this.nest.markPlaceAsOccupied(egg.getPosition());

      this.eggDropping = null;
      this.timeAux = 0;
    }

  }

  checkKeys() {
    if(this.gui.isKeyPressed("KeyW")) {
      this.bird.accelerate(0.05 * this.speedFactor);
    }

    if(this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-0.05 * this.speedFactor);
    }

    if(this.gui.isKeyPressed("KeyA")) {
      this.bird.turn((Math.PI / 60) * this.speedFactor);
      this.bird.sideTurn(-5, true);
    }

    if(this.gui.isKeyPressed("KeyD")) {
      this.bird.turn((-Math.PI / 60) * this.speedFactor);
      this.bird.sideTurn(5, false);
    }

    if(!this.gui.isKeyPressed("KeyD") && !this.gui.isKeyPressed("KeyA")) {
      if(this.bird.turningLeft)
        this.bird.sideTurn(5, true);
      else
        this.bird.sideTurn(-5, false);
    }

    if(this.gui.isKeyPressed("KeyR")) {
      this.bird.setPosition({x: 0, y: -55, z: 0});
      this.bird.setOrientation(0);
      this.bird.setVelocity(0);
      this.bird.setTurnAngle(0);
      this.bird.legPosition = 0;
    }

    if(this.gui.isKeyPressed("KeyP")) {
      this.bird.descendAnimation();
    }

    if(this.gui.isKeyPressed("KeyO")) {
      if(this.canDropEgg()) {
        this.eggDropping = this.bird.getEgg();
      }
    }
  }
  
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI / 2.0, 1, 0, 0);
    this.terrain.display();
    this.popMatrix();


    this.setDefaultAppearance();

    this.panorama.display();

    this.pushMatrix();
    this.translate(0, this.birdAnimation, 0);
    this.bird.display();
    this.popMatrix();

    

    //this.pushMatrix();
    // this.setActiveShader(this.billboardShader);
    this.treeTex.bind(0);
    //this.treeGroupPatch.display();
    // this.setActiveShader(this.defaultShader);
    //this.popMatrix();

    for (const tree of this.treeGroup)
      tree.display();

    for (const tree of this.treeRow)
      tree.display();
    //this.pushMatrix();
    // this.setActiveShader(this.billboardShader);
    //this.treeRowPatch.display();
    // this.setActiveShader(this.defaultShader);
    //this.popMatrix();

    this.pushMatrix();
    this.setActiveShader(this.nestShader);
    this.nestTex.bind(0);
    this.nestMap.bind(1);
    this.translate(this.nest.getPosition().x, -69, this.nest.getPosition().z);
    this.nest.display();
    this.popMatrix();

    this.setActiveShader(this.defaultShader);
    this.nestTex.unbind(0);

    for(const egg of this.eggs) {
      egg.display();
    }

    // ---- END Primitive drawing section
  }
}
