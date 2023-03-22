import * as THREE from "three";
import Experience from "../Experience.js";

export default class Can {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.gui = this.experience.settings.gui;

    this.can = this.experience.resources.items.can.scene;
    this.bottle = this.experience.resources.items.bottle.scene;

    this.setModel();
    // this.setGui();
  }

  setMaterial(model) {
    model.children.forEach((child) => {
      child.material = new THREE.MeshPhysicalMaterial({
        color: this.materialParams.color,
      });
    });
  }

  updateMaterial(model, color) {
    model.children.forEach((child) => {
      child.material.color.set(color);
    });
  }

  setModel() {
    // this.folder = this.gui.addFolder("Models");

    this.materialParams = {
      color: 0xad7f58,
      //0xddb592 #previous color
    };

    this.setMaterial(this.bottle);
    this.setMaterial(this.can);

    //create group for bottle and point
    this.bottleGroup = new THREE.Group();
    this.bottleGroup.add(this.bottle);

    const interestPoint = {
      geometry: new THREE.BoxGeometry(0.001, 0.001, 0.001),
      material: new THREE.MeshPhysicalMaterial({ color: 0x000000 }),
    };

    this.bottlePoint = new THREE.Mesh(
      interestPoint.geometry,
      interestPoint.material
    );
    this.bottleGroup.add(this.bottlePoint);
    this.bottlePoint.position.set(0.969, 3.579, 0);

    this.mainBottle = new THREE.Group();
    this.mainBottle.add(this.bottleGroup);
    this.mainBottle.scale.set(0.7, 0.7, 0.7);
    this.mainBottle.position.set(3, -1.5, 0);
    this.mainBottle.rotation.set(0.343, 3.736, -0.44);

    //create group for can
    this.canGroup = new THREE.Group();
    this.canGroup.add(this.can);

    this.canPoint = new THREE.Mesh(
      interestPoint.geometry,
      interestPoint.material
    );
    this.canGroup.add(this.canPoint);
    this.canPoint.position.set(-1.029, 2.485, -0.218);

    this.mainCan = new THREE.Group();
    this.mainCan.add(this.canGroup);
    this.mainCan.scale.set(0.9, 0.9, 0.9);
    this.mainCan.position.set(-3, 0, 0);
    this.mainCan.rotation.set(0.865, 0.865, -0.44);

    //create group for both objects
    this.modelsGroup = new THREE.Group();
    this.modelsGroup.add(this.mainBottle);
    this.modelsGroup.add(this.mainCan);
    this.scene.add(this.modelsGroup);
  }

  setGui() {
    this.canFolder = this.folder.addFolder("Can Group");
    this.canFolder
      .add(this.canGroup.rotation, "x")
      .min(-10)
      .max(10)
      .step(0.001);
    this.canFolder
      .add(this.canGroup.rotation, "y")
      .min(-10)
      .max(10)
      .step(0.001);
    this.canFolder
      .add(this.canGroup.rotation, "z")
      .min(-10)
      .max(10)
      .step(0.001);

    this.bottleFolder = this.folder.addFolder("Bottle Group");
    this.bottleFolder
      .add(this.bottleGroup.rotation, "x")
      .min(-10)
      .max(10)
      .step(0.001);
    this.bottleFolder
      .add(this.bottleGroup.rotation, "y")
      .min(-10)
      .max(10)
      .step(0.001);
    this.bottleFolder
      .add(this.bottleGroup.rotation, "z")
      .min(-10)
      .max(10)
      .step(0.001);

    this.folder.addColor(this.materialParams, "color").onChange(() => {
      this.updateMaterial(this.can, this.materialParams.color);
      this.updateMaterial(this.bottle, this.materialParams.color);
    });
  }

  update() {}
}
