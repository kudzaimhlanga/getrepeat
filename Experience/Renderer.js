import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { RenderPixelatedPass } from "three/examples/jsm/postprocessing/RenderPixelatedPass.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera.orthographicCamera;
    this.gui = this.experience.settings.gui;

    this.setRenderer();
    this.setComposer();
    this.setPixelatedPass();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setClearColor(0xede7e2, 1);
    // this.renderer.setClearColor(0x000000, 1);

    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  setComposer() {
    this.effectComposer = new EffectComposer(this.renderer);
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio);
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(this.renderPass);
  }

  setPixelatedPass() {
    this.pixelParams = {
      pixelSize: 2,
      depthEdgeStrength: 1,
    };

    this.pixelatedPass = new RenderPixelatedPass(
      this.pixelParams.pixelSize,
      this.scene,
      this.camera
    );

    this.pixelatedPass.depthEdgeStrength = this.pixelParams.depthEdgeStrength;
    this.pixelatedPass.setPixelSize(this.pixelParams.pixelSize);

    // this.folder = this.gui.addFolder("Pixelated Pass");
    // this.folder
    //   .add(this.pixelParams, "pixelSize")
    //   .min(1)
    //   .max(10)
    //   .step(1)
    //   .onChange(() => {
    //     this.pixelatedPass.setPixelSize(this.pixelParams.pixelSize);
    //   });

    // this.folder
    //   .add(this.pixelatedPass, "depthEdgeStrength")
    //   .min(0)
    //   .max(10)
    //   .step(1);

    this.effectComposer.addPass(this.pixelatedPass);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.renderer.render(this.scene, this.camera);
    this.effectComposer.render();
  }
}
