import { CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./components/MyPlane.js";

export class MyTerrain extends CGFobject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.plane = new MyPlane(scene, 20);
    this.heightMapTexture = new CGFtexture(scene, "images/heightmap.jpg");
    this.terrainTexture = new CGFtexture(scene, "images/terrain.jpg");
    this.altimetryTexture = new CGFtexture(scene, "images/altimetry.png");
    this.terrainShader = new CGFshader(
      scene.gl,
      "shaders/terrain.vert",
      "shaders/terrain.frag"
    );

    this.terrainShader.setUniformsValues({ terrainTex: 0 });
    this.terrainShader.setUniformsValues({ terrainMap: 1 });
    this.terrainShader.setUniformsValues({ terrainAlt: 2 });
  }

  display() {
    this.scene.pushMatrix();
    this.scene.setActiveShader(this.terrainShader);
    this.terrainTexture.bind(0);
    this.heightMapTexture.bind(1);
    this.altimetryTexture.bind(2);

    this.plane.display();

    this.scene.popMatrix();
    this.scene.setActiveShader(this.scene.defaultShader);
  }

  enableNormalVisualization() {
    this.plane.enableNormalViz();
  }

  disableNormalVisualization() {
    this.plane.disableNormalViz();
  }
}
