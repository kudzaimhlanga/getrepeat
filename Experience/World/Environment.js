import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.gui = this.experience.settings.gui;

    this.setLights();
  }

  setLights() {
    this.sunlight = new THREE.DirectionalLight(0xede7e2, 4.69);
    this.sunlight.position.set(-5, 2.5, 2);
    this.scene.add(this.sunlight);

    this.ambientLight = new THREE.AmbientLight(0xede7e2, 3.34);
    this.scene.add(this.ambientLight);

    // this.folder = this.gui.addFolder("Lights");
    // this.folder.add(this.sunlight, "intensity").min(0).max(10).step(0.01);
    // this.folder.add(this.ambientLight, "intensity").min(0).max(10).step(0.01);
  }
}
