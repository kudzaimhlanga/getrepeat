import EventEmitter from "events";
import { LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();

    this.assets = assets;

    this.items = {};
    this.loaded = 0;
    this.queue = this.assets.length;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loadingManager = new LoadingManager(
      () => { 
        this.emit("loaded")
      },
      (itemUrl, itemsLoaded, itemsTotal) => {
        this.percentage = itemsLoaded / itemsTotal * 100;
        this.emit("loading") 
      }
    )
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (gltf) => {
          this.singleAssetLoaded(asset, gltf);
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
