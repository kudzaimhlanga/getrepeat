import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.cameraGroup = new THREE.Group();

    this.setPerspectiveCamera();
    this.setOrthographicCamera();
    // this.setOrbitControls();

    this.scene.add(this.cameraGroup);
  }

  setOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspectRatio * this.sizes.frustrum) / 2,
      (this.sizes.aspectRatio * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -100,
      100
    );

    this.orthographicCamera.position.z = 5;
    this.cameraGroup.add(this.orthographicCamera);
  }

  setPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.sizes.aspectRatio,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 5;
  }

  setOrbitControls() {
    this.orbitControls = new OrbitControls(
      this.orthographicCamera,
      this.canvas
    );
    this.orbitControls.enableDamping = false;
    this.orbitControls.enableZoom = true;
  }

  update() {
    // this.orbitControls.update();
  }

  resize() {
    // this.perspectiveCamera.aspect = this.sizes.aspectRatio;
    // this.perspectiveCamera.updateProjectionMatrix();

    //update orthographic camera
    this.orthographicCamera.left =
      (-this.sizes.aspectRatio * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspectRatio * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
}
