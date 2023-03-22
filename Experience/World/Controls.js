import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.cameraGroup = this.experience.camera.cameraGroup;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;

    //models
    this.bottle = this.experience.world.can.bottleGroup;
    this.can = this.experience.world.can.canGroup;

    this.models = [
      {
        object: this.bottle,
        maxDeltas: {
          x: 0.15,
          z: 0.07
        }
      },
      {
        object: this.can,
        maxDeltas: {
          x: 0.2,
          z: 0.12
        }
      }
    ]
     
    
    this.onMouseMove();
  }

  onMouseMove() {
    this.cursor = {};
    this.cursor.x = 0;
    this.cursor.y = 0;

    this.rotation = {
      x: 0,
      y: 0,
    };

    window.onmousemove = (e) => {
      this.cursor.x = e.clientX / this.sizes.width - 0.5;
      this.cursor.y = e.clientY / this.sizes.height - 0.5;
    };
  }

  updateCamera() {

    const angle = this.time.elapsed * 0.0005;
    this.cameraGroup.position.y = Math.cos(angle) * 0.125;
    this.cameraGroup.position.x = Math.sin(angle) * 0.0625;

  }

  updateModels() {
    for(const model of this.models){
      const deltaX = (this.cursor.x * Math.PI) * model.maxDeltas.x * 0.5;
      const deltaZ = (this.cursor.y * Math.PI) * model.maxDeltas.z * 0.5;
      
      model.object.rotation.x = deltaX ;
      model.object.rotation.z = deltaZ ;
    }
    
  }

  update() {
    this.updateCamera();
    this.updateModels();
  }
}
