import EventEmitter from "events";

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.height = document
      .querySelector(".experience-wrapper")
      .getBoundingClientRect().height;

    this.width = document
      .querySelector(".experience-wrapper")
      .getBoundingClientRect().width;

    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.aspectRatio = this.width / this.height;
    this.frustrum = 5;

    //handle experience resize
    window.onresize = () => {
      this.height = document
        .querySelector(".experience-wrapper")
        .getBoundingClientRect().height;

      this.width = document
        .querySelector(".experience-wrapper")
        .getBoundingClientRect().width;

      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.aspectRatio = this.width / this.height;

      this.emit("resize");
    };
  }
}
