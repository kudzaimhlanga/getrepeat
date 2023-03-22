import * as THREE from "three";
import Experience from "../Experience.js";

export default class Points {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera.orthographicCamera;
    this.sizes = this.experience.sizes;

    this.bottlePoint = this.experience.world.can.bottlePoint;

    this.canPoint = this.experience.world.can.canPoint;

    this.points = [
      {
        position: this.canPoint,
        element: document.querySelector(".hero-tag.is-1"),
      },
      {
        position: this.bottlePoint,
        element: document.querySelector(".hero-tag.is-2"),
      },
    ];
  }

  update() {
    for (const point of this.points) {
      const target = new THREE.Vector3();
      const tempPos = point.position.getWorldPosition(target);
      const screenPos = tempPos.clone();

      screenPos.project(this.camera);

      const translateX = screenPos.x * this.sizes.width * 0.5;
      const translateY = -screenPos.y * this.sizes.height * 0.5;

      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    }
  }
}
