import * as THREE from "three";

//Import Utils
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import assets from "./Utils/assets.js";
import Resources from "./Utils/Resources.js";
import Settings from "./Settings.js"
import Intro from "./Intro.js";


//Set Up Experience
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";

export default class Experience {
  static instance;

  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.time = new Time();
    this.settings = new Settings();

    this.camera = new Camera();
    this.renderer = new Renderer();

    this.resources = new Resources(assets);
    this.intro = new Intro();
    this.world = new World();

    this.resources.on("loading", () => {
      this.intro.load(this.resources.percentage)
    })

    this.resources.on("loaded", () =>{
      this.intro.loaded();
    })

    this

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.renderer.update();
    this.camera.update();
    this.world.update();
  }
}
